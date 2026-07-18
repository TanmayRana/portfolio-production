"use client"

import React from 'react'
import Hero from '@/components/sections/Hero'
import { useHero } from '@/hooks/useHero'

const HeroContainer = () => {
  const { data, loading, error } = useHero()

  return <Hero data={data} loading={loading} error={error} />
}

export default HeroContainer
