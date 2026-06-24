# Deployment — zerogravity.group (VPS)

How this site is served in production, and the bug that caused repeated **502 Bad Gateway**
errors — documented so it doesn't happen again.

## TL;DR

The site is a **static Vite + React build**. In production we serve the built `dist/`
folder with [`serve`](https://www.npmjs.com/package/serve) behind nginx — the same way
Vercel serves it. We do **not** run `vite preview` on the VPS.

```bash
# one-time, on the server
npm i -g serve

# every deploy
npm install --include=dev    # vite is a devDependency — needed to build
npm run build                # produces dist/
pm2 start ecosystem.config.cjs   # first time
pm2 restart zg-group             # subsequent deploys
pm2 save
```

Served on `127.0.0.1:3033`; nginx proxies the public domain to it.

## What went wrong (the 502 saga)

The VPS was originally trying to serve the site with `vite preview` under PM2. That broke
in four separate ways, each hiding the next:

| # | Symptom | Root cause | Fix |
|---|---------|-----------|-----|
| 1 | `module is not defined in ES module scope` | `package.json` had `"type": "module"`, so `ecosystem.config.js` was parsed as ESM where `module.exports` is illegal | Use a `.cjs` extension for the PM2 config |
| 2 | `Missing script: "start"` | PM2 was running `npm start`, but no `start` script existed | Point PM2 at the real serve command |
| 3 | `Blocked request. This host ("zerogravity.group") is not allowed` → 502 | `vite preview` rejects any `Host` header not in its allow-list; nginx forwards `Host: zerogravity.group` | (only relevant if using preview) add `preview.allowedHosts` in `vite.config.mjs` |
| 4 | `sh: 1: vite: not found` / `Script not found: node_modules/vite/bin/vite.js` → crash loop, `0s` uptime, 502 | `vite` is a **devDependency**, and `NODE_ENV=production` makes `npm install` **prune devDependencies** — so vite (and later `dist/`) were stripped off the server | Stop needing vite at runtime: build `dist/` and serve it statically |

### The real root cause

`vite preview` is a **dev-preview tool, not a production server**. It needs vite installed
at runtime, does Host-header checking, and is fragile under PM2's PATH. Vercel "just works"
because it serves the static build output and never runs vite at runtime. Serving `dist/`
with `serve` makes the VPS behave the same way and removes all four problems at once.

## Why `NODE_ENV=production` keeps biting

When `NODE_ENV=production` is set, `npm install` **skips devDependencies**. Since `vite` is a
devDependency, any production-mode install removes it — which is why the build "worked once"
then disappeared. Always build with devDeps present:

```bash
npm install --include=dev && npm run build
```

The runtime (`serve`) needs neither vite nor any devDependency — only the build step does.

## Files involved

- `ecosystem.config.cjs` — PM2 process definition (runs `serve -s dist -l 3033`).
- `vite.config.mjs` — includes a `preview.allowedHosts` block as a fallback in case anyone
  runs `vite preview` directly; not used by the `serve`-based production path.

## Quick health check

```bash
pm2 list                         # uptime should climb past 0s; ↺ restart counter steady
pm2 logs zg-group --err --lines 20 --nostream   # should be quiet
curl -I http://127.0.0.1:3033    # expect HTTP 200
```
