"use client"

import { useState, useEffect, useCallback } from "react"
import { ChallengeCard } from "./ChallengeCard"
import { generateKidsChallenge, generateBeginnerChallenge } from "../services/challengeGenerators"

export function LocalChallengeFeed({ section, difficulty, onChallengeStart }) {
  const [challenges, setChallenges] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(0)
  const [error, setError] = useState(null)

  // Load initial challenges immediately when component mounts
  useEffect(() => {
    console.log(`🎮 LocalChallengeFeed mounted for ${section} - ${difficulty}`)
    loadInitialChallenges()
  }, [section, difficulty])

  const loadInitialChallenges = async () => {
    console.log(`🎯 Starting to generate initial challenges for ${section} - ${difficulty}`)
    setLoading(true)
    setChallenges([])
    setPage(0)
    setError(null)

    try {
      const initialChallenges = generateLocalChallenges(0)
      console.log(`✅ Generated ${initialChallenges.length} initial challenges:`, initialChallenges)

      if (initialChallenges.length === 0) {
        throw new Error("No challenges were generated")
      }

      setChallenges(initialChallenges)
    } catch (error) {
      console.error("❌ Failed to load initial challenges:", error)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const generateLocalChallenges = (pageNum) => {
    console.log(`🔧 Generating challenges for page ${pageNum}`)
    const challengesPerPage = 8
    const newChallenges = []

    try {
      // Add daily challenge on first page for BOTH kids and beginners
      if (pageNum === 0) {
        const dailyChallenge = generateDailyChallenge()
        newChallenges.push(dailyChallenge)
        console.log(`🌟 Generated daily challenge: ${dailyChallenge.title}`)
      }

      // Generate specific challenge types in order to ensure variety
      const challengeTypes =
        section === "kids"
          ? ["movement", "sequence", "math", "pattern"]
          : ["syntax", "loops", "conditionals", "functions", "data-structures"]

      console.log(`🎲 Using challenge types for ${section}:`, challengeTypes)

      // Generate exactly the right number of challenges for BOTH sections
      const challengesToGenerate = pageNum === 0 ? challengesPerPage - 1 : challengesPerPage // -1 for daily challenge on first page

      for (let i = 0; i < challengesToGenerate; i++) {
        // Cycle through challenge types to ensure variety
        const typeIndex = i % challengeTypes.length
        const challengeType = challengeTypes[typeIndex]

        console.log(`🎯 Generating challenge ${i + 1}/${challengesToGenerate} of type: ${challengeType}`)

        let challenge
        try {
          if (section === "kids") {
            challenge = generateKidsChallenge(difficulty, challengeType)
          } else {
            challenge = generateBeginnerChallenge(difficulty, challengeType)
          }

          if (!challenge) {
            throw new Error(`Failed to generate ${challengeType} challenge`)
          }

          // Add metadata
          challenge.isGenerated = true
          challenge.generatedAt = new Date().toLocaleTimeString()
          challenge.pageGenerated = pageNum

          console.log(
            `✨ Successfully generated ${section} challenge:`,
            challenge.title,
            "Type:",
            challengeType,
            "GameType:",
            challenge.gameType || challenge.type,
          )

          newChallenges.push(challenge)
        } catch (challengeError) {
          console.error(`❌ Failed to generate ${challengeType} challenge:`, challengeError)
          // Continue with next challenge instead of failing completely
        }
      }

      console.log(`🎉 Total challenges generated: ${newChallenges.length}`)
      return newChallenges
    } catch (error) {
      console.error("❌ Error in generateLocalChallenges:", error)
      return []
    }
  }

  const generateDailyChallenge = () => {
    try {
      const today = new Date()
      const dayOfWeek = today.getDay()
      const themes = [
        "Sunday Sorting Fun",
        "Monday Math Magic",
        "Tuesday Turtle Graphics",
        "Wednesday Word Games",
        "Thursday Thinking Puzzles",
        "Friday Fun Functions",
        "Saturday String Adventures",
      ]

      // Make daily challenge type based on day of week
      const dailyTypes =
        section === "kids"
          ? ["movement", "sequence", "math", "pattern"]
          : ["syntax", "loops", "conditionals", "functions"]

      const dailyType = dailyTypes[dayOfWeek % dailyTypes.length]

      console.log(`🌟 Generating daily challenge of type: ${dailyType}`)

      let dailyChallenge
      if (section === "kids") {
        dailyChallenge = generateKidsChallenge(difficulty, dailyType)
      } else {
        dailyChallenge = generateBeginnerChallenge(difficulty, dailyType)
      }

      if (!dailyChallenge) {
        throw new Error("Failed to generate daily challenge")
      }

      // Override with daily theme
      dailyChallenge.id = `daily_${today.toDateString()}`
      dailyChallenge.title = `🌟 ${themes[dayOfWeek]}`
      dailyChallenge.description = "Complete today's special challenge for bonus XP!"
      dailyChallenge.xp = 200 // Bonus XP for daily challenges
      dailyChallenge.isDaily = true

      return dailyChallenge
    } catch (error) {
      console.error("❌ Error generating daily challenge:", error)
      // Return a fallback daily challenge
      return {
        id: `daily_fallback_${Date.now()}`,
        title: "🌟 Daily Challenge",
        description: "Complete today's special challenge for bonus XP!",
        type: "syntax",
        difficulty,
        xp: 200,
        icon: "⭐",
        language: "python",
        instructions: "Complete today's coding challenge!",
        starterCode: "# Daily challenge\nprint('Hello, World!')",
        solution: "print('Hello, World!')",
        testCases: [{ input: "", expected: "Hello, World!" }],
        hints: ["Use the print() function", "Don't forget the quotes"],
        isDaily: true,
        isGenerated: true,
      }
    }
  }

  const handleLoadMore = useCallback(async () => {
    if (loading) return

    setLoading(true)
    try {
      const nextPage = page + 1
      const newChallenges = generateLocalChallenges(nextPage)

      if (newChallenges.length > 0) {
        setChallenges((prev) => [...prev, ...newChallenges])
        setPage(nextPage)
        console.log(`➕ Added ${newChallenges.length} more challenges (page ${nextPage})`)
      }
    } catch (error) {
      console.error("❌ Failed to load more challenges:", error)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }, [page, loading, section, difficulty])

  // Infinite scroll detection
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 1000 &&
        !loading &&
        challenges.length > 0
      ) {
        handleLoadMore()
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleLoadMore, loading, challenges.length])

  // Show loading state
  if (loading && challenges.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-white text-3xl animate-pulse mb-4">🎮 Generating Challenges...</div>
        <div className="text-white opacity-70 mb-6">
          Creating variety of {section === "kids" ? "fun games" : "coding challenges"}...
        </div>
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto"></div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Challenge Type Legend */}
      <div className="mb-8">
        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4">
          <h3 className="text-white font-bold mb-3 text-center">🎮 Challenge Types Available:</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-white text-sm">
            {section === "kids" ? (
              <>
                <div className="text-center">🏃 Movement Games</div>
                <div className="text-center">🔢 Sequence Puzzles</div>
                <div className="text-center">🧮 Math Challenges</div>
                <div className="text-center">🌈 Pattern Games</div>
              </>
            ) : (
              <>
                <div className="text-center">💻 Syntax Practice</div>
                <div className="text-center">🔄 Loop Challenges</div>
                <div className="text-center">🤔 Logic Puzzles</div>
                <div className="text-center">⚙️ Function Building</div>
                <div className="text-center">📦 Data Structures</div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="text-center py-8 mb-8">
          <div className="bg-red-500 bg-opacity-20 backdrop-blur-sm rounded-lg p-6">
            <div className="text-white text-xl mb-2">⚠️ Error Loading Challenges</div>
            <div className="text-white opacity-80 mb-4">{error}</div>
            <button
              onClick={loadInitialChallenges}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-6 py-2 rounded-full font-semibold transition-all duration-300"
            >
              🔄 Try Again
            </button>
          </div>
        </div>
      )}

      {/* Challenges Grid */}
      {challenges.length > 0 && (
        <div className="space-y-6">
          {challenges.map((challenge, index) => (
            <div key={`${challenge.id}-${index}`} className="transform hover:scale-102 transition-transform">
              <ChallengeCard
                challenge={challenge}
                isCompleted={false}
                onStart={onChallengeStart}
                showDailyBadge={challenge.isDaily}
                showGeneratedBadge={challenge.isGenerated}
              />
            </div>
          ))}
        </div>
      )}
      {/* Loading indicator for more challenges */}
      {loading && challenges.length > 0 && (
        <div className="text-center py-8">
          <div className="text-white text-2xl animate-pulse">🎮 Generating more challenges...</div>
          <div className="mt-2 text-white opacity-70">Adding more variety...</div>
        </div>
      )}

      {/* Load more button */}
      {!loading && challenges.length > 0 && (
        <div className="text-center py-8">
          <button
            onClick={handleLoadMore}
            className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 backdrop-blur-sm"
          >
            🚀 Generate More Challenges
          </button>
          <div className="mt-2 text-white opacity-60 text-sm">Currently showing {challenges.length} challenges</div>
        </div>
      )}

      {/* Empty state (only show if no error and no challenges) */}
      {!loading && !error && challenges.length === 0 && (
        <div className="text-center py-12">
          <div className="text-white text-2xl mb-4">😅 No challenges found</div>
          <div className="text-white opacity-70 mb-4">
            Something went wrong generating {section} challenges for {difficulty} difficulty.
          </div>
          <button
            onClick={loadInitialChallenges}
            className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-6 py-2 rounded-full font-semibold transition-all duration-300"
          >
            🔄 Try Again
          </button>
        </div>
      )}

      {/* Debug Info (only in development) */}
      {process.env.NODE_ENV === "development" && (
        <div className="mt-8 bg-black bg-opacity-20 backdrop-blur-sm rounded-lg p-4">
          <div className="text-white text-sm">
            <div>🐛 Debug Info:</div>
            <div>Section: {section}</div>
            <div>Difficulty: {difficulty}</div>
            <div>Challenges: {challenges.length}</div>
            <div>Loading: {loading.toString()}</div>
            <div>Error: {error || "None"}</div>
          </div>
        </div>
      )}
    </div>
  )
}
