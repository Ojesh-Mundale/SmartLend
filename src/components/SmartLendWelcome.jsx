import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, Shield, Zap, CheckCircle, TrendingUp, Clock, DollarSign, Target } from 'lucide-react';

export default function SmartLendWelcome({ onBeginApproval }) {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    { icon: Zap, title: 'Instant Decision', color: '#7AC142' },
    { icon: Shield, title: 'Secure Process', color: '#0033A0' },
    { icon: Sparkles, title: 'AI Assistant', color: '#0047CC' }
  ];

  const stats = [
    { value: '10K+', label: 'Loans Approved', icon: CheckCircle },
    { value: '₹50Cr+', label: 'Disbursed', icon: TrendingUp },
    { value: '2 Min', label: 'Avg Approval', icon: Clock }
  ];

  return (
    <div className="h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-96 h-96 rounded-full blur-3xl opacity-20 animate-pulse"
          style={{ 
            background: 'radial-gradient(circle, #0033A0 0%, transparent 70%)',
            top: '-10%',
            left: '-5%',
            animationDuration: '4s'
          }}
        />
        <div 
          className="absolute w-96 h-96 rounded-full blur-3xl opacity-20 animate-pulse"
          style={{ 
            background: 'radial-gradient(circle, #7AC142 0%, transparent 70%)',
            bottom: '-10%',
            right: '-5%',
            animationDuration: '5s',
            animationDelay: '1s'
          }}
        />
        
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full opacity-30"
            style={{
              background: i % 2 === 0 ? '#0033A0' : '#7AC142',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(-40px) translateX(-10px); }
          75% { transform: translateY(-20px) translateX(10px); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        .animate-slide-in-left {
          animation: slideInLeft 0.8s ease-out forwards;
        }
        .animate-slide-in-right {
          animation: slideInRight 0.8s ease-out forwards;
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        .animate-scale-in {
          animation: scaleIn 0.5s ease-out forwards;
        }
        .shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent);
          background-size: 1000px 100%;
          animation: shimmer 3s infinite;
        }
      `}</style>

      <div className="relative z-10 h-screen flex items-center justify-center p-4 lg:p-6">
        <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-6 lg:gap-12 items-center">
          {/* Left Content Card */}
          <div className={`${isVisible ? 'animate-slide-in-left' : 'opacity-0'}`}>
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-6 lg:p-8 border border-white/20 hover:shadow-3xl transition-all duration-500 transform hover:scale-[1.02]">
              <div className="mb-4">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-green-100 px-4 py-2 rounded-full text-xs lg:text-sm font-semibold mb-4 animate-fade-in-up shadow-lg"
                     style={{ animationDelay: '0.2s', opacity: 0 }}>
                  <Sparkles size={18} style={{ color: '#0033A0', animationDuration: '3s' }} className="animate-spin" />
                  <span className="bg-gradient-to-r from-blue-700 to-green-600 bg-clip-text text-transparent">
                    AI-Powered Lending
                  </span>
                </div>
                
                <h1 className={`text-4xl lg:text-5xl font-black mb-3 bg-gradient-to-r from-blue-900 to-blue-600 bg-clip-text text-transparent ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
                    style={{ animationDelay: '0.3s' }}>
                  <img src="https://upload.wikimedia.org/wikipedia/commons/d/d8/Tata_Capital_Logo-01.jpg" alt="Tata Capital Logo" style={{ height: '50px', marginRight: '10px', verticalAlign: 'middle' }} />SmartLend
                </h1>
                
                <h2 className={`text-2xl lg:text-3xl font-bold text-gray-800 mb-3 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
                    style={{ animationDelay: '0.4s' }}>
                  Instant Personal Loan Approval
                </h2>
                
                <p className={`text-gray-600 text-base lg:text-lg mb-6 leading-relaxed ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
                   style={{ animationDelay: '0.5s' }}>
                  Start your loan journey with our AI assistant. Get pre-approved in minutes with smart automation and personalized recommendations.
                </p>
              </div>

              <button 
                onClick={onBeginApproval}
                className={`group w-full font-bold py-4 px-6 rounded-2xl text-white text-base lg:text-lg flex items-center justify-center gap-3 transition-all duration-300 hover:shadow-2xl hover:scale-105 relative overflow-hidden ${isVisible ? 'animate-scale-in' : 'opacity-0'}`}
                style={{ 
                  background: 'linear-gradient(135deg, #0033A0 0%, #0047CC 100%)',
                  animationDelay: '0.6s'
                }}
              >
                <span className="absolute inset-0 shimmer" />
                <span className="relative z-10">Begin Approval</span>
                <ArrowRight size={24} className="relative z-10 group-hover:translate-x-2 transition-transform duration-300" />
              </button>

              {/* Animated Stats */}
              <div className={`grid grid-cols-3 gap-3 mt-5 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
                   style={{ animationDelay: '0.7s' }}>
                {stats.map((stat, index) => {
                  const StatIcon = stat.icon;
                  return (
                    <div key={index} 
                         className="text-center p-3 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 border border-gray-100">
                      <StatIcon size={20} className="mx-auto mb-1" style={{ color: '#0033A0' }} />
                      <div className="text-xl font-bold bg-gradient-to-r from-blue-900 to-green-600 bg-clip-text text-transparent">
                        {stat.value}
                      </div>
                      <div className="text-xs text-gray-600 font-medium">{stat.label}</div>
                    </div>
                  );
                })}
              </div>

              {/* Feature Pills with Animation */}
              <div className={`grid grid-cols-3 gap-2 mt-4 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
                   style={{ animationDelay: '0.8s' }}>
                {features.map((feature, index) => {
                  const FeatureIcon = feature.icon;
                  const isActive = activeFeature === index;
                  return (
                    <div key={index}
                         className={`flex flex-col items-center p-3 rounded-xl transition-all duration-500 ${
                           isActive 
                             ? 'bg-gradient-to-br from-blue-500 to-green-500 shadow-xl scale-110' 
                             : 'bg-gray-50 hover:bg-gray-100 hover:scale-105'
                         }`}>
                      <FeatureIcon 
                        size={20} 
                        style={{ color: isActive ? 'white' : feature.color }} 
                        className={`mb-1 transition-all duration-300 ${isActive ? 'animate-bounce' : ''}`}
                      />
                      <span className={`text-xs font-semibold text-center transition-colors duration-300 ${
                        isActive ? 'text-white' : 'text-gray-700'
                      }`}>
                        {feature.title}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Illustration with Enhanced Animation */}
          <div className={`hidden lg:flex items-center justify-center ${isVisible ? 'animate-slide-in-right' : 'opacity-0'}`}>
            <div className="relative w-full max-w-lg">
              {/* Main Circle with Gradient */}
              <div className="relative">
                <div 
                  className="w-[420px] h-[420px] rounded-full mx-auto flex items-center justify-center relative overflow-hidden shadow-2xl"
                  style={{ 
                    background: 'linear-gradient(135deg, #E6F0FF 0%, #F0F9FF 50%, #E8F5E9 100%)',
                    animation: 'float 6s ease-in-out infinite'
                  }}
                >
                  {/* Rotating Border Effect */}
                  <div 
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: 'conic-gradient(from 0deg, #0033A0, #7AC142, #0033A0)',
                      animation: 'spin 8s linear infinite',
                      opacity: 0.1
                    }}
                  />
                  
                  {/* Inner Circle */}
                  <div className="relative z-10">
                    {/* Bot Icon Container */}
                    <div 
                      className="w-32 h-32 rounded-full flex items-center justify-center shadow-2xl relative overflow-hidden"
                      style={{ 
                        background: 'linear-gradient(135deg, #0033A0 0%, #0047CC 100%)',
                        animation: 'float 4s ease-in-out infinite'
                      }}
                    >
                      <div className="absolute inset-0 bg-white opacity-20 shimmer" />
                      <Sparkles size={64} color="white" className="relative z-10 animate-pulse" />
                    </div>
                    
                    {/* Rotating Triangle Formation Cards - Professional Design */}
                    <div 
                      className="absolute inset-0 flex items-center justify-center"
                      style={{ 
                        animation: 'rotateTriangle 20s linear infinite'
                      }}
                    >
                      {/* Card 1 - Instant Approval */}
                      <div 
                        className="absolute w-32 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl shadow-xl p-4 border border-green-200"
                        style={{ 
                          transform: 'rotate(0deg) translateY(-150px)',
                          animation: 'counterRotate 20s linear infinite'
                        }}
                      >
                        <div className="flex items-center justify-center w-12 h-12 rounded-full mx-auto mb-2"
                             style={{ background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)' }}>
                          <CheckCircle size={24} color="white" />
                        </div>
                        <div className="text-center">
                          <div className="text-sm font-bold text-gray-800 mb-1">Approved</div>
                          <div className="text-xs text-gray-600">In 2 minutes</div>
                        </div>
                      </div>
                      
                      {/* Card 2 - Fast Funds */}
                      <div 
                        className="absolute w-32 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl shadow-xl p-4 border border-blue-200"
                        style={{ 
                          transform: 'rotate(120deg) translateY(-150px)',
                          animation: 'counterRotate 20s linear infinite'
                        }}
                      >
                        <div className="flex items-center justify-center w-12 h-12 rounded-full mx-auto mb-2"
                             style={{ background: 'linear-gradient(135deg, #0033A0 0%, #0047CC 100%)' }}>
                          <DollarSign size={24} color="white" strokeWidth={3} />
                        </div>
                        <div className="text-center">
                          <div className="text-sm font-bold text-gray-800 mb-1">Fast Funds</div>
                          <div className="text-xs text-gray-600">Same day</div>
                        </div>
                      </div>

                      {/* Card 3 - AI Powered */}
                      <div 
                        className="absolute w-32 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl shadow-xl p-4 border border-purple-200"
                        style={{ 
                          transform: 'rotate(240deg) translateY(-150px)',
                          animation: 'counterRotate 20s linear infinite'
                        }}
                      >
                        <div className="flex items-center justify-center w-12 h-12 rounded-full mx-auto mb-2"
                             style={{ background: 'linear-gradient(135deg, #9333EA 0%, #7C3AED 100%)' }}>
                          <Target size={24} color="white" />
                        </div>
                        <div className="text-center">
                          <div className="text-sm font-bold text-gray-800 mb-1">AI Powered</div>
                          <div className="text-xs text-gray-600">Smart decisioning</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Decorative Animated Dots */}
                <div 
                  className="absolute top-0 left-0 w-4 h-4 rounded-full animate-ping"
                  style={{ backgroundColor: '#7AC142', animationDuration: '2s' }}
                />
                <div 
                  className="absolute bottom-10 right-0 w-6 h-6 rounded-full animate-pulse"
                  style={{ backgroundColor: '#0033A0', opacity: 0.4, animationDuration: '3s' }}
                />
                <div 
                  className="absolute top-20 right-10 w-3 h-3 rounded-full animate-bounce"
                  style={{ backgroundColor: '#7AC142', animationDuration: '2s' }}
                />
                
                {/* Orbiting Elements */}
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="absolute w-3 h-3 rounded-full"
                    style={{
                      background: i % 2 === 0 ? '#0033A0' : '#7AC142',
                      top: '50%',
                      left: '50%',
                      animation: `orbit ${6 + i}s linear infinite`,
                      animationDelay: `${i * 1.5}s`,
                      transformOrigin: '0 0'
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes orbit {
          from {
            transform: rotate(0deg) translateX(210px) rotate(0deg);
          }
          to {
            transform: rotate(360deg) translateX(210px) rotate(-360deg);
          }
        }
        @keyframes rotateTriangle {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes counterRotate {
          from {
            rotate: 0deg;
          }
          to {
            rotate: -360deg;
          }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}