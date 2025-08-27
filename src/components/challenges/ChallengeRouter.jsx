"use client"

import { KidsVisualChallenge } from "./KidsVisualChallenge"
import { KidsSequenceChallenge } from "./KidsSequenceChallenge"
import { KidsMathChallenge } from "./KidsMathChallenge"
import { KidsPatternChallenge } from "./KidsPatternChallenge"
import { BeginnerSyntaxChallenge } from "./BeginnerSyntaxChallenge"
import { BeginnerLoopChallenge } from "./BeginnerLoopChallenge"
import { BeginnerConditionalChallenge } from "./BeginnerConditionalChallenge"
import { BeginnerFunctionChallenge } from "./BeginnerFunctionChallenge"
import { BeginnerDataChallenge } from "./BeginnerDataChallenge"
import { getUserProgress, saveProgress } from "../../data/challenges"

export function ChallengeRouter({ challenge, onBack, onComplete }) {
  const handleChallengeComplete = (xpEarned) => {
    // Save progress
    const progress = getUserProgress()
    const section = challenge.language ? "beginners" : "kids"
    const difficulty = challenge.difficulty

    if (!progress[section][difficulty].includes(challenge.id)) {
      progress[section][difficulty].push(challenge.id)
      progress.totalXP += xpEarned

      // Add badges for milestones
      if (progress.totalXP >= 100 && !progress.badges.includes("first_100")) {
        progress.badges.push("first_100")
      }
      if (progress.totalXP >= 500 && !progress.badges.includes("coding_star")) {
        progress.badges.push("coding_star")
      }

      saveProgress(progress)
    }

    if (onComplete) {
      onComplete(challenge, xpEarned)
    }
  }

  // Route to appropriate challenge component
  const renderChallenge = () => {
    console.log("🎮 CHALLENGE ROUTING DEBUG:")
    console.log("- Title:", challenge.title)
    console.log("- Type:", challenge.type)
    console.log("- GameType:", challenge.gameType)
    console.log("- Language:", challenge.language)
    console.log("- Section:", challenge.language ? "beginners" : "kids")

    // Validate challenge structure
    if (!challenge.type && !challenge.gameType) {
      console.error("❌ Challenge missing both type and gameType:", challenge)
      return <div>Error: Invalid challenge structure</div>
    }

    if (challenge.language) {
      // Beginner coding challenges - route based on type
      console.log("🎓 Routing to BEGINNER challenge:", challenge.type)

      switch (challenge.type) {
        case "syntax":
          return <BeginnerSyntaxChallenge challenge={challenge} onComplete={handleChallengeComplete} onBack={onBack} />

        case "loops":
          return <BeginnerLoopChallenge challenge={challenge} onComplete={handleChallengeComplete} onBack={onBack} />

        case "conditionals":
          return (
            <BeginnerConditionalChallenge challenge={challenge} onComplete={handleChallengeComplete} onBack={onBack} />
          )

        case "functions":
          return (
            <BeginnerFunctionChallenge challenge={challenge} onComplete={handleChallengeComplete} onBack={onBack} />
          )

        case "data-structures":
          return <BeginnerDataChallenge challenge={challenge} onComplete={handleChallengeComplete} onBack={onBack} />

        default:
          console.warn("⚠️ Unknown beginner type:", challenge.type, "defaulting to syntax")
          return <BeginnerSyntaxChallenge challenge={challenge} onComplete={handleChallengeComplete} onBack={onBack} />
      }
    } else {
      // Kids visual challenges - route based on gameType
      console.log("🧒 Routing to KIDS challenge:", challenge.gameType)

      switch (challenge.gameType) {
        case "movement":
          return <KidsVisualChallenge challenge={challenge} onComplete={handleChallengeComplete} onBack={onBack} />

        case "sequence":
          return <KidsSequenceChallenge challenge={challenge} onComplete={handleChallengeComplete} onBack={onBack} />

        case "math":
          return <KidsMathChallenge challenge={challenge} onComplete={handleChallengeComplete} onBack={onBack} />

        case "pattern":
          return <KidsPatternChallenge challenge={challenge} onComplete={handleChallengeComplete} onBack={onBack} />

        // Fallback for challenges that might use 'type' instead of 'gameType'
        case "visual-blocks":
          console.log("📦 Visual blocks challenge, routing to movement")
          return <KidsVisualChallenge challenge={challenge} onComplete={handleChallengeComplete} onBack={onBack} />

        default:
          console.warn("⚠️ Unknown kids gameType:", challenge.gameType, "defaulting to movement")
          return <KidsVisualChallenge challenge={challenge} onComplete={handleChallengeComplete} onBack={onBack} />
      }
    }
  }

  return renderChallenge()
}
