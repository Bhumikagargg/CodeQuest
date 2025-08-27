"use client"

import { useState, useEffect } from "react"
import { LocalChallengeFeed } from "../components/LocalChallengeFeed"

export function ChallengeList({ section, difficulty, onChallengeStart, onBack }) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    console.log("ChallengeList mounted with:", { section, difficulty })
    // Small delay to show loading state, then show challenges
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [section, difficulty])

  const getSectionInfo = () => {
    const info = {
      kids: {
        title: "Kids Zone Challenges! 🎮",
        subtitle: "Fun coding games for young explorers",
        gradient: "from-pink-500 to-purple-600",
        mascot: "😊",
      },
      beginners: {
        title: "Beginner Programming Challenges! 🚀",
        subtitle: "Real coding challenges to build your skills",
        gradient: "from-blue-500 to-teal-600",
        mascot: "💻",
      },
    }
    return info[section] || info.kids
  }

  const getDifficultyInfo = () => {
    const info = {
      easy: { emoji: "🟢", color: "from-green-400 to-emerald-500", title: "Easy" },
      medium: { emoji: "🟡", color: "from-yellow-400 to-orange-500", title: "Medium" },
      hard: { emoji: "🔴", color: "from-red-400 to-pink-500", title: "Hard" },
    }
    return info[difficulty] || info.easy
  }

  const sectionInfo = getSectionInfo()
  const difficultyInfo = getDifficultyInfo()

  if (isLoading) {
    return (
      <div className={`min-h-screen bg-gradient-to-br ${sectionInfo.gradient} flex items-center justify-center`}>
        <div className="text-center">
          <div className="text-8xl mb-4 animate-bounce">{sectionInfo.mascot}</div>
          <div className="text-white text-3xl font-bold mb-2">Loading Challenges...</div>
          <div className="text-white text-lg opacity-80">
            Preparing your {difficultyInfo.title.toLowerCase()} challenges
          </div>
          <div className="mt-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${sectionInfo.gradient} relative overflow-hidden`}>
      <div className="relative z-10 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-white hover:text-yellow-300 transition-colors"
          >
            <span className="text-2xl">←</span>
            <span>Back to Levels</span>
          </button>

          <div className="text-white text-center">
            <div className="text-sm opacity-80 capitalize">
              {section} • {difficulty}
            </div>
            <div className="text-xs opacity-60">
              {difficultyInfo.emoji} {difficultyInfo.title} Challenges
            </div>
          </div>
        </div>

        {/* Title Section */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4 animate-bounce-slow">{difficultyInfo.emoji}</div>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">
            {difficultyInfo.title} {sectionInfo.title}
          </h1>
          <p className="text-lg text-white opacity-90">{sectionInfo.subtitle}</p>
        </div>

        {/* Challenge Feed Component */}
        <LocalChallengeFeed section={section} difficulty={difficulty} onChallengeStart={onChallengeStart} />
      </div>
    </div>
  )
}
