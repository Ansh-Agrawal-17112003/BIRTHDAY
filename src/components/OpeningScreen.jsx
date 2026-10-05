import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Gift, Heart } from 'lucide-react';
import { birthdayData } from '../config/birthdayData';
import { audioController } from '../utils/audioEngine';
import { triggerCelebration } from '../utils/confettiEngine';

export default function OpeningScreen({ onOpen }) {
  const [step, setStep] = useState(1);
  const [isOpening, setIsOpening] = useState(false);

  useEffect(() => {
    // Step 1: "Hey You... 💫"
    const timer1 = setTimeout(() => {
      setStep(2); // Step 2: "I have something special for you..."
    }, 1800);

    const timer2 = setTimeout(() => {
      setStep(3); // Step 3: Reveal glowing button
    }, 3600);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const handleOpenSurprise = () => {
    setIsOpening(true);

    // Start lovely background music right upon this user gesture
    audioController.play();

    // Trigger opening celebratory confetti
    setTimeout(() => {
      triggerCelebration();
    }, 400);

    setTimeout(() => {
      onOpen();
    }, 900);
  };

  return (
    <AnimatePresence>
      {!isOpening && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#07030e] text-white px-6 overflow-hidden select-none"
        >
          {/* Ambient Glowing Background Orbs */}
          <div className="absolute w-96 h-96 rounded-full bg-pink-600/15 blur-[120px] pointer-events-none -top-20 -left-20 animate-pulse-glow" />
          <div className="absolute w-96 h-96 rounded-full bg-purple-600/15 blur-[120px] pointer-events-none -bottom-20 -right-20 animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
          <div className="absolute w-64 h-64 rounded-full bg-amber-500/10 blur-[100px] pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

          {/* Floating decorative elements */}
          <div className="absolute top-1/4 left-1/5 text-pink-300/40 text-2xl animate-float-slow">✨</div>
          <div className="absolute top-1/3 right-1/4 text-purple-300/40 text-xl animate-float-medium">💫</div>
          <div className="absolute bottom-1/4 left-1/3 text-amber-200/40 text-2xl animate-float-slow" style={{ animationDelay: '2s' }}>💖</div>

          <div className="relative z-10 max-w-xl text-center flex flex-col items-center">
            {/* Gentle Glowing Icon */}
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1, type: 'spring', bounce: 0.5 }}
              className="w-16 h-16 rounded-full bg-gradient-to-tr from-pink-500/20 to-purple-500/30 border border-pink-400/30 flex items-center justify-center mb-8 shadow-glow-pink"
            >
              <Sparkles className="w-8 h-8 text-pink-300 animate-spin" style={{ animationDuration: '8s' }} />
            </motion.div>

            {/* First Line */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-dreamy-cream tracking-tight mb-4"
            >
              {birthdayData.opening.firstLine}
            </motion.h1>

            {/* Second Line */}
            {step >= 2 && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9 }}
                className="text-xl sm:text-2xl font-light text-pink-200/90 mb-10 max-w-md mx-auto"
              >
                {birthdayData.opening.secondLine}
              </motion.p>
            )}

            {/* Button */}
            {step >= 3 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, type: 'spring' }}
                className="mt-2"
              >
                <button
                  id="open-surprise-button"
                  onClick={handleOpenSurprise}
                  className="relative group px-8 py-4 rounded-full font-semibold text-lg sm:text-xl text-white overflow-hidden transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-glow-pink border border-pink-300/40"
                >
                  {/* Button gradient background with shimmer */}
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-amber-400 opacity-90 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  
                  {/* Button content */}
                  <span className="relative z-10 flex items-center gap-3 drop-shadow-md">
                    <Gift className="w-5 h-5 text-amber-200 animate-bounce" />
                    <span>{birthdayData.opening.buttonText}</span>
                    <Heart className="w-5 h-5 text-pink-200 fill-pink-300/60" />
                  </span>
                </button>

                <p className="text-xs text-purple-200/60 mt-4 tracking-wider uppercase">
                  (Turn sound on for the best experience 🎵)
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
