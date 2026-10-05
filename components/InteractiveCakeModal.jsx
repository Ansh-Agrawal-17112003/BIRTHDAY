import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Heart, Wind } from 'lucide-react';
import { birthdayData } from '../config/birthdayData';
import { audioController } from '../utils/audioEngine';
import { triggerCelebration, triggerCandleExtinguishParticles } from '../utils/confettiEngine';

export default function InteractiveCakeModal({ isOpen, onClose }) {
  // Candle states: array of boolean (lit: true, blown: false)
  const [candles, setCandles] = useState([true, true, true]);
  const [hasBlownAll, setHasBlownAll] = useState(false);

  // Reset when re-opened
  React.useEffect(() => {
    if (isOpen) {
      setCandles([true, true, true]);
      setHasBlownAll(false);
    }
  }, [isOpen]);

  const blowCandle = (index) => {
    if (!candles[index]) return;

    const newCandles = [...candles];
    newCandles[index] = false;
    setCandles(newCandles);

    // Soft chime
    audioController.playSparkleChime();

    // Check if all blown
    if (newCandles.every((c) => !c)) {
      setHasBlownAll(true);
      triggerCandleExtinguishParticles();
      setTimeout(() => {
        triggerCelebration();
      }, 700);
    }
  };

  const blowAllCandles = () => {
    setCandles([false, false, false]);
    setHasBlownAll(true);
    audioController.playSparkleChime();
    triggerCandleExtinguishParticles();
    setTimeout(() => {
      triggerCelebration();
    }, 600);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.85 }}
          transition={{ type: 'spring', duration: 0.6 }}
          className="relative max-w-lg w-full bg-gradient-to-b from-[#1c0e32] to-[#0c0517] border border-pink-400/30 rounded-3xl p-8 sm:p-10 text-center shadow-[0_0_60px_rgba(244,114,182,0.25)] overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-pink-200 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Ambient Candle Glow behind cake */}
          <div
            className={`absolute top-28 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full blur-[80px] transition-all duration-1000 pointer-events-none ${
              hasBlownAll ? 'bg-purple-600/10' : 'bg-amber-400/35'
            }`}
          />

          {!hasBlownAll ? (
            <>
              {/* Header instructions */}
              <div className="mb-6">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-400/20 text-amber-200 border border-amber-300/30 text-xs font-semibold tracking-wider uppercase mb-3">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Make a Birthday Wish
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-dreamy-cream">
                  {birthdayData.interactiveWish.promptText}
                </h3>
                <p className="text-sm text-pink-200/80 mt-2">
                  {birthdayData.interactiveWish.actionText}
                </p>
              </div>

              {/* Interactive Cake with 3 Candles */}
              <div className="relative py-6 flex flex-col items-center">
                {/* 3 Candles Row */}
                <div className="flex justify-center items-end gap-7 mb-[-6px] z-20">
                  {candles.map((isLit, idx) => (
                    <div
                      key={idx}
                      onClick={() => blowCandle(idx)}
                      className="cursor-pointer group flex flex-col items-center select-none"
                      title={isLit ? 'Click to blow candle' : 'Candle blown!'}
                    >
                      {/* Flame or rising smoke */}
                      <div className="h-9 flex items-center justify-center">
                        {isLit ? (
                          <div className="relative w-5 h-7 bg-gradient-to-t from-amber-500 via-orange-400 to-yellow-200 rounded-full blur-[0.4px] shadow-[0_0_16px_#f59e0b] animate-candle-flicker group-hover:scale-125 transition-transform flex items-center justify-center">
                            <div className="w-1.5 h-2.5 bg-white/95 rounded-full" />
                          </div>
                        ) : (
                          <motion.div
                            initial={{ opacity: 0.9, y: 0, scale: 0.8 }}
                            animate={{ opacity: 0, y: -24, scale: 1.4 }}
                            transition={{ duration: 1.4 }}
                            className="text-xs text-neutral-400 font-bold"
                          >
                            💨
                          </motion.div>
                        )}
                      </div>

                      {/* Wick */}
                      <div className="w-0.5 h-2 bg-neutral-800" />

                      {/* Candle Cylinder */}
                      <div
                        className={`w-3.5 h-12 rounded-t-sm bg-gradient-to-b ${
                          idx === 1
                            ? 'from-pink-300 to-pink-500'
                            : idx === 0
                            ? 'from-purple-300 to-purple-500'
                            : 'from-amber-200 to-amber-400'
                        } border border-white/40 shadow-md relative overflow-hidden`}
                      >
                        <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_3px,rgba(255,255,255,0.7)_3px,rgba(255,255,255,0.7)_6px)]" />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Cake Layers */}
                <div className="flex flex-col items-center">
                  {/* Top Frosting / Layer */}
                  <div className="w-44 h-12 rounded-t-2xl bg-gradient-to-r from-pink-300 via-rose-200 to-pink-300 border-t border-x border-white/40 shadow-inner flex items-center justify-around px-4">
                    <div className="w-2.5 h-2.5 rounded-full bg-pink-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-purple-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-pink-500/80" />
                  </div>
                  {/* Cream icing drips */}
                  <div className="w-48 h-3.5 bg-white rounded-b-md shadow-md -mt-1" />
                  {/* Bottom Tier */}
                  <div className="w-56 h-16 rounded-b-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 border-b border-x border-white/30 shadow-2xl flex items-center justify-center">
                    <span className="text-xs font-serif tracking-widest text-white/90 font-bold">
                      MAKE A WISH
                    </span>
                  </div>
                  {/* Plate */}
                  <div className="w-64 h-3 bg-gradient-to-r from-neutral-300 via-white to-neutral-300 rounded-full shadow-lg -mt-1 border border-white/40" />
                </div>
              </div>

              {/* Quick "Blow All" Action Button */}
              <button
                onClick={blowAllCandles}
                className="mt-6 inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-pink-500 hover:bg-pink-600 text-white font-medium text-sm transition-all shadow-glow-pink hover:scale-105 active:scale-95"
              >
                <Wind className="w-4 h-4" />
                <span>Blow out all candles with a breath ✨</span>
              </button>
            </>
          ) : (
            /* After blowing candles */
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="py-10 space-y-6"
            >
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-pink-500 to-amber-400 p-0.5 shadow-[0_0_40px_rgba(251,191,36,0.6)]">
                <div className="w-full h-full rounded-full bg-[#1c0e32] flex items-center justify-center text-4xl">
                  ✨
                </div>
              </div>

              <h3 className="text-3xl sm:text-4xl font-serif font-bold gradient-text-gold">
                {birthdayData.interactiveWish.postBlowText}
              </h3>

              <p className="text-base sm:text-lg text-purple-200/90 font-light max-w-sm mx-auto leading-relaxed">
                {birthdayData.interactiveWish.postBlowSubtext}
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold text-sm shadow-glow-pink hover:scale-105 transition-all"
                >
                  Continue Celebration 💖
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
