"use client";

import React from "react";
import { useHome } from "./Hooks";
import Hero from "@/components/sections/Hero";

const HomeContainer = () => {
  const { data, loading, error } = useHome();

  return <Hero data={data} loading={loading} error={error} />;
};

export default HomeContainer;
