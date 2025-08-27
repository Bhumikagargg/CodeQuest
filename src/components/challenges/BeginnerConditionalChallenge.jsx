"use client"

import { useState } from "react"
import { Button } from "../Button"

export function BeginnerConditionalChallenge({ challenge, onComplete, onBack }) {
  const [selectedCondition, setSelectedCondition] = useState("")
  const [testValue, setTestValue] = useState(15)
  const [result, setResult] = useState("")
  const [isComplete, setIsComplete] = useState(false)
  const [showHint, setShowHint] = useState(false)

  const conditions = [
    { id: "greater", label: "if x > 10:", code: "x > 10" },
    { id: "less", label: "if x < 10:", code: "x < 10" },
    { id: "equal", label: "if x == 10:", code: "x == 10" },
    { id: "not_equal", label: "if x != 10:", code: "x != 10" },
    { id: "greater_equal", label: "if x >= 10:", code: "x >= 10" },
    { id: "less_equal", label: "if x <= 10:", code: "x <= 10" },
  ]

  const testCondition = () => {
    if (!selectedCondition) {
      setResult("Please select a condition first!")
      return
    }

    const condition = conditions.find((c) => c.id === selectedCondition)
    let conditionResult = false

    switch (selectedCondition) {
      case "greater":
        conditionResult = testValue > 10
        break
      case "less":
        conditionResult = testValue < 10
        break
      case "equal":
        conditionResult = testValue === 10
        break
      case "not_equal":
        conditionResult = testValue !== 10
        break
      case "greater_equal":
        conditionResult = testValue >= 10
        break
      case "less_equal":
        conditionResult = testValue <= 10
        break
    }

    const resultText = conditionResult ? "True - Condition passed!" : "False - Condition failed!"
    setResult(`Testing: ${condition.code} with x = ${testValue}\nResult: ${resultText}`)

    // Check if this matches the challenge expectation
    if (conditionResult && challenge.solution?.[0] === true) {
      setIsComplete(true)
      setTimeout(() => onComplete(challenge.xp), 1500)
    } else if (!conditionResult && challenge.solution?.[0] === false) {
      setIsComplete(true)
      setTimeout(() => onComplete(challenge.xp), 1500)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-600 to-green-700 p-6">
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
            <p className="text-sm opacity-80">Conditional Challenge • +{challenge.xp} XP</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Instructions */}
          <div className="bg-white rounded-2xl p-6 shadow-2xl">
            <div className="text-4xl mb-4 text-center">🤔</div>
            <h2 className="text-xl font-bold text-gray-800 mb-3">{challenge.instructions}</h2>
            <p className="text-gray-600 mb-4">Choose the right condition and test it!</p>

            {/* Test Value Slider */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-700 mb-3">Test Value: {testValue}</h3>
              <input
                type="range"
                min="0"
                max="20"
                value={testValue}
                onChange={(e) => setTestValue(Number.parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0</span>
                <span>10</span>
                <span>20</span>
              </div>
            </div>

            {/* Condition Selection */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-700 mb-3">Choose Condition:</h3>
              <div className="space-y-2">
                {conditions.map((condition) => (
                  <button
                    key={condition.id}
                    onClick={() => setSelectedCondition(condition.id)}
                    className={`w-full p-3 text-left rounded border-2 font-mono transition-colors ${
                      selectedCondition === condition.id
                        ? "border-blue-500 bg-blue-100"
                        : "border-gray-300 bg-gray-50 hover:bg-gray-100"
                    }`}
                  >
                    {condition.label}
                  </button>
                ))}
              </div>
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
                <h3 className="text-xl font-bold text-green-800">Logic Master!</h3>
                <p className="text-green-600">+{challenge.xp} XP earned!</p>
              </div>
            )}
          </div>

          {/* Testing Area */}
          <div className="bg-white rounded-2xl p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Condition Tester</h3>

            <div className="bg-gray-900 rounded-lg p-4 mb-4">
              <div className="text-green-400 font-mono text-sm mb-2">x = {testValue}</div>
              <div className="text-blue-400 font-mono text-sm">
                {selectedCondition ? conditions.find((c) => c.id === selectedCondition)?.label : "# Select a condition"}
              </div>
              <div className="text-yellow-400 font-mono text-sm">{"    print('Condition result')"}</div>
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold text-gray-800">Test Result</h3>
                <Button
                  onClick={testCondition}
                  disabled={!selectedCondition}
                  className="bg-green-600 hover:bg-green-700 text-white disabled:opacity-50"
                >
                  🧪 Test Condition
                </Button>
              </div>
              <div className="bg-gray-900 rounded-lg p-4 min-h-24">
                <pre className="text-green-400 font-mono text-sm">
                  {result || "Click 'Test Condition' to see result..."}
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
