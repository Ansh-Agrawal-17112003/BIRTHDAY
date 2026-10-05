import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, X, Heart, Sparkles, ZoomIn } from 'lucide-react';
import { birthdayData } from '../config/birthdayData';

function PolaroidCard({ memory, index, onSelect }) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    setRotateX(((y - centerY) / centerY) * -10);
    setRotateY(((x - centerX) / centerX) * 10);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      className="relative cursor-pointer select-none group perspective-1000"
      onClick={() => onSelect(memory)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `rotate(${memory.rotation || '0deg'})`,
      }}
    >
      {/* Decorative Washi Tape Accent */}
      <div className={`polaroid-tape ${memory.tapeColor || 'bg-pink-300/50'} z-20`} />

      {/* 3D Tilting Card Container */}
      <div
        className="relative bg-[#fbf9f5] text-neutral-800 p-4 pb-6 rounded-sm shadow-xl transition-all duration-300 transform group-hover:scale-105 group-hover:shadow-[0_25px_50px_-12px_rgba(244,114,182,0.35)]"
        style={{
          transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Photo Container */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-200 rounded-xs shadow-inner">
          <img
            src={memory.image}
            alt={memory.caption}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />

          {/* Subtle warm overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-3 text-white">
            <span className="text-xs flex items-center gap-1 bg-black/40 px-2 py-1 rounded backdrop-blur-xs">
              <ZoomIn className="w-3.5 h-3.5 text-pink-300" /> Click to view
            </span>
            <Heart className="w-4 h-4 text-pink-400 fill-pink-400 animate-pulse" />
          </div>
        </div>

        {/* Polaroid Handwritten Caption */}
        <div className="mt-4 text-center">
          <h3 className="font-hand text-2xl font-bold text-neutral-800 group-hover:text-pink-600 transition-colors">
            {memory.caption}
          </h3>
          <p className="text-xs text-neutral-500 font-sans mt-0.5 line-clamp-1 italic">
            {memory.note}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function MemoryGallery() {
  const [activeMemory, setActiveMemory] = useState(null);

  return (
    <section className="relative py-24 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/15 border border-purple-400/30 text-purple-300 text-xs font-semibold tracking-widest uppercase mb-4 backdrop-blur-sm">
          <Camera className="w-4 h-4 text-pink-400" />
          <span>Our Journey Together</span>
        </div>
        <h2 className="text-4xl sm:text-5xl font-serif font-bold text-dreamy-cream mb-4">
          Moments We'll Never Forget 📸
        </h2>
        <p className="text-purple-200/70 text-base sm:text-lg font-light">
          Every photo holds a story, an inside joke, and a piece of why you mean the absolute world to me.
        </p>
      </div>

      {/* Grid of Polaroid Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6 pt-4">
        {birthdayData.memories.map((memory, index) => (
          <PolaroidCard
            key={memory.id}
            memory={memory}
            index={index}
            onSelect={(item) => setActiveMemory(item)}
          />
        ))}
      </div>

      {/* Lightbox / Modal for Enlarged View */}
      <AnimatePresence>
        {activeMemory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="relative max-w-xl w-full bg-[#fcf9f5] text-neutral-800 rounded-xl p-6 sm:p-8 shadow-2xl overflow-hidden border border-pink-300/40"
            >
              <button
                onClick={() => setActiveMemory(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/10 hover:bg-black/20 text-neutral-700 transition-colors z-10"
                aria-label="Close photo modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="rounded-lg overflow-hidden max-h-[55vh] shadow-md bg-neutral-100">
                <img
                  src={activeMemory.image}
                  alt={activeMemory.caption}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="mt-6 text-center">
                <h4 className="font-hand text-3xl font-bold text-pink-600">
                  {activeMemory.caption}
                </h4>
                <p className="mt-2 text-neutral-600 text-base leading-relaxed font-sans max-w-md mx-auto">
                  {activeMemory.note}
                </p>
                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-pink-400 font-semibold tracking-wider uppercase">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Cherished Memory</span>
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
