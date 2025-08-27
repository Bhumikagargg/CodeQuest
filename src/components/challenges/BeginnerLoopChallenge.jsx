"use client"

import { useState } from "react"
import { Button } from "../Button"

export function BeginnerLoopChallenge({ challenge, onComplete, onBack }) {
  const [selectedBlocks, setSelectedBlocks] = useState([])
  const [output, setOutput] = useState("")
  const [isComplete, setIsComplete] = useState(false)
  const [showHint, setShowHint] = useState(false)

  // Generate blocks based on challenge type
  const getBlocksForChallenge = () => {
    const challengeTitle = challenge.title.toLowerCase()

    if (challengeTitle.includes("count") || challengeTitle.includes("number")) {
      return [
        { id: "for_range", label: "for i in range(1, 11):", type: "loop" },
        { id: "for_range_step", label: "for i in range(0, 21, 2):", type: "loop" },
        { id: "for_range_down", label: "for i in range(10, 0, -1):", type: "loop" },
        { id: "print_i", label: "    print(i)", type: "action" },
        { id: "print_f", label: "    print(f'{i}')", type: "action" },
      ]
    } else if (challengeTitle.includes("multiplication") || challengeTitle.includes("times")) {
      return [
        { id: "for_mult", label: "for i in range(1, 11):", type: "loop" },
        { id: "print_mult", label: "    print(f'{table} x {i} = {table * i}')", type: "action" },
        { id: "table_var", label: "table = 2", type: "variable" },
        { id: "table_var_3", label: "table = 3", type: "variable" },
        { id: "table_var_5", label: "table = 5", type: "variable" },
      ]
    } else if (
      challengeTitle.includes("pattern") ||
      challengeTitle.includes("star") ||
      challengeTitle.includes("triangle")
    ) {
      return [
        { id: "for_pattern", label: "for i in range(1, 4):", type: "loop" },
        { id: "for_pattern_5", label: "for i in range(1, 6):", type: "loop" },
        { id: "print_star", label: "    print('*' * i)", type: "action" },
        { id: "print_hash", label: "    print('#' * i)", type: "action" },
        { id: "print_plus", label: "    print('+' * i)", type: "action" },
      ]
    } else if (challengeTitle.includes("square")) {
      return [
        { id: "for_square", label: "for i in range(1, 6):", type: "loop" },
        { id: "for_square_10", label: "for i in range(1, 11):", type: "loop" },
        { id: "print_square", label: "    print(f'{i} squared is {i * i}')", type: "action" },
        { id: "print_square_simple", label: "    print(i * i)", type: "action" },
      ]
    } else {
      // Default blocks
      return [
        { id: "for", label: "for i in range(5):", type: "loop" },
        { id: "print", label: "    print(i)", type: "action" },
        { id: "while", label: "while x < 10:", type: "loop" },
        { id: "increment", label: "    x = x + 1", type: "action" },
      ]
    }
  }

  const loopBlocks = getBlocksForChallenge()

  const addBlock = (block) => {
    setSelectedBlocks([...selectedBlocks, block])
  }

  const removeBlock = (index) => {
    setSelectedBlocks(selectedBlocks.filter((_, i) => i !== index))
  }

  const runCode = () => {
    const code = selectedBlocks.map((block) => block.label).join("\n")
    console.log("🔄 Running loop code:", code)

    // Enhanced simulation for different loop types
    let result = ""
    const challengeTitle = challenge.title.toLowerCase()

    try {
      if (challengeTitle.includes("count from 1 to 10")) {
        if (code.includes("range(1, 11)") && code.includes("print(i)")) {
          result = "1\n2\n3\n4\n5\n6\n7\n8\n9\n10"
        }
      } else if (challengeTitle.includes("count from 5 to 15")) {
        if (code.includes("range(5, 16)") || code.includes("range(1, 11)")) {
          result = "5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15"
        }
      } else if (challengeTitle.includes("even numbers")) {
        if (code.includes("range(0, 21, 2)") || code.includes("step")) {
          result = "0\n2\n4\n6\n8\n10\n12\n14\n16\n18\n20"
        }
      } else if (challengeTitle.includes("countdown")) {
        if (code.includes("range(10, 0, -1)") || code.includes("-1")) {
          result = "10\n9\n8\n7\n6\n5\n4\n3\n2\n1"
        }
      } else if (challengeTitle.includes("times table") || challengeTitle.includes("multiplication")) {
        const tableMatch = challengeTitle.match(/(\d+)\s*times/)
        const table = tableMatch ? Number.parseInt(tableMatch[1]) : 2
        if (code.includes("range(1, 11)") && code.includes("*")) {
          result = Array.from({ length: 10 }, (_, i) => `${table} x ${i + 1} = ${table * (i + 1)}`).join("\n")
        }
      } else if (challengeTitle.includes("star") || challengeTitle.includes("triangle")) {
        const rowMatch = challengeTitle.match(/(\d+)-row/)
        const rows = rowMatch ? Number.parseInt(rowMatch[1]) : 3
        if (code.includes("'*' * i") || code.includes("print('*'")) {
          result = Array.from({ length: rows }, (_, i) => "*".repeat(i + 1)).join("\n")
        } else if (code.includes("'#' * i")) {
          result = Array.from({ length: rows }, (_, i) => "#".repeat(i + 1)).join("\n")
        } else if (code.includes("'+' * i")) {
          result = Array.from({ length: rows }, (_, i) => "+".repeat(i + 1)).join("\n")
        }
      } else if (challengeTitle.includes("square")) {
        const limitMatch = challengeTitle.match(/(\d+)/)
        const limit = limitMatch ? Number.parseInt(limitMatch[1]) : 5
        if (code.includes("squared") || code.includes("* i")) {
          result = Array.from({ length: limit }, (_, i) => `${i + 1} squared is ${(i + 1) * (i + 1)}`).join("\n")
        }
      }

      setOutput(result)

      // Check completion
      const expected = challenge.testCases?.[0]?.expected || ""
      console.log("🎯 Expected:", expected)
      console.log("🎯 Got:", result)

      if (result && (result === expected || result.includes(expected.split("\n")[0]))) {
        setIsComplete(true)
        setTimeout(() => onComplete(challenge.xp), 1500)
      }
    } catch (error) {
      console.error("❌ Loop execution error:", error)
      setOutput("Error: " + error.message)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-700 p-6">
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
            <p className="text-sm opacity-80">Loop Challenge • +{challenge.xp} XP</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Instructions */}
          <div className="bg-white rounded-2xl p-6 shadow-2xl">
            <div className="text-4xl mb-4 text-center">🔄</div>
            <h2 className="text-xl font-bold text-gray-800 mb-3">{challenge.instructions}</h2>
            <p className="text-gray-600 mb-4">Drag code blocks to create a working loop!</p>

            {/* Available Blocks */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-700 mb-3">Available Blocks:</h3>
              <div className="space-y-2">
                {loopBlocks.map((block) => (
                  <button
                    key={block.id}
                    onClick={() => addBlock(block)}
                    className={`w-full p-2 text-left rounded border-2 text-sm font-mono transition-colors ${
                      block.type === "loop"
                        ? "border-blue-300 bg-blue-50 hover:bg-blue-100"
                        : block.type === "variable"
                          ? "border-purple-300 bg-purple-50 hover:bg-purple-100"
                          : "border-green-300 bg-green-50 hover:bg-green-100"
                    }`}
                  >
                    {block.label}
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
                <h3 className="text-xl font-bold text-green-800">Loop Master!</h3>
                <p className="text-green-600">+{challenge.xp} XP earned!</p>
              </div>
            )}
          </div>

          {/* Code Builder */}
          <div className="bg-white rounded-2xl p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Your Code:</h3>

            <div className="bg-gray-900 rounded-lg p-4 mb-4 min-h-48">
              {selectedBlocks.length === 0 ? (
                <p className="text-gray-400 text-center py-8">Click blocks to build your code</p>
              ) : (
                <div className="space-y-1">
                  {selectedBlocks.map((block, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 bg-gray-800 rounded border border-gray-600"
                    >
                      <span className="text-green-400 font-mono text-sm">{block.label}</span>
                      <button onClick={() => removeBlock(index)} className="text-red-400 hover:text-red-300">
                        ❌
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold text-gray-800">Output</h3>
                <Button onClick={runCode} className="bg-green-600 hover:bg-green-700 text-white">
                  ▶️ Run Loop
                </Button>
              </div>
              <div className="bg-gray-900 rounded-lg p-4 min-h-24">
                <pre className="text-green-400 font-mono text-sm">{output || "Click 'Run Loop' to see output..."}</pre>
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
