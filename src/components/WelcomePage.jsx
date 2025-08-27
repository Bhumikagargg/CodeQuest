"use client"

import { useState } from "react"
import { Button } from "./Button"
import { FloatingBubbles } from "./floating-bubbles"
import { AnimatedMascot } from "./animated-mascot"
import { Code, Users, Trophy, Sparkles, Zap, Rocket } from "./icons"

export function WelcomePage({ onStartFree, onLogin }) {
  const [showFeatures, setShowFeatures] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      <FloatingBubbles />

      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 text-8xl animate-bounce">🚀</div>
        <div className="absolute top-20 right-20 text-6xl animate-pulse">⭐</div>
        <div className="absolute bottom-20 left-20 text-7xl animate-spin-slow">💫</div>
        <div className="absolute bottom-10 right-10 text-5xl animate-bounce">✨</div>
        <div className="absolute top-1/2 left-10 text-4xl animate-float">🎮</div>
        <div className="absolute top-1/3 right-10 text-4xl animate-wiggle">🏆</div>
      </div>

      {/* Header */}
      <header className="relative z-20 flex justify-between items-center p-6 animate-slide-down">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center animate-spin-slow">
            <Code className="text-white" size={24} />
          </div>
          <span className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            CodeQuest
          </span>
        </div>

        <button
          onClick={onLogin}
          className="bg-white bg-opacity-10 backdrop-blur-sm text-white px-6 py-2 rounded-full hover:bg-opacity-20 transition-all duration-300 border border-white border-opacity-30"
        >
          🔐 Login
        </button>
      </header>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">
        {/* Main Hero Section */}
        <div className="text-center mb-12 max-w-4xl animate-fade-in">
          {/* Logo and Mascot */}
          <div className="mb-8 animate-scale-in" style={{ animationDelay: "0.2s" }}>
            <AnimatedMascot />
          </div>

          {/* Main Title */}
          <h1 className="text-6xl md:text-8xl font-bold mb-6 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
              CodeQuest
            </span>
          </h1>

          {/* Subtitle */}
          <h2
            className="text-3xl md:text-4xl font-bold text-white mb-4 animate-fade-in-up"
            style={{ animationDelay: "0.6s" }}
          >
            The Ultimate Coding Adventure Awaits! 🎮
          </h2>

          {/* Description */}
          <p
            className="text-xl md:text-2xl text-white opacity-90 mb-8 leading-relaxed animate-fade-in-up"
            style={{ animationDelay: "0.8s" }}
          >
            Transform into a coding hero through interactive games, challenges, and epic adventures.
            <br />
            <span className="text-cyan-300 font-semibold">No experience needed - just curiosity!</span>
          </p>

          {/* Main CTA Button */}
          <div className="mb-8 animate-bounce-in" style={{ animationDelay: "1s" }}>
            <Button
              onClick={onStartFree}
              size="lg"
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-12 py-6 text-2xl rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <Rocket className="mr-3" size={28} />🚀 Start for FREE
            </Button>
          </div>

          {/* Secondary Info */}
          <p className="text-white opacity-75 mb-8 animate-fade-in" style={{ animationDelay: "1.2s" }}>
            ✨ No credit card required • 🎯 Instant access • 🏆 Join 10,000+ learners
          </p>
        </div>

        {/* Feature Highlights */}
        <div
          className="grid md:grid-cols-3 gap-8 max-w-6xl w-full mb-12 animate-fade-in-up"
          style={{ animationDelay: "1.4s" }}
        >
          <div className="text-center p-6 bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl border border-white border-opacity-20 hover:bg-opacity-20 transition-all duration-300">
            <div className="text-5xl mb-4 animate-bounce">😊</div>
            <h3 className="text-xl font-bold text-white mb-2">Kids Zone</h3>
            <p className="text-white opacity-80 text-sm">Visual games and colorful adventures for ages 6-12</p>
          </div>

          <div className="text-center p-6 bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl border border-white border-opacity-20 hover:bg-opacity-20 transition-all duration-300">
            <div className="text-5xl mb-4 animate-pulse">🚀</div>
            <h3 className="text-xl font-bold text-white mb-2">Real Programming</h3>
            <p className="text-white opacity-80 text-sm">Hands-on coding with Python, JavaScript & more</p>
          </div>

          <div className="text-center p-6 bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl border border-white border-opacity-20 hover:bg-opacity-20 transition-all duration-300">
            <div className="text-5xl mb-4 animate-spin-slow">🏆</div>
            <h3 className="text-xl font-bold text-white mb-2">Unlimited Challenges</h3>
            <p className="text-white opacity-80 text-sm">500+ challenges with AI-generated content</p>
          </div>
        </div>

        {/* Stats Section */}
        <div
          className="flex flex-wrap justify-center gap-8 mb-12 animate-fade-in-up"
          style={{ animationDelay: "1.6s" }}
        >
          {[
            {
              icon: Users,
              label: "Active Learners",
              value: "10,000+",
              emoji: "👥",
              color: "from-blue-400 to-cyan-400",
            },
            {
              icon: Trophy,
              label: "Challenges Solved",
              value: "50,000+",
              emoji: "🏆",
              color: "from-yellow-400 to-orange-400",
            },
            { icon: Sparkles, label: "Success Rate", value: "95%", emoji: "⭐", color: "from-purple-400 to-pink-400" },
            { icon: Zap, label: "Lines of Code", value: "1M+", emoji: "⚡", color: "from-green-400 to-emerald-400" },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center p-6 rounded-xl bg-gradient-to-br ${stat.color} bg-opacity-20 backdrop-blur-sm border border-white border-opacity-20 hover:scale-110 transition-all duration-300 animate-bounce-in`}
              style={{ animationDelay: `${1.8 + i * 0.1}s` }}
            >
              <div className="text-3xl mb-2">{stat.emoji}</div>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-sm text-white opacity-80">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* What You'll Learn Section */}
        <div className="max-w-4xl w-full text-center mb-12 animate-fade-in-up" style={{ animationDelay: "2s" }}>
          <h3 className="text-3xl font-bold text-white mb-8">What You'll Master 🎯</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 border border-white border-opacity-20">
              <h4 className="text-xl font-bold text-cyan-300 mb-4">🎮 For Kids (6-12)</h4>
              <div className="space-y-2 text-white opacity-90 text-left">
                <div>🏃 Movement & Logic Games</div>
                <div>🔢 Math Adventures</div>
                <div>🌈 Pattern Recognition</div>
                <div>🧩 Problem Solving</div>
                <div>🎨 Creative Coding</div>
              </div>
            </div>

            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 border border-white border-opacity-20">
              <h4 className="text-xl font-bold text-emerald-300 mb-4">💻 For Beginners (13+)</h4>
              <div className="space-y-2 text-white opacity-90 text-left">
                <div>🐍 Python Programming</div>
                <div>🔄 Loops & Conditions</div>
                <div>⚙️ Functions & Classes</div>
                <div>📊 Data Structures</div>
                <div>🌐 Web Development</div>
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center animate-fade-in-up" style={{ animationDelay: "2.2s" }}>
          <div className="mb-6">
            <Button
              onClick={onStartFree}
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-10 py-4 text-xl rounded-full shadow-xl transform hover:scale-105 transition-all duration-300 mr-4"
            >
              🎮 Begin Your Quest
            </Button>
            <Button
              onClick={onLogin}
              size="lg"
              variant="outline"
              className="border-2 border-white border-opacity-50 text-white hover:bg-white hover:bg-opacity-10 px-10 py-4 text-xl rounded-full backdrop-blur-sm"
            >
              🔐 I Have an Account
            </Button>
          </div>

          <p className="text-white opacity-60 text-sm">
            🔒 Safe & Secure • 👨‍👩‍👧‍👦 Parent Approved • 🌟 Trusted by Educators
          </p>
        </div>
      </div>

      {/* Floating Action Elements */}
      <div className="fixed bottom-6 right-6 z-30 animate-bounce-in" style={{ animationDelay: "2.5s" }}>
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full shadow-lg text-sm font-semibold animate-pulse">
          🔥 Limited Time: 100% FREE!
        </div>
      </div>
    </div>
  )
}
