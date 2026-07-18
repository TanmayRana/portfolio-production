"use client";

import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/lib/store";
import { fetchCertificationsData } from "@/lib/store/certificationsSlice";
import Link from "next/link";

/* ─── 3D flip badge card ─── */
function BadgeCard({ cert }: { cert: any }) {
  const [flipped, setFlipped] = useState(false);

  const dateObj = new Date(cert.date);
  const year = !isNaN(dateObj.getTime())
    ? `'${dateObj.getFullYear().toString().slice(-2)}`
    : "";

  return (
    <div
      className="relative shrink-0 w-[220px] sm:w-[240px] h-[300px] cursor-pointer"
      style={{ perspective: "1000px" }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={() => setFlipped((p) => !p)}
    >
      {/* ── 3D wrapper ── */}
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 180, damping: 22 }}
        style={{ transformStyle: "preserve-3d", width: "100%", height: "100%" }}
      >
        {/* FRONT */}
        <div
          className="absolute inset-0 rounded-[20px] p-5 flex flex-col bg-[#0f172a] border border-slate-800 overflow-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Badge punch hole */}
          <div className="w-10 h-2.5 rounded-full bg-[#020617]/70 mx-auto mb-4" />

          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-extrabold text-red-500 tracking-widest uppercase">
              {cert.issuer?.split(" ")[0] ?? "CERT"}
            </span>
            <span className="text-[11px] text-slate-600 font-semibold">
              {year}
            </span>
          </div>

          <h3 className="text-[15px] font-extrabold text-slate-100 leading-snug flex-1">
            {cert.title}
          </h3>

          <div className="pt-3 mt-3 border-t border-slate-800">
            <p className="text-[9px] font-mono text-slate-600 tracking-[0.15em] uppercase mb-0.5">
              Issued by
            </p>
            <p className="text-[12px] font-bold text-slate-400">
              {cert.issuer}
            </p>
          </div>
        </div>

        {/* BACK */}
        <div
          className="absolute inset-0 rounded-[20px] p-5 flex flex-col bg-[#0c1628] border border-blue-900/40 overflow-hidden"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          {/* Badge punch hole */}
          <div className="w-10 h-2.5 rounded-full bg-[#020617] mx-auto mb-4" />

          <ShieldCheck className="w-8 h-8 text-emerald-400 mb-3 shrink-0" />

          <h4 className="text-[13px] font-bold text-white mb-2 leading-snug">
            {cert.title}
          </h4>

          <p className="text-[11px] text-slate-500 leading-relaxed flex-1 line-clamp-4">
            {cert.description ||
              "Officially verified credential acknowledging professional competence and technical expertise in this domain."}
          </p>

          {cert.verificationLink ? (
            <Link
              href={cert.verificationLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="mt-auto flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-bold transition-colors"
            >
              Verify Credential
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          ) : (
            <div className="mt-auto py-2.5 px-3 rounded-xl bg-slate-800/60 border border-slate-700/40 text-slate-500 text-[11px] font-semibold text-center">
              No verification link
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

/* ─── Section ─── */
export default function ProfessionalCredentials() {
  const dispatch = useDispatch<AppDispatch>();
  const { data: certifications, status } = useSelector(
    (state: RootState) => state.certifications,
  );
  const isLoading = status === "loading";

  const trackRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const lastTRef = useRef<number>(performance.now());
  const pausedRef = useRef(false);
  const SPEED = 0.05; // px per ms

  useEffect(() => {
    if (
      status === "idle" ||
      (certifications.length === 0 && status !== "loading")
    ) {
      dispatch(fetchCertificationsData());
    }
  }, [dispatch, status, certifications.length]);

  /* Auto-play slider — advances one card every 3 seconds, scrolls back to start when at end */
  useEffect(() => {
    if (certifications.length === 0) return;

    const intervalId = setInterval(() => {
      const track = trackRef.current;
      if (!pausedRef.current && track) {
        // If we are at the end, smoothly scroll all the way back to the start
        if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 10) {
          track.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          // Advance to the next card
          track.scrollBy({ left: 260, behavior: "smooth" });
        }
      }
    }, 3000);

    return () => clearInterval(intervalId);
  }, [certifications.length]);

  const pause = useCallback(() => {
    pausedRef.current = true;
  }, []);

  const resume = useCallback(() => {
    pausedRef.current = false;
  }, []);

  const scrollBy = useCallback(
    (dir: 1 | -1) => {
      pause();
      trackRef.current?.scrollBy({ left: dir * 260, behavior: "smooth" });
      setTimeout(resume, 1200);
    },
    [pause, resume],
  );

  return (
    <section id="credentials" className="relative w-full py-20 sm:py-28 bg-[#020617] overflow-hidden min-h-screen snap-start flex flex-col justify-center">
      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right,#ffffff08 1px,transparent 1px),linear-gradient(to bottom,#ffffff08 1px,transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="container mx-auto px-5 lg:px-12 relative z-10">
        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-14">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight relative inline-block pb-3">
              Professional Credentials
              {/* Sleek 3D Glowing Underline */}
              <div className="absolute bottom-0 left-0 h-1.5 w-[85%] rounded-full bg-gradient-to-r from-orange-500 via-amber-400 to-transparent shadow-[0_2px_4px_rgba(0,0,0,0.8),0_0_12px_rgba(249,115,22,0.6)] border-t border-white/40" />
            </h2>
          </motion.div>

          {certifications.length > 0 && (
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => scrollBy(-1)}
                aria-label="Scroll left"
                className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 text-slate-400 hover:bg-slate-700 hover:text-white transition-colors flex items-center justify-center"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollBy(1)}
                aria-label="Scroll right"
                className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 text-slate-400 hover:bg-slate-700 hover:text-white transition-colors flex items-center justify-center"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* ── Carousel ── */}
        <div className="relative">
          {/* Dashed timeline line through the vertical CENTER of the cards */}
          <div
            className="absolute top-1/2 -translate-y-1/2 left-0 w-full h-px pointer-events-none z-0"
            style={{
              background:
                "repeating-linear-gradient(to right,#334155 0,#334155 8px,transparent 8px,transparent 16px)",
            }}
          />

          {/* Left fade */}
          <div className="absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-[#020617] to-transparent z-10 pointer-events-none" />
          {/* Right fade */}
          <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-[#020617] to-transparent z-10 pointer-events-none" />

          {isLoading && certifications.length === 0 ? (
            <div className="flex justify-center py-24">
              <div className="w-10 h-10 border-4 border-slate-700 border-t-blue-500 rounded-full animate-spin" />
            </div>
          ) : certifications.length === 0 ? (
            <div className="flex justify-center py-24 text-slate-500 text-sm font-medium">
              No professional credentials added yet.
            </div>
          ) : (
            <div
              ref={trackRef}
              className="flex gap-5 px-16 py-6 overflow-x-auto snap-x snap-mandatory"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              onMouseEnter={pause}
              onMouseLeave={resume}
              onTouchStart={pause}
              onTouchEnd={resume}
            >
              {/* Render ONLY the exact list of cards without duplication */}
              {certifications.map((cert, i) => (
                <div key={`${cert.id}-${i}`} className="snap-center shrink-0">
                  <BadgeCard cert={cert} />
                </div>
              ))}
            </div>
          )}
        </div>
        {/* ── Footer hint ── */}
        {certifications.length > 0 && (
          <p className="text-center mt-6 text-[12px] text-slate-600 tracking-wide">
            Hover a card to flip and verify &nbsp;·&nbsp;{" "}
            {certifications.length} credential
            {certifications.length !== 1 ? "s" : ""} active
          </p>
        )}
      </div>
    </section>
  );
}
