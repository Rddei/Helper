import React from 'react'
import SectionHeader from '../components/homepage/SectionHeader'
import SectionAboutSandbox from '../components/homepage/SectionAboutSandbox'
import SectionSolutionSandbox from '../components/homepage/SectionSolutionSandbox'
import SectionReadyToUse from '../components/homepage/SectionReadyToUse'
import SectionParallax from '../components/homepage/SectionParallax'
import SectionContactUs from '../components/homepage/SectionContactUs'
import SectionWhyChoose from '../components/homepage/SectionWhyChoose'
import SectionPortfolio from '../components/homepage/SectionPortfolio'

const Homepage = () => {
  return (
    <div className='bg-black'>
        <SectionHeader />
        <SectionAboutSandbox />
        <SectionSolutionSandbox />
        <SectionReadyToUse />
        <SectionParallax topSection={<SectionWhyChoose />} bottomSection={<SectionPortfolio />} />
        <SectionContactUs />
    </div>
  )
}

export default Homepage
