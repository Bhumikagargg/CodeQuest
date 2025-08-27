"use client"

import { useState, useEffect } from "react"
import { LevelCard } from "../components/LevelCard"
import { getUserProgress } from "../data/challenges"
import { challengesData } from "../data/challenges"

export function LevelSelection({ section, onLevelSelect, onBack }) {
  const [progress, setProgress] = useState(null)

  useEffect(() => {
    console.log("LevelSelection mounted with section:", section)
    setProgress(getUserProgress())
  }, [section])

  const sectionInfo = {
    kids: {
      title: "Kids Zone Adventures! 🎮",
      subtitle: "Fun coding games for young explorers",
      gradient: "from-pink-500 to-purple-600",
      mascot: "😊",
    },
    beginners: {
      title: "Beginner Programming Path 🚀",
      subtitle: "Real coding challenges to build your skills",
      gradient: "from-blue-500 to-teal-600",
      mascot: "💻",
    },
  }

  const info = sectionInfo[section]
  const levels = ["easy", "medium", "hard"]

  // Check if level is unlocked (easy is always unlocked, others require previous completion)
  const isLevelUnlocked = (level, index) => {
    if (index === 0) return true // Easy is always unlocked

    const prevLevel = levels[index - 1]
    const prevChallenges = progress?.[section]?.[prevLevel] || []
    const totalPrevChallenges = challengesData[section]?.[prevLevel]?.length || 0

    return prevChallenges.length >= Math.ceil(totalPrevChallenges * 0.7) // 70% completion required
  }

  const handleLevelClick = (level) => {
    console.log("Level clicked:", level)
    if (onLevelSelect) {
      onLevelSelect(level)
    }
  }

  if (!progress) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 to-blue-900 flex items-center justify-center">
        <div className="text-white text-2xl animate-pulse">Loading your progress... ⏳</div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${info.gradient} relative overflow-hidden`}>
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 text-6xl animate-bounce">{info.mascot}</div>
        <div className="absolute top-40 right-20 text-4xl animate-pulse">⭐</div>
        <div className="absolute bottom-20 left-20 text-5xl animate-spin-slow">🌟</div>
        <div className="absolute bottom-40 right-10 text-3xl animate-bounce">✨</div>
      </div>

      <div className="relative z-10 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-white hover:text-yellow-300 transition-colors"
          >
            <span className="text-2xl">←</span>
            <span>Back to Home</span>
          </button>

          <div className="text-white text-center">
            <div className="text-sm opacity-80">Total XP: {progress.totalXP}</div>
            <div className="text-xs opacity-60">Level {Math.floor(progress.totalXP / 100) + 1}</div>
          </div>
        </div>

        {/* Title Section */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4 animate-bounce-slow">{info.mascot}</div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{info.title}</h1>
          <p className="text-xl text-white opacity-90">{info.subtitle}</p>
        </div>

        {/* Level Cards */}
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {levels.map((level, index) => (
              <LevelCard
                key={level}
                level={level}
                section={section}
                isLocked={!isLevelUnlocked(level, index)}
                progress={progress}
                onClick={() => handleLevelClick(level)}
              />
            ))}
          </div>

          {/* Progress Summary */}
          <div className="mt-12 bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6">
            <h3 className="text-2xl font-bold text-white mb-4 text-center">Your Progress 📊</h3>

            <div className="grid md:grid-cols-3 gap-4">
              {levels.map((level) => {
                const completed = progress[section]?.[level]?.length || 0
                const total = challengesData[section]?.[level]?.length || 0
                const percentage = total > 0 ? Math.round((completed / total) * 100) : 0

                return (
                  <div key={level} className="text-center text-white">
                    <div className="text-lg font-semibold capitalize mb-2">{level}</div>
                    <div className="text-3xl font-bold text-yellow-300">{percentage}%</div>
                    <div className="text-sm opacity-80">
                      {completed}/{total} challenges
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
