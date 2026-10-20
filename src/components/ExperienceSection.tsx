import { Briefcase, GraduationCap, ShieldCheck, Award } from 'lucide-react';
import { EXPERIENCES, LEADERSHIP_AND_EDUCATION, CERTIFICATIONS } from '../data/portfolioData';

export function ExperienceSection() {
  return (
    <section id="experience" className="py-24 relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-red-500 uppercase mb-3">
            <span>Career &amp; Proven Track Record</span>
            <span aria-hidden="true" className="text-zinc-600">·</span>
            <span>Experience</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4 [text-wrap:balance]">
            Decisive leadership in high-stakes technical environments.
          </h2>

          <p className="text-base text-zinc-400 leading-relaxed [text-wrap:balance]">
            From the highest technical escalation tier for Apple devices to precision semiconductor correlation benches at Intel PG12, my background synthesizes deep hardware rigor with rapid full-stack execution.
          </p>
        </div>

        {/* Experience Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Work Experience Column */}
          <div className="lg:col-span-7 space-y-8">
            <div className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-wider text-zinc-400 pb-3 border-b border-white/10">
              <Briefcase className="w-4 h-4 text-red-500" />
              <span>Professional Experience</span>
            </div>

            <div className="space-y-8">
              {EXPERIENCES.map((exp) => (
                <div
                  key={exp.id}
                  className="rounded-3xl bg-zinc-950/60 border border-white/10 p-6 sm:p-7 relative transition-all duration-300 hover:border-white/20"
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-2">
                    <h3 className="text-lg sm:text-xl font-bold text-white">
                      {exp.role}
                    </h3>
                    <span className="text-xs font-mono text-red-400 font-semibold tabular-nums shrink-0">
                      {exp.period}
                    </span>
                  </div>

                  <div className="text-xs text-zinc-400 font-medium mb-4 flex items-center gap-2">
                    <span className="text-zinc-200">{exp.company}</span>
                    <span aria-hidden="true" className="text-zinc-600">·</span>
                    <span>{exp.location}</span>
                  </div>

                  {exp.tier && (
                    <div className="text-xs font-mono text-zinc-300 bg-zinc-900/90 border border-white/5 px-3 py-1 rounded-lg inline-block mb-4">
                      {exp.tier}
                    </div>
                  )}

                  <ul className="space-y-2.5 text-xs sm:text-sm text-zinc-400">
                    {exp.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0 mt-2" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 pt-4 border-t border-white/5 flex flex-wrap gap-1.5">
                    {exp.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-mono text-zinc-400 px-2 py-0.5 rounded bg-zinc-900/60 border border-white/5"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education, Leadership & Certifications Column */}
          <div className="lg:col-span-5 space-y-12">
            {/* Education & Leadership Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-wider text-zinc-400 pb-3 border-b border-white/10">
                <GraduationCap className="w-4 h-4 text-red-500" />
                <span>Education &amp; Leadership</span>
              </div>

              <div className="space-y-4">
                {LEADERSHIP_AND_EDUCATION.map((edu, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-zinc-950/60 border border-white/10"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-sm font-bold text-white">
                        {edu.institution}
                      </h4>
                      <span className="text-[11px] font-mono text-zinc-400 shrink-0">
                        {edu.period}
                      </span>
                    </div>

                    <div className="text-xs text-red-400 font-medium mt-0.5">
                      {edu.degree}
                    </div>

                    <div className="text-[11px] text-zinc-500 mt-1 flex items-center gap-2">
                      <span>{edu.grade}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-zinc-300">{edu.honors}</span>
                    </div>

                    <ul className="mt-3 space-y-1.5 text-xs text-zinc-400">
                      {edu.highlights.map((hl, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="w-1 h-1 rounded-full bg-zinc-500 shrink-0 mt-1.5" />
                          <span>{hl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-wider text-zinc-400 pb-3 border-b border-white/10">
                <ShieldCheck className="w-4 h-4 text-red-500" />
                <span>Industry Certifications</span>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {CERTIFICATIONS.map((cert, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-zinc-900/50 border border-white/10 flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-zinc-950 border border-white/10 flex items-center justify-center shrink-0">
                        <Award className="w-4 h-4 text-red-400" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white leading-tight">
                          {cert.name}
                        </div>
                        <div className="text-[11px] text-zinc-400 mt-0.5">
                          {cert.issuer}
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                      Verified
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
