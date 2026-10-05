import React, { useState, useEffect } from 'react';
import ParticleBackground from './components/ParticleBackground';
import MusicPlayer from './components/MusicPlayer';
import OpeningScreen from './components/OpeningScreen';
import HeroSection from './components/HeroSection';
import LetterSection from './components/LetterSection';
import MemoryGallery from './components/MemoryGallery';
import WishesSection from './components/WishesSection';
import InteractiveCakeModal from './components/InteractiveCakeModal';
import FinalSurprise from './components/FinalSurprise';
import { Sparkles, Cake } from 'lucide-react';
import { birthdayData } from './config/birthdayData';
import { audioController } from './utils/audioEngine';

export default function App() {
  const [hasOpened, setHasOpened] = useState(false);
  const [isWishModalOpen, setIsWishModalOpen] = useState(false);

  // Initialize audio engine on mount
  useEffect(() => {
    audioController.init(birthdayData.music.src);
  }, []);

  const handleOpenExperience = () => {
    setHasOpened(true);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleReplay = () => {
    audioController.pause();
    setHasOpened(false);
    setIsWishModalOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-[#090412] text-[#fbf9f5] selection:bg-pink-500 selection:text-white overflow-x-hidden">
      {/* Background Starry & Fairy Dust Canvas */}
      <ParticleBackground />

      {/* Floating Audio Controller */}
      <MusicPlayer />

      {/* Opening Surprise Screen */}
      {!hasOpened && <OpeningScreen onOpen={handleOpenExperience} />}

      {/* Main Birthday Journey */}
      {hasOpened && (
        <main className="relative z-10 transition-opacity duration-1000">
          {/* Section 1: Hero Celebration */}
          <HeroSection onMakeWishClick={() => setIsWishModalOpen(true)} />

          {/* Section 2: Heartfelt Letter */}
          <LetterSection />

          {/* Section 3: Our Memories Polaroid Gallery */}
          <MemoryGallery />

          {/* Section 4: Birthday Wishes */}
          <WishesSection />

          {/* Section 5: Interactive Wish Callout Banner */}
          <section className="relative py-20 px-4 text-center">
            <div className="max-w-2xl mx-auto p-10 rounded-3xl bg-gradient-to-r from-pink-500/15 via-purple-500/20 to-amber-500/15 border border-pink-400/30 backdrop-blur-xl shadow-glow-pink">
              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-pink-400 to-amber-300 p-0.5 shadow-md flex items-center justify-center">
                <Cake className="w-8 h-8 text-[#090412]" />
              </div>
              <h3 className="text-3xl sm:text-4xl font-serif font-bold text-dreamy-cream mb-3">
                Ready to Blow Your Candles? 🎂
              </h3>
              <p className="text-purple-200/80 text-base mb-6 font-light max-w-md mx-auto">
                No birthday celebration is complete without blowing out the candles and making a secret wish!
              </p>
              <button
                id="make-a-wish-button"
                onClick={() => setIsWishModalOpen(true)}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-amber-400 text-white font-semibold text-lg shadow-glow-pink hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-2.5"
              >
                <Sparkles className="w-5 h-5 text-amber-100" />
                <span>{birthdayData.interactiveWish.buttonLabel}</span>
              </button>
            </div>
          </section>

          {/* Section 6: Final Surprise */}
          <FinalSurprise onReplay={handleReplay} />

          {/* Interactive Wish Cake Modal */}
          <InteractiveCakeModal
            isOpen={isWishModalOpen}
            onClose={() => setIsWishModalOpen(false)}
          />
        </main>
      )}
    </div>
  );
}
