import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Briefcase,
  Camera,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  ExternalLink,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Focus,
  Grid,
  Aperture,
} from 'lucide-react';
import { Badge } from '../ui/badge';

const ICON_MAP = {
  briefcase: Briefcase,
  camera: Camera,
  graduation: GraduationCap,
  sparkles: Sparkles,
};

/**
 * React Bits — Accordion Gallery / Flex Carousel for the 4 Proud Milestones
 */
export function AccordionMilestoneGallery({
  items,
  activeId,
  onSelect,
  onOpenLightbox,
}) {
  return (
    <div className="flex flex-col lg:flex-row gap-3.5 w-full min-h-[460px] mb-14">
      {items.map((item, idx) => {
        const IconComp = ICON_MAP[item.icon] || Sparkles;
        const isExpanded = item.id === activeId;
        const imgW = item.width || 960;
        const imgH = item.height || 1280;

        return (
          <motion.div
            key={item.id}
            layout
            onClick={() => onSelect(item.id)}
            onMouseEnter={() => onSelect(item.id)}
            transition={{ type: 'spring', stiffness: 240, damping: 26 }}
            className={`relative rounded-[26px] overflow-hidden border-2 cursor-pointer transition-colors flex flex-col ${
              isExpanded
                ? 'lg:flex-[3.6] bg-cream text-plum-deep border-gold shadow-[0_24px_70px_rgba(252,188,91,0.28)]'
                : 'lg:flex-[0.85] bg-plum/85 text-cream border-cream/15 hover:border-gold/55'
            }`}
          >
            {isExpanded ? (
              <div className="p-4 sm:p-5 flex flex-col md:flex-row items-center gap-5 h-full">
                {/* Left: 100% Uncropped Native Aspect Ratio Photo */}
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenLightbox?.(item.image);
                  }}
                  style={{
                    aspectRatio: `${imgW} / ${imgH}`,
                  }}
                  className="relative w-full md:w-[42%] max-h-[390px] overflow-hidden rounded-[16px] bg-plum-deep shrink-0 border border-plum-deep/15 shadow-lg group"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-contain block transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>

                {/* Right: Expanded Editorial Content */}
                <div className="flex-1 flex flex-col justify-between self-stretch py-1">
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-2 text-xs font-display font-bold uppercase tracking-[0.18em] text-plum-deep/70">
                        <span className="w-3 h-3 bg-gold mask-four-star inline-block" />
                        0{idx + 1} // {item.tag}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenLightbox?.(item.image);
                        }}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-plum-deep/10 hover:bg-plum-deep hover:text-gold text-plum-deep text-[11px] font-display font-bold uppercase tracking-wider transition-colors cursor-pointer"
                      >
                        <Maximize2 className="w-3 h-3" />
                        <span>Phóng to</span>
                      </button>
                    </div>

                    <h3 className="font-display font-black uppercase text-2xl sm:text-3xl text-plum-deep mt-2 leading-tight">
                      {item.title}
                    </h3>
                    <p className="font-serif italic text-base text-plum-deep/80 mt-0.5">
                      {item.subtitle}
                    </p>
                    <p className="text-xs sm:text-sm text-plum-deep/85 mt-2.5 leading-relaxed">
                      {item.description}
                    </p>

                    <div className="mt-3 grid grid-cols-1 gap-1.5">
                      {item.highlights.map((h, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 text-xs font-semibold text-plum-deep bg-plum-deep/5 px-3 py-1.5 rounded-xl border border-plum-deep/10"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 mt-3 border-t border-plum-deep/15 flex flex-wrap items-center justify-between gap-2">
                    <Badge variant="secondary">{item.stats}</Badge>
                    {item.link && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-plum-deep text-cream hover:bg-gold hover:text-plum-deep transition-colors text-xs font-display font-bold uppercase tracking-wider"
                      >
                        <span>{item.linkLabel}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              /* Collapsed Vertical Accordion Pillar */
              <div className="p-5 flex lg:flex-col items-center lg:items-start justify-between h-full gap-4">
                <div className="flex items-center justify-between w-full">
                  <span className="font-display font-black text-3xl text-gold">
                    0{idx + 1}
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-gold/15 border border-gold/35 flex items-center justify-center text-gold">
                    <IconComp className="w-4 h-4" />
                  </div>
                </div>

                <div className="flex-1 lg:my-auto flex flex-col justify-center">
                  <span className="text-[10px] font-display font-bold uppercase tracking-[0.2em] text-gold/80">
                    {item.tag}
                  </span>
                  <h4 className="font-display font-black uppercase text-lg sm:text-xl text-cream mt-1 leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-xs text-cream/65 mt-1 line-clamp-2">
                    {item.subtitle}
                  </p>
                </div>

                <div className="hidden lg:block w-full pt-3 border-t border-cream/10 text-[11px] font-display font-bold uppercase tracking-wider text-gold/80">
                  Rê chuột để mở rộng →
                </div>
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}

/**
 * React Bits — 3D Depth Carousel + @lop_thephotos Camera Viewfinder HUD
 */
export function DepthCarouselWithViewfinder({ artworks, onOpenLightbox }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showGrid, setShowGrid] = useState(true);
  const [shutterFlash, setShutterFlash] = useState(false);

  const total = artworks.length;
  const currentArt = artworks[activeIndex] || artworks[0];

  const step = (dir) => {
    setActiveIndex((prev) => (prev + dir + total) % total);
  };

  const triggerShutter = () => {
    setShutterFlash(true);
    setTimeout(() => setShutterFlash(false), 260);
  };

  // Get 5 visible cards around activeIndex (-2, -1, 0, +1, +2)
  const offsets = [-2, -1, 0, 1, 2];

  const EXIF_PRESETS = [
    { iso: 'ISO 100', lens: '50mm f/1.4 GM', shutter: '1/640s', wb: '5400K' },
    { iso: 'ISO 160', lens: '85mm f/1.4 Art', shutter: '1/800s', wb: '5200K' },
    { iso: 'ISO 200', lens: '35mm f/1.4 GM', shutter: '1/500s', wb: '5600K' },
    { iso: 'ISO 125', lens: '24-70mm f/2.8', shutter: '1/1000s', wb: '5300K' },
  ];
  const exif = EXIF_PRESETS[activeIndex % EXIF_PRESETS.length];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="relative rounded-[30px] bg-plum-deep/95 border-2 border-gold/45 p-4 sm:p-7 shadow-[0_28px_80px_rgba(0,0,0,0.75)] overflow-hidden">
        {/* Camera Shutter Flash Effect */}
        <AnimatePresence>
          {shutterFlash && (
            <motion.div
              initial={{ opacity: 0.95 }}
              animate={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="pointer-events-none absolute inset-0 z-50 bg-white"
            />
          )}
        </AnimatePresence>

        {/* Top Camera Viewfinder HUD Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-gold/20 font-mono text-xs text-cream/85">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-rose/20 border border-rose/50 text-rose font-bold">
              <span className="w-2 h-2 rounded-full bg-rose animate-ping" />
              REC • @LOP_THEPHOTOS
            </span>
            <span className="px-2 py-0.5 rounded bg-white/10 text-gold font-bold">
              AF-C • EYE DETECT [BẢO HÂN]
            </span>
            <span className="hidden sm:inline text-cream/65">
              RAW 14-BIT • {currentArt.width || 1280}×{currentArt.height || 853}
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <span className="px-2.5 py-1 rounded bg-white/5 border border-cream/15 text-gold">
              {exif.lens}
            </span>
            <span className="px-2.5 py-1 rounded bg-white/5 border border-cream/15">
              {exif.shutter}
            </span>
            <span className="px-2.5 py-1 rounded bg-white/5 border border-cream/15">
              {exif.iso}
            </span>
            <button
              type="button"
              onClick={() => setShowGrid((g) => !g)}
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded border text-xs cursor-pointer transition-colors ${
                showGrid
                  ? 'bg-gold text-plum-deep border-gold font-bold'
                  : 'bg-white/5 text-cream/70 border-cream/20'
              }`}
              title="Bật/Tắt lưới bố cục 1/3"
            >
              <Grid className="w-3.5 h-3.5" />
              <span>Grid 1/3</span>
            </button>
          </div>
        </div>

        {/* 3D Depth Carousel Stage */}
        <div
          className="relative h-[380px] sm:h-[440px] flex items-center justify-center overflow-hidden select-none"
          style={{ perspective: '1300px' }}
        >
          {/* Optional Rule-of-Thirds Viewfinder Grid */}
          {showGrid && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-4 z-20 border border-gold/25 rounded-2xl grid grid-cols-3 grid-rows-3"
            >
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="border border-gold/10" />
              ))}
              {/* Center AF Focus Bracket */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 border-2 border-gold/70 rounded-lg flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-rose" />
              </div>
            </div>
          )}

          {offsets.map((offset) => {
            const idx = (activeIndex + offset + total) % total;
            const art = artworks[idx];
            const isCenter = offset === 0;
            const imgW = art.width || (art.portrait ? 853 : 1280);
            const imgH = art.height || (art.portrait ? 1280 : 853);

            return (
              <motion.div
                key={`${art.id}-${offset}`}
                initial={false}
                animate={{
                  x: offset * 245,
                  z: -Math.abs(offset) * 160,
                  rotateY: offset * -22,
                  scale: isCenter ? 1 : 0.82 - Math.abs(offset) * 0.08,
                  opacity: isCenter ? 1 : 0.55 - Math.abs(offset) * 0.15,
                }}
                transition={{ type: 'spring', stiffness: 240, damping: 26 }}
                onClick={() => {
                  if (isCenter) {
                    onOpenLightbox?.(art.src);
                  } else {
                    setActiveIndex(idx);
                  }
                }}
                style={{
                  zIndex: 30 - Math.abs(offset) * 5,
                  transformStyle: 'preserve-3d',
                }}
                className={`absolute cursor-pointer rounded-[22px] bg-cream text-plum-deep p-3 border-2 ${
                  isCenter
                    ? 'border-gold shadow-[0_25px_75px_rgba(252,188,91,0.4)]'
                    : 'border-gold/40'
                }`}
              >
                <div
                  style={{
                    height: '295px',
                    aspectRatio: `${imgW} / ${imgH}`,
                  }}
                  className="relative overflow-hidden rounded-[12px] bg-plum-deep"
                >
                  <img
                    src={art.src}
                    alt={art.projectTitle}
                    draggable={false}
                    className="w-full h-full object-contain block"
                  />
                </div>
                <div className="pt-2.5 px-1.5 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-display font-bold uppercase tracking-[0.16em] text-plum-deep/70 block">
                      DỰ ÁN {art.projectCode} • ẢNH {art.indexLabel}
                    </span>
                    <h4 className="font-display font-black uppercase text-base sm:text-lg text-plum-deep">
                      {art.projectTitle}
                    </h4>
                  </div>
                  {isCenter && (
                    <span className="p-1.5 rounded-full bg-plum-deep text-gold">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Camera Controls Bar */}
        <div className="mt-4 pt-4 border-t border-gold/20 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => step(-1)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 hover:bg-gold hover:text-plum-deep text-cream text-xs font-display font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Tác phẩm trước</span>
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 hover:bg-gold hover:text-plum-deep text-cream text-xs font-display font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              <span>Tác phẩm tiếp</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={triggerShutter}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose text-plum-deep font-display font-bold uppercase text-xs tracking-wider shadow-[0_0_24px_rgba(255,126,182,0.4)] hover:scale-105 transition-transform cursor-pointer"
            >
              <Aperture className="w-4 h-4" />
              <span>Bấm Máy Chụp (Shutter Flash)</span>
            </button>
            <button
              type="button"
              onClick={() => onOpenLightbox?.(currentArt.src)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gold text-plum-deep font-display font-bold uppercase text-xs tracking-wider hover:bg-cream transition-colors cursor-pointer"
            >
              <Focus className="w-4 h-4" />
              <span>Xem Toàn Màn Hình ({activeIndex + 1}/{total})</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
