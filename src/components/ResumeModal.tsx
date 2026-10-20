import { useEffect, useState } from 'react';
import { X, ExternalLink, Printer, Check, Copy } from 'lucide-react';
import { PERSONAL_INFO, EXPERIENCES, LEADERSHIP_AND_EDUCATION, CERTIFICATIONS } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-8 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-xl transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#0d0d10] border border-white/10 shadow-2xl p-6 sm:p-10 text-left z-10 focus:outline-none">
        {/* Modal Action Bar */}
        <div className="flex items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-red-400 uppercase">Curriculum Vitae</span>
            <span aria-hidden="true" className="text-zinc-600">·</span>
            <span className="text-xs text-zinc-400">{PERSONAL_INFO.name}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyEmail}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-300 bg-zinc-900 hover:bg-zinc-800 border border-white/10 rounded-lg transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Email'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-300 bg-zinc-900 hover:bg-zinc-800 border border-white/10 rounded-lg transition-colors cursor-pointer"
              title="Print resume"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>


            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors border border-white/10 cursor-pointer"
              aria-label="Close resume modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Clean Document Presentation */}
        <div className="mt-8 space-y-10">
          {/* Header Contact Block */}
          <div className="pb-6 border-b border-white/10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {PERSONAL_INFO.name}
                </h2>
                <div className="text-sm font-semibold text-red-400 mt-1 uppercase tracking-wide">
                  Customer Success Specialist L4 &amp; Systems Specialist
                </div>
              </div>

              <div className="text-xs text-zinc-400 space-y-1 sm:text-right">
                <div>Phone: {PERSONAL_INFO.phone}</div>
                <div>Email: {PERSONAL_INFO.email}</div>
                <div>Website: {PERSONAL_INFO.website}</div>
                <div>Location: {PERSONAL_INFO.location}</div>
              </div>
            </div>
          </div>

          {/* Professional Summary */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2 pb-1 border-b border-white/10">
              Professional Summary
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              Seeking a placement to leverage my years of technical skills experience, enhance interpersonal skills and to obtain new experience in this field. By obtaining a dynamic position, I wish to develop myself professionally while helping the company to deliver excellence performances that is up to the standard and recognize to be a leader in all endeavors.
            </p>
          </div>

          {/* Experience */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-4 pb-1 border-b border-white/10">
              Professional Experience
            </h3>
            <div className="space-y-6">
              {EXPERIENCES.map((exp) => (
                <div key={exp.id} className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <div className="text-sm font-bold text-white">
                      {exp.role} <span className="text-zinc-500">·</span> <span className="text-zinc-300 font-medium">{exp.company}</span>
                    </div>
                    <span className="text-xs font-mono text-red-400 tabular-nums">
                      {exp.period}
                    </span>
                  </div>

                  {exp.tier && (
                    <div className="text-[11px] font-mono text-zinc-400 italic">
                      ({exp.tier})
                    </div>
                  )}

                  <ul className="space-y-1.5 text-xs text-zinc-400">
                    {exp.bullets.map((b, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1 h-1 rounded-full bg-zinc-500 shrink-0 mt-1.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Academic Honors */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-4 pb-1 border-b border-white/10">
              Education &amp; Credentials
            </h3>
            <div className="space-y-4">
              {LEADERSHIP_AND_EDUCATION.map((edu, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <div className="text-sm font-bold text-white">
                      {edu.institution}
                    </div>
                    <span className="text-xs font-mono text-zinc-400 tabular-nums">
                      {edu.period}
                    </span>
                  </div>
                  <div className="text-xs text-red-400 font-medium">
                    {edu.degree} · <span className="text-zinc-300">{edu.grade}</span>
                  </div>
                  <ul className="space-y-1 text-xs text-zinc-400 mt-1">
                    {edu.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1 h-1 rounded-full bg-zinc-600 shrink-0 mt-1.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-3 pb-1 border-b border-white/10">
              Certifications
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {CERTIFICATIONS.map((cert, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-zinc-900/60 border border-white/5 flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-white">{cert.name}</div>
                    <div className="text-zinc-500 text-[11px]">{cert.issuer}</div>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400">Active</span>
                </div>
              ))}
            </div>
          </div>

          {/* Direct File Link */}
          <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs text-zinc-500">
            <span>Attachment: new_simple_resume_88eb8aa2.pdf</span>
            <a
              href={PERSONAL_INFO.resumePdf}
              target="_blank"
              rel="noreferrer"
              className="text-red-400 hover:text-red-300 font-medium flex items-center gap-1"
            >
              <span>Open PDF in new tab</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
