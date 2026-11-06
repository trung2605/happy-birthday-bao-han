import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Briefcase,
  Camera,
  GraduationCap,
  Sparkles,
  ExternalLink,
  Award,
  CheckCircle2,
  ArrowUpRight,
  Compass,
  MoveRight,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
} from 'lucide-react';
import {
  achievementsData,
  portfolioHighlights,
  allPortfolioArtworks,
} from '../../data/birthdayData';
import { Badge } from '../ui/badge';
import {
  AccordionMilestoneGallery,
  DepthCarouselWithViewfinder,
} from '../ReactBits/AccordionAndDepthGallery';

const ICON_MAP = {
  briefcase: Briefcase,
  camera: Camera,
  graduation: GraduationCap,
  sparkles: Sparkles,
};

export default function AchievementsBento({ onOpenLightbox }) {
  const [activeAchievementId, setActiveAchievementId] = useState(
    achievementsData[0].id
  );
  const [milestoneViewMode, setMilestoneViewMode] = useState('accordion'); // 'accordion' | 'split'
  const [exhibitionViewMode, setExhibitionViewMode] = useState('reel'); // 'reel' | 'depth3d'
  const [selectedProjectId, setSelectedProjectId] = useState('all');
  const [autoGlide, setAutoGlide] = useState(true);
  const [isHoveringTrack, setIsHoveringTrack] = useState(false);

  const viewportRef = useRef(null);
  const targetScrollRef = useRef(0);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartScrollRef = useRef(0);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(1);

  const activeAchievement =
    achievementsData.find((a) => a.id === activeAchievementId) ||
    achievementsData[0];

  const displayedArtworks =
    selectedProjectId === 'all'
      ? allPortfolioArtworks
      : allPortfolioArtworks.filter((a) => a.projectId === selectedProjectId);

  // Sync progress bar when track scrolls
  const handleTrackScroll = () => {
    const el = viewportRef.current;
    if (!el) return;
    if (!isDraggingRef.current) {
      targetScrollRef.current = el.scrollLeft;
    }
    const maxScroll = Math.max(1, el.scrollWidth - el.clientWidth);
    const ratio = Math.min(1, Math.max(0, el.scrollLeft / maxScroll));
    setScrollProgress(ratio);
    setCurrentIndex(
      Math.min(
        displayedArtworks.length,
        Math.max(1, Math.round(ratio * (displayedArtworks.length - 1)) + 1)
      )
    );
  };

  // Reset scroll to 0 when switching project filter
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    el.scrollLeft = 0;
    targetScrollRef.current = 0;
    setScrollProgress(0);
    setCurrentIndex(1);
  }, [selectedProjectId]);

  // Native { passive: false } wheel listener for buttery-smooth wheel-to-horizontal scroll
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    let rafId = null;
    const animateScroll = () => {
      const diff = targetScrollRef.current - el.scrollLeft;
      if (Math.abs(diff) > 0.5) {
        el.scrollLeft += diff * 0.22;
        rafId = requestAnimationFrame(animateScroll);
      } else {
        el.scrollLeft = targetScrollRef.current;
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
        setAutoGlide(false);
        targetScrollRef.current = Math.min(
          maxScroll,
          Math.max(0, targetScrollRef.current + delta * 1.45)
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
  }, [displayedArtworks.length]);

  // Gentle auto-glide + window vertical scroll linkage when not hovering
  useEffect(() => {
    if (!autoGlide || isHoveringTrack) return;
    const el = viewportRef.current;
    if (!el) return;

    let rafId;
    const step = () => {
      const maxScroll = el.scrollWidth - el.clientWidth;
      if (maxScroll > 0) {
        if (el.scrollLeft >= maxScroll - 2) {
          el.scrollLeft = 0;
          targetScrollRef.current = 0;
        } else {
          el.scrollLeft += 0.9;
          targetScrollRef.current = el.scrollLeft;
        }
      }
      rafId = requestAnimationFrame(step);
    };
    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [autoGlide, isHoveringTrack, displayedArtworks.length]);

  // Mouse drag-to-scroll support
  const handleMouseDown = (e) => {
    const el = viewportRef.current;
    if (!el) return;
    isDraggingRef.current = true;
    setAutoGlide(false);
    dragStartXRef.current = e.pageX - el.offsetLeft;
    dragStartScrollRef.current = el.scrollLeft;
  };

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current || !viewportRef.current) return;
    e.preventDefault();
    const x = e.pageX - viewportRef.current.offsetLeft;
    const walk = (x - dragStartXRef.current) * 1.6;
    viewportRef.current.scrollLeft = dragStartScrollRef.current - walk;
    targetScrollRef.current = viewportRef.current.scrollLeft;
  };

  const handleMouseUpOrLeave = () => {
    isDraggingRef.current = false;
  };

  const shiftByCard = (dir) => {
    const el = viewportRef.current;
    if (!el) return;
    setAutoGlide(false);
    const maxScroll = el.scrollWidth - el.clientWidth;
    const next = Math.min(maxScroll, Math.max(0, el.scrollLeft + dir * 420));
    el.scrollTo({ left: next, behavior: 'smooth' });
    targetScrollRef.current = next;
  };

  return (
    <section id="achievements" className="relative z-10 py-14">
      {/* PART 1: Editorial Milestone Showcase */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-gold font-display font-bold uppercase tracking-[0.22em] text-xs mb-2">
              <Award className="w-4 h-4" />
              <span>CHAPTER 01 // DẤU ẤN TUỔI 18 RỰC RỠ</span>
            </div>
            <h2 className="font-display font-black uppercase text-4xl sm:text-6xl text-cream tracking-tight leading-[0.96]">
              BƯỚC TRƯỞNG THÀNH <br />
              <span className="text-gold font-serif italic font-normal capitalize">
                Đáng Tự Hào Của Bảo Hân
              </span>
            </h2>
          </div>
          <div className="flex flex-col items-start md:items-end gap-3">
            <p className="text-cream/75 max-w-md text-sm sm:text-base leading-relaxed">
              Trước khi chính thức bước sang tuổi 19, nhìn lại một năm tuổi 18 với
              công việc thực tập đầu tiên tại{' '}
              <strong className="text-gold">AEON</strong>, hàng ngàn bức ảnh tại{' '}
              <strong className="text-gold">@lop_thephotos</strong> và hành trình
              đại học quốc tế tại Sài Gòn.
            </p>
            <div className="inline-flex items-center gap-1.5 p-1 rounded-full bg-plum/90 border border-gold/30">
              <button
                type="button"
                onClick={() => setMilestoneViewMode('accordion')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-display font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  milestoneViewMode === 'accordion'
                    ? 'bg-gold text-plum-deep shadow'
                    : 'text-cream/75 hover:text-cream'
                }`}
              >
                Accordion Gallery (React Bits)
              </button>
              <button
                type="button"
                onClick={() => setMilestoneViewMode('split')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-display font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  milestoneViewMode === 'split'
                    ? 'bg-gold text-plum-deep shadow'
                    : 'text-cream/75 hover:text-cream'
                }`}
              >
                Bố Cục Chi Tiết
              </button>
            </div>
          </div>
        </div>

        {milestoneViewMode === 'accordion' ? (
          <AccordionMilestoneGallery
            items={achievementsData}
            activeId={activeAchievement.id}
            onSelect={setActiveAchievementId}
            onOpenLightbox={onOpenLightbox}
          />
        ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-14">
          {/* Left: Interactive Selector List with Monumental Numbers */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-3">
            {achievementsData.map((item, idx) => {
              const IconComp = ICON_MAP[item.icon] || Sparkles;
              const isActive = item.id === activeAchievement.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveAchievementId(item.id)}
                  className={`group text-left p-5 rounded-2xl border transition-all duration-300 flex items-start gap-4 cursor-pointer ${
                    isActive
                      ? 'bg-cream text-plum-deep border-gold shadow-[0_16px_40px_rgba(252,188,91,0.22)] scale-[1.01]'
                      : 'bg-plum/70 text-cream border-cream/15 hover:border-gold/50 hover:bg-plum'
                  }`}
                >
                  <span
                    className={`font-display font-black text-3xl sm:text-4xl leading-none ${
                      isActive ? 'text-plum-deep' : 'text-gold/70'
                    }`}
                  >
                    0{idx + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`text-[11px] font-display font-bold uppercase tracking-[0.18em] ${
                          isActive ? 'text-plum-deep/70' : 'text-gold'
                        }`}
                      >
                        {item.tag}
                      </span>
                      <IconComp
                        className={`w-4 h-4 shrink-0 ${
                          isActive ? 'text-plum-deep' : 'text-gold'
                        }`}
                      />
                    </div>
                    <h3 className="font-display font-black uppercase text-lg sm:text-xl mt-1">
                      {item.title}
                    </h3>
                    <p
                      className={`text-xs mt-1 ${
                        isActive ? 'text-plum-deep/80' : 'text-cream/65'
                      }`}
                    >
                      {item.subtitle}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Uncovered Full Photo + Clean Cream Editorial Panel (Zero Cropping) */}
          <div className="lg:col-span-7 relative rounded-[24px] overflow-hidden border-2 border-gold/50 shadow-[0_24px_70px_rgba(0,0,0,0.6)] bg-cream text-plum-deep flex flex-col md:flex-row items-center p-3.5 sm:p-5 gap-5">
            <div
              onClick={() => onOpenLightbox?.(activeAchievement.image)}
              data-cursor-label="XEM ẢNH"
              style={{
                aspectRatio: `${activeAchievement.width || 960} / ${
                  activeAchievement.height || 1280
                }`,
              }}
              className="relative w-full md:w-[44%] max-h-[420px] overflow-hidden rounded-[14px] bg-plum-deep cursor-pointer group shrink-0 border border-plum-deep/15 shadow-md"
            >
              <motion.img
                key={activeAchievement.image}
                initial={{ scale: 1.02, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4 }}
                src={activeAchievement.image}
                alt={activeAchievement.title}
                className="w-full h-full object-contain bg-plum-deep transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </div>

            <div className="relative md:w-[56%] p-2 sm:p-3 flex flex-col justify-between self-stretch">
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-2 text-xs font-display font-bold uppercase tracking-[0.2em] text-plum-deep/70">
                  <span className="w-3.5 h-3.5 bg-gold mask-four-star inline-block" />
                  {activeAchievement.tag}
                </span>
                <button
                  type="button"
                  onClick={() => onOpenLightbox?.(activeAchievement.image)}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-plum-deep/10 hover:bg-plum-deep hover:text-gold text-plum-deep text-[11px] font-display font-bold uppercase tracking-wider transition-colors cursor-pointer"
                  title="Phóng to ảnh gốc"
                >
                  <Maximize2 className="w-3 h-3" />
                  <span>Phóng to</span>
                </button>
              </div>

              <div className="my-4 space-y-3">
                <h3 className="font-display font-black uppercase text-2xl sm:text-3xl leading-tight text-plum-deep">
                  {activeAchievement.title}
                </h3>
                <p className="font-serif italic text-base sm:text-lg text-plum-deep/80">
                  {activeAchievement.subtitle}
                </p>
                <p className="text-sm leading-relaxed text-plum-deep/85">
                  {activeAchievement.description}
                </p>

                <div className="pt-2 grid grid-cols-1 gap-2">
                  {activeAchievement.highlights.map((h, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-xs font-semibold text-plum-deep bg-plum-deep/5 px-3 py-2 rounded-xl border border-plum-deep/10"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-plum-deep/15 flex flex-wrap items-center justify-between gap-3">
                <Badge variant="secondary">{activeAchievement.stats}</Badge>
                {activeAchievement.link && (
                  <a
                    href={activeAchievement.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-plum-deep text-cream hover:bg-gold hover:text-plum-deep transition-colors text-xs font-display font-bold uppercase tracking-wider"
                  >
                    <span>{activeAchievement.linkLabel}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
        )}
      </div>

      {/* PART 2: Horizontal Exhibition of ALL 39 Project Artworks (Native Wheel + Drag + Auto-Glide) */}
      <div
        onMouseEnter={() => setIsHoveringTrack(true)}
        onMouseLeave={() => {
          setIsHoveringTrack(false);
          handleMouseUpOrLeave();
        }}
        className="py-12 bg-gradient-to-b from-plum-deep via-[#180D31] to-plum-deep border-y border-gold/25"
      >
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 mb-6 flex flex-col xl:flex-row xl:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-gold font-display font-bold uppercase tracking-[0.22em] text-xs mb-1.5">
              <Compass className="w-4 h-4" />
              <span>
                TRIỂN LÃM NGANG // TOÀN BỘ {allPortfolioArtworks.length} TÁC
                PHẨM TRONG 5 DỰ ÁN NHIẾP ẢNH
              </span>
            </div>
            <h3 className="font-display font-black uppercase text-2xl sm:text-4xl text-cream tracking-tight">
              LĂNG KÍNH NGHỆ THUẬT{' '}
              <span className="text-gold font-serif italic font-normal capitalize">
                Của Bảo Hân (@lop_thephotos)
              </span>
            </h3>
          </div>

          {/* Project Filter Tabs + Auto-Glide + Prev/Next Arrows */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={() => setSelectedProjectId('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-display font-bold uppercase tracking-wider transition-all cursor-pointer ${
                selectedProjectId === 'all'
                  ? 'bg-gold text-plum-deep shadow-md'
                  : 'bg-white/5 text-cream/75 hover:bg-white/15 border border-cream/15'
              }`}
            >
              Tất Cả ({allPortfolioArtworks.length} Ảnh)
            </button>

            {portfolioHighlights.map((proj) => (
              <button
                key={proj.id}
                type="button"
                onClick={() => setSelectedProjectId(proj.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-display font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  selectedProjectId === proj.id
                    ? 'bg-gold text-plum-deep shadow-md'
                    : 'bg-white/5 text-cream/75 hover:bg-white/15 border border-cream/15'
                }`}
              >
                {proj.code}. {proj.title} ({proj.gallery?.length || 0})
              </button>
            ))}

            <div className="flex items-center gap-1.5 ml-1">
              <button
                type="button"
                onClick={() =>
                  setExhibitionViewMode((m) =>
                    m === 'reel' ? 'depth3d' : 'reel'
                  )
                }
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-display font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  exhibitionViewMode === 'depth3d'
                    ? 'bg-gold text-plum-deep shadow-lg'
                    : 'bg-plum border border-gold/45 text-gold hover:bg-gold hover:text-plum-deep'
                }`}
                title="Chuyển đổi giữa Thanh Trượt Ngang và Vòng Xoay 3D + Khung Ngắm Máy Ảnh"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>
                  {exhibitionViewMode === 'depth3d'
                    ? 'Đang mở: Vòng Xoay 3D + Viewfinder'
                    : 'Bật Vòng Xoay 3D + Viewfinder'}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setAutoGlide((a) => !a)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-display font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                  autoGlide
                    ? 'bg-rose/20 text-rose border border-rose/40'
                    : 'bg-white/10 text-cream/70 hover:text-cream'
                }`}
                title="Bật/Tắt tự động trượt ngang"
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
                onClick={() => shiftByCard(-1)}
                className="p-2 rounded-full bg-white/10 hover:bg-gold hover:text-plum-deep text-cream transition-colors cursor-pointer"
                title="Trượt sang trái"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => shiftByCard(1)}
                className="p-2 rounded-full bg-white/10 hover:bg-gold hover:text-plum-deep text-cream transition-colors cursor-pointer"
                title="Trượt sang phải"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {exhibitionViewMode === 'depth3d' ? (
          <DepthCarouselWithViewfinder
            artworks={displayedArtworks}
            onOpenLightbox={onOpenLightbox}
          />
        ) : (
        <>
        {/* Horizontal Scrollable Track — 39 Project Artworks */}
        <div
          ref={viewportRef}
          onScroll={handleTrackScroll}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          className="w-full overflow-x-auto px-4 sm:px-8 lg:px-16 pb-4 cursor-grab active:cursor-grabbing no-scrollbar"
        >
          <div className="flex gap-6 lg:gap-7 w-max items-stretch">
            {displayedArtworks.map((art, idx) => {
              const imgW = art.width || (art.portrait ? 853 : 1280);
              const imgH = art.height || (art.portrait ? 1280 : 853);
              const targetImgHeight = 310;
              const computedImgWidth = Math.round(
                (imgW / imgH) * targetImgHeight
              );
              const cardWidth = Math.max(240, computedImgWidth + 28);

              return (
                <article
                  key={art.id}
                  onClick={() => onOpenLightbox?.(art.src)}
                  data-cursor-label="XEM TÁC PHẨM"
                  style={{
                    width: `${cardWidth}px`,
                    '--sway-dur': `${4.2 + (idx % 4) * 0.45}s`,
                    '--sway-delay': `-${(idx * 0.6).toFixed(2)}s`,
                  }}
                  className="photo-sway-soft group relative rounded-[22px] bg-cream text-plum-deep p-3.5 border-2 border-gold/60 shadow-[0_20px_60px_rgba(0,0,0,0.65)] cursor-pointer shrink-0 select-none flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1.5"
                >
                  {/* Top Header Strip Outside Photo (Zero Overlay on Image) */}
                  <div className="flex items-center justify-between gap-2 pb-2.5 px-1">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-display font-bold uppercase tracking-[0.14em] text-plum-deep/80">
                      <span className="w-2.5 h-2.5 bg-gold mask-four-star inline-block shrink-0" />
                      <span>
                        DỰ ÁN {art.projectCode} • ẢNH {art.indexLabel}
                      </span>
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenLightbox?.(art.src);
                      }}
                      className="p-1.5 rounded-full bg-plum-deep/10 text-plum-deep hover:bg-plum-deep hover:text-gold transition-colors cursor-pointer"
                      title="Phóng to tác phẩm"
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
                      src={art.src}
                      alt={`${art.projectTitle} - ${art.indexLabel}`}
                      loading="lazy"
                      draggable={false}
                      className="w-full h-full object-contain block"
                    />
                  </div>

                  {/* Bottom: Clean Editorial Caption Box */}
                  <div className="pt-3 px-1 pb-0.5 flex flex-col justify-between flex-1">
                    <div>
                      <div className="text-[10px] font-display font-bold uppercase tracking-[0.16em] text-plum-deep/65">
                        {art.category} • {art.year}
                      </div>
                      <h4 className="font-display font-black uppercase text-lg sm:text-xl text-plum-deep mt-0.5 leading-snug">
                        {art.projectTitle}
                      </h4>
                      <p className="text-xs text-plum-deep/80 mt-1 line-clamp-2 leading-relaxed">
                        {art.desc}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}

            {/* Final CTA Slide */}
            <div className="w-[310px] sm:w-[350px] rounded-[30px] border-2 border-dashed border-gold/50 bg-plum/60 p-8 flex flex-col justify-between shrink-0">
              <div className="w-12 h-12 rounded-2xl bg-gold/20 border border-gold/40 flex items-center justify-center text-gold">
                <Camera className="w-6 h-6" />
              </div>
              <div className="space-y-3 my-6">
                <span className="text-xs font-display font-bold uppercase tracking-[0.2em] text-gold">
                  PORTFOLIO CHÍNH THỨC
                </span>
                <h4 className="font-display font-black uppercase text-3xl text-cream leading-tight">
                  KHÁM PHÁ TOÀN BỘ TÁC PHẨM CỦA BẢO HÂN
                </h4>
                <p className="text-xs text-cream/75 leading-relaxed">
                  Xem trọn vẹn các dự án nhiếp ảnh, thiết kế truyền thông và hồ
                  sơ năng lực của Lưu Nguyễn Bảo Hân.
                </p>
              </div>
              <a
                href="https://luu-nguyen-bao-han.vercel.app/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-between px-5 py-3.5 rounded-full bg-gold text-plum-deep font-display font-bold uppercase text-xs tracking-wider hover:bg-cream transition-colors"
              >
                <span>Mở Portfolio</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Interactive Progress Bar (Clickable to scrub directly!) */}
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 mt-4 flex items-center gap-4">
          <span className="text-xs font-display font-bold uppercase tracking-[0.2em] text-gold flex items-center gap-1.5 shrink-0">
            <MoveRight className="w-4 h-4" />
            Lăn Chuột / Kéo Để Trượt Ngang
          </span>
          <div
            onClick={(e) => {
              const el = viewportRef.current;
              if (!el) return;
              const rect = e.currentTarget.getBoundingClientRect();
              const ratio = Math.min(
                1,
                Math.max(0, (e.clientX - rect.left) / rect.width)
              );
              const maxScroll = el.scrollWidth - el.clientWidth;
              setAutoGlide(false);
              el.scrollTo({ left: ratio * maxScroll, behavior: 'smooth' });
              targetScrollRef.current = ratio * maxScroll;
            }}
            className="flex-1 h-2.5 rounded-full bg-cream/15 overflow-hidden cursor-pointer relative"
            title="Chạm để tua nhanh đến vị trí bất kỳ"
          >
            <div
              className="h-full bg-gradient-to-r from-gold to-rose transition-all duration-100 rounded-full"
              style={{ width: `${Math.max(5, scrollProgress * 100)}%` }}
            />
          </div>
          <span className="font-display font-bold text-xs text-cream/85 shrink-0">
            {String(currentIndex).padStart(2, '0')} /{' '}
            {String(displayedArtworks.length).padStart(2, '0')} TÁC PHẨM
          </span>
        </div>
        </>
        )}
      </div>
    </section>
  );
}
