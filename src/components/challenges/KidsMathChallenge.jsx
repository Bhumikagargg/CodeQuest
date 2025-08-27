"use client"

import { useState } from "react"
import { Button } from "../Button"

export function KidsMathChallenge({ challenge, onComplete, onBack }) {
  const [gameState, setGameState] = useState({
    selectedAnswer: null,
    isComplete: false,
    showFeedback: false,
    attempts: 0,
  })

  const question = challenge.visualElements?.question || "2 + 3 = ?"
  const options = challenge.visualElements?.options || [5, 6, 7, 4]
  const correctAnswer = challenge.visualElements?.correctAnswer || 5

  const handleAnswerClick = (answer) => {
    if (gameState.isComplete) return

    setGameState((prev) => ({
      ...prev,
      selectedAnswer: answer,
      showFeedback: true,
      attempts: prev.attempts + 1,
      isComplete: answer === correctAnswer,
    }))

    if (answer === correctAnswer) {
      setTimeout(() => onComplete(challenge.xp), 1500)
    } else {
      setTimeout(() => {
        setGameState((prev) => ({
          ...prev,
          selectedAnswer: null,
          showFeedback: false,
        }))
      }, 2000)
    }
  }

  const resetGame = () => {
    setGameState({
      selectedAnswer: null,
      isComplete: false,
      showFeedback: false,
      attempts: 0,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 to-blue-500 p-6">
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
            <div className="text-6xl mb-4">🧮</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{challenge.instructions}</h2>
            <p className="text-gray-600">Choose the correct answer!</p>
          </div>

          {/* Math Question */}
          <div className="text-center mb-8">
            <div className="text-6xl font-bold text-blue-600 mb-6">{question}</div>
          </div>

          {/* Answer Options */}
          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mb-8">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerClick(option)}
                disabled={gameState.showFeedback}
                className={`p-6 text-3xl font-bold rounded-xl border-4 transition-all duration-300 ${
                  gameState.selectedAnswer === option
                    ? option === correctAnswer
                      ? "border-green-500 bg-green-100 text-green-800"
                      : "border-red-500 bg-red-100 text-red-800"
                    : "border-blue-300 bg-blue-50 text-blue-800 hover:border-blue-500 hover:bg-blue-100"
                } disabled:cursor-not-allowed`}
              >
                {option}
              </button>
            ))}
          </div>

          {/* Feedback */}
          {gameState.showFeedback && (
            <div className="text-center mb-6">
              {gameState.isComplete ? (
                <div className="p-6 bg-green-100 rounded-lg">
                  <div className="text-6xl mb-2">🎉</div>
                  <h3 className="text-2xl font-bold text-green-800 mb-2">Correct!</h3>
                  <p className="text-green-600">Great job solving the math problem!</p>
                  <p className="text-green-500 text-sm mt-2">+{challenge.xp} XP earned!</p>
                </div>
              ) : (
                <div className="p-6 bg-red-100 rounded-lg">
                  <div className="text-4xl mb-2">🤔</div>
                  <h3 className="text-xl font-bold text-red-800 mb-2">Try Again!</h3>
                  <p className="text-red-600">{challenge.hints?.[0] || "Think about it again!"}</p>
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
