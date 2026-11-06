import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Disc3,
  Volume2,
  VolumeX,
  Cake,
  Award,
  Clock,
  Heart,
  Ticket,
  Mail,
  ChevronUp,
  ChevronDown,
  Sparkles,
} from 'lucide-react';

/**
 * React Bits — Floating macOS Magnification Dock + Vinyl Record Mini Player
 */
const DOCK_ITEMS = [
  { id: 'hero', label: 'Sân Khấu 19', icon: Cake },
  { id: 'achievements', label: 'Dấu Ấn 18', icon: Award },
  { id: 'love-journey', label: 'Kỷ Niệm Yêu', icon: Heart },
  { id: 'vouchers', label: '5 Vé Đặc Quyền', icon: Ticket },
  { id: 'letter', label: 'Thư & Thiệp 3D', icon: Mail },
];

export function FloatingDock({ onPlayCustomTrack }) {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 hidden md:flex items-end gap-2 px-4 py-2.5 rounded-full bg-plum-deep/90 border-2 border-gold/45 backdrop-blur-xl shadow-[0_20px_55px_rgba(0,0,0,0.75)]">
      {DOCK_ITEMS.map((item, idx) => {
        const IconComp = item.icon;
        const dist = hoveredIdx === null ? 99 : Math.abs(hoveredIdx - idx);
        const scale = dist === 0 ? 1.38 : dist === 1 ? 1.16 : 1;

        return (
          <motion.button
            key={item.id}
            type="button"
            onMouseEnter={() => setHoveredIdx(idx)}
            onMouseLeave={() => setHoveredIdx(null)}
            onClick={() => scrollToSection(item.id)}
            animate={{ scale, y: dist === 0 ? -6 : dist === 1 ? -2 : 0 }}
            transition={{ type: 'spring', stiffness: 340, damping: 20 }}
            className="group relative flex flex-col items-center justify-center px-3 py-2 rounded-full bg-white/5 hover:bg-gold hover:text-plum-deep text-cream border border-cream/15 transition-colors cursor-pointer"
          >
            <IconComp className="w-4 h-4" />
            <span className="mt-0.5 text-[10px] font-display font-bold uppercase tracking-wider whitespace-nowrap">
              {item.label}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}

export function VinylMusicPlayer({ musicMuted, onToggleMute }) {
  const [expanded, setExpanded] = useState(false);
  const [playingVoiceTrack, setPlayingVoiceTrack] = useState(null);
  const voiceAudioRef = useRef(null);

  const VOICE_TRACKS = [
    {
      id: 'cake-intro',
      title: 'Lời Chúc Thổi Bánh Kem 3D',
      src: '/audio/tts/cake-intro.mp3',
    },
    {
      id: 'love-letter',
      title: 'Lá Thư Tay Anh Trung Gửi Hân',
      src: '/audio/tts/love-letter.mp3',
    },
    {
      id: 'flip-card',
      title: 'Lời Chúc Thiệp 3D Tuổi 19',
      src: '/audio/tts/flip-card.mp3',
    },
  ];

  const handlePlayVoice = (track) => {
    if (voiceAudioRef.current) {
      voiceAudioRef.current.pause();
    }
    if (playingVoiceTrack === track.id) {
      setPlayingVoiceTrack(null);
      return;
    }
    const audio = new Audio(track.src);
    audio.volume = 1.0;
    voiceAudioRef.current = audio;
    setPlayingVoiceTrack(track.id);
    audio.onended = () => setPlayingVoiceTrack(null);
    audio.play().catch(() => setPlayingVoiceTrack(null));
  };

  return (
    <div className="fixed bottom-4 left-4 z-50 flex flex-col items-start">
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.95 }}
            className="mb-2.5 w-72 rounded-3xl bg-plum-deep/95 border-2 border-gold/50 p-4 backdrop-blur-xl shadow-[0_24px_60px_rgba(0,0,0,0.8)] text-cream"
          >
            <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-cream/10">
              <span className="text-[11px] font-display font-bold uppercase tracking-[0.18em] text-gold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-rose" />
                <span>HỘP NHẠC ĐĨA THAN TUỔI 19</span>
              </span>
              <button
                type="button"
                onClick={onToggleMute}
                className="px-2.5 py-1 rounded-full bg-gold/20 text-gold text-[10px] font-display font-bold uppercase tracking-wider cursor-pointer"
              >
                {musicMuted ? 'Bật Nhạc Nền' : 'Tắt Nhạc Nền'}
              </button>
            </div>

            <div className="space-y-1.5">
              <p className="text-[10px] font-display font-bold uppercase tracking-wider text-cream/60">
                Chọn Nghe Nhanh Giọng Đọc Kỷ Niệm:
              </p>
              {VOICE_TRACKS.map((t) => {
                const isPlaying = playingVoiceTrack === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => handlePlayVoice(t)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium flex items-center justify-between transition-colors cursor-pointer ${
                      isPlaying
                        ? 'bg-gold text-plum-deep font-bold'
                        : 'bg-white/5 hover:bg-white/15 text-cream/85'
                    }`}
                  >
                    <span className="truncate">{t.title}</span>
                    <span className="text-[10px] font-display uppercase tracking-wider shrink-0 ml-2">
                      {isPlaying ? 'Đang phát' : 'Phát'}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Spinning Vinyl Pill */}
      <div className="flex items-center gap-2 p-1.5 pr-3.5 rounded-full bg-plum-deep/95 border-2 border-gold/55 shadow-[0_16px_40px_rgba(0,0,0,0.7)] backdrop-blur-xl">
        {/* Spinning Vinyl Disc */}
        <button
          type="button"
          onClick={onToggleMute}
          title={musicMuted ? 'Bật nhạc sinh nhật' : 'Tạm dừng nhạc nền'}
          className={`relative w-11 h-11 rounded-full bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-950 border-2 border-gold flex items-center justify-center cursor-pointer ${
            !musicMuted ? 'animate-spin-slow' : ''
          }`}
        >
          <div className="w-4 h-4 rounded-full bg-rose border border-gold flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-plum-deep" />
          </div>
        </button>

        <div
          onClick={() => setExpanded((e) => !e)}
          className="cursor-pointer select-none"
        >
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-display font-bold uppercase tracking-[0.16em] text-gold">
              VINYL 19 • BẢO HÂN
            </span>
            {!musicMuted ? (
              <Volume2 className="w-3.5 h-3.5 text-rose animate-pulse" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 text-cream/50" />
            )}
          </div>
          <div className="text-xs font-bold text-cream flex items-center gap-1">
            <span>{musicMuted ? 'Nhạc đang tắt' : 'Giai Điệu Tuổi 19'}</span>
            {expanded ? (
              <ChevronDown className="w-3.5 h-3.5 text-gold" />
            ) : (
              <ChevronUp className="w-3.5 h-3.5 text-gold" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
