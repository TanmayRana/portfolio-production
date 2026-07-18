// import React, { useState, useRef, useEffect } from "react";
// import { Hero as HeroType } from "@/lib/schema";
// import { Play } from "lucide-react";

// interface HeroProps {
//   data: HeroType | null;
//   loading: boolean;
//   error: string | null;
// }

// const ScrambleText = ({ text }: { text: string }) => {
//   const chars = "!@#$%^&*()_+~`|}{[]:;?><,./-=";
//   const phrases = text.split("|").map((s) => s.trim()).filter(Boolean);
//   const [displayText, setDisplayText] = useState("");

//   useEffect(() => {
//     if (phrases.length === 0) return;

//     let currentPhraseIndex = 0;
//     let iteration = 0;
//     let animationFrameId: number;
//     let timeoutId: NodeJS.Timeout;

//     const animate = () => {
//       const targetPhrase = phrases[currentPhraseIndex];

//       setDisplayText((prev) =>
//         targetPhrase
//           .split("")
//           .map((char, index) => {
//             if (index < iteration) {
//               return targetPhrase[index];
//             }
//             if (char === " ") return " ";
//             return chars[Math.floor(Math.random() * chars.length)];
//           })
//           .join("")
//       );

//       if (iteration < targetPhrase.length) {
//         iteration += 1 / 3;
//         setTimeout(() => {
//           animationFrameId = requestAnimationFrame(animate);
//         }, 30);
//       } else {
//         // Pause on the completed text, then move to the next phrase
//         timeoutId = setTimeout(() => {
//           iteration = 0;
//           currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
//           animationFrameId = requestAnimationFrame(animate);
//         }, 3000); // 3 seconds pause
//       }
//     };

//     animationFrameId = requestAnimationFrame(animate);

//     return () => {
//       cancelAnimationFrame(animationFrameId);
//       clearTimeout(timeoutId);
//     };
//   }, [text]);

//   return <span>{displayText || "\u00A0"}</span>;
// };

// const Hero = ({ data, loading, error }: HeroProps) => {
//   const [isPlaying, setIsPlaying] = useState(false);
//   const videoRef = useRef<HTMLVideoElement>(null);

//   if (loading) {
//     return (
//       <section className="h-screen w-full snap-start flex items-center justify-center bg-zinc-950 text-white">
//         <div className="animate-pulse">Loading hero...</div>
//       </section>
//     );
//   }

//   if (error || !data) {
//     return (
//       <section className="h-screen w-full snap-start flex items-center justify-center bg-zinc-950 text-white">
//         <h1 className="text-4xl font-bold">Hero Section (No data)</h1>
//       </section>
//     );
//   }

//   const { name, tagline, heroDescription, videoUrl } = data;

//   const handlePlayVideo = () => {
//     if (videoRef.current) {
//       videoRef.current.play();
//       setIsPlaying(true);
//     }
//   };

//   return (
//     <section className="relative h-screen w-full snap-start flex items-center justify-center bg-[#1c1c1a] text-white overflow-hidden">
//       {/* Background Video */}
//       {videoUrl && (
//         <video
//           ref={videoRef}
//           src={videoUrl}
//           className={`absolute inset-0 z-0 w-full h-full object-cover transition-opacity duration-1000 ${
//             isPlaying ? "opacity-100" : "opacity-0"
//           }`}
//           playsInline
//           loop
//           onEnded={() => setIsPlaying(false)}
//         />
//       )}

//       {/* Background Gradient overlay */}
//       <div
//         className={`absolute inset-0 z-0 bg-gradient-to-t from-[#141412] via-zinc-900/90 to-[#1c1c1a]/80 transition-opacity duration-1000 ${
//           isPlaying ? "opacity-40" : "opacity-80"
//         }`}
//       />

//       {/* Content Container */}
//       <div className="relative z-10 container mx-auto px-6 md:px-12 h-full flex flex-col justify-center pointer-events-none">
//         <div className="max-w-5xl relative z-20">
//           <p className="text-amber-500 font-bold tracking-widest text-xs md:text-sm mb-4 md:mb-6 uppercase drop-shadow-md">
//             Portfolio 2026
//           </p>
//           <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[10rem] font-black mb-4 md:mb-8 tracking-tighter leading-[0.9] drop-shadow-2xl">
//             {name.split(" ").map((word, i) => (
//               <span key={i} className="block">
//                 {word}
//               </span>
//             ))}
//           </h1>

//           <div className="flex flex-col gap-4 max-w-3xl">
//             <p className="text-zinc-300 text-xs sm:text-sm md:text-base font-bold tracking-[0.15em] sm:tracking-[0.2em] uppercase drop-shadow-md">
//               <ScrambleText text={tagline} />
//             </p>
//             <p className="text-zinc-400/90 text-sm md:text-lg lg:text-xl font-medium leading-relaxed drop-shadow-md max-w-2xl">
//               {heroDescription}
//             </p>
//           </div>
//         </div>

//         {/* Center Play Button */}
//         {videoUrl && !isPlaying && (
//           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-auto mt-10 md:mt-0">
//             <button
//               onClick={handlePlayVideo}
//               className="flex items-center justify-center w-20 h-20 md:w-28 md:h-28 rounded-full border border-white/20 bg-white/5 backdrop-blur-md hover:bg-white/10 hover:scale-105 transition-all cursor-pointer group shadow-2xl"
//             >
//               <Play className="w-8 h-8 md:w-10 md:h-10 text-white fill-white group-hover:scale-110 transition-transform ml-1 md:ml-2" />
//             </button>
//           </div>
//         )}

//         {/* Scroll Indicator */}
//         <div className="absolute bottom-6 md:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center z-20">
//           <span className="text-[9px] md:text-[11px] font-bold tracking-[0.3em] text-zinc-400 mb-3 md:mb-4 uppercase drop-shadow-md">
//             Scroll
//           </span>
//           <div className="w-[1px] h-8 md:h-16 bg-gradient-to-b from-zinc-400 to-transparent" />
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Hero;

import React, { useState, useRef, useEffect, useCallback } from "react";
import { Play } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface HeroData {
  name: string;
  tagline: string; // pipe-separated phrases e.g. "Full-Stack Dev | UI Engineer"
  heroDescription: string;
  videoUrl?: string | null;
}

interface HeroProps {
  data: HeroData | null;
  loading: boolean;
  error: string | null;
}

// ─── Particle System ─────────────────────────────────────────────────────────

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  o: number;
  pulse: number;
  warm: boolean;
}

function useParticles(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  containerRef: React.RefObject<HTMLElement | null>,
  mousePos: React.MutableRefObject<{ x: number; y: number }>,
) {
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const NUM = 60;
    let particles: Particle[] = [];
    let rafId: number;

    const init = () => {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
      particles = Array.from({ length: NUM }, (_, i) => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        r: Math.random() * 1.2 + 0.3,
        o: Math.random() * 0.35 + 0.05,
        pulse: Math.random() * Math.PI * 2,
        warm: i % 3 === 0,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += 0.018;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        const alpha = p.o * (0.7 + 0.3 * Math.sin(p.pulse));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.warm
          ? `rgba(212,168,67,${alpha})`
          : `rgba(200,200,195,${alpha * 0.55})`;
        ctx.fill();

        const mx = mousePos.current.x;
        const my = mousePos.current.y;
        const dxm = p.x - mx;
        const dym = p.y - my;
        const distM = Math.sqrt(dxm * dxm + dym * dym);

        if (distM < 130) {
          for (let j = i + 1; j < particles.length; j++) {
            const q = particles[j];
            const dx2 = p.x - q.x;
            const dy2 = p.y - q.y;
            const d2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
            if (d2 < 85) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(q.x, q.y);
              ctx.strokeStyle = `rgba(212,168,67,${0.07 * (1 - d2 / 85)})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }
      }

      rafId = requestAnimationFrame(draw);
    };

    const handleResize = () => init();
    window.addEventListener("resize", handleResize);
    init();
    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
    };
  }, [canvasRef, containerRef, mousePos]);
}

// ─── Scramble Text ────────────────────────────────────────────────────────────

const SCRAMBLE_CHARS = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

function ScrambleText({ text }: { text: string }) {
  const phrases = text
    .split("|")
    .map((s) => s.trim())
    .filter(Boolean);
  const [displayText, setDisplayText] = useState("\u00A0");

  useEffect(() => {
    if (phrases.length === 0) return;

    let phraseIndex = 0;
    let iter = 0;
    let rafId: number;
    let tid: ReturnType<typeof setTimeout>;

    const animate = () => {
      const target = phrases[phraseIndex];
      setDisplayText(
        target
          .split("")
          .map((ch, i) => {
            if (i < iter) return target[i];
            if (ch === " ") return " ";
            return SCRAMBLE_CHARS[
              Math.floor(Math.random() * SCRAMBLE_CHARS.length)
            ];
          })
          .join(""),
      );

      if (iter < target.length) {
        iter += 1 / 3;
        tid = setTimeout(() => {
          rafId = requestAnimationFrame(animate);
        }, 30);
      } else {
        tid = setTimeout(() => {
          iter = 0;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          rafId = requestAnimationFrame(animate);
        }, 3000);
      }
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(tid);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  return <span>{displayText}</span>;
}

// ─── Floating Info Card ───────────────────────────────────────────────────────

interface FloatingCardProps {
  label: string;
  dotColor: string;
  style: React.CSSProperties;
  animClass: string;
}

function FloatingCard({
  label,
  dotColor,
  style,
  animClass,
}: FloatingCardProps) {
  return (
    <div
      className={`absolute pointer-events-none ${animClass}`}
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "0.5px solid rgba(255,255,255,0.07)",
        borderRadius: 10,
        padding: "8px 14px",
        backdropFilter: "blur(8px)",
        fontSize: 10,
        color: "rgba(200,200,195,0.65)",
        letterSpacing: "0.1em",
        display: "flex",
        alignItems: "center",
        gap: 7,
        ...style,
      }}
    >
      <span
        style={{
          width: 5,
          height: 5,
          borderRadius: "50%",
          background: dotColor,
          flexShrink: 0,
        }}
      />
      {label}
    </div>
  );
}

// ─── Main Hero Component ──────────────────────────────────────────────────────

const Hero = ({ data, loading, error }: HeroProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isIdle, setIsIdle] = useState(true);
  // Track when the name fade-in finishes so we don't conflict animations
  const [nameVisible, setNameVisible] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const idleTimer = useRef<NodeJS.Timeout | undefined>(undefined);

  // Particle system
  useParticles(canvasRef, sectionRef, mousePos);

  // Mouse tracking for 3D tilt
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rx = ((e.clientY - rect.top - cy) / cy) * -5;
    const ry = ((e.clientX - rect.left - cx) / cx) * 6;
    setTilt({ x: rx, y: ry });
    setIsIdle(false);
    mousePos.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => setIsIdle(true), 2000);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    setIsIdle(true);
    clearTimeout(idleTimer.current);
  }, []);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  // ── Loading ──
  if (loading) {
    return (
      <section className="h-screen w-full snap-start flex items-center justify-center bg-[#0d0d0b] text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 rounded-full border border-amber-500/30 border-t-amber-500 animate-spin" />
          <p className="text-zinc-500 text-xs tracking-widest uppercase">
            Loading
          </p>
        </div>
      </section>
    );
  }

  // ── Error / No data ──
  if (error || !data) {
    return (
      <section className="h-screen w-full snap-start flex items-center justify-center bg-[#0d0d0b] text-white">
        <h1 className="text-4xl font-bold text-zinc-400">Hero Section</h1>
      </section>
    );
  }

  const { name, tagline, heroDescription, videoUrl } = data;
  const words = name.split(" ");

  return (
    <>
      {/* Inject keyframes once */}
      <style>{`
        @keyframes hero-fadeUp {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0);   }
        }
        @keyframes hero-fadeUpName {
          from { opacity: 0; transform: perspective(900px) rotateX(14deg) translateY(28px); }
          to   { opacity: 1; transform: perspective(900px) rotateX(0deg)  translateY(0);   }
        }
        @keyframes hero-floatIdle {
          0%,100% { opacity:1; transform: perspective(900px) rotateX(0deg)    rotateY(0deg);    }
          25%      { opacity:1; transform: perspective(900px) rotateX(1deg)    rotateY(-1.5deg); }
          50%      { opacity:1; transform: perspective(900px) rotateX(-0.5deg) rotateY(1deg);   }
          75%      { opacity:1; transform: perspective(900px) rotateX(1.5deg)  rotateY(0.5deg); }
        }
        @keyframes hero-ringPulse {
          0%,100% { opacity:0.6; transform:scale(1);    }
          50%      { opacity:0.2; transform:scale(1.08); }
        }
        @keyframes hero-scrollLine {
          0%,100% { transform:scaleY(1);   opacity:0.5; }
          50%      { transform:scaleY(0.55); opacity:1;  }
        }
        @keyframes hero-card1 {
          0%,100% { transform:translateY(0)  rotate(-1deg); }
          50%      { transform:translateY(-9px) rotate(0deg); }
        }
        @keyframes hero-card2 {
          0%,100% { transform:translateY(0)   rotate(1deg);   }
          50%      { transform:translateY(-11px) rotate(-0.5deg); }
        }
        .hero-anim-fadeUp       { opacity:0; animation:hero-fadeUp 0.7s ease forwards; }
        .hero-anim-fadeUpName   { opacity:0; animation:hero-fadeUpName 0.9s ease forwards; }
        .hero-name-visible      { opacity:1; }
        .hero-float-idle        { animation:hero-floatIdle 7s ease-in-out infinite; }
        .hero-anim-ringPulse    { animation:hero-ringPulse 2.5s ease-in-out infinite; }
        .hero-anim-ringPulse2   { animation:hero-ringPulse 2.5s ease-in-out 0.5s infinite; }
        .hero-anim-scrollLine   { animation:hero-scrollLine 2s ease-in-out infinite; }
        .hero-anim-card1        { opacity:0; animation:hero-card1 4s ease-in-out infinite, hero-fadeUp 0.6s ease 1.4s forwards; }
        .hero-anim-card2        { opacity:0; animation:hero-card2 5s ease-in-out 0.8s infinite, hero-fadeUp 0.6s ease 1.6s forwards; }
      `}</style>

      <section
        ref={sectionRef}
        id="home"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative h-screen w-full snap-start overflow-hidden flex items-center"
        style={{ background: "#0d0d0b", color: "#f5f5f0" }}
      >
        {/* ── Canvas Particles ── */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-0 pointer-events-none"
        />

        {/* ── Background Video ── */}
        {videoUrl && (
          <video
            ref={videoRef}
            src={videoUrl}
            className="absolute inset-0 z-0 w-full h-full object-cover"
            style={{
              opacity: isPlaying ? 1 : 0,
              transition: "opacity 1s ease",
            }}
            playsInline
            loop
            onEnded={() => setIsPlaying(false)}
          />
        )}

        {/* ── Depth Gradient Overlay ── */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 65% 65% at 28% 38%, rgba(180,140,55,0.065) 0%, transparent 65%)",
          }}
        />
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 50% 50% at 72% 62%, rgba(75,55,175,0.045) 0%, transparent 58%)",
          }}
        />

        {/* ── Video Overlay (darkens when playing) ── */}
        <div
          className="absolute inset-0 z-[2] pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, #0a0a08 0%, rgba(13,13,11,0.75) 45%, rgba(13,13,11,0.55) 100%)",
            opacity: isPlaying ? 0.45 : 1,
            transition: "opacity 1s ease",
          }}
        />

        {/* ── Perspective Grid Floor ── */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none overflow-hidden"
          style={{ bottom: 0 }}
        >
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "55%",
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)",
              backgroundSize: "55px 55px",
              transform:
                "perspective(700px) rotateX(62deg) translateY(25%) scaleX(1.4)",
              transformOrigin: "center bottom",
              maskImage:
                "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 80%)",
              WebkitMaskImage:
                "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 80%)",
            }}
          />
        </div>

        {/* ── Main Content ── */}
        <div className="relative z-10 w-full px-6 md:px-14 lg:px-20 flex flex-col pointer-events-none">
          {/* Badge */}
          <p
            className="hero-anim-fadeUp"
            style={{
              animationDelay: "0.15s",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.26em",
              color: "#d4a843",
              textTransform: "uppercase",
              marginBottom: 20,
            }}
          >
            Portfolio 2026
          </p>

          {/* Name — 3D tilt block */}
          <div
            className={[
              nameVisible ? "hero-name-visible" : "hero-anim-fadeUpName",
              nameVisible && isIdle && !isPlaying ? "hero-float-idle" : "",
            ].join(" ")}
            onAnimationEnd={(e) => {
              if (e.animationName === "hero-fadeUpName") setNameVisible(true);
            }}
            style={{
              animationDelay: nameVisible ? undefined : "0.35s",
              marginBottom: 22,
              ...(!isIdle && nameVisible
                ? {
                    transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                    transition: "none",
                    willChange: "transform",
                  }
                : isIdle && nameVisible
                  ? {
                      transition: "transform 0.9s cubic-bezier(0.25,1,0.5,1)",
                    }
                  : {}),
            }}
          >
            {words.map((word, i) => (
              <div
                key={i}
                style={{
                  display: "block",
                  fontWeight: 900,
                  letterSpacing: "-0.04em",
                  lineHeight: 0.9,
                  fontSize: "clamp(52px,9.5vw,108px)",
                  color: i === words.length - 1 ? "transparent" : "#f5f5f0",
                  WebkitTextStroke:
                    i === words.length - 1
                      ? "1.5px rgba(245,245,240,0.32)"
                      : undefined,
                  textShadow:
                    i !== words.length - 1
                      ? "0 8px 40px rgba(0,0,0,0.55)"
                      : undefined,
                }}
              >
                {word}
              </div>
            ))}
          </div>

          {/* Tagline */}
          <div
            className="hero-anim-fadeUp"
            style={{
              animationDelay: "0.75s",
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 14,
            }}
          >
            <span
              style={{
                width: 28,
                height: 1,
                background: "#d4a843",
                flexShrink: 0,
                display: "block",
              }}
            />
            <p
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.22em",
                color: "#666660",
                textTransform: "uppercase",
                fontFamily: "var(--font-mono, monospace)",
              }}
            >
              <ScrambleText text={tagline} />
            </p>
          </div>

          {/* Description */}
          <p
            className="hero-anim-fadeUp"
            style={{
              animationDelay: "0.95s",
              fontSize: "clamp(13px,1.4vw,16px)",
              color: "rgba(175,175,165,0.75)",
              fontWeight: 400,
              lineHeight: 1.7,
              maxWidth: 420,
            }}
          >
            {heroDescription}
          </p>
        </div>

        {/* ── Play Button ── */}
        {videoUrl && !isPlaying && (
          <div
            className="absolute z-20 hero-anim-fadeUp"
            style={{
              right: "clamp(24px, 6vw, 72px)",
              top: "50%",
              transform: "translateY(-50%)",
              animationDelay: "1.15s",
            }}
          >
            <button
              onClick={handlePlay}
              aria-label="Play showreel"
              style={{
                position: "relative",
                width: 80,
                height: 80,
                borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(255,255,255,0.04)",
                backdropFilter: "blur(14px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "transform 0.3s ease, background 0.3s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform =
                  "scale(1.1)";
                (e.currentTarget as HTMLButtonElement).style.background =
                  "rgba(212,168,67,0.1)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform = "";
                (e.currentTarget as HTMLButtonElement).style.background =
                  "rgba(255,255,255,0.04)";
              }}
            >
              {/* Pulse rings */}
              <span
                className="hero-anim-ringPulse"
                style={{
                  position: "absolute",
                  inset: -8,
                  borderRadius: "50%",
                  border: "1px solid rgba(212,168,67,0.25)",
                  pointerEvents: "none",
                }}
              />
              <span
                className="hero-anim-ringPulse2"
                style={{
                  position: "absolute",
                  inset: -18,
                  borderRadius: "50%",
                  border: "1px solid rgba(212,168,67,0.1)",
                  pointerEvents: "none",
                }}
              />
              <Play
                size={20}
                fill="rgba(255,255,255,0.85)"
                stroke="none"
                style={{ marginLeft: 3 }}
              />
            </button>
          </div>
        )}

        {/* ── Floating Cards ── */}
        {/* <FloatingCard
          label="Available for work"
          dotColor="#d4a843"
          animClass="hero-anim-card1"
          style={{
            right: "clamp(16px, 4vw, 36px)",
            top: "clamp(50px, 8vh, 80px)",
          }}
        />
        <FloatingCard
          label="React · TypeScript · n8n"
          dotColor="rgba(120,120,210,0.85)"
          animClass="hero-anim-card2"
          style={{
            right: "clamp(80px, 14vw, 160px)",
            bottom: "clamp(60px, 10vh, 100px)",
          }}
        /> */}

        {/* ── Scroll Indicator ── */}
        <div
          className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-10 hero-anim-fadeUp flex flex-col items-center gap-3"
          style={{ animationDelay: "1.5s" }}
        >
          <span
            style={{
              fontSize: 8,
              fontWeight: 700,
              letterSpacing: "0.32em",
              color: "rgba(175,175,165,0.4)",
              textTransform: "uppercase",
            }}
          >
            Scroll
          </span>
          <div
            className="hero-anim-scrollLine"
            style={{
              width: 1,
              height: 40,
              background:
                "linear-gradient(to bottom, rgba(175,175,165,0.45), transparent)",
              transformOrigin: "top",
            }}
          />
        </div>
      </section>
    </>
  );
};

export default Hero;
