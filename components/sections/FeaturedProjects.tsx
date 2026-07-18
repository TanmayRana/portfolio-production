"use client";

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/lib/store";
import { fetchProjectsData } from "@/containers/admin/projects/projectsReducer";
import FeaturedProjectsCarousel from "./FeaturedProjectsCarousel";

export default function FeaturedProjects() {
  const dispatch = useDispatch<AppDispatch>();
  const { data: projects, status } = useSelector(
    (state: RootState) => state.projects,
  );

  console.log("projects", projects);

  useEffect(() => {
    // Only fetch if data is not already loaded
    if (projects.length === 0 && status !== "loading") {
      dispatch(fetchProjectsData());
    }
  }, [projects.length, status, dispatch]);

  if (status === "loading" && projects.length === 0) {
    return (
      <section className="h-screen w-full flex items-center justify-center bg-zinc-950 text-white relative overflow-hidden">
        <h2 className="text-2xl animate-pulse text-zinc-400">
          Loading projects...
        </h2>
      </section>
    );
  }

  return <FeaturedProjectsCarousel projects={projects as any} />;
}
