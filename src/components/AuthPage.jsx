"use client"

import { useState } from "react"
import { Button } from "./Button"
import { FloatingBubbles } from "./floating-bubbles"
import { AnimatedMascot } from "./animated-mascot"
import { Code, Users, Trophy, Sparkles } from "./icons"
import { authenticateWithGoogle, authenticateWithEmail, getUserProfile } from "../services/userService"

export function AuthPage({ onLogin, onNewUser }) {
  const [showEmailForm, setShowEmailForm] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isSignUp, setIsSignUp] = useState(false)
  const [error, setError] = useState("")

  const handleGoogleLogin = async () => {
    setIsLoading(true)
    setError("")

    try {
      const authResult = await authenticateWithGoogle()

      if (authResult.isNewUser) {
        // New user - redirect to registration form
        onNewUser(authResult)
      } else {
        // Existing user - get full profile and login
        const userProfile = await getUserProfile(authResult.email)
        onLogin(userProfile)
      }
    } catch (error) {
      console.error("Google login error:", error)
      setError("Failed to login with Google. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleEmailAuth = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const authResult = await authenticateWithEmail(email, password, isSignUp)

      if (authResult.isNewUser) {
        // New user - redirect to registration form
        onNewUser(authResult)
      } else {
        // Existing user - login directly
        onLogin(authResult)
      }
    } catch (error) {
      console.error("Email auth error:", error)
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGuestMode = () => {
    onLogin({
      name: "Guest User",
      email: "guest@codequest.com",
      provider: "guest",
      avatar: "🎮",
      isGuest: true,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      <FloatingBubbles />

      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 text-6xl animate-bounce">⭐</div>
        <div className="absolute top-40 right-20 text-4xl animate-pulse">🌟</div>
        <div className="absolute bottom-20 left-20 text-5xl animate-spin-slow">💫</div>
        <div className="absolute bottom-40 right-10 text-3xl animate-bounce">✨</div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">
        {/* Logo and Mascot */}
        <div className="text-center mb-8 animate-fade-in pt-12">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center animate-spin-slow">
              <Code className="text-white" size={24} />
            </div>
            <span className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              CodeQuest
            </span>
          </div>

          <div className="mb-6 animate-scale-in" style={{ animationDelay: "0.2s" }}>
            <AnimatedMascot />
          </div>
        </div>

        {/* Welcome Text */}
        <div className="text-center mb-8 max-w-2xl animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Welcome to Your Coding Adventure! 🚀</h1>
          <p className="text-xl text-white opacity-90 mb-2">
            Join thousands of learners mastering programming through interactive games
          </p>
          <p className="text-lg text-white opacity-75">Choose your path, solve challenges, and become a coding hero!</p>
        </div>

        {/* Stats Preview */}
        <div className="flex flex-wrap justify-center gap-6 mb-8 animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
          {[
            { icon: Users, label: "Active Learners", value: "10K+", emoji: "👥" },
            { icon: Trophy, label: "Challenges", value: "500+", emoji: "🏆" },
            { icon: Sparkles, label: "Success Rate", value: "95%", emoji: "⭐" },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className="flex flex-col items-center p-4 rounded-lg bg-white bg-opacity-10 backdrop-blur-sm animate-bounce-in"
              style={{ animationDelay: `${0.8 + i * 0.2}s` }}
            >
              <div className="text-2xl mb-1">{stat.emoji}</div>
              <div className="text-lg font-bold text-white">{stat.value}</div>
              <div className="text-xs text-white opacity-80">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Authentication Card */}
        <div
          className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl animate-scale-in"
          style={{ animationDelay: "1s" }}
        >
          {!showEmailForm ? (
            // Login Options
            <div className="text-center">
              <div className="text-4xl mb-4 animate-wiggle">🎮</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Start Your Journey</h2>
              <p className="text-gray-600 mb-6">Choose how you'd like to continue</p>

              {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-300 rounded-lg">
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              <div className="space-y-4">
                {/* Google Login */}
                <Button
                  onClick={handleGoogleLogin}
                  disabled={isLoading}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg flex items-center justify-center space-x-2"
                >
                  {isLoading ? (
                    <span>🔄 Connecting...</span>
                  ) : (
                    <>
                      <span>🔍</span>
                      <span>Continue with Google</span>
                    </>
                  )}
                </Button>

                {/* Email Login */}
                <Button
                  onClick={() => setShowEmailForm(true)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg flex items-center justify-center space-x-2"
                >
                  <span>📧</span>
                  <span>Continue with Email</span>
                </Button>

                {/* Guest Mode */}
                {/* <Button
                  onClick={handleGuestMode}
                  variant="outline"
                  className="w-full py-3 rounded-lg border-2 border-gray-300 text-gray-700 hover:bg-gray-50 flex items-center justify-center space-x-2"
                >
                  <span>👤</span>
                  <span>Continue as Guest</span>
                </Button> */}
              </div>

              <div className="mt-6 text-xs text-gray-500 text-center">
                By continuing, you agree to our Terms of Service and Privacy Policy
              </div>
            </div>
          ) : (
            // Email Form
            <div>
              <div className="flex items-center mb-6">
                <button
                  onClick={() => {
                    setShowEmailForm(false)
                    setError("")
                  }}
                  className="text-gray-500 hover:text-gray-700 mr-3"
                >
                  ←
                </button>
                <div>
                  <h2 className="text-xl font-bold text-gray-800">{isSignUp ? "Create Account" : "Welcome Back"}</h2>
                  <p className="text-gray-600 text-sm">
                    {isSignUp ? "Join the CodeQuest community" : "Sign in to continue your journey"}
                  </p>
                </div>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-300 rounded-lg">
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              <form onSubmit={handleEmailAuth} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="••••••••"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isLoading || !email || !password}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg disabled:opacity-50"
                >
                  {isLoading ? "🔄 Processing..." : isSignUp ? "🚀 Create Account" : "🎮 Sign In"}
                </Button>
              </form>

              <div className="mt-4 text-center">
                <button onClick={() => setIsSignUp(!isSignUp)} className="text-blue-600 hover:text-blue-700 text-sm">
                  {isSignUp ? "Already have an account? Sign in" : "Don't have an account? Sign up"}
                </button>
              </div>

              {!isSignUp && (
                <div className="mt-2 text-center">
                  <button className="text-gray-500 hover:text-gray-700 text-sm">Forgot your password?</button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Features Preview */}
        <div className="mt-8 text-center animate-fade-in-up" style={{ animationDelay: "1.2s" }}>
          <p className="text-white opacity-80 mb-4">What awaits you:</p>
          <div className="flex flex-wrap justify-center gap-4 text-white text-sm pb-12">
            <div className="flex items-center space-x-2 bg-white bg-opacity-10 rounded-full px-4 py-2 hover:cursor-pointer">
              <span>😊</span>
              <span>Kids Zone Games</span>
            </div>
            <div className="flex items-center space-x-2 bg-white bg-opacity-10 rounded-full px-4 py-2 hover:cursor-pointer">
              <span>🚀</span>
              <span>Real Programming</span>
            </div>
            <div className="flex items-center space-x-2 bg-white bg-opacity-10 rounded-full px-4 py-2 hover:cursor-pointer">
              <span>🏆</span>
              <span>Unlimited Challenges</span>
            </div>
            <div className="flex items-center space-x-2 bg-white bg-opacity-10 rounded-full px-4 py-2 hover:cursor-pointer">
              <span>⭐</span>
              <span>Progress Tracking</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
