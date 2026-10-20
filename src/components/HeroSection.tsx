import { motion } from 'motion/react';
import { ArrowDown, ExternalLink, FileText, Cpu, ShieldCheck } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeroSectionProps {
  onOpenResume: () => void;
}

export function HeroSection({ onOpenResume }: HeroSectionProps) {
  const scrollToReLink = () => {
    const el = document.getElementById('proton-relink');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-[92vh] pt-32 pb-16 flex flex-col justify-center overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-red-600/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[300px] bg-blue-600/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Split Screen Hero Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Typographic Hierarchy */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col"
          >
            {/* Editorial kicker */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-red-500 uppercase mb-4">
              <span>DA Lab</span>
              <span aria-hidden="true" className="text-zinc-600">·</span>
              <span>Systems &amp; Telematics</span>
              <span aria-hidden="true" className="text-zinc-600">·</span>
              <span>Penang, MY</span>
            </div>

            {/* Display Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.08] mb-6 [text-wrap:balance]">
              Engineering hardware telemetry, cloud systems &amp; fluid interfaces.
            </h1>

            {/* Lead Copy */}
            <p className="text-base sm:text-lg text-zinc-400 font-normal leading-relaxed max-w-2xl mb-8">
              Hi, I&apos;m <span className="text-zinc-100 font-medium">{PERSONAL_INFO.name}</span>. Currently operating at the highest escalation tier for the <span className="text-zinc-100 font-medium">Apple Ecosystem</span> at Teleperformance, with former hardware test validation at <span className="text-zinc-100 font-medium">Intel PG12</span> and creator of <span className="text-red-400 font-medium">Proton ReLink</span>.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={scrollToReLink}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-red-600 hover:bg-red-500 rounded-full transition-all duration-200 shadow-lg shadow-red-600/25 hover:shadow-red-600/40 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
              >
                <span>Featured: Proton ReLink</span>
                <ArrowDown className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenResume}
                className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-semibold text-zinc-200 bg-zinc-900/90 hover:bg-zinc-800 border border-white/15 hover:border-zinc-500 rounded-full transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400"
              >
                <FileText className="w-4 h-4 text-red-400" />
                <span>View Full Resume</span>
              </button>

              <a
                href="http://protonrelink.danielaniq.com/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-3.5 text-xs font-medium text-zinc-400 hover:text-white transition-colors"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>

          {/* Right Column: Keynote Emblem & Telemetry Hologram */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-md aspect-square rounded-3xl bg-gradient-to-b from-zinc-900/90 to-zinc-950/90 border border-white/10 p-8 flex flex-col justify-between shadow-2xl backdrop-blur-xl group hover:border-red-500/30 transition-all duration-500">
              {/* Top ambient status */}
              <div className="flex items-center justify-between text-xs text-zinc-400">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-zinc-500">SYS_AUTH</span>
                  <span aria-hidden="true" className="text-zinc-700">/</span>
                  <span className="text-zinc-300 font-medium">LEVEL 4 ORCHARD</span>
                </div>
                <div className="flex items-center gap-1.5 text-red-400 font-mono text-[11px]">
                  <span>DA LAB</span>
                </div>
              </div>

              {/* Center Insignia with 3D depth and smooth floating animation */}
              <div className="my-auto flex flex-col items-center justify-center text-center py-6 relative">
                {/* Ambient pulse aura behind emblem */}
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.2, 0.45, 0.2],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute w-44 h-44 rounded-full bg-red-600/20 blur-2xl pointer-events-none"
                />

                <motion.div
                  animate={{
                    y: [-14, 14, -14],
                    x: [-8, 8, -8],
                    rotate: [-3.5, 3.5, -3.5],
                    rotateX: [-10, 10, -10],
                    rotateY: [-12, 12, -12],
                  }}
                  transition={{
                    duration: 4.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  whileHover={{
                    scale: 1.12,
                    rotateX: 0,
                    rotateY: 0,
                    boxShadow: "0 25px 50px -10px rgba(239, 68, 68, 0.4)",
                  }}
                  whileTap={{ scale: 0.94 }}
                  drag
                  dragConstraints={{ left: -35, right: 35, top: -35, bottom: 35 }}
                  dragElastic={0.2}
                  style={{ transformStyle: "preserve-3d" }}
                  className="relative w-48 h-48 flex items-center justify-center p-4 rounded-3xl bg-zinc-950/85 border border-white/15 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.9)] backdrop-blur-2xl group-hover:border-red-500/40 transition-colors duration-300 cursor-grab active:cursor-grabbing select-none"
                >
                  <motion.img
                    src={PERSONAL_INFO.brandLogo}
                    alt={PERSONAL_INFO.brandName}
                    animate={{
                      filter: [
                        "drop-shadow(0 10px 22px rgba(239,68,68,0.35))",
                        "drop-shadow(0 18px 34px rgba(239,68,68,0.65))",
                        "drop-shadow(0 10px 22px rgba(239,68,68,0.35))",
                      ],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="w-full h-full object-contain filter pointer-events-none"
                  />
                </motion.div>
              </div>

              {/* Bottom Quick Spec Bar */}
              <div className="pt-4 border-t border-white/10 grid grid-cols-2 gap-4 text-xs">
                <div>
                  <div className="text-zinc-500 text-[11px]">Core Domain</div>
                  <div className="text-zinc-200 font-medium mt-0.5 flex items-center gap-1">
                    <Cpu className="w-3.5 h-3.5 text-red-400" />
                    <span>IoT &amp; Telematics</span>
                  </div>
                </div>
                <div>
                  <div className="text-zinc-500 text-[11px]">Hardware Focus</div>
                  <div className="text-zinc-200 font-medium mt-0.5 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" />
                    <span>PCB / Correlation</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Full-width KPI / Proof Strip below split (Mandatory Layout Rule) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8"
        >
          {PERSONAL_INFO.stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col">
              <span className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-mono tabular-nums">
                {stat.value}
              </span>
              <span className="text-xs font-semibold text-zinc-300 mt-1 uppercase tracking-wide">
                {stat.label}
              </span>
              <span className="text-xs text-zinc-500 mt-0.5">
                {stat.detail}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
