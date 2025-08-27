"use client"

import { useState, useEffect } from "react"
import { FloatingBubbles } from "./components/floating-bubbles"
import { AnimatedMascot } from "./components/animated-mascot"
import { JumpingAnimals } from "./components/jumping-animals"
import { LearningPathCard } from "./components/learning-path-card"
import { FloatingIcons } from "./components/floating-icons"
import { Sparkles, Users, Trophy, Code } from "./components/icons"
import {authenticateWithGoogle} from "./services/userService"

export default function LandingPage({
  onSectionSelect,
  user,
  onLogout,
  onNavigateToProfile,
  onNavigateToProgress,
  onNavigateToAchievements,
  onNavigateToSettings,
}) {
  const [showUserMenu, setShowUserMenu] = useState(false)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showUserMenu && !event.target.closest(".relative")) {
        setShowUserMenu(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showUserMenu])

  const handleKidsZoneClick = () => {
    onSectionSelect("kids")
  }

  const handleBeginnerPathClick = () => {
    onSectionSelect("beginners")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      <FloatingBubbles />
      <FloatingIcons />

      {/* Header */}
      <header className="relative z-20 flex justify-between items-center p-6 animate-slide-down">
        <div className="flex items-center space-x-3 hover:scale-105 transition-transform duration-300">
          <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center hover:rotate-360 transition-transform duration-500">
            <Code className="text-white" size={20} />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            CodeQuest
          </span>
        </div>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center space-x-3 bg-white bg-opacity-10 backdrop-blur-sm rounded-full px-4 py-2 text-white hover:bg-opacity-20 transition-all duration-300"
          >
            <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full flex items-center justify-center text-sm font-bold">
              {user?.avatar === "🎮" ? "🎮" : user?.firstName?.charAt(0)?.toUpperCase() || "U"}
            </div>
            <div className="hidden md:block text-left">
              <div className="text-sm font-semibold">{user?.firstName|| "User"}</div>
              <div className="text-xs opacity-80">{user?.provider || "guest"}</div>
            </div>
            <span className="text-sm">▼</span>
          </button>

          {/* Dropdown Menu */}
          {showUserMenu && (
            <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-30 animate-fade-in">
              <div className="px-4 py-3 border-b border-gray-100">
                {/* <div className="font-semibold text-gray-800">{user?.firstName || user?.name || "User"}</div> */}
                <div className="text-sm text-gray-600">{user?.email || "No email"}</div>
                {user?.provider && (
                  <div className="text-xs text-gray-500 mt-1">
                    Signed in with{" "}
                    {user.provider === "google" ? "Google" : user.provider === "email" ? "Email" : "Guest"}
                  </div>
                )}
              </div>

              <div className="py-1">
                <button
                  onClick={() => {
                    setShowUserMenu(false)
                    onNavigateToProfile()
                  }}
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors flex items-center space-x-2"
                >
                  <span>👤</span>
                  <span>View Profile</span>
                </button>

                <button
                  onClick={() => {
                    setShowUserMenu(false)
                    onNavigateToProgress()
                  }}
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors flex items-center space-x-2"
                >
                  <span>📊</span>
                  <span>My Progress</span>
                </button>

                <button
                  onClick={() => {
                    setShowUserMenu(false)
                    onNavigateToAchievements()
                  }}
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors flex items-center space-x-2"
                >
                  <span>🏆</span>
                  <span>Achievements</span>
                </button>

                <button
                  onClick={() => {
                    setShowUserMenu(false)
                    onNavigateToSettings()
                  }}
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors flex items-center space-x-2"
                >
                  <span>⚙️</span>
                  <span>Settings</span>
                </button>
              </div>

              <div className="border-t border-gray-100 mt-1 pt-1">
                <button
                  onClick={() => {
                    setShowUserMenu(false)
                    onLogout()
                  }}
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors flex items-center space-x-2"
                >
                  <span>🚪</span>
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">
        {/* Welcome Message */}
        <div className="text-center mb-6 animate-fade-in">
          <h2 className="text-2xl text-white opacity-90">
            Welcome back,{" "}
            <span className="font-bold text-cyan-400">{user?.firstName || user?.name?.split(" ")[0] || "Coder"}</span>!
            👋
          </h2>
          <p className="text-white opacity-75 mt-2">Ready to continue your coding adventure?</p>
        </div>

        {/* Mascot */}
        <div className="mb-8 animate-scale-in" style={{ animationDelay: "0.2s" }}>
          <AnimatedMascot />
        </div>

        {/* Title */}
        <div className="text-center mb-8 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
          <h1 className="text-6xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
            CodeQuest
          </h1>

          <p
            className="text-xl md:text-2xl text-white opacity-90 mb-2 animate-fade-in"
            style={{ animationDelay: "0.6s" }}
          >
            Choose Your Learning Path
          </p>

          <p
            className="text-lg text-white opacity-70 max-w-2xl mx-auto animate-fade-in"
            style={{ animationDelay: "0.8s" }}
          >
            Master programming through interactive games and challenges
          </p>
        </div>

        {/* Learning Path Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl w-full mb-12">
          <div onClick={handleKidsZoneClick}>
            <LearningPathCard
              title="Kids Zone"
              subtitle="Ages 6-12 • Visual & Fun Learning"
              description="Start your coding journey with colorful blocks, friendly characters, and exciting adventures!"
              icon="😊"
              gradient="bg-gradient-to-br from-pink-500 to-rose-400"
              delay={0.2}
            />
          </div>

          <div onClick={handleBeginnerPathClick}>
            <LearningPathCard
              title="Beginner Path"
              subtitle="Teens & Adults • Real Programming"
              description="Learn actual coding languages with hands-on projects and real-world applications!"
              icon="🚀"
              gradient="bg-gradient-to-br from-emerald-500 to-teal-400"
              delay={0.4}
            />
          </div>
        </div>

        {/* Quick Stats */}
        <div
          className="flex flex-wrap justify-center gap-8 text-center text-white opacity-80 animate-fade-in-up"
          style={{ animationDelay: "1.2s" }}
        >
          {[
            { icon: Users, label: "Students", value: "10K+", emoji: "👥" },
            { icon: Trophy, label: "Challenges", value: "500+", emoji: "🏆" },
            { icon: Sparkles, label: "Success Rate", value: "95%", emoji: "⭐" },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className="flex flex-col items-center p-4 rounded-lg bg-white bg-opacity-5 backdrop-blur-sm hover:scale-110 hover:bg-opacity-10 transition-all duration-300 animate-bounce-in"
              style={{ animationDelay: `${i * 0.3}s` }}
            >
              <div className="text-3xl mb-2">{stat.emoji}</div>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Jumping Animals */}
      {/* <JumpingAnimals /> */}

      {/* Decorative Elements */}
      {/* <div className="absolute top-20 left-10 text-4xl animate-spin-slow">⭐</div>
      <div className="absolute top-40 right-20 text-3xl animate-bounce">🌟</div>
      <div className="absolute bottom-40 left-20 text-5xl animate-pulse">💫</div> */}
    </div>
  )
}
