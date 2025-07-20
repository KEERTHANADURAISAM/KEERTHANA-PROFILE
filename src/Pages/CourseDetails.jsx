import React from 'react'

const CourseDetails = () => {
  return (
<section id="projects" className="relative z-10 min-h-screen flex items-center justify-center py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              My Projects
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mb-4"></div>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Here are some of my recent projects that showcase my skills and creativity
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((project) => (
              <div key={project} className="group relative bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/50 hover:border-blue-400/50 transition-all duration-300 hover:transform hover:scale-105">
                {/* Project Image */}
                <div className="h-48 bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                  <span className="text-gray-400">Project {project}</span>
                </div>
                
                {/* Project Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">Project Title {project}</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Sed do eiusmod tempor incididunt ut labore.
                  </p>
                  
                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs">React</span>
                    <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-xs">CSS</span>
                    <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs">JS</span>
                  </div>
                  
                  {/* Links */}
                  <div className="flex gap-4">
                    <button className="text-blue-400 hover:text-blue-300 transition-colors text-sm">
                      Live Demo
                    </button>
                    <button className="text-purple-400 hover:text-purple-300 transition-colors text-sm">
                      GitHub
                    </button>
                  </div>
                </div>
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
  )
}

export default CourseDetails