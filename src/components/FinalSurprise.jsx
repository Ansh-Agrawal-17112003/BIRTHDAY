import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, RefreshCw, PartyPopper } from 'lucide-react';
import { birthdayData } from '../config/birthdayData';
import { triggerGrandFinale, triggerHeartBurst } from '../utils/confettiEngine';

export default function FinalSurprise({ onReplay }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.6,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const handleLaunchFinale = () => {
    triggerGrandFinale();
    triggerHeartBurst();
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 py-28 overflow-hidden">
      {/* Dreamy deep background ambient glows */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(244,114,182,0.14),transparent_65%)] pointer-events-none" />
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full max-w-4xl h-80 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="relative z-10 max-w-3xl mx-auto flex flex-col items-center space-y-10"
      >
        {/* Cinematic Step 1: "One Last Thing..." */}
        <motion.div variants={itemVariants}>
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-pink-500/15 border border-pink-400/30 text-pink-300 text-sm font-semibold tracking-widest uppercase backdrop-blur-md shadow-glow-pink">
            <Sparkles className="w-4 h-4 text-amber-300 animate-spin" style={{ animationDuration: '8s' }} />
            <span>{birthdayData.finalSurprise.line1}</span>
            <Sparkles className="w-4 h-4 text-amber-300 animate-spin" style={{ animationDuration: '8s' }} />
          </span>
        </motion.div>

        {/* Cinematic Step 2: "Thank you for being you." */}
        <motion.p
          variants={itemVariants}
          className="text-3xl sm:text-4xl md:text-5xl font-serif italic text-amber-100/90 font-medium"
        >
          "{birthdayData.finalSurprise.line2}"
        </motion.p>

        {/* Cinematic Step 3: "Happy Birthday to one of the most beautiful souls I've ever known. ❤️" */}
        <motion.p
          variants={itemVariants}
          className="text-xl sm:text-2xl md:text-3xl font-light text-pink-200/90 max-w-2xl mx-auto leading-relaxed"
        >
          {birthdayData.finalSurprise.line3}
        </motion.p>

        {/* Grand Reveal: "HAPPY BIRTHDAY, BEAUTIFUL SOUL! 🎂✨❤️" */}
        <motion.div
          variants={itemVariants}
          className="pt-4 pb-2"
        >
          <div
            onClick={handleLaunchFinale}
            className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-pink-500/20 via-purple-600/20 to-amber-500/20 border border-pink-400/40 backdrop-blur-xl shadow-[0_0_60px_rgba(244,114,182,0.3)] hover:scale-105 transition-all duration-300 cursor-pointer select-none group"
            title="Click for grand fireworks!"
          >
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif font-black tracking-tight leading-tight gradient-text-gold drop-shadow-lg group-hover:scale-102 transition-transform">
              {birthdayData.finalSurprise.grandTitle}
            </h2>
            <div className="mt-4 flex items-center justify-center gap-2 text-xs sm:text-sm text-pink-300 uppercase tracking-widest font-semibold">
              <PartyPopper className="w-4 h-4 text-amber-300 animate-bounce" />
              <span>Click for fireworks explosion</span>
              <PartyPopper className="w-4 h-4 text-amber-300 animate-bounce" />
            </div>
          </div>
        </motion.div>

        {/* Action Controls */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-4 pt-6"
        >
          <button
            onClick={handleLaunchFinale}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-amber-400 text-white font-semibold text-base shadow-glow-pink hover:scale-105 active:scale-95 transition-all flex items-center gap-2.5"
          >
            <Sparkles className="w-5 h-5 text-amber-100" />
            <span>Grand Fireworks Finale 🎆</span>
          </button>

          <button
            onClick={onReplay}
            className="px-6 py-4 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-purple-200 font-medium text-sm transition-all flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4 text-pink-300" />
            <span>{birthdayData.finalSurprise.replayText}</span>
          </button>
        </motion.div>

        {/* Footer heartfelt note */}
        <motion.p
          variants={itemVariants}
          className="text-xs text-purple-300/50 pt-8 tracking-widest uppercase font-light"
        >
          Made with endless love for {birthdayData.friendName} • Forever & Always 💫
        </motion.p>
      </motion.div>
    </section>
  );
}
