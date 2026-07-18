// "use client";

// import React, { useEffect, useState, useRef, useTransition } from "react";
// import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
// import { useSelector, useDispatch } from "react-redux";
// import { RootState, AppDispatch } from "@/lib/store";
// import { fetchContactData } from "@/lib/store/contactSlice";
// import { sendContactEmail } from "@/app/actions/contactMessage";
// import {
//   MapPin,
//   Mail,
//   Phone,
//   Send,
//   Loader2,
//   CheckCircle2,
//   XCircle,
// } from "lucide-react";

// const GithubIcon = ({ className }: { className?: string }) => (
//   <svg className={className} viewBox="0 0 24 24" fill="currentColor">
//     <path d="M12 2A10 10 0 002 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.45-1.15-1.11-1.46-1.11-1.46-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" />
//   </svg>
// );

// const LinkedinIcon = ({ className }: { className?: string }) => (
//   <svg className={className} viewBox="0 0 24 24" fill="currentColor">
//     <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
//   </svg>
// );

// const TwitterIcon = ({ className }: { className?: string }) => (
//   <svg className={className} viewBox="0 0 24 24" fill="currentColor">
//     <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
//   </svg>
// );

// /* ── 3D Tilt Card ── */
// function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
//   const mx = useMotionValue(0);
//   const my = useMotionValue(0);
//   const sx = useSpring(mx, { stiffness: 300, damping: 30 });
//   const sy = useSpring(my, { stiffness: 300, damping: 30 });
//   const rotateX = useTransform(sy, [-0.5, 0.5], ["3deg", "-3deg"]);
//   const rotateY = useTransform(sx, [-0.5, 0.5], ["-3deg", "3deg"]);

//   const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
//     const r = e.currentTarget.getBoundingClientRect();
//     mx.set((e.clientX - r.left) / r.width - 0.5);
//     my.set((e.clientY - r.top) / r.height - 0.5);
//   };

//   const handleLeave = () => {
//     mx.set(0);
//     my.set(0);
//   };

//   return (
//     <motion.div
//       style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
//       onMouseMove={handleMove}
//       onMouseLeave={handleLeave}
//       className={`relative rounded-3xl border border-slate-800/60 bg-[#0c1628]/80 backdrop-blur-xl p-8 sm:p-10 shadow-2xl ${className}`}
//     >
//       <div style={{ transform: "translateZ(30px)" }}>{children}</div>
//     </motion.div>
//   );
// }

// const Contact = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const { data: contactData, status } = useSelector(
//     (state: RootState) => state.contact
//   );
//   const isLoadingData = status === "loading";

//   useEffect(() => {
//     if (status === "idle" || (contactData === null && status !== "loading")) {
//       dispatch(fetchContactData());
//     }
//   }, [dispatch, status, contactData]);

//   // Form states
//   const [isPending, startTransition] = useTransition();
//   const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">("idle");
//   const [formMsg, setFormMsg] = useState("");
//   const formRef = useRef<HTMLFormElement>(null);

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setFormStatus("idle");

//     const formData = new FormData(e.currentTarget);
//     startTransition(async () => {
//       const res = await sendContactEmail(formData);
//       if (res.success) {
//         setFormStatus("success");
//         setFormMsg(res.message || "Message sent successfully!");
//         formRef.current?.reset();
//       } else {
//         setFormStatus("error");
//         setFormMsg(res.error || "Failed to send message.");
//       }
//     });
//   };

//   const SocialLink = ({ href, icon: Icon, label }: { href?: string; icon: any; label: string }) => {
//     if (!href) return null;
//     return (
//       <a
//         href={href}
//         target="_blank"
//         rel="noreferrer"
//         className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/40 hover:bg-slate-700/60 border border-slate-700/50 hover:border-blue-500/50 text-slate-300 hover:text-white transition-all group"
//       >
//         <Icon className="w-5 h-5 text-slate-400 group-hover:text-blue-400" />
//         <span className="font-semibold text-sm">{label}</span>
//       </a>
//     );
//   };

//   return (
//     <section className="relative w-full py-24 sm:py-32 bg-[#020617] overflow-hidden min-h-screen snap-start flex flex-col justify-center">
//       {/* Background Decor */}
//       <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-[#020617] to-[#020617] pointer-events-none" />

//       <div className="container mx-auto px-6 lg:px-12 relative z-10">
//         {/* Header */}
//         <div className="text-center mb-16 sm:mb-24">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6 }}
//           >
//             <span className="inline-block py-1.5 px-4 rounded-full bg-slate-800 border border-slate-700 text-slate-300 font-bold text-xs tracking-widest uppercase mb-4 shadow-sm">
//               Connect
//             </span>
//             <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight mb-6">
//               Let's Work{" "}
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500">
//                 Together
//               </span>
//             </h2>
//             <p className="text-lg text-slate-400 max-w-xl mx-auto leading-relaxed">
//               I'm currently available for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
//             </p>
//           </motion.div>
//         </div>

//         <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start max-w-6xl mx-auto">

//           {/* Contact Info Side */}
//           <motion.div
//             initial={{ opacity: 0, x: -30 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6, delay: 0.2 }}
//             className="flex flex-col gap-8"
//           >
//             <TiltCard className="flex flex-col gap-8">
//               {isLoadingData && !contactData ? (
//                 <div className="flex justify-center py-10">
//                   <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
//                 </div>
//               ) : (
//                 <>
//                   <div className="space-y-6">
//                     <h3 className="text-2xl font-bold text-white mb-2">Contact Details</h3>
//                     <div className="h-px w-full bg-gradient-to-r from-slate-700 to-transparent mb-6" />

//                     <div className="flex items-start gap-4">
//                       <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0">
//                         <Mail className="w-5 h-5 text-orange-400" />
//                       </div>
//                       <div>
//                         <p className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-1">Email</p>
//                         <a href={`mailto:${contactData?.email}`} className="text-lg font-bold text-slate-200 hover:text-white transition-colors">
//                           {contactData?.email || "hello@example.com"}
//                         </a>
//                       </div>
//                     </div>

//                     <div className="flex items-start gap-4">
//                       <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
//                         <Phone className="w-5 h-5 text-blue-400" />
//                       </div>
//                       <div>
//                         <p className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-1">Phone</p>
//                         <p className="text-lg font-bold text-slate-200">
//                           {contactData?.phone || "+1 (555) 123-4567"}
//                         </p>
//                       </div>
//                     </div>

//                     <div className="flex items-start gap-4">
//                       <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
//                         <MapPin className="w-5 h-5 text-emerald-400" />
//                       </div>
//                       <div>
//                         <p className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-1">Location</p>
//                         <p className="text-lg font-bold text-slate-200">
//                           {contactData?.location || "San Francisco, CA"}
//                         </p>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="pt-6 border-t border-slate-700/50">
//                     <p className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-4">Social Profiles</p>
//                     <div className="grid grid-cols-2 gap-3">
//                       <SocialLink href={contactData?.github || "https://github.com"} icon={GithubIcon} label="GitHub" />
//                       <SocialLink href={contactData?.linkedin || "https://linkedin.com"} icon={LinkedinIcon} label="LinkedIn" />
//                       {contactData?.twitter && (
//                         <SocialLink href={contactData.twitter} icon={TwitterIcon} label="Twitter" />
//                       )}
//                     </div>
//                   </div>
//                 </>
//               )}
//             </TiltCard>
//           </motion.div>

//           {/* Form Side */}
//           <motion.div
//             initial={{ opacity: 0, x: 30 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6, delay: 0.4 }}
//           >
//             <TiltCard>
//               <h3 className="text-2xl font-bold text-white mb-6">Send a Message</h3>
//               <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-5">

//                 <div className="group relative">
//                   <input
//                     type="text"
//                     name="name"
//                     required
//                     placeholder="Your Name"
//                     className="w-full bg-[#020617]/50 border border-slate-700 rounded-xl p-4 pt-6 pb-2 text-white focus:outline-none focus:border-orange-500 transition-colors peer"
//                   />
//                   <label className="absolute top-2 left-4 text-[10px] uppercase tracking-wider text-slate-500 font-bold transition-all peer-focus:text-orange-500">
//                     Name
//                   </label>
//                 </div>

//                 <div className="group relative">
//                   <input
//                     type="email"
//                     name="email"
//                     required
//                     placeholder="you@example.com"
//                     className="w-full bg-[#020617]/50 border border-slate-700 rounded-xl p-4 pt-6 pb-2 text-white focus:outline-none focus:border-orange-500 transition-colors peer"
//                   />
//                   <label className="absolute top-2 left-4 text-[10px] uppercase tracking-wider text-slate-500 font-bold transition-all peer-focus:text-orange-500">
//                     Email
//                   </label>
//                 </div>

//                 <div className="group relative">
//                   <textarea
//                     name="message"
//                     required
//                     placeholder="How can I help you?"
//                     rows={5}
//                     className="w-full bg-[#020617]/50 border border-slate-700 rounded-xl p-4 pt-6 text-white focus:outline-none focus:border-orange-500 transition-colors resize-none peer"
//                   ></textarea>
//                   <label className="absolute top-2 left-4 text-[10px] uppercase tracking-wider text-slate-500 font-bold transition-all peer-focus:text-orange-500">
//                     Message
//                   </label>
//                 </div>

//                 {/* Status Messages */}
//                 {formStatus === "success" && (
//                   <div className="flex items-center gap-2 text-emerald-400 bg-emerald-400/10 p-3 rounded-lg border border-emerald-400/20 text-sm font-semibold">
//                     <CheckCircle2 className="w-5 h-5 shrink-0" />
//                     {formMsg}
//                   </div>
//                 )}
//                 {formStatus === "error" && (
//                   <div className="flex items-center gap-2 text-red-400 bg-red-400/10 p-3 rounded-lg border border-red-400/20 text-sm font-semibold">
//                     <XCircle className="w-5 h-5 shrink-0" />
//                     {formMsg}
//                   </div>
//                 )}

//                 <button
//                   type="submit"
//                   disabled={isPending}
//                   className="mt-2 group relative w-full flex items-center justify-center gap-3 bg-gradient-to-r from-orange-500 to-amber-500 text-black font-black py-4 rounded-xl transition-all hover:scale-[1.02] disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed overflow-hidden"
//                 >
//                   {isPending ? (
//                     <>
//                       <Loader2 className="w-5 h-5 animate-spin" />
//                       Sending...
//                     </>
//                   ) : (
//                     <>
//                       Send Message
//                       <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//                     </>
//                   )}
//                   {/* Button shine effect */}
//                   <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />
//                 </button>
//               </form>
//             </TiltCard>
//           </motion.div>

//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes shimmer {
//           100% {
//             transform: translateX(100%);
//           }
//         }
//       `}</style>
//     </section>
//   );
// };

// export default Contact;

"use client";

import React, { useEffect, useState, useRef, useTransition } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/lib/store";
import { fetchContactData } from "@/containers/admin/contact/contactReducer";
import { sendContactEmail } from "@/app/actions/contactMessage";
import {
  MapPin,
  Mail,
  Phone,
  Send,
  Loader2,
  CheckCircle2,
  XCircle,
  Globe,
} from "lucide-react";

const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2A10 10 0 002 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.45-1.15-1.11-1.46-1.11-1.46-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
  </svg>
);

/* ─────────────────────────────────────────────
   3D Tilt Card
───────────────────────────────────────────── */
function TiltCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 250, damping: 28 });
  const sy = useSpring(my, { stiffness: 250, damping: 28 });
  const rotateX = useTransform(sy, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(sx, [-0.5, 0.5], ["-5deg", "5deg"]);

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
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      whileHover={{ scale: 1.01 }}
      transition={{ scale: { duration: 0.2 } }}
      className={`relative rounded-2xl border border-slate-800/60 bg-[#0c1628]/85 backdrop-blur-2xl p-7 sm:p-9 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.05)] ${className}`}
    >
      <div style={{ transform: "translateZ(24px)" }}>{children}</div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Social Link
───────────────────────────────────────────── */
function SocialLink({
  href,
  icon: Icon,
  label,
}: {
  href?: string;
  icon: React.ElementType;
  label: string;
}) {
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-800/40 hover:bg-slate-700/60 border border-slate-700/40 hover:border-orange-500/40 text-slate-400 hover:text-white transition-all duration-200 group"
    >
      <Icon className="w-4 h-4 text-slate-500 group-hover:text-orange-400 transition-colors" />
      <span className="text-xs font-bold">{label}</span>
    </a>
  );
}

/* ─────────────────────────────────────────────
   Contact Info Item
───────────────────────────────────────────── */
function ContactItem({
  icon: Icon,
  label,
  value,
  href,
  accentClass,
  iconClass,
}: {
  icon: React.ElementType;
  label: string;
  value?: string;
  href?: string;
  accentClass: string;
  iconClass: string;
}) {
  const content = (
    <div className="flex items-start gap-4">
      <div
        className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${accentClass}`}
      >
        <Icon className={`w-5 h-5 ${iconClass}`} />
      </div>
      <div>
        <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1">
          {label}
        </p>
        <p className="text-sm font-bold text-slate-200 group-hover:text-white transition-colors">
          {value || "—"}
        </p>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="group block">
        {content}
      </a>
    );
  }
  return <div>{content}</div>;
}

/* ─────────────────────────────────────────────
   Floating Label Input
───────────────────────────────────────────── */
function FloatInput({
  label,
  name,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div className="relative group">
      <label
        htmlFor={name}
        className="absolute top-2 left-4 text-[10px] uppercase tracking-wider text-slate-500 font-bold pointer-events-none z-10 group-focus-within:text-orange-400 transition-colors"
      >
        {label}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="w-full bg-[#020617]/60 border border-slate-700/70 rounded-xl px-4 pt-6 pb-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-orange-500/70 focus:bg-[#020617]/80 transition-all duration-200"
      />
    </div>
  );
}

/* ─────────────────────────────────────────────
   Floating Label Textarea
───────────────────────────────────────────── */
function FloatTextarea({
  label,
  name,
  rows = 5,
  required,
  placeholder,
}: {
  label: string;
  name: string;
  rows?: number;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div className="relative group">
      <label
        htmlFor={name}
        className="absolute top-2 left-4 text-[10px] uppercase tracking-wider text-slate-500 font-bold pointer-events-none z-10 group-focus-within:text-orange-400 transition-colors"
      >
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        required={required}
        rows={rows}
        placeholder={placeholder}
        className="w-full bg-[#020617]/60 border border-slate-700/70 rounded-xl px-4 pt-6 pb-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-orange-500/70 focus:bg-[#020617]/80 transition-all duration-200 resize-none"
      />
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main Contact Component
───────────────────────────────────────────── */
const Contact = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: contactData, status } = useSelector(
    (state: RootState) => state.contact,
  );
  const isLoadingData = status === "loading";

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchContactData());
    }
  }, [dispatch, status]);

  const [isPending, startTransition] = useTransition();
  const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">(
    "idle",
  );
  const [formMsg, setFormMsg] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("idle");
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const res = await sendContactEmail(formData);
      if (res.success) {
        setFormStatus("success");
        setFormMsg(res.message || "Message sent successfully!");
        formRef.current?.reset();
      } else {
        setFormStatus("error");
        setFormMsg(res.error || "Failed to send message.");
      }
    });
  };

  return (
    <section id="contact" className="relative w-full py-24 sm:py-32 bg-[#020617] overflow-hidden min-h-screen snap-start flex flex-col justify-center">
      {/* ── Background decorations ── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(30,58,138,0.22),transparent_70%)]" />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(148,163,184,1) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Glowing orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-900/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-orange-900/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* ── Header ── */}
        <motion.div
          className="text-center mb-16 sm:mb-20"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block py-1.5 px-5 rounded-full bg-slate-800/80 border border-slate-700/60 text-slate-300 font-bold text-[10px] tracking-widest uppercase mb-5">
            Connect
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.08] mb-5">
            Let&apos;s Work{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">
              Together
            </span>
          </h2>
          <p className="text-base text-slate-500 max-w-md mx-auto leading-relaxed">
            Currently available for new opportunities. Have a question or just
            want to say hi? I&apos;ll get back to you soon.
          </p>
        </motion.div>

        {/* ── Two-column grid ── */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start max-w-5xl mx-auto">
          {/* ── Left: Contact Info Card ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <TiltCard>
              {isLoadingData && !contactData ? (
                <div className="flex justify-center items-center py-16">
                  <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
                </div>
              ) : (
                <div className="space-y-0">
                  <h3 className="text-lg font-bold text-white mb-5">
                    Contact Details
                  </h3>
                  <div className="h-px w-full bg-gradient-to-r from-slate-700/80 to-transparent mb-6" />

                  <div className="space-y-5">
                    <ContactItem
                      icon={Mail}
                      label="Email"
                      value={contactData?.email || "hello@example.com"}
                      href={`mailto:${contactData?.email || "hello@example.com"}`}
                      accentClass="bg-orange-500/10 border border-orange-500/20"
                      iconClass="text-orange-400"
                    />
                    <ContactItem
                      icon={Phone}
                      label="Phone"
                      value={contactData?.phone || "+1 (555) 123-4567"}
                      accentClass="bg-blue-500/10 border border-blue-500/20"
                      iconClass="text-blue-400"
                    />
                    <ContactItem
                      icon={MapPin}
                      label="Location"
                      value={contactData?.location || "San Francisco, CA"}
                      accentClass="bg-emerald-500/10 border border-emerald-500/20"
                      iconClass="text-emerald-400"
                    />
                  </div>

                  {/* Social links */}
                  <div className="pt-6 mt-6 border-t border-slate-700/40">
                    <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-4">
                      Social Profiles
                    </p>
                    <div className="grid grid-cols-2 gap-2.5">
                      <SocialLink
                        href={contactData?.github || "https://github.com"}
                        icon={GithubIcon}
                        label="GitHub"
                      />
                      <SocialLink
                        href={contactData?.linkedin || "https://linkedin.com"}
                        icon={LinkedinIcon}
                        label="LinkedIn"
                      />
                      {contactData?.twitter && (
                        <SocialLink
                          href={contactData.twitter}
                          icon={TwitterIcon}
                          label="Twitter"
                        />
                      )}
                      {contactData?.website && (
                        <SocialLink
                          href={contactData.website}
                          icon={Globe}
                          label="Website"
                        />
                      )}
                    </div>
                  </div>
                </div>
              )}
            </TiltCard>
          </motion.div>

          {/* ── Right: Message Form Card ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <TiltCard>
              <h3 className="text-lg font-bold text-white mb-5">
                Send a Message
              </h3>
              <div className="h-px w-full bg-gradient-to-r from-slate-700/80 to-transparent mb-6" />

              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="flex flex-col gap-3.5"
              >
                <FloatInput
                  label="Name"
                  name="name"
                  required
                  placeholder="Alex Johnson"
                />
                <FloatInput
                  label="Email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                />
                <FloatTextarea
                  label="Message"
                  name="message"
                  required
                  rows={5}
                  placeholder="How can I help you?"
                />

                {/* Status messages */}
                {formStatus === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2.5 text-emerald-400 bg-emerald-400/8 p-3 rounded-xl border border-emerald-400/20 text-xs font-semibold"
                  >
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    {formMsg}
                  </motion.div>
                )}
                {formStatus === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2.5 text-red-400 bg-red-400/8 p-3 rounded-xl border border-red-400/20 text-xs font-semibold"
                  >
                    <XCircle className="w-4 h-4 shrink-0" />
                    {formMsg}
                  </motion.div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isPending}
                  className="mt-1 group relative w-full flex items-center justify-center gap-2.5 bg-gradient-to-r from-orange-500 to-amber-500 text-black font-black text-sm py-4 rounded-xl transition-all hover:from-orange-400 hover:to-amber-400 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:hover:scale-100 disabled:cursor-not-allowed overflow-hidden shadow-[0_8px_24px_rgba(249,115,22,0.25)] hover:shadow-[0_12px_32px_rgba(249,115,22,0.4)]"
                >
                  {/* Shimmer */}
                  <span className="absolute inset-0 -translate-x-full group-hover:animate-shimmer bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />

                  {isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            </TiltCard>
          </motion.div>
        </div>
      </div>

      {/* Shimmer keyframe */}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(200%);
          }
        }
        .animate-shimmer {
          animation: shimmer 1.6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Contact;
