"use client"

import { useState } from "react"
import { WelcomePage } from "./components/WelcomePage"
import { AuthPage } from "./components/AuthPage"
import { UserRegistrationForm } from "./components/UserRegistrationForm"
import LandingPage from "./LandingPage"
import {LevelSelection}  from "./pages/LevelSelection"
import { ChallengeList } from "./pages/ChallengeList"
import { ChallengeRouter } from "./components/challenges/ChallengeRouter"
import "./App.css"
import { UserProfile } from "./components/UserProfile"
import { UserProgress } from "./components/UserProgress"
import { UserAchievements } from "./components/UserAchievements"
import { UserSettings } from "./components/UserSettings"

function App() {
  const [currentPage, setCurrentPage] = useState("welcome")
  const [previousPage, setPreviousPage] = useState(null)
  const [user, setUser] = useState(null)
  const [pendingUser, setPendingUser] = useState(null) // For new user registration
  const [selectedSection, setSelectedSection] = useState(null)
  const [selectedDifficulty, setSelectedDifficulty] = useState(null)
  const [currentChallenge, setCurrentChallenge] = useState(null)

  const handleStartFree = () => {
    console.log("Start for free clicked")
    setCurrentPage("auth")
  }

  const handleGoToLogin = () => {
    console.log("Go to login clicked")
    setCurrentPage("auth")
  }

  const handleLogin = (userData) => {
    console.log("User logged in:", userData)
    setUser(userData)
    setCurrentPage("landing")
  }

  const handleNewUser = (userData) => {
    console.log("New user needs registration:", userData)
    setPendingUser(userData)
    setCurrentPage("registration")
  }

  const handleRegistrationComplete = (completeUserData) => {
    console.log("Registration completed:", completeUserData)
    setUser(completeUserData)
    setPendingUser(null)
    setCurrentPage("landing")
  }

  const handleRegistrationBack = () => {
    console.log("Back from registration")
    setPendingUser(null)
    setCurrentPage("auth")
  }

  const handleLogout = () => {
    console.log("User logged out")
    setUser(null)
    setPendingUser(null)
    setCurrentPage("welcome")
    // Reset all other states
    setSelectedSection(null)
    setSelectedDifficulty(null)
    setCurrentChallenge(null)
  }

  const handleSectionSelect = (section) => {
    console.log("Section selected:", section)
    setSelectedSection(section)
    setCurrentPage("levels")
  }

  const handleLevelSelect = (difficulty) => {
    console.log("Level selected:", difficulty)
    setSelectedDifficulty(difficulty)
    setCurrentPage("challenges")
  }

  const handleChallengeStart = (challenge) => {
    console.log("Starting challenge:", challenge)
    setCurrentChallenge(challenge)
    setCurrentPage("challenge")
  }

  const handleChallengeComplete = (challenge, xpEarned) => {
    console.log("Challenge completed:", challenge.title, "XP:", xpEarned)
    alert(`🎉 Challenge Complete!\n\n${challenge.title}\n+${xpEarned} XP earned!`)
    setCurrentPage("challenges")
    setCurrentChallenge(null)
  }

  const handleNavigateToProfile = () => {
    setPreviousPage(currentPage)
    setCurrentPage("profile")
  }

  const handleNavigateToProgress = () => {
    setPreviousPage(currentPage)
    setCurrentPage("progress")
  }

  const handleNavigateToAchievements = () => {
    setPreviousPage(currentPage)
    setCurrentPage("achievements")
  }

  const handleNavigateToSettings = () => {
    setPreviousPage(currentPage)
    setCurrentPage("settings")
  }

  const handleBackToMain = () => {
    if (previousPage) {
      setCurrentPage(previousPage)
      setPreviousPage(null)
    } else {
      setCurrentPage("landing")
    }
  }

  const handleBack = () => {
    console.log("Back button clicked, current page:", currentPage)
    if (currentPage === "challenge") {
      setCurrentPage("challenges")
      setCurrentChallenge(null)
    } else if (currentPage === "challenges") {
      setCurrentPage("levels")
      setSelectedDifficulty(null)
    } else if (currentPage === "levels") {
      setCurrentPage("landing")
      setSelectedSection(null)
    } else if (currentPage === "registration") {
      setCurrentPage("auth")
      setPendingUser(null)
    } else if (["profile", "progress", "achievements", "settings"].includes(currentPage)) {
      handleBackToMain()
    }
  }

  const renderCurrentPage = () => {
    console.log("Rendering page:", currentPage, {
      user,
      pendingUser,
      selectedSection,
      selectedDifficulty,
      currentChallenge,
    })

    switch (currentPage) {
      case "welcome":
        return <WelcomePage onStartFree={handleStartFree} onLogin={handleGoToLogin} />
      case "auth":
        return <AuthPage onLogin={handleLogin} onNewUser={handleNewUser} />
      case "registration":
        return (
          <UserRegistrationForm
            user={pendingUser}
            onComplete={handleRegistrationComplete}
            onBack={handleRegistrationBack}
          />
        )
      case "landing":
        return (
          <LandingPage
            onSectionSelect={handleSectionSelect}
            user={user}
            onLogout={handleLogout}
            onNavigateToProfile={handleNavigateToProfile}
            onNavigateToProgress={handleNavigateToProgress}
            onNavigateToAchievements={handleNavigateToAchievements}
            onNavigateToSettings={handleNavigateToSettings}
          />
        )
      case "levels":
        return <LevelSelection section={selectedSection} onLevelSelect={handleLevelSelect} onBack={handleBack} />
      case "challenges":
        return (
          <ChallengeList
            section={selectedSection}
            difficulty={selectedDifficulty}
            onChallengeStart={handleChallengeStart}
            onBack={handleBack}
          />
        )
      case "challenge":
        return <ChallengeRouter challenge={currentChallenge} onBack={handleBack} onComplete={handleChallengeComplete} />
      case "profile":
        return <UserProfile user={user} onBack={handleBack} onUpdateUser={setUser} />
      case "progress":
        return <UserProgress user={user} onBack={handleBack} />
      case "achievements":
        return <UserAchievements user={user} onBack={handleBack} />
      case "settings":
        return <UserSettings user={user} onBack={handleBack} onUpdateUser={setUser} onLogout={handleLogout} />
      default:
        return <WelcomePage onStartFree={handleStartFree} onLogin={handleGoToLogin} />
    }
  }

  return <div className="App">{renderCurrentPage()}</div>
}

export default App
