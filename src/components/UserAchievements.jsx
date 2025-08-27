"use client"

import { useState, useEffect } from "react"
import { getUserProgress } from "../data/challenges"

export function UserAchievements({ user, onBack }) {
  const [progress, setProgress] = useState(null)

  useEffect(() => {
    const userProgress = getUserProgress()
    setProgress(userProgress)
  }, [])

  const achievements = [
    {
      id: "first_challenge",
      title: "First Steps",
      description: "Complete your first challenge",
      icon: "🎯",
      requirement: 1,
      type: "challenges",
      unlocked: progress
        ? progress.kids.easy.length +
            progress.kids.medium.length +
            progress.kids.hard.length +
            progress.beginners.easy.length +
            progress.beginners.medium.length +
            progress.beginners.hard.length >=
          1
        : false,
    },
    {
      id: "first_100",
      title: "Century Club",
      description: "Earn 100 XP",
      icon: "💯",
      requirement: 100,
      type: "xp",
      unlocked: progress ? progress.totalXP >= 100 : false,
    },
    {
      id: "coding_star",
      title: "Coding Star",
      description: "Earn 500 XP",
      icon: "⭐",
      requirement: 500,
      type: "xp",
      unlocked: progress ? progress.totalXP >= 500 : false,
    },
    {
      id: "kids_master",
      title: "Kids Zone Master",
      description: "Complete 10 Kids Zone challenges",
      icon: "😊",
      requirement: 10,
      type: "kids",
      unlocked: progress
        ? progress.kids.easy.length + progress.kids.medium.length + progress.kids.hard.length >= 10
        : false,
    },
    {
      id: "beginner_coder",
      title: "Beginner Coder",
      description: "Complete 10 Beginner Path challenges",
      icon: "🚀",
      requirement: 10,
      type: "beginners",
      unlocked: progress
        ? progress.beginners.easy.length + progress.beginners.medium.length + progress.beginners.hard.length >= 10
        : false,
    },
    {
      id: "streak_master",
      title: "Streak Master",
      description: "Complete challenges 7 days in a row",
      icon: "🔥",
      requirement: 7,
      type: "streak",
      unlocked: false, // Would need streak tracking
    },
    {
      id: "perfectionist",
      title: "Perfectionist",
      description: "Complete 5 challenges without hints",
      icon: "💎",
      requirement: 5,
      type: "perfect",
      unlocked: false, // Would need hint tracking
    },
    {
      id: "speed_demon",
      title: "Speed Demon",
      description: "Complete a challenge in under 2 minutes",
      icon: "⚡",
      requirement: 1,
      type: "speed",
      unlocked: false, // Would need time tracking
    },
  ]

  if (!progress) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 to-pink-700 flex items-center justify-center">
        <div className="text-white text-2xl animate-pulse">Loading achievements... ⏳</div>
      </div>
    )
  }

  const unlockedAchievements = achievements.filter((a) => a.unlocked)
  const lockedAchievements = achievements.filter((a) => !a.unlocked)

  const getProgressForAchievement = (achievement) => {
    switch (achievement.type) {
      case "challenges":
        return (
          progress.kids.easy.length +
          progress.kids.medium.length +
          progress.kids.hard.length +
          progress.beginners.easy.length +
          progress.beginners.medium.length +
          progress.beginners.hard.length
        )
      case "xp":
        return progress.totalXP
      case "kids":
        return progress.kids.easy.length + progress.kids.medium.length + progress.kids.hard.length
      case "beginners":
        return progress.beginners.easy.length + progress.beginners.medium.length + progress.beginners.hard.length
      default:
        return 0
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-pink-700 p-6">
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
            <h1 className="text-3xl font-bold">🏆 Achievements</h1>
            <p className="text-sm opacity-80">Your coding milestones</p>
          </div>

          <div className="w-20"></div>
        </div>

        {/* Achievement Stats */}
        <div className="bg-white rounded-2xl p-8 mb-8 shadow-2xl">
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">🏅</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Achievement Progress</h2>
            <p className="text-gray-600">
              {unlockedAchievements.length} of {achievements.length} achievements unlocked
            </p>
          </div>

          <div className="max-w-md mx-auto">
            <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
              <div
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-4 rounded-full transition-all duration-500"
                style={{ width: `${(unlockedAchievements.length / achievements.length) * 100}%` }}
              />
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>{unlockedAchievements.length} unlocked</span>
              <span>{achievements.length} total</span>
            </div>
          </div>
        </div>

        {/* Unlocked Achievements */}
        {unlockedAchievements.length > 0 && (
          <div className="bg-white rounded-2xl p-8 mb-8 shadow-2xl">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="text-3xl mr-3">✅</span>
              Unlocked Achievements
            </h3>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {unlockedAchievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className="bg-gradient-to-br from-green-100 to-emerald-100 p-6 rounded-xl border-2 border-green-300"
                >
                  <div className="text-center">
                    <div className="text-4xl mb-3">{achievement.icon}</div>
                    <h4 className="text-lg font-bold text-gray-800 mb-2">{achievement.title}</h4>
                    <p className="text-gray-600 text-sm mb-3">{achievement.description}</p>
                    <div className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">
                      ✅ UNLOCKED
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Locked Achievements */}
        <div className="bg-white rounded-2xl p-8 shadow-2xl">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <span className="text-3xl mr-3">🔒</span>
            Locked Achievements
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lockedAchievements.map((achievement) => {
              const currentProgress = getProgressForAchievement(achievement)
              const progressPercentage = Math.min((currentProgress / achievement.requirement) * 100, 100)

              return (
                <div key={achievement.id} className="bg-gray-100 p-6 rounded-xl border-2 border-gray-300 opacity-75">
                  <div className="text-center">
                    <div className="text-4xl mb-3 grayscale">{achievement.icon}</div>
                    <h4 className="text-lg font-bold text-gray-600 mb-2">{achievement.title}</h4>
                    <p className="text-gray-500 text-sm mb-3">{achievement.description}</p>

                    {/* Progress Bar */}
                    <div className="mb-3">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${progressPercentage}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {currentProgress} / {achievement.requirement}
                      </p>
                    </div>

                    <div className="bg-gray-300 text-gray-600 px-3 py-1 rounded-full text-xs font-semibold">
                      🔒 LOCKED
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
