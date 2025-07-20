import React, { useState, useEffect } from 'react';

const WorkshopRegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    profession: '',
    experience: '',
    workshop: '',
    preferredDate: '',
    location: '',
    hearAbout: '',
    expectations: '',
    agreeTerms: false,
    eligibilityConfirm: false,
    financialStability: false
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [particles, setParticles] = useState([]);

  // Create particles on component mount
  useEffect(() => {
    const newParticles = [];
    for (let i = 0; i < 50; i++) {
      newParticles.push({
        id: i,
        left: Math.random() * 100,
        size: Math.random() * 4 + 2,
        delay: Math.random() * 20,
        duration: Math.random() * 10 + 15
      });
    }
    setParticles(newParticles);
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'city', 'profession', 'experience', 'workshop'];
    const isValid = requiredFields.every(field => formData[field].trim() !== '') && 
                   formData.agreeTerms && 
                   formData.eligibilityConfirm && 
                   formData.financialStability;

    if (isValid) {
      setIsSubmitted(true);
      console.log('Form submitted:', formData);
    } else {
      alert('Please fill in all required fields and accept the terms.');
    }
  };

  const workshops = [
    {
      id: 'g4g5',
      value: 'G4-G5 Elite Intraday',
      title: 'G4-G5 Elite Intraday',
      description: 'Advanced intraday trading techniques'
    },
    {
      id: 'g4g5g6',
      value: 'G4-G5-G6 Technique',
      title: 'G4-G5-G6 Technique',
      description: 'Comprehensive trading strategies'
    },
    {
      id: 's4swing',
      value: 'S4 Swing Trading',
      title: 'S4 Swing Trading',
      description: 'Master swing trading techniques'
    },
    {
      id: 'online',
      value: 'Online Workshop',
      title: 'Online Workshop',
      description: 'Virtual learning experience'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 relative overflow-hidden">
      {/* Animated Particles */}
      <div className="fixed inset-0 pointer-events-none z-10">
        {particles.map(particle => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-white opacity-10 animate-bounce"
            style={{
              left: `${particle.left}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`
            }}
          />
        ))}
      </div>

      {/* Grid Overlay */}
      <div 
        className="fixed inset-0 opacity-[0.03] z-5 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="relative z-20 container mx-auto px-4 py-8 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-4xl">
          
          {/* Success Message */}
          {isSubmitted && (
            <div className="mb-8 p-6 bg-green-500/20 backdrop-blur-lg border border-green-400/30 rounded-2xl text-center">
              <h3 className="text-2xl font-bold text-white mb-2">🎉 Registration Successful!</h3>
              <p className="text-green-100">Thank you for registering. You will receive a confirmation email shortly.</p>
            </div>
          )}

          {/* Main Form Card */}
          {!isSubmitted && (
            <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden">
              
              {/* Header */}
              <div className="px-8 py-10 text-center border-b border-white/10 relative">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 drop-shadow-lg">
                  Workshop Registration
                </h1>
                <p className="text-xl text-white/80 font-light">
                  Join Damodaran's Elite Trading Workshops - SimpleTricksIndia
                </p>
              </div>

              {/* Form Content */}
              <div className="p-8">
                <div className="space-y-8">
                  
                  {/* Personal Information */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white/90 text-sm font-semibold mb-2">
                        First Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-5 py-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all duration-300"
                        placeholder="Enter your first name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-white/90 text-sm font-semibold mb-2">
                        Last Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-5 py-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all duration-300"
                        placeholder="Enter your last name"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white/90 text-sm font-semibold mb-2">
                        Email Address <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-5 py-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all duration-300"
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-white/90 text-sm font-semibold mb-2">
                        Phone Number <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-5 py-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all duration-300"
                        placeholder="+91 XXXXX XXXXX"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white/90 text-sm font-semibold mb-2">
                        City <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-5 py-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all duration-300"
                        placeholder="Your city"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-white/90 text-sm font-semibold mb-2">
                        Profession <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="profession"
                        value={formData.profession}
                        onChange={handleInputChange}
                        className="w-full px-5 py-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all duration-300"
                        placeholder="Your profession"
                        required
                      />
                    </div>
                  </div>

                  {/* Trading Experience */}
                  <div>
                    <label className="block text-white/90 text-sm font-semibold mb-2">
                      Trading Experience <span className="text-red-400">*</span>
                    </label>
                    <select
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      className="w-full px-5 py-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all duration-300"
                      required
                    >
                      <option value="" className="bg-blue-900 text-white">Select your experience level</option>
                      <option value="beginner" className="bg-blue-900 text-white">Beginner (0-1 years)</option>
                      <option value="intermediate" className="bg-blue-900 text-white">Intermediate (1-3 years)</option>
                      <option value="advanced" className="bg-blue-900 text-white">Advanced (3+ years)</option>
                      <option value="professional" className="bg-blue-900 text-white">Professional Trader</option>
                    </select>
                  </div>

                  {/* Workshop Selection */}
                  <div>
                    <label className="block text-white/90 text-sm font-semibold mb-4">
                      Select Workshop <span className="text-red-400">*</span>
                    </label>
                    <div className="grid md:grid-cols-2 gap-4">
                      {workshops.map((workshop) => (
                        <div key={workshop.id} className="relative">
                          <input
                            type="radio"
                            id={workshop.id}
                            name="workshop"
                            value={workshop.value}
                            checked={formData.workshop === workshop.value}
                            onChange={handleInputChange}
                            className="sr-only"
                            required
                          />
                          <label
                            htmlFor={workshop.id}
                            className={`block p-6 bg-white/10 backdrop-blur-lg border rounded-2xl cursor-pointer transition-all duration-300 hover:bg-white/15 hover:scale-105 ${
                              formData.workshop === workshop.value
                                ? 'border-blue-400/60 bg-blue-400/20 shadow-lg shadow-blue-400/25'
                                : 'border-white/20'
                            }`}
                          >
                            <h4 className="text-white font-semibold text-lg mb-2">
                              {workshop.title}
                            </h4>
                            <p className="text-white/70 text-sm">
                              {workshop.description}
                            </p>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Additional Information */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white/90 text-sm font-semibold mb-2">
                        Preferred Workshop Date
                      </label>
                      <input
                        type="date"
                        name="preferredDate"
                        value={formData.preferredDate}
                        onChange={handleInputChange}
                        className="w-full px-5 py-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all duration-300"
                      />
                    </div>
                    <div>
                      <label className="block text-white/90 text-sm font-semibold mb-2">
                        Preferred Location
                      </label>
                      <select
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="w-full px-5 py-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all duration-300"
                      >
                        <option value="" className="bg-blue-900 text-white">Select location</option>
                        <option value="chennai" className="bg-blue-900 text-white">Chennai</option>
                        <option value="bangalore" className="bg-blue-900 text-white">Bangalore</option>
                        <option value="mumbai" className="bg-blue-900 text-white">Mumbai</option>
                        <option value="delhi" className="bg-blue-900 text-white">Delhi</option>
                        <option value="hyderabad" className="bg-blue-900 text-white">Hyderabad</option>
                        <option value="online" className="bg-blue-900 text-white">Online</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/90 text-sm font-semibold mb-2">
                      How did you hear about us?
                    </label>
                    <select
                      name="hearAbout"
                      value={formData.hearAbout}
                      onChange={handleInputChange}
                      className="w-full px-5 py-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all duration-300"
                    >
                      <option value="" className="bg-blue-900 text-white">Select an option</option>
                      <option value="instagram" className="bg-blue-900 text-white">Instagram</option>
                      <option value="youtube" className="bg-blue-900 text-white">YouTube</option>
                      <option value="facebook" className="bg-blue-900 text-white">Facebook</option>
                      <option value="friend" className="bg-blue-900 text-white">Friend/Referral</option>
                      <option value="google" className="bg-blue-900 text-white">Google Search</option>
                      <option value="other" className="bg-blue-900 text-white">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-white/90 text-sm font-semibold mb-2">
                      What are your expectations from this workshop?
                    </label>
                    <textarea
                      name="expectations"
                      value={formData.expectations}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-5 py-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all duration-300 resize-none"
                      placeholder="Please share your goals and expectations..."
                    />
                  </div>

                  {/* Terms and Conditions */}
                  <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
                    <h3 className="text-white font-bold text-lg mb-4">Terms and Conditions</h3>
                    <div className="max-h-64 overflow-y-auto space-y-4 text-white/80 text-sm leading-relaxed">
                      <div>
                        <h4 className="text-white font-semibold mb-2">IMPORTANT: PLEASE READ FULLY BEFORE REGISTERING</h4>
                      </div>
                      
                      <div>
                        <h4 className="text-white font-semibold mb-2">1. Eligibility</h4>
                        <p>• Participants must not be students. Only individuals who have completed their education and have some professional experience are eligible.</p>
                        <p>• Must not borrow money or pledge jewels to pay for the workshop. We want to ensure that participants are financially stable.</p>
                      </div>

                      <div>
                        <h4 className="text-white font-semibold mb-2">2. Workshop Content</h4>
                        <p>All content provided during our workshops is the intellectual property of Damodaran & SimpleTricksIndia.</p>
                      </div>

                      <div>
                        <h4 className="text-white font-semibold mb-2">3. Copyright and Intellectual Property</h4>
                        <p>• All strategies, materials, and content are protected by copyright laws under Section 13 and Section 14 of the Indian Copyright Act, 1957.</p>
                        <p>• Participants are strictly prohibited from recording, distributing, or reproducing any part of the workshop content.</p>
                        <p>• Unauthorized use will result in legal action.</p>
                      </div>

                      <div>
                        <h4 className="text-white font-semibold mb-2">4. Payment and Refunds</h4>
                        <p>• All workshop fees are non-refundable, except in cases where Damodaran SimpleTricksIndia cancels the event.</p>
                        <p>• Payment must be completed before attending the workshop.</p>
                      </div>

                      <div>
                        <h4 className="text-white font-semibold mb-2">5. Code of Conduct</h4>
                        <p>Participants are expected to conduct themselves professionally and respectfully. Disruptive behavior may result in removal without a refund.</p>
                      </div>
                    </div>

                    {/* Checkboxes */}
                    <div className="space-y-4 mt-6">
                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          id="agreeTerms"
                          name="agreeTerms"
                          checked={formData.agreeTerms}
                          onChange={handleInputChange}
                          className="w-5 h-5 mt-0.5 accent-blue-400 bg-white/10 border-white/30 rounded"
                          required
                        />
                        <label htmlFor="agreeTerms" className="text-white/90 text-sm">
                          I have read and agree to the Terms and Conditions <span className="text-red-400">*</span>
                        </label>
                      </div>

                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          id="eligibilityConfirm"
                          name="eligibilityConfirm"
                          checked={formData.eligibilityConfirm}
                          onChange={handleInputChange}
                          className="w-5 h-5 mt-0.5 accent-blue-400 bg-white/10 border-white/30 rounded"
                          required
                        />
                        <label htmlFor="eligibilityConfirm" className="text-white/90 text-sm">
                          I confirm that I meet all eligibility criteria mentioned above <span className="text-red-400">*</span>
                        </label>
                      </div>

                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          id="financialStability"
                          name="financialStability"
                          checked={formData.financialStability}
                          onChange={handleInputChange}
                          className="w-5 h-5 mt-0.5 accent-blue-400 bg-white/10 border-white/30 rounded"
                          required
                        />
                        <label htmlFor="financialStability" className="text-white/90 text-sm">
                          I confirm that I am not borrowing money or pledging assets to pay for this workshop <span className="text-red-400">*</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="w-full py-5 px-8 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold text-lg rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg"
                  >
                    Register for Workshop
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkshopRegistrationForm;