import React, { useState, useEffect, useRef } from 'react';
import {
  Home,
  User,
  Briefcase,
  Trophy,
  Mail,
  Menu,
  X,
  ChevronRight,
  ArrowRight,
  ExternalLink,
  MapPin,
  Phone,
  Send,
  Building,
  CheckCircle,
  FileText,
  ChevronLeft,
  Sun,
  Moon,
  Monitor
} from 'lucide-react';

// Section Definitions
const SECTIONS = [
  { id: 'hero', name: 'Hero', icon: Home },
  { id: 'about', name: 'About MD', icon: User },
  { id: 'companies', name: 'Group Companies', icon: Briefcase },
  { id: 'achievements', name: 'Achievements', icon: Trophy },
  { id: 'contact', name: 'Contact', icon: Mail }
];

// Companies Data
const COMPANIES = [
  {
    id: 1,
    name: 'ZeroGravity Technologies',
    sector: 'Software Development',
    description: 'Pioneering state-of-the-art enterprise software, cloud scalability, and artificial intelligence solutions. ZeroGravity Technologies drives digital modernization for global conglomerates.',
    metrics: [
      { label: 'Valuation / Capital', value: '$1.2 Billion' },
      { label: 'Location Hub', value: 'Chennai, India' },
      { label: 'Global Offices', value: 'Chennai, SF, Tokyo' }
    ],
    bgClass: 'bg-indigo-950/20 border-indigo-500/20',
    link: 'https://zerogravitytechnologies.com/'
  },
  {
    id: 2,
    name: 'ZeroGravity Digital',
    sector: 'Marketing',
    description: 'A world-class digital agency crafting premium brand identities, high-fidelity UI/UX designs, and experiential marketing campaigns that captivate audiences globally.',
    metrics: [
      { label: 'Active Clients', value: '40+ Brands' },
      { label: 'Location Hub', value: 'Chennai & Mumbai' },
      { label: 'Design Awards', value: '15+ International' }
    ],
    bgClass: 'bg-emerald-950/20 border-emerald-500/20',
    link: 'https://zerogravitydigital.in/'
  },
  {
    id: 3,
    name: 'ZeroGravity Manufacturing',
    sector: 'Manufacturing',
    description: 'Delivering advanced precision engineering, industrial automation components, and advanced machinery manufacturing, adhering to world-class manufacturing standards.',
    metrics: [
      { label: 'Production Output', value: '2.4M Units/Yr' },
      { label: 'Location Hub', value: 'Chennai Outer Grid' },
      { label: 'Facility Size', value: '45k Sq.Ft.' }
    ],
    bgClass: 'bg-amber-950/20 border-amber-500/20',
    services: [
      { name: 'Rigid Boxes', link: 'https://alphapackaging.ltd/' },
      { name: 'Printing', link: 'https://alphadesigns.in/' },
      { name: 'Albums', link: 'https://albumsbyzerogravity.com/' }
    ]
  },
  {
    id: 4,
    name: 'ZeroGravity Events',
    sector: 'Events',
    description: 'Creating high-impact executive events, corporate summits, and premium brand activation experiences that engage leaders and redefine community hosting.',
    metrics: [
      { label: 'Annual Attendees', value: '200k+ People' },
      { label: 'Location Hub', value: 'Chennai Hub' },
      { label: 'Managed Events', value: '85+ Summits' }
    ],
    bgClass: 'bg-rose-950/20 border-rose-500/20',
    services: [
      { name: 'ZeroGravity Photography', link: 'https://zerogravity.photography/' },
      { name: 'Vermilion Decors', link: 'https://vermiliondecors.com/' },
      { name: 'Divine Caterers', link: 'https://divinecaterers.in/' },
      { name: 'Pink Ribbon Shop', link: 'https://pinkribbonshop.in/' }
    ]
  }
];


// Testimonials Data removed

export default function App() {
  // Navigation State — honor a ?section= deep-link on first load, else 'hero'.
  const initialSection = (() => {
    if (typeof window !== 'undefined') {
      const s = new URLSearchParams(window.location.search).get('section');
      if (SECTIONS.some((sec) => sec.id === s)) return s;
    }
    return 'hero';
  })();
  const [activeSection, setActiveSection] = useState(initialSection);
  const [transitionState, setTransitionState] = useState({
    active: initialSection,
    exiting: null,
    entering: null,
    isTransitioning: false
  });

  // Interactive Component States
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeCompany, setActiveCompany] = useState(COMPANIES[0]);
  const [activeTab, setActiveTab] = useState('journey'); // For About page
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  // Staggered words for Hero section
  const [heroStaggerVisible, setHeroStaggerVisible] = useState(false);

  // Theme mode: 'light' (default) | 'dark' | 'system' (follow the browser/OS).
  // Persisted; ?theme= still overrides for previews. Toggle cycles light → dark → auto.
  const [themeMode, setThemeMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const urlTheme = new URLSearchParams(window.location.search).get('theme');
      if (urlTheme === 'light' || urlTheme === 'dark') return urlTheme;
      const stored = window.localStorage.getItem('zg-theme');
      if (stored === 'light' || stored === 'dark' || stored === 'system') return stored;
    }
    return 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const apply = () => {
      const isDark = themeMode === 'dark' || (themeMode === 'system' && mql.matches);
      root.classList.toggle('theme-light', !isDark);
    };
    apply();
    window.localStorage.setItem('zg-theme', themeMode);
    // In system mode, react live to OS light/dark changes.
    if (themeMode === 'system') {
      mql.addEventListener('change', apply);
      return () => mql.removeEventListener('change', apply);
    }
  }, [themeMode]);

  // Cycle the toggle: light → dark → auto (system) → light …
  const cycleTheme = () =>
    setThemeMode((prev) => (prev === 'light' ? 'dark' : prev === 'dark' ? 'system' : 'light'));

  // Accent variant by route: pink is the default site accent; /home-2 shows
  // the original red/orange accent instead. Independent of light/dark.
  useEffect(() => {
    const path = window.location.pathname.replace(/\/+$/, '');
    document.documentElement.classList.toggle('variant-orange', path.endsWith('/home-2'));
  }, []);

  useEffect(() => {
    // Set a tiny delay for hero text to stagger in on first load
    const timer = setTimeout(() => setHeroStaggerVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Transition controller
  const navigateTo = (targetId) => {
    if (transitionState.isTransitioning || targetId === transitionState.active) return;

    setTransitionState({
      active: transitionState.active,
      exiting: transitionState.active,
      entering: targetId,
      isTransitioning: true
    });

    // Step 2: Trigger the animation classes in next tick
    setTimeout(() => {
      setTransitionState(prev => ({
        ...prev,
        // Swap active and entering classes to trigger CSS transitions
        active: targetId
      }));
    }, 50);

    // Step 3: Complete transition after 900ms (matches CSS transition duration)
    setTimeout(() => {
      setTransitionState({
        active: targetId,
        exiting: null,
        entering: null,
        isTransitioning: false
      });
      setActiveSection(targetId);

      // Handle page-specific entry animations
      if (targetId === 'hero') {
        setHeroStaggerVisible(true);
      } else {
        setHeroStaggerVisible(false);
      }
    }, 950);
  };

  // ---- Scroll / trackpad / wheel navigation between sections ----
  const wheelLockRef = useRef(false);
  const wheelReleaseRef = useRef(null);
  const navigateRef = useRef(() => {});

  // Refreshed every render so the listener always sees the current active section.
  navigateRef.current = (dir) => {
    const idx = SECTIONS.findIndex((s) => s.id === transitionState.active);
    const target = SECTIONS[idx + dir];
    if (target) navigateTo(target.id);
  };

  useEffect(() => {
    const onWheel = (e) => {
      // Ignore tiny/horizontal scrolls (trackpad sideways gestures).
      if (Math.abs(e.deltaY) < 4 || Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;

      // Edge-aware: if the panel under the cursor can still scroll in this
      // direction, let it scroll internally instead of changing sections.
      const panel = e.target.closest ? e.target.closest('.panel-left, .panel-right') : null;
      if (panel && panel.scrollHeight > panel.clientHeight + 1) {
        const atTop = panel.scrollTop <= 0;
        const atBottom = panel.scrollTop + panel.clientHeight >= panel.scrollHeight - 1;
        if ((e.deltaY > 0 && !atBottom) || (e.deltaY < 0 && !atTop)) return;
      }

      e.preventDefault();

      // Momentum guard: one gesture = one move. The lock only releases after
      // wheel events go quiet for 600ms, so trackpad inertia can't skip sections.
      if (wheelReleaseRef.current) clearTimeout(wheelReleaseRef.current);
      wheelReleaseRef.current = setTimeout(() => { wheelLockRef.current = false; }, 600);
      if (wheelLockRef.current) return;
      wheelLockRef.current = true;
      navigateRef.current(e.deltaY > 0 ? 1 : -1);
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', onWheel);
      if (wheelReleaseRef.current) clearTimeout(wheelReleaseRef.current);
    };
  }, []);

  // Check if a section should be rendered in the DOM
  const shouldRender = (sectionId) => {
    return (
      transitionState.active === sectionId ||
      transitionState.exiting === sectionId ||
      transitionState.entering === sectionId
    );
  };

  // Get active class for a section container
  const getSectionClass = (sectionId) => {
    if (transitionState.entering === sectionId) return 'state-entering';
    if (transitionState.exiting === sectionId) return 'state-exiting';
    if (transitionState.active === sectionId) return 'state-active';
    return '';
  };

  // Contact form handler
  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 4000);
  };

  return (
    <div className="relative min-h-screen w-full bg-canvas text-ink font-sans overflow-hidden">

      {/* 1. Header/Logo overlay matching Ramsay style */}
      <header className="absolute top-0 right-0 z-50 flex items-center justify-between w-full h-[70px] px-6 md:px-12 md:pl-32 bg-canvas/60 backdrop-blur-lg border-b border-line/70 shadow-sm pointer-events-auto">
        <div className="flex items-center gap-3">
          <img src="/logo-zerogravity.webp" alt="ZeroGravity Group logo" className="w-8 h-8 object-contain" />
          <span className="font-serif text-xl tracking-wide text-ink">Zerogravity Group</span>
        </div>

        {/* Right-side controls cluster */}
        <div className="flex items-center gap-4 md:gap-6">
          {/* Ramsay-style header information */}
          <div className="hidden lg:flex items-center gap-8 text-xs text-ink-muted font-sans">
            <div className="flex items-center gap-2">
              <span className="text-brand-red font-medium">EMAIL:</span>
              <a href="mailto:office@zerogravitygroup.com" className="hover:text-ink transition-colors">office@zerogravitygroup.com</a>
            </div>
            <div className="w-[1px] h-3 bg-line-strong"></div>
          </div>

          {/* Theme toggle — Light → Dark → Auto (follows the browser/OS) */}
          <button
            onClick={cycleTheme}
            className="flex items-center justify-center w-10 h-10 rounded border border-line-strong hover:border-brand-red transition-all cursor-pointer text-brand-red"
            aria-label={`Theme: ${themeMode === 'system' ? 'auto' : themeMode}. Click to change (light, dark, auto).`}
            title={`Theme: ${themeMode === 'system' ? 'Auto — follows your device' : themeMode === 'dark' ? 'Dark' : 'Light'} · click to change`}
          >
            {themeMode === 'light' && <Sun size={18} />}
            {themeMode === 'dark' && <Moon size={18} />}
            {themeMode === 'system' && <Monitor size={18} />}
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded border border-line-strong hover:border-brand-red transition-all cursor-pointer text-ink"
            aria-label="Toggle Navigation Menu"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* 2. Fixed Left Sidebar Navigation (Divergent template inspiration) */}
      <nav className={`fixed top-0 left-0 h-full w-[80px] bg-sidebar border-r border-line flex flex-col justify-between items-center py-6 z-40 transition-transform duration-300 md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>

        {/* Top Brand Logo Container */}
        <div className="flex flex-col items-center gap-1 cursor-pointer" onClick={() => navigateTo('hero')}>
          <div className="w-10 h-10 flex items-center justify-center bg-brand-red text-on-accent font-outfit font-black text-lg">
            ZG
          </div>
        </div>

        {/* Middle Navigation Icons */}
        <div className="flex flex-col gap-5 w-full">
          {SECTIONS.map((sec) => {
            const IconComponent = sec.icon;
            const isCurrent = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => {
                  navigateTo(sec.id);
                  if (window.innerWidth < 768) setSidebarOpen(false);
                }}
                className={`group relative w-full py-3 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 text-ink-subtle hover:text-ink`}
              >
                {/* Active Red Highlight Bar */}
                <div className={`absolute left-0 top-0 h-full w-[3px] bg-brand-red transition-transform duration-300 ${isCurrent ? 'scale-y-100' : 'scale-y-0 group-hover:scale-y-50'}`}></div>

                <IconComponent size={20} className={`transition-all duration-300 ${isCurrent ? 'text-brand-red scale-110' : 'group-hover:scale-105'}`} />
                <span className={`text-[10px] tracking-wider mt-1.5 font-outfit font-medium uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block absolute left-[80px] bg-surface text-ink px-3 py-1.5 border border-line-strong rounded pointer-events-none whitespace-nowrap z-50 shadow-xl`}>
                  {sec.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Bottom Social Links & Copyright */}
        <div className="flex flex-col items-center gap-4 text-ink-subtle">
          <div className="w-4 h-[1px] bg-line-strong"></div>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-brand-red transition-colors text-xs font-semibold uppercase tracking-wider -rotate-90 origin-center my-6 whitespace-nowrap cursor-pointer">
            LINKEDIN
          </a>
        </div>
      </nav>

      {/* 3. Main Fullscreen Content Container */}
      <main className="relative w-full h-screen overflow-hidden">

        {/* ================= HERO SECTION ================= */}
        {shouldRender('hero') && (
          <section id="hero" className={`section-container ${getSectionClass('hero')}`}>
            {/* Left Panel: Ramsay typography + editorial text */}
            <div className="panel-left split-transition flex flex-col justify-start pt-28 pb-12 px-8 md:px-20 lg:px-24 bg-panel bg-grid-pattern overflow-hidden">
              <div className="max-w-xl my-auto">
                {/* Staggered Serif Word Reveals (IvyPresto heading style) */}
                <div className="mb-6 font-serif italic">
                  <div className="line-mask block text-4xl md:text-7xl lg:text-8xl tracking-tight text-ink mb-2 leading-none">
                    <span className="inline-block animate-reveal">
                      Strategy<span className="text-brand-red">.</span>
                    </span>
                  </div>
                  <br />
                  <div className="line-mask block text-4xl md:text-7xl lg:text-8xl tracking-tight text-ink mb-2 leading-none">
                    <span className="inline-block animate-reveal stagger-1">
                      Creativity<span className="text-brand-red">.</span>
                    </span>
                  </div>
                  <br />
                  <div className="line-mask block text-4xl md:text-7xl lg:text-8xl tracking-tight text-ink-muted leading-none">
                    <span className="inline-block animate-reveal stagger-2">
                      Results<span className="text-brand-red">.</span>
                    </span>
                  </div>
                </div>

                <h1 className="sr-only">ZEROGRAVITY GROUP</h1>

                {/* Supporting Text: Executive philosophy */}
                <p className="text-ink-muted text-lg md:text-xl leading-relaxed mb-10 font-light max-w-lg animate-fade-in stagger-3">
                  I build what others envision
                </p>


                {/* CTA Buttons - Ramsay style play button and Divergent explore button */}
                <div className="flex flex-wrap items-center gap-6 opacity-0 animate-fade-in stagger-4">
                  <button
                    onClick={() => navigateTo('companies')}
                    className="group flex items-center gap-3 bg-brand-red hover:bg-brand-red/90 text-on-accent font-outfit text-sm font-bold uppercase tracking-wider px-8 py-4.5 rounded-none transition-all duration-300 hover:shadow-lg hover:shadow-brand-red/20 border border-brand-red cursor-pointer"
                  >
                    <span>Explore Companies</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Panel: Portrait matching Ramsay visual style */}
            <div className="panel-right split-transition bg-panel-2 relative flex items-center justify-center overflow-hidden">
              {/* Dark vignette gradient to blend image into background */}
              <div className="absolute inset-0 bg-gradient-to-r from-vignette via-vignette/50 to-transparent z-10 hidden md:block"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-vignette via-transparent to-transparent z-10 md:hidden"></div>

              {/* Executive Image */}
              <img
                src="/md_hero_portrait.jpg"
                alt="Ajay, Founder & Managing Director of ZeroGravity Group"
                className="absolute inset-0 w-full h-full object-cover object-[80%_center] transition-all duration-1000 scale-102"
              />

              {/* Editorial bottom detail overlay */}
              <div className="absolute bottom-10 right-25 z-20 text-right font-outfit select-none pointer-events-none hidden lg:block">
                <span className="text-[10px] tracking-[0.3em] text-ink-subtle font-bold uppercase block mb-1">FOUNDER</span>
                <span className="text-lg text-on-accent font-extrabold tracking-widest uppercase">ZEROGRAVITY GROUP.</span>
                <span className="block text-brand-red text-xs mt-1">CHENNAI</span>
              </div>
            </div>
          </section>
        )}

        {/* ================= ABOUT MD SECTION ================= */}
        {shouldRender('about') && (
          <section id="about" className={`section-container ${getSectionClass('about')}`}>
            {/* Left Panel: Profile Image */}
            <div className="panel-left split-transition bg-panel relative flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-l from-vignette via-vignette/30 to-transparent z-10 hidden md:block"></div>
              <img
                src="/md_about.jpg"
                alt="Ajay in boardroom meetings representing ZeroGravity Group"
                className="absolute inset-0 w-full h-full object-cover object-right transition-all duration-1000"
              />
              <div className="absolute bottom-10 left-10 z-20 text-left bg-surface/80 backdrop-blur-md border border-line-strong p-6 max-w-sm hidden xl:block">
                <p className="font-serif italic text-lg text-ink mb-2">"Behind the lens is where precision meets imagination."</p>
                <span className="text-xs font-outfit uppercase tracking-widest text-brand-red font-bold">— Ajay</span>
              </div>
            </div>

            {/* Right Panel: Biography and Tabs */}
            <div className="panel-right split-transition bg-canvas flex flex-col justify-start pt-28 pb-12 px-8 md:px-20 lg:px-24 bg-dot-pattern">
              <div className="max-w-xl my-auto">
                <span className="text-brand-red text-xs font-bold tracking-[0.25em] uppercase block mb-3 font-outfit">BACKGROUND & PHILOSOPHY</span>
                <h2 className="text-3xl md:text-5xl font-serif text-ink tracking-tight leading-tight mb-8 font-light">
                  Architecting Future <br /><span className="font-semibold italic text-ink-muted">Enterprises</span>.
                </h2>

                {/* Tabs Selector */}
                <div className="flex border-b border-line mb-8">
                  {['journey', 'vision', 'mission'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`py-3 px-6 text-xs uppercase tracking-widest font-outfit font-bold relative transition-colors cursor-pointer ${activeTab === tab ? 'text-ink' : 'text-ink-subtle hover:text-ink-muted'}`}
                    >
                      {activeTab === tab && (
                        <div className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-brand-red"></div>
                      )}
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Tab Contents */}
                <div className="min-h-[250px]">
                  {activeTab === 'journey' && (
                    <div className="space-y-5 text-ink-muted text-sm leading-relaxed font-light">
                      <p>
                        Ajay’s journey into photography began as a spontaneous passion that soon evolved into a lifelong calling. Originally trained as an engineer, he discovered his true creative spirit behind the lens—where precision met imagination.
                      </p>
                      <p>
                        Today, Ajay is not only a renowned photographer but also a driven entrepreneur, an avid traveler, and a devoted car enthusiast. With an exceptional eye for detail and a bold creative vision, he continues to push boundaries, capturing stories that transcend the ordinary and celebrate the extraordinary.
                      </p>
                    </div>
                  )}

                  {activeTab === 'vision' && (
                    <div className="space-y-5 text-ink-muted text-sm leading-relaxed font-light">
                      <p>
                        To become a premier, full-service wedding photography studio that offers end-to-end creative solutions for clients around the world.
                      </p>
                      <p>
                        At Zero Gravity Photography, we strive to combine the talent of passionate professionals with the latest technology to produce visual content that deeply resonates with our audience.
                      </p>
                    </div>
                  )}

                  {activeTab === 'mission' && (
                    <div className="space-y-5 text-ink-muted text-sm leading-relaxed font-light font-sans">
                      <p>
                        Our mission is to elevate creative storytelling by offering personalized photography experiences that authentically reflect each client’s personality and emotion.
                      </p>
                      <p>
                        We aim to capture natural expressions and unforgettable moments through our photography and videography services—preserving every detail and emotion to create memories that last a lifetime.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ================= GROUP COMPANIES SECTION ================= */}
        {shouldRender('companies') && (
          <section id="companies" className={`section-container ${getSectionClass('companies')}`}>
            {/* Left Panel: Interactive List of Portfolio Companies */}
            <div className="panel-left split-transition bg-panel flex flex-col justify-start pt-28 pb-12 px-8 md:px-20 lg:px-24 border-r border-line bg-grid-pattern">
              <div className="max-w-xl my-auto">
                <span className="text-brand-red text-xs font-bold tracking-[0.25em] uppercase block mb-3 font-outfit">ZEROGRAVITY GROUP</span>
                <h2 className="text-3xl md:text-5xl font-serif text-ink tracking-tight leading-tight mb-8 font-light">
                  Our Portfolio <br /><span className="font-semibold italic text-ink-muted">Companies</span>.
                </h2>

                {/* Companies vertical list */}
                <div className="space-y-4">
                  {COMPANIES.map((company) => {
                    const isSelected = activeCompany.id === company.id;
                    return (
                      <button
                        key={company.id}
                        onClick={() => setActiveCompany(company)}
                        className={`w-full text-left p-6 border transition-all duration-300 cursor-pointer flex items-center justify-between ${isSelected ? 'border-brand-red bg-brand-red/5' : 'border-line bg-surface/20 hover:border-line-strong'}`}
                      >
                        <div>
                          <span className={`text-[10px] font-outfit uppercase tracking-widest block mb-1.5 ${isSelected ? 'text-brand-red font-bold' : 'text-ink-subtle'}`}>
                            {company.sector}
                          </span>
                          <h3 className="text-ink font-bold text-lg md:text-xl">{company.name}</h3>
                        </div>
                        <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${isSelected ? 'border-brand-red text-on-accent bg-brand-red' : 'border-line-strong text-ink-subtle group-hover:border-ink-subtle'}`}>
                          <ChevronRight size={16} />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Panel: Selected Company Deep-Dive */}
            <div className="panel-right split-transition bg-panel-2 flex flex-col justify-start pt-28 pb-12 px-8 md:px-20 lg:px-24">
              <div className="max-w-lg my-auto">
                <div className={`p-8 border rounded-lg ${activeCompany.bgClass} backdrop-blur-md`}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded bg-ink/5 border border-ink/10 flex items-center justify-center text-brand-red">
                      <Building size={20} />
                    </div>
                    <div>
                      <h4 className="text-ink text-xs uppercase tracking-widest font-outfit font-bold">PORTFOLIO CASE STUDY</h4>
                      <h3 className="text-ink text-2xl font-black tracking-tight">{activeCompany.name}</h3>
                    </div>
                  </div>

                  <p className="text-ink-muted text-sm leading-relaxed mb-8 font-light">
                    {activeCompany.description}
                  </p>

                  <div className="border-t border-line/60 pt-6 mb-8">
                    <span className="text-[10px] font-bold text-ink-subtle uppercase tracking-widest block mb-4 font-outfit">KEY BUSINESS METRICS</span>
                    <div className="grid grid-cols-3 gap-4">
                      {activeCompany.metrics.map((metric, i) => (
                        <div key={i}>
                          <span className="text-ink-subtle text-[10px] block mb-1 uppercase font-semibold">{metric.label}</span>
                          <span className="text-ink text-sm font-extrabold font-outfit">{metric.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {activeCompany.services ? (
                    <div className="border-t border-line/60 pt-6">
                      <span className="text-[10px] font-bold text-ink-subtle uppercase tracking-widest block mb-4 font-outfit">SERVICES & WEB BRANDS</span>
                      <div className="space-y-3">
                        {activeCompany.services.map((svc, i) => (
                          <div key={i} className="flex items-center justify-between bg-surface/40 border border-line px-4 py-3 hover:border-brand-red/30 transition-colors">
                            <span className="text-ink text-xs font-semibold">{svc.name}</span>
                            <a
                              href={svc.link}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-red hover:text-ink transition-colors group cursor-pointer"
                            >
                              <span>Visit Site</span>
                              <ExternalLink size={11} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <a
                      href={activeCompany.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-bold text-brand-red uppercase tracking-widest hover:text-ink transition-colors cursor-pointer group"
                    >
                      <span>Visit website link</span>
                      <ExternalLink size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ================= ACHIEVEMENTS SECTION ================= */}
        {shouldRender('achievements') && (
          <section id="achievements" className={`section-container ${getSectionClass('achievements')}`}>
            {/* Left Panel: Milestone Timeline */}
            <div className="panel-left split-transition bg-canvas flex flex-col justify-start pt-28 pb-12 px-8 md:px-20 lg:px-24 border-r border-line bg-dot-pattern">
              <div className="max-w-xl my-auto">
                <span className="text-brand-red text-xs font-bold tracking-[0.25em] uppercase block mb-3 font-outfit">LEADERSHIP TIMELINE</span>
                <h2 className="text-3xl md:text-5xl font-serif text-ink tracking-tight leading-tight mb-8 font-light">
                  Milestones & <br /><span className="font-semibold italic text-ink-muted">Accolades</span>.
                </h2>

                <div className="relative pl-6 border-l border-line space-y-8">
                  {[
                    { year: '2026', title: 'Global Leader of the Year', desc: 'Awarded by the Clean Energy Forum for leading funding and scaling of smarter grids.' },
                    { year: '2024', title: 'Zerogravity Technologies Milestone', desc: 'Successfully structured the $820M acquisition of Apex Technologies VC assets.' },
                    { year: '2021', title: 'Council Seat Appointment', desc: 'Appointed Advisor to the Federal Tech Board on private-public innovation partnerships.' },
                    { year: '2018', title: 'ZeroGravity Ventures Launch', desc: 'Closed the first major investment fund to scale and accelerate DeepTech startups.' }
                  ].map((milestone, i) => (
                    <div key={i} className="relative group">
                      {/* Bullet circle */}
                      <div className="absolute left-[-29px] top-1.5 w-3 h-3 rounded-full bg-surface border border-line-strong group-hover:bg-brand-red group-hover:border-brand-red transition-colors"></div>
                      <span className="text-brand-red text-xs font-bold font-outfit tracking-widest uppercase block mb-1">{milestone.year}</span>
                      <h4 className="text-ink text-base font-bold mb-1.5">{milestone.title}</h4>
                      <p className="text-ink-muted text-xs leading-relaxed font-light">{milestone.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Panel: Impact Metrics Grid */}
            <div className="panel-right split-transition bg-panel flex flex-col justify-start pt-28 pb-12 px-8 md:px-20 lg:px-24 bg-grid-pattern">
              <div className="max-w-xl my-auto">
                <span className="text-brand-red text-xs font-bold tracking-[0.25em] uppercase block mb-3 font-outfit">AGGREGATE QUANTIFIABLE IMPACT</span>
                <h3 className="text-2xl font-serif italic mb-10 text-ink-muted">Measuring a legacy by the numbers.</h3>

                <div className="grid grid-cols-2 gap-8">
                  {[
                    { num: '$450M+', label: 'Asset Value Managed', desc: 'Total asset value managed across our holding group.' },
                    { num: '15+', label: 'Portfolio Exits', desc: 'Successful mergers, acquisitions, and public IPO list exits.' },
                    { num: '40k+', label: 'Global Workforce', desc: 'Total employee workforce across our portfolio group.' },
                    { num: '320+', label: 'Industry Patented Tech', desc: 'Proprietary technologies licensed worldwide.' }
                  ].map((metric, i) => (
                    <div key={i} className="border border-line bg-surface/40 p-6 rounded hover:border-brand-red/20 transition-all hover:scale-[1.01]">
                      <span className="text-3xl md:text-5xl font-outfit font-black tracking-tight text-ink block mb-2">{metric.num}</span>
                      <span className="text-brand-red text-xs font-bold uppercase tracking-wider block mb-2 font-outfit">{metric.label}</span>
                      <p className="text-ink-subtle text-xs leading-relaxed font-light">{metric.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}



        {/* ================= CONTACT SECTION ================= */}
        {shouldRender('contact') && (
          <section id="contact" className={`section-container ${getSectionClass('contact')}`}>
            {/* Left Panel: Minimalist Contact Form */}
            <div className="panel-left split-transition bg-canvas flex flex-col justify-start pt-28 pb-12 px-8 md:px-20 lg:px-24 border-r border-line bg-dot-pattern">
              <div className="max-w-xl my-auto">
                <span className="text-brand-red text-xs font-bold tracking-[0.25em] uppercase block mb-3 font-outfit">INQUIRIES & ENGAGEMENTS</span>
                <h2 className="text-3xl md:text-5xl font-serif text-ink tracking-tight leading-tight mb-8 font-light">
                  Initiate a <br /><span className="font-semibold italic text-ink-muted">Dialogue</span>.
                </h2>

                {formSubmitted ? (
                  <div className="bg-emerald-950/20 border border-emerald-500/30 p-6 rounded-lg text-left animate-fade-in">
                    <div className="flex items-center gap-3 mb-2 text-emerald-400">
                      <CheckCircle size={20} />
                      <span className="font-bold font-outfit uppercase tracking-widest text-xs">TRANSMISSION RECEIVED</span>
                    </div>
                    <p className="text-ink-muted text-sm leading-relaxed font-light">
                      Your inquiry has been directly routed to Ajay's private office. An executive assistant will respond to your submission within 24 business hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-6">
                    <div className="relative">
                      <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className="floating-label-input w-full bg-transparent text-ink text-sm py-3 px-1 placeholder-transparent focus:border-brand-red outline-none"
                        placeholder="Full Name"
                        required
                      />
                      <label
                        htmlFor="name"
                        className="absolute left-1 top-3 text-xs uppercase tracking-widest text-ink-subtle transition-all duration-300 pointer-events-none select-none"
                      >
                        Full Name
                      </label>
                    </div>

                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="floating-label-input w-full bg-transparent text-ink text-sm py-3 px-1 placeholder-transparent focus:border-brand-red outline-none"
                        placeholder="Email Address"
                        required
                      />
                      <label
                        htmlFor="email"
                        className="absolute left-1 top-3 text-xs uppercase tracking-widest text-ink-subtle transition-all duration-300 pointer-events-none select-none"
                      >
                        Email Address
                      </label>
                    </div>

                    <div className="relative">
                      <textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                        rows="4"
                        className="floating-label-input w-full bg-transparent text-ink text-sm py-3 px-1 placeholder-transparent focus:border-brand-red outline-none resize-none"
                        placeholder="Message / Project Scope"
                        required
                      ></textarea>
                      <label
                        htmlFor="message"
                        className="absolute left-1 top-3 text-xs uppercase tracking-widest text-ink-subtle transition-all duration-300 pointer-events-none select-none"
                      >
                        Message / Project Scope
                      </label>
                    </div>

                    <button
                      type="submit"
                      className="group flex items-center gap-3 bg-brand-red hover:bg-brand-red/90 text-on-accent font-outfit text-sm font-bold uppercase tracking-wider px-8 py-4.5 transition-all border border-brand-red cursor-pointer"
                    >
                      <span>Send inquiry</span>
                      <Send size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Right Panel: Office details & mockup map */}
            <div className="panel-right split-transition bg-panel flex flex-col justify-start pt-28 pb-12 px-8 md:px-20 lg:px-24 bg-grid-pattern">
              <div className="max-w-xl my-auto">
                <span className="text-brand-red text-xs font-bold tracking-[0.25em] uppercase block mb-3 font-outfit">OFFICE DIRECTORY</span>
                <h3 className="text-2xl font-serif italic mb-8 text-ink-muted">ZeroGravity HQ.</h3>

                <div className="space-y-6 mb-10 text-ink-muted">
                  <div className="flex gap-4 items-start">
                    <Mail size={20} className="text-brand-red mt-1" />
                    <div>
                      <span className="text-xs uppercase font-outfit text-ink-subtle font-bold block mb-1">EMAIL</span>
                      <a href="mailto:office@zerogravitygroup.com" className="text-sm font-light text-ink-muted hover:text-brand-red transition-colors">office@zerogravitygroup.com</a>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <Building size={20} className="text-brand-red mt-1" />
                    <div>
                      <span className="text-xs uppercase font-outfit text-ink-subtle font-bold block mb-1">EXECUTIVE OFFICE</span>
                      <p className="text-sm font-light text-ink-muted">Private engagements &amp; meetings by appointment only.</p>
                    </div>
                  </div>
                </div>

                {/* Live location map — pinned to HQ */}
                <div className="border border-line rounded overflow-hidden h-[200px]">
                  <iframe
                    title="ZeroGravity Group — 42, 50 Josier St, Nungambakkam, Chennai"
                    src="https://maps.google.com/maps?q=42%2C%2050%2C%20Josier%20St%2C%20Tirumurthy%20Nagar%2C%20Nungambakkam%2C%20Chennai%2C%20Tamil%20Nadu%20600034&z=16&output=embed"
                    className="w-full h-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* 4. Custom indicators on right edge matching Ramsay style */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-3 pointer-events-auto">
        {SECTIONS.map((sec) => {
          const isCurrent = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              onClick={() => navigateTo(sec.id)}
              className="group relative flex items-center justify-end h-6 w-6 cursor-pointer"
              aria-label={`Go to ${sec.name} section`}
            >
              {/* Dot element */}
              <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${isCurrent ? 'bg-brand-red scale-150' : 'bg-ink-subtle group-hover:bg-ink'}`}></div>

              {/* Tooltip showing section name on hover */}
              <span className="absolute right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[10px] font-outfit font-bold uppercase tracking-wider text-brand-red pointer-events-none whitespace-nowrap bg-surface px-2.5 py-1 border border-line rounded shadow-md">
                {sec.name}
              </span>
            </button>
          );
        })}
      </div>

    </div>
  );
}
