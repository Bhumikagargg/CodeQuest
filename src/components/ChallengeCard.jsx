"use client"

export function ChallengeCard({ challenge, isCompleted, onStart, showDailyBadge = false }) {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "easy":
        return "border-green-400 bg-green-50"
      case "medium":
        return "border-yellow-400 bg-yellow-50"
      case "hard":
        return "border-red-400 bg-red-50"
      default:
        return "border-gray-400 bg-gray-50"
    }
  }

  const handleStartClick = () => {
    console.log("Challenge start clicked:", challenge.title)
    if (onStart) {
      onStart(challenge)
    }
  }

  return (
    <div
      className={`relative p-6 rounded-xl border-2 ${getDifficultyColor(challenge.difficulty)} hover:shadow-lg transition-all duration-300`}
    >
      {/* Daily Challenge Badge */}
      {showDailyBadge && (
        <div className="absolute -top-3 -right-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
          🌟 DAILY
        </div>
      )}

      {/* Completion badge */}
      {isCompleted && <div className="absolute -top-2 -right-2 text-2xl animate-pulse">✅</div>}

      {/* AI Generated Badge */}
      {challenge.id.toString().includes("generated") && (
        <div className="absolute -top-2 -left-2 bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-bold">
          🤖 AI
        </div>
      )}

      <div className="flex items-start space-x-4">
        <div className="text-4xl">{challenge.icon}</div>

        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-800 mb-2">{challenge.title}</h3>

          <p className="text-gray-600 text-sm mb-3">{challenge.description}</p>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{challenge.type}</span>
              <span className="text-xs text-gray-500">+{challenge.xp} XP</span>
              {challenge.isDaily && (
                <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">⏰ 24h</span>
              )}
            </div>

            <button
              onClick={handleStartClick}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                isCompleted
                  ? "bg-green-100 text-green-800 hover:bg-green-200"
                  : challenge.isDaily
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700"
                    : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {isCompleted ? "Replay" : challenge.isDaily ? "Daily!" : "Start"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
