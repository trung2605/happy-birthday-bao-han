import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useSprings, animated } from '@react-spring/web';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart,
  Camera,
  Palette,
  TrainFront,
  Trees,
  Shuffle,
  Sparkles,
  MapPin,
  Maximize2,
  MoveRight,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
} from 'lucide-react';
import { coupleMemories, saigonChapters } from '../../data/birthdayData';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { HoloCard } from '../ReactBits/HoloCard';

const CHAPTER_ICONS = {
  camera: Camera,
  palette: Palette,
  train: TrainFront,
  trees: Trees,
};

const PORTRAIT_PATTERNS = [
  '01-ao-dai-non-la',
  '04-dem-hen-ho',
  '05-chuyen-xe-vui-ve',
  '06-cafe-headphone',
  'metro-07',
  'metro-em-',
  'zoo-03',
  'zoo-05',
  'zoo-09',
  'vangogh-02',
  'vangogh-05',
  'vangogh-06',
  'vangogh-08',
  'vangogh-11',
];

function isPortraitPhoto(src, portraitFlag) {
  if (typeof portraitFlag === 'boolean') return portraitFlag;
  return PORTRAIT_PATTERNS.some((p) => src.includes(p));
}

function getEditorialCornerStyle(index) {
  const styles = [
    'rounded-[32px_10px_32px_10px]',
    'rounded-[10px_32px_10px_32px]',
    'rounded-[36px_36px_12px_12px]',
    'rounded-[14px_34px_28px_10px]',
  ];
  return styles[index % styles.length];
}

const SCATTER_PRESETS = [
  { rot: -3.2, y: 0 },
  { rot: 2.8, y: 16 },
  { rot: -2.1, y: -10 },
  { rot: 3.4, y: 14 },
  { rot: 2.2, y: -8 },
  { rot: -3.5, y: 16 },
  { rot: 1.9, y: -12 },
  { rot: -2.6, y: 10 },
  { rot: 2.9, y: -6 },
  { rot: -1.8, y: 12 },
];

function ScatteredPolaroidBoard({ cards, onOpenLightbox }) {
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [shuffleSeed, setShuffleSeed] = useState(0);

  const [springs, api] = useSprings(
    cards.length,
    (i) => {
      const preset = SCATTER_PRESETS[i % SCATTER_PRESETS.length];
      const dir = shuffleSeed % 2 === 0 ? 1 : -1;
      const isHovered = hoveredIdx === i;
      const isNeighbor =
        hoveredIdx !== null && Math.abs(i - hoveredIdx) === 1;
      const neighborDir = hoveredIdx !== null ? Math.sign(i - hoveredIdx) : 0;
      return {
        x: isHovered ? 0 : isNeighbor ? neighborDir * 14 : 0,
        rot: isHovered
          ? 0
          : isNeighbor
          ? preset.rot * dir + neighborDir * 4.2
          : preset.rot * dir,
        y: isHovered ? -12 : isNeighbor ? preset.y + 4 : preset.y,
        scale: isHovered ? 1.06 : isNeighbor ? 0.98 : 1,
        config: { mass: 1.1, tension: 260, friction: 9 },
      };
    },
    [hoveredIdx, shuffleSeed]
  );

  const handleShuffle = () => {
    setShuffleSeed((s) => s + 1);
    api.start((i) => {
      const randomRot = (i % 2 === 0 ? 1 : -1) * (3.5 + Math.random() * 4.5);
      const randomY = (Math.random() - 0.5) * 24;
      return {
        from: { rot: -randomRot * 1.6, x: 0 },
        to: { rot: randomRot, y: randomY, x: 0, scale: 1 },
        config: { mass: 1.2, tension: 280, friction: 8 },
      };
    });
  };

  return (
    <div className="w-full">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-2.5">
          <Badge variant="gold" className="gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>
              BẢNG ẢNH POLAROID LẮT LƯ ({cards.length} KỶ NIỆM — MỖI TẤM MỘT NƠI)
            </span>
          </Badge>
          <span className="text-xs text-cream/70 hidden sm:inline">
            Các tấm ảnh đung đưa nhẹ theo gió — chạm vào ảnh bất kỳ để phóng to
          </span>
        </div>

        <Button variant="outline" size="sm" onClick={handleShuffle}>
          <Shuffle className="w-3.5 h-3.5" />
          <span>Lắc Lư & Đổi Góc Nghiêng</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 sm:gap-9 items-start py-4">
        {springs.map(({ x, rot, y, scale }, i) => {
          const card = cards[i];
          const imgW = card.width || (card.portrait ? 853 : 1280);
          const imgH = card.height || (card.portrait ? 1280 : 853);
          const swayClass = i % 2 === 0 ? 'polaroid-sway-a' : 'polaroid-sway-b';
          const swayDur = `${3.4 + (i % 5) * 0.45}s`;
          const swayDelay = `-${(i * 0.65).toFixed(2)}s`;

          return (
            <animated.div
              key={card.id}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              onClick={() => onOpenLightbox?.(card.src)}
              data-cursor-label="PHÓNG TO"
              style={{
                transformOrigin: '50% 10px',
                transform: rot.to(
                  (r) =>
                    `translate3d(${x.get()}px, ${y.get()}px, 0) rotateZ(${r}deg) scale(${scale.get()})`
                ),
                zIndex: hoveredIdx === i ? 30 : 10,
              }}
              className="relative select-none"
            >
              <div
                style={{
                  '--sway-dur': swayDur,
                  '--sway-delay': swayDelay,
                }}
                className={`${swayClass} group relative cursor-pointer p-3.5 pt-5 pb-5 rounded-[22px] bg-cream text-plum-deep border-2 border-gold/60 shadow-[0_20px_50px_rgba(0,0,0,0.65)] hover:border-gold hover:shadow-[0_24px_65px_rgba(252,188,91,0.28)] transition-colors`}
              >
                {/* Đinh ghim vàng giữ tấm Polaroid đung đưa */}
                <div
                  aria-hidden="true"
                  className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-gradient-to-br from-[#ffe299] via-gold to-[#9c6311] border-2 border-plum-deep shadow-[0_4px_10px_rgba(0,0,0,0.6)] flex items-center justify-center z-20"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-white/80" />
                </div>

                <div className="flex items-center justify-between mb-2.5 px-1">
                  <span className="text-[10px] font-display font-bold uppercase tracking-[0.2em] text-plum-deep/75">
                    {String(i + 1).padStart(2, '0')} // {card.tag}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenLightbox?.(card.src);
                    }}
                    className="p-1 rounded-full bg-plum-deep/10 text-plum-deep hover:bg-plum-deep hover:text-gold transition-colors cursor-pointer"
                    title="Phóng to ảnh"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div
                  style={{
                    aspectRatio: `${imgW} / ${imgH}`,
                  }}
                  className="relative w-full overflow-hidden rounded-[12px] bg-plum-deep border border-plum-deep/10"
                >
                  <img
                    src={card.src}
                    alt={card.caption}
                    loading="lazy"
                    className="w-full h-full object-contain block"
                    draggable={false}
                  />
                </div>

                <div className="mt-3.5 px-1.5 text-center">
                  <p className="font-script text-2xl text-plum-deep font-bold leading-snug">
                    {card.caption}
                  </p>
                </div>
              </div>
            </animated.div>
          );
        })}
      </div>
    </div>
  );
}

export default function LoveJourney({ onOpenLightbox }) {
  const [activeSaigonTab, setActiveSaigonTab] = useState(saigonChapters[0].id);
  const [autoGlide, setAutoGlide] = useState(true);
  const [isHoveringTrack, setIsHoveringTrack] = useState(false);

  const saigonViewportRef = useRef(null);
  const targetScrollRef = useRef(0);
  const floatScrollRef = useRef(0);
  const manualPauseUntilRef = useRef(0);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartScrollRef = useRef(0);

  const [saigonProgress, setSaigonProgress] = useState(0);

  const currentChapter =
    saigonChapters.find((c) => c.id === activeSaigonTab) || saigonChapters[0];

  // Build a rich 24-card horizontal exhibition reel across all 4 Saigon stations (interleaved best highlights first!)
  const saigonHorizontalReel = useMemo(() => {
    const perStation = saigonChapters.map((ch) =>
      ch.photos.slice(0, 6).map((p, idx) => ({
        id: `${ch.id}-reel-${idx}`,
        chapterId: ch.id,
        chapterCode: ch.code,
        chapterTitle: ch.title,
        chapterSubtitle: ch.subtitle,
        chapterIcon: ch.icon,
        totalInChapter: ch.photos.length,
        src: p.src,
        width: p.width || (p.portrait ? 853 : 1280),
        height: p.height || (p.portrait ? 1280 : 853),
        caption: p.caption,
        portrait: Boolean(p.portrait),
        indexInReel: `${idx + 1}/6`,
      }))
    );
    // Keep station grouping so clicking a station tab scrolls directly to that station's 6 curated masterpieces
    return perStation.flat();
  }, []);

  const handleTrackScroll = () => {
    const el = saigonViewportRef.current;
    if (!el) return;
    if (isDraggingRef.current) {
      targetScrollRef.current = el.scrollLeft;
      floatScrollRef.current = el.scrollLeft;
    }
    const maxScroll = Math.max(1, el.scrollWidth - el.clientWidth);
    const ratio = Math.min(1, Math.max(0, el.scrollLeft / maxScroll));
    setSaigonProgress(ratio);
  };

  // Native { passive: false } wheel listener for smooth wheel-to-horizontal scroll
  useEffect(() => {
    const el = saigonViewportRef.current;
    if (!el) return;

    let rafId = null;
    const animateScroll = () => {
      const diff = targetScrollRef.current - el.scrollLeft;
      if (Math.abs(diff) > 0.5) {
        el.scrollLeft += diff * 0.25;
        floatScrollRef.current = el.scrollLeft;
        rafId = requestAnimationFrame(animateScroll);
      } else {
        el.scrollLeft = targetScrollRef.current;
        floatScrollRef.current = el.scrollLeft;
        rafId = null;
      }
    };

    const onWheel = (e) => {
      const maxScroll = el.scrollWidth - el.clientWidth;
      if (maxScroll <= 0) return;

      const delta =
        Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      const atStart = el.scrollLeft <= 2 && delta < 0;
      const atEnd = el.scrollLeft >= maxScroll - 2 && delta > 0;

      if (!atStart && !atEnd) {
        e.preventDefault();
        manualPauseUntilRef.current = performance.now() + 450;
        targetScrollRef.current = Math.min(
          maxScroll,
          Math.max(0, targetScrollRef.current + delta * 1.55)
        );
        if (!rafId) {
          rafId = requestAnimationFrame(animateScroll);
        }
      }
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      el.removeEventListener('wheel', onWheel);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Continuous fast auto-glide (always runs even when hovering or after wheel/drag!)
  useEffect(() => {
    setAutoGlide(true);
  }, []);

  useEffect(() => {
    if (!autoGlide) return;
    const el = saigonViewportRef.current;
    if (!el) return;

    floatScrollRef.current = el.scrollLeft;
    let rafId;
    let lastTime = performance.now();
    const SPEED_PX_PER_SEC = 380; // Fast continuous glide (~6.3px per frame at 60fps)

    const step = (now) => {
      const dt = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;

      if (!isDraggingRef.current && now > manualPauseUntilRef.current) {
        const maxScroll = el.scrollWidth - el.clientWidth;
        if (maxScroll > 0) {
          if (floatScrollRef.current >= maxScroll - 2) {
            floatScrollRef.current = 0;
            el.scrollLeft = 0;
            targetScrollRef.current = 0;
          } else {
            floatScrollRef.current += SPEED_PX_PER_SEC * dt;
            el.scrollLeft = floatScrollRef.current;
            targetScrollRef.current = el.scrollLeft;
          }
        }
      }
      rafId = requestAnimationFrame(step);
    };
    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [autoGlide]);

  const handleMouseDown = (e) => {
    const el = saigonViewportRef.current;
    if (!el) return;
    isDraggingRef.current = true;
    dragStartXRef.current = e.pageX - el.offsetLeft;
    dragStartScrollRef.current = el.scrollLeft;
  };

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current || !saigonViewportRef.current) return;
    e.preventDefault();
    const x = e.pageX - saigonViewportRef.current.offsetLeft;
    const walk = (x - dragStartXRef.current) * 1.6;
    saigonViewportRef.current.scrollLeft = dragStartScrollRef.current - walk;
    targetScrollRef.current = saigonViewportRef.current.scrollLeft;
    floatScrollRef.current = saigonViewportRef.current.scrollLeft;
  };

  const handleMouseUpOrLeave = () => {
    isDraggingRef.current = false;
  };

  const jumpToSaigonStation = (idx, id) => {
    setActiveSaigonTab(id);
    const el = saigonViewportRef.current;
    if (!el) return;
    manualPauseUntilRef.current = performance.now() + 650;
    const maxScroll = el.scrollWidth - el.clientWidth;
    const ratio = idx / Math.max(saigonChapters.length, 1);
    const next = maxScroll * ratio;
    el.scrollTo({ left: next, behavior: 'smooth' });
    targetScrollRef.current = next;
    floatScrollRef.current = next;
  };

  const shiftSaigonByCard = (dir) => {
    const el = saigonViewportRef.current;
    if (!el) return;
    manualPauseUntilRef.current = performance.now() + 600;
    const maxScroll = el.scrollWidth - el.clientWidth;
    const next = Math.min(maxScroll, Math.max(0, el.scrollLeft + dir * 460));
    el.scrollTo({ left: next, behavior: 'smooth' });
    targetScrollRef.current = next;
    floatScrollRef.current = next;
  };

  return (
    <section id="love-journey" className="relative z-10 py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-rose font-display font-bold uppercase tracking-[0.22em] text-xs mb-2">
              <Heart className="w-4 h-4 fill-rose" />
              <span>CHAPTER 02 // HÀNH TRÌNH 1 NĂM YÊU NHAU</span>
            </div>
            <h2 className="font-display font-black uppercase text-4xl sm:text-6xl text-cream tracking-tight leading-[0.95]">
              TRUNG & BẢO HÂN <br />
              <span className="text-gold font-serif italic font-normal capitalize">
                365+ Ngày Thương Nhớ
              </span>
            </h2>
          </div>
          <HoloCard
            maxTilt={7}
            className="flex items-center gap-4 max-w-lg bg-plum/75 border border-gold/30 p-3.5 rounded-2xl backdrop-blur-md shadow-xl"
          >
            <div
              onClick={() => onOpenLightbox?.('/scenes/bunny-couple-3d.png')}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-gold/60 shrink-0 cursor-pointer group bg-plum-deep"
              title="Phóng to hình 3D Đôi Thỏ Trung & Bảo Hân"
            >
              <img
                src="/scenes/bunny-couple-3d.png"
                alt="3D Bunny Couple Trung & Bảo Hân"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <p className="text-cream/80 text-xs sm:text-sm leading-relaxed">
              Từ những buổi chiều lộng gió ở Đà Nẵng cho đến những chuyến bay anh
              Trung vào Sài Gòn thăm cô Thỏ nhỏ — mỗi tấm hình Polaroid đều đung
              đưa ở một góc riêng biệt, không chồng lấn.
            </p>
          </HoloCard>
        </div>

        {/* Part 1: Scattered Polaroid Board — "Mỗi tấm một nơi" */}
        <div className="mb-16">
          <ScatteredPolaroidBoard
            cards={coupleMemories}
            onOpenLightbox={onOpenLightbox}
          />
        </div>
      </div>

      {/* Part 2: 24-Card Horizontal Scroll Reel for "Anh Trung Vào Sài Gòn" */}
      <div
        onMouseEnter={() => setIsHoveringTrack(true)}
        onMouseLeave={() => {
          setIsHoveringTrack(false);
          handleMouseUpOrLeave();
        }}
        className="py-12 mb-12 bg-gradient-to-b from-plum-deep via-[#1D0F36] to-plum-deep border-y border-gold/30"
      >
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 mb-6 flex flex-col xl:flex-row xl:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-gold font-display font-bold uppercase tracking-[0.22em] text-xs mb-1.5">
              <MapPin className="w-4 h-4 text-rose" />
              <span>
                SPECIAL CHAPTER // ANH TRUNG VÀO SÀI GÒN (86 KHOẢNH KHẮC)
              </span>
            </div>
            <h3 className="font-display font-black uppercase text-2xl sm:text-4xl text-cream tracking-tight">
              4 TRẠM DỪNG HẸN HÒ{' '}
              <span className="text-gold font-serif italic font-normal capitalize">
                Giữa Lòng Thành Phố
              </span>
            </h3>
          </div>

          {/* Station Pill Selector + Auto-Glide + Prev/Next Arrows */}
          <div className="flex flex-wrap items-center gap-2">
            {saigonChapters.map((ch, idx) => {
              const IconComp = CHAPTER_ICONS[ch.icon] || Camera;
              const isSelected = ch.id === activeSaigonTab;
              return (
                <button
                  key={ch.id}
                  type="button"
                  onClick={() => jumpToSaigonStation(idx, ch.id)}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-display font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-gold text-plum-deep shadow-lg scale-105'
                      : 'bg-white/5 text-cream/75 hover:bg-white/15 border border-cream/15'
                  }`}
                >
                  <IconComp className="w-3.5 h-3.5" />
                  <span>
                    {ch.title} ({ch.photos.length})
                  </span>
                </button>
              );
            })}

            <div className="flex items-center gap-1.5 ml-1">
              <button
                type="button"
                onClick={() => setAutoGlide((a) => !a)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-display font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                  autoGlide
                    ? 'bg-rose/20 text-rose border border-rose/40'
                    : 'bg-white/10 text-cream/70 hover:text-cream'
                }`}
              >
                {autoGlide ? (
                  <>
                    <Pause className="w-3.5 h-3.5" />
                    <span>Tự trượt</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5" />
                    <span>Tự trượt</span>
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => shiftSaigonByCard(-1)}
                className="p-2 rounded-full bg-white/10 hover:bg-gold hover:text-plum-deep text-cream transition-colors cursor-pointer"
                title="Trượt sang trái"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => shiftSaigonByCard(1)}
                className="p-2 rounded-full bg-white/10 hover:bg-gold hover:text-plum-deep text-cream transition-colors cursor-pointer"
                title="Trượt sang phải"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Scrollable Reel of 24 Saigon Highlight Cards */}
        <div
          ref={saigonViewportRef}
          onScroll={handleTrackScroll}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          className="w-full overflow-x-auto px-4 sm:px-8 lg:px-16 pb-4 cursor-grab active:cursor-grabbing no-scrollbar"
        >
          <div className="flex gap-6 lg:gap-7 w-max items-stretch">
            {saigonHorizontalReel.map((item, idx) => {
              const IconComp = CHAPTER_ICONS[item.chapterIcon] || Camera;
              const isActive = item.chapterId === activeSaigonTab;
              const imgW = item.width || (item.portrait ? 853 : 1280);
              const imgH = item.height || (item.portrait ? 1280 : 853);
              const targetImgHeight = 300;
              const computedImgWidth = Math.round(
                (imgW / imgH) * targetImgHeight
              );
              const cardWidth = Math.max(240, computedImgWidth + 28);

              return (
                <div
                  key={item.id}
                  onClick={() => {
                    setActiveSaigonTab(item.chapterId);
                    onOpenLightbox?.(item.src);
                  }}
                  data-cursor-label="XEM ẢNH"
                  style={{
                    width: `${cardWidth}px`,
                    '--sway-dur': `${4.2 + (idx % 4) * 0.45}s`,
                    '--sway-delay': `-${(idx * 0.55).toFixed(2)}s`,
                  }}
                  className={`photo-sway-soft group relative rounded-[22px] p-3.5 bg-cream text-plum-deep cursor-pointer shrink-0 select-none transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5 ${
                    isActive
                      ? 'border-4 border-gold shadow-[0_24px_70px_rgba(252,188,91,0.35)]'
                      : 'border-2 border-gold/50 opacity-95 hover:opacity-100'
                  }`}
                >
                  {/* Top Header Bar Outside Photo (Zero Overlay on Image) */}
                  <div className="flex items-center justify-between gap-2 pb-2.5 px-1">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-display font-bold uppercase tracking-[0.14em] text-plum-deep/80">
                      <IconComp className="w-3.5 h-3.5 text-plum-deep shrink-0" />
                      <span>
                        TRẠM {item.chapterCode} • {item.chapterTitle}
                      </span>
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenLightbox?.(item.src);
                      }}
                      className="p-1.5 rounded-full bg-plum-deep/10 text-plum-deep hover:bg-plum-deep hover:text-gold transition-colors cursor-pointer"
                      title="Phóng to ảnh"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Middle: 100% Uncropped Native Aspect-Ratio Photo Frame */}
                  <div
                    style={{
                      height: `${targetImgHeight}px`,
                      aspectRatio: `${imgW} / ${imgH}`,
                    }}
                    className="relative w-full overflow-hidden rounded-[12px] bg-plum-deep border border-plum-deep/10"
                  >
                    <img
                      src={item.src}
                      alt={item.caption}
                      loading="lazy"
                      draggable={false}
                      className="w-full h-full object-contain block"
                    />
                  </div>

                  {/* Bottom: Clean Caption Bar */}
                  <div className="pt-3 px-1 pb-0.5">
                    <div className="flex items-center justify-between text-[10px] font-display font-bold uppercase tracking-[0.16em] text-plum-deep/65">
                      <span>{item.chapterSubtitle}</span>
                      <span>#{item.indexInReel}</span>
                    </div>
                    <p className="text-sm font-bold text-plum-deep mt-1 line-clamp-2 leading-snug">
                      {item.caption}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Clickable Progress Bar */}
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 mt-4 flex items-center gap-4">
          <span className="text-xs font-display font-bold uppercase tracking-[0.2em] text-gold flex items-center gap-1.5 shrink-0">
            <MoveRight className="w-4 h-4" />
            Lăn Chuột / Kéo Để Trượt Ngang
          </span>
          <div
            onClick={(e) => {
              const el = saigonViewportRef.current;
              if (!el) return;
              const rect = e.currentTarget.getBoundingClientRect();
              const ratio = Math.min(
                1,
                Math.max(0, (e.clientX - rect.left) / rect.width)
              );
              const maxScroll = el.scrollWidth - el.clientWidth;
              manualPauseUntilRef.current = performance.now() + 600;
              const next = ratio * maxScroll;
              el.scrollTo({ left: next, behavior: 'smooth' });
              targetScrollRef.current = next;
              floatScrollRef.current = next;
            }}
            className="flex-1 h-2.5 rounded-full bg-cream/15 overflow-hidden cursor-pointer"
          >
            <div
              className="h-full bg-gradient-to-r from-gold to-rose transition-all duration-100 rounded-full"
              style={{ width: `${Math.max(8, saigonProgress * 100)}%` }}
            />
          </div>
          <span className="text-xs font-display font-bold text-cream/85 shrink-0">
            Đang chọn: {currentChapter.title} ({currentChapter.photos.length}{' '}
            ảnh)
          </span>
        </div>
      </div>

      {/* Part 3: Full Uncropped Masonry Gallery for the Active Saigon Station (Up to 24 Photos per Station!) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentChapter.id}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.35 }}
            className="rounded-[32px] bg-plum/70 border border-gold/30 p-6 sm:p-10 backdrop-blur-xl shadow-2xl"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 mb-8 border-b border-cream/10">
              <div>
                <div className="flex items-center gap-2 text-xs font-display font-bold uppercase tracking-[0.2em] text-gold">
                  <span>TRẠM {currentChapter.code}</span>
                  <span>•</span>
                  <span>{currentChapter.location}</span>
                </div>
                <h4 className="font-display font-black uppercase text-2xl sm:text-4xl text-cream mt-1">
                  {currentChapter.title} —{' '}
                  <span className="font-serif italic font-normal text-gold capitalize">
                    {currentChapter.subtitle}
                  </span>
                </h4>
                <p className="text-cream/75 text-sm sm:text-base mt-2 max-w-2xl">
                  {currentChapter.description}
                </p>
              </div>

              {/* Station Switcher Buttons right inside the Gallery Header */}
              <div className="flex flex-wrap items-center gap-2">
                {saigonChapters.map((ch) => (
                  <button
                    key={ch.id}
                    type="button"
                    onClick={() => setActiveSaigonTab(ch.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-display font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      ch.id === activeSaigonTab
                        ? 'bg-gold text-plum-deep shadow-md'
                        : 'bg-white/10 text-cream/80 hover:bg-white/20'
                    }`}
                  >
                    {ch.title} ({ch.photos.length})
                  </button>
                ))}
              </div>
            </div>

            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
              {currentChapter.photos.map((photo, idx) => {
                const imgW = photo.width || (photo.portrait ? 853 : 1280);
                const imgH = photo.height || (photo.portrait ? 1280 : 853);

                return (
                  <motion.div
                    key={photo.src}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: Math.min(idx * 0.02, 0.3) }}
                    onClick={() => onOpenLightbox?.(photo.src)}
                    data-cursor-label="PHÓNG TO"
                    className="break-inside-avoid"
                  >
                    <div
                      style={{
                        '--sway-dur': `${4.0 + (idx % 5) * 0.45}s`,
                        '--sway-delay': `-${(idx * 0.5).toFixed(2)}s`,
                      }}
                      className="photo-sway-soft group relative cursor-pointer p-3 rounded-[20px] bg-cream text-plum-deep shadow-[0_18px_45px_rgba(0,0,0,0.5)] border-2 border-gold/55 transition-all duration-500 hover:-translate-y-1.5"
                    >
                      <div
                        style={{
                          aspectRatio: `${imgW} / ${imgH}`,
                        }}
                        className="relative w-full overflow-hidden bg-plum-deep rounded-[12px] border border-plum-deep/10"
                      >
                        <img
                          src={photo.src}
                          alt={photo.caption}
                          loading="lazy"
                          className="w-full h-full object-contain block"
                        />
                      </div>

                      <div className="pt-2.5 px-1 flex items-center justify-between gap-2">
                        <p className="text-xs text-plum-deep font-semibold leading-snug">
                          {photo.caption}
                        </p>
                        <span className="w-3.5 h-3.5 bg-rose mask-four-star shrink-0" />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
