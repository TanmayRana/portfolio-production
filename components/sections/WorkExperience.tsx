"use client";

import {
  motion,
  useScroll,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { Briefcase, Calendar, MapPin, Star, ChevronRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/lib/store";
import { fetchWorkExperienceData } from "@/containers/admin/work-experience/workExperienceReducer";

/* ── Helpers ── */
function formatPeriod(start: string, end: string | null) {
  const opts: Intl.DateTimeFormatOptions = { year: "numeric", month: "short" };
  return `${new Date(start).toLocaleDateString("en-US", opts)} – ${
    end ? new Date(end).toLocaleDateString("en-US", opts) : "Present"
  }`;
}

function ScrollReveal({
  children,
  delay = 0,
  direction = "up",
}: {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right";
}) {
  const xOffset = direction === "left" ? -100 : direction === "right" ? 100 : 0;
  const yOffset = direction === "up" ? 60 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: xOffset, y: yOffset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ type: "spring", stiffness: 50, damping: 20, delay }}
    >
      {children}
    </motion.div>
  );
}

/* ── 3D Tilt Card ── */
function TiltCard({
  children,
  isActive,
}: {
  children: React.ReactNode;
  isActive: boolean;
}) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 300, damping: 30 });
  const sy = useSpring(my, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(sy, [-0.5, 0.5], ["6deg", "-6deg"]);
  const rotateY = useTransform(sx, [-0.5, 0.5], ["-6deg", "6deg"]);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const handleLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`
        relative w-full p-6 sm:p-8 rounded-2xl border transition-all duration-500
        ${
          isActive
            ? "border-blue-500/40 bg-slate-900/70 shadow-[0_0_48px_rgba(59,130,246,0.14)]"
            : "border-slate-800/60 bg-slate-900/40 hover:border-slate-700/80 hover:bg-slate-900/60"
        }
      `}
    >
      {/* Elevation layer */}
      <div
        style={{ transform: "translateZ(40px)", transformStyle: "preserve-3d" }}
      >
        {children}
      </div>
    </motion.div>
  );
}

/* ── Timeline dot ── */
function TimelineDot({
  isActive,
  isCurrent,
}: {
  isActive: boolean;
  isCurrent: boolean;
}) {
  return (
    <div className="absolute left-5 md:left-1/2 top-8 z-20 flex items-center justify-center -translate-x-1/2">
      <motion.div
        animate={isActive ? { scale: [1, 1.12, 1] } : { scale: 1 }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className={`
          relative rounded-full border-[3px] border-[#020617] transition-all duration-400
          ${
            isActive
              ? "w-6 h-6 bg-gradient-to-tr from-blue-500 to-indigo-400 shadow-[0_0_20px_rgba(59,130,246,0.55)]"
              : "w-3.5 h-3.5 bg-slate-600"
          }
        `}
      >
        {isCurrent && isActive && (
          <span className="absolute inset-0 rounded-full bg-blue-400/50 animate-ping" />
        )}
      </motion.div>
    </div>
  );
}

/* ── Section ── */
export default function WorkExperience() {
  const dispatch = useDispatch<AppDispatch>();
  const { data: dbExperiences, status } = useSelector(
    (state: RootState) => state.workExperience,
  );
  const isLoading = status === "loading";
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });
  const lineScale = useSpring(scrollYProgress, { stiffness: 90, damping: 22 });

  useEffect(() => {
    if (
      status === "idle" ||
      (dbExperiences.length === 0 && status !== "loading")
    ) {
      dispatch(fetchWorkExperienceData());
    }
  }, [dispatch, status, dbExperiences.length]);

  const experiences = dbExperiences.filter((e) => e.companyName?.trim());

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-20 sm:py-32 bg-[#020617] overflow-hidden min-h-screen snap-start"
    >
      {/* ── Ambient background blobs ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-[-12%] left-[-8%] w-[55vw] h-[55vw] rounded-full bg-blue-900/10 blur-[130px]"
          animate={{ x: [0, 80, 0], y: [0, 40, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-[-12%] right-[-8%] w-[60vw] h-[60vw] rounded-full bg-indigo-900/10 blur-[150px]"
          animate={{ x: [0, -80, 0], y: [0, -40, 0] }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="container mx-auto px-5 lg:px-12 relative z-10">
        {/* ── Section header ── */}
        <ScrollReveal>
          <div className="text-center mb-20 sm:mb-28">
            <motion.span
              initial={{ opacity: 0, scale: 0.88 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-block py-1 px-3 mb-6 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-mono text-xs sm:text-sm tracking-widest uppercase"
            >
              Career Timeline
            </motion.span>

            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tight leading-[1.05] flex justify-center items-center ">
              Experience
              <span className="mt-1.5 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
                {"  "} &amp; Impact
              </span>
            </h2>

            <p className="text-slate-400 max-w-xl mx-auto text-base sm:text-lg font-light leading-relaxed">
              A history of building exceptional digital experiences and leading
              technical innovation across enterprise environments.
            </p>
          </div>
        </ScrollReveal>

        {/* ── States ── */}
        {isLoading && experiences.length === 0 ? (
          <div className="flex items-center justify-center py-32">
            <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
          </div>
        ) : experiences.length === 0 ? (
          <div className="max-w-md mx-auto text-center py-32 flex flex-col items-center gap-5">
            <div className="w-20 h-20 rounded-3xl bg-slate-800/40 border border-slate-700/30 flex items-center justify-center">
              <Briefcase className="w-10 h-10 text-slate-500" />
            </div>
            <h3 className="text-xl font-bold text-slate-300">
              No Experience Added
            </h3>
            <p className="text-slate-500 text-sm max-w-xs">
              Add your professional roles in the Admin panel to populate this
              timeline.
            </p>
          </div>
        ) : (
          /* ── Timeline ── */
          <div className="max-w-5xl mx-auto relative">
            {/* Vertical line */}
            <div className="absolute left-5 md:left-1/2 top-4 bottom-4 w-[2px] bg-slate-800/60 md:-translate-x-1/2 rounded-full overflow-hidden">
              <motion.div
                className="absolute top-0 w-full h-full bg-gradient-to-b from-blue-500 via-indigo-500 to-purple-500 origin-top"
                style={{ scaleY: lineScale }}
              />
            </div>

            <div className="flex flex-col gap-16 sm:gap-24">
              {experiences.map((exp, index) => {
                const isActive = activeCard === index;
                const isEven = index % 2 === 0;
                const isCurrent = !exp.endDate;

                const descList = Array.isArray(exp.description)
                  ? exp.description
                  : typeof exp.description === "string"
                    ? (exp.description as string).split("\n").filter(Boolean)
                    : [];

                return (
                  <ScrollReveal
                    key={`${exp.companyName}-${index}`}
                    delay={0.1}
                    direction={isEven ? "left" : "right"}
                  >
                    <motion.div
                      className={`relative flex flex-col md:flex-row ${
                        isEven ? "md:flex-row-reverse" : ""
                      }`}
                      onMouseEnter={() => setActiveCard(index)}
                      onMouseLeave={() => setActiveCard(null)}
                      onViewportEnter={() => setActiveCard(index)}
                      viewport={{ amount: 0.5, margin: "-10% 0px -10% 0px" }}
                    >
                      <TimelineDot isActive={isActive} isCurrent={isCurrent} />

                      {/* Half-width spacer for alternating layout */}
                      <div className="hidden md:block md:w-1/2" />

                      {/* Card */}
                      <div
                        className={`
                          pl-14 md:pl-0 md:w-1/2
                          ${isEven ? "md:pr-14" : "md:pl-14"}
                        `}
                      >
                        <TiltCard isActive={isActive}>
                          {/* Header */}
                          <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-5">
                            <div
                              className={`
                                p-3.5 rounded-xl shrink-0 border transition-all duration-400
                                ${
                                  isActive
                                    ? "bg-blue-500/15 text-blue-400 border-blue-500/30"
                                    : "bg-slate-800/80 text-slate-500 border-slate-700/40"
                                }
                              `}
                            >
                              <Briefcase className="w-6 h-6" />
                            </div>
                            <div>
                              <h3 className="text-lg sm:text-xl font-bold text-white leading-tight tracking-tight">
                                {exp.position}
                              </h3>
                              <p className="text-blue-400 font-semibold text-sm mt-0.5">
                                {exp.companyName}
                              </p>
                            </div>
                          </div>

                          {/* Meta */}
                          <div className="flex flex-wrap gap-x-5 gap-y-1.5 mb-5 font-mono text-xs text-slate-500">
                            <span className="flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5" />
                              {formatPeriod(exp.startDate, exp.endDate)}
                            </span>
                            {exp.location && !exp.location.includes("Lat:") && (
                              <span className="flex items-center gap-1.5">
                                <MapPin className="w-3.5 h-3.5" />
                                {exp.location}
                              </span>
                            )}
                            {isCurrent && (
                              <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] tracking-widest uppercase font-semibold">
                                Current
                              </span>
                            )}
                          </div>

                          {/* Description */}
                          {descList.length > 0 && (
                            <ul className="flex flex-col gap-2.5 mb-5">
                              {descList.map((item, i) => (
                                <li
                                  key={i}
                                  className="flex items-start gap-2.5 text-sm text-slate-400 leading-relaxed"
                                >
                                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500/70 mt-[7px] shrink-0" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          )}

                          {/* Key achievements */}
                          {exp.keyAchievements &&
                            exp.keyAchievements.length > 0 && (
                              <div className="mb-5">
                                <p className="text-[10px] font-mono text-slate-600 tracking-widest uppercase mb-2 font-semibold">
                                  Key Achievements
                                </p>
                                <div className="flex flex-col gap-1.5">
                                  {exp.keyAchievements.map((ach) => (
                                    <div
                                      key={ach}
                                      className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-500/8 border border-emerald-500/20 text-emerald-400 text-xs font-semibold"
                                    >
                                      <Star className="w-3.5 h-3.5 fill-emerald-500/40 text-emerald-500 shrink-0" />
                                      {ach}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                          {/* Tech stack */}
                          {exp.technologies && exp.technologies.length > 0 && (
                            <div className="pt-5 border-t border-slate-800/60">
                              <p className="text-[10px] font-mono text-slate-600 tracking-widest uppercase mb-2.5 font-semibold">
                                Tech Stack
                              </p>
                              <div className="flex flex-wrap gap-1.5">
                                {exp.technologies.map((tech) => (
                                  <span
                                    key={tech}
                                    className="px-2.5 py-1 rounded-full bg-slate-900/80 border border-slate-700/70 text-slate-400 text-[11px] font-semibold"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </TiltCard>
                      </div>
                    </motion.div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
