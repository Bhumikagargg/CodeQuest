"use client"

import { useState } from "react"
import { Button } from "../Button"

export function KidsPatternChallenge({ challenge, onComplete, onBack }) {
  const [gameState, setGameState] = useState({
    selectedPattern: [],
    isComplete: false,
    showFeedback: false,
    attempts: 0,
  })

  const patternItems = challenge.visualElements?.items || ["🔴", "🟡", "🔵", "🟢"]
  const correctPattern = challenge.solution || ["🔴", "🟡", "🔴", "🟡"]
  const patternLength = correctPattern.length

  const handleItemClick = (item) => {
    if (gameState.isComplete || gameState.selectedPattern.length >= patternLength) return

    const newPattern = [...gameState.selectedPattern, item]
    setGameState((prev) => ({
      ...prev,
      selectedPattern: newPattern,
    }))

    // Check if pattern is complete
    if (newPattern.length === patternLength) {
      const isCorrect = newPattern.every((item, index) => item === correctPattern[index])

      setGameState((prev) => ({
        ...prev,
        isComplete: isCorrect,
        showFeedback: true,
        attempts: prev.attempts + 1,
      }))

      if (isCorrect) {
        setTimeout(() => onComplete(challenge.xp), 1500)
      } else {
        setTimeout(() => {
          setGameState((prev) => ({
            ...prev,
            selectedPattern: [],
            showFeedback: false,
          }))
        }, 2000)
      }
    }
  }

  const resetGame = () => {
    setGameState({
      selectedPattern: [],
      isComplete: false,
      showFeedback: false,
      attempts: 0,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-400 to-purple-500 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-white hover:text-yellow-300 transition-colors"
          >
            <span className="text-2xl">←</span>
            <span>Back</span>
          </button>

          <div className="text-white text-center">
            <h1 className="text-2xl font-bold">{challenge.title}</h1>
            <p className="text-sm opacity-80">+{challenge.xp} XP</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🌈</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{challenge.instructions}</h2>
            <p className="text-gray-600">Complete the pattern!</p>
          </div>

          {/* Pattern Preview */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">Pattern to Complete:</h3>
            <div className="flex justify-center space-x-2">
              {correctPattern.map((item, index) => (
                <div
                  key={index}
                  className={`w-16 h-16 rounded-full border-4 flex items-center justify-center text-3xl ${
                    index < gameState.selectedPattern.length
                      ? "border-green-400 bg-green-100"
                      : "border-gray-300 bg-gray-100"
                  }`}
                >
                  {index < gameState.selectedPattern.length ? gameState.selectedPattern[index] : "?"}
                </div>
              ))}
            </div>
          </div>

          {/* Available Items */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">Choose Items:</h3>
            <div className="flex justify-center space-x-4">
              {patternItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleItemClick(item)}
                  disabled={gameState.isComplete || gameState.selectedPattern.length >= patternLength}
                  className="w-20 h-20 bg-blue-100 hover:bg-blue-200 rounded-full flex items-center justify-center text-4xl border-4 border-blue-300 transition-all duration-300 hover:scale-110 disabled:opacity-50"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Feedback */}
          {gameState.showFeedback && (
            <div className="text-center mb-6">
              {gameState.isComplete ? (
                <div className="p-6 bg-green-100 rounded-lg">
                  <div className="text-6xl mb-2">🎉</div>
                  <h3 className="text-2xl font-bold text-green-800 mb-2">Perfect Pattern!</h3>
                  <p className="text-green-600">You completed the pattern correctly!</p>
                  <p className="text-green-500 text-sm mt-2">+{challenge.xp} XP earned!</p>
                </div>
              ) : (
                <div className="p-6 bg-red-100 rounded-lg">
                  <div className="text-4xl mb-2">🤔</div>
                  <h3 className="text-xl font-bold text-red-800 mb-2">Try Again!</h3>
                  <p className="text-red-600">{challenge.hints?.[0] || "Look at the pattern more carefully!"}</p>
                </div>
              )}
            </div>
          )}

          {/* Controls */}
          <div className="flex justify-center space-x-4">
            <Button onClick={resetGame} variant="outline" className="border-gray-400 text-gray-700">
              🔄 Reset
            </Button>
            <div className="text-gray-500 text-sm flex items-center">Attempts: {gameState.attempts}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
