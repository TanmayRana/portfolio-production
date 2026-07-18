"use client";

import React from 'react';
import AboutMe from '@/components/sections/AboutMe';
import { useAbout } from '@/hooks/useAbout';

const AboutContainer = () => {
  const { data, loading, error } = useAbout();

  return <AboutMe data={data} loading={loading} error={error} />;
};

export default AboutContainer;
