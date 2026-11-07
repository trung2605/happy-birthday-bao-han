import React, { useState, useRef, useEffect } from 'react';
import {
  Volume2,
  VolumeX,
  Cake,
  Award,
  Heart,
  Mail,
  Sparkles,
  Radio,
  Ticket,
} from 'lucide-react';
import SpookyIntro from './components/SpookyIntro/SpookyIntro';
import StarrySkyCanvas from './components/StarrySkyCanvas/StarrySkyCanvas';
import HeroBirthday from './components/HeroBirthday/HeroBirthday';
import CassetteVoicePlayer from './components/ReactBits/CassetteVoicePlayer';
import AchievementsBento from './components/AchievementsBento/AchievementsBento';
import LoveJourney from './components/LoveJourney/LoveJourney';
import LoveLetterAndCard from './components/LoveLetterAndCard/LoveLetterAndCard';
import ClickSpark from './components/ReactBits/ClickSpark';
import BirthdayVoucherBook from './components/ReactBits/TearTicket';
import { VinylMusicPlayer } from './components/ReactBits/VinylMusicPlayer';
import FloatingVoiceBar from './components/ReactBits/FloatingVoiceBar';
import BirthdayCakeCeremonyModal from './components/BirthdayCakeCeremonyModal/BirthdayCakeCeremonyModal';
import { VoiceProvider } from './context/VoiceContext';
import CustomCursor from './components/ui/CustomCursor';
import { Dialog, DialogContent, DialogTitle } from './components/ui/dialog';

export default function App() {
  const [introCompleted, setIntroCompleted] = useState(false);
  const [showCakeModal, setShowCakeModal] = useState(true);
  const [musicPlaying, setMusicPlaying] = useState(true);
  const [lightboxImage, setLightboxImage] = useState(null);
  const [activeSection, setActiveSection] = useState('hero');
  const bgmRef = useRef(null);

  useEffect(() => {
    bgmRef.current = new Audio('/audio/hbd.mp3');
    bgmRef.current.loop = true;
    bgmRef.current.volume = 0.55;

    return () => {
      if (bgmRef.current) {
        bgmRef.current.pause();
      }
    };
  }, []);

  useEffect(() => {
    if (!introCompleted) return;
    const sectionIds = [
      'hero',
      'cassette',
      'achievements',
      'love-journey',
      'vouchers',
      'letter',
    ];
    const handleScroll = () => {
      const scrollY = window.scrollY + 260;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollY) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [introCompleted]);

  const startCelebrationMusic = () => {
    if (bgmRef.current) {
      bgmRef.current.loop = true;
      bgmRef.current
        .play()
        .then(() => setMusicPlaying(true))
        .catch(() => {});
    }
  };

  const handleDuckCelebrationMusic = (ducked) => {
    if (!bgmRef.current) return;
    bgmRef.current.volume = ducked ? 0.18 : 0.55;
  };

  const handleCompleteIntro = () => {
    setIntroCompleted(true);
    setShowCakeModal(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    startCelebrationMusic();
  };

  const toggleMusic = () => {
    if (!bgmRef.current) return;
    if (musicPlaying) {
      bgmRef.current.pause();
      setMusicPlaying(false);
    } else {
      bgmRef.current
        .play()
        .then(() => setMusicPlaying(true))
        .catch(() => {});
    }
  };

  const handleReplayIntro = () => {
    if (bgmRef.current) {
      bgmRef.current.pause();
      bgmRef.current.currentTime = 0;
      setMusicPlaying(false);
    }
    setIntroCompleted(false);
  };

  return (
    <div className="min-h-screen bg-plum-deep text-cream selection:bg-gold selection:text-plum-deep relative">
      {/* Interactive Custom Cursor + React Bits ClickSpark */}
      <CustomCursor />
      <ClickSpark />

      {!introCompleted ? (
        <SpookyIntro
          onCompleteIntro={handleCompleteIntro}
          onStartCelebrationMusic={startCelebrationMusic}
          onDuckCelebrationMusic={handleDuckCelebrationMusic}
        />
      ) : (
        <>
          {/* Starry Sky + Falling Rose Petals Canvas Background */}
          <StarrySkyCanvas />

          {/* Floating Editorial Navigation Pill Bar */}
          <header className="fixed top-4 inset-x-0 z-40 flex justify-center px-4 pointer-events-none">
            <nav className="pointer-events-auto flex items-center gap-1 sm:gap-1.5 px-3 py-2 rounded-full bg-plum-deep/90 border border-gold/40 backdrop-blur-xl shadow-[0_14px_45px_rgba(0,0,0,0.72)]">
              <a
                href="#hero"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-display font-bold uppercase tracking-wider transition-all ${
                  activeSection === 'hero'
                    ? 'bg-gold/20 text-gold border border-gold/45'
                    : 'text-cream hover:text-plum-deep hover:bg-gold'
                }`}
              >
                <Cake className="w-3.5 h-3.5 text-gold" />
                <span className="hidden sm:inline">Sinh Nhật 3D</span>
              </a>
              <a
                href="#cassette"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-display font-bold uppercase tracking-wider transition-all ${
                  activeSection === 'cassette'
                    ? 'bg-gold/20 text-gold border border-gold/45'
                    : 'text-cream hover:text-plum-deep hover:bg-gold'
                }`}
              >
                <Radio className="w-3.5 h-3.5 text-rose" />
                <span className="hidden sm:inline">Băng Cassette</span>
              </a>
              <a
                href="#achievements"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-display font-bold uppercase tracking-wider transition-all ${
                  activeSection === 'achievements'
                    ? 'bg-gold/20 text-gold border border-gold/45'
                    : 'text-cream hover:text-plum-deep hover:bg-gold'
                }`}
              >
                <Award className="w-3.5 h-3.5 text-gold" />
                <span className="hidden sm:inline">Tuổi 18 Rực Rỡ</span>
              </a>
              <a
                href="#love-journey"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-display font-bold uppercase tracking-wider transition-all ${
                  activeSection === 'love-journey'
                    ? 'bg-gold/20 text-gold border border-gold/45'
                    : 'text-cream hover:text-plum-deep hover:bg-gold'
                }`}
              >
                <Heart className="w-3.5 h-3.5 text-rose" />
                <span className="hidden md:inline">1 Năm Yêu Nhau</span>
              </a>
              <a
                href="#vouchers"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-display font-bold uppercase tracking-wider transition-all ${
                  activeSection === 'vouchers'
                    ? 'bg-gold/20 text-gold border border-gold/45'
                    : 'text-cream hover:text-plum-deep hover:bg-gold'
                }`}
              >
                <Ticket className="w-3.5 h-3.5 text-gold" />
                <span className="hidden lg:inline">5 Vé Đặc Quyền</span>
              </a>
              <a
                href="#letter"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-display font-bold uppercase tracking-wider transition-all ${
                  activeSection === 'letter'
                    ? 'bg-gold/20 text-gold border border-gold/45'
                    : 'text-cream hover:text-plum-deep hover:bg-gold'
                }`}
              >
                <Mail className="w-3.5 h-3.5 text-gold" />
                <span className="hidden md:inline">Thư Tay</span>
              </a>

              <div className="h-4 w-px bg-cream/15 mx-1" />

              <button
                type="button"
                onClick={toggleMusic}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-display font-bold uppercase tracking-wider transition-all ${
                  musicPlaying
                    ? 'bg-gold text-plum-deep shadow-md shadow-gold/25'
                    : 'bg-white/10 text-cream/75 hover:text-cream'
                }`}
                title="Bật/Tắt nhạc Happy Birthday"
              >
                {musicPlaying ? (
                  <>
                    <Volume2 className="w-3.5 h-3.5 animate-pulse" />
                    <span>Nhạc: Bật</span>
                  </>
                ) : (
                  <>
                    <VolumeX className="w-3.5 h-3.5" />
                    <span>Nhạc: Tắt</span>
                  </>
                )}
              </button>
            </nav>
          </header>

          {/* 3D Birthday Cake Blowing Ceremony Modal over the Starry Celebration Website */}
          <BirthdayCakeCeremonyModal
            isOpen={showCakeModal}
            onClose={() => setShowCakeModal(false)}
            onStartCelebrationMusic={startCelebrationMusic}
          />

          {/* Main Celebration Sections wrapped with Unified Voice Audio Provider */}
          <VoiceProvider
            onDuckCelebrationMusic={handleDuckCelebrationMusic}
            onEnsureBgmPlaying={startCelebrationMusic}
          >
            <main className="relative z-10 pb-16">
              <HeroBirthday
                onOpenLightbox={setLightboxImage}
                onOpenCakeCeremony={() => setShowCakeModal(true)}
              />
              <CassetteVoicePlayer />
              <AchievementsBento onOpenLightbox={setLightboxImage} />
              <LoveJourney onOpenLightbox={setLightboxImage} />
              <BirthdayVoucherBook />
              <LoveLetterAndCard onReplayIntro={handleReplayIntro} />
            </main>

            {/* Global Floating Voice Player Bar — follows Bảo Hân across the entire site */}
            <FloatingVoiceBar />
          </VoiceProvider>

          {/* Spinning Vinyl Record Background Music Controller */}
          <VinylMusicPlayer
            musicMuted={!musicPlaying}
            onToggleMute={toggleMusic}
          />

          {/* Footer */}
          <footer className="relative z-10 pt-12 pb-24 px-4 border-t border-gold/20 text-center bg-plum-deep/90 backdrop-blur-md">
            <div className="max-w-4xl mx-auto flex flex-col items-center gap-3">
              <div className="inline-flex items-center gap-2 text-gold font-script text-3xl">
                <Sparkles className="w-4 h-4" />
                <span>Happy 19th Birthday Lưu Nguyễn Bảo Hân</span>
                <Sparkles className="w-4 h-4" />
              </div>
              <p className="text-xs font-display font-bold uppercase tracking-[0.2em] text-cream/60">
                08/11/2007 — 08/11/2026 • Made with love by Anh Trung (Đà Nẵng —
                Sài Gòn)
              </p>
            </div>
          </footer>

          {/* Shadcn Radix Dialog Fullscreen Lightbox */}
          <Dialog
            open={Boolean(lightboxImage)}
            onOpenChange={(open) => {
              if (!open) setLightboxImage(null);
            }}
          >
            <DialogContent>
              <DialogTitle className="sr-only">
                Xem ảnh kỷ niệm Lưu Nguyễn Bảo Hân
              </DialogTitle>
              {lightboxImage && (
                <div className="flex flex-col items-center gap-3 pt-2">
                  <div className="flex items-center justify-between gap-4 px-4 py-1.5 mr-10 rounded-full bg-plum-deep/90 border border-gold/40 text-[11px] font-display font-bold uppercase tracking-[0.18em] text-gold">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      AF-C • EYE DETECT [BẢO HÂN]
                    </span>
                    <span className="hidden sm:inline text-cream/75">
                      RAW 14-BIT • 50MM F/1.4 GM • @LOP_THEPHOTOS
                    </span>
                  </div>
                  <img
                    src={lightboxImage}
                    alt="Kỷ niệm Bảo Hân"
                    className="max-w-full max-h-[80vh] rounded-2xl object-contain border-2 border-gold/50 shadow-[0_25px_80px_rgba(0,0,0,0.85)]"
                  />
                </div>
              )}
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  );
}
