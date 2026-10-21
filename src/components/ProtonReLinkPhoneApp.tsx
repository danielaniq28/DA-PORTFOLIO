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
  Fuel,
  RefreshCw,
  LogOut,
  AppWindow,
  Compass
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export type PhoneTab = 'overview' | 'controls' | 'climate' | 'health' | 'find';

interface PhoneAppProps {
  activeTab: PhoneTab;
  onTabChange: (tab: PhoneTab) => void;
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
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const visible = circumference * 0.72;
  const targetOffset = visible * (1 - fuelPercent / 100);

  return (
    <div className="relative w-full h-full bg-[#08080a] text-white flex flex-col font-sans select-none overflow-hidden text-[11px]">
      {/* 1. iOS Status Bar with Notch Spacing */}
      <div className="pt-4 px-4 pb-1 flex items-center justify-between text-[10px] text-zinc-300 font-semibold shrink-0 z-30">
        <span className="font-mono">11:09</span>
        <div className="flex items-center gap-1.5 text-zinc-300">
          <Signal className="w-3 h-3" />
          <Wifi className="w-3 h-3" />
          <div className="flex items-center gap-0.5">
            <span className="text-[9px] font-mono">84</span>
            <Battery className="w-3.5 h-3.5 text-emerald-400" />
          </div>
        </div>
      </div>

      {/* 2. Proton ReLink App Bar with Sign Out Button (matches screenshot) */}
      <div className="px-3.5 py-1.5 border-b border-white/[0.06] flex items-center justify-between shrink-0 bg-zinc-950/60 backdrop-blur-md z-20">
        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <span className="text-[9px] font-bold tracking-tight text-zinc-400 uppercase">
              PROTON RE-LINK
            </span>
            <span className="text-[8px] text-red-500 font-bold flex items-center gap-0.5">
              <span>Powered by</span>
              <span className="text-red-500 font-mono italic font-bold">7%</span>
            </span>
          </div>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="text-[11px] font-bold text-white tracking-wide">
              S70 · ANQ2882
            </span>
            <span className="flex items-center gap-1 text-[8px] text-emerald-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Live</span>
            </span>
          </div>
        </div>

        <button
          onClick={handleRefresh}
          className="px-2 py-0.5 rounded-full bg-white/[0.06] hover:bg-white/10 border border-white/10 text-[9px] font-medium text-zinc-300 flex items-center gap-1 transition-colors cursor-pointer"
          title="Sign out / Sync"
        >
          <LogOut className="w-2.5 h-2.5 text-zinc-400" />
          <span>Sign out</span>
        </button>
      </div>

      {/* Action Toast Notification */}
      <AnimatePresence>
        {actionFeedback && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="absolute top-16 left-3 right-3 z-50 bg-zinc-900/95 border border-red-500/50 backdrop-blur-xl rounded-xl p-2 shadow-2xl flex items-center gap-2 text-white"
          >
            <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
            <span className="font-medium text-[9px] leading-tight text-zinc-200">
              {actionFeedback}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. Main Screen Viewport (Scrollable with Responsive Layout) */}
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-2.5 no-scrollbar">
        {/* ================= OVERVIEW VIEW (matches IMG_6635.PNG) ================= */}
        {activeTab === 'overview' && (
          <div className="space-y-2.5 pb-6 animate-in fade-in duration-200">
            {/* Top Car Card */}
            <div className="relative rounded-2xl bg-zinc-900/40 border border-white/[0.08] p-3 overflow-hidden">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[8px] font-bold text-zinc-400 tracking-wider uppercase block">
                    DEEP MARINE BLUE
                  </span>
                  <div className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-[8px] font-semibold text-amber-400 my-1">
                    <span className="w-1 h-1 rounded-full bg-amber-400" />
                    <span>ACO TECH · ATLAS</span>
                  </div>
                  <h2 className="text-xl font-bold tracking-tight text-white leading-tight">
                    S70
                  </h2>
                  <p className="text-[10px] font-mono text-zinc-400">ANQ2882</p>
                </div>

                {/* Compact Fuel Gauge */}
                <div className="relative w-18 h-16 flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 100 90" className="w-full h-full">
                    <circle
                      cx="50"
                      cy="50"
                      r={radius}
                      fill="none"
                      stroke="rgba(255,255,255,0.08)"
                      strokeWidth="7"
                      strokeLinecap="round"
                      strokeDasharray={`${visible} ${circumference}`}
                      transform="rotate(140 50 50)"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r={radius}
                      fill="none"
                      stroke="#f4f4f5"
                      strokeWidth="7"
                      strokeLinecap="round"
                      strokeDasharray={`${visible} ${circumference}`}
                      strokeDashoffset={targetOffset}
                      transform="rotate(140 50 50)"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center pt-1.5">
                    <span className="text-xs font-bold font-mono leading-none text-white">
                      700<span className="text-[8px] text-zinc-400 ml-0.5">KM</span>
                    </span>
                    <span className="text-[8px] text-emerald-400 font-semibold mt-0.5 flex items-center gap-0.5">
                      <Fuel className="w-2 h-2" />
                      <span>98%</span>
                    </span>
                    <span className="text-[7px] text-zinc-500">49/50L</span>
                  </div>
                </div>
              </div>

              {/* Sedan Graphic in Profile View */}
              <div className="my-1.5 relative flex items-center justify-center">
                <svg
                  viewBox="0 0 680 200"
                  className={`w-full max-h-[75px] drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] transition-all ${
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

                  <ellipse cx="340" cy="182" rx="260" ry="14" fill="rgba(0,0,0,0.7)" />

                  <path
                    d="M 120 152 L 100 146 C 92 143, 86 135, 88 126 C 92 110, 108 104, 138 100 L 204 92 C 238 88, 260 66, 290 54 C 334 36, 420 36, 474 52 C 514 64, 536 84, 574 94 L 590 100 C 602 104, 608 112, 606 122 C 604 132, 594 140, 576 146 L 554 150 A 40 40 0 0 0 466 150 L 230 150 A 40 40 0 0 0 142 150 Z"
                    fill="url(#s70-paint)"
                  />

                  <path
                    d="M 234 88 C 264 68, 288 54, 324 46 C 368 38, 440 38, 480 50 C 506 60, 524 74, 542 88 L 528 90 L 426 90 L 338 90 Z"
                    fill="url(#s70-glass)"
                    stroke="#18181b"
                    strokeWidth="2"
                  />
                  <rect x="372" y="42" width="8" height="48" fill="#09090b" />
                  <path d="M 468 52 L 476 90" stroke="#09090b" strokeWidth="5" />

                  <path d="M 226 90 L 546 90" stroke="#cbd5e1" strokeWidth="1.5" strokeOpacity="0.8" />
                  <path d="M 126 102 C 220 98, 380 100, 584 106" stroke="#93c5fd" strokeWidth="2" strokeOpacity="0.7" fill="none" />

                  <polygon points="90,122 116,108 132,110 106,128" fill={isEngineOn || isHornFlashing ? "#60a5fa" : "#ffffff"} />
                  <polygon points="584,106 606,116 602,126 578,114" fill={isEngineOn || isHornFlashing ? "#ef4444" : "#991b1b"} />

                  <g transform="translate(186, 150)">
                    <circle cx="0" cy="0" r="34" fill="#18181b" stroke="#09090b" strokeWidth="2.5" />
                    <circle cx="0" cy="0" r="24" fill="#27272a" stroke="#cbd5e1" strokeWidth="2.5" />
                    <circle cx="0" cy="0" r="14" fill="#3f3f46" />
                    <circle cx="0" cy="0" r="5" fill="#09090b" stroke="#d4af37" strokeWidth="1" />
                  </g>
                  <g transform="translate(510, 150)">
                    <circle cx="0" cy="0" r="34" fill="#18181b" stroke="#09090b" strokeWidth="2.5" />
                    <circle cx="0" cy="0" r="24" fill="#27272a" stroke="#cbd5e1" strokeWidth="2.5" />
                    <circle cx="0" cy="0" r="14" fill="#3f3f46" />
                    <circle cx="0" cy="0" r="5" fill="#09090b" stroke="#d4af37" strokeWidth="1" />
                  </g>
                </svg>
              </div>

              {/* Ambient Pills (matches screenshot) */}
              <div className="flex items-center justify-center gap-1.5 text-[8px] text-zinc-300 font-mono mt-1 pt-1.5 border-t border-white/[0.06]">
                <span className="px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/5">
                  INTERIOR 24°C
                </span>
                <span className="px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/5">
                  EXTERIOR 32°C
                </span>
              </div>
              <div className="flex justify-center mt-1">
                <span className="px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/5 text-[8px] font-mono text-zinc-400">
                  AVG SPEED 19 km/h
                </span>
              </div>

              {/* Service bar */}
              <div className="mt-2 pt-1.5 border-t border-white/[0.06]">
                <div className="flex items-center justify-between text-[8px] text-zinc-400 font-mono">
                  <span>NEXT SERVICE SCHEDULED</span>
                  <span className="text-white font-bold">7,624 km</span>
                </div>
                <div className="w-full h-1 rounded-full bg-white/10 mt-1 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-red-500 to-amber-500 rounded-full w-[24%]" />
                </div>
              </div>
            </div>

            {/* Diagnostics & Stats (matches screenshot) */}
            <div className="space-y-1.5">
              <span className="text-[8px] font-mono tracking-wider text-zinc-400 uppercase">
                DIAGNOSTICS &amp; STATS
              </span>
              <div className="grid grid-cols-2 gap-1.5 text-xs">
                <button
                  onClick={() =>
                    triggerControlAction(
                      isEngineOn ? 'Engine stopped' : 'Remote engine started',
                      () => setIsEngineOn(!isEngineOn)
                    )
                  }
                  className="p-2 rounded-xl bg-zinc-900/60 border border-white/[0.08] flex flex-col text-left hover:border-white/20 transition-all cursor-pointer"
                >
                  <span className="text-[8px] text-zinc-400 uppercase font-mono">ENGINE</span>
                  <div className="flex items-center gap-1.5 mt-0.5 font-bold text-white text-[11px]">
                    <span className={`w-1.5 h-1.5 rounded-full ${isEngineOn ? 'bg-amber-400 animate-pulse' : 'bg-emerald-400'}`} />
                    <span>{isEngineOn ? 'Running' : 'Off'}</span>
                  </div>
                </button>

                <div className="p-2 rounded-xl bg-zinc-900/60 border border-white/[0.08] flex flex-col">
                  <span className="text-[8px] text-zinc-400 uppercase font-mono">EFFICIENCY</span>
                  <span className="text-[11px] font-bold text-white font-mono mt-0.5">
                    10.2 <span className="text-[8px] font-normal text-zinc-400">L/100 km</span>
                  </span>
                </div>

                <div className="p-2 rounded-xl bg-zinc-900/60 border border-white/[0.08] flex flex-col">
                  <span className="text-[8px] text-zinc-400 uppercase font-mono">BATTERY</span>
                  <div className="flex items-center gap-1.5 mt-0.5 font-bold text-white text-[11px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span className="font-mono">12.9 V</span>
                  </div>
                </div>

                <div className="p-2 rounded-xl bg-zinc-900/60 border border-white/[0.08] flex flex-col">
                  <span className="text-[8px] text-zinc-400 uppercase font-mono">SERVICE IN</span>
                  <span className="text-[11px] font-bold text-white font-mono mt-0.5">
                    7,624 <span className="text-[8px] font-normal text-zinc-400">km</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= CONTROLS VIEW (matches IMG_6520.PNG & IMG_6636.PNG) ================= */}
        {activeTab === 'controls' && (
          <div className="space-y-2.5 pb-6 animate-in fade-in duration-200">
            <div>
              <span className="text-[8px] font-semibold tracking-wider uppercase text-zinc-400">
                CONTROLS
              </span>
              <h2 className="text-base font-bold text-white leading-tight">Vehicle Controls</h2>
              <p className="text-[9px] text-zinc-400">S70 · ANQ2882</p>
            </div>

            {/* Profile Sedan graphic */}
            <div className="relative py-1 flex items-center justify-center">
              <svg viewBox="0 0 680 180" className="w-full max-h-[60px] drop-shadow-md">
                <ellipse cx="340" cy="165" rx="240" ry="12" fill="rgba(0,0,0,0.6)" />
                <path
                  d="M 120 142 L 100 136 C 92 133, 86 125, 88 116 C 92 100, 108 94, 138 90 L 204 82 C 238 78, 260 56, 290 44 C 334 26, 420 26, 474 42 C 514 54, 536 74, 574 84 L 590 90 C 602 94, 608 102, 606 112 C 604 122, 594 130, 576 136 L 554 140 A 36 36 0 0 0 466 140 L 230 140 A 36 36 0 0 0 142 140 Z"
                  fill="#1d4ed8"
                />
                <path
                  d="M 234 78 C 264 58, 288 44, 324 36 C 368 28, 440 28, 480 40 C 506 50, 524 64, 542 78 Z"
                  fill="#09090b"
                />
                <circle cx="186" cy="140" r="26" fill="#18181b" stroke="#cbd5e1" strokeWidth="2" />
                <circle cx="510" cy="140" r="26" fill="#18181b" stroke="#cbd5e1" strokeWidth="2" />
              </svg>
            </div>

            <span className="text-[8px] font-mono tracking-wider text-zinc-400 uppercase block">
              QUICK ACTIONS
            </span>

            {/* 6 Responsive Action Tiles in 2 Columns */}
            <div className="grid grid-cols-2 gap-2">
              {/* Unlock / Lock */}
              <button
                onClick={() =>
                  triggerControlAction(
                    isLocked ? 'Doors Unlocked' : 'Doors Locked',
                    () => setIsLocked(!isLocked)
                  )
                }
                className="p-2.5 rounded-xl bg-zinc-900/70 border border-white/[0.08] hover:border-red-500/40 text-left transition-all cursor-pointer flex flex-col justify-between h-[68px]"
              >
                <div className="flex items-center justify-between w-full">
                  <div className="p-1 rounded-lg bg-white/[0.06]">
                    {isLocked ? <Lock className="w-3.5 h-3.5 text-red-400" /> : <Unlock className="w-3.5 h-3.5 text-emerald-400" />}
                  </div>
                  <span className="text-[8px] px-1.5 py-0.2 rounded-full flex items-center gap-1 font-semibold bg-zinc-950 text-zinc-300 border border-white/5">
                    <span className={`w-1 h-1 rounded-full ${isLocked ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                    <span>{isLocked ? 'Locked' : 'Open'}</span>
                  </span>
                </div>
                <div>
                  <div className="text-[11px] font-bold text-white leading-tight">{isLocked ? 'Unlock' : 'Lock'}</div>
                  <div className="text-[9px] text-zinc-400 truncate">All doors {isLocked ? 'locked' : 'open'}</div>
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
                className="p-2.5 rounded-xl bg-zinc-900/70 border border-white/[0.08] hover:border-red-500/40 text-left transition-all cursor-pointer flex flex-col justify-between h-[68px]"
              >
                <div className="flex items-center justify-between w-full">
                  <div className="p-1 rounded-lg bg-white/[0.06]">
                    <Power className={`w-3.5 h-3.5 ${isEngineOn ? 'text-amber-400 animate-pulse' : 'text-zinc-400'}`} />
                  </div>
                  <span className="text-[8px] px-1.5 py-0.2 rounded-full flex items-center gap-1 font-semibold bg-zinc-950 text-zinc-300 border border-white/5">
                    <span className={`w-1 h-1 rounded-full ${isEngineOn ? 'bg-amber-400' : 'bg-emerald-400'}`} />
                    <span>{isEngineOn ? 'Running' : 'Off'}</span>
                  </span>
                </div>
                <div>
                  <div className="text-[11px] font-bold text-white leading-tight">{isEngineOn ? 'Stop engine' : 'Start engine'}</div>
                  <div className="text-[9px] text-zinc-400 truncate">{isEngineOn ? 'Running' : 'Engine off'}</div>
                </div>
              </button>

              {/* Find Car */}
              <button
                onClick={handleHorn}
                className="p-2.5 rounded-xl bg-zinc-900/70 border border-white/[0.08] hover:border-white/20 text-left transition-all cursor-pointer flex flex-col justify-between h-[68px]"
              >
                <div className="flex items-center justify-between w-full">
                  <div className="p-1 rounded-lg bg-white/[0.06]">
                    <Compass className="w-3.5 h-3.5 text-zinc-300" />
                  </div>
                  <span className="text-[8px] text-zinc-400 font-mono">Ready</span>
                </div>
                <div>
                  <div className="text-[11px] font-bold text-white leading-tight">Find car</div>
                  <div className="text-[9px] text-zinc-400 truncate">Horn &amp; lights</div>
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
                className="p-2.5 rounded-xl bg-zinc-900/70 border border-white/[0.08] hover:border-white/20 text-left transition-all cursor-pointer flex flex-col justify-between h-[68px]"
              >
                <div className="flex items-center justify-between w-full">
                  <div className="p-1 rounded-lg bg-white/[0.06]">
                    <Maximize2 className="w-3.5 h-3.5 text-zinc-300" />
                  </div>
                  <span className="text-[8px] px-1.5 py-0.2 rounded-full flex items-center gap-1 font-semibold bg-zinc-950 text-zinc-300 border border-white/5">
                    <span className={`w-1 h-1 rounded-full ${isTrunkOpen ? 'bg-amber-400' : 'bg-emerald-400'}`} />
                    <span>{isTrunkOpen ? 'Open' : 'Closed'}</span>
                  </span>
                </div>
                <div>
                  <div className="text-[11px] font-bold text-white leading-tight">{isTrunkOpen ? 'Close trunk' : 'Open trunk'}</div>
                  <div className="text-[9px] text-zinc-400 truncate">Trunk {isTrunkOpen ? 'open' : 'closed'}</div>
                </div>
              </button>

              {/* Open windows */}
              <button
                onClick={() =>
                  triggerControlAction(
                    isWindowsVent ? 'Windows closed' : 'Windows opened',
                    () => setIsWindowsVent(!isWindowsVent)
                  )
                }
                className="p-2.5 rounded-xl bg-zinc-900/70 border border-white/[0.08] hover:border-white/20 text-left transition-all cursor-pointer flex flex-col justify-between h-[68px]"
              >
                <div className="flex items-center justify-between w-full">
                  <div className="p-1 rounded-lg bg-white/[0.06]">
                    <AppWindow className="w-3.5 h-3.5 text-zinc-300" />
                  </div>
                  <span className="text-[8px] px-1.5 py-0.2 rounded-full flex items-center gap-1 font-semibold bg-zinc-950 text-zinc-300 border border-white/5">
                    <span className={`w-1 h-1 rounded-full ${isWindowsVent ? 'bg-amber-400' : 'bg-emerald-400'}`} />
                    <span>{isWindowsVent ? 'Vent' : 'Closed'}</span>
                  </span>
                </div>
                <div>
                  <div className="text-[11px] font-bold text-white leading-tight">Open windows</div>
                  <div className="text-[9px] text-zinc-400 truncate">Windows {isWindowsVent ? 'vented' : 'closed'}</div>
                </div>
              </button>

              {/* Vent windows */}
              <button
                onClick={() =>
                  triggerControlAction(
                    isWindowsVent ? 'Windows closed' : 'Windows set to vent mode',
                    () => setIsWindowsVent(!isWindowsVent)
                  )
                }
                className="p-2.5 rounded-xl bg-zinc-900/70 border border-white/[0.08] hover:border-white/20 text-left transition-all cursor-pointer flex flex-col justify-between h-[68px]"
              >
                <div className="flex items-center justify-between w-full">
                  <div className="p-1 rounded-lg bg-white/[0.06]">
                    <Fan className="w-3.5 h-3.5 text-zinc-300" />
                  </div>
                  <span className="text-[8px] px-1.5 py-0.2 rounded-full flex items-center gap-1 font-semibold bg-zinc-950 text-zinc-300 border border-white/5">
                    <span className={`w-1 h-1 rounded-full ${isWindowsVent ? 'bg-amber-400' : 'bg-emerald-400'}`} />
                    <span>{isWindowsVent ? 'Active' : 'Closed'}</span>
                  </span>
                </div>
                <div>
                  <div className="text-[11px] font-bold text-white leading-tight">Vent windows</div>
                  <div className="text-[9px] text-zinc-400 truncate">Cabin venting</div>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* ================= CLIMATE VIEW (matches IMG_6637.PNG) ================= */}
        {activeTab === 'climate' && (
          <div className="space-y-2.5 pb-6 animate-in fade-in duration-200">
            <div>
              <span className="text-[8px] font-semibold tracking-wider uppercase text-zinc-400">
                CLIMATE
              </span>
              <h2 className="text-base font-bold text-white leading-tight">Climate Control</h2>
              <p className="text-[9px] text-zinc-400">S70 · ANQ2882</p>
            </div>

            {/* Target Temperature Section */}
            <div className="rounded-2xl bg-zinc-900/40 border border-white/[0.08] p-3 text-center flex flex-col items-center">
              <span className="text-[8px] font-mono tracking-wider text-zinc-400 uppercase">
                TARGET TEMPERATURE
              </span>

              <div className="flex items-center gap-1.5 mt-1">
                <span className="px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/5 text-[8px] font-mono text-zinc-300">
                  INTERIOR 24°C
                </span>
                <span className="px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/5 text-[8px] font-mono text-zinc-300">
                  EXTERIOR 32°C
                </span>
              </div>

              {/* Responsive Stepper (matches screenshot circles) */}
              <div className="flex items-center justify-center gap-4 my-3">
                <button
                  onClick={() => setTargetTemp((prev) => Math.max(18, prev - 1))}
                  className="w-8 h-8 rounded-full bg-cyan-900/40 border border-cyan-500/30 flex items-center justify-center text-cyan-300 active:scale-95 transition-all cursor-pointer"
                  aria-label="Decrease temperature"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <div className="text-4xl font-light tracking-tight text-white font-mono tabular-nums">
                  {targetTemp}
                </div>

                <button
                  onClick={() => setTargetTemp((prev) => Math.min(31, prev + 1))}
                  className="w-8 h-8 rounded-full bg-red-950/50 border border-red-500/30 flex items-center justify-center text-red-400 active:scale-95 transition-all cursor-pointer"
                  aria-label="Increase temperature"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <span className="text-[8px] font-mono text-zinc-500 mb-2">18–31°C</span>

              <button
                onClick={() =>
                  triggerControlAction(
                    isAcOn ? 'A/C Deactivated' : `Cabin Pre-cooling active at ${targetTemp}°C`,
                    () => setIsAcOn(!isAcOn)
                  )
                }
                className={`w-full py-2 rounded-full text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  isAcOn
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                    : 'bg-white/[0.06] hover:bg-white/10 border border-white/10 text-zinc-200'
                }`}
              >
                <Power className="w-3.5 h-3.5" />
                <span>{isAcOn ? 'Air Conditioning Running' : 'Air Conditioning Off'}</span>
              </button>
            </div>

            {/* Preset Duration (matches screenshot) */}
            <div className="rounded-2xl bg-zinc-900/40 border border-white/[0.08] p-3">
              <span className="text-[8px] font-mono tracking-wider text-zinc-400 uppercase">
                PRESET DURATION
              </span>
              <div className="text-[11px] font-bold text-white mt-0.5">Auto-off Timer</div>
              <div className="text-[9px] text-zinc-400 leading-tight">
                Shuts down cabin A/C after preset runtime ({selectedTimer} min)
              </div>

              <div className="flex items-center gap-1 mt-2">
                {[3, 5, 8, 10, 15, 20].map((mins) => (
                  <button
                    key={mins}
                    onClick={() => {
                      setSelectedTimer(mins);
                      triggerControlAction(`Timer set to ${mins} minutes`, () => {});
                    }}
                    className={`flex-1 py-1 rounded-full text-[9px] font-mono font-medium transition-all cursor-pointer ${
                      selectedTimer === mins
                        ? 'bg-white text-black font-bold shadow'
                        : 'bg-white/[0.06] text-zinc-400 hover:text-white border border-white/5'
                    }`}
                  >
                    {mins}
                  </button>
                ))}
                <span className="text-[8px] text-zinc-500 ml-0.5">min</span>
              </div>
            </div>
          </div>
        )}

        {/* ================= HEALTH VIEW (matches IMG_6638.PNG) ================= */}
        {activeTab === 'health' && (
          <div className="space-y-2.5 pb-6 animate-in fade-in duration-200">
            <div>
              <span className="text-[8px] font-semibold tracking-wider uppercase text-zinc-400">
                HEALTH
              </span>
              <h2 className="text-base font-bold text-white leading-tight">Vehicle Health</h2>
              <p className="text-[9px] text-zinc-400">S70 · ANQ2882</p>
            </div>

            {/* Tyre Pressures 2x2 Grid */}
            <div>
              <span className="text-[8px] font-mono tracking-wider text-zinc-400 uppercase block mb-1">
                TYRE PRESSURES
              </span>
              <div className="grid grid-cols-2 gap-1.5 text-xs">
                <div className="p-2 rounded-xl bg-zinc-900/60 border border-white/[0.08] flex items-center justify-between">
                  <div>
                    <div className="text-[8px] text-zinc-400 uppercase font-mono">FRONT LEFT</div>
                    <div className="text-xs font-bold text-white font-mono mt-0.5">235 <span className="text-[8px] font-normal text-zinc-400">kPa</span></div>
                  </div>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                </div>

                <div className="p-2 rounded-xl bg-zinc-900/60 border border-white/[0.08] flex items-center justify-between">
                  <div>
                    <div className="text-[8px] text-zinc-400 uppercase font-mono">FRONT RIGHT</div>
                    <div className="text-xs font-bold text-white font-mono mt-0.5">246 <span className="text-[8px] font-normal text-zinc-400">kPa</span></div>
                  </div>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                </div>

                <div className="p-2 rounded-xl bg-zinc-900/60 border border-white/[0.08] flex items-center justify-between">
                  <div>
                    <div className="text-[8px] text-zinc-400 uppercase font-mono">REAR LEFT</div>
                    <div className="text-xs font-bold text-white font-mono mt-0.5">235 <span className="text-[8px] font-normal text-zinc-400">kPa</span></div>
                  </div>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                </div>

                <div className="p-2 rounded-xl bg-zinc-900/60 border border-white/[0.08] flex items-center justify-between">
                  <div>
                    <div className="text-[8px] text-zinc-400 uppercase font-mono">REAR RIGHT</div>
                    <div className="text-xs font-bold text-white font-mono mt-0.5">235 <span className="text-[8px] font-normal text-zinc-400">kPa</span></div>
                  </div>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                </div>
              </div>
            </div>

            {/* System Diagnostics Checklist (matches screenshot) */}
            <div>
              <span className="text-[8px] font-mono tracking-wider text-zinc-400 uppercase block mb-1">
                SYSTEM DIAGNOSTICS
              </span>
              <div className="rounded-xl bg-zinc-900/60 border border-white/[0.08] divide-y divide-white/[0.04] text-[10px]">
                {[
                  { label: 'Door locks', status: isLocked ? 'Locked' : 'Open', dot: isLocked ? 'bg-emerald-400' : 'bg-amber-400' },
                  { label: 'Windows', status: isWindowsVent ? 'Vented' : 'Closed', dot: 'bg-emerald-400' },
                  { label: 'Trunk', status: isTrunkOpen ? 'Open' : 'Closed', dot: isTrunkOpen ? 'bg-amber-400' : 'bg-emerald-400' },
                  { label: 'Hood', status: 'Closed', dot: 'bg-emerald-400' },
                  { label: 'Engine', status: isEngineOn ? 'Running' : 'Off', dot: isEngineOn ? 'bg-amber-400' : 'bg-emerald-400' },
                  { label: 'A/C', status: isAcOn ? 'Running' : 'Off', dot: isAcOn ? 'bg-emerald-400' : 'bg-zinc-500' },
                  { label: 'Battery voltage', status: '12.9 V', dot: null },
                  { label: 'Distance to service', status: '7,624 km', dot: null },
                ].map((item, idx) => (
                  <div key={idx} className="px-2.5 py-1.5 flex items-center justify-between">
                    <span className="text-zinc-300">{item.label}</span>
                    <div className="flex items-center gap-1">
                      {item.dot && <span className={`w-1 h-1 rounded-full ${item.dot}`} />}
                      <span className="font-mono text-zinc-200 font-medium">{item.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================= FIND VIEW (matches IMG_6639.PNG) ================= */}
        {activeTab === 'find' && (
          <div className="space-y-2.5 pb-6 animate-in fade-in duration-200">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[8px] font-semibold tracking-wider uppercase text-zinc-400">
                  LOCATION
                </span>
                <h2 className="text-base font-bold text-white leading-tight">Find My Car</h2>
                <p className="text-[8px] font-mono text-zinc-400 mt-0.5">
                  5.40990, 100.32468 · Updated live
                </p>
              </div>

              <button
                onClick={handleRefresh}
                className="px-2 py-0.5 rounded-full bg-white/[0.06] hover:bg-white/10 border border-white/10 text-[8px] font-medium text-zinc-300 flex items-center gap-1 transition-colors cursor-pointer"
              >
                <RefreshCw className={`w-2 h-2 ${isRefreshing ? 'animate-spin text-red-400' : ''}`} />
                <span>Refresh</span>
              </button>
            </div>

            <span className="text-[8px] font-mono tracking-wider text-zinc-400 uppercase block">
              LIVE MAP
            </span>

            {/* Live Map Frame */}
            <div className="rounded-xl overflow-hidden border border-white/[0.08] relative aspect-[16/10] bg-zinc-950">
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
              className="w-full py-2 rounded-xl bg-white text-black text-[11px] font-semibold flex items-center justify-center transition-all hover:bg-zinc-200 shadow"
            >
              Open directions in Google Maps ↗
            </a>

            {/* Coordinates & Telemetry */}
            <div className="space-y-1">
              <span className="text-[8px] font-mono tracking-wider text-zinc-400 uppercase block">
                COORDINATES &amp; TELEMETRY
              </span>
              <div className="grid grid-cols-2 gap-1.5 text-xs">
                <div className="p-2 rounded-xl bg-zinc-900/60 border border-white/[0.08]">
                  <div className="text-[8px] text-zinc-400 uppercase font-mono">LATITUDE</div>
                  <div className="font-mono font-bold text-white text-[11px] mt-0.5">5.40990</div>
                </div>
                <div className="p-2 rounded-xl bg-zinc-900/60 border border-white/[0.08]">
                  <div className="text-[8px] text-zinc-400 uppercase font-mono">LONGITUDE</div>
                  <div className="font-mono font-bold text-white text-[11px] mt-0.5">100.32468</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 4. Bottom Native App Navigation Bar (matches screenshots) */}
      <div className="px-1.5 py-1.5 border-t border-white/[0.08] bg-zinc-950/95 backdrop-blur-xl flex items-center justify-around shrink-0 z-30">
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
              className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-xl transition-all cursor-pointer ${
                isActive
                  ? 'bg-white/10 text-white font-semibold'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-red-400' : ''}`} />
              <span className="text-[7.5px] tracking-tight">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
