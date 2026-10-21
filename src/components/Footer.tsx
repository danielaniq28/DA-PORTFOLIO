import { ArrowUp, Github } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 border-t border-white/10 bg-black text-zinc-500 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand lockup */}
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-zinc-900 border border-white/10 flex items-center justify-center p-1">
              <img
                src={PERSONAL_INFO.brandLogo}
                alt={PERSONAL_INFO.brandName}
                className="w-full h-full object-contain filter drop-shadow"
              />
            </div>
            <div className="flex items-center gap-2 text-zinc-400">
              <span className="font-semibold text-zinc-200">{PERSONAL_INFO.name}</span>
              <span aria-hidden="true" className="text-zinc-700">/</span>
              <span>{PERSONAL_INFO.brandName}</span>
            </div>
          </div>

          {/* Site Navigation Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6 text-zinc-400">
            <a href="#hero" className="hover:text-white transition-colors">
              Overview
            </a>
            <a href="#proton-relink" className="hover:text-white transition-colors">
              Proton ReLink
            </a>
            <a href="#portfolio" className="hover:text-white transition-colors">
              Portfolio
            </a>
            <a href="#experience" className="hover:text-white transition-colors">
              Experience
            </a>
            <a href="#contact" className="hover:text-white transition-colors">
              Contact
            </a>
            <a
              href="https://github.com/danielaniq28"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
          </nav>

          {/* Back to top button & copyright */}
          <div className="flex items-center gap-4">
            <span>© {new Date().getFullYear()} {PERSONAL_INFO.preferredName}. All rights reserved.</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-full bg-zinc-900 border border-white/10 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
