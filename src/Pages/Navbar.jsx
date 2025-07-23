import React from 'react'
import AnimatedGridBackground from './AnimatedGridBackground'

const Navbar = () => {
  return (
    // <AnimatedGridBackground>
     <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            
            {/* Logo/Brand */}
            <div className="flex items-center space-x-4">
  <img
    src="/Tslogo.png" // Replace with your actual logo path
    alt="Logo"
    className="h-20 w-auto"
  />
</div>


            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {['Home', 'About', 'Course','Track Record'].map((item, index) => (
                <div key={item} className="relative group">
                  <button className="px-6 py-3 text-gray-300 hover:text-white transition-all duration-300 font-medium relative overflow-hidden">
                    {/* Hover background effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-lg"></div>
                    
                    {/* Glowing border on hover */}
                    <div className="absolute inset-0 rounded-lg border border-transparent group-hover:border-blue-400/30 transition-all duration-300"></div>
                    
                    <span className="relative z-10">{item}</span>
                    
                    {/* Animated underline */}
                    <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full group-hover:left-0 transition-all duration-300"></div>
                  </button>
                </div>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 text-gray-300 hover:text-white transition-colors">
              <div className="w-6 h-6 flex flex-col justify-center items-center space-y-1">
                <div className="w-full h-0.5 bg-current transform transition-all duration-300"></div>
                <div className="w-full h-0.5 bg-current transform transition-all duration-300"></div>
                <div className="w-full h-0.5 bg-current transform transition-all duration-300"></div>
              </div>
            </button>
          </div>
        </div>
      </nav>
    //   {/* </AnimatedGridBackground> */}
  )
}

export default Navbar





     
