"use client"

import { useState } from "react"
import { Button } from "../Button"

export function BeginnerDataChallenge({ challenge, onComplete, onBack }) {
  const [dataStructure, setDataStructure] = useState("list")
  const [items, setItems] = useState([])
  const [newItem, setNewItem] = useState("")
  const [output, setOutput] = useState("")
  const [isComplete, setIsComplete] = useState(false)
  const [showHint, setShowHint] = useState(false)

  const addItem = () => {
    if (!newItem.trim()) return

    let processedItem = newItem.trim()

    // For dictionaries, expect key:value format
    if (dataStructure === "dictionary" && !processedItem.includes(":")) {
      processedItem = `item${items.length + 1}:${processedItem}`
    }

    setItems([...items, processedItem])
    setNewItem("")
  }

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index))
  }

  const displayStructure = () => {
    let result = ""

    switch (dataStructure) {
      case "list":
        result = `my_list = [${items.map((item) => `"${item}"`).join(", ")}]\nprint(my_list)\nLength: ${items.length}`
        break
      case "dictionary":
        const dictItems = items
          .map((item) => {
            const [key, value] = item.includes(":") ? item.split(":") : [item, item]
            return `"${key}": "${value}"`
          })
          .join(", ")
        result = `my_dict = {${dictItems}}\nprint(my_dict)\nKeys: ${items.length}`
        break
      case "set":
        result = `my_set = {${items.map((item) => `"${item}"`).join(", ")}}\nprint(my_set)\nUnique items: ${new Set(items).size}`
        break
    }

    setOutput(result)

    // Check completion - if user has added at least 3 items
    if (items.length >= 3) {
      setIsComplete(true)
      setTimeout(() => onComplete(challenge.xp), 1500)
    }
  }

  const getStructureInfo = () => {
    switch (dataStructure) {
      case "list":
        return { emoji: "📋", description: "Ordered collection of items", example: "['apple', 'banana', 'orange']" }
      case "dictionary":
        return { emoji: "📚", description: "Key-value pairs", example: "{'name': 'Alice', 'age': 25}" }
      case "set":
        return { emoji: "🎯", description: "Unique items only", example: "{'red', 'blue', 'green'}" }
      default:
        return { emoji: "📦", description: "Data structure", example: "" }
    }
  }

  const structureInfo = getStructureInfo()

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-600 to-blue-700 p-6">
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
            <p className="text-sm opacity-80">Data Structure Challenge • +{challenge.xp} XP</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Data Structure Builder */}
          <div className="bg-white rounded-2xl p-6 shadow-2xl">
            <div className="text-4xl mb-4 text-center">📦</div>
            <h2 className="text-xl font-bold text-gray-800 mb-3">{challenge.instructions}</h2>
            <p className="text-gray-600 mb-4">Build and manipulate data structures!</p>

            {/* Structure Type Selection */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-700 mb-3">Choose Data Structure:</h3>
              <div className="grid grid-cols-3 gap-2">
                {["list", "dictionary", "set"].map((type) => (
                  <button
                    key={type}
                    onClick={() => {
                      setDataStructure(type)
                      setItems([])
                      setOutput("")
                    }}
                    className={`p-3 rounded border-2 text-center transition-colors ${
                      dataStructure === type
                        ? "border-blue-500 bg-blue-100"
                        : "border-gray-300 bg-gray-50 hover:bg-gray-100"
                    }`}
                  >
                    <div className="text-2xl mb-1">{getStructureInfo(type).emoji || "📦"}</div>
                    <div className="text-sm font-semibold capitalize">{type}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Structure Info */}
            <div className="mb-4 p-3 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-1">
                {structureInfo.emoji} {dataStructure.charAt(0).toUpperCase() + dataStructure.slice(1)}
              </h4>
              <p className="text-blue-700 text-sm mb-2">{structureInfo.description}</p>
              <code className="text-blue-600 text-xs">{structureInfo.example}</code>
            </div>

            {/* Add Items */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-700 mb-3">Add Items:</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                  placeholder={dataStructure === "dictionary" ? "key:value or just value" : "Enter item"}
                  className="flex-1 p-2 border border-gray-300 rounded"
                  onKeyPress={(e) => e.key === "Enter" && addItem()}
                />
                <Button onClick={addItem} className="bg-blue-600 hover:bg-blue-700 text-white">
                  Add
                </Button>
              </div>
            </div>

            {/* Current Items */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-700 mb-3">Current Items ({items.length}):</h3>
              <div className="max-h-32 overflow-y-auto space-y-1">
                {items.length === 0 ? (
                  <p className="text-gray-400 text-sm">No items added yet</p>
                ) : (
                  items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-100 rounded">
                      <span className="text-sm font-mono">{item}</span>
                      <button onClick={() => removeItem(index)} className="text-red-500 hover:text-red-700">
                        ❌
                      </button>
                    </div>
                  ))
                )}
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
                <h3 className="text-xl font-bold text-green-800">Data Master!</h3>
                <p className="text-green-600">+{challenge.xp} XP earned!</p>
              </div>
            )}
          </div>

          {/* Code Display */}
          <div className="bg-white rounded-2xl p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Generated Code</h3>

            <div className="bg-gray-900 rounded-lg p-4 mb-4 min-h-48">
              <pre className="text-green-400 font-mono text-sm whitespace-pre-wrap">
                {items.length > 0
                  ? `# Creating a ${dataStructure}\n${output || `# Add items and click 'Display ${dataStructure.charAt(0).toUpperCase() + dataStructure.slice(1)}' to see code`}`
                  : `# Add some items to your ${dataStructure} first!`}
              </pre>
            </div>

            <div className="flex gap-2 mb-4">
              <Button
                onClick={displayStructure}
                disabled={items.length === 0}
                className="bg-green-600 hover:bg-green-700 text-white disabled:opacity-50"
              >
                📊 Display {dataStructure.charAt(0).toUpperCase() + dataStructure.slice(1)}
              </Button>
              <Button
                onClick={() => setShowHint(!showHint)}
                variant="outline"
                className="border-yellow-400 text-yellow-700"
              >
                💡 Hint
              </Button>
            </div>

            <div className="text-sm text-gray-600">
              <p>💡 Try adding at least 3 items to complete the challenge!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
