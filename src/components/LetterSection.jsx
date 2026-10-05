import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Send } from 'lucide-react';
import { birthdayData } from '../config/birthdayData';

export default function LetterSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.35,
      },
    },
  };

  const lineVariants = {
    hidden: { opacity: 0, y: 16, filter: 'blur(4px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <section className="relative py-24 px-4 sm:px-6 max-w-4xl mx-auto">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-96 bg-purple-900/20 rounded-full blur-[120px] pointer-events-none" />

      {/* Decorative floating wax seal / heart badge */}
      <motion.div
        initial={{ scale: 0, rotate: -15 }}
        whileInView={{ scale: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex justify-center mb-6"
      >
        <div className="px-5 py-2 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-400/30 backdrop-blur-md flex items-center gap-2 text-pink-300 shadow-glow-pink">
          <Heart className="w-4 h-4 fill-pink-400 text-pink-400" />
          <span className="text-xs uppercase tracking-widest font-semibold">{birthdayData.letter.sectionTitle}</span>
          <Sparkles className="w-4 h-4 text-amber-300" />
        </div>
      </motion.div>

      {/* Glassmorphism Letter Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative rounded-3xl p-8 sm:p-12 md:p-16 border border-pink-500/20 bg-gradient-to-b from-[#1c0e30]/80 via-[#170a27]/85 to-[#120621]/95 backdrop-blur-2xl shadow-[0_20px_60px_-15px_rgba(244,114,182,0.15)] overflow-hidden"
      >
        {/* Soft decorative inner borders & corner sparkles */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-pink-400 to-transparent opacity-60" />
        <div className="absolute top-6 right-6 text-pink-400/20 text-4xl font-serif select-none pointer-events-none">❝</div>

        {/* Lead Quote */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-6 text-left"
        >
          <motion.p
            variants={lineVariants}
            className="text-xl sm:text-2xl md:text-3xl font-serif italic text-amber-100/95 leading-relaxed pb-4 border-b border-white/10"
          >
            "{birthdayData.letter.headerQuote}"
          </motion.p>

          {/* Letter Body Paragraphs with line-by-line reveal */}
          {birthdayData.letter.paragraphs.map((paragraph, index) => (
            <motion.p
              key={index}
              variants={lineVariants}
              className="text-base sm:text-lg md:text-xl text-purple-100/90 leading-relaxed font-light"
            >
              {paragraph}
            </motion.p>
          ))}

          {/* Golden Concluding Quote */}
          <motion.div
            variants={lineVariants}
            className="pt-6 pb-2"
          >
            <div className="p-5 rounded-2xl bg-gradient-to-r from-pink-500/15 via-purple-500/10 to-amber-500/15 border border-pink-400/30 text-center sm:text-left">
              <p className="text-lg sm:text-2xl font-serif font-semibold gradient-text-gold tracking-wide">
                {birthdayData.letter.closingQuote}
              </p>
            </div>
          </motion.div>

          {/* Signoff */}
          <motion.div
            variants={lineVariants}
            className="pt-4 flex flex-col sm:flex-row sm:justify-between items-start sm:items-end border-t border-white/10 gap-2"
          >
            <div>
              <p className="text-xs uppercase tracking-wider text-pink-300/70 font-semibold">
                {birthdayData.letter.senderSignature}
              </p>
              <p className="text-xl sm:text-2xl font-script text-pink-200 mt-1">
                {birthdayData.letter.senderName}
              </p>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-purple-200/60">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>Dedicated with love</span>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
