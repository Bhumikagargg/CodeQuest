"use client"

import { useState, useEffect } from "react"
import { getUserProgress } from "../data/challenges"

export function UserProgress({ user, onBack }) {
  const [progress, setProgress] = useState(null)
  const [selectedSection, setSelectedSection] = useState("overview")

  useEffect(() => {
    const userProgress = getUserProgress()
    setProgress(userProgress)
  }, [])

  if (!progress) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-600 to-blue-700 flex items-center justify-center">
        <div className="text-white text-2xl animate-pulse">Loading your progress... ⏳</div>
      </div>
    )
  }

  const calculateCompletionRate = (section) => {
    const sectionProgress = progress[section]
    const totalCompleted = sectionProgress.easy.length + sectionProgress.medium.length + sectionProgress.hard.length
    return totalCompleted
  }

  const getLevel = () => Math.floor(progress.totalXP / 100) + 1
  const getXPForNextLevel = () => (Math.floor(progress.totalXP / 100) + 1) * 100
  const getCurrentLevelProgress = () => progress.totalXP % 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-600 to-blue-700 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-white hover:text-yellow-300 transition-colors"
          >
            <span className="text-2xl">←</span>
            <span>Back</span>
          </button>

          <div className="text-white text-center">
            <h1 className="text-3xl font-bold">My Progress</h1>
            <p className="text-sm opacity-80">Track your coding journey</p>
          </div>

          <div className="w-20"></div>
        </div>

        {/* Progress Overview */}
        <div className="bg-white rounded-2xl p-8 mb-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🏆</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Level {getLevel()}</h2>
            <p className="text-gray-600 mb-4">{progress.totalXP} Total XP</p>

            {/* XP Progress Bar */}
            <div className="max-w-md mx-auto">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>{getCurrentLevelProgress()} XP</span>
                <span>{getXPForNextLevel()} XP</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="bg-gradient-to-r from-green-500 to-blue-500 h-4 rounded-full transition-all duration-500"
                  style={{ width: `${getCurrentLevelProgress()}%` }}
                />
              </div>
              <p className="text-sm text-gray-500 mt-2">{100 - getCurrentLevelProgress()} XP to next level</p>
            </div>
          </div>

          {/* Section Tabs */}
          <div className="flex justify-center mb-8">
            <div className="bg-gray-100 rounded-lg p-1 flex">
              {["overview", "kids", "beginners"].map((section) => (
                <button
                  key={section}
                  onClick={() => setSelectedSection(section)}
                  className={`px-6 py-2 rounded-md font-medium transition-all ${
                    selectedSection === section
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  {section === "overview" ? "📊 Overview" : section === "kids" ? "😊 Kids Zone" : "🚀 Beginner Path"}
                </button>
              ))}
            </div>
          </div>

          {/* Content based on selected section */}
          {selectedSection === "overview" && (
            <div className="grid md:grid-cols-2 gap-8">
              {/* Kids Zone Progress */}
              <div className="bg-gradient-to-br from-pink-100 to-rose-100 p-6 rounded-xl">
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-3">😊</span>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">Kids Zone</h3>
                    <p className="text-gray-600">Visual Learning Games</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-green-600 font-medium">🟢 Easy</span>
                    <span className="font-bold">{progress.kids.easy.length} completed</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-yellow-600 font-medium">🟡 Medium</span>
                    <span className="font-bold">{progress.kids.medium.length} completed</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-red-600 font-medium">🔴 Hard</span>
                    <span className="font-bold">{progress.kids.hard.length} completed</span>
                  </div>
                  <div className="pt-2 border-t border-gray-300">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Total Challenges</span>
                      <span className="font-bold text-lg">{calculateCompletionRate("kids")}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Beginner Path Progress */}
              <div className="bg-gradient-to-br from-blue-100 to-cyan-100 p-6 rounded-xl">
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-3">🚀</span>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">Beginner Path</h3>
                    <p className="text-gray-600">Real Programming</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-green-600 font-medium">🟢 Easy</span>
                    <span className="font-bold">{progress.beginners.easy.length} completed</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-yellow-600 font-medium">🟡 Medium</span>
                    <span className="font-bold">{progress.beginners.medium.length} completed</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-red-600 font-medium">🔴 Hard</span>
                    <span className="font-bold">{progress.beginners.hard.length} completed</span>
                  </div>
                  <div className="pt-2 border-t border-gray-300">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Total Challenges</span>
                      <span className="font-bold text-lg">{calculateCompletionRate("beginners")}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedSection === "kids" && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">😊 Kids Zone Progress</h3>
                <p className="text-gray-600">Visual learning through games and puzzles</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {["easy", "medium", "hard"].map((difficulty) => (
                  <div key={difficulty} className="bg-gray-50 p-6 rounded-xl text-center">
                    <div className="text-3xl mb-3">
                      {difficulty === "easy" ? "🟢" : difficulty === "medium" ? "🟡" : "🔴"}
                    </div>
                    <h4 className="text-lg font-bold text-gray-800 mb-2 capitalize">{difficulty}</h4>
                    <p className="text-3xl font-bold text-blue-600 mb-2">{progress.kids[difficulty].length}</p>
                    <p className="text-gray-600 text-sm">Challenges Completed</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedSection === "beginners" && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">🚀 Beginner Path Progress</h3>
                <p className="text-gray-600">Real programming with Python and JavaScript</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {["easy", "medium", "hard"].map((difficulty) => (
                  <div key={difficulty} className="bg-gray-50 p-6 rounded-xl text-center">
                    <div className="text-3xl mb-3">
                      {difficulty === "easy" ? "🟢" : difficulty === "medium" ? "🟡" : "🔴"}
                    </div>
                    <h4 className="text-lg font-bold text-gray-800 mb-2 capitalize">{difficulty}</h4>
                    <p className="text-3xl font-bold text-purple-600 mb-2">{progress.beginners[difficulty].length}</p>
                    <p className="text-gray-600 text-sm">Challenges Completed</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Badges Section */}
        <div className="bg-white rounded-2xl p-8 shadow-2xl">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">🏅 Badges & Achievements</h3>

          {progress.badges.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {progress.badges.map((badge, index) => (
                <div key={index} className="bg-gradient-to-br from-yellow-100 to-orange-100 p-4 rounded-xl text-center">
                  <div className="text-3xl mb-2">🏆</div>
                  <p className="font-semibold text-gray-800 capitalize">{badge.replace("_", " ")}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500">
              <div className="text-4xl mb-4">🎯</div>
              <p>Complete challenges to earn your first badge!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
