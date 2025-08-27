"use client"

import { challengesData } from "../data/challenges"

export function LevelCard({ level, section, isLocked, progress, onClick }) {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "easy":
        return "from-green-400 to-emerald-500"
      case "medium":
        return "from-yellow-400 to-orange-500"
      case "hard":
        return "from-red-400 to-pink-500"
      default:
        return "from-gray-400 to-gray-500"
    }
  }

  const getDifficultyEmoji = (difficulty) => {
    switch (difficulty) {
      case "easy":
        return "🟢"
      case "medium":
        return "🟡"
      case "hard":
        return "🔴"
      default:
        return "⚪"
    }
  }

  const completedChallenges = progress?.[section]?.[level] || []
  const totalChallenges = challengesData[section]?.[level]?.length || 0
  const completionPercentage = totalChallenges > 0 ? (completedChallenges.length / totalChallenges) * 100 : 0

  const handleClick = () => {
    if (!isLocked && onClick) {
      console.log("Level card clicked:", level, section)
      onClick()
    }
  }

  return (
    <div
      className={`relative p-6 rounded-2xl shadow-xl cursor-pointer transform transition-all duration-300 ${
        isLocked
          ? "bg-gray-300 opacity-50 cursor-not-allowed"
          : `bg-gradient-to-br ${getDifficultyColor(level)} hover:scale-105 hover:-translate-y-2`
      }`}
      onClick={handleClick}
    >
      {/* Lock overlay for locked levels */}
      {isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-2xl">
          <div className="text-4xl">🔒</div>
        </div>
      )}

      <div className="text-center text-white">
        <div className="text-4xl mb-3">{getDifficultyEmoji(level)}</div>

        <h3 className="text-xl font-bold mb-2 capitalize">{level} Level</h3>

        <p className="text-sm opacity-90 mb-4">{totalChallenges} Challenges</p>

        {/* Progress bar */}
        <div className="w-full bg-white bg-opacity-30 rounded-full h-2 mb-3">
          <div
            className="bg-white h-2 rounded-full transition-all duration-500"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>

        <div className="text-xs opacity-80">
          {completedChallenges.length}/{totalChallenges} Complete
        </div>

        {completionPercentage === 100 && <div className="absolute -top-2 -right-2 text-2xl animate-bounce">⭐</div>}
      </div>
    </div>
  )
}
