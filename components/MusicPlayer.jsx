import React, { useEffect, useState } from 'react';
import { Volume2, VolumeX, Music, Disc } from 'lucide-react';
import { audioController } from '../utils/audioEngine';
import { birthdayData } from '../config/birthdayData';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [mode, setMode] = useState('idle');

  useEffect(() => {
    const unsubscribe = audioController.subscribe((state) => {
      setIsPlaying(state.isPlaying);
      setMode(state.mode);
    });
    return unsubscribe;
  }, []);

  const togglePlay = () => {
    audioController.toggle();
  };

  return (
    <div className="fixed top-5 right-5 z-50 flex items-center gap-2">
      <button
        onClick={togglePlay}
        id="music-toggle-button"
        title={isPlaying ? 'Pause Music' : 'Play Birthday Music'}
        className={`group flex items-center gap-2.5 px-4 py-2.5 rounded-full border transition-all duration-300 backdrop-blur-md ${
          isPlaying
            ? 'bg-purple-950/70 border-pink-500/40 shadow-glow-pink text-pink-200'
            : 'bg-black/40 border-white/10 hover:border-pink-400/40 text-neutral-300'
        }`}
        aria-label="Toggle birthday music"
      >
        <div className="relative flex items-center justify-center">
          <Disc
            className={`w-4 h-4 transition-transform duration-1000 ${
              isPlaying ? 'animate-spin text-pink-400' : 'text-neutral-400'
            }`}
          />
        </div>

        {/* Dynamic Visualizer Bars */}
        <div className="flex items-end gap-[3px] h-3.5 px-0.5">
          {[
            { delay: '0s', activeH: 'h-3.5' },
            { delay: '0.15s', activeH: 'h-2' },
            { delay: '0.3s', activeH: 'h-3' },
            { delay: '0.45s', activeH: 'h-1.5' },
          ].map((bar, idx) => (
            <span
              key={idx}
              className={`w-[2.5px] rounded-full transition-all duration-200 ${
                isPlaying
                  ? 'bg-gradient-to-t from-pink-500 to-amber-300 animate-pulse'
                  : 'bg-neutral-500 h-1'
              } ${isPlaying ? bar.activeH : ''}`}
              style={{
                animationDelay: bar.delay,
                animationDuration: '0.8s',
              }}
            />
          ))}
        </div>

        <span className="text-xs font-medium tracking-wide">
          {isPlaying ? 'Playing Melody' : 'Music Paused'}
        </span>

        {isPlaying ? (
          <Volume2 className="w-3.5 h-3.5 text-pink-300 animate-pulse" />
        ) : (
          <VolumeX className="w-3.5 h-3.5 text-neutral-400" />
        )}
      </button>
    </div>
  );
}
