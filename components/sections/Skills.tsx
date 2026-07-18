// "use client";

// import React from "react";
// import { useSkills } from "@/hooks/useSkills";

// const Skills = () => {
//   const { data: categories, loading, error } = useSkills();

//   return (
//     <section
//       id="skills"
//       className="min-h-screen w-full snap-start flex flex-col items-center justify-center bg-[#0a0a0a] text-white px-6 py-20 md:py-32"
//     >
//       <div className="max-w-5xl w-full mx-auto flex flex-col items-center">
//         <div className="flex flex-col items-center gap-4 mb-16">
//           <div className="flex items-center gap-3">
//             <span className="w-12 h-px bg-orange-500" />
//             <span className="text-orange-500 text-sm font-semibold tracking-[0.2em] uppercase text-center">
//               My Skills
//             </span>
//             <span className="w-12 h-px bg-orange-500" />
//           </div>
//           <h2 className="text-3xl md:text-4xl font-bold text-white text-center">
//             Technologies I Work With
//           </h2>
//         </div>

//         {loading ? (
//           <div className="text-zinc-500 animate-pulse">Loading skills...</div>
//         ) : error ? (
//           <div className="text-red-500 bg-red-500/10 px-4 py-2 rounded">
//             {error}
//           </div>
//         ) : categories.length === 0 ? (
//           <div className="text-zinc-500">No skills added yet.</div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
//             {categories.map((category) => (
//               <div
//                 key={category.id}
//                 className="flex flex-col gap-5 p-8 rounded-2xl border border-zinc-800/60 bg-zinc-900/30 hover:border-zinc-700 hover:bg-zinc-900/50 transition-all duration-300"
//               >
//                 <h3 className="text-xl font-semibold flex items-center gap-3 text-zinc-100">
//                   <span>{category.icon}</span>
//                   {category.name}
//                 </h3>
//                 <div className="flex flex-wrap gap-3 mt-2">
//                   {category.skills?.map((skill) => (
//                     <span
//                       key={skill.id}
//                       className="px-5 py-2.5 flex items-center gap-2 bg-zinc-800/80 text-zinc-300 rounded-full text-sm font-medium border border-zinc-700/50 hover:text-white hover:border-orange-500/50 hover:bg-zinc-800 transition-all cursor-default"
//                     >
//                       <span>{skill.name}</span>
//                       <span className="text-orange-500/80 text-xs font-bold">
//                         {skill.level}%
//                       </span>
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default Skills;

"use client";

import React, { useRef } from "react";
import { useSkills } from "@/hooks/useSkills";

const ICON_MAP: Record<string, string> = {
  default: "⚙️",
};

const Skills = () => {
  const { data: categories, loading, error } = useSkills();

  return (
    <section
      id="skills"
      className="min-h-screen w-full snap-start flex flex-col items-center justify-center bg-[#0a0a0a] text-white px-6 py-20 md:py-32"
    >
      <div className="max-w-5xl w-full mx-auto flex flex-col items-center">
        {/* Header */}
        <div className="flex flex-col items-center gap-3 mb-16">
          <div className="flex items-center gap-3">
            <span className="w-9 h-px bg-orange-500" />
            <span className="text-orange-500 text-[11px] font-semibold tracking-[0.18em] uppercase">
              My Skills
            </span>
            <span className="w-9 h-px bg-orange-500" />
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold text-white text-center tracking-tight">
            Technologies I Work With
          </h2>
        </div>

        {/* States */}
        {loading ? (
          <div className="flex items-center gap-3 text-zinc-500 animate-pulse">
            <span className="w-4 h-4 rounded-full border-2 border-orange-500 border-t-transparent animate-spin" />
            Loading skills…
          </div>
        ) : error ? (
          <div className="text-red-400 bg-red-500/10 border border-red-500/20 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        ) : categories.length === 0 ? (
          <div className="text-zinc-500 text-sm">No skills added yet.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
            {categories.map((category) => (
              <SkillCard key={category.id} category={category} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

/* ── 3D tilt card ── */
function SkillCard({ category }: { category: any }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = ((y - cy) / cy) * -6;
    const rotY = ((x - cx) / cx) * 6;
    card.style.transform = `perspective(700px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform =
      "perspective(700px) rotateX(0deg) rotateY(0deg) translateY(0px)";
  };

  /* max skill level for the progress bar */
  const maxLevel = Math.max(
    ...(category.skills?.map((s: any) => s.level ?? 0) ?? [0]),
  );

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transition: "transform 0.25s ease, box-shadow 0.25s ease" }}
      className="
        relative flex flex-col gap-5 p-6 rounded-2xl
        bg-[#111] border border-zinc-800/60
        hover:border-orange-500/30 hover:shadow-[0_16px_40px_rgba(0,0,0,0.5),0_0_0_0.5px_rgba(232,84,26,0.2)]
        will-change-transform overflow-hidden
      "
    >
      {/* Top-right radial glow */}
      <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-orange-500/10 blur-2xl pointer-events-none" />

      {/* Category header */}
      <div className="flex items-center gap-3 relative z-10">
        <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 text-lg shrink-0 overflow-hidden">
          {category.icon && category.icon.startsWith("http") ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={category.icon} alt={category.name} className="w-full h-full object-cover" />
          ) : (
            category.icon || "⚙️"
          )}
        </div>
        <h3 className="text-[15px] font-medium text-zinc-100">
          {category.name}
        </h3>
      </div>

      {/* Skill tags */}
      <div className="flex flex-wrap gap-2 relative z-10">
        {category.skills?.map((skill: any) => (
          <span
            key={skill.id}
            className="
              inline-flex items-center gap-1.5
              px-3 py-1.5 rounded-full
              bg-white/[0.03] border border-zinc-800
              text-[12px] text-zinc-400
              hover:bg-orange-500/10 hover:border-orange-500/30 hover:text-zinc-200
              transition-all duration-200 cursor-default
            "
          >
            {skill.name}
            {skill.level != null && (
              <span className="text-orange-500/80 text-[10px] font-semibold">
                {skill.level}%
              </span>
            )}
          </span>
        ))}
      </div>

      {/* Progress bar — animates on hover via group */}
      <div className="relative z-10 mt-auto">
        <div className="h-px w-full bg-zinc-800/80 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-orange-600 to-orange-400 rounded-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700"
            style={{ width: `${maxLevel}%`, transform: "scaleX(1)" }}
          />
        </div>
        <p className="text-[10px] text-zinc-600 mt-1.5 tracking-wide">
          Up to {maxLevel}% proficiency
        </p>
      </div>
    </div>
  );
}

export default Skills;
