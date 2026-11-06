import React, { useState, useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Cake,
  Sparkles,
  Flame,
  Calendar,
  MapPin,
  ArrowDownRight,
  Instagram,
  Camera,
  Globe,
  Briefcase,
  PartyPopper,
  RotateCcw,
  Maximize2,
} from 'lucide-react';
import { heroProfile, marqueeItems } from '../../data/birthdayData';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import BunnyBirthdayCake3D from '../BunnyBirthdayCake3D/BunnyBirthdayCake3D';

function Bunny3DEmblem({ className = 'w-6 h-6' }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="bunnyHeadGrad" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="70%" stopColor="#FFEEDF" />
          <stop offset="100%" stopColor="#F5C6EC" />
        </radialGradient>
        <linearGradient id="bunnyEarPink" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FF9EBB" />
          <stop offset="100%" stopColor="#FF5C97" />
        </linearGradient>
      </defs>
      {/* Left Ear */}
      <ellipse
        cx="22"
        cy="18"
        rx="6.5"
        ry="15"
        transform="rotate(-10 22 18)"
        fill="url(#bunnyHeadGrad)"
        stroke="#FCBC5B"
        strokeWidth="1.5"
      />
      <ellipse
        cx="22"
        cy="19"
        rx="3.5"
        ry="10"
        transform="rotate(-10 22 19)"
        fill="url(#bunnyEarPink)"
      />
      {/* Right Ear */}
      <ellipse
        cx="42"
        cy="18"
        rx="6.5"
        ry="15"
        transform="rotate(10 42 18)"
        fill="url(#bunnyHeadGrad)"
        stroke="#FCBC5B"
        strokeWidth="1.5"
      />
      <ellipse
        cx="42"
        cy="19"
        rx="3.5"
        ry="10"
        transform="rotate(10 42 19)"
        fill="url(#bunnyEarPink)"
      />
      {/* Golden Crown */}
      <path
        d="M25 24 L27 16 L32 21 L37 16 L39 24 Z"
        fill="#FCBC5B"
        stroke="#8A5A12"
        strokeWidth="1"
      />
      {/* Chubby Head */}
      <ellipse
        cx="32"
        cy="40"
        rx="18"
        ry="15.5"
        fill="url(#bunnyHeadGrad)"
        stroke="#FCBC5B"
        strokeWidth="1.5"
      />
      {/* Blush Cheeks */}
      <ellipse cx="20" cy="43" rx="3.8" ry="2.2" fill="#FF7EB6" opacity="0.75" />
      <ellipse cx="44" cy="43" rx="3.8" ry="2.2" fill="#FF7EB6" opacity="0.75" />
      {/* Eyes */}
      <circle cx="25" cy="39" r="2.4" fill="#140B29" />
      <circle cx="24.2" cy="38.2" r="0.9" fill="#FFFFFF" />
      <circle cx="39" cy="39" r="2.4" fill="#140B29" />
      <circle cx="38.2" cy="38.2" r="0.9" fill="#FFFFFF" />
      {/* Cute Pink Nose & Smile */}
      <ellipse cx="32" cy="42" rx="2.2" ry="1.6" fill="#FF5C97" />
      <path
        d="M29.5 44.5 Q32 46.5 34.5 44.5"
        stroke="#140B29"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

const BUNTING_COLORS = [
  '#FCBC5B',
  '#FF7EB6',
  '#FFEEDF',
  '#A78BFA',
  '#FCBC5B',
  '#FF7EB6',
  '#FFEEDF',
  '#A78BFA',
  '#FCBC5B',
  '#FF7EB6',
];

const LANTERNS = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  left: `${5 + ((i * 7) % 90)}%`,
  delay: (i * 0.4) % 4,
  duration: 9 + (i % 5) * 1.8,
  scale: 0.65 + (i % 4) * 0.15,
}));

const HERO_GALLERY = [
  {
    src: '/memories/saigon/photopalette/palette-08.jpg',
    label: 'Tuổi 19 Trong Khung Trái Tim',
    aspect: 'aspect-[3/2]',
  },
  {
    src: '/memories/saigon/photopalette/palette-05.jpg',
    label: 'Nàng Thơ Ôm Hoa',
    aspect: 'aspect-[3/2]',
  },
  {
    src: '/memories/saigon/photopalette/palette-09.jpg',
    label: 'Nụ Cười Rạng Rỡ',
    aspect: 'aspect-[3/2]',
  },
  {
    src: '/memories/profile/avatar-baohan.jpg',
    label: 'Chân Dung Bảo Hân',
    aspect: 'aspect-[3/4]',
  },
];

export default function HeroBirthday({ onOpenLightbox }) {
  const [typedIndex, setTypedIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [candlesLit, setCandlesLit] = useState(true);
  const [wishMade, setWishMade] = useState(false);
  const [selectedHeroIdx, setSelectedHeroIdx] = useState(0);

  const activePhoto = HERO_GALLERY[selectedHeroIdx] || HERO_GALLERY[0];

  // Typewriter effect inspired by ProgrammerGaurav/happy-birthday
  useEffect(() => {
    const currentLine = heroProfile.typewriterLines[typedIndex];
    if (charIndex < currentLine.length) {
      const t = setTimeout(() => setCharIndex((c) => c + 1), 45);
      return () => clearTimeout(t);
    }
    const pause = setTimeout(() => {
      setCharIndex(0);
      setTypedIndex((i) => (i + 1) % heroProfile.typewriterLines.length);
    }, 3200);
    return () => clearTimeout(pause);
  }, [charIndex, typedIndex]);

  // 3D Tilt Spring for Portrait Card
  const [tiltProps, tiltApi] = useSpring(() => ({
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    config: { mass: 2, tension: 280, friction: 28 },
  }));

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    tiltApi.start({
      rotateX: -y * 10,
      rotateY: x * 10,
      scale: 1.01,
    });
  };

  const handleMouseLeave = () => {
    tiltApi.start({ rotateX: 0, rotateY: 0, scale: 1 });
  };

  const triggerConfetti = () => {
    const count = 170;
    const defaults = { origin: { y: 0.65 }, zIndex: 100 };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, { spread: 26, startVelocity: 55, colors: ['#FCBC5B', '#FF7EB6'] });
    fire(0.2, { spread: 60, colors: ['#FFEEDF', '#A78BFA'] });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
  };

  const handleBlowCandles = () => {
    setCandlesLit(false);
    setWishMade(true);
    triggerConfetti();
  };

  return (
    <section
      id="hero"
      className="relative pt-20 pb-4 overflow-hidden flex flex-col"
    >
      {/* Top Festive Bunting Flags */}
      <div className="pointer-events-none absolute top-0 inset-x-0 flex justify-between px-2 md:px-10 overflow-hidden z-20 opacity-90">
        {BUNTING_COLORS.map((color, idx) => (
          <motion.div
            key={idx}
            initial={{ y: -50, rotate: -5 }}
            animate={{ y: 0, rotate: idx % 2 === 0 ? 4 : -4 }}
            transition={{
              delay: idx * 0.06,
              duration: 1.8,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }}
            className="w-7 h-10 md:w-11 md:h-14 shadow-lg"
            style={{
              backgroundColor: color,
              clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
            }}
          />
        ))}
      </div>

      {/* Floating Sky Lanterns when wish is made */}
      <AnimatePresence>
        {wishMade && (
          <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden">
            {LANTERNS.map((l) => (
              <motion.div
                key={l.id}
                initial={{ y: '105vh', opacity: 0 }}
                animate={{
                  y: '-20vh',
                  opacity: [0, 0.92, 0.92, 0],
                  x: [0, 22, -16, 12],
                }}
                transition={{
                  duration: l.duration,
                  delay: l.delay,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                style={{ left: l.left, scale: l.scale }}
                className="absolute bottom-0 flex flex-col items-center"
              >
                <div className="w-9 h-12 rounded-t-2xl rounded-b-md bg-gradient-to-b from-amber-300 via-orange-400 to-amber-600 shadow-[0_0_28px_rgba(252,188,91,0.85)] border border-amber-200/60 flex items-end justify-center pb-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Main Editorial Hero Container */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-6 pb-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Monumental Display Typography & Typewriter */}
          <div className="lg:col-span-6 text-left space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-wrap items-center gap-3"
            >
              <Badge variant="gold" className="gap-2 py-1.5 px-4">
                <Calendar className="w-3.5 h-3.5" />
                <span>{heroProfile.birthDate}</span>
              </Badge>
              <Badge variant="cream" className="gap-2 py-1.5 px-4">
                <MapPin className="w-3.5 h-3.5 text-gold" />
                <span>Đà Nẵng — Sài Gòn</span>
              </Badge>
              <Badge variant="rose" className="gap-1.5 py-1.5 px-3.5">
                <Bunny3DEmblem className="w-4 h-4" />
                <span>THỎ BÚN @BUNII.817 • TUỔI 19</span>
              </Badge>
            </motion.div>

            {/* Monumental Big Shoulders Display Headline + Rotating Seal beside it (never covering the photo!) */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.7 }}
              className="flex items-center justify-between gap-4"
            >
              <div className="space-y-2">
                <p className="font-serif italic text-xl sm:text-2xl text-gold tracking-wide">
                  Happy 19th Birthday to the Muse
                </p>
                <h1 className="font-display font-black uppercase text-5xl sm:text-7xl xl:text-[5.2rem] leading-[0.94] tracking-tight text-cream">
                  LƯU NGUYỄN <br />
                  <span className="text-gold inline-flex items-center gap-4">
                    BẢO HÂN
                    <span className="inline-block w-6 h-6 sm:w-8 sm:h-8 bg-rose mask-four-star animate-pulse" />
                  </span>
                </h1>
              </div>

              {/* Rotating Seal Sticker placed cleanly in the typography header */}
              <div className="hidden sm:block relative w-24 h-24 shrink-0">
                <svg
                  viewBox="0 0 120 120"
                  className="w-full h-full animate-spin-slow"
                >
                  <defs>
                    <path
                      id="sealCirclePath"
                      d="M 60, 60 m -44, 0 a 44,44 0 1,1 88,0 a 44,44 0 1,1 -88,0"
                    />
                  </defs>
                  <circle
                    cx="60"
                    cy="60"
                    r="54"
                    fill="#140B29"
                    stroke="#FCBC5B"
                    strokeWidth="1.5"
                  />
                  <text
                    fill="#FFEEDF"
                    fontSize="8.5"
                    fontWeight="700"
                    letterSpacing="2.3"
                  >
                    <textPath href="#sealCirclePath">
                      • LƯU NGUYỄN BẢO HÂN • 08.11.2007 •
                    </textPath>
                  </text>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-display font-black text-xl text-gold">
                    19
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Typewriter Box */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="min-h-[80px] p-4 sm:p-5 rounded-2xl bg-plum/85 border border-gold/25 backdrop-blur-md flex items-center shadow-[0_16px_40px_rgba(0,0,0,0.45)]"
            >
              <p className="text-base sm:text-lg text-cream/95 font-medium leading-relaxed">
                <span className="text-gold font-display font-bold mr-2.5 tracking-wider">
                  0{typedIndex + 1} //
                </span>
                {heroProfile.typewriterLines[typedIndex].slice(0, charIndex)}
                <span className="inline-block w-2 h-5 ml-1 bg-gold animate-pulse align-middle" />
              </p>
            </motion.div>

            {/* 3D Bunny Photographer Mascot Card (@bunii.817 & @lop_thephotos) */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.42 }}
              onClick={() => onOpenLightbox?.('/scenes/bunny-photographer-3d.png')}
              data-cursor-label="THỎ BÚN 3D"
              className="group cursor-pointer p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-plum/95 via-[#21113d]/90 to-plum/95 border border-gold/35 flex items-center gap-4 shadow-[0_18px_45px_rgba(0,0,0,0.5)] hover:border-gold transition-all"
            >
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-gold/60 shrink-0 bg-plum-deep shadow-lg">
                <img
                  src="/scenes/bunny-photographer-3d.png"
                  alt="Thỏ Bún 3D Photographer @bunii.817"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="inline-flex items-center gap-1.5 text-[11px] font-display font-bold uppercase tracking-[0.18em] text-gold">
                  <Sparkles className="w-3.5 h-3.5 text-rose" />
                  <span>LINH VẬT 3D // CÔ THỎ NHIẾP ẢNH GIA (@BUNII.817)</span>
                </div>
                <p className="font-script text-2xl sm:text-3xl text-cream mt-0.5 leading-tight">
                  Cô Thỏ Nhỏ Cầm Máy Ảnh Tuổi 19
                </p>
                <p className="text-xs text-cream/75 mt-1 leading-relaxed line-clamp-2">
                  Vì Bảo Hân vừa đáng yêu giống một chú thỏ trắng nhỏ nhắn, vừa
                  đam mê lưu giữ cái đẹp qua ống kính @lop_thephotos!
                </p>
              </div>
            </motion.div>

            {/* Editorial Stats Row */}
            <div className="grid grid-cols-3 gap-4 border-y border-cream/10 py-5">
              <div>
                <div className="font-display font-black text-3xl sm:text-4xl text-gold tracking-tight">
                  19 TUỔI
                </div>
                <div className="text-xs sm:text-sm text-cream/70 mt-0.5">
                  Rực rỡ từ 08.11.2007
                </div>
              </div>
              <div className="border-x border-cream/10 px-4">
                <div className="font-display font-black text-3xl sm:text-4xl text-cream tracking-tight">
                  1000+
                </div>
                <div className="text-xs sm:text-sm text-cream/70 mt-0.5">
                  Tác phẩm tại @lop_thephotos
                </div>
              </div>
              <div>
                <div className="font-display font-black text-3xl sm:text-4xl text-rose tracking-tight">
                  365+ NGÀY
                </div>
                <div className="text-xs sm:text-sm text-cream/70 mt-0.5">
                  Đồng hành cùng anh Trung
                </div>
              </div>
            </div>

            {/* Social / Portfolio Quick Links */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <a
                href={heroProfile.socials.portfolio}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cream text-plum-deep hover:bg-gold transition-colors text-xs font-display font-bold uppercase tracking-wider"
              >
                <Globe className="w-3.5 h-3.5" />
                Portfolio Chính Thức
                <ArrowDownRight className="w-3.5 h-3.5 -rotate-90" />
              </a>
              <a
                href={heroProfile.socials.instaMain}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/5 hover:bg-white/15 border border-cream/15 text-xs font-medium text-cream transition-all"
              >
                <Instagram className="w-3.5 h-3.5 text-rose" />
                @lngbhan_
              </a>
              <a
                href={heroProfile.socials.instaSecondary}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/5 hover:bg-white/15 border border-cream/15 text-xs font-medium text-cream transition-all"
              >
                <Instagram className="w-3.5 h-3.5 text-gold" />
                @bunii.817
              </a>
              <a
                href={heroProfile.socials.instaPhoto}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-gold/15 hover:bg-gold/25 border border-gold/40 text-xs font-semibold text-gold transition-all"
              >
                <Camera className="w-3.5 h-3.5" />
                @lop_thephotos
              </a>
              <a
                href={heroProfile.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/5 hover:bg-white/15 border border-cream/15 text-xs font-medium text-cream transition-all"
              >
                <Briefcase className="w-3.5 h-3.5 text-gold" />
                LinkedIn
              </a>
            </div>
          </div>

          {/* Right Column: Full Uncropped Editorial Portrait + Switchable Thumbnails + Cake Stage */}
          <div className="lg:col-span-6 flex flex-col items-center gap-6">
            <div
              className="relative w-full max-w-[520px]"
              style={{ perspective: '1200px' }}
            >
              {/* Main Portrait Card — Full 3:2 / 3:4 photo with ZERO overlapping elements covering her face */}
              <animated.div
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={() => onOpenLightbox?.(activePhoto.src)}
                data-cursor-label="XEM ẢNH"
                style={{
                  transform: tiltProps.rotateX.to(
                    (rx) =>
                      `rotateX(${rx}deg) rotateY(${tiltProps.rotateY.get()}deg) scale(${tiltProps.scale.get()})`
                  ),
                }}
                className="relative cursor-pointer p-3.5 sm:p-4 bg-cream text-plum-deep rounded-[24px] shadow-[0_28px_70px_rgba(0,0,0,0.65)] border-2 border-gold/60"
              >
                {/* Top Header Strip Outside Photo */}
                <div className="flex items-center justify-between gap-2 pb-2.5 px-1">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-display font-bold uppercase tracking-[0.16em] text-plum-deep/80">
                    <span className="w-2.5 h-2.5 bg-gold mask-four-star inline-block shrink-0" />
                    <span>CHÂN DUNG TUỔI 19 • {activePhoto.label}</span>
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenLightbox?.(activePhoto.src);
                    }}
                    className="p-1.5 rounded-full bg-plum-deep/10 text-plum-deep hover:bg-plum-deep hover:text-gold transition-colors cursor-pointer"
                    title="Phóng to ảnh"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Uncovered Photo Viewport (Supports both 3:2 landscape and 3:4 portrait without cropping her head!) */}
                <div className="relative w-full aspect-[3/2] overflow-hidden rounded-[14px] bg-plum-deep border border-plum-deep/10">
                  {activePhoto.aspect === 'aspect-[3/4]' && (
                    <img
                      src={activePhoto.src}
                      alt=""
                      aria-hidden="true"
                      className="absolute inset-0 w-full h-full object-cover object-center blur-xl scale-110 opacity-55"
                    />
                  )}
                  <img
                    src={activePhoto.src}
                    alt={heroProfile.fullName}
                    className="relative z-10 w-full h-full object-contain block"
                  />
                </div>

                {/* Caption Bar BELOW the image (never covering the photo!) */}
                <div className="pt-3.5 px-2 flex items-center justify-between gap-3">
                  <div>
                    <span className="font-script text-2xl sm:text-3xl text-plum-deep font-bold block leading-tight">
                      Lưu Nguyễn Bảo Hân
                    </span>
                    <span className="text-[11px] uppercase tracking-[0.18em] text-plum-deep/70 font-display font-bold">
                      Visual Storyteller & Marketing • {activePhoto.label}
                    </span>
                  </div>

                  {/* Thumbnail Switcher right inside the bottom bar (never overlapping the main image!) */}
                  <div
                    className="flex items-center gap-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {HERO_GALLERY.map((item, idx) => (
                      <button
                        key={item.src}
                        type="button"
                        onClick={() => setSelectedHeroIdx(idx)}
                        className={`w-11 h-11 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                          selectedHeroIdx === idx
                            ? 'border-plum-deep scale-105 shadow-md'
                            : 'border-plum-deep/20 opacity-65 hover:opacity-100'
                        }`}
                        title={item.label}
                      >
                        <img
                          src={item.src}
                          alt={item.label}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </animated.div>
            </div>

            {/* Interactive 3D WebGL Bunny Birthday Cake & Candles Stage */}
            <div className="w-full max-w-[520px] rounded-[32px] bg-plum/90 border-2 border-gold/40 p-5 backdrop-blur-xl shadow-[0_24px_70px_rgba(0,0,0,0.65)] text-center">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-display font-bold uppercase tracking-[0.18em] text-gold flex items-center gap-2">
                  <Bunny3DEmblem className="w-5 h-5" />
                  <span>Bánh Kem Thỏ Bún 3D • Tuổi 19</span>
                </span>
                <Badge variant="gold" className="text-[10px] px-2.5 py-0.5">
                  3D TƯƠNG TÁC 360°
                </Badge>
              </div>

              {/* 3D WebGL Bunny Birthday Cake */}
              <BunnyBirthdayCake3D
                candlesLit={candlesLit}
                onBlowOut={handleBlowCandles}
                heightClass="h-[270px] sm:h-[310px]"
                interactiveHint="Kéo chuột để xoay chú Thỏ Bún 3D • Chạm vào bánh để thổi nến"
              />

              {/* Controls Below the 3D Cake */}
              <div className="mt-3 pt-3 border-t border-cream/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                {candlesLit ? (
                  <Button
                    variant="default"
                    size="default"
                    onClick={handleBlowCandles}
                    className="w-full shadow-[0_0_30px_rgba(252,188,91,0.4)]"
                  >
                    <Flame className="w-4 h-4" />
                    <span>Ước Một Điều & Thổi Tắt 5 Ngọn Nến 3D</span>
                  </Button>
                ) : (
                  <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-2.5">
                    <p className="text-xs text-gold font-medium text-left">
                      Chú Thỏ Bún 3D đang nhảy mừng điều ước tuổi 19 của Bảo Hân!
                    </p>
                    <div className="flex items-center gap-2 shrink-0">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCandlesLit(true)}
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Thắp lại nến</span>
                      </Button>
                      <Button
                        variant="rose"
                        size="sm"
                        onClick={triggerConfetti}
                      >
                        <PartyPopper className="w-3.5 h-3.5" />
                        <span>Pháo giấy</span>
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Infinite Editorial Marquee Ribbon */}
      <div className="relative z-20 w-full bg-gold text-plum-deep py-3.5 border-y-2 border-plum-deep overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.4)]">
        <div className="flex w-max animate-marquee items-center">
          {[...marqueeItems, ...marqueeItems].map((item, idx) => (
            <div key={idx} className="flex items-center gap-5 px-5">
              <span className="font-display font-black uppercase text-sm sm:text-base tracking-[0.18em]">
                {item}
              </span>
              <span className="w-3.5 h-3.5 bg-plum-deep mask-four-star inline-block shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
