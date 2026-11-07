import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Pause,
  Rewind,
  FastForward,
  X,
  Disc,
  Mail,
  ExternalLink,
  Volume2,
  Sparkles,
} from 'lucide-react';
import { useVoice } from '../../context/VoiceContext';

function formatTime(sec) {
  if (!sec || Number.isNaN(sec) || !Number.isFinite(sec)) return '00:00';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export default function FloatingVoiceBar() {
  const { activeVoice, togglePlay, seekBy, seekTo, stopVoice } = useVoice();

  if (!activeVoice.active) return null;

  const progress =
    activeVoice.duration > 0
      ? Math.min(1, activeVoice.currentTime / activeVoice.duration)
      : 0;

  const handleScrub = (e) => {
    if (!activeVoice.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.min(
      1,
      Math.max(0, (e.clientX - rect.left) / rect.width)
    );
    seekTo(ratio * activeVoice.duration);
  };

  const scrollToSource = () => {
    const targetId = activeVoice.source === 'letter' ? 'letter' : 'cassette';
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const isLetter = activeVoice.source === 'letter';

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.92 }}
        transition={{ type: 'spring', stiffness: 320, damping: 26 }}
        className="fixed bottom-4 right-4 z-50 w-[92vw] max-w-[420px] rounded-[24px] bg-[#1a0c30]/95 border-2 border-gold/70 p-3 sm:p-3.5 shadow-[0_20px_60px_rgba(0,0,0,0.85)] backdrop-blur-2xl text-cream select-none"
      >
        {/* Top Header: Badge + Title + Close Button */}
        <div className="flex items-center justify-between gap-2 mb-2 pb-1.5 border-b border-cream/10">
          <div className="flex items-center gap-2 min-w-0">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gold/20 text-gold border border-gold/40 text-[10px] font-display font-black uppercase tracking-wider shrink-0">
              {isLetter ? (
                <>
                  <Mail className="w-3 h-3 text-rose" />
                  <span>GIỌNG ĐỌC THƯ TAY</span>
                </>
              ) : (
                <>
                  <Disc className="w-3 h-3 text-gold animate-spin" />
                  <span>BĂNG CASSETTE ({activeVoice.side || 'SIDE A'})</span>
                </>
              )}
            </span>
            <span className="text-[11px] font-bold text-cream truncate">
              {activeVoice.title}
            </span>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              onClick={scrollToSource}
              className="p-1 rounded-full text-cream/70 hover:text-gold hover:bg-white/10 transition-colors cursor-pointer"
              title={isLetter ? 'Cuộn tới Lá Thư Tay' : 'Cuộn tới Cuốn Băng Cassette'}
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={stopVoice}
              className="p-1 rounded-full text-cream/70 hover:text-rose hover:bg-white/10 transition-colors cursor-pointer"
              title="Đóng thanh phát âm thanh"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Center: Waveform + Controls */}
        <div className="flex items-center justify-between gap-3">
          {/* Animated mini sound wave */}
          <div className="flex items-end gap-1 h-6 shrink-0 px-1">
            {[0.5, 0.9, 0.6, 1, 0.7, 0.85, 0.4].map((h, i) => (
              <motion.span
                key={i}
                animate={
                  activeVoice.isPlaying
                    ? {
                        height: [
                          `${Math.round(h * 6)}px`,
                          `${Math.round(h * 22)}px`,
                          `${Math.round(h * 8)}px`,
                        ],
                      }
                    : { height: '4px' }
                }
                transition={{
                  duration: 0.5 + (i % 3) * 0.15,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="w-1 rounded-full bg-gradient-to-t from-gold to-rose block"
              />
            ))}
          </div>

          {/* Time Display */}
          <div className="font-mono text-[11px] text-cream/80 tracking-wider shrink-0">
            <span className="text-gold font-bold">
              {formatTime(activeVoice.currentTime)}
            </span>
            <span className="opacity-40 mx-1">/</span>
            <span>{formatTime(activeVoice.duration)}</span>
          </div>

          {/* Playback Button Controls */}
          <div className="flex items-center gap-1.5 shrink-0 ml-auto">
            <button
              type="button"
              onClick={() => seekBy(-10)}
              className="p-1.5 rounded-full bg-white/5 hover:bg-gold hover:text-plum-deep text-cream border border-cream/15 transition-colors cursor-pointer"
              title="Tua lùi 10 giây"
            >
              <Rewind className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={togglePlay}
              className="p-2 rounded-full bg-gold text-plum-deep hover:bg-cream transition-all shadow-[0_0_18px_rgba(252,188,91,0.5)] cursor-pointer"
              title={activeVoice.isPlaying ? 'Tạm dừng' : 'Phát tiếp'}
            >
              {activeVoice.isPlaying ? (
                <Pause className="w-4 h-4 fill-plum-deep" />
              ) : (
                <Play className="w-4 h-4 fill-plum-deep ml-0.5" />
              )}
            </button>

            <button
              type="button"
              onClick={() => seekBy(10)}
              className="p-1.5 rounded-full bg-white/5 hover:bg-gold hover:text-plum-deep text-cream border border-cream/15 transition-colors cursor-pointer"
              title="Tua tới 10 giây"
            >
              <FastForward className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bottom: Interactive Scrub Bar */}
        <div
          onClick={handleScrub}
          className="mt-2.5 w-full h-2 rounded-full bg-black/50 border border-gold/30 overflow-hidden cursor-pointer p-0.5 relative group"
          title="Chạm để tua nhanh"
        >
          <div
            className="h-full rounded-full bg-gradient-to-r from-gold via-rose to-gold transition-all duration-100"
            style={{ width: `${Math.max(3, progress * 100)}%` }}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
