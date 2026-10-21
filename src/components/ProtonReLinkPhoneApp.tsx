import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Lock,
  Unlock,
  Power,
  LocateFixed,
  SlidersHorizontal,
  Fan,
  Activity,
  Gauge,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Wifi,
  Battery,
  Signal,
  CheckCircle2,
  Check,
  Fuel,
  RefreshCw
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export type PhoneTab = 'overview' | 'controls' | 'climate' | 'health' | 'find';

interface PhoneAppProps {
  activeTab: PhoneTab;
  onTabChange: (tab: PhoneTab) => void;
  // Shared interactive state
  isLocked: boolean;
  setIsLocked: (val: boolean | ((prev: boolean) => boolean)) => void;
  isEngineOn: boolean;
  setIsEngineOn: (val: boolean | ((prev: boolean) => boolean)) => void;
  isTrunkOpen: boolean;
  setIsTrunkOpen: (val: boolean | ((prev: boolean) => boolean)) => void;
  isWindowsVent: boolean;
  setIsWindowsVent: (val: boolean | ((prev: boolean) => boolean)) => void;
  targetTemp: number;
  setTargetTemp: (val: number | ((prev: number) => number)) => void;
  isAcOn: boolean;
  setIsAcOn: (val: boolean | ((prev: boolean) => boolean)) => void;
  selectedTimer: number;
  setSelectedTimer: (val: number) => void;
  actionFeedback: string | null;
  triggerControlAction: (name: string, fn: () => void) => void;
}

export function ProtonReLinkPhoneApp({
  activeTab,
  onTabChange,
  isLocked,
  setIsLocked,
  isEngineOn,
  setIsEngineOn,
  isTrunkOpen,
  setIsTrunkOpen,
  isWindowsVent,
  setIsWindowsVent,
  targetTemp,
  setTargetTemp,
  isAcOn,
  setIsAcOn,
  selectedTimer,
  setSelectedTimer,
  actionFeedback,
  triggerControlAction,
}: PhoneAppProps) {
  const [isHornFlashing, setIsHornFlashing] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleHorn = () => {
    setIsHornFlashing(true);
    triggerControlAction('Horn & Flashers Pulsed', () => {});
    setTimeout(() => setIsHornFlashing(false), 2400);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    triggerControlAction('Telemetry refreshed from ATLAS Cloud', () => {});
    setTimeout(() => setIsRefreshing(false), 1200);
  };

  const fuelPercent = 98;
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const visible = circumference * 0.72;
  const targetOffset = visible * (1 - fuelPercent / 100);

  return (
    <div className="relative w-full h-full bg-[#09090b] text-white flex flex-col font-sans select-none overflow-hidden">
      {/* 1. iOS Status Bar */}
      <div className="pt-8 px-6 pb-1 flex items-center justify-between text-[11px] text-zinc-300 font-semibold shrink-0 z-30">
        <span className="font-mono">11:09</span>
        <div className="flex items-center gap-2 text-zinc-300">
          <Signal className="w-3.5 h-3.5" />
          <Wifi className="w-3.5 h-3.5" />
          <div className="flex items-center gap-0.5">
            <span className="text-[10px] font-mono">84</span>
            <Battery className="w-4 h-4 text-emerald-400" />
          </div>
        </div>
      </div>

      {/* 2. Proton ReLink App Bar */}
      <div className="px-5 py-2 border-b border-white/[0.06] flex items-center justify-between shrink-0 bg-zinc-950/40 backdrop-blur-md z-20">
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-bold tracking-tight text-zinc-400 uppercase">
              PROTON RE-LINK
            </span>
            <span className="text-[9px] text-red-500 font-bold flex items-center gap-0.5">
              <span>by</span>
              <img
                src={PERSONAL_INFO.brandLogo}
                alt="7%"
                className="w-2.5 h-2.5 object-contain"
              />
            </span>
          </div>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="text-xs font-bold text-white tracking-wide">
              S70 · ANQ2882
            </span>
            <span className="flex items-center gap-1 text-[9px] text-emerald-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Live</span>
            </span>
          </div>
        </div>

        <button
          onClick={handleRefresh}
          className="px-2.5 py-1 rounded-full bg-white/[0.06] hover:bg-white/10 border border-white/10 text-[10px] font-medium text-zinc-300 flex items-center gap-1 transition-colors cursor-pointer"
        >
          <RefreshCw className={`w-2.5 h-2.5 ${isRefreshing ? 'animate-spin text-red-400' : ''}`} />
          <span>Sync</span>
        </button>
      </div>

      {/* Action Toast Notification */}
      <AnimatePresence>
        {actionFeedback && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute top-20 left-3 right-3 z-50 bg-zinc-900/95 border border-red-500/50 backdrop-blur-xl rounded-xl p-2.5 shadow-2xl flex items-center gap-2 text-xs text-white"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="font-medium text-[10px] leading-tight text-zinc-200">
              {actionFeedback}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. Main Screen Viewport (Scrollable) */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4 no-scrollbar">
        {/* ================= OVERVIEW VIEW ================= */}
        {activeTab === 'overview' && (
          <div className="space-y-4 pb-12 animate-in fade-in duration-200">
            {/* Vehicle Header Card */}
            <div className="relative rounded-3xl bg-zinc-900/40 border border-white/[0.08] p-4 overflow-hidden">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-[10px] font-semibold text-zinc-400 tracking-wider">
                      DEEP MARINE BLUE
                    </span>
                  </div>
                  <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-[9px] font-semibold text-amber-400 mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <span>ACO TECH · ATLAS</span>
                  </div>
                  <h2 className="text-2xl font-bold tracking-tight text-white leading-tight">
                    S70
                  </h2>
                  <p className="text-[11px] font-mono text-zinc-400">ANQ2882</p>
                </div>

                {/* Fuel Arc Gauge */}
                <div className="relative w-24 h-20 flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 160 140" className="w-full h-full">
                    <circle
                      cx="80"
                      cy="80"
                      r={radius}
                      fill="none"
                      stroke="rgba(255,255,255,0.08)"
                      strokeWidth="9"
                      strokeLinecap="round"
                      strokeDasharray={`${visible} ${circumference}`}
                      transform="rotate(140 80 80)"
                    />
                    <circle
                      cx="80"
                      cy="80"
                      r={radius}
                      fill="none"
                      stroke="#f4f4f5"
                      strokeWidth="9"
                      strokeLinecap="round"
                      strokeDasharray={`${visible} ${circumference}`}
                      strokeDashoffset={targetOffset}
                      transform="rotate(140 80 80)"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center pt-2">
                    <span className="text-base font-bold font-mono leading-none text-white">
                      700<span className="text-[9px] text-zinc-400 ml-0.5">KM</span>
                    </span>
                    <span className="text-[9px] text-emerald-400 font-semibold mt-0.5 flex items-center gap-0.5">
                      <Fuel className="w-2.5 h-2.5" />
                      <span>98%</span>
                    </span>
                    <span className="text-[8px] text-zinc-500">49/50L</span>
                  </div>
                </div>
              </div>

              {/* S70 Car Graphic Profile */}
              <div className="my-2 relative flex items-center justify-center">
                <svg
                  viewBox="0 0 680 230"
                  className={`w-full max-h-[140px] drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)] transition-all ${
                    isHornFlashing ? 'animate-pulse filter brightness-125' : ''
                  }`}
                >
                  <defs>
                    <linearGradient id="s70-paint" x1="0%" y1="0%" x2="100%" y2="80%">
                      <stop offset="0%" stopColor="#2563eb" />
                      <stop offset="45%" stopColor="#1d4ed8" />
                      <stop offset="100%" stopColor="#0f172a" />
                    </linearGradient>
                    <linearGradient id="s70-glass" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#09090b" stopOpacity="0.95" />
                      <stop offset="100%" stopColor="#18181b" stopOpacity="0.8" />
                    </linearGradient>
                  </defs>

                  {/* Ground Shadow */}
                  <ellipse cx="340" cy="192" rx="260" ry="16" fill="rgba(0,0,0,0.7)" />

                  {/* Sedan Body */}
                  <path
                    d="M 120 162 L 100 156 C 92 153, 86 145, 88 136 C 92 120, 108 114, 138 110 L 204 102 C 238 98, 260 76, 290 64 C 334 46, 420 46, 474 62 C 514 74, 536 94, 574 104 L 590 110 C 602 114, 608 122, 606 132 C 604 142, 594 150, 576 156 L 554 160 A 44 44 0 0 0 466 160 L 230 160 A 44 44 0 0 0 142 160 Z"
                    fill="url(#s70-paint)"
                  />
                  {/* Greenhouse Glass */}
                  <path
                    d="M 234 98 C 264 78, 288 64, 324 56 C 368 48, 440 48, 480 60 C 506 70, 524 84, 542 98 L 528 100 L 426 100 L 338 100 Z"
                    fill="url(#s70-glass)"
                    stroke="#18181b"
                    strokeWidth="2"
                  />
                  <rect x="372" y="52" width="10" height="48" fill="#09090b" />
                  <path d="M 468 62 L 476 100" stroke="#09090b" strokeWidth="6" />

                  {/* Chrome window trim */}
                  <path d="M 226 100 L 546 100" stroke="#cbd5e1" strokeWidth="1.5" strokeOpacity="0.8" />

                  {/* Dynamic shoulder line */}
                  <path d="M 126 112 C 220 108, 380 110, 584 116" stroke="#93c5fd" strokeWidth="2" strokeOpacity="0.7" fill="none" />

                  {/* Headlamp */}
                  <polygon points="90,132 116,118 132,120 106,138" fill={isEngineOn || isHornFlashing ? "#60a5fa" : "#ffffff"} />
                  {/* Taillamp */}
                  <polygon points="584,116 606,126 602,136 578,124" fill={isEngineOn || isHornFlashing ? "#ef4444" : "#991b1b"} />

                  {/* Wheels */}
                  <g transform="translate(186, 160)">
                    <circle cx="0" cy="0" r="38" fill="#18181b" stroke="#09090b" strokeWidth="3" />
                    <circle cx="0" cy="0" r="28" fill="#27272a" stroke="#cbd5e1" strokeWidth="3" />
                    <circle cx="0" cy="0" r="18" fill="#3f3f46" />
                    <circle cx="0" cy="0" r="6" fill="#09090b" stroke="#d4af37" strokeWidth="1.5" />
                  </g>
                  <g transform="translate(510, 160)">
                    <circle cx="0" cy="0" r="38" fill="#18181b" stroke="#09090b" strokeWidth="3" />
                    <circle cx="0" cy="0" r="28" fill="#27272a" stroke="#cbd5e1" strokeWidth="3" />
                    <circle cx="0" cy="0" r="18" fill="#3f3f46" />
                    <circle cx="0" cy="0" r="6" fill="#09090b" stroke="#d4af37" strokeWidth="1.5" />
                  </g>
                </svg>
              </div>

              {/* Ambient Badges */}
              <div className="flex items-center justify-between text-[10px] text-zinc-300 font-mono mt-1 pt-2 border-t border-white/[0.06]">
                <span className="px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/5">
                  INT: 24°C
                </span>
                <span className="px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/5">
                  EXT: 32°C
                </span>
                <span className="px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/5">
                  AVG: 19 km/h
                </span>
              </div>

              {/* Service bar */}
              <div className="mt-3 pt-2">
                <div className="flex items-center justify-between text-[10px] text-zinc-400 font-mono">
                  <span>NEXT SERVICE SCHEDULED</span>
                  <span className="text-white font-bold">7,624 km</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-white/10 mt-1 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-red-500 to-amber-500 rounded-full w-[24%]" />
                </div>
              </div>
            </div>

            {/* Diagnostics Tiles */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono tracking-wider text-zinc-400 uppercase">
                Diagnostics &amp; Stats
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  onClick={() =>
                    triggerControlAction(
                      isEngineOn ? 'Engine stopped' : 'Remote engine started',
                      () => setIsEngineOn(!isEngineOn)
                    )
                  }
                  className="p-3 rounded-2xl bg-zinc-900/60 border border-white/[0.08] flex flex-col text-left hover:border-white/20 transition-all cursor-pointer"
                >
                  <span className="text-[9px] text-zinc-400 uppercase">Engine</span>
                  <div className="flex items-center gap-1.5 mt-1 font-bold text-white">
                    <span className={`w-2 h-2 rounded-full ${isEngineOn ? 'bg-amber-400 animate-pulse' : 'bg-emerald-400'}`} />
                    <span>{isEngineOn ? 'Running' : 'Off'}</span>
                  </div>
                </button>

                <div className="p-3 rounded-2xl bg-zinc-900/60 border border-white/[0.08] flex flex-col">
                  <span className="text-[9px] text-zinc-400 uppercase">Efficiency</span>
                  <span className="text-sm font-bold text-white font-mono mt-1">
                    10.2 <span className="text-[10px] font-normal text-zinc-400">L/100km</span>
                  </span>
                </div>

                <div className="p-3 rounded-2xl bg-zinc-900/60 border border-white/[0.08] flex flex-col">
                  <span className="text-[9px] text-zinc-400 uppercase">Battery</span>
                  <div className="flex items-center gap-1.5 mt-1 font-bold text-white">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="font-mono">12.9 V</span>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-zinc-900/60 border border-white/[0.08] flex flex-col">
                  <span className="text-[9px] text-zinc-400 uppercase">Service In</span>
                  <span className="text-sm font-bold text-white font-mono mt-1">
                    7,624 <span className="text-[10px] font-normal text-zinc-400">km</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= CONTROLS VIEW ================= */}
        {activeTab === 'controls' && (
          <div className="space-y-4 pb-12 animate-in fade-in duration-200">
            <div>
              <span className="text-[10px] font-semibold tracking-wider uppercase text-zinc-400">
                CONTROLS
              </span>
              <h2 className="text-xl font-bold text-white">Vehicle Controls</h2>
              <p className="text-[11px] text-zinc-400">S70 · ANQ2882</p>
            </div>

            <span className="text-[10px] font-mono tracking-wider text-zinc-400 uppercase block">
              Quick Actions
            </span>

            <div className="grid grid-cols-2 gap-2.5">
              {/* Unlock / Lock */}
              <button
                onClick={() =>
                  triggerControlAction(
                    isLocked ? 'Doors Unlocked' : 'Doors Locked',
                    () => setIsLocked(!isLocked)
                  )
                }
                className="p-3.5 rounded-2xl bg-zinc-900/70 border border-white/[0.08] hover:border-red-500/40 text-left transition-all cursor-pointer flex flex-col justify-between h-24"
              >
                <div className="flex items-center justify-between w-full">
                  <div className="p-1.5 rounded-xl bg-white/[0.06]">
                    {isLocked ? <Lock className="w-4 h-4 text-red-400" /> : <Unlock className="w-4 h-4 text-emerald-400" />}
                  </div>
                  <span className={`text-[9px] px-1.5 py-0.5 rounded-full flex items-center gap-1 font-semibold ${
                    isLocked ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${isLocked ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                    <span>{isLocked ? 'Locked' : 'Unlocked'}</span>
                  </span>
                </div>
                <div>
                  <div className="text-xs font-bold text-white">{isLocked ? 'Unlock' : 'Lock'}</div>
                  <div className="text-[10px] text-zinc-400">All doors {isLocked ? 'locked' : 'open'}</div>
                </div>
              </button>

              {/* Start / Stop Engine */}
              <button
                onClick={() =>
                  triggerControlAction(
                    isEngineOn ? 'Engine stopped' : 'Remote engine ignition sequence dispatched',
                    () => setIsEngineOn(!isEngineOn)
                  )
                }
                className="p-3.5 rounded-2xl bg-zinc-900/70 border border-white/[0.08] hover:border-red-500/40 text-left transition-all cursor-pointer flex flex-col justify-between h-24"
              >
                <div className="flex items-center justify-between w-full">
                  <div className="p-1.5 rounded-xl bg-white/[0.06]">
                    <Power className={`w-4 h-4 ${isEngineOn ? 'text-amber-400 animate-pulse' : 'text-zinc-400'}`} />
                  </div>
                  <span className={`text-[9px] px-1.5 py-0.5 rounded-full flex items-center gap-1 font-semibold ${
                    isEngineOn ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${isEngineOn ? 'bg-amber-400' : 'bg-emerald-400'}`} />
                    <span>{isEngineOn ? 'Running' : 'Off'}</span>
                  </span>
                </div>
                <div>
                  <div className="text-xs font-bold text-white">{isEngineOn ? 'Stop engine' : 'Start engine'}</div>
                  <div className="text-[10px] text-zinc-400">{isEngineOn ? 'Engine running' : 'Engine off'}</div>
                </div>
              </button>

              {/* Find Car */}
              <button
                onClick={handleHorn}
                className="p-3.5 rounded-2xl bg-zinc-900/70 border border-white/[0.08] hover:border-white/20 text-left transition-all cursor-pointer flex flex-col justify-between h-24"
              >
                <div className="flex items-center justify-between w-full">
                  <div className="p-1.5 rounded-xl bg-white/[0.06]">
                    <LocateFixed className="w-4 h-4 text-zinc-300" />
                  </div>
                  <span className="text-[9px] text-zinc-400 font-mono">Ready</span>
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Find car</div>
                  <div className="text-[10px] text-zinc-400">Horn &amp; flashers</div>
                </div>
              </button>

              {/* Open / Close Trunk */}
              <button
                onClick={() =>
                  triggerControlAction(
                    isTrunkOpen ? 'Tailgate closed' : 'Tailgate released',
                    () => setIsTrunkOpen(!isTrunkOpen)
                  )
                }
                className="p-3.5 rounded-2xl bg-zinc-900/70 border border-white/[0.08] hover:border-white/20 text-left transition-all cursor-pointer flex flex-col justify-between h-24"
              >
                <div className="flex items-center justify-between w-full">
                  <div className="p-1.5 rounded-xl bg-white/[0.06]">
                    <Maximize2 className="w-4 h-4 text-zinc-300" />
                  </div>
                  <span className={`text-[9px] px-1.5 py-0.5 rounded-full flex items-center gap-1 font-semibold ${
                    isTrunkOpen ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${isTrunkOpen ? 'bg-amber-400' : 'bg-emerald-400'}`} />
                    <span>{isTrunkOpen ? 'Open' : 'Closed'}</span>
                  </span>
                </div>
                <div>
                  <div className="text-xs font-bold text-white">{isTrunkOpen ? 'Close trunk' : 'Open trunk'}</div>
                  <div className="text-[10px] text-zinc-400">{isTrunkOpen ? 'Trunk open' : 'Trunk closed'}</div>
                </div>
              </button>
            </div>

            {/* Windows Control Tile */}
            <button
              onClick={() =>
                triggerControlAction(
                  isWindowsVent ? 'Windows closed' : 'Windows set to vent mode',
                  () => setIsWindowsVent(!isWindowsVent)
                )
              }
              className="w-full p-3.5 rounded-2xl bg-zinc-900/70 border border-white/[0.08] hover:border-white/20 text-left transition-all cursor-pointer flex items-center justify-between"
            >
              <div>
                <div className="text-xs font-bold text-white">Open windows</div>
                <div className="text-[10px] text-zinc-400">Tap for vent or full open</div>
              </div>
              <span className={`text-[9px] px-2 py-0.5 rounded-full flex items-center gap-1 font-semibold ${
                isWindowsVent ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${isWindowsVent ? 'bg-amber-400' : 'bg-emerald-400'}`} />
                <span>{isWindowsVent ? 'Vent' : 'Closed'}</span>
              </span>
            </button>
          </div>
        )}

        {/* ================= CLIMATE VIEW ================= */}
        {activeTab === 'climate' && (
          <div className="space-y-4 pb-12 animate-in fade-in duration-200">
            <div>
              <span className="text-[10px] font-semibold tracking-wider uppercase text-zinc-400">
                CLIMATE
              </span>
              <h2 className="text-xl font-bold text-white">Climate Control</h2>
              <p className="text-[11px] text-zinc-400">S70 · ANQ2882</p>
            </div>

            {/* Target Temperature Section */}
            <div className="rounded-3xl bg-zinc-900/40 border border-white/[0.08] p-5 text-center flex flex-col items-center">
              <span className="text-[10px] font-mono tracking-wider text-zinc-400 uppercase">
                TARGET TEMPERATURE
              </span>

              <div className="flex items-center gap-2 mt-2">
                <span className="px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/5 text-[9px] font-mono text-zinc-300">
                  INTERIOR 24°C
                </span>
                <span className="px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/5 text-[9px] font-mono text-zinc-300">
                  EXTERIOR 32°C
                </span>
              </div>

              {/* Big Interactive Stepper */}
              <div className="flex items-center justify-center gap-6 my-6">
                <button
                  onClick={() => setTargetTemp((prev) => Math.max(18, prev - 1))}
                  className="w-10 h-10 rounded-full bg-white/[0.06] hover:bg-white/10 border border-white/10 flex items-center justify-center text-white active:scale-95 transition-all cursor-pointer"
                  aria-label="Decrease temperature"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <div className="text-5xl font-light tracking-tight text-white font-mono tabular-nums">
                  {targetTemp}
                </div>

                <button
                  onClick={() => setTargetTemp((prev) => Math.min(31, prev + 1))}
                  className="w-10 h-10 rounded-full bg-white/[0.06] hover:bg-white/10 border border-white/10 flex items-center justify-center text-white active:scale-95 transition-all cursor-pointer"
                  aria-label="Increase temperature"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              <span className="text-[10px] font-mono text-zinc-500 mb-4">18–31°C</span>

              <button
                onClick={() =>
                  triggerControlAction(
                    isAcOn ? 'A/C Deactivated' : `Cabin Pre-cooling active at ${targetTemp}°C`,
                    () => setIsAcOn(!isAcOn)
                  )
                }
                className={`w-full py-3 rounded-2xl text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  isAcOn
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                    : 'bg-white/[0.06] hover:bg-white/10 border border-white/10 text-zinc-200'
                }`}
              >
                <Power className="w-4 h-4" />
                <span>{isAcOn ? 'Air Conditioning Running' : 'Air Conditioning Off'}</span>
              </button>
            </div>

            {/* Preset Duration */}
            <div className="rounded-3xl bg-zinc-900/40 border border-white/[0.08] p-4">
              <span className="text-[10px] font-mono tracking-wider text-zinc-400 uppercase">
                PRESET DURATION
              </span>
              <div className="text-xs font-bold text-white mt-1">Auto-off Timer</div>
              <div className="text-[10px] text-zinc-400">
                Shuts down cabin A/C after preset runtime ({selectedTimer} min)
              </div>

              <div className="flex items-center gap-1.5 mt-3">
                {[3, 5, 8, 10, 15, 20].map((mins) => (
                  <button
                    key={mins}
                    onClick={() => {
                      setSelectedTimer(mins);
                      triggerControlAction(`Timer set to ${mins} minutes`, () => {});
                    }}
                    className={`flex-1 py-1.5 rounded-full text-[10px] font-mono font-medium transition-all cursor-pointer ${
                      selectedTimer === mins
                        ? 'bg-white text-black font-bold shadow'
                        : 'bg-white/[0.06] text-zinc-400 hover:text-white border border-white/5'
                    }`}
                  >
                    {mins}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================= HEALTH VIEW ================= */}
        {activeTab === 'health' && (
          <div className="space-y-4 pb-12 animate-in fade-in duration-200">
            <div>
              <span className="text-[10px] font-semibold tracking-wider uppercase text-zinc-400">
                HEALTH
              </span>
              <h2 className="text-xl font-bold text-white">Vehicle Health</h2>
              <p className="text-[11px] text-zinc-400">S70 · ANQ2882</p>
            </div>

            {/* Tyre Pressures */}
            <div>
              <span className="text-[10px] font-mono tracking-wider text-zinc-400 uppercase block mb-2">
                TYRE PRESSURES
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-3 rounded-2xl bg-zinc-900/60 border border-white/[0.08] flex items-center justify-between">
                  <div>
                    <div className="text-[9px] text-zinc-400 uppercase">Front Left</div>
                    <div className="text-base font-bold text-white font-mono">235 <span className="text-[9px] font-normal text-zinc-400">kPa</span></div>
                  </div>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                </div>

                <div className="p-3 rounded-2xl bg-zinc-900/60 border border-white/[0.08] flex items-center justify-between">
                  <div>
                    <div className="text-[9px] text-zinc-400 uppercase">Front Right</div>
                    <div className="text-base font-bold text-white font-mono">246 <span className="text-[9px] font-normal text-zinc-400">kPa</span></div>
                  </div>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                </div>

                <div className="p-3 rounded-2xl bg-zinc-900/60 border border-white/[0.08] flex items-center justify-between">
                  <div>
                    <div className="text-[9px] text-zinc-400 uppercase">Rear Left</div>
                    <div className="text-base font-bold text-white font-mono">235 <span className="text-[9px] font-normal text-zinc-400">kPa</span></div>
                  </div>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                </div>

                <div className="p-3 rounded-2xl bg-zinc-900/60 border border-white/[0.08] flex items-center justify-between">
                  <div>
                    <div className="text-[9px] text-zinc-400 uppercase">Rear Right</div>
                    <div className="text-base font-bold text-white font-mono">235 <span className="text-[9px] font-normal text-zinc-400">kPa</span></div>
                  </div>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                </div>
              </div>
            </div>

            {/* System Diagnostics */}
            <div className="rounded-3xl bg-zinc-900/40 border border-white/[0.08] p-3 space-y-2 text-xs">
              <span className="text-[10px] font-mono tracking-wider text-zinc-400 uppercase block mb-1">
                SYSTEM DIAGNOSTICS
              </span>

              {[
                { label: 'Door locks', value: isLocked ? 'Locked' : 'Unlocked', ok: isLocked },
                { label: 'Windows', value: isWindowsVent ? 'Vent' : 'Closed', ok: !isWindowsVent },
                { label: 'Trunk', value: isTrunkOpen ? 'Open' : 'Closed', ok: !isTrunkOpen },
                { label: 'Hood', value: 'Closed', ok: true },
                { label: 'Engine', value: isEngineOn ? 'Running' : 'Off', ok: true },
                { label: 'A/C', value: isAcOn ? 'On' : 'Off', ok: true },
                { label: 'Battery voltage', value: '12.9 V', ok: true },
                { label: 'Distance to service', value: '7,624 km', ok: true },
              ].map((row, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between py-1.5 border-b border-white/[0.04] last:border-0"
                >
                  <span className="text-zinc-400 text-[11px]">{row.label}</span>
                  <div className="flex items-center gap-1.5 text-[11px] font-medium text-white">
                    <span className={`w-1.5 h-1.5 rounded-full ${row.ok ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                    <span>{row.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= FIND VIEW ================= */}
        {activeTab === 'find' && (
          <div className="space-y-4 pb-12 animate-in fade-in duration-200">
            <div>
              <span className="text-[10px] font-semibold tracking-wider uppercase text-zinc-400">
                LOCATION
              </span>
              <h2 className="text-xl font-bold text-white">Find My Car</h2>
              <p className="text-[10px] font-mono text-zinc-400 mt-0.5">
                5.40990, 100.32468 · Updated live
              </p>
            </div>

            {/* Live Map Frame */}
            <div className="rounded-2xl overflow-hidden border border-white/[0.08] relative aspect-video bg-zinc-950">
              <iframe
                title="Vehicle live location"
                src="https://www.openstreetmap.org/export/embed.html?bbox=100.31268%2C5.3979%2C100.33668%2C5.4219&layer=mapnik&marker=5.40990%2C100.32468"
                className="w-full h-full [filter:grayscale(1)_invert(0.92)_contrast(0.95)]"
              />
            </div>

            <a
              href="https://www.google.com/maps/search/?api=1&query=5.40990,100.32468"
              target="_blank"
              rel="noreferrer"
              className="w-full py-2.5 rounded-2xl bg-white text-black text-xs font-semibold flex items-center justify-center transition-all hover:bg-zinc-200 shadow"
            >
              Open directions in Google Maps ↗
            </a>

            {/* Coordinates & Telemetry */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-3 rounded-2xl bg-zinc-900/60 border border-white/[0.08]">
                <div className="text-[9px] text-zinc-400 uppercase">Latitude</div>
                <div className="font-mono font-bold text-white mt-0.5">5.40990° N</div>
              </div>
              <div className="p-3 rounded-2xl bg-zinc-900/60 border border-white/[0.08]">
                <div className="text-[9px] text-zinc-400 uppercase">Longitude</div>
                <div className="font-mono font-bold text-white mt-0.5">100.32468° E</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 4. Bottom Native App Navigation Bar */}
      <div className="px-2 py-2 border-t border-white/[0.08] bg-zinc-950/90 backdrop-blur-xl flex items-center justify-around shrink-0 z-30">
        {[
          { id: 'overview' as const, label: 'OVERVIEW', icon: Gauge },
          { id: 'controls' as const, label: 'CONTROLS', icon: SlidersHorizontal },
          { id: 'climate' as const, label: 'CLIMATE', icon: Fan },
          { id: 'health' as const, label: 'HEALTH', icon: Activity },
          { id: 'find' as const, label: 'FIND', icon: LocateFixed },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center gap-1 py-1 px-2 rounded-xl transition-all cursor-pointer ${
                isActive
                  ? 'bg-white/10 text-white font-semibold'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-red-400' : ''}`} />
              <span className="text-[8px] tracking-tight">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
