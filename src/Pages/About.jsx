import React from 'react';

const About = () => {
  return (
    <div className="mt-20">
      {/* About Section */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Profile Image Placeholder */}
          <div className="relative">
            <div className="w-80 h-80 mx-auto bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center border-2 border-blue-400/30">
              <div className="w-64 h-64 bg-gray-700 rounded-full flex items-center justify-center">
  <img 
        src="/your-image-path.jpg" // <-- Replace with your actual image path
        alt="Profile"
        className="object-cover w-full h-full"
      />
              </div>
            </div>
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-400 rounded-full animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          </div>

          {/* About Content */}
          <div className="text-white">
            <h3 className="text-2xl font-bold mb-4 text-blue-400">TRADING PROFESSOR</h3>
                      <p className="text-gray-300 mb-6 leading-relaxed">
             
I'm a full-time trader with a passion for financial markets and a strong focus on consistency, risk management, and data-driven strategies. With over 5 years of hands-on experience in trading stocks, forex, and crypto, I help others grow their capital through smart portfolio management and copy trading services. I believe in transparency, discipline, and continuous learning—traits that define every trade I take.

Whether you're a beginner looking to learn or an investor wanting passive returns, I’m here to guide you toward smarter trading decisions.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">5+</div>
                <div className="text-gray-400 text-sm">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">100%</div>
                <div className="text-gray-400 text-sm">Client Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
