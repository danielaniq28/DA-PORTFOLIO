import { useState } from 'react';
import { ArrowUpRight, Layers } from 'lucide-react';
import { OTHER_PROJECTS, Project } from '../data/portfolioData';

interface CaseStudiesSectionProps {
  onSelectProject: (project: Project) => void;
}

export function CaseStudiesSection({ onSelectProject }: CaseStudiesSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'cloud', label: 'Cloud Systems' },
    { id: 'hardware', label: 'Hardware & QA' },
    { id: 'creative', label: 'Brand & Web' },
  ];

  const filteredProjects = OTHER_PROJECTS.filter((project) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'cloud') {
      return (
        project.id === 'e-pusat-islam' ||
        project.id === 'e-aduan-abm' ||
        project.id === 'halal-audit-system'
      );
    }
    if (activeCategory === 'hardware') {
      return project.id === 'intel-validation';
    }
    if (activeCategory === 'creative') {
      return project.id === 'irdeco-digital';
    }
    return true;
  });

  return (
    <section id="portfolio" className="py-24 relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-red-500 uppercase mb-2">
              <span>Selected Works</span>
              <span aria-hidden="true" className="text-zinc-600">·</span>
              <span>Portfolio</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white [text-wrap:balance]">
              Engineering solutions across cloud, IoT &amp; silicon.
            </h2>
          </div>

          {/* Interactive Filter Tabs (Functional segmented controls allowed by constitution) */}
          <div className="flex items-center gap-1 p-1 bg-zinc-900/80 border border-white/10 rounded-xl self-start md:self-auto overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-zinc-800 text-white shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Bento Grid of Case Studies */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, idx) => (
            <div
              key={project.id}
              onClick={() => onSelectProject(project)}
              className={`group relative rounded-3xl bg-zinc-950/70 border border-white/10 hover:border-white/20 transition-all duration-300 p-6 flex flex-col justify-between overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl hover:-translate-y-1 ${
                idx === 0 ? 'lg:col-span-2' : ''
              }`}
            >
              {/* Top metadata (Zero-pill text separator discipline) */}
              <div>
                <div className="flex items-center justify-between text-xs text-zinc-500 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-zinc-400 font-medium">{project.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{project.year}</span>
                  </div>

                  <div className="w-8 h-8 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-400 group-hover:text-white group-hover:bg-red-600 group-hover:border-red-500 transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-red-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 mt-1 line-clamp-2">
                  {project.subtitle}
                </p>
              </div>

              {/* Visual Showcase Box */}
              <div className="my-6 relative rounded-2xl overflow-hidden bg-zinc-900/60 border border-white/5 aspect-[16/9] flex items-center justify-center p-2 group-hover:border-white/15 transition-all">
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-contain filter group-hover:scale-[1.02] transition-transform duration-500"
                />
              </div>

              {/* Bottom Tech List & Role */}
              <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-zinc-400 text-[11px] font-mono">
                  <Layers className="w-3.5 h-3.5 text-zinc-500" />
                  <span>{project.techStack.slice(0, 2).join(' · ')}</span>
                  {project.techStack.length > 2 && (
                    <span className="text-zinc-600">+{project.techStack.length - 2}</span>
                  )}
                </div>

                <span className="text-[11px] font-medium text-zinc-400 group-hover:text-white transition-colors">
                  View Study →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
