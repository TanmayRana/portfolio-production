"use client";

import React, { useRef, useState } from "react";
import { useMyExpertise } from "@/hooks/useMyExpertise";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from "framer-motion";

const LAYOUT = [
  { side: "right", baseRot: -6, featured: true },
  { side: "left", baseRot: 4, featured: false },
  { side: "right", baseRot: -3, featured: false },
  { side: "left", baseRot: 5, featured: false },
  { side: "right", baseRot: -4, featured: false },
  { side: "left", baseRot: 3, featured: false },
];

function buildRoadPath(n: number): string {
  const W = 300;
  const segH = 320;
  let d = `M${W / 2} 0`;
  for (let i = 0; i < n; i++) {
    const ctrlX = i % 2 === 0 ? W - 30 : 30;
    const midY = i * segH + segH / 2;
    const endY = (i + 1) * segH;
    d += ` Q${ctrlX} ${midY} ${W / 2} ${endY}`;
  }
  return d;
}

export default function MyExpertise() {
  const { data: experiences, loading, error } = useMyExpertise();
  const sectionRef = useRef<HTMLDivElement>(null);

  console.log("experiences", experiences);

  const [manualProgress, setManualProgress] = useState(0);

  React.useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    
    // Find the scrollable container (in this case, the <main> element with overflow-y-scroll)
    const scrollParent = el.closest('.overflow-y-scroll') || window;
    
    const handleScroll = () => {
      const rect = el.getBoundingClientRect();
      const parentHeight = scrollParent === window ? window.innerHeight : (scrollParent as HTMLElement).clientHeight;
      
      // Calculate how much of the section has been scrolled past
      // rect.top is the distance from the top of the viewport
      // We want progress to start when the top of the section enters the bottom of the viewport
      // and end when the bottom of the section leaves the top of the viewport
      const start = parentHeight;
      const end = -rect.height;
      const total = start - end;
      
      let p = (start - rect.top) / total;
      
      // Fine-tune the progress so the line draws primarily while we are traversing the section
      // We want it to be 0 when we enter, and 1 near the end
      p = Math.max(0, Math.min(1, p));
      
      setManualProgress(p);
    };

    scrollParent.addEventListener("scroll", handleScroll);
    handleScroll(); // initial call
    return () => scrollParent.removeEventListener("scroll", handleScroll);
  }, []);

  const count = experiences?.length ?? 4;
  const roadPath = buildRoadPath(Math.max(count, 1));
  const svgH = Math.max(count * 320 + 100, 700);

  return (
    <section
      id="expertise"
      ref={sectionRef}
      className="w-full flex justify-center bg-[#0a0a0a] text-white px-4 sm:px-6 py-24 md:py-32 relative overflow-hidden snap-start"
    >
      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-16 items-start">
        {/* Left sticky */}
        <div className="flex flex-col items-start text-left z-20 lg:sticky lg:top-32">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center px-4 py-1.5 mb-8 rounded-full border border-zinc-700 text-zinc-300 text-sm font-medium tracking-wide"
          >
            My Expertise
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold leading-[1.08] tracking-tight text-white mb-6"
          >
            Building Modern Digital Solutions with Code &amp; AI
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base md:text-lg text-zinc-400 leading-relaxed max-w-lg"
          >
            Combining full-stack development, artificial intelligence, and cloud
            technologies to create scalable and impactful digital experiences.
          </motion.p>
        </div>

        {/* Right: zig-zag */}
        <div className="relative w-full">
          {loading ? (
            <div className="flex items-center gap-3 text-zinc-500 animate-pulse py-10">
              <span className="w-4 h-4 rounded-full border-2 border-orange-500 border-t-transparent animate-spin" />
              Loading expertise…
            </div>
          ) : error ? (
            <div className="text-red-400 bg-red-500/10 border border-red-500/20 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          ) : experiences.length === 0 ? (
            <div className="text-zinc-500 text-sm py-10">
              No expertise added yet.
            </div>
          ) : (
            <>
              {/* SVG road — base grey + orange draw-on */}
              <svg
                viewBox={`0 0 300 ${svgH}`}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute inset-0 w-full pointer-events-none z-0"
                style={{ height: "100%" }}
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="roadGlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f97316" />
                    <stop offset="100%" stopColor="#ea580c" />
                  </linearGradient>
                  
                  {/* Mask for the draw animation */}
                  <mask id="drawMask">
                    <motion.path
                      d={roadPath}
                      stroke="white"
                      strokeWidth="10"
                      fill="none"
                      animate={{ pathLength: manualProgress }}
                      transition={{ type: "spring", stiffness: 100, damping: 30 }}
                    />
                  </mask>
                </defs>

                {/* Grey base (always visible, dotted) */}
                <path
                  d={roadPath}
                  stroke="#27272a"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray="4 12"
                />
                
                {/* Orange dotted overlay, revealed by the mask */}
                <path
                  d={roadPath}
                  stroke="url(#roadGlow)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray="4 12"
                  mask="url(#drawMask)"
                />
              </svg>

              {/* Cards */}
              <div className="flex flex-col gap-[90px] sm:gap-[110px] py-12 pb-24">
                {experiences.map((exp, index) => {
                  const layout = LAYOUT[index % LAYOUT.length];
                  return (
                    <div
                      key={exp.id}
                      className={`flex w-full ${
                        layout.side === "right"
                          ? "justify-end pl-[18%] sm:pl-[28%]"
                          : "justify-start pr-[18%] sm:pr-[28%]"
                      }`}
                    >
                      <ExpertiseCard
                        experience={exp}
                        index={index}
                        baseRot={layout.baseRot}
                        featured={layout.featured}
                        manualProgress={manualProgress}
                        count={count}
                      />
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="absolute top-1/3 right-1/3 w-[500px] h-[500px] bg-orange-500/[0.04] blur-[140px] rounded-full pointer-events-none -z-20" />
    </section>
  );
}

function ExpertiseCard({
  experience,
  index,
  baseRot,
  featured,
  manualProgress,
  count,
}: {
  experience: any;
  index: number;
  baseRot: number;
  featured: boolean;
  manualProgress: number;
  count: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const [isColored, setIsColored] = useState(false);

  React.useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    
    const scrollParent = el.closest('.overflow-y-scroll') || window;
    
    const checkVisible = () => {
      const rect = el.getBoundingClientRect();
      const parentHeight = scrollParent === window ? window.innerHeight : (scrollParent as HTMLElement).clientHeight;
      
      // Card lights up when its top crosses the 75% mark of the screen
      if (rect.top < parentHeight * 0.75) {
        setIsColored(true);
      } else {
        setIsColored(false);
      }
    };
    
    scrollParent.addEventListener('scroll', checkVisible);
    checkVisible(); // initial check
    return () => scrollParent.removeEventListener('scroll', checkVisible);
  }, []);

  const bobDuration = 3.6 + index * 0.45;

  /* Mouse tilt */
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const cx = r.width / 2;
    const cy = r.height / 2;
    setTilt({
      x: ((e.clientY - r.top - cy) / cy) * -13,
      y: ((e.clientX - r.left - cx) / cx) * 13,
    });
  };
  
  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
  };

  /* Colour classes — full colour when in view */
  const cardBg = isColored
    ? "bg-gradient-to-br from-red-600 via-orange-600 to-orange-500 border-orange-500/40 shadow-[0_24px_64px_rgba(234,88,12,0.42)]"
    : "bg-zinc-800 border-zinc-700 shadow-[0_20px_52px_rgba(0,0,0,0.5)]";

  const numColor = isColored ? "text-orange-200" : "text-zinc-600";
  const titleColor = isColored ? "text-white" : "text-zinc-600";
  const bodyColor = isColored ? "text-white/85" : "text-zinc-600";
  const pinBorder = isColored ? "border-orange-500/50" : "border-zinc-700";
  const pinDot = isColored ? "bg-orange-400 shadow-[0_0_10px_rgba(251,146,60,0.8)]" : "bg-zinc-600";

  return (
    <motion.div
      ref={wrapRef}
      initial={false}
      animate={{ 
        opacity: isColored ? 1 : 0, 
        y: isColored ? 0 : 80,
        rotateX: isColored ? 0 : 45,
        rotateY: isColored ? 0 : (index % 2 === 0 ? 25 : -25),
        rotateZ: isColored ? baseRot : baseRot * 2.5,
        scale: isColored ? 1 : 0.75
      }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} // Springy ease-out
      style={{ perspective: 1200, zIndex: hovered ? 50 : 20 }}
      className="w-full max-w-[340px] md:max-w-[380px] z-10"
    >
      {/* Bob */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{
          duration: bobDuration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.35,
        }}
      >
        {/* Tilt */}
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onMouseEnter={() => setHovered(true)}
          animate={{
            rotateX: tilt.x,
            rotateY: tilt.y,
            scale: hovered ? 1.04 : 1,
          }}
          transition={{ type: "spring", stiffness: 280, damping: 28 }}
          style={{ transformStyle: "preserve-3d", perspective: 900 }}
          className={`
            relative flex flex-col gap-4 p-8 sm:p-9 rounded-[24px] cursor-default border
            transition-all duration-700
            ${cardBg}
          `}
        >
          {/* Inner frame/inset border */}
          <div 
            className="absolute inset-2 rounded-[16px] border border-white/10 pointer-events-none" 
            style={{ transform: "translateZ(10px)" }}
          />

          {/* Pin (Metallic Stud) */}
          <div
            className={`absolute top-4 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-gradient-to-b from-zinc-300 to-zinc-500 flex items-center justify-center shadow-[0_4px_10px_rgba(0,0,0,0.5)] border border-zinc-400`}
            style={{ transform: "translateZ(24px)" }}
          >
            <div
              className={`w-1.5 h-1.5 rounded-full bg-zinc-200/80 shadow-inner`}
            />
          </div>

          {/* Number */}
          <span
            className={`text-xs font-bold tracking-[0.22em] mt-4 transition-colors duration-700 ${numColor}`}
            style={{ transform: "translateZ(30px)" }}
          >
            {(index + 1).toString().padStart(2, "0")}
          </span>

          {/* Title */}
          <h3
            className={`text-xl sm:text-2xl font-extrabold leading-tight transition-colors duration-700 ${titleColor}`}
            style={{ transform: "translateZ(44px)" }}
          >
            {experience.title}
          </h3>

          {/* Floating Message */}
          {experience.showIdeaMessage && (
            <motion.div
              initial={{ opacity: 0, x: index % 2 === 0 ? 40 : -40 }}
              animate={{ opacity: isColored ? 1 : 0, x: isColored ? 0 : (index % 2 === 0 ? 40 : -40) }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className={`absolute top-1/2 -translate-y-1/2 whitespace-nowrap pointer-events-none hidden lg:block ${
                index % 2 === 0 ? "right-full pr-8" : "left-full pl-8"
              }`}
            >
              <div className="relative">
                <motion.div 
                  animate={{ y: [0, -8, 0], scale: [1, 1.02, 1] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                  className="text-orange-400 font-serif text-2xl italic tracking-wide drop-shadow-[0_0_12px_rgba(249,115,22,0.6)]"
                >
                  "Turning ideas into reality!"
                </motion.div>
                {/* Small decorative line pointing to the card */}
                {/* <div 
                  className={`absolute top-1/2 -translate-y-1/2 w-8 h-[2px] bg-gradient-to-r ${
                    index % 2 === 0 
                      ? "from-transparent to-orange-500/80 -right-4" 
                      : "from-orange-500/80 to-transparent -left-4"
                  }`} 
                /> */}
              </div>
            </motion.div>
          )}

          {/* Body */}
          <p
            className={`text-sm leading-relaxed transition-colors duration-700 mt-1 ${bodyColor}`}
            style={{ transform: "translateZ(28px)" }}
          >
            {experience.body}
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
