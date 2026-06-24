// PM2 process config for the zerogravity.group VPS.
// Serves the STATIC build output (dist/) with `serve` — the same model Vercel uses.
// We intentionally do NOT run `vite preview` in production (see DEPLOYMENT.md for why).
//
// Filename is .cjs because package.json has no "type":"module" guarantee across
// environments and PM2 ecosystem files must be CommonJS (module.exports).
//
// Prereqs on the server (one-time):
//   npm i -g serve
// Deploy:
//   npm install --include=dev && npm run build   # produces dist/
//   pm2 start ecosystem.config.cjs               # or: pm2 restart zg-group
module.exports = {
  apps: [
    {
      name: "zg-group",
      cwd: "/home/zerogravity/htdocs/zerogravity.group",
      script: "serve",
      args: "-s dist -l 3033",
      interpreter: "none",
      env: {
        NODE_ENV: "production",
        PORT: 3033
      },
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "256M"
    }
  ]
};
