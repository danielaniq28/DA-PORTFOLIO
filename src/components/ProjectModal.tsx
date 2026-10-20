import { useEffect } from 'react';
import { X, ExternalLink, Cpu, CheckCircle } from 'lucide-react';
import { Project } from '../data/portfolioData';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-xl transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0e0e11] border border-white/10 shadow-2xl p-6 sm:p-8 text-left z-10 focus:outline-none">
        {/* Top bar with close button */}
        <div className="flex items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
            <span>{project.category}</span>
            <span aria-hidden="true" className="text-zinc-600">·</span>
            <span>{project.year}</span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors border border-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Header Title */}
        <div className="mt-6 mb-6">
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            {project.title}
          </h3>
          <p className="text-sm sm:text-base text-zinc-400 mt-1 font-medium">
            {project.subtitle}
          </p>
          <div className="text-xs text-red-400 font-medium mt-2">
            Role: {project.role}
          </div>
        </div>

        {/* Hero Visual */}
        <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-zinc-950 max-h-[440px] flex items-center justify-center mb-8 p-4">
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-full object-contain max-h-[440px]"
          />
        </div>

        {/* Content Breakdown */}
        <div className="space-y-6">
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-500 mb-2">
              Executive Overview
            </h4>
            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
              {project.description}
            </p>
          </div>

          {project.challenge && project.solution && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-white/10">
              <div className="p-4 rounded-2xl bg-zinc-900/60 border border-white/5">
                <h5 className="text-xs font-mono text-zinc-400 uppercase mb-1">
                  The Problem &amp; Bottleneck
                </h5>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  {project.challenge}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-900/60 border border-white/5">
                <h5 className="text-xs font-mono text-emerald-400 uppercase mb-1">
                  Engineering Solution
                </h5>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  {project.solution}
                </p>
              </div>
            </div>
          )}

          {/* Key Engineering Highlights */}
          {project.highlights && project.highlights.length > 0 && (
            <div className="pt-4 border-t border-white/10">
              <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-500 mb-3">
                Key Deliverables &amp; Outcomes
              </h4>
              <ul className="space-y-2">
                {project.highlights.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300">
                    <CheckCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tech Stack Chips */}
          <div className="pt-4 border-t border-white/10">
            <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-500 mb-2">
              Technologies &amp; Architecture
            </h4>
            <div className="flex flex-wrap items-center gap-2">
              {project.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg bg-zinc-900 border border-white/10 text-xs font-medium text-zinc-300 flex items-center gap-1.5"
                >
                  <Cpu className="w-3 h-3 text-red-400" />
                  <span>{tech}</span>
                </span>
              ))}
            </div>
          </div>

          {/* External Links */}
          {project.liveUrl && (
            <div className="pt-6 border-t border-white/10 flex justify-end">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-red-600 hover:bg-red-500 text-white text-xs font-semibold shadow-lg shadow-red-600/30 transition-all"
              >
                <span>Launch Live Application</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
