"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Project } from "@/lib/schema";
import { Button } from "@/components/ui/button";

interface FeaturedProjectsCarouselProps {
  projects: Project[];
}

export default function FeaturedProjectsCarousel({
  projects,
}: FeaturedProjectsCarouselProps) {
  const [container, setContainer] = useState<HTMLElement | null>(null);

  React.useEffect(() => {
    // Find the actual scrolling container (the main element in page.tsx)
    const mainEl = document.querySelector("main");
    if (mainEl) {
      setContainer(mainEl);
    }
  }, []);

  if (!projects || projects.length === 0) {
    return (
      <section className="h-screen w-full flex items-center justify-center bg-zinc-950 text-white relative overflow-hidden">
        <h2 className="text-4xl font-bold">No Projects Found</h2>
      </section>
    );
  }

  if (!container) {
    // Render a static placeholder for SSR/hydration
    return (
      <div className="w-full h-screen bg-zinc-950 overflow-hidden relative">
        <div className="w-[100vw] h-full flex">
          <ProjectSection
            project={projects[0]}
            index={0}
            total={projects.length}
          />
        </div>
      </div>
    );
  }

  return <CarouselInner projects={projects} scrollContainer={container} />;
}

function CarouselInner({
  projects,
  scrollContainer,
}: {
  projects: Project[];
  scrollContainer: HTMLElement;
}) {
  const targetRef = useRef<HTMLDivElement>(null);

  // Framer Motion useScroll expects a RefObject for the container
  const containerRef = useRef<HTMLElement>(scrollContainer);
  containerRef.current = scrollContainer;

  const { scrollYProgress } = useScroll({
    target: targetRef,
    container: containerRef,
    offset: ["start start", "end end"],
  });

  // Apply a spring to make the scroll incredibly smooth
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 20,
    stiffness: 100,
  });

  // Calculate the horizontal movement based on how many projects we have
  const x = useTransform(
    smoothProgress,
    [0, 1],
    ["0vw", `-${(projects.length - 1) * 100}vw`],
  );

  return (
    <div
      id="projects"
      ref={targetRef}
      className="w-full relative bg-zinc-950"
      style={{ height: `${projects.length * 100}vh` }}
    >
      {/* Dummy snap points for the parent container's vertical snap-y */}
      {projects.map((_, i) => (
        <div
          key={`snap-${i}`}
          className="absolute w-full h-screen snap-start pointer-events-none"
          style={{ top: `${i * 100}vh` }}
        />
      ))}

      {/* Sticky horizontal scrolling content */}
      <div className="sticky top-0 h-screen flex overflow-hidden w-full">
        <motion.div
          style={{ x, width: `${projects.length * 100}vw` }}
          className="flex h-full"
        >
          {projects.map((project, index) => (
            <ProjectSection
              key={project.id || index}
              project={project}
              index={index}
              total={projects.length}
            />
          ))}
        </motion.div>

        {/* Bottom Progress Line */}
        <div className="absolute bottom-8 left-0 right-0 px-6 md:px-12 flex items-center justify-center z-50 pointer-events-none">
          <div className="w-full max-w-7xl h-[2px] bg-zinc-800 rounded-full overflow-hidden relative">
            <motion.div
              className="absolute top-0 left-0 h-full w-full bg-orange-500"
              style={{ scaleX: smoothProgress, transformOrigin: "left" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectSection({
  project,
  index,
  total,
}: {
  project: Project;
  index: number;
  total: number;
}) {
  return (
    <div className="w-screen h-screen relative flex items-center justify-center text-white shrink-0 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <img
          src={project.imageUrl || "/placeholder.svg"}
          alt={project.title}
          className="object-cover w-full h-full"
        />
        {/* Gradient overlays for readability */}
        <div className="absolute inset-0 bg-zinc-950/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-center h-full">
        <div className="absolute top-12 left-6 md:left-12 z-20">
          <span className="text-orange-500 font-bold tracking-widest text-sm uppercase border border-orange-500/50 px-3 py-1  tracking-wider rounded-sm">
            Projects
          </span>
        </div>

        <div className="absolute top-12 right-6 md:right-12 z-20 font-mono text-zinc-400">
          <span className="text-white font-bold">
            {String(index + 1).padStart(2, "0")}
          </span>{" "}
          / {String(total).padStart(2, "0")}
        </div>

        <div className="flex flex-col items-start gap-6 max-w-3xl">
          {/* <div className="inline-block border border-orange-500/50 bg-orange-500/10 text-orange-500 px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-sm">
            Project
          </div> */}
          <h1 className="text-5xl md:text-7xl lg:text-7xl font-black uppercase leading-none tracking-tight break-words text-white drop-shadow-2xl">
            {project.title}
          </h1>
          <p className="text-zinc-300 text-lg md:text-2xl font-light leading-relaxed drop-shadow-lg">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mt-4">
            {project.technologies?.map((tech: string, i: number) => (
              <span
                key={i}
                className="px-3 py-1 text-xs font-medium border border-zinc-600 bg-zinc-900/60 text-zinc-200 rounded-sm backdrop-blur-sm"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 mt-8">
            {project.liveUrl && (
              <Button
                asChild
                className="bg-orange-500 hover:bg-orange-600 text-black font-bold rounded-sm h-14 px-8 text-lg"
              >
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LIVE DEMO <ArrowUpRight className="w-6 h-6 ml-2" />
                </a>
              </Button>
            )}
            {project.githubUrl && (
              <Button
                asChild
                variant="outline"
                className="border-zinc-500 text-zinc-200 hover:text-white hover:bg-zinc-800/80 rounded-sm h-14 px-8 text-lg backdrop-blur-sm bg-black/20"
              >
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  SOURCE CODE
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
