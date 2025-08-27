"use client"

import { useState, useEffect } from "react"
import { Button } from "../Button"

export function KidsVisualChallenge({ challenge, onComplete, onBack }) {
  const [gameState, setGameState] = useState({
    playerPosition: { x: 0, y: 0 },
    targetPosition: { x: 2, y: 1 },
    moves: [],
    isComplete: false,
    showHint: false,
  })

  const [availableBlocks] = useState([
    { id: "move_right", label: "Move Right →", icon: "➡️" },
    { id: "move_left", label: "Move Left ←", icon: "⬅️" },
    { id: "move_up", label: "Move Up ↑", icon: "⬆️" },
    { id: "move_down", label: "Move Down ↓", icon: "⬇️" },
  ])

  const gridSize = challenge.visualElements?.grid || { width: 4, height: 3 }

  const executeMove = (move) => {
    setGameState((prev) => {
      const newPosition = { ...prev.playerPosition }

      switch (move) {
        case "move_right":
          if (newPosition.x < gridSize.width - 1) newPosition.x++
          break
        case "move_left":
          if (newPosition.x > 0) newPosition.x--
          break
        case "move_up":
          if (newPosition.y > 0) newPosition.y--
          break
        case "move_down":
          if (newPosition.y < gridSize.height - 1) newPosition.y++
          break
      }

      const isComplete = newPosition.x === prev.targetPosition.x && newPosition.y === prev.targetPosition.y

      return {
        ...prev,
        playerPosition: newPosition,
        isComplete,
      }
    })
  }

  const addMoveToSequence = (moveId) => {
    setGameState((prev) => ({
      ...prev,
      moves: [...prev.moves, moveId],
    }))
  }

  const removeMoveFromSequence = (index) => {
    setGameState((prev) => ({
      ...prev,
      moves: prev.moves.filter((_, i) => i !== index),
    }))
  }

  const runSequence = async () => {
    // Reset position
    setGameState((prev) => ({
      ...prev,
      playerPosition: { x: 0, y: 0 },
      isComplete: false,
    }))

    // Execute moves with delay
    for (let i = 0; i < gameState.moves.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 800))
      executeMove(gameState.moves[i])
    }
  }

  const resetGame = () => {
    setGameState((prev) => ({
      ...prev,
      playerPosition: { x: 0, y: 0 },
      moves: [],
      isComplete: false,
      showHint: false,
    }))
  }

  useEffect(() => {
    if (gameState.isComplete) {
      setTimeout(() => {
        onComplete(challenge.xp)
      }, 1000)
    }
  }, [gameState.isComplete, challenge.xp, onComplete])

  const renderGrid = () => {
    const cells = []
    for (let y = 0; y < gridSize.height; y++) {
      for (let x = 0; x < gridSize.width; x++) {
        const isPlayer = gameState.playerPosition.x === x && gameState.playerPosition.y === y
        const isTarget = gameState.targetPosition.x === x && gameState.targetPosition.y === y

        cells.push(
          <div
            key={`${x}-${y}`}
            className="w-20 h-20 border-2 border-gray-300 rounded-lg flex items-center justify-center text-3xl bg-green-100 relative"
          >
            {isPlayer && <span className="animate-bounce">{challenge.visualElements?.character || "🐱"}</span>}
            {isTarget && <span className="animate-pulse">{challenge.visualElements?.target || "🏠"}</span>}
            {x === 1 && y === 0 && <span>🌳</span>}
            {x === 2 && y === 2 && <span>🌸</span>}
          </div>,
        )
      }
    }
    return cells
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-blue-500 p-6">
      <div className="max-w-6xl mx-auto">
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

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Game Area */}
          <div className="bg-white rounded-2xl p-6 shadow-2xl">
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-2">Game Board</h2>
              <p className="text-gray-600">{challenge.instructions}</p>
            </div>

            {/* Grid */}
            <div
              className="grid gap-2 mx-auto mb-6"
              style={{
                gridTemplateColumns: `repeat(${gridSize.width}, 1fr)`,
                maxWidth: `${gridSize.width * 88}px`,
              }}
            >
              {renderGrid()}
            </div>

            {/* Controls */}
            <div className="flex justify-center space-x-4">
              <Button onClick={runSequence} className="bg-green-600 hover:bg-green-700 text-white">
                ▶️ Run Code
              </Button>
              <Button onClick={resetGame} variant="outline" className="border-gray-400 text-gray-700">
                🔄 Reset
              </Button>
              <Button
                onClick={() => setGameState((prev) => ({ ...prev, showHint: !prev.showHint }))}
                variant="outline"
                className="border-yellow-400 text-yellow-700"
              >
                💡 Hint
              </Button>
            </div>

            {/* Hint */}
            {gameState.showHint && (
              <div className="mt-4 p-4 bg-yellow-100 rounded-lg">
                <p className="text-yellow-800 text-sm">{challenge.hints?.[0]}</p>
              </div>
            )}

            {/* Success Message */}
            {gameState.isComplete && (
              <div className="mt-4 p-4 bg-green-100 rounded-lg text-center">
                <div className="text-4xl mb-2">🎉</div>
                <p className="text-green-800 font-bold">Awesome! You helped the cat find home!</p>
                <p className="text-green-600 text-sm">+{challenge.xp} XP earned!</p>
              </div>
            )}
          </div>

          {/* Code Blocks Area */}
          <div className="bg-white rounded-2xl p-6 shadow-2xl">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Code Blocks</h2>

            {/* Available Blocks */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-600 mb-3">Drag blocks to build your code:</h3>
              <div className="grid grid-cols-2 gap-2">
                {availableBlocks.map((block) => (
                  <button
                    key={block.id}
                    onClick={() => addMoveToSequence(block.id)}
                    className="p-3 bg-blue-100 hover:bg-blue-200 rounded-lg border-2 border-blue-300 text-blue-800 font-medium transition-colors"
                  >
                    <div className="text-lg">{block.icon}</div>
                    <div className="text-xs">{block.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Code Sequence */}
            <div>
              <h3 className="text-sm font-semibold text-gray-600 mb-3">Your Code:</h3>
              <div className="min-h-32 p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                {gameState.moves.length === 0 ? (
                  <p className="text-gray-400 text-center">Drag blocks here to build your code</p>
                ) : (
                  <div className="space-y-2">
                    {gameState.moves.map((move, index) => {
                      const block = availableBlocks.find((b) => b.id === move)
                      return (
                        <div
                          key={index}
                          className="flex items-center justify-between p-2 bg-blue-100 rounded border border-blue-300"
                        >
                          <span className="text-blue-800 font-medium">
                            {block?.icon} {block?.label}
                          </span>
                          <button
                            onClick={() => removeMoveFromSequence(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            ❌
                          </button>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
