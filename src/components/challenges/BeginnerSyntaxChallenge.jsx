"use client"

import { useState } from "react"
import { Button } from "../Button"

export function BeginnerSyntaxChallenge({ challenge, onComplete, onBack }) {
  const [code, setCode] = useState(challenge.starterCode || "")
  const [output, setOutput] = useState("")
  const [isRunning, setIsRunning] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const executeCode = async () => {
    setIsRunning(true)
    setOutput("")

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      let result = ""

      // Simple Python interpreter for syntax challenges
      const lines = code.split("\n")

      lines.forEach((line) => {
        line = line.trim()

        // Handle print statements
        if (line.includes("print(")) {
          const match = line.match(/print$$['"]([^'"]*)['"]$$/)
          if (match) {
            result += match[1] + "\n"
          }
        }
      })

      setOutput(result.trim())

      // Check if output matches expected
      const expected = challenge.testCases?.[0]?.expected || ""
      if (result.trim() === expected) {
        setIsComplete(true)
        setTimeout(() => onComplete(challenge.xp), 1500)
      }
    } catch (error) {
      setOutput(`Error: ${error.message}`)
    } finally {
      setIsRunning(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 p-6">
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
            <p className="text-sm opacity-80">Syntax Challenge • +{challenge.xp} XP</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Instructions */}
          <div className="bg-white rounded-2xl p-6 shadow-2xl">
            <div className="text-4xl mb-4 text-center">💻</div>
            <h2 className="text-xl font-bold text-gray-800 mb-3">{challenge.instructions}</h2>
            <p className="text-gray-600 mb-4">{challenge.description}</p>

            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <h3 className="font-semibold text-blue-800 mb-2">Expected Output:</h3>
              <pre className="text-sm text-blue-700 bg-blue-100 p-2 rounded">
                {challenge.testCases?.[0]?.expected || "Complete the challenge"}
              </pre>
            </div>

            {showHint && (
              <div className="bg-yellow-50 p-4 rounded-lg mb-4">
                <h3 className="font-semibold text-yellow-800 mb-2">💡 Hint:</h3>
                <p className="text-yellow-700 text-sm">{challenge.hints?.[0]}</p>
              </div>
            )}

            {isComplete && (
              <div className="p-4 bg-green-100 rounded-lg text-center">
                <div className="text-4xl mb-2">🎉</div>
                <h3 className="text-xl font-bold text-green-800">Perfect Syntax!</h3>
                <p className="text-green-600">+{challenge.xp} XP earned!</p>
              </div>
            )}
          </div>

          {/* Code Editor */}
          <div className="bg-white rounded-2xl p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Code Editor</h3>
            <div className="bg-gray-900 rounded-lg p-4 mb-4">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-48 bg-transparent text-green-400 font-mono text-sm resize-none outline-none"
                placeholder="Write your Python code here..."
              />
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold text-gray-800">Output</h3>
                <Button
                  onClick={executeCode}
                  disabled={isRunning}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  {isRunning ? "⏳ Running..." : "▶️ Run Code"}
                </Button>
              </div>
              <div className="bg-gray-900 rounded-lg p-4 min-h-24">
                <pre className="text-green-400 font-mono text-sm">{output || "Click 'Run Code' to see output..."}</pre>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={() => setShowHint(!showHint)}
                variant="outline"
                className="border-yellow-400 text-yellow-700"
              >
                💡 Hint
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
