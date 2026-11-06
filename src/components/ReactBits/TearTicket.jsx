import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Scissors,
  Ticket,
  Sparkles,
  CheckCircle2,
  RotateCcw,
  Plane,
  Camera,
  Coffee,
  Heart,
  Crown,
} from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { FlyingButton } from './HoloCard';

const VOUCHERS = [
  {
    id: 'voucher-01',
    code: 'BUN-19-MILKTEA',
    number: '01',
    category: 'ĐẶC QUYỀN ẨM THỰC & TRÀ SỮA',
    title: 'Trà Sữa & Đồ Ngọt Không Giới Hạn',
    desc: '100% Free फुल Topping mọi lúc cô Thỏ nhỏ thèm đồ ngọt, đi học ở WSU về mệt hoặc thức khuya hậu kỳ ảnh cho khách.',
    route: 'ĐÀ NẴNG ⇄ SÀI GÒN',
    validity: 'HIỆU LỰC VĨNH VIỄN • TUỔI 19',
    icon: Coffee,
    accent: 'from-amber-400/20 via-gold/10 to-plum',
  },
  {
    id: 'voucher-02',
    code: 'BUN-19-PHOTO-ASSIST',
    number: '02',
    category: 'ĐẶC QUYỀN @LOP_THEPHOTOS',
    title: 'Phụ Tá Nhiếp Ảnh Gia Toàn Thời Gian',
    desc: 'Anh Trung sẵn sàng xách túi máy ảnh, cầm hắt sáng, chở Bảo Hân đi săn ảnh khắp mọi góc phố và làm mẫu ảnh độc quyền.',
    route: 'STUDIO & STREET',
    validity: 'ƯU TIÊN SỐ 1 • 24/7',
    icon: Camera,
    accent: 'from-rose/20 via-pink-500/10 to-plum',
  },
  {
    id: 'voucher-03',
    code: 'BUN-19-FLIGHT-HUG',
    number: '03',
    category: 'VÉ MÁY BAY ĐẶC BIỆT DAD ✈ SGN',
    title: 'Chuyến Bay Vào Sài Gòn Ôm Bún Thật Chặt',
    desc: 'Quy đổi ngay những cái ôm ấm áp, nắm tay đi tàu Metro Bến Thành – Suối Tiên và dạo phố bù đắp mọi ngày yêu xa.',
    route: 'DAD ✈ SGN • GATE 19',
    validity: 'KHÔNG GIỚI HẠN SỐ LẦN',
    icon: Plane,
    accent: 'from-sky-400/20 via-indigo-500/10 to-plum',
  },
  {
    id: 'voucher-04',
    code: 'BUN-19-PRINCESS-DAY',
    number: '04',
    category: 'ĐẶC QUYỀN HẸN HÒ THEO Ý EM',
    title: 'Một Ngày Hẹn Hò 100% Do Bảo Hân Đạo Diễn',
    desc: 'Đi Bảo tàng nghệ thuật, Thảo Cầm Viên, chụp Photobooth hay ăn món em thích — mọi lịch trình đều chiều theo ý công chúa nhỏ.',
    route: 'SÀI GÒN • ĐÀ NẴNG',
    validity: 'VIP PASS • BẢO HÂN 19',
    icon: Crown,
    accent: 'from-purple-400/20 via-gold/10 to-plum',
  },
  {
    id: 'voucher-05',
    code: 'BUN-19-ALWAYS-WIN',
    number: '05',
    category: 'ĐẶC QUYỀN TỐI THƯỢNG',
    title: 'Luôn Được Anh Trung Nhường & Dỗ Ngọt Ngay Lập Tức',
    desc: 'Bất kể lúc nào Bảo Hân dỗi hay mệt mỏi trong kỳ thực tập tại AEON, sử dụng vé này để được dỗ dành và thắng 100% mọi cuộc tranh luận.',
    route: 'TRÁI TIM ANH TRUNG',
    validity: 'TRỌN ĐỜI • 365+ NGÀY',
    icon: Heart,
    accent: 'from-rose/25 via-amber-400/15 to-plum',
  },
];

/**
 * React Bits — TearTicket Micro Component
 * Interactive perforated ticket where clicking or dragging the right stub tears it off!
 */
function TearTicketCard({ voucher, isTorn, onTear, onRestore }) {
  const IconComp = voucher.icon;

  return (
    <div className="relative flex flex-col sm:flex-row items-stretch select-none group">
      {/* Left Main Ticket Body */}
      <div
        onClick={() => !isTorn && onTear(voucher.id)}
        className={`relative flex-1 rounded-t-[24px] sm:rounded-l-[24px] sm:rounded-tr-none bg-cream text-plum-deep p-5 sm:p-6 border-2 border-gold/65 shadow-[0_18px_50px_rgba(0,0,0,0.55)] transition-all cursor-pointer overflow-hidden ${
          isTorn ? 'ring-2 ring-gold' : 'hover:border-gold'
        }`}
      >
        {/* Top/Bottom Perforation Cutout Notches on the seam */}
        <div
          aria-hidden="true"
          className="hidden sm:block absolute -right-3.5 -top-3.5 w-7 h-7 rounded-full bg-plum-deep border-2 border-gold/60 z-20"
        />
        <div
          aria-hidden="true"
          className="hidden sm:block absolute -right-3.5 -bottom-3.5 w-7 h-7 rounded-full bg-plum-deep border-2 border-gold/60 z-20"
        />

        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="inline-flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-plum-deep text-gold font-display font-black text-xs tracking-wider">
              VÉ #{voucher.number}
            </span>
            <span className="text-[11px] font-display font-bold uppercase tracking-[0.18em] text-plum-deep/70">
              {voucher.category}
            </span>
          </div>

          <span className="text-[11px] font-mono font-bold text-plum-deep/60 bg-plum-deep/5 px-2.5 py-0.5 rounded-md border border-plum-deep/10">
            {voucher.route}
          </span>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-plum-deep text-gold flex items-center justify-center shrink-0 shadow-md">
            <IconComp className="w-6 h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-display font-black uppercase text-xl sm:text-2xl text-plum-deep leading-tight">
              {voucher.title}
            </h4>
            <p className="text-xs sm:text-sm text-plum-deep/80 mt-1.5 leading-relaxed">
              {voucher.desc}
            </p>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-dashed border-plum-deep/20 flex flex-wrap items-center justify-between gap-2 text-[11px] font-display font-bold uppercase tracking-wider text-plum-deep/70">
          <span>NGƯỜI NHẬN: LƯU NGUYỄN BẢO HÂN (08.11.2007)</span>
          <span className="text-amber-700">{voucher.validity}</span>
        </div>
      </div>

      {/* Perforated Dashed Divider Line */}
      <div className="relative flex sm:flex-col items-center justify-center bg-cream/90 px-2 sm:px-0 py-1 sm:py-3 border-x-2 sm:border-x-0 sm:border-y-2 border-gold/65">
        <div className="w-full sm:w-[2px] h-[2px] sm:h-full border-t-2 sm:border-t-0 sm:border-l-2 border-dashed border-plum-deep/35" />
        <Scissors className="w-4 h-4 text-plum-deep/60 absolute bg-cream rounded-full p-0.5 sm:-rotate-90" />
      </div>

      {/* Right Tearable Ticket Stub (React Bits Tear Ticket Micro-Interaction) */}
      <motion.div
        onClick={() => (isTorn ? onRestore(voucher.id) : onTear(voucher.id))}
        animate={
          isTorn
            ? {
                rotateZ: 11,
                x: 18,
                y: 10,
                scale: 0.96,
              }
            : {
                rotateZ: 0,
                x: 0,
                y: 0,
                scale: 1,
              }
        }
        whileHover={!isTorn ? { rotateZ: 3, x: 4 } : { scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 16 }}
        style={{ transformOrigin: 'bottom left' }}
        className={`relative sm:w-[215px] rounded-b-[24px] sm:rounded-r-[24px] sm:rounded-bl-none p-5 flex flex-col justify-between items-center text-center cursor-pointer border-2 transition-colors ${
          isTorn
            ? 'bg-plum-deep text-gold border-gold shadow-[0_18px_45px_rgba(252,188,91,0.3)]'
            : 'bg-[#f6e3ce] text-plum-deep border-gold/65 hover:bg-gold/30'
        }`}
      >
        <div className="text-[10px] font-mono uppercase tracking-[0.2em] opacity-75">
          {voucher.code}
        </div>

        {/* SVG Barcode */}
        <svg
          viewBox="0 0 120 32"
          className="w-28 h-8 my-2 fill-current opacity-80"
          aria-hidden="true"
        >
          {[
            2, 6, 9, 14, 18, 21, 27, 31, 35, 41, 44, 49, 55, 58, 63, 68, 72, 77,
            82, 85, 90, 96, 100, 105, 110, 114,
          ].map((x, idx) => (
            <rect
              key={idx}
              x={x}
              y="2"
              width={idx % 3 === 0 ? '3' : '1.5'}
              height="28"
              rx="0.5"
            />
          ))}
        </svg>

        {isTorn ? (
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1 text-xs font-display font-black uppercase tracking-wider text-gold">
              <CheckCircle2 className="w-4 h-4 text-rose" />
              <span>ĐÃ XÉ VÉ NHẬN QUÀ</span>
            </div>
            <p className="text-[10px] text-cream/75">
              Chạm để dán lại cuống vé
            </p>
          </div>
        ) : (
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-plum-deep text-gold text-xs font-display font-bold uppercase tracking-wider">
              <Scissors className="w-3.5 h-3.5" />
              <span>Chạm Để Xé Vé</span>
            </div>
            <p className="text-[10px] text-plum-deep/70 font-medium">
              Mở khóa đặc quyền tuổi 19
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default function BirthdayVoucherBook() {
  const [tornIds, setTornIds] = useState(['voucher-01']);

  const handleTear = (id) => {
    if (!tornIds.includes(id)) {
      setTornIds((prev) => [...prev, id]);
      confetti({
        particleCount: 55,
        spread: 70,
        origin: { y: 0.65 },
        colors: ['#FCBC5B', '#FF7EB6', '#FFEEDF'],
      });
    }
  };

  const handleRestore = (id) => {
    setTornIds((prev) => prev.filter((item) => item !== id));
  };

  const handleTearAll = () => {
    setTornIds(VOUCHERS.map((v) => v.id));
    confetti({
      particleCount: 110,
      spread: 95,
      origin: { y: 0.6 },
      colors: ['#FCBC5B', '#FF7EB6', '#FFEEDF', '#A78BFA'],
    });
  };

  return (
    <section id="vouchers" className="relative z-10 py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-gold font-display font-bold uppercase tracking-[0.22em] text-xs mb-2">
              <Ticket className="w-4 h-4 text-rose" />
              <span>REACT BITS TEAR TICKET // SỔ VÉ ĐẶC QUYỀN TUỔI 19</span>
            </div>
            <h2 className="font-display font-black uppercase text-4xl sm:text-6xl text-cream tracking-tight leading-[0.95]">
              5 TẤM VÉ ĐẶC QUYỀN <br />
              <span className="text-gold font-serif italic font-normal capitalize">
                Anh Trung Dành Tặng Bảo Hân
              </span>
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="gold" className="py-1.5 px-3.5">
              Đã kích hoạt: {tornIds.length} / {VOUCHERS.length} vé
            </Badge>
            {tornIds.length < VOUCHERS.length ? (
              <FlyingButton variant="gold" onClick={handleTearAll}>
                <Scissors className="w-3.5 h-3.5" />
                <span>Xé Toàn Bộ 5 Vé Đặc Quyền</span>
              </FlyingButton>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setTornIds([])}
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Dán Lại Tất Cả Cuống Vé</span>
              </Button>
            )}
          </div>
        </div>

        <div className="space-y-6">
          {VOUCHERS.map((voucher) => (
            <TearTicketCard
              key={voucher.id}
              voucher={voucher}
              isTorn={tornIds.includes(voucher.id)}
              onTear={handleTear}
              onRestore={handleRestore}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
