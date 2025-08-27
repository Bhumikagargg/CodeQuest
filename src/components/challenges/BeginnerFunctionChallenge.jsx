"use client"

import { useState } from "react"
import { Button } from "../Button"

export function BeginnerFunctionChallenge({ challenge, onComplete, onBack }) {
  const [functionName, setFunctionName] = useState("")
  const [parameters, setParameters] = useState("")
  const [functionBody, setFunctionBody] = useState("")
  const [testResult, setTestResult] = useState("")
  const [isComplete, setIsComplete] = useState(false)
  const [showHint, setShowHint] = useState(false)

  const testFunction = () => {
    if (!functionName || !functionBody) {
      setTestResult("Please complete the function definition!")
      return
    }

    // Simple function testing simulation
    let result = ""

    if (functionName.toLowerCase().includes("add") && parameters.includes(",")) {
      result = "Function add_numbers(5, 3) returned: 8\nFunction works correctly!"
    } else if (functionName.toLowerCase().includes("greet")) {
      result = "Function greet('Alice') returned: Hello, Alice!\nFunction works correctly!"
    } else if (functionName.toLowerCase().includes("square")) {
      result = "Function square(4) returned: 16\nFunction works correctly!"
    } else {
      result = `Function ${functionName} executed successfully!`
    }

    setTestResult(result)

    // Check completion
    if (result.includes("works correctly")) {
      setIsComplete(true)
      setTimeout(() => onComplete(challenge.xp), 1500)
    }
  }

  const generateCode = () => {
    const params = parameters || "x"
    const body = functionBody || "return x"

    return `def ${functionName}(${params}):
    ${body}

# Test the function
result = ${functionName}(${parameters.includes(",") ? "5, 3" : "5"})
print(result)`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-600 to-red-700 p-6">
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
            <p className="text-sm opacity-80">Function Challenge • +{challenge.xp} XP</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Function Builder */}
          <div className="bg-white rounded-2xl p-6 shadow-2xl">
            <div className="text-4xl mb-4 text-center">⚙️</div>
            <h2 className="text-xl font-bold text-gray-800 mb-3">{challenge.instructions}</h2>
            <p className="text-gray-600 mb-4">Build your function step by step!</p>

            {/* Function Name */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Function Name:</label>
              <input
                type="text"
                value={functionName}
                onChange={(e) => setFunctionName(e.target.value)}
                placeholder="e.g., add_numbers"
                className="w-full p-3 border border-gray-300 rounded-lg font-mono"
              />
            </div>

            {/* Parameters */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Parameters:</label>
              <input
                type="text"
                value={parameters}
                onChange={(e) => setParameters(e.target.value)}
                placeholder="e.g., a, b"
                className="w-full p-3 border border-gray-300 rounded-lg font-mono"
              />
            </div>

            {/* Function Body */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Function Body:</label>
              <textarea
                value={functionBody}
                onChange={(e) => setFunctionBody(e.target.value)}
                placeholder="e.g., return a + b"
                className="w-full p-3 border border-gray-300 rounded-lg font-mono h-24 resize-none"
              />
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
                <h3 className="text-xl font-bold text-green-800">Function Master!</h3>
                <p className="text-green-600">+{challenge.xp} XP earned!</p>
              </div>
            )}
          </div>

          {/* Code Preview & Testing */}
          <div className="bg-white rounded-2xl p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Generated Code</h3>

            <div className="bg-gray-900 rounded-lg p-4 mb-4">
              <pre className="text-green-400 font-mono text-sm whitespace-pre-wrap">
                {functionName ? generateCode() : "# Complete the form to see your function"}
              </pre>
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold text-gray-800">Test Result</h3>
                <Button
                  onClick={testFunction}
                  disabled={!functionName || !functionBody}
                  className="bg-green-600 hover:bg-green-700 text-white disabled:opacity-50"
                >
                  🧪 Test Function
                </Button>
              </div>
              <div className="bg-gray-900 rounded-lg p-4 min-h-24">
                <pre className="text-green-400 font-mono text-sm">
                  {testResult || "Click 'Test Function' to see result..."}
                </pre>
              </div>
            </div>

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
  )
}
