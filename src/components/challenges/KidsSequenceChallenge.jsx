"use client"

import { useState } from "react"
import { Button } from "../Button"

export function KidsSequenceChallenge({ challenge, onComplete, onBack }) {
  const [gameState, setGameState] = useState({
    selectedSequence: [],
    isComplete: false,
    showFeedback: false,
    attempts: 0,
  })

  // Use the correct sequence items based on challenge data
  // Support for different sequence themes (animals, colors, shapes, numbers, fruits)
  const theme = challenge.visualElements?.theme || "animals"
  const items = challenge.visualElements?.items || ["🐰", "🐸", "🐱"]
  const correctSequence = challenge.solution || items

  const handleItemClick = (item) => {
    if (gameState.isComplete) return

    const newSequence = [...gameState.selectedSequence, item]
    setGameState((prev) => ({
      ...prev,
      selectedSequence: newSequence,
    }))

    // Check if sequence is complete
    if (newSequence.length === correctSequence.length) {
      const isCorrect = newSequence.every((val, index) => val === correctSequence[index])
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
            selectedSequence: [],
            showFeedback: false,
          }))
        }, 2000)
      }
    }
  }

  const resetGame = () => {
    setGameState({
      selectedSequence: [],
      isComplete: false,
      showFeedback: false,
      attempts: 0,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 to-pink-500 p-6">
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
            <div className="text-6xl mb-4">{theme === "animals" ? "🍎" : theme === "colors" ? "🌈" : theme === "shapes" ? "🔷" : theme === "numbers" ? "🔢" : theme === "fruits" ? "🍓" : "🧩"}</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{challenge.instructions}</h2>
            <p className="text-gray-600">Click the {theme} in the correct order!</p>
          </div>

          {/* Selected Sequence Display */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">Your Sequence:</h3>
            <div className="flex justify-center space-x-4 min-h-20">
              {gameState.selectedSequence.map((item, index) => (
                <div
                  key={index}
                  className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-3xl border-4 border-green-300 animate-bounce"
                >
                  {item}
                </div>
              ))}
              {/* Empty slots */}
              {Array.from({ length: correctSequence.length - gameState.selectedSequence.length }).map((_, index) => (
                <div
                  key={`empty-${index}`}
                  className="w-16 h-16 bg-gray-100 rounded-full border-4 border-dashed border-gray-300 flex items-center justify-center"
                >
                  <span className="text-gray-400 text-2xl">?</span>
                </div>
              ))}
            </div>
          </div>

          {/* Items to Click */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">Click the {theme.charAt(0).toUpperCase() + theme.slice(1)}:</h3>
            <div className="flex justify-center space-x-8">
              {items.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleItemClick(item)}
                  disabled={gameState.isComplete}
                  className="w-24 h-24 bg-yellow-100 hover:bg-yellow-200 rounded-full flex items-center justify-center text-5xl border-4 border-yellow-300 transition-all duration-300 hover:scale-110 disabled:opacity-50"
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
                  <h3 className="text-2xl font-bold text-green-800 mb-2">Perfect!</h3>
                  <p className="text-green-600">You fed all the animals in the right order!</p>
                  <p className="text-green-500 text-sm mt-2">+{challenge.xp} XP earned!</p>
                </div>
              ) : (
                <div className="p-6 bg-red-100 rounded-lg">
                  <div className="text-4xl mb-2">😅</div>
                  <h3 className="text-xl font-bold text-red-800 mb-2">Oops! Try Again!</h3>
                  <p className="text-red-600">{challenge.hints?.[0] || "Think about the correct order!"}</p>
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
