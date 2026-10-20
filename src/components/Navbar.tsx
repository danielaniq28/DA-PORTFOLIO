import { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, FileText } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface NavbarProps {
  onOpenResume: () => void;
}

export function Navbar({ onOpenResume }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ['hero', 'proton-relink', 'portfolio', 'experience', 'contact'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Overview', href: '#hero', id: 'hero' },
    { label: 'Proton ReLink', href: '#proton-relink', id: 'proton-relink' },
    { label: 'Portfolio', href: '#portfolio', id: 'portfolio' },
    { label: 'Experience', href: '#experience', id: 'experience' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#09090b]/80 backdrop-blur-xl border-b border-white/10 shadow-2xl py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Strict 3-Zone Top Bar Contract */}
        <div className="flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark / Emblem */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('#hero');
            }}
            className="flex items-center gap-3 text-white hover:opacity-90 transition-opacity whitespace-nowrap shrink-0 group focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded-lg p-1"
          >
            <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-white/10 flex items-center justify-center overflow-hidden p-1 group-hover:border-red-500/50 transition-colors">
              <img
                src={PERSONAL_INFO.brandLogo}
                alt={PERSONAL_INFO.brandName}
                className="w-full h-full object-contain filter drop-shadow"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold tracking-tight text-white flex items-center gap-1.5">
                {PERSONAL_INFO.name}
              </span>
            </div>
          </a>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.href);
                  }}
                  className={`relative py-1 transition-colors whitespace-nowrap shrink-0 hover:text-white ${
                    isActive ? 'text-white' : 'text-zinc-400'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-red-500 rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Primary Action */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenResume}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-zinc-900 hover:bg-zinc-800 border border-white/15 hover:border-red-500/50 rounded-full transition-all duration-200 shadow-sm hover:shadow-red-500/10 whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-red-500" />
              <span>Resume</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenResume}
              className="p-2 text-xs font-medium text-zinc-300 bg-zinc-900 border border-white/10 rounded-lg hover:text-white"
              aria-label="View Resume"
            >
              <FileText className="w-4 h-4 text-red-500" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-zinc-900/80 border border-white/10 text-zinc-300 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/10 bg-[#09090b]/95 backdrop-blur-2xl px-6 py-6 space-y-4 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className={`py-2 text-base font-medium transition-colors ${
                  activeSection === link.id ? 'text-red-400 font-semibold' : 'text-zinc-300 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-4 border-t border-white/10 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-zinc-900 border border-white/15 rounded-xl hover:bg-zinc-800 transition-colors"
            >
              <FileText className="w-4 h-4 text-red-500" />
              <span>View Full Resume</span>
              <ArrowUpRight className="w-4 h-4 text-zinc-400" />
            </button>
            <a
              href="http://protonrelink.danielaniq.com/"
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-red-600 hover:bg-red-500 rounded-xl transition-colors"
            >
              <span>Launch Proton ReLink ↗</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
