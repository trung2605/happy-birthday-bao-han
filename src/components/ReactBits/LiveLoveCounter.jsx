import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Heart,
  Clock,
  Calendar,
  Sparkles,
  Plane,
  Camera,
  Award,
} from 'lucide-react';
import { Badge } from '../ui/badge';
import { HoloCard, FlyingButton } from './HoloCard';

/**
 * React Bits — Code Slots / Split-Flap Digit Tile
 */
function SlotDigitBox({ value, label, sublabel, accent = 'gold' }) {
  const formatted = String(value).padStart(2, '0');
  const digits = formatted.split('');

  const accentBorder =
    accent === 'rose'
      ? 'border-rose/45 shadow-[0_14px_35px_rgba(255,126,182,0.18)]'
      : 'border-gold/45 shadow-[0_14px_35px_rgba(252,188,91,0.18)]';

  return (
    <div
      className={`relative rounded-2xl bg-plum-deep/90 border-2 ${accentBorder} p-3.5 sm:p-5 flex flex-col items-center justify-center overflow-hidden`}
    >
      {/* Top & bottom metallic slot rivets */}
      <div className="flex items-center gap-1.5 sm:gap-2 my-1">
        {digits.map((char, idx) => (
          <div
            key={idx}
            className="relative w-10 h-14 sm:w-14 sm:h-20 rounded-xl bg-gradient-to-b from-[#261447] via-[#150a2a] to-[#261447] border border-gold/35 shadow-inner flex items-center justify-center overflow-hidden"
          >
            {/* Split-flap horizontal center divider */}
            <div className="pointer-events-none absolute inset-x-0 top-1/2 h-[1px] bg-black/60 z-20" />
            <AnimatePresence mode="popLayout">
              <motion.span
                key={`${idx}-${char}`}
                initial={{ y: -26, opacity: 0, rotateX: -65 }}
                animate={{ y: 0, opacity: 1, rotateX: 0 }}
                exit={{ y: 26, opacity: 0, rotateX: 65 }}
                transition={{ duration: 0.26, ease: 'easeOut' }}
                className={`font-display font-black text-3xl sm:text-5xl tracking-tight ${
                  accent === 'rose' ? 'text-rose' : 'text-gold'
                }`}
              >
                {char}
              </motion.span>
            </AnimatePresence>
          </div>
        ))}
      </div>

      <span className="mt-2 font-display font-bold uppercase text-xs sm:text-sm tracking-[0.2em] text-cream">
        {label}
      </span>
      {sublabel && (
        <span className="text-[11px] text-cream/60 mt-0.5">{sublabel}</span>
      )}
    </div>
  );
}

export default function LiveLoveCounter() {
  const [mode, setMode] = useState('love'); // 'love' | 'age19'
  const [now, setNow] = useState(() => new Date());
  const [extraHeartbeats, setExtraHeartbeats] = useState(1908);

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Anniversary start: 05/11/2025 00:00:00+07:00
  const loveStart = new Date('2025-11-05T00:00:00+07:00');
  // Birthday birth date: 08/11/2007 00:00:00+07:00
  const birthStart = new Date('2007-11-08T00:00:00+07:00');

  const activeStart = mode === 'love' ? loveStart : birthStart;
  const diffMs = Math.max(0, now.getTime() - activeStart.getTime());
  const totalSeconds = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const totalHours = Math.floor(totalSeconds / 3600).toLocaleString('vi-VN');
  const totalMinutes = Math.floor(totalSeconds / 60).toLocaleString('vi-VN');

  const handleSendHeartbeat = () => {
    setExtraHeartbeats((c) => c + 19);
    confetti({
      particleCount: 40,
      spread: 65,
      origin: { y: 0.7 },
      colors: ['#FCBC5B', '#FF7EB6', '#FFEEDF'],
    });
  };

  return (
    <section id="live-counter" className="relative z-10 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <HoloCard
          intensity={5}
          borderRadius="32px"
          className="rounded-[32px] bg-gradient-to-br from-plum/90 via-[#1b0e36]/95 to-plum-deep/95 border-2 border-gold/40 p-6 sm:p-10 shadow-[0_28px_80px_rgba(0,0,0,0.65)]"
        >
          {/* Header Row */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-cream/10">
            <div>
              <div className="inline-flex items-center gap-2 text-gold font-display font-bold uppercase tracking-[0.22em] text-xs mb-2">
                <Clock className="w-4 h-4 text-rose" />
                <span>REACT BITS CODE SLOTS // ĐỒNG HỒ ĐẾM THỜI GIAN THỰC</span>
              </div>
              <h2 className="font-display font-black uppercase text-3xl sm:text-5xl text-cream tracking-tight leading-none">
                {mode === 'love' ? (
                  <>
                    TỪNG GIÂY BÊN NHAU{' '}
                    <span className="text-gold font-serif italic font-normal capitalize">
                      Trung & Bảo Hân
                    </span>
                  </>
                ) : (
                  <>
                    HÀNH TRÌNH TỎA SÁNG{' '}
                    <span className="text-rose font-serif italic font-normal capitalize">
                      Tuổi 19 Của Bảo Hân
                    </span>
                  </>
                )}
              </h2>
            </div>

            {/* Mode Switcher Tabs */}
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={() => setMode('love')}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-display font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  mode === 'love'
                    ? 'bg-gold text-plum-deep shadow-[0_0_25px_rgba(252,188,91,0.45)] scale-105'
                    : 'bg-white/5 text-cream/75 hover:bg-white/15 border border-cream/15'
                }`}
              >
                <Heart className="w-3.5 h-3.5 fill-current" />
                <span>Đếm Ngày Yêu (Từ 05.11.2025)</span>
              </button>
              <button
                type="button"
                onClick={() => setMode('age19')}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-display font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  mode === 'age19'
                    ? 'bg-rose text-plum-deep shadow-[0_0_25px_rgba(255,126,182,0.45)] scale-105'
                    : 'bg-white/5 text-cream/75 hover:bg-white/15 border border-cream/15'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Đếm Tuổi 19 (Từ 08.11.2007)</span>
              </button>
            </div>
          </div>

          {/* Main Code Slots / Split-Flap Counter Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 my-8">
            <SlotDigitBox
              value={days}
              label="NGÀY"
              sublabel={
                mode === 'love'
                  ? 'Thương nhớ đong đầy'
                  : 'Ngày rạng rỡ giữa đời'
              }
              accent={mode === 'love' ? 'gold' : 'rose'}
            />
            <SlotDigitBox
              value={hours}
              label="GIỜ"
              sublabel="Trôi qua từng khoảnh khắc"
              accent={mode === 'love' ? 'gold' : 'rose'}
            />
            <SlotDigitBox
              value={minutes}
              label="PHÚT"
              sublabel="Luôn hướng về nhau"
              accent={mode === 'love' ? 'gold' : 'rose'}
            />
            <SlotDigitBox
              value={seconds}
              label="GIÂY"
              sublabel="Đếm trực tiếp theo thời gian thực"
              accent={mode === 'love' ? 'rose' : 'gold'}
            />
          </div>

          {/* Bottom Micro Stats + Flying Button */}
          <div className="pt-6 border-t border-cream/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-cream/85">
              <Badge variant="gold" className="gap-1.5 py-1 px-3">
                <Plane className="w-3.5 h-3.5" />
                <span>ĐÀ NẴNG — SÀI GÒN</span>
              </Badge>
              <span>
                Tổng cộng:{' '}
                <strong className="text-gold font-display text-base">
                  {totalHours} giờ
                </strong>{' '}
                ({totalMinutes} phút)
              </span>
              <span className="hidden sm:inline text-cream/40">•</span>
              <span className="inline-flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-rose fill-rose animate-pulse" />
                <span>
                  Nhịp tim gửi tới Bún:{' '}
                  <strong className="text-rose font-display text-base">
                    {extraHeartbeats.toLocaleString('vi-VN')}
                  </strong>
                </span>
              </span>
            </div>

            <FlyingButton variant="gold" onClick={handleSendHeartbeat}>
              <Heart className="w-4 h-4 text-rose fill-rose" />
              <span>Thả Tim Chúc Mừng Tuổi 19 (+19 Nhịp Đập)</span>
            </FlyingButton>
          </div>
        </HoloCard>
      </div>
    </section>
  );
}
