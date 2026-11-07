import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Play,
  Pause,
  Rewind,
  FastForward,
  RotateCcw,
  Sparkles,
  Music,
  Radio,
} from 'lucide-react';
import { FlyingButton } from './HoloCard';
import { CASSETTE_TRACKS, useVoice } from '../../context/VoiceContext';

function formatTime(sec) {
  if (!sec || Number.isNaN(sec) || !Number.isFinite(sec)) return '00:00';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function CassetteSpool({ isPlaying, tapeRadius = 38 }) {
  return (
    <div className="relative w-16 h-16 sm:w-24 sm:h-24 flex items-center justify-center shrink-0">
      {/* Dynamic magnetic tape reel diameter */}
      <div
        style={{
          width: `${tapeRadius * 2}px`,
          height: `${tapeRadius * 2}px`,
        }}
        className="absolute rounded-full bg-gradient-to-br from-[#2a1810] via-[#1a0f0a] to-[#0d0705] border border-amber-700/40 shadow-inner transition-all duration-300 max-w-full max-h-full"
      />

      {/* Rotating toothed hub */}
      <div
        className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-[#fff5e4] via-[#fcbc5b] to-[#b87b1e] border-2 border-plum-deep shadow-[0_0_20px_rgba(252,188,91,0.45)] flex items-center justify-center ${
          isPlaying ? 'animate-spin' : ''
        }`}
        style={{ animationDuration: '2.8s' }}
      >
        {/* 6 Spool Teeth */}
        {[0, 60, 120, 180, 240, 300].map((deg) => (
          <span
            key={deg}
            style={{ transform: `rotate(${deg}deg)` }}
            className="absolute inset-1 flex justify-center"
          >
            <span className="w-1.5 h-2.5 bg-plum-deep rounded-sm" />
          </span>
        ))}
        {/* Center spindle hole */}
        <div className="w-6 h-6 rounded-full bg-plum-deep border-2 border-gold/80 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-gold/90" />
        </div>
      </div>
    </div>
  );
}

export default function CassetteVoicePlayer() {
  const {
    activeVoice,
    playTrack,
    togglePlay: globalTogglePlay,
    seekBy: globalSeekBy,
    seekTo: globalSeekTo,
  } = useVoice();
  const [selectedIdx, setSelectedIdx] = useState(0);

  const isCurrentCassette =
    activeVoice.active && activeVoice.source === 'cassette';
  const isPlaying = isCurrentCassette && activeVoice.isPlaying;
  const activeTrackIdx = isCurrentCassette ? activeVoice.trackIdx : selectedIdx;
  const currentTrack = CASSETTE_TRACKS[activeTrackIdx] || CASSETTE_TRACKS[0];

  const currentTime = isCurrentCassette ? activeVoice.currentTime : 0;
  const duration = isCurrentCassette
    ? activeVoice.duration
    : activeTrackIdx === 0
    ? 85
    : 35;

  const togglePlay = () => {
    if (isCurrentCassette) {
      globalTogglePlay();
    } else {
      const track = CASSETTE_TRACKS[selectedIdx];
      playTrack({
        source: 'cassette',
        trackId: track.id,
        title: track.title,
        subtitle: track.subtitle,
        side: track.side,
        primarySrc: track.primarySrc,
        fallbackSrc: track.fallbackSrc,
        trackIdx: selectedIdx,
      });
    }
  };

  const handleSelectTrack = (idx) => {
    setSelectedIdx(idx);
    const track = CASSETTE_TRACKS[idx];
    playTrack({
      source: 'cassette',
      trackId: track.id,
      title: track.title,
      subtitle: track.subtitle,
      side: track.side,
      primarySrc: track.primarySrc,
      fallbackSrc: track.fallbackSrc,
      trackIdx: idx,
    });
  };

  const seekBy = (deltaSec) => {
    if (isCurrentCassette) {
      globalSeekBy(deltaSec);
    }
  };

  const restartTrack = () => {
    if (isCurrentCassette) {
      globalSeekTo(0);
      if (!isPlaying) globalTogglePlay();
    } else {
      togglePlay();
    }
  };

  const handleScrub = (e) => {
    if (!duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.min(
      1,
      Math.max(0, (e.clientX - rect.left) / rect.width)
    );
    const nextTime = ratio * duration;
    if (isCurrentCassette) {
      globalSeekTo(nextTime);
    }
  };

  const progressRatio = duration > 0 ? Math.min(1, currentTime / duration) : 0;
  // Left spool shrinks from 45px to 29px while Right spool grows from 29px to 45px as tape plays!
  const leftRadius = Math.round(45 - progressRatio * 16);
  const rightRadius = Math.round(29 + progressRatio * 16);

  return (
    <>
      <section
        id="cassette"
        className="relative z-20 pt-2 pb-12 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-5xl mx-auto">
          <div className="rounded-[34px] bg-gradient-to-b from-[#2A154B]/95 via-[#1C0D36]/95 to-plum-deep/95 border-2 border-gold/60 p-5 sm:p-8 shadow-[0_28px_85px_rgba(0,0,0,0.75)] backdrop-blur-xl">
            {/* Header Strip */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-6 border-b border-gold/25">
              <div>
                <div className="inline-flex items-center gap-2 text-gold font-display font-bold uppercase tracking-[0.22em] text-xs mb-1.5">
                  <Radio className="w-4 h-4 text-rose animate-pulse" />
                  <span>
                    CUỐN BĂNG CASSETTE KỶ NIỆM // GIỌNG ĐỌC CỦA ANH TRUNG TRÊN NỀN
                    NHẠC
                  </span>
                </div>
                <h2 className="font-display font-black uppercase text-2xl sm:text-4xl text-cream tracking-tight">
                  BẤM CUỐN BĂNG{' '}
                  <span className="text-gold font-serif italic font-normal capitalize">
                    & Lướt Xem Trọn Vẹn Tuổi 19
                  </span>
                </h2>
              </div>

              <div className="flex items-center gap-2 self-start md:self-auto">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/15 border border-gold/40 text-gold text-xs font-display font-bold uppercase tracking-wider">
                  <Music className="w-3.5 h-3.5 text-rose" />
                  <span>Phát Song Song Cùng Nhạc Nền</span>
                </span>
              </div>
            </div>

            {/* Main Physical Cassette Tape Shell + Track Deck */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-center">
              {/* Left 7 Cols: Interactive Physical Retro-Luxury Cassette Tape */}
              <div className="lg:col-span-7">
                <div
                  onClick={togglePlay}
                  data-cursor-label={isPlaying ? 'TẠM DỪNG BĂNG' : 'BẤM PHÁT BĂNG'}
                  className="group relative mx-auto max-w-[540px] rounded-[26px] bg-gradient-to-b from-[#3b1d5e] via-[#24103d] to-[#150826] border-2 border-gold/75 p-4 sm:p-5 shadow-[0_22px_60px_rgba(0,0,0,0.85)] cursor-pointer select-none transition-transform duration-300 hover:scale-[1.01]"
                >
                  {/* 4 Corner Metallic Cassette Screws */}
                  {[
                    'top-2.5 left-2.5',
                    'top-2.5 right-2.5',
                    'bottom-2.5 left-2.5',
                    'bottom-2.5 right-2.5',
                  ].map((pos, idx) => (
                    <span
                      key={idx}
                      aria-hidden="true"
                      className={`absolute ${pos} w-3 h-3 rounded-full bg-gradient-to-br from-gold via-amber-600 to-plum-deep border border-plum-deep shadow-inner flex items-center justify-center`}
                    >
                      <span className="w-1.5 h-[1px] bg-plum-deep rotate-45 block" />
                    </span>
                  ))}

                  {/* Cassette Top Cream Paper Label */}
                  <div className="rounded-t-[18px] rounded-b-[10px] bg-cream text-plum-deep p-3.5 sm:p-4 border-2 border-gold/60 shadow-md">
                    <div className="flex items-center justify-between gap-2 border-b-2 border-plum-deep/15 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-plum-deep text-gold font-display font-black text-[10px] uppercase tracking-widest">
                          {currentTrack.side}
                        </span>
                        <span className="text-[11px] font-display font-bold uppercase tracking-[0.16em] text-plum-deep/75">
                          C-90 HI-FI STEREO • 08.11.2026
                        </span>
                      </div>
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-display font-bold uppercase tracking-widest text-rose bg-plum-deep px-2.5 py-0.5 rounded-full">
                        <span
                          className={`w-1.5 h-1.5 rounded-full bg-rose ${
                            isPlaying ? 'animate-ping' : ''
                          }`}
                        />
                        <span>{isPlaying ? 'REC / PLAYING' : 'READY TO PLAY'}</span>
                      </span>
                    </div>

                    {/* Handwritten Cassette Title */}
                    <div className="mt-2 text-center">
                      <p className="font-script text-2xl sm:text-3xl font-bold text-plum-deep leading-tight">
                        Gửi Bảo Hân Tuổi 19 Của Anh Trung
                      </p>
                      <p className="text-[11px] font-display font-bold uppercase tracking-[0.14em] text-plum-deep/70 mt-0.5 truncate">
                        {currentTrack.title}
                      </p>
                    </div>

                    {/* Retro Stripes */}
                    <div className="mt-2.5 h-2 w-full rounded-full overflow-hidden flex">
                      <span className="flex-1 bg-plum-deep" />
                      <span className="flex-1 bg-gold" />
                      <span className="flex-1 bg-rose" />
                    </div>
                  </div>

                  {/* Cassette Center Transparent Smoked Window with 2 Spinning Spools */}
                  <div className="my-3 mx-2 sm:mx-4 rounded-2xl bg-[#0c0617]/95 border-2 border-gold/45 px-4 py-3 flex items-center justify-between relative overflow-hidden shadow-inner">
                    {/* Magnetic Tape Ribbon connecting Left & Right Spools */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-x-12 top-1/2 -translate-y-1/2 h-10 border-y border-amber-500/20 bg-gradient-to-r from-transparent via-gold/5 to-transparent pointer-events-none"
                    />

                    {/* Left Spool */}
                    <CassetteSpool isPlaying={isPlaying} tapeRadius={leftRadius} />

                    {/* Center Window Equalizer & Time Counter */}
                    <div className="relative z-10 flex flex-col items-center justify-center px-2 text-center">
                      <div className="px-2.5 py-1 rounded-md bg-black/80 border border-gold/35 font-mono text-xs text-gold font-bold tracking-wider shadow">
                        {formatTime(currentTime)} / {formatTime(duration || 78)}
                      </div>

                      {/* Animated Voice Waveform Bars */}
                      <div className="flex items-end justify-center gap-1 h-7 mt-2">
                        {[0.4, 0.85, 0.6, 1, 0.7, 0.9, 0.5, 0.8, 0.45].map(
                          (h, i) => (
                            <motion.span
                              key={i}
                              animate={
                                isPlaying
                                  ? {
                                      height: [
                                        `${Math.round(h * 10)}px`,
                                        `${Math.round(h * 26)}px`,
                                        `${Math.round(h * 12)}px`,
                                      ],
                                    }
                                  : { height: '6px' }
                              }
                              transition={{
                                duration: 0.55 + (i % 3) * 0.15,
                                repeat: Infinity,
                                ease: 'easeInOut',
                              }}
                              className="w-1 rounded-full bg-gradient-to-t from-gold to-rose block"
                            />
                          )
                        )}
                      </div>

                      <span className="text-[9px] font-display font-bold uppercase tracking-[0.2em] text-cream/60 mt-1">
                        {isPlaying ? 'ĐANG CHẠY BĂNG...' : 'CHẠM ĐỂ CHẠY BĂNG'}
                      </span>
                    </div>

                    {/* Right Spool */}
                    <CassetteSpool
                      isPlaying={isPlaying}
                      tapeRadius={rightRadius}
                    />
                  </div>

                  {/* Cassette Bottom Trapezoid Magnetic Head Guard */}
                  <div className="mx-6 sm:mx-10 pt-2 pb-1 px-4 rounded-t-2xl bg-gradient-to-b from-[#2c154a] to-[#170a29] border-t-2 border-x-2 border-gold/40 flex items-center justify-between text-[10px] font-display font-bold uppercase tracking-[0.2em] text-gold/80">
                    <span>STEREO BIAS NORMAL</span>
                    <span className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-plum-deep border border-gold/50 inline-block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-plum-deep border border-gold/50 inline-block" />
                    </span>
                    <span>DOLBY NR • ANH TRUNG</span>
                  </div>
                </div>
              </div>

              {/* Right 5 Cols: Tactile Deck Controls, Seek Bar & Side Selector */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-5">
                <div className="space-y-2">
                  <span className="text-xs font-display font-bold uppercase tracking-[0.2em] text-gold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-rose" />
                    <span>VỪA NGHE LỜI CHÚC VỪA DẠO XEM WEB</span>
                  </span>
                  <h3 className="font-display font-black uppercase text-xl sm:text-2xl text-cream leading-snug">
                    {currentTrack.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-cream/80 leading-relaxed">
                    Khi Bảo Hân ấn chạy cuốn băng này, lời chúc của anh Trung sẽ
                    vang lên ấm áp ngay trên nền nhạc sinh nhật. Em cứ thoải mái
                    cuộn xuống ngắm hình, xé vé voucher và đọc thư — cuốn băng vẫn
                    sẽ tiếp tục chạy theo em suốt hành trình!
                  </p>
                </div>

                {/* Interactive Scrub / Progress Bar */}
                <div className="space-y-1.5">
                  <div
                    onClick={handleScrub}
                    className="w-full h-3 rounded-full bg-black/50 border border-gold/35 overflow-hidden cursor-pointer p-0.5"
                    title="Chạm để tua đến đoạn bất kỳ trong băng"
                  >
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-gold via-rose to-gold transition-all duration-150"
                      style={{ width: `${Math.max(4, progressRatio * 100)}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-cream/70">
                    <span>{formatTime(currentTime)}</span>
                    <span className="text-gold font-display uppercase tracking-wider">
                      {isPlaying
                        ? 'Đang phát trên nền nhạc...'
                        : 'Sẵn sàng phát'}
                    </span>
                    <span>{formatTime(duration || 78)}</span>
                  </div>
                </div>

                {/* Mechanical Push-Button Deck Controls */}
                <div className="flex flex-wrap items-center gap-2.5">
                  <FlyingButton
                    onClick={togglePlay}
                    className="flex-1 min-w-[200px] bg-gradient-to-r from-gold via-[#ffd280] to-gold text-plum-deep px-5 py-3 text-xs sm:text-sm font-display font-black uppercase tracking-wider shadow-[0_12px_30px_rgba(252,188,91,0.35)]"
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="w-4 h-4 fill-plum-deep" />
                        <span>Tạm Dừng Băng Cassette</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 fill-plum-deep" />
                        <span>Ấn Nghe Cuốn Băng Của Anh Trung</span>
                      </>
                    )}
                  </FlyingButton>

                  <button
                    type="button"
                    onClick={() => seekBy(-10)}
                    className="p-3 rounded-full bg-white/10 hover:bg-gold hover:text-plum-deep text-cream border border-cream/20 transition-colors cursor-pointer"
                    title="Tua lùi 10 giây"
                  >
                    <Rewind className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => seekBy(10)}
                    className="p-3 rounded-full bg-white/10 hover:bg-gold hover:text-plum-deep text-cream border border-cream/20 transition-colors cursor-pointer"
                    title="Tua tới 10 giây"
                  >
                    <FastForward className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={restartTrack}
                    className="p-3 rounded-full bg-white/10 hover:bg-gold hover:text-plum-deep text-cream border border-cream/20 transition-colors cursor-pointer"
                    title="Quay lại đầu băng"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>

                {/* Cassette Track / Side Switcher */}
                <div className="pt-2 border-t border-cream/10">
                  <p className="text-[10px] font-display font-bold uppercase tracking-[0.18em] text-cream/60 mb-2">
                    CHỌN MẶT BĂNG / PHẦN LỜI CHÚC:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {CASSETTE_TRACKS.map((t, idx) => {
                      const active = idx === activeTrackIdx;
                      return (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => handleSelectTrack(idx)}
                          className={`text-left px-3 py-2 rounded-xl border text-xs transition-all cursor-pointer ${
                            active
                              ? 'bg-gold text-plum-deep border-gold font-bold shadow-md'
                              : 'bg-white/5 text-cream/80 border-cream/15 hover:bg-white/15'
                          }`}
                        >
                          <div className="text-[9px] font-display font-black uppercase tracking-widest opacity-75">
                            {t.side}
                          </div>
                          <div className="truncate font-semibold mt-0.5">
                            {idx === 0
                              ? 'Lời Chúc Dài & Tâm Thư'
                              : idx === 1
                              ? 'Lời Chúc Thổi Nến'
                              : 'Lời Chúc Thiệp 3D'}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
