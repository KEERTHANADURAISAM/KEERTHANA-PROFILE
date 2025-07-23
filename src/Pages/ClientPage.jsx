import React from 'react'
import AnimatedGridBackground from './AnimatedGridBackground'
import Navbar from './Navbar'
import TradingHeader from './TradingHeader'
import About from './About'
import TradingCourseModule from './TradingCourseModules'

const ClientPage = () => {
  return (
    <AnimatedGridBackground>
    
      <TradingHeader/>
      <About/>
      <TradingCourseModule/>
    </AnimatedGridBackground>
  )
}

export default ClientPage