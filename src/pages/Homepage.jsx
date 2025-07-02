import React from 'react'
import SectionHeader from '../components/homepage/SectionHeader'
import SectionAboutSandbox from '../components/homepage/SectionAboutSandbox'
import SectionSolutionSandbox from '../components/homepage/SectionSolutionSandbox'
import SectionReadyToUse from '../components/homepage/SectionReadyToUse'
import SectionParallax from '../components/homepage/SectionParallax'
import SectionContactUs from '../components/homepage/SectionContactUs'

const Homepage = () => {
  return (
    <div>
        <SectionHeader />
        <SectionAboutSandbox />
        <SectionSolutionSandbox />
        <SectionReadyToUse />
        <SectionParallax />
        <SectionContactUs />
    </div>
  )
}

export default Homepage
