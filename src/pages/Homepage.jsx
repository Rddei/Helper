import React from 'react'
import SectionHeader from '../components/homepage/SectionHeader'
import SectionAboutSandbox from '../components/homepage/SectionAboutSandbox'
import SectionSolutionSandbox from '../components/homepage/SectionSolutionSandbox'
import SectionReadyToUse from '../components/homepage/SectionReadyToUse'
import SectionWhyChoose from '../components/homepage/SectionWhyChoose'
import SectionPortfolio from '../components/homepage/SectionPortfolio'
import { SectionContactUs } from '../components/homepage/SectionContactUs'
// import ParalaxSection from '../components/homepage/ParalaxSection'

const Homepage = () => {
  return (
    <div>
        <SectionHeader />
        <SectionAboutSandbox />
        <SectionSolutionSandbox />
        <SectionReadyToUse />
        <SectionWhyChoose />
        <SectionPortfolio />
        <SectionContactUs />
        {/* <ParalaxSection /> */}
    </div>
  )
}

export default Homepage