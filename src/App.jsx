import React, { useState, useEffect } from 'react';
import {
  Home,
  User,
  Briefcase,
  Trophy,
  MessageSquare,
  Mail,
  Menu,
  X,
  Play,
  ChevronRight,
  ArrowRight,
  ExternalLink,
  MapPin,
  Phone,
  Send,
  Building,
  CheckCircle,
  FileText,
  ChevronLeft
} from 'lucide-react';

// Section Definitions
const SECTIONS = [
  { id: 'hero', name: 'Hero', icon: Home },
  { id: 'about', name: 'About MD', icon: User },
  { id: 'companies', name: 'Group Companies', icon: Briefcase },
  { id: 'achievements', name: 'Achievements', icon: Trophy },
  { id: 'testimonials', name: 'Testimonials', icon: MessageSquare },
  { id: 'contact', name: 'Contact', icon: Mail }
];

// Companies Data
const COMPANIES = [
  {
    id: 1,
    name: 'ZeroGravity Technologies',
    sector: 'DeepTech & Enterprise AI Solutions',
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
    sector: 'Creative Studio & Branding',
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
    sector: 'Precision Component Engineering & Packaging',
    description: 'Delivering advanced precision engineering, industrial automation components, and advanced machinery manufacturing, adhering to world-class manufacturing standards.',
    metrics: [
      { label: 'Production Output', value: '2.4M Units/Yr' },
      { label: 'Location Hub', value: 'Chennai Outer Grid' },
      { label: 'Facility Size', value: '45k Sq.Ft.' }
    ],
    bgClass: 'bg-amber-950/20 border-amber-500/20',
    services: [
      { name: 'Rigid Boxes', link: 'https://alphapackaging.ltd/' },
      { name: 'Printing', link: 'https://alphapackaging.ltd/' },
      { name: 'Albums', link: 'https://albumsbyzerogravity.com/' }
    ]
  },
  {
    id: 4,
    name: 'ZeroGravity Events',
    sector: 'Experiential Production & Events',
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


// Testimonials Data
const TESTIMONIALS = [
  {
    id: 1,
    quote: "Ajay doesn't just capture moments; he captures the soul of the occasion. ZeroGravity's creative team set a benchmark in wedding storytelling, delivering a premium masterpiece that went far beyond our expectations.",
    author: "Ananya Ramakrishnan",
    role: "Client & Founder, Aura Wellness"
  },
  {
    id: 2,
    quote: "As a partner, Ajay operates with a rare blend of creative purity and entrepreneurial steel. He has successfully scaled ZeroGravity from a local photography studio into a diverse premium conglomerate.",
    author: "Ranganathan Swamy",
    role: "Managing Director, Chennai Ventures"
  },
  {
    id: 3,
    quote: "Ajay possesses a unique ability to align technical precision with artistic imagination. His execution across Technologies, Digital, and Manufacturing divisions is a testament to his visionary leadership.",
    author: "Siddharth Mehta",
    role: "Partner, Apex Legal Partners"
  }
];

export default function App() {
  // Navigation State
  const [activeSection, setActiveSection] = useState('hero');
  const [transitionState, setTransitionState] = useState({
    active: 'hero',
    exiting: null,
    entering: null,
    isTransitioning: false
  });

  // Interactive Component States
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeCompany, setActiveCompany] = useState(COMPANIES[0]);
  const [activeTab, setActiveTab] = useState('journey'); // For About page
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  // Staggered words for Hero section
  const [heroStaggerVisible, setHeroStaggerVisible] = useState(false);

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
    <div className="relative min-h-screen w-full bg-[#0b0b0c] text-white font-sans overflow-hidden">

      {/* 1. Header/Logo overlay matching Ramsay style */}
      <header className="absolute top-0 right-0 z-50 flex items-center justify-between w-full h-[70px] px-6 md:px-12 md:pl-32 bg-gradient-to-b from-[#0b0b0c]/90 to-transparent backdrop-blur-xs pointer-events-auto">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-full border border-brand-red bg-brand-red/10 text-brand-red font-outfit font-black text-sm">
            Z
          </div>
          <span className="font-outfit font-bold tracking-widest text-lg uppercase text-white">Zerogravity Group</span>
        </div>

        {/* Ramsay-style header information */}
        <div className="hidden lg:flex items-center gap-8 text-xs text-neutral-400 font-sans">

          <div className="w-[1px] h-3 bg-neutral-800"></div>
          <div className="flex items-center gap-2">
            <span className="text-brand-red font-medium">EMAIL:</span>
            <a href="mailto:office@zerogravitygroup.com" className="hover:text-white transition-colors">office@zerogravitygroup.com</a>
          </div>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="md:hidden flex items-center justify-center w-10 h-10 rounded border border-neutral-800 hover:border-brand-red transition-all cursor-pointer text-white"
          aria-label="Toggle Navigation Menu"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      {/* 2. Fixed Left Sidebar Navigation (Divergent template inspiration) */}
      <nav className={`fixed top-0 left-0 h-full w-[80px] bg-[#070708] border-r border-neutral-900 flex flex-col justify-between items-center py-6 z-40 transition-transform duration-300 md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>

        {/* Top Brand Logo Container */}
        <div className="flex flex-col items-center gap-1 cursor-pointer" onClick={() => navigateTo('hero')}>
          <div className="w-10 h-10 flex items-center justify-center bg-brand-red text-white font-outfit font-black text-lg">
            JV
          </div>
          <span className="text-[9px] text-neutral-500 font-medium tracking-widest mt-1">START</span>
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
                className={`group relative w-full py-3 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 text-neutral-500 hover:text-white`}
              >
                {/* Active Red Highlight Bar */}
                <div className={`absolute left-0 top-0 h-full w-[3px] bg-brand-red transition-transform duration-300 ${isCurrent ? 'scale-y-100' : 'scale-y-0 group-hover:scale-y-50'}`}></div>

                <IconComponent size={20} className={`transition-all duration-300 ${isCurrent ? 'text-brand-red scale-110' : 'group-hover:scale-105'}`} />
                <span className={`text-[10px] tracking-wider mt-1.5 font-outfit font-medium uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block absolute left-[80px] bg-neutral-950 text-white px-3 py-1.5 border border-neutral-800 rounded pointer-events-none whitespace-nowrap z-50 shadow-xl`}>
                  {sec.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Bottom Social Links & Copyright */}
        <div className="flex flex-col items-center gap-4 text-neutral-600">
          <div className="w-4 h-[1px] bg-neutral-800"></div>
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
            <div className="panel-left split-transition flex flex-col justify-start pt-28 pb-12 px-8 md:px-20 lg:px-24 bg-[#0c0c0d] bg-grid-pattern overflow-hidden">
              <div className="max-w-xl">
                {/* Staggered Serif Word Reveals (IvyPresto heading style) */}
                <div className="mb-6 font-serif italic">
                  <div className="line-mask block text-5xl md:text-7xl lg:text-8xl tracking-tight text-white mb-2 leading-none">
                    <span className="inline-block animate-reveal">
                      Strategy<span className="text-brand-red">.</span>
                    </span>
                  </div>
                  <br />
                  <div className="line-mask block text-5xl md:text-7xl lg:text-8xl tracking-tight text-white mb-2 leading-none">
                    <span className="inline-block animate-reveal stagger-1">
                      Creativity<span className="text-brand-red">.</span>
                    </span>
                  </div>
                  <br />
                  <div className="line-mask block text-5xl md:text-7xl lg:text-8xl tracking-tight text-neutral-400 leading-none">
                    <span className="inline-block animate-reveal stagger-2">
                      Results<span className="text-brand-red">.</span>
                    </span>
                  </div>
                </div>

                <h1 className="sr-only">ZEROGRAVITY GROUP</h1>

                {/* Supporting Text: Executive philosophy */}
                <p className="text-neutral-300 text-lg md:text-xl leading-relaxed mb-10 font-light max-w-lg animate-fade-in stagger-3">
                  I build what others envision
                </p>


                {/* CTA Buttons - Ramsay style play button and Divergent explore button */}
                <div className="flex flex-wrap items-center gap-6 opacity-0 animate-fade-in stagger-4">
                  <button
                    onClick={() => navigateTo('companies')}
                    className="group flex items-center gap-3 bg-brand-red hover:bg-brand-red/90 text-white font-outfit text-sm font-bold uppercase tracking-wider px-8 py-4.5 rounded-none transition-all duration-300 hover:shadow-lg hover:shadow-brand-red/20 border border-brand-red cursor-pointer"
                  >
                    <span>Explore Companies</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button
                    onClick={() => setShowVideoModal(true)}
                    className="group flex items-center gap-3 hover:text-brand-red text-neutral-300 transition-colors py-3 cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-full border border-neutral-800 group-hover:border-brand-red flex items-center justify-center text-white bg-neutral-950/50 transition-all group-hover:scale-105 shadow-md">
                      <Play size={16} className="fill-white translate-x-0.5" />
                    </div>
                    <span className="font-outfit text-xs font-bold uppercase tracking-wider">Watch brand reel</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Panel: Portrait matching Ramsay visual style */}
            <div className="panel-right split-transition bg-[#09090a] relative flex items-center justify-center overflow-hidden">
              {/* Dark vignette gradient to blend image into background */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#0b0b0c] via-[#09090a]/50 to-transparent z-10 hidden md:block"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0c] via-transparent to-transparent z-10 md:hidden"></div>

              {/* Executive Image */}
              <img
                src="/md_hero_portrait.jpg"
                alt="Julian Vance Portrait"
                className="absolute inset-0 w-full h-full object-cover object-center grayscale hover:grayscale-0 transition-all duration-1000 scale-102"
              />

              {/* Editorial bottom detail overlay */}
              <div className="absolute bottom-10 right-10 z-20 text-right font-outfit select-none pointer-events-none hidden lg:block">
                <span className="text-[10px] tracking-[0.3em] text-neutral-500 font-bold uppercase block mb-1">FOUNDER</span>
                <span className="text-lg text-white font-extrabold tracking-widest uppercase">ZEROGRAVITY GROUP.</span>
                <span className="block text-brand-red text-xs mt-1">CHENNAI</span>
              </div>
            </div>
          </section>
        )}

        {/* ================= ABOUT MD SECTION ================= */}
        {shouldRender('about') && (
          <section id="about" className={`section-container ${getSectionClass('about')}`}>
            {/* Left Panel: Profile Image */}
            <div className="panel-left split-transition bg-[#0d0d0e] relative flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-l from-[#0b0b0c] via-[#0d0d0e]/30 to-transparent z-10 hidden md:block"></div>
              <img
                src="/md_about.jpg"
                alt="Julian Vance in boardroom"
                className="absolute inset-0 w-full h-full object-cover object-right grayscale hover:grayscale-0 transition-all duration-1000"
              />
              <div className="absolute bottom-10 left-10 z-20 text-left bg-neutral-950/80 backdrop-blur-md border border-neutral-800 p-6 max-w-sm hidden xl:block">
                <p className="font-serif italic text-lg text-neutral-200 mb-2">"Behind the lens is where precision meets imagination."</p>
                <span className="text-xs font-outfit uppercase tracking-widest text-brand-red font-bold">— Ajay</span>
              </div>
            </div>

            {/* Right Panel: Biography and Tabs */}
            <div className="panel-right split-transition bg-[#0b0b0c] flex flex-col justify-start pt-28 pb-12 px-8 md:px-20 lg:px-24 bg-dot-pattern">
              <div className="max-w-xl">
                <span className="text-brand-red text-xs font-bold tracking-[0.25em] uppercase block mb-3 font-outfit">BACKGROUND & PHILOSOPHY</span>
                <h2 className="text-3xl md:text-5xl font-serif text-white tracking-tight leading-tight mb-8 font-light">
                  Architecting Future <br /><span className="font-semibold italic text-neutral-300">Enterprises</span>.
                </h2>

                {/* Tabs Selector */}
                <div className="flex border-b border-neutral-900 mb-8">
                  {['journey', 'vision', 'mission'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`py-3 px-6 text-xs uppercase tracking-widest font-outfit font-bold relative transition-colors cursor-pointer ${activeTab === tab ? 'text-white' : 'text-neutral-500 hover:text-neutral-300'}`}
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
                    <div className="space-y-5 text-neutral-400 text-sm leading-relaxed font-light">
                      <p>
                        Ajay’s journey into photography began as a spontaneous passion that soon evolved into a lifelong calling. Originally trained as an engineer, he discovered his true creative spirit behind the lens—where precision met imagination.
                      </p>
                      <p>
                        Today, Ajay is not only a renowned photographer but also a driven entrepreneur, an avid traveler, and a devoted car enthusiast. With an exceptional eye for detail and a bold creative vision, he continues to push boundaries, capturing stories that transcend the ordinary and celebrate the extraordinary.
                      </p>
                    </div>
                  )}

                  {activeTab === 'vision' && (
                    <div className="space-y-5 text-neutral-400 text-sm leading-relaxed font-light">
                      <p>
                        To become a premier, full-service wedding photography studio that offers end-to-end creative solutions for clients around the world.
                      </p>
                      <p>
                        At Zero Gravity Photography, we strive to combine the talent of passionate professionals with the latest technology to produce visual content that deeply resonates with our audience.
                      </p>
                    </div>
                  )}

                  {activeTab === 'mission' && (
                    <div className="space-y-5 text-neutral-400 text-sm leading-relaxed font-light font-sans">
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
            <div className="panel-left split-transition bg-[#0c0c0d] flex flex-col justify-start pt-28 pb-12 px-8 md:px-20 lg:px-24 border-r border-neutral-900 bg-grid-pattern">
              <div className="max-w-xl">
                <span className="text-brand-red text-xs font-bold tracking-[0.25em] uppercase block mb-3 font-outfit">ZEROGRAVITY GROUP</span>
                <h2 className="text-3xl md:text-5xl font-serif text-white tracking-tight leading-tight mb-8 font-light">
                  Our Portfolio <br /><span className="font-semibold italic text-neutral-300">Companies</span>.
                </h2>

                {/* Companies vertical list */}
                <div className="space-y-4">
                  {COMPANIES.map((company) => {
                    const isSelected = activeCompany.id === company.id;
                    return (
                      <button
                        key={company.id}
                        onClick={() => setActiveCompany(company)}
                        className={`w-full text-left p-6 border transition-all duration-300 cursor-pointer flex items-center justify-between ${isSelected ? 'border-brand-red bg-brand-red/5' : 'border-neutral-900 bg-neutral-950/20 hover:border-neutral-800'}`}
                      >
                        <div>
                          <span className={`text-[10px] font-outfit uppercase tracking-widest block mb-1.5 ${isSelected ? 'text-brand-red font-bold' : 'text-neutral-500'}`}>
                            {company.sector}
                          </span>
                          <h3 className="text-white font-bold text-lg md:text-xl">{company.name}</h3>
                        </div>
                        <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${isSelected ? 'border-brand-red text-white bg-brand-red' : 'border-neutral-800 text-neutral-500 group-hover:border-neutral-600'}`}>
                          <ChevronRight size={16} />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Panel: Selected Company Deep-Dive */}
            <div className="panel-right split-transition bg-[#09090a] flex flex-col justify-start pt-28 pb-12 px-8 md:px-20 lg:px-24">
              <div className="max-w-lg">
                <div className={`p-8 border rounded-lg ${activeCompany.bgClass} backdrop-blur-md`}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded bg-white/5 border border-white/10 flex items-center justify-center text-brand-red">
                      <Building size={20} />
                    </div>
                    <div>
                      <h4 className="text-white text-xs uppercase tracking-widest font-outfit font-bold">PORTFOLIO CASE STUDY</h4>
                      <h3 className="text-white text-2xl font-black tracking-tight">{activeCompany.name}</h3>
                    </div>
                  </div>

                  <p className="text-neutral-400 text-sm leading-relaxed mb-8 font-light">
                    {activeCompany.description}
                  </p>

                  <div className="border-t border-neutral-900/60 pt-6 mb-8">
                    <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest block mb-4 font-outfit">KEY BUSINESS METRICS</span>
                    <div className="grid grid-cols-3 gap-4">
                      {activeCompany.metrics.map((metric, i) => (
                        <div key={i}>
                          <span className="text-neutral-500 text-[10px] block mb-1 uppercase font-semibold">{metric.label}</span>
                          <span className="text-white text-sm font-extrabold font-outfit">{metric.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {activeCompany.services ? (
                    <div className="border-t border-neutral-900/60 pt-6">
                      <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest block mb-4 font-outfit">SERVICES & WEB BRANDS</span>
                      <div className="space-y-3">
                        {activeCompany.services.map((svc, i) => (
                          <div key={i} className="flex items-center justify-between bg-neutral-950/40 border border-neutral-900 px-4 py-3 hover:border-brand-red/30 transition-colors">
                            <span className="text-white text-xs font-semibold">{svc.name}</span>
                            <a 
                              href={svc.link} 
                              target="_blank" 
                              rel="noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-red hover:text-white transition-colors group cursor-pointer"
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
                      className="inline-flex items-center gap-2 text-xs font-bold text-brand-red uppercase tracking-widest hover:text-white transition-colors cursor-pointer group"
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
            <div className="panel-left split-transition bg-[#0b0b0c] flex flex-col justify-start pt-28 pb-12 px-8 md:px-20 lg:px-24 border-r border-neutral-900 bg-dot-pattern">
              <div className="max-w-xl">
                <span className="text-brand-red text-xs font-bold tracking-[0.25em] uppercase block mb-3 font-outfit">LEADERSHIP TIMELINE</span>
                <h2 className="text-3xl md:text-5xl font-serif text-white tracking-tight leading-tight mb-8 font-light">
                  Milestones & <br /><span className="font-semibold italic text-neutral-300">Accolades</span>.
                </h2>

                <div className="relative pl-6 border-l border-neutral-900 space-y-8">
                  {[
                    { year: '2026', title: 'Global Leader of the Year', desc: 'Awarded by the Clean Energy Forum for leading funding and scaling of smarter grids.' },
                    { year: '2024', title: 'Apex Acquisition Milestone', desc: 'Successfully structured the $820M acquisition of Apex Technologies VC assets.' },
                    { year: '2021', title: 'Council Seat Appointment', desc: 'Appointed Advisor to the Federal Tech Board on private-public innovation partnerships.' },
                    { year: '2018', title: 'Vance Capital Fund II Launch', desc: 'Closed the second venture capital fund at a record $600M under management.' }
                  ].map((milestone, i) => (
                    <div key={i} className="relative group">
                      {/* Bullet circle */}
                      <div className="absolute left-[-29px] top-1.5 w-3 h-3 rounded-full bg-neutral-950 border border-neutral-800 group-hover:bg-brand-red group-hover:border-brand-red transition-colors"></div>
                      <span className="text-brand-red text-xs font-bold font-outfit tracking-widest uppercase block mb-1">{milestone.year}</span>
                      <h4 className="text-white text-base font-bold mb-1.5">{milestone.title}</h4>
                      <p className="text-neutral-400 text-xs leading-relaxed font-light">{milestone.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Panel: Impact Metrics Grid */}
            <div className="panel-right split-transition bg-[#0c0c0d] flex flex-col justify-start pt-28 pb-12 px-8 md:px-20 lg:px-24 bg-grid-pattern">
              <div className="max-w-xl">
                <span className="text-brand-red text-xs font-bold tracking-[0.25em] uppercase block mb-3 font-outfit">AGGREGATE QUANTIFIABLE IMPACT</span>
                <h3 className="text-white text-2xl font-serif italic mb-10 text-neutral-300">Measuring a legacy by the numbers.</h3>

                <div className="grid grid-cols-2 gap-8">
                  {[
                    { num: '$2.5B+', label: 'Asset Value Managed', desc: 'Total asset value managed across our holding group.' },
                    { num: '15+', label: 'Portfolio Exits', desc: 'Successful mergers, acquisitions, and public IPO list exits.' },
                    { num: '40k+', label: 'Global Workforce', desc: 'Total employee workforce across our portfolio group.' },
                    { num: '320+', label: 'Industry Patented Tech', desc: 'Proprietary technologies licensed worldwide.' }
                  ].map((metric, i) => (
                    <div key={i} className="border border-neutral-900 bg-neutral-950/40 p-6 rounded hover:border-brand-red/20 transition-all hover:scale-[1.01]">
                      <span className="text-3xl md:text-5xl font-outfit font-black tracking-tight text-white block mb-2">{metric.num}</span>
                      <span className="text-brand-red text-xs font-bold uppercase tracking-wider block mb-2 font-outfit">{metric.label}</span>
                      <p className="text-neutral-500 text-xs leading-relaxed font-light">{metric.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ================= TESTIMONIALS SECTION ================= */}
        {shouldRender('testimonials') && (
          <section id="testimonials" className={`section-container ${getSectionClass('testimonials')}`}>
            {/* Left Panel: Quote Slider */}
            <div className="panel-left split-transition bg-[#0c0c0d] flex flex-col justify-start pt-28 pb-12 px-8 md:px-20 lg:px-24 border-r border-neutral-900 bg-grid-pattern">
              <div className="max-w-xl">
                <span className="text-brand-red text-xs font-bold tracking-[0.25em] uppercase block mb-3 font-outfit">BOARD & PEER TESTIMONIALS</span>
                <h2 className="text-3xl md:text-5xl font-serif text-white tracking-tight leading-tight mb-8 font-light">
                  Partner <br /><span className="font-semibold italic text-neutral-300">Perspectives</span>.
                </h2>

                <div className="relative min-h-[220px]">
                  {TESTIMONIALS.map((item, idx) => (
                    <div
                      key={item.id}
                      className={`transition-all duration-500 absolute inset-0 flex flex-col justify-between ${idx === currentTestimonial ? 'opacity-100 translate-x-0 pointer-events-auto' : 'opacity-0 translate-x-10 pointer-events-none'}`}
                    >
                      <p className="font-serif italic text-lg md:text-xl text-neutral-200 leading-relaxed mb-6">
                        "{item.quote}"
                      </p>
                      <div>
                        <span className="text-white text-base font-bold block">{item.author}</span>
                        <span className="text-brand-red text-xs uppercase tracking-wider font-outfit font-bold">{item.role}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Slider Controls */}
                <div className="flex items-center gap-4 mt-8">
                  <button
                    onClick={() => setCurrentTestimonial(prev => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1))}
                    className="w-10 h-10 rounded border border-neutral-900 bg-neutral-950/50 flex items-center justify-center text-neutral-400 hover:text-white hover:border-brand-red transition-all cursor-pointer"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <span className="text-xs font-outfit text-neutral-500 font-bold tracking-widest">
                    {currentTestimonial + 1} / {TESTIMONIALS.length}
                  </span>
                  <button
                    onClick={() => setCurrentTestimonial(prev => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1))}
                    className="w-10 h-10 rounded border border-neutral-900 bg-neutral-950/50 flex items-center justify-center text-neutral-400 hover:text-white hover:border-brand-red transition-all cursor-pointer"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Panel: Global Footprint Footnotes */}
            <div className="panel-right split-transition bg-[#09090a] flex flex-col justify-start pt-28 pb-12 px-8 md:px-20 lg:px-24 bg-dot-pattern">
              <div className="max-w-xl">
                <span className="text-brand-red text-xs font-bold tracking-[0.25em] uppercase block mb-3 font-outfit">GLOBAL OPERATION NETWORKS</span>
                <h3 className="text-white text-2xl font-serif italic mb-8 text-neutral-300">Generational reach across key capital hubs.</h3>

                <div className="space-y-6">
                  {[
                    { hub: 'Chennai — HQ & Digital Labs', details: 'Primary creative design studios, photography editing headquarters, and tech development labs. Josier St, Nungambakkam.' },
                    { hub: 'Mumbai — Creative Studio', details: 'ZeroGravity Digital regional headquarters and corporate brand activation division.' },
                    { hub: 'Bangalore — Tech Hub', details: 'ZeroGravity Technologies enterprise software engineering seat and core AI model development lab.' },
                    { hub: 'Singapore — South Asia Net', details: 'Managing global wedding photography bookings and international corporate activations.' }
                  ].map((network, i) => (
                    <div key={i} className="flex gap-4 items-start border-b border-neutral-900/60 pb-5">
                      <div className="w-2 h-2 rounded-full bg-brand-red mt-1.5 flex-shrink-0 animate-pulse"></div>
                      <div>
                        <h4 className="text-white text-sm font-bold uppercase tracking-wider font-outfit mb-1">{network.hub}</h4>
                        <p className="text-neutral-400 text-xs leading-relaxed font-light">{network.details}</p>
                      </div>
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
            <div className="panel-left split-transition bg-[#0b0b0c] flex flex-col justify-start pt-28 pb-12 px-8 md:px-20 lg:px-24 border-r border-neutral-900 bg-dot-pattern">
              <div className="max-w-xl">
                <span className="text-brand-red text-xs font-bold tracking-[0.25em] uppercase block mb-3 font-outfit">INQUIRIES & ENGAGEMENTS</span>
                <h2 className="text-3xl md:text-5xl font-serif text-white tracking-tight leading-tight mb-8 font-light">
                  Initiate a <br /><span className="font-semibold italic text-neutral-300">Dialogue</span>.
                </h2>

                {formSubmitted ? (
                  <div className="bg-emerald-950/20 border border-emerald-500/30 p-6 rounded-lg text-left animate-fade-in">
                    <div className="flex items-center gap-3 mb-2 text-emerald-400">
                      <CheckCircle size={20} />
                      <span className="font-bold font-outfit uppercase tracking-widest text-xs">TRANSMISSION RECEIVED</span>
                    </div>
                    <p className="text-neutral-400 text-sm leading-relaxed font-light">
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
                        className="floating-label-input w-full bg-transparent text-white text-sm py-3 px-1 placeholder-transparent focus:border-brand-red outline-none"
                        placeholder="Full Name"
                        required
                      />
                      <label
                        htmlFor="name"
                        className="absolute left-1 top-3 text-xs uppercase tracking-widest text-neutral-500 transition-all duration-300 pointer-events-none select-none"
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
                        className="floating-label-input w-full bg-transparent text-white text-sm py-3 px-1 placeholder-transparent focus:border-brand-red outline-none"
                        placeholder="Email Address"
                        required
                      />
                      <label
                        htmlFor="email"
                        className="absolute left-1 top-3 text-xs uppercase tracking-widest text-neutral-500 transition-all duration-300 pointer-events-none select-none"
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
                        className="floating-label-input w-full bg-transparent text-white text-sm py-3 px-1 placeholder-transparent focus:border-brand-red outline-none resize-none"
                        placeholder="Message / Project Scope"
                        required
                      ></textarea>
                      <label
                        htmlFor="message"
                        className="absolute left-1 top-3 text-xs uppercase tracking-widest text-neutral-500 transition-all duration-300 pointer-events-none select-none"
                      >
                        Message / Project Scope
                      </label>
                    </div>

                    <button
                      type="submit"
                      className="group flex items-center gap-3 bg-brand-red hover:bg-brand-red/90 text-white font-outfit text-sm font-bold uppercase tracking-wider px-8 py-4.5 transition-all border border-brand-red cursor-pointer"
                    >
                      <span>Send inquiry</span>
                      <Send size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Right Panel: Office details & mockup map */}
            <div className="panel-right split-transition bg-[#0c0c0d] flex flex-col justify-start pt-28 pb-12 px-8 md:px-20 lg:px-24 bg-grid-pattern">
              <div className="max-w-xl">
                <span className="text-brand-red text-xs font-bold tracking-[0.25em] uppercase block mb-3 font-outfit">OFFICE DIRECTORY</span>
                <h3 className="text-white text-2xl font-serif italic mb-8 text-neutral-300">ZeroGravity HQ.</h3>

                <div className="space-y-6 mb-10 text-neutral-300">
                  <div className="flex gap-4 items-start">
                    <MapPin size={20} className="text-brand-red mt-1" />
                    <div>
                      <span className="text-xs uppercase font-outfit text-neutral-500 font-bold block mb-1">HQ ADDRESS</span>
                      <p className="text-sm font-light text-neutral-400">42, 50, Josier St, Tirumurthy Nagar, Nungambakkam, Tamil Nadu 600034</p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <Phone size={20} className="text-brand-red mt-1" />
                    <div>
                      <span className="text-xs uppercase font-outfit text-neutral-500 font-bold block mb-1">GENERAL CONTACT</span>
                      <p className="text-sm font-light text-neutral-400">+91 (44) 4305-6677</p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <FileText size={20} className="text-brand-red mt-1" />
                    <div>
                      <span className="text-xs uppercase font-outfit text-neutral-500 font-bold block mb-1">SECURE ENCRYPTED COMMUNICATIONS</span>
                      <p className="text-sm font-light text-neutral-400">ajay-secure-pgp-key.txt</p>
                    </div>
                  </div>
                </div>

                {/* Styled minimalist mockup map */}
                <div className="border border-neutral-900 bg-neutral-950 p-4 h-[180px] rounded relative overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 bg-dot-pattern opacity-30"></div>

                  {/* Mock map elements */}
                  <div className="absolute w-[80%] h-[1px] bg-neutral-900 rotate-12"></div>
                  <div className="absolute w-[80%] h-[1px] bg-neutral-900 -rotate-45"></div>
                  <div className="absolute w-[60%] h-[1px] bg-neutral-900/60 rotate-90"></div>

                  {/* Central marker representing Vance Tower */}
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="w-5 h-5 rounded-full bg-brand-red/20 border border-brand-red flex items-center justify-center animate-bounce">
                      <div className="w-2.5 h-2.5 rounded-full bg-brand-red"></div>
                    </div>
                    <span className="text-[9px] uppercase tracking-widest font-extrabold font-outfit bg-neutral-900 border border-neutral-800 px-2 py-0.5 rounded text-white mt-1 shadow-md">
                      ZEROGRAVITY STUDIO
                    </span>
                  </div>

                  <span className="absolute bottom-2 right-3 text-[9px] tracking-wider text-neutral-600 font-mono">CHENNAI GRID 13.0612° N, 80.2415° E</span>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* 4. Brand Video Reel Modal (Ramsay Style) */}
      {showVideoModal && (
        <div className="fixed inset-0 z-50 bg-[#070708]/95 flex items-center justify-center p-6 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-4xl aspect-video border border-neutral-800 bg-black shadow-2xl flex items-center justify-center flex-col">
            <button
              onClick={() => setShowVideoModal(false)}
              className="absolute top-[-45px] right-0 flex items-center gap-2 text-neutral-400 hover:text-white text-xs uppercase font-outfit font-bold tracking-widest cursor-pointer"
            >
              <span>Close Video</span>
              <X size={16} />
            </button>

            {/* Custom high-end mockup interface for video player */}
            <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

            <div className="z-10 flex flex-col items-center gap-4 text-center max-w-md p-6">
              <div className="w-16 h-16 rounded-full border-2 border-brand-red flex items-center justify-center text-brand-red bg-brand-red/10 animate-pulse">
                <Play size={24} className="fill-brand-red translate-x-0.5" />
              </div>
              <h4 className="text-white text-lg font-bold font-outfit uppercase tracking-widest mt-2">Vance holdings brand reel</h4>
              <p className="text-neutral-500 text-xs leading-relaxed font-light">
                This is a high-fidelity placeholder for the brand's executive documentary: "Julian Vance: Generational Value." In production environment, this triggers a video player linking to Vimeo or YouTube.
              </p>

              <button
                onClick={() => setShowVideoModal(false)}
                className="mt-4 border border-neutral-800 hover:border-brand-red hover:text-white text-neutral-400 text-[10px] font-bold font-outfit uppercase tracking-widest px-6 py-2.5 bg-neutral-950 transition-all cursor-pointer"
              >
                Dismiss Player
              </button>
            </div>

            <div className="absolute bottom-4 left-4 text-[9px] tracking-wider text-neutral-600 font-mono">AUDIO ENGINE: PCM / 24-BIT STEREO</div>
          </div>
        </div>
      )}

      {/* 5. Custom indicators on right edge matching Ramsay style */}
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
              <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${isCurrent ? 'bg-brand-red scale-150' : 'bg-neutral-600 group-hover:bg-neutral-300'}`}></div>

              {/* Tooltip showing section name on hover */}
              <span className="absolute right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[10px] font-outfit font-bold uppercase tracking-wider text-brand-red pointer-events-none whitespace-nowrap bg-neutral-950 px-2.5 py-1 border border-neutral-900 rounded shadow-md">
                {sec.name}
              </span>
            </button>
          );
        })}
      </div>

    </div>
  );
}
