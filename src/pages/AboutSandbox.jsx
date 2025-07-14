import React from 'react'
import SectionHeader from '../components/about/SectionHeader'
import SectionRate from '../components/about/SectionRate'
import SectionRecommended from '../components/about/SectionRecommended'
import SectionVisiMisi from '../components/about/SectionVisiMisi'
import SectionContactUs from '../components/about/SectionContactUs'
import SectionParallax from '../components/SectionParallax'

const AboutSandbox = () => {
  return (
    <div className='bg-black'>
      <SectionHeader />
      <SectionRate />
      <SectionParallax topSection={<SectionVisiMisi />} bottomSection={<SectionRecommended />} />
      <SectionContactUs />
    </div>
  )
}

export default AboutSandbox