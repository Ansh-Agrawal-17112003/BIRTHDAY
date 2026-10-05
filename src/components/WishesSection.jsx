import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Stars } from 'lucide-react';
import { birthdayData } from '../config/birthdayData';

export default function WishesSection() {
  return (
    <section className="relative py-24 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-80 h-80 bg-pink-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <div className="text-center max-w-xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 text-xs font-semibold tracking-widest uppercase mb-4 backdrop-blur-sm"
        >
          <Stars className="w-4 h-4 text-amber-300" />
          <span>Starry Blessings</span>
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl font-serif font-bold text-dreamy-cream mb-4"
        >
          A Few Wishes For You... ✨
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-purple-200/75 text-base sm:text-lg font-light"
        >
          Sent into the cosmos with love, hoping each one lights your path in the year ahead.
        </motion.p>
      </div>

      {/* Wishes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {birthdayData.wishes.map((wish, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: index * 0.12 }}
            whileHover={{ y: -6, scale: 1.01 }}
            className="relative group p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-[#1e0f33]/60 via-[#180a29]/70 to-[#120621]/90 border border-pink-500/20 hover:border-pink-400/50 backdrop-blur-xl shadow-lg hover:shadow-glow-pink transition-all duration-300 overflow-hidden"
          >
            {/* Subtle card glow accent */}
            <div className="absolute top-0 right-0 w-28 h-28 bg-pink-500/10 rounded-full blur-2xl group-hover:bg-pink-500/20 transition-all pointer-events-none" />

            <div className="relative z-10 flex items-start gap-4">
              {/* Floating Emoji Icon */}
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500/20 to-purple-500/30 border border-pink-400/30 flex items-center justify-center text-2xl shadow-inner shrink-0 group-hover:scale-110 transition-transform">
                {wish.icon}
              </div>

              {/* Wish Text Content */}
              <div className="space-y-1.5 flex-1">
                <h3 className="text-lg sm:text-xl font-serif font-semibold text-pink-100 group-hover:text-amber-200 transition-colors">
                  {wish.highlight}
                </h3>
                <p className="text-sm sm:text-base text-purple-200/75 font-light leading-relaxed">
                  {wish.detail}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
