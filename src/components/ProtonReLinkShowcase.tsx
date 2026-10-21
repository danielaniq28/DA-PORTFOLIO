import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useVelocity, useSpring, useTransform } from 'motion/react';
import {
  ExternalLink,
  Lock,
  Unlock,
  Power,
  Compass,
  Gauge,
  Thermometer,
  Shield,
  Activity,
  CheckCircle2,
  Sliders,
  ChevronRight,
  Maximize2
} from 'lucide-react';
import { PROTON_RELINK_PROJECT } from '../data/portfolioData';
import { ProtonReLinkPhoneApp, PhoneTab } from './ProtonReLinkPhoneApp';

type TabKey = PhoneTab;

interface TabItem {
  id: TabKey;
  label: string;
  sublabel: string;
  icon: typeof Gauge;
  image: string;
}

export function ProtonReLinkShowcase() {
  const [activeTab, setActiveTab] = useState<TabKey>('overview');

  // Preload tab screenshots in background for 0ms tab switching
  useEffect(() => {
    const images = [
      '/assets/aistudio/IMG_6636_97dc09cd.PNG',
      '/assets/aistudio/IMG_6637_7b56e946.PNG',
      '/assets/aistudio/IMG_6638_90189256.PNG',
      '/assets/aistudio/IMG_6639_8e719934.PNG',
    ];
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // Interactive simulation states for controls tab
  const [isLocked, setIsLocked] = useState(true);
  const [isEngineOn, setIsEngineOn] = useState(false);
  const [isTrunkOpen, setIsTrunkOpen] = useState(false);
  const [isWindowsVent, setIsWindowsVent] = useState(false);
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  // Interactive climate states
  const [targetTemp, setTargetTemp] = useState(22);
  const [isAcOn, setIsAcOn] = useState(false);
  const [selectedTimer, setSelectedTimer] = useState(10);

  // Scroll velocity physics setup
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const scrollVelocity = useVelocity(scrollYProgress);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 40, stiffness: 300 });

  // Dynamically tilt and scale based on scroll velocity (Apple keynote effect)
  const deviceRotateX = useTransform(smoothVelocity, [-1, 0, 1], [8, 0, -8]);
  const deviceScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.96, 1, 0.98]);

  const tabs: TabItem[] = [
    {
      id: 'overview',
      label: 'Overview',
      sublabel: 'At a glance',
      icon: Gauge,
      image: '/assets/aistudio/IMG_6635_2bf579e9.PNG',
    },
    {
      id: 'controls',
      label: 'Vehicle Controls',
      sublabel: 'Remote Telematics',
      icon: Sliders,
      image: '/assets/aistudio/IMG_6636_97dc09cd.PNG',
    },
    {
      id: 'climate',
      label: 'Smart Climate',
      sublabel: 'Cabin Pre-cooling',
      icon: Thermometer,
      image: '/assets/aistudio/IMG_6637_7b56e946.PNG',
    },
    {
      id: 'health',
      label: 'Diagnostics',
      sublabel: 'TPMS & Telemetry',
      icon: Activity,
      image: '/assets/aistudio/IMG_6638_90189256.PNG',
    },
    {
      id: 'find',
      label: 'Find My Car',
      sublabel: 'Live GPS Location',
      icon: Compass,
      image: '/assets/aistudio/IMG_6639_8e719934.PNG',
    },
  ];

  const triggerControlAction = (actionName: string, execute: () => void) => {
    execute();
    setActionFeedback(`${actionName} command dispatched (sub-500ms CAN-bus relay)`);
    setTimeout(() => {
      setActionFeedback(null);
    }, 3200);
  };

  const activeTabMeta = tabs.find((t) => t.id === activeTab) || tabs[0];

  return (
    <section id="proton-relink" ref={containerRef} className="py-12 lg:py-14 relative overflow-hidden">
      {/* Background radial spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-red-600/10 blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-5 lg:mb-6">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-red-500 uppercase mb-2">
            <span>Flagship Project</span>
            <span aria-hidden="true" className="text-zinc-600">·</span>
            <span>Automotive IoT &amp; Telematics</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-2 [text-wrap:balance]">
            Proton ReLink. Seamless control at your fingertips.
          </h2>

          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed [text-wrap:balance] line-clamp-2">
            An ultra-responsive alternative to the official Proton Link application. Reverse-engineered from ACO TECH ATLAS APIs to give Proton S70 drivers instantaneous remote locking, intelligent cabin pre-cooling, diagnostics, and real-time telemetry.
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-3">
            <a
              href="http://protonrelink.danielaniq.com/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-500 rounded-full transition-all duration-200 shadow-md shadow-red-600/20 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
            >
              <span>Launch Live App</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <span className="text-xs text-zinc-500">
              Site Status : Up and running
            </span>
          </div>
        </div>

        {/* Tab Navigation Ribbon */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-4 scrollbar-none no-scrollbar">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-zinc-800 text-white border border-red-500/50 shadow-sm shadow-red-500/10'
                    : 'bg-zinc-950/60 text-zinc-400 hover:text-zinc-200 border border-white/5 hover:border-white/15'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-red-400' : 'text-zinc-500'}`} />
                <div className="flex flex-col text-left">
                  <span className="font-semibold text-xs leading-tight">{tab.label}</span>
                  <span className="text-[9px] text-zinc-500">{tab.sublabel}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Interactive Device Showcase Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Column: Device Mockup responding to scroll velocity */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center">
            <motion.div
              style={{
                rotateX: deviceRotateX,
                scale: deviceScale,
                transformPerspective: 1200,
                willChange: 'transform',
              }}
              transition={{ ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-[280px] sm:max-w-[295px] rounded-[38px] p-2 bg-zinc-950 border-[4px] border-zinc-800 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.9)] overflow-hidden transition-all duration-300 group"
            >
              {/* Dynamic Island / Speaker notch */}
              <div className="absolute top-3.5 left-1/2 -translate-x-1/2 w-20 h-4.5 bg-black rounded-full z-40 flex items-center justify-between px-2 pointer-events-none">
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-900 border border-zinc-800" />
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>

              {/* Screen Bezel Container with Live Interactive App */}
              <div className="relative rounded-[30px] overflow-hidden bg-[#09090b] h-[545px] sm:h-[565px] flex flex-col justify-start">
                <ProtonReLinkPhoneApp
                  activeTab={activeTab}
                  onTabChange={(tab) => setActiveTab(tab)}
                  isLocked={isLocked}
                  setIsLocked={setIsLocked}
                  isEngineOn={isEngineOn}
                  setIsEngineOn={setIsEngineOn}
                  isTrunkOpen={isTrunkOpen}
                  setIsTrunkOpen={setIsTrunkOpen}
                  isWindowsVent={isWindowsVent}
                  setIsWindowsVent={setIsWindowsVent}
                  targetTemp={targetTemp}
                  setTargetTemp={setTargetTemp}
                  isAcOn={isAcOn}
                  setIsAcOn={setIsAcOn}
                  selectedTimer={selectedTimer}
                  setSelectedTimer={setSelectedTimer}
                  actionFeedback={actionFeedback}
                  triggerControlAction={triggerControlAction}
                />

                {/* Subtle sheen highlight */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent pointer-events-none z-40" />
              </div>
            </motion.div>

            <span className="text-[10px] font-mono text-zinc-500 mt-2 flex items-center gap-1.5">
              <span>Interactive Mockup</span>
              <span aria-hidden="true">·</span>
              <span>Fully Functional Simulator</span>
            </span>
          </div>

          {/* Right Column: Live Interactive Sandbox & Architectural Breakdown */}
          <div className="lg:col-span-6 flex flex-col space-y-3.5">
            {/* Interactive Simulation Panel for active tab */}
            <div className="rounded-2xl bg-zinc-900/70 border border-white/10 p-4 sm:p-4.5 backdrop-blur-xl h-[255px] flex flex-col justify-between">
              <div className="flex items-center justify-between pb-2 mb-1.5 border-b border-white/10 shrink-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-mono text-red-400 uppercase">Live Simulation</span>
                  <span aria-hidden="true" className="text-zinc-600">·</span>
                  <span className="text-[11px] text-zinc-300 font-medium">Driver Sandbox</span>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-zinc-500 font-mono">
                  <span>CAN-BUS: ACTIVE</span>
                </div>
              </div>

              {activeTab === 'controls' && (
                <div className="flex-1 flex flex-col justify-between">
                  <p className="text-[11px] text-zinc-400 mb-1 leading-tight">
                    Interact directly with the simulated telematics relay below to test sub-second execution:
                  </p>

                  <div className="grid grid-cols-2 gap-2">
                    {/* Door Lock / Unlock */}
                    <button
                      onClick={() =>
                        triggerControlAction(
                          isLocked ? 'Doors Unlocked' : 'Doors Locked',
                          () => setIsLocked(!isLocked)
                        )
                      }
                      className="p-2.5 rounded-xl bg-zinc-950 border border-white/10 hover:border-red-500/50 flex flex-col items-start gap-1 text-left transition-all cursor-pointer group"
                    >
                      <div className="flex items-center justify-between w-full">
                        {isLocked ? (
                          <Lock className="w-3.5 h-3.5 text-red-400 group-hover:scale-110 transition-transform" />
                        ) : (
                          <Unlock className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
                        )}
                        <span className="text-[9px] font-mono px-1 py-0.5 rounded bg-zinc-900 text-zinc-400">
                          {isLocked ? 'Locked' : 'Unlocked'}
                        </span>
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-white">
                          {isLocked ? 'Unlock Doors' : 'Lock Doors'}
                        </div>
                        <div className="text-[10px] text-zinc-500 leading-none">All 4 doors</div>
                      </div>
                    </button>

                    {/* Remote Engine Start */}
                    <button
                      onClick={() =>
                        triggerControlAction(
                          isEngineOn ? 'Engine Stopped' : 'Remote Engine Started',
                          () => setIsEngineOn(!isEngineOn)
                        )
                      }
                      className="p-2.5 rounded-xl bg-zinc-950 border border-white/10 hover:border-red-500/50 flex flex-col items-start gap-1 text-left transition-all cursor-pointer group"
                    >
                      <div className="flex items-center justify-between w-full">
                        <Power className={`w-3.5 h-3.5 ${isEngineOn ? 'text-emerald-400' : 'text-zinc-500'} group-hover:scale-110 transition-transform`} />
                        <span className="text-[9px] font-mono px-1 py-0.5 rounded bg-zinc-900 text-zinc-400">
                          {isEngineOn ? 'Running' : 'Off'}
                        </span>
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-white">
                          {isEngineOn ? 'Stop Engine' : 'Start Engine'}
                        </div>
                        <div className="text-[10px] text-zinc-500 leading-none">Cabin pre-run</div>
                      </div>
                    </button>

                    {/* Open Trunk */}
                    <button
                      onClick={() =>
                        triggerControlAction(
                          isTrunkOpen ? 'Trunk Closed' : 'Trunk Released',
                          () => setIsTrunkOpen(!isTrunkOpen)
                        )
                      }
                      className="p-2.5 rounded-xl bg-zinc-950 border border-white/10 hover:border-zinc-700 flex flex-col items-start gap-1 text-left transition-all cursor-pointer"
                    >
                      <div className="flex items-center justify-between w-full">
                        <Maximize2 className="w-3.5 h-3.5 text-zinc-400" />
                        <span className="text-[9px] font-mono px-1 py-0.5 rounded bg-zinc-900 text-zinc-400">
                          {isTrunkOpen ? 'Open' : 'Closed'}
                        </span>
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-white">
                          {isTrunkOpen ? 'Close Trunk' : 'Open Trunk'}
                        </div>
                        <div className="text-[10px] text-zinc-500 leading-none">Tailgate</div>
                      </div>
                    </button>

                    {/* Find Car */}
                    <button
                      onClick={() =>
                        triggerControlAction('Horn & Flashers triggered', () => {})
                      }
                      className="p-2.5 rounded-xl bg-zinc-950 border border-white/10 hover:border-zinc-700 flex flex-col items-start gap-1 text-left transition-all cursor-pointer"
                    >
                      <div className="flex items-center justify-between w-full">
                        <Compass className="w-3.5 h-3.5 text-zinc-400" />
                        <span className="text-[9px] font-mono px-1 py-0.5 rounded bg-zinc-900 text-zinc-400">
                          Pulse
                        </span>
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-white">Find Car</div>
                        <div className="text-[10px] text-zinc-500 leading-none">Horn &amp; flashers</div>
                      </div>
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'climate' && (
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[11px] text-zinc-400">Cabin Target Temp</div>
                      <div className="text-xl font-bold font-mono text-white mt-0.5">
                        {targetTemp}°C
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setTargetTemp((prev) => Math.max(18, prev - 1))}
                        className="w-8 h-8 rounded-lg bg-zinc-950 border border-white/10 hover:border-zinc-700 flex items-center justify-center text-white font-bold text-sm cursor-pointer"
                      >
                        -
                      </button>
                      <button
                        onClick={() => setTargetTemp((prev) => Math.min(31, prev + 1))}
                        className="w-8 h-8 rounded-lg bg-zinc-950 border border-white/10 hover:border-zinc-700 flex items-center justify-center text-white font-bold text-sm cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] text-zinc-400 block mb-1">
                      Auto-off Timer (Preset Duration)
                    </label>
                    <div className="flex items-center gap-1">
                      {[3, 5, 8, 10, 15, 20].map((mins) => (
                        <button
                          key={mins}
                          onClick={() => setSelectedTimer(mins)}
                          className={`flex-1 py-0.5 text-[10px] font-mono font-medium rounded transition-colors cursor-pointer ${
                            selectedTimer === mins
                              ? 'bg-red-600 text-white font-bold'
                              : 'bg-zinc-950 text-zinc-400 hover:text-white border border-white/5'
                          }`}
                        >
                          {mins}m
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      triggerControlAction(
                        isAcOn ? 'A/C Deactivated' : `A/C Activated at ${targetTemp}°C (${selectedTimer}m)`,
                        () => setIsAcOn(!isAcOn)
                      )
                    }
                    className={`w-full py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      isAcOn
                        ? 'bg-emerald-600 text-white'
                        : 'bg-zinc-800 text-zinc-200 hover:bg-zinc-700'
                    }`}
                  >
                    {isAcOn ? `Air Conditioning Running (${targetTemp}°C)` : 'Turn On Climate Pre-cool'}
                  </button>
                </div>
              )}

              {activeTab === 'overview' && (
                <div className="flex-1 flex flex-col justify-between">
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-zinc-950 border border-white/5">
                      <span className="text-zinc-500 text-[9px] uppercase font-mono">Fuel Range</span>
                      <div className="text-base font-bold text-white font-mono mt-0.5">700 KM</div>
                      <span className="text-[9px] text-zinc-400">98% capacity (49/50L)</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-zinc-950 border border-white/5">
                      <span className="text-zinc-500 text-[9px] uppercase font-mono">Battery Voltage</span>
                      <div className="text-base font-bold text-white font-mono mt-0.5">12.9 V</div>
                      <span className="text-[9px] text-emerald-400">Healthy state</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2 rounded-xl bg-zinc-950 border border-white/5 flex items-center justify-between">
                      <div>
                        <div className="text-[9px] text-zinc-500">Efficiency</div>
                        <div className="text-[11px] font-bold text-white font-mono">10.2 L/100km</div>
                      </div>
                      <span className="text-[9px] font-mono text-zinc-400">19km/h</span>
                    </div>
                    <div className="p-2 rounded-xl bg-zinc-950 border border-white/5 flex items-center justify-between">
                      <div>
                        <div className="text-[9px] text-zinc-500">Cabin Temp</div>
                        <div className="text-[11px] font-bold text-white font-mono">24°C / 32°C</div>
                      </div>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    </div>
                  </div>

                  <div className="p-2 rounded-xl bg-zinc-950 border border-white/5 text-xs flex items-center justify-between">
                    <div>
                      <div className="text-zinc-300 font-medium text-[11px]">Geely BMA Protocol Integration</div>
                      <div className="text-[9px] text-zinc-500">Service due in 7,624 km</div>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-zinc-500" />
                  </div>
                </div>
              )}

              {activeTab === 'health' && (
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-[11px] text-zinc-400">
                    <span>TPMS Real-Time Pressure Readings</span>
                    <span className="text-[9px] font-mono text-emerald-400">ALL NOMINAL</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2 rounded-xl bg-zinc-950 border border-white/5 flex justify-between items-center">
                      <div>
                        <div className="text-[9px] text-zinc-500 uppercase">Front Left</div>
                        <div className="text-xs font-bold text-white font-mono">235 kPa</div>
                      </div>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    </div>
                    <div className="p-2 rounded-xl bg-zinc-950 border border-white/5 flex justify-between items-center">
                      <div>
                        <div className="text-[9px] text-zinc-500 uppercase">Front Right</div>
                        <div className="text-xs font-bold text-white font-mono">246 kPa</div>
                      </div>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    </div>
                    <div className="p-2 rounded-xl bg-zinc-950 border border-white/5 flex justify-between items-center">
                      <div>
                        <div className="text-[9px] text-zinc-500 uppercase">Rear Left</div>
                        <div className="text-xs font-bold text-white font-mono">235 kPa</div>
                      </div>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    </div>
                    <div className="p-2 rounded-xl bg-zinc-950 border border-white/5 flex justify-between items-center">
                      <div>
                        <div className="text-[9px] text-zinc-500 uppercase">Rear Right</div>
                        <div className="text-xs font-bold text-white font-mono">235 kPa</div>
                      </div>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    </div>
                  </div>

                  <div className="p-2 rounded-xl bg-zinc-950 border border-white/5 text-xs flex items-center justify-between">
                    <span className="text-[10px] text-zinc-400">Diagnostic telemetry check</span>
                    <span className="text-[9px] font-mono text-zinc-300">All Sensors Secured</span>
                  </div>
                </div>
              )}

              {activeTab === 'find' && (
                <div className="flex-1 flex flex-col justify-between">
                  <div className="p-2.5 rounded-xl bg-zinc-950 border border-white/5 text-xs">
                    <div className="text-zinc-500 text-[9px] uppercase font-mono">Current Telemetry Fix</div>
                    <div className="text-xs font-mono text-white font-semibold mt-0.5">
                      5.40990° N, 100.32468° E
                    </div>
                    <div className="text-[10px] text-zinc-400 mt-0.5">Georgetown, Pulau Pinang, Malaysia</div>
                  </div>

                  <div className="p-2 rounded-xl bg-zinc-950 border border-white/5 text-xs flex items-center justify-between">
                    <div>
                      <div className="text-[9px] text-zinc-500">Live Satellite Status</div>
                      <div className="text-[11px] font-medium text-emerald-400">GPS Lock · Sub-Meter Accuracy</div>
                    </div>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  </div>

                  <a
                    href="https://www.google.com/maps?q=5.40990,100.32468"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold transition-colors"
                  >
                    <span>Open in Google Maps ↗</span>
                  </a>
                </div>
              )}
            </div>

            {/* Architecture Bento Cards (Apple Spec Style) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="w-6 h-6 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-2">
                    <Shield className="w-3.5 h-3.5 text-red-400" />
                  </div>
                  <h3 className="text-xs font-bold text-white mb-0.5 leading-snug">
                    ACO TECH ATLAS Deconstruction
                  </h3>
                  <p className="text-[11px] text-zinc-400 leading-relaxed line-clamp-2">
                    Decrypted and reconstructed REST &amp; socket protocol used by Geely BMA telematic ECUs.
                  </p>
                </div>
                <div className="mt-2 pt-2 border-t border-white/5 text-[9px] font-mono text-zinc-500">
                  TOKEN ROTATION · RSA AUTH
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="w-6 h-6 rounded-lg bg-zinc-800 border border-white/10 flex items-center justify-center mb-2">
                    <Power className="w-3.5 h-3.5 text-zinc-300" />
                  </div>
                  <h3 className="text-xs font-bold text-white mb-0.5 leading-snug">
                    Zero-Latency Control Bus
                  </h3>
                  <p className="text-[11px] text-zinc-400 leading-relaxed line-clamp-2">
                    Bypasses OEM wrapper delays, delivering single-tap remote vehicle commands in under 500ms.
                  </p>
                </div>
                <div className="mt-2 pt-2 border-t border-white/5 text-[9px] font-mono text-zinc-500">
                  &lt; 500MS ROUND TRIP
                </div>
              </div>
            </div>

            {/* Live Link Callout Card */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-red-950/40 via-zinc-900/80 to-zinc-950 border border-red-500/30 flex items-center justify-between gap-3">
              <div>
                <span className="text-[9px] font-mono text-red-400 uppercase">Live Web Application</span>
                <h4 className="text-xs sm:text-sm font-bold text-white mt-0.5">
                  Experience Proton ReLink in Action
                </h4>
                <p className="text-[11px] text-zinc-400 mt-0.5">
                  Live in production · S70 telematics suite.
                </p>
              </div>

              <a
                href={PROTON_RELINK_PROJECT.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="shrink-0 p-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white transition-all shadow-md shadow-red-600/30 hover:scale-105"
                aria-label="Open Proton ReLink"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
