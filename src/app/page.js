"use client";

import React, { useState, useEffect } from 'react';
import { ArrowRight, Send, Mail, Globe, Shield, Clock, CheckCircle, Star, Sparkles, Zap, Code, Database, Cloud } from 'lucide-react';

export default function ComingSoonPage() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [timeLeft, setTimeLeft] = useState({
    days: 21,
    hours: 14,
    minutes: 32,
    seconds: 0
  });

  // Mouse tracking for parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleEmailSubmit = () => {
    if (email && email.includes('@')) {
      setIsSubmitted(true);
      setEmail('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleEmailSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Dynamic background with tech gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent"></div>
        </div>
      </div>

      {/* Floating orbs with parallax */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-full filter blur-3xl animate-pulse"
          style={{
            top: '10%',
            left: '10%',
            transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`
          }}
        />
        <div 
          className="absolute w-80 h-80 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-full filter blur-3xl animate-pulse"
          style={{
            top: '60%',
            right: '10%',
            transform: `translate(${mousePosition.x * -0.3}px, ${mousePosition.y * -0.3}px)`,
            animationDelay: '1s'
          }}
        />
        <div 
          className="absolute w-64 h-64 bg-gradient-to-r from-teal-500/25 to-blue-500/25 rounded-full filter blur-3xl animate-pulse"
          style={{
            bottom: '10%',
            left: '30%',
            transform: `translate(${mousePosition.x * 0.7}px, ${mousePosition.y * 0.7}px)`,
            animationDelay: '2s'
          }}
        />
      </div>

      {/* Animated particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-ping"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <header className="p-6 lg:p-8">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-3 group cursor-pointer">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-400 rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 shadow-lg shadow-blue-500/25">
                <Code className="w-7 h-7 text-white" />
              </div>
              <span className="text-3xl font-black bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
                Khano
              </span>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 flex items-center justify-center px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center">
            {/* Hero section */}
            <div className="mb-16 space-y-8">
              <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 text-white/90 font-medium shadow-xl">
                <Sparkles className="w-5 h-5 mr-3 text-yellow-400 animate-pulse" />
                Next-Gen IT Solutions Launching Soon
                <Zap className="w-5 h-5 ml-3 text-cyan-400 animate-pulse" />
              </div>

              <h1 className="text-6xl md:text-8xl lg:text-9xl font-black leading-none">
                <span className="block bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent drop-shadow-2xl">
                  INNOVATE
                </span>
                <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent drop-shadow-2xl mt-4">
                  TRANSFORM
                </span>
              </h1>

              <p className="text-xl md:text-2xl lg:text-3xl text-white/80 font-light max-w-4xl mx-auto leading-relaxed">
                Cutting-Edge. Scalable. Future-Ready. 
                <br />
                <span className="font-semibold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  Revolutionary IT consulting services are coming.
                </span>
              </p>
            </div>

            {/* Countdown */}
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-white/90 mb-8">Official Launch Countdown</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-2xl mx-auto">
                {Object.entries(timeLeft).map(([unit, value], index) => (
                  <div 
                    key={unit}
                    className="group"
                    style={{animationDelay: `${index * 0.1}s`}}
                  >
                    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 md:p-8 shadow-2xl group-hover:bg-white/15 transition-all duration-300 group-hover:scale-105">
                      <div className="text-4xl md:text-6xl font-black bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent mb-2">
                        {String(value).padStart(2, '0')}
                      </div>
                      <div className="text-sm md:text-base text-white/60 uppercase tracking-wider font-semibold">
                        {unit}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Email signup */}
            <div className="mb-16">
              <div className="max-w-lg mx-auto">
                {!isSubmitted ? (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                        Get Priority Access
                      </h3>
                      <p className="text-white/70 text-lg">
                        Be first to experience our revolutionary IT solutions
                      </p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="your@email.com"
                        className="flex-1 px-6 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white placeholder-white/50 focus:bg-white/15 focus:border-cyan-400/50 focus:ring-4 focus:ring-cyan-400/20 outline-none transition-all duration-300 text-lg"
                      />
                      <button
                        onClick={handleEmailSubmit}
                        className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 text-white font-bold rounded-2xl shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 transform hover:scale-105 transition-all duration-300 flex items-center justify-center text-lg"
                      >
                        <Mail className="w-6 h-6 mr-3" />
                        Join Waitlist
                        <ArrowRight className="w-6 h-6 ml-3" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-xl border border-green-400/30 rounded-3xl p-8 shadow-2xl">
                    <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4 animate-bounce" />
                    <h3 className="text-2xl font-bold text-white mb-3">
                      🎉 Welcome to the Future!
                    </h3>
                    <p className="text-white/80 text-lg">
                      You&apos;ll be among the first to access our premium IT solutions
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Services teaser */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {[
                { icon: Cloud, title: "Cloud Migration", desc: "Seamless cloud transformation", color: "from-blue-400 to-cyan-400" },
                { icon: Shield, title: "Cybersecurity", desc: "Enterprise-grade protection", color: "from-green-400 to-emerald-400" },
                { icon: Database, title: "Data Analytics", desc: "AI-powered insights & automation", color: "from-purple-400 to-pink-400" }
              ].map((service, index) => (
                <div 
                  key={index}
                  className="group cursor-pointer"
                  style={{animationDelay: `${index * 0.2}s`}}
                >
                  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-500 group-hover:scale-105 group-hover:-translate-y-2 shadow-2xl">
                    <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                      <service.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">
                      {service.title}
                    </h3>
                    <p className="text-white/70">
                      {service.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social proof */}
            <div className="text-center">
              <div className="inline-flex items-center space-x-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl px-8 py-4">
                <div className="flex -space-x-3">
                  {[...Array(5)].map((_, i) => (
                    <div 
                      key={i} 
                      className={`w-10 h-10 rounded-full border-2 border-white/20 ${
                        ['bg-gradient-to-r from-blue-400 to-cyan-400',
                         'bg-gradient-to-r from-purple-400 to-pink-400',
                         'bg-gradient-to-r from-green-400 to-emerald-400',
                         'bg-gradient-to-r from-orange-400 to-red-400',
                         'bg-gradient-to-r from-indigo-400 to-purple-400'][i]
                      }`}
                    />
                  ))}
                </div>
                <div className="text-left">
                  <div className="text-white font-bold text-lg">2,156+</div>
                  <div className="text-white/60 text-sm">Companies interested</div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="p-6 text-center">
          <p className="text-white/40 text-sm">
            © 2025 Khano Solutions. Revolutionizing enterprise technology.
          </p>
        </footer>
      </div>
    </div>
  );
}