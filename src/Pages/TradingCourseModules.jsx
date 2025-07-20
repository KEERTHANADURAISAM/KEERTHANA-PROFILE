import React, { useState } from 'react';
import { 
  Play, 
  CheckCircle, 
  Clock, 
  Users, 
  Star, 
  TrendingUp, 
  BookOpen, 
  Award,
  Calendar,
  MessageCircle,
  CreditCard,
  Smartphone,
  Building,
  ChevronRight,
  Gift
} from 'lucide-react';

const TradingCourseModules = () => {
  const [selectedPhase, setSelectedPhase] = useState(null);
  const [showPayment, setShowPayment] = useState(false);

  const phases = [
    {
      id: 1,
      name: "Foundation Phase",
      subtitle: "Basic to Intermediate",
      price: "₹19,999",
      originalPrice: "₹25,999",
      duration: "4 Days Online",
      sessions: "2.5 Hours/Day",
      level: "Beginner to Intermediate",
      students: "5000+",
      rating: "4.9",
      color: "from-blue-500 to-purple-600",
      bgColor: "bg-gradient-to-br from-blue-500/10 to-purple-600/10",
      borderColor: "border-blue-500/30",
      features: [
        "Basic Market Understanding",
        "Chart Reading Fundamentals", 
        "Technical Analysis Basics",
        "Risk Management Principles",
        "Entry & Exit Strategies",
        "Psychology of Trading",
        "Paper Trading Practice"
      ],
      topics: [
        "Market Basics & Terminology",
        "Candlestick Patterns",
        "Support & Resistance",
        "Trend Analysis",
        "Volume Analysis",
        "Basic Indicators",
        "Money Management"
      ],
      bonuses: [
        "Free Trading Software",
        "1 Month Premium Group Access",
        "Live Market Sessions",
        "Course Materials & PDFs"
      ]
    },
    {
      id: 2,
      name: "Advanced Phase",
      subtitle: "Professional Trading",
      price: "₹34,999",
      originalPrice: "₹45,999",
      duration: "6 Days Online",
      sessions: "3 Hours/Day", 
      level: "Intermediate to Advanced",
      students: "3000+",
      rating: "4.9",
      color: "from-purple-500 to-pink-600",
      bgColor: "bg-gradient-to-br from-purple-500/10 to-pink-600/10",
      borderColor: "border-purple-500/30",
      popular: true,
      features: [
        "Advanced Technical Analysis",
        "Option Trading Strategies",
        "Time-Based Formulas",
        "Magical Formations",
        "Market Psychology",
        "Live Trading Sessions",
        "Portfolio Management"
      ],
      topics: [
        "Advanced Chart Patterns",
        "Option Buying & Selling",
        "Greeks Understanding",
        "Strike Selection",
        "Expiry Strategies",
        "Swing Trading",
        "Intraday Mastery"
      ],
      bonuses: [
        "Advanced Trading Tools",
        "3 Months Premium Group",
        "One-on-One Doubt Sessions",
        "Live Market Analysis",
        "Exclusive Trading Setups"
      ]
    },
    {
      id: 3,
      name: "Master Phase",
      subtitle: "Expert Level Trading",
      price: "₹57,999",
      originalPrice: "₹75,999",
      duration: "8 Days Online",
      sessions: "3.5 Hours/Day",
      level: "Advanced to Expert",
      students: "1500+",
      rating: "5.0",
      color: "from-orange-500 to-red-600",
      bgColor: "bg-gradient-to-br from-orange-500/10 to-red-600/10",
      borderColor: "border-orange-500/30",
      features: [
        "Secret Trading Formulas",
        "Institution-Level Strategies",
        "Market Manipulation Insights",
        "Advanced Options Tricks",
        "Algorithmic Trading Basics",
        "Risk-Free Strategies",
        "Consistent Profit Methods"
      ],
      topics: [
        "Secret Formation Patterns",
        "Timing-Based Entries",
        "Manipulation Strike Analysis",
        "Emotion Control Techniques",
        "Advanced SL Strategies",
        "Expiry Day Trading",
        "Professional Mindset"
      ],
      bonuses: [
        "Professional Trading Suite",
        "6 Months Premium Access",
        "Weekly One-on-One Calls",
        "Live Portfolio Review",
        "Exclusive Master Group",
        "Lifetime Support"
      ]
    }
  ];

  const allPhasesPackage = {
    name: "Complete Master Package",
    subtitle: "All 3 Phases + Bonuses",
    price: "₹89,999",
    originalPrice: "₹1,12,997",
    savings: "₹22,998",
    duration: "18 Days Online",
    level: "Beginner to Expert",
    color: "from-emerald-500 to-cyan-600",
    features: [
      "All Phase 1, 2 & 3 Content",
      "Lifetime Course Access",
      "1 Year Premium Group",
      "Monthly Master Classes",
      "Priority Support",
      "Exclusive Alumni Network"
    ]
  };

  const PaymentModal = ({ phase }) => (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-2xl border border-gray-700 max-w-md w-full p-6">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-white mb-2">Complete Your Payment</h3>
          <p className="text-gray-400">Choose your preferred payment method</p>
        </div>

        <div className="space-y-4 mb-6">
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center justify-between">
              <span className="text-white font-semibold">{phase?.name || 'Selected Course'}</span>
              <span className="text-2xl font-bold text-green-400">{phase?.price || '₹89,999'}</span>
            </div>
            {phase?.originalPrice && (
              <div className="text-sm text-gray-400 mt-1">
                <span className="line-through">{phase.originalPrice}</span>
                <span className="text-green-400 ml-2">Save ₹{parseInt(phase.originalPrice.replace('₹', '').replace(',', '')) - parseInt(phase.price.replace('₹', '').replace(',', ''))}</span>
              </div>
            )}
          </div>

          {/* Bank Transfer */}
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center space-x-3 mb-3">
              <Building className="w-6 h-6 text-blue-400" />
              <span className="text-white font-semibold">Bank Transfer</span>
            </div>
            <div className="text-sm text-gray-300 space-y-1">
              <p><strong>Bank:</strong> Karur Vysya Bank</p>
              <p><strong>A/C Name:</strong> Muthuvel Murugan</p>
              <p><strong>A/C No:</strong> 1173155000140451</p>
              <p><strong>IFSC:</strong> KVBL0001173</p>
            </div>
          </div>

          {/* Digital Payments */}
          <div className="grid grid-cols-2 gap-3">
            <button className="bg-purple-600 hover:bg-purple-700 rounded-lg p-4 flex flex-col items-center space-y-2 transition-colors">
              <Smartphone className="w-8 h-8 text-white" />
              <span className="text-white font-semibold">PhonePe</span>
              <span className="text-purple-200 text-sm">9363238386</span>
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 rounded-lg p-4 flex flex-col items-center space-y-2 transition-colors">
              <Smartphone className="w-8 h-8 text-white" />
              <span className="text-white font-semibold">GPay</span>
              <span className="text-blue-200 text-sm">9363238386</span>
            </button>
          </div>
        </div>

        <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-4 mb-4">
          <p className="text-yellow-300 text-sm">
            <strong>Important:</strong> After payment, send screenshot to WhatsApp: <strong>+91 9363238386</strong> for slot confirmation
          </p>
        </div>

        <div className="flex space-x-3">
          <button 
            onClick={() => setShowPayment(false)}
            className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-semibold transition-colors"
          >
            Cancel
          </button>
          <button className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-3 rounded-lg font-semibold transition-colors">
            Confirm Payment
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-blue-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-blue-600/20 backdrop-blur-sm border border-blue-500/30 rounded-full px-6 py-2 mb-6">
            <Award className="w-5 h-5 text-blue-400" />
            <span className="text-blue-300 font-semibold">Trading Professor Courses</span>
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
            Master Trading with Our
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mt-2">
              Secret Formulas
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Learn the secret formations and timing strategies that professional traders use. 
            From basics to advanced techniques, become a profitable trader with our proven methods.
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto mt-10">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">9,500+</div>
              <div className="text-gray-400">Students Trained</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">95%</div>
              <div className="text-gray-400">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">4.9★</div>
              <div className="text-gray-400">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">3+</div>
              <div className="text-gray-400">Years Experience</div>
            </div>
          </div>
        </div>

        {/* All Phases Package */}
        <div className="mb-12">
          <div className="bg-gradient-to-r from-emerald-500/10 to-cyan-600/10 backdrop-blur-sm border border-emerald-500/30 rounded-2xl p-8 relative overflow-hidden">
            <div className="absolute top-4 right-4 bg-gradient-to-r from-emerald-500 to-cyan-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
              BEST VALUE
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-3xl font-bold text-white mb-2">{allPhasesPackage.name}</h3>
                <p className="text-emerald-300 text-lg mb-4">{allPhasesPackage.subtitle}</p>
                
                <div className="flex items-baseline space-x-4 mb-6">
                  <span className="text-4xl font-bold text-white">{allPhasesPackage.price}</span>
                  <span className="text-2xl text-gray-400 line-through">{allPhasesPackage.originalPrice}</span>
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Save {allPhasesPackage.savings}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm text-gray-300 mb-6">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>{allPhasesPackage.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4" />
                    <span>{allPhasesPackage.level}</span>
                  </div>
                </div>

                <button 
                  onClick={() => {setSelectedPhase(allPhasesPackage); setShowPayment(true);}}
                  className="bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
                >
                  Enroll Complete Package
                </button>
              </div>

              <div className="space-y-3">
                {allPhasesPackage.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Individual Phases */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {phases.map((phase, index) => (
            <div 
              key={phase.id}
              className={`${phase.bgColor} backdrop-blur-sm border ${phase.borderColor} rounded-2xl p-6 relative transition-all duration-300 hover:transform hover:scale-105 ${phase.popular ? 'ring-2 ring-purple-500' : ''}`}
            >
              {phase.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  MOST POPULAR
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">{phase.name}</h3>
                <p className="text-gray-300">{phase.subtitle}</p>
                
                <div className="flex items-baseline justify-center space-x-2 mt-4">
                  <span className="text-3xl font-bold text-white">{phase.price}</span>
                  <span className="text-lg text-gray-400 line-through">{phase.originalPrice}</span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm text-gray-300 mt-4">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{phase.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{phase.students}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <BookOpen className="w-4 h-4" />
                    <span>{phase.sessions}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>{phase.rating}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <h4 className="text-white font-semibold mb-3 flex items-center">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Course Topics
                  </h4>
                  <div className="space-y-2">
                    {phase.topics.slice(0, 4).map((topic, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-sm text-gray-300">
                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                        <span>{topic}</span>
                      </div>
                    ))}
                    {phase.topics.length > 4 && (
                      <div className="text-sm text-gray-400">+ {phase.topics.length - 4} more topics</div>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-semibold mb-3 flex items-center">
                    <Gift className="w-4 h-4 mr-2" />
                    Bonus Features
                  </h4>
                  <div className="space-y-2">
                    {phase.bonuses.slice(0, 3).map((bonus, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-sm text-gray-300">
                        <CheckCircle className="w-4 h-4 text-blue-400 flex-shrink-0" />
                        <span>{bonus}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <button 
                onClick={() => {setSelectedPhase(phase); setShowPayment(true);}}
                className={`w-full bg-gradient-to-r ${phase.color} hover:opacity-90 text-white py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2`}
              >
                <span>Enroll Phase {phase.id}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Class Schedule */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 mb-12">
          <h3 className="text-3xl font-bold text-white mb-6 text-center">Upcoming Class Schedule</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Calendar className="w-6 h-6 text-blue-400" />
                <h4 className="text-xl font-semibold text-white">Online Classes</h4>
              </div>
              <div className="space-y-2 text-gray-300">
                <p><strong>Dates:</strong> August 27, 28, 29</p>
                <p><strong>Duration:</strong> 4 Days</p>
                <p><strong>Timing:</strong> 2.5 Hours per Day</p>
                <p><strong>Mode:</strong> Live Online Sessions</p>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Users className="w-6 h-6 text-purple-400" />
                <h4 className="text-xl font-semibold text-white">Offline Classes</h4>
              </div>
              <div className="space-y-2 text-gray-300">
                <p><strong>Date:</strong> September 20th</p>
                <p><strong>Duration:</strong> Full Day Session</p>
                <p><strong>Timing:</strong> 9 AM - 6 PM</p>
                <p><strong>Mode:</strong> In-Person Training</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact & Support */}
        <div className="text-center bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-white mb-4">Need Help? Contact Us</h3>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <a 
              href="tel:+919363238386"
              className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              <span>WhatsApp: +91 9363238386</span>
            </a>
            <p className="text-gray-400">Available 9 AM - 9 PM for doubts & queries</p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 bg-gray-800/30 backdrop-blur-sm border border-gray-700/30 rounded-xl p-6">
          <p className="text-gray-400 text-sm leading-relaxed">
            <strong>Disclaimer:</strong> All strategies and materials provided are for educational purposes only. 
            Trading involves substantial risk of loss. Past performance does not guarantee future results. 
            Always consult with a qualified financial advisor before making investment decisions.
          </p>
        </div>
      </div>

      {/* Payment Modal */}
      {showPayment && <PaymentModal phase={selectedPhase} />}
    </div>
  );
};

export default TradingCourseModules;