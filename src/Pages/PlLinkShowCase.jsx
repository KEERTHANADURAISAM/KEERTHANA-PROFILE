import React, { useState } from 'react';
import { ExternalLink, TrendingUp, Calendar, DollarSign, BarChart3, Target, Zap } from 'lucide-react';

const PlLinkShowcase = () => {
  // Sample P&L data - replace with your actual data
  const pnlData = [
    {
      id: 1,
      title: "Refined Furniture Strategy",
      url: "https://web.sensibull.com/verified-pnl/refined-furniture/17QlyWQV4R1Nt0",
      profit: "+₹2,45,670",
      profitPercent: "+78.2%",
      date: "Dec 2024",
      trades: 156,
      winRate: "85%",
      image: "/api/placeholder/300/200"
    },
    {
      id: 2,
      title: "Tech Momentum Play",
      url: "https://web.sensibull.com/verified-pnl/tech-momentum/28ABC123",
      profit: "+₹1,89,450",
      profitPercent: "+65.4%",
      date: "Nov 2024",
      trades: 89,
      winRate: "79%",
      image: "/api/placeholder/300/200"
    },
    {
      id: 3,
      title: "Banking Sector Calls",
      url: "https://web.sensibull.com/verified-pnl/banking-calls/39XYZ789",
      profit: "+₹3,12,890",
      profitPercent: "+92.1%",
      date: "Oct 2024",
      trades: 234,
      winRate: "88%",
      image: "/api/placeholder/300/200"
    },
    {
      id: 4,
      title: "NIFTY Options Strategy",
      url: "https://web.sensibull.com/verified-pnl/nifty-options/44DEF456",
      profit: "+₹1,67,230",
      profitPercent: "+56.8%",
      date: "Sep 2024",
      trades: 167,
      winRate: "82%",
      image: "/api/placeholder/300/200"
    },
    {
      id: 5,
      title: "Pharma Swing Trades",
      url: "https://web.sensibull.com/verified-pnl/pharma-swing/55GHI789",
      profit: "+₹2,78,450",
      profitPercent: "+84.3%",
      date: "Aug 2024",
      trades: 123,
      winRate: "87%",
      image: "/api/placeholder/300/200"
    },
    {
      id: 6,
      title: "Energy Sector Puts",
      url: "https://web.sensibull.com/verified-pnl/energy-puts/66JKL012",
      profit: "+₹1,45,670",
      profitPercent: "+48.9%",
      date: "Jul 2024",
      trades: 98,
      winRate: "76%",
      image: "/api/placeholder/300/200"
    },
    {
      id: 7,
      title: "Small Cap Discovery",
      url: "https://web.sensibull.com/verified-pnl/smallcap/77MNO345",
      profit: "+₹4,12,890",
      profitPercent: "+127.5%",
      date: "Jun 2024",
      trades: 67,
      winRate: "91%",
      image: "/api/placeholder/300/200"
    },
    {
      id: 8,
      title: "Iron Condor Master",
      url: "https://web.sensibull.com/verified-pnl/iron-condor/88PQR678",
      profit: "+₹1,98,760",
      profitPercent: "+67.2%",
      date: "May 2024",
      trades: 145,
      winRate: "83%",
      image: "/api/placeholder/300/200"
    },
    {
      id: 9,
      title: "Commodity Futures",
      url: "https://web.sensibull.com/verified-pnl/commodity/99STU901",
      profit: "+₹2,56,340",
      profitPercent: "+76.8%",
      date: "Apr 2024",
      trades: 189,
      winRate: "81%",
      image: "/api/placeholder/300/200"
    },
    {
      id: 10,
      title: "Crypto Options Alpha",
      url: "https://web.sensibull.com/verified-pnl/crypto-options/10VWX234",
      profit: "+₹3,45,120",
      profitPercent: "+112.4%",
      date: "Mar 2024",
      trades: 78,
      winRate: "89%",
      image: "/api/placeholder/300/200"
    },
    {
      id: 11,
      title: "Event Driven Strategies",
      url: "https://web.sensibull.com/verified-pnl/event-driven/11YZA567",
      profit: "+₹1,78,920",
      profitPercent: "+59.6%",
      date: "Feb 2024",
      trades: 134,
      winRate: "78%",
      image: "/api/placeholder/300/200"
    },
    {
      id: 12,
      title: "Volatility Harvesting",
      url: "https://web.sensibull.com/verified-pnl/volatility/12BCD890",
      profit: "+₹2,89,450",
      profitPercent: "+89.7%",
      date: "Jan 2024",
      trades: 167,
      winRate: "86%",
      image: "/api/placeholder/300/200"
    }
  ];

  // Add more entries to reach 32 total
  const allPnlData = [...pnlData];
  for (let i = 13; i <= 32; i++) {
    allPnlData.push({
      id: i,
      title: `Strategy ${i}`,
      url: `https://web.sensibull.com/verified-pnl/strategy-${i}/${i}ABC${i}`,
      profit: `+₹${Math.floor(Math.random() * 500000 + 100000).toLocaleString()}`,
      profitPercent: `+${(Math.random() * 100 + 20).toFixed(1)}%`,
      date: "2024",
      trades: Math.floor(Math.random() * 200 + 50),
      winRate: `${Math.floor(Math.random() * 30 + 70)}%`,
      image: "/api/placeholder/300/200"
    });
  }

  const [filter, setFilter] = useState('all');
  const [hoveredCard, setHoveredCard] = useState(null);

  const handleCardClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const totalProfit = "₹45,67,890";
  const totalTrades = "4,567";
  const avgWinRate = "84%";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-blue-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gray-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-gray-600 rounded-full mb-6">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
          
          <h1 className="text-5xl font-bold text-white mb-4">
            Verified P&L 
            <span className="bg-gradient-to-r from-blue-400 to-gray-400 bg-clip-text text-transparent"> Results</span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Real trading results from our proven strategies. Each link shows verified profit & loss statements.
          </p>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-600/30 hover:border-blue-500/50 transition-all duration-300">
              <DollarSign className="w-8 h-8 text-green-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-white">{totalProfit}</div>
              <div className="text-gray-300">Total Profits</div>
            </div>
            <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-600/30 hover:border-blue-500/50 transition-all duration-300">
              <BarChart3 className="w-8 h-8 text-blue-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-white">{totalTrades}</div>
              <div className="text-gray-300">Total Trades</div>
            </div>
            <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-600/30 hover:border-blue-500/50 transition-all duration-300">
              <Target className="w-8 h-8 text-gray-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-white">{avgWinRate}</div>
              <div className="text-gray-300">Avg Win Rate</div>
            </div>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {['all', '2024', 'high-profit', 'options'].map((filterType) => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={`px-6 py-3 rounded-full transition-all duration-300 ${
                filter === filterType
                  ? 'bg-gradient-to-r from-blue-500 to-gray-600 text-white shadow-lg'
                  : 'bg-gray-800/50 backdrop-blur-sm text-gray-300 hover:bg-gray-700/50 border border-gray-600/30'
              }`}
            >
              {filterType.charAt(0).toUpperCase() + filterType.slice(1).replace('-', ' ')}
            </button>
          ))}
        </div>

        {/* P&L Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {allPnlData.map((pnl, index) => (
            <div
              key={pnl.id}
              className={`group cursor-pointer transform transition-all duration-500 hover:scale-105 ${
                hoveredCard === pnl.id ? 'z-10' : ''
              }`}
              onClick={() => handleCardClick(pnl.url)}
              onMouseEnter={() => setHoveredCard(pnl.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-600/30 hover:border-blue-400/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20">
                {/* Image */}
                {index < 12 && (
                  <div className="h-40 bg-gradient-to-r from-gray-700/40 to-blue-600/40 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-600/30 to-blue-500/30 flex items-center justify-center">
                      <BarChart3 className="w-12 h-12 text-white/70" />
                    </div>
                    <div className="absolute top-2 right-2">
                      <ExternalLink className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
                    </div>
                  </div>
                )}
                
                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-blue-300 transition-colors">
                    {pnl.title}
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Profit:</span>
                      <span className="text-green-400 font-bold">{pnl.profit}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Returns:</span>
                      <span className="text-green-400 font-semibold">{pnl.profitPercent}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Trades:</span>
                      <span className="text-white">{pnl.trades}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Win Rate:</span>
                      <span className="text-blue-400 font-semibold">{pnl.winRate}</span>
                    </div>
                    
                    <div className="flex justify-between items-center pt-2 border-t border-gray-600/30">
                      <span className="text-gray-400 text-sm flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {pnl.date}
                      </span>
                      <div className="flex items-center text-blue-400 group-hover:text-blue-300 transition-colors">
                        <span className="text-sm font-medium">View Details</span>
                        <ExternalLink className="w-4 h-4 ml-1" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-gray-800/60 to-blue-800/60 backdrop-blur-sm rounded-3xl p-8 border border-gray-600/30 max-w-4xl mx-auto">
            <Zap className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Start Trading?</h3>
            <p className="text-gray-300 mb-6">Join our academy and learn the strategies behind these verified results.</p>
            <button className="bg-gradient-to-r from-blue-500 to-gray-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 transform hover:scale-105">
              Start Learning Today
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlLinkShowcase;