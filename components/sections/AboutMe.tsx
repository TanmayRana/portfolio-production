// import React from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { db } from "@/lib/db";
// import { aboutTable, heroTable } from "@/lib/schema";

// const GithubIcon = ({ className }: { className?: string }) => (
//   <svg
//     className={className}
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
//   </svg>
// );

// const LinkedinIcon = ({ className }: { className?: string }) => (
//   <svg
//     className={className}
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
//     <rect width="4" height="12" x="2" y="9" />
//     <circle cx="4" cy="4" r="2" />
//   </svg>
// );

// const InstagramIcon = ({ className }: { className?: string }) => (
//   <svg
//     className={className}
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
//     <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
//     <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
//   </svg>
// );

// const YoutubeIcon = ({ className }: { className?: string }) => (
//   <svg
//     className={className}
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
//     <path d="m10 15 5-3-5-3z" />
//   </svg>
// );

// const AboutMe = async () => {
//   const existingAbout = await db.select().from(aboutTable).limit(1);
//   const heroInfo = await db
//     .select({ imageUrl: heroTable.imageUrl })
//     .from(heroTable)
//     .limit(1);

//   const aboutData = existingAbout[0] || null;
//   const imageUrl = heroInfo[0]?.imageUrl || null;

//   return (
//     <section className="min-h-screen w-full snap-start flex items-center justify-center bg-black text-white px-6 py-20 md:py-32">
//       <div className="max-w-6xl w-full mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
//         {/* Left Column - Image & Socials */}
//         <div className="md:col-span-4 flex flex-row items-center justify-center gap-6 md:gap-8">
//           {/* social icon */}
//           <div className="flex flex-col gap-4">
//             <Link
//               href="#"
//               className="p-2 bg-zinc-800 rounded-full hover:bg-orange-500 hover:text-black transition-colors"
//             >
//               <GithubIcon className="w-5 h-5" />
//             </Link>
//             <Link
//               href="#"
//               className="p-2 bg-zinc-800 rounded-full hover:bg-orange-500 hover:text-black transition-colors"
//             >
//               <LinkedinIcon className="w-5 h-5" />
//             </Link>
//             <Link
//               href="#"
//               className="p-2 bg-zinc-800 rounded-full hover:bg-orange-500 hover:text-black transition-colors"
//             >
//               <InstagramIcon className="w-5 h-5" />
//             </Link>
//           </div>

//           <div className="relative">
//             <div className="relative w-full max-w-[280px] md:max-w-[320px] aspect-[4/5] rounded-lg overflow-hidden border border-zinc-800 shadow-2xl bg-zinc-900">
//               {imageUrl ? (
//                 // eslint-disable-next-line @next/next/no-img-element
//                 <img
//                   src={imageUrl}
//                   alt="Profile"
//                   className="w-full h-full object-cover"
//                 />
//               ) : (
//                 <div className="absolute inset-0 flex items-center justify-center text-zinc-600">
//                   [Profile Image Placeholder]
//                 </div>
//               )}
//             </div>

//             {/* Signature Overlapping Bottom-Right */}
//             <div className="absolute -bottom-6 -right-12 z-10 scale-125 md:scale-150 transform -rotate-45 origin-bottom-right">
//               {aboutData?.signature ? (
//                 // eslint-disable-next-line @next/next/no-img-element
//                 <img
//                   src={aboutData.signature}
//                   alt="Signature"
//                   className="h-24 drop-shadow-2xl"
//                 />
//               ) : (
//                 <div className="text-5xl md:text-6xl font-[cursive] text-orange-500 drop-shadow-2xl">
//                   {aboutData?.name || "Jyoti"}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Right Column - Content */}
//         <div className="md:col-span-8 flex flex-col items-start text-left">
//           <h2 className="text-orange-500 font-bold tracking-widest text-sm uppercase mb-4">
//             {aboutData?.name ? `Who I Am - ${aboutData.name}` : "Who I Am"}
//           </h2>

//           <p className="text-xl md:text-2xl font-bold leading-relaxed mb-8 text-zinc-100">
//             {aboutData?.aboutDescription ||
//               "IT professional with 15+ years of experience in Control-M administration, batch workflow design, production support, infrastructure management, automation, and ITIL-led service delivery. Currently supporting enterprise Control-M customers at BMC Software, with deep experience across banking environments, Unix/Linux and Windows platforms, shell scripting, Python, SQL, VBA, UiPath RPA, REST APIs, and AI-assisted support tooling."}
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default AboutMe;

import React from "react";
import Link from "next/link";
import { AboutDataResponse } from "@/hooks/useAbout";

interface AboutMeProps {
  data: AboutDataResponse | null;
  loading: boolean;
  error: string | null;
}

const GithubIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
    <path d="m10 15 5-3-5-3z" />
  </svg>
);

const AboutMe = ({ data, loading, error }: AboutMeProps) => {
  const aboutData = data?.about || null;
  const imageUrl = data?.imageUrl || null;
  const contactData = data?.contact || null;

  const socialLinks = [
    { icon: GithubIcon, href: contactData?.github || "#", label: "GitHub" },
    {
      icon: LinkedinIcon,
      href: contactData?.linkedin || "#",
      label: "LinkedIn",
    },
    {
      icon: InstagramIcon,
      href: "#", // Add instagram to contactTable schema if you want dynamic data here
      label: "Instagram",
    },
    { icon: YoutubeIcon, href: "#", label: "YouTube" }, // Add youtube to contactTable schema if you want dynamic data here
  ];

  return (
    <section
      id="about"
      className="min-h-screen w-full snap-start flex items-center justify-center bg-[#0a0a0a] text-white px-6 py-20 md:py-32"
    >
      <div className="w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-5 items-center">
        {/* ── Left Column ── */}
        <div className="flex flex-row items-start justify-center gap-5 md:gap-7">
          {/* Social icons */}
          <div className="flex flex-col gap-3 pt-8">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <Link
                key={label}
                href={href}
                aria-label={label}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:bg-orange-500 hover:border-orange-500 hover:text-white transition-all duration-200"
              >
                <Icon className="w-4 h-4" />
              </Link>
            ))}
          </div>

          {/* Profile image + signature */}
          <div className="relative flex-1 max-w-[300px] md:max-w-[400px]">
            <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-2xl">
              {imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={imageUrl}
                  alt={`${aboutData?.name || "Profile"} photo`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-zinc-600 text-sm">
                  Profile Image
                </div>
              )}

              {/* Subtle orange gradient overlay at bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-orange-950/40 to-transparent pointer-events-none" />
            </div>

            {/* Signature — overlapping bottom-right */}
            <div className="absolute -bottom-30 -right-40 z-10 pointer-events-none rotate-[-12deg] origin-bottom-right">
              {aboutData?.signature ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={aboutData.signature}
                  alt="Signature"
                  className="h-80 w-80 drop-shadow-xl"
                />
              ) : (
                <span className="text-5xl font-[cursive] text-orange-500 drop-shadow-xl whitespace-nowrap">
                  {aboutData?.name?.split(" ")[0] || "Jyoti"}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* ── Right Column ── */}
        <div className="flex flex-col gap-5 items-start text-left">
          {/* Eyebrow */}
          <div className="flex items-center gap-3">
            <span className="w-7 h-px bg-orange-500" />
            <span className="text-orange-500 text-[11px] font-semibold tracking-[0.18em] uppercase">
              Who I Am
            </span>
          </div>

          {/* Name heading */}
          {/* {aboutData?.name && (
            <h2 className="text-3xl md:text-[2.5rem] font-semibold leading-tight tracking-tight text-white">
              {aboutData.name}
            </h2>
          )} */}

          {/* Orange rule */}
          {/* <span className="w-10 h-0.5 bg-orange-500 rounded-full" /> */}

          {/* Bio */}
          <p className="text-[15px] md:text-base text-zinc-400 leading-relaxed">
            {aboutData?.aboutDescription ||
              "IT professional with 15+ years of experience in Control-M administration, batch workflow design, production support, infrastructure management, automation, and ITIL-led service delivery. Currently supporting enterprise Control-M customers at BMC Software, with deep experience across banking environments, Unix/Linux and Windows platforms, shell scripting, Python, SQL, VBA, UiPath RPA, REST APIs, and AI-assisted support tooling."}
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
