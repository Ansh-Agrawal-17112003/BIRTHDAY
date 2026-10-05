import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Flame } from 'lucide-react';
import { birthdayData } from '../config/birthdayData';
import { triggerCelebration, triggerHeartBurst } from '../utils/confettiEngine';

export default function HeroSection({ onMakeWishClick }) {
  // Floating balloons configuration
  const balloons = [
    { color: 'from-pink-400 to-rose-500', left: '10%', delay: '0s', size: 'w-14 h-18 sm:w-16 sm:h-22' },
    { color: 'from-purple-400 to-indigo-500', left: '22%', delay: '1.2s', size: 'w-12 h-16 sm:w-14 sm:h-18' },
    { color: 'from-amber-300 to-yellow-500', left: '78%', delay: '0.6s', size: 'w-14 h-18 sm:w-16 sm:h-22' },
    { color: 'from-fuchsia-400 to-pink-500', left: '88%', delay: '1.8s', size: 'w-12 h-16 sm:w-14 sm:h-18' },
  ];

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-20 pb-16 overflow-hidden">
      {/* Soft gradient background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(168,85,247,0.18),transparent_70%)] pointer-events-none" />

      {/* Floating Interactive Balloons */}
      <div className="absolute inset-x-0 top-0 h-full pointer-events-none overflow-hidden">
        {balloons.map((b, idx) => (
          <div
            key={idx}
            className="absolute -bottom-24 animate-float-slow transition-transform hover:scale-110 pointer-events-auto cursor-pointer"
            style={{
              left: b.left,
              animationDelay: b.delay,
              animationDuration: `${7 + idx * 1.5}s`,
            }}
            onClick={triggerHeartBurst}
            title="Pop celebration!"
          >
            <div className={`rounded-[50%_50%_50%_50%/40%_40%_60%_60%] bg-gradient-to-b ${b.color} shadow-lg shadow-pink-500/20 ${b.size} relative`}>
              <div className="absolute top-2 left-2 w-3 h-4 bg-white/40 rounded-full blur-[1px]" />
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-pink-600 rounded-sm" />
              {/* String */}
              <div className="absolute top-full left-1/2 w-[1px] h-24 bg-pink-200/30 -translate-x-1/2" />
            </div>
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        {/* Top Tag Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 text-sm font-medium tracking-widest uppercase mb-6 backdrop-blur-md shadow-glow-pink"
        >
          <Sparkles className="w-4 h-4 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
          <span>{birthdayData.hero.badge}</span>
          <Sparkles className="w-4 h-4 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
        </motion.div>

        {/* Main Animated Title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, type: 'spring', bounce: 0.4 }}
          className="text-5xl sm:text-7xl md:text-8xl font-serif font-black tracking-tight leading-tight gradient-text-gold drop-shadow-lg mb-4 cursor-pointer select-none"
          onClick={triggerCelebration}
          title="Click to celebrate!"
        >
          {birthdayData.hero.title}
        </motion.h1>

        {/* Subtitle */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-2xl sm:text-3xl md:text-4xl font-script text-pink-300 text-glow-pink mb-4"
        >
          {birthdayData.hero.subtitle}
        </motion.h2>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-base sm:text-lg text-purple-200/80 max-w-xl mx-auto mb-10 font-light"
        >
          {birthdayData.hero.tagline}
        </motion.p>

        {/* Celebratory Animated Birthday Cake Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4, type: 'spring' }}
          className="relative my-4 flex flex-col items-center cursor-pointer group"
          onClick={onMakeWishClick}
          title="Click to make a wish!"
        >
          {/* Flame Sparkle Aura */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-16 h-16 bg-amber-400/30 rounded-full blur-xl animate-pulse" />

          {/* Candle & Flame */}
          <div className="relative flex flex-col items-center">
            {/* Flickering Flame */}
            <div className="relative w-5 h-7 bg-gradient-to-t from-amber-500 via-orange-400 to-yellow-200 rounded-full blur-[0.5px] shadow-[0_0_15px_#f59e0b] animate-candle-flicker flex items-center justify-center">
              <div className="w-2 h-3 bg-white/90 rounded-full" />
            </div>
            {/* Candle Wick */}
            <div className="w-1 h-3 bg-neutral-800" />
            {/* Candle Body with Festive Stripes */}
            <div className="w-4 h-12 rounded-t-sm bg-gradient-to-b from-pink-300 to-pink-500 relative overflow-hidden border border-pink-200/40 shadow-md">
              <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_4px,rgba(255,255,255,0.7)_4px,rgba(255,255,255,0.7)_8px)]" />
            </div>
          </div>

          {/* Multi-tier Cake */}
          <div className="flex flex-col items-center -mt-1">
            {/* Top Tier */}
            <div className="w-32 h-10 rounded-t-xl bg-gradient-to-r from-purple-300 via-pink-200 to-purple-300 border-t border-x border-white/40 shadow-inner relative flex justify-around items-center px-3">
              <div className="w-3 h-3 rounded-full bg-pink-400 shadow-sm" />
              <div className="w-3 h-3 rounded-full bg-amber-300 shadow-sm" />
              <div className="w-3 h-3 rounded-full bg-pink-400 shadow-sm" />
              <div className="w-3 h-3 rounded-full bg-amber-300 shadow-sm" />
            </div>
            {/* Middle Cream Drips */}
            <div className="w-36 h-3 bg-white/90 rounded-b-md shadow-sm -mt-0.5" />
            {/* Base Tier */}
            <div className="w-44 h-14 rounded-b-2xl bg-gradient-to-r from-pink-400 via-rose-300 to-pink-500 border-b border-x border-white/30 shadow-2xl relative flex items-center justify-center overflow-hidden">
              <div className="text-xs font-serif tracking-widest text-pink-950/80 font-bold">
                {birthdayData.friendName.toUpperCase()}
              </div>
              <div className="absolute bottom-1 inset-x-0 h-1 bg-amber-200/50" />
            </div>
            {/* Cake Stand / Plate */}
            <div className="w-56 h-3 bg-gradient-to-r from-slate-300 via-white to-slate-300 rounded-full shadow-lg -mt-0.5 border border-white/40" />
            <div className="w-24 h-2 bg-neutral-400 rounded-b-lg shadow-sm" />
          </div>

          {/* Interactive Tooltip / Prompt */}
          <div className="mt-4 px-4 py-1.5 rounded-full bg-pink-500/20 border border-pink-400/30 text-xs text-pink-200 group-hover:bg-pink-500/30 transition-all flex items-center gap-1.5 shadow-glow-pink">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Click the cake to blow the candles & make a wish!</span>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <div className="mt-12 flex flex-col items-center gap-2 text-pink-300/60 animate-bounce">
          <span className="text-xs uppercase tracking-widest font-light">Scroll for your letter</span>
          <svg className="w-4 h-4 text-pink-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
}
