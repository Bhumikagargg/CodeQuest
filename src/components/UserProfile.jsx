"use client"

import { useState } from "react"
import { Button } from "./Button"
import { updateUserProfile } from "../services/userService"

export function UserProfile({ user, onBack, onUpdateUser }) {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    firstName: user?.firstName || user?.name?.split(" ")[0] || "",
    lastName: user?.lastName || user?.name?.split(" ")[1] || "",
    email: user?.email || "",
    age: user?.age || "",
    learningGoal: user?.learningGoal || "",
    experience: user?.experience || "",
    interests: user?.interests || [],
    schoolName: user?.schoolName || "",
    grade: user?.grade || "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleInterestToggle = (interestId) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interestId)
        ? prev.interests.filter((id) => id !== interestId)
        : [...prev.interests, interestId],
    }))
  }

  const handleSave = async () => {
    setIsLoading(true)
    setMessage("")

    try {
      const updatedUser = await updateUserProfile(user.email, formData)
      onUpdateUser({ ...user, ...updatedUser })
      setIsEditing(false)
      setMessage("Profile updated successfully! ✅")
    } catch (error) {
      console.error("Error updating profile:", error)
      setMessage("Failed to update profile. Please try again. ❌")
    } finally {
      setIsLoading(false)
    }
  }

  const interests = [
    { id: "games", label: "Game Development", emoji: "🎮" },
    { id: "web", label: "Web Development", emoji: "🌐" },
    { id: "mobile", label: "Mobile Apps", emoji: "📱" },
    { id: "ai", label: "AI & Machine Learning", emoji: "🤖" },
    { id: "data", label: "Data Science", emoji: "📊" },
    { id: "robotics", label: "Robotics", emoji: "🤖" },
    { id: "art", label: "Creative Coding", emoji: "🎨" },
    { id: "math", label: "Math & Logic", emoji: "🧮" },
  ]

  const getExperienceLabel = (exp) => {
    const levels = {
      none: "Complete Beginner 🌱",
      basic: "Some Experience 🌿",
      intermediate: "Intermediate 🌳",
      advanced: "Advanced 🏆",
    }
    return levels[exp] || exp
  }

  const getLearningGoalLabel = (goal) => {
    const goals = {
      fun: "Learn for Fun 🎮",
      school: "School Project 📚",
      career: "Career Change 💼",
      skills: "Improve Skills 🚀",
      kids: "Teach My Kids 👨‍👩‍👧‍👦",
    }
    return goals[goal] || goal
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-white hover:text-yellow-300 transition-colors"
          >
            <span className="text-2xl">←</span>
            <span>Back</span>
          </button>
          <div className="text-white text-center">
            <h1 className="text-3xl font-bold">My Profile</h1>
            <p className="text-sm opacity-80">Manage your account information</p>
          </div>
          <div className="w-20"></div> {/* Spacer for centering */}
        </div>

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-8 text-white">
            <div className="flex items-center space-x-6">
              <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-4xl font-bold">
                {user?.avatar === "🎮" ? "🎮" : user?.name?.charAt(0)?.toUpperCase() || "U"}
              </div>
              <div>
                <h2 className="text-3xl font-bold">
                  {formData.firstName} {formData.lastName}
                </h2>
                <p className="text-xl opacity-90">{formData.email}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">Age: {formData.age}</span>
                  <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">
                    {user?.provider === "google" ? "Google" : user?.provider === "email" ? "Email" : "Guest"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="p-8">
            {message && (
              <div
                className={`mb-6 p-4 rounded-lg ${
                  message.includes("✅") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                }`}
              >
                {message}
              </div>
            )}

            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800">Profile Information</h3>
              <Button onClick={() => setIsEditing(!isEditing)} className="bg-blue-600 hover:bg-blue-700 text-white">
                {isEditing ? "Cancel" : "✏️ Edit Profile"}
              </Button>
            </div>

            {isEditing ? (
              // Edit Mode
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                  <input
                    type="number"
                    value={formData.age}
                    onChange={(e) => handleInputChange("age", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">School Name</label>
                    <input
                      type="text"
                      value={formData.schoolName}
                      onChange={(e) => handleInputChange("schoolName", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Grade</label>
                    <input
                      type="text"
                      value={formData.grade}
                      onChange={(e) => handleInputChange("grade", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Interests</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {interests.map((interest) => (
                      <button
                        key={interest.id}
                        type="button"
                        onClick={() => handleInterestToggle(interest.id)}
                        className={`p-3 rounded-lg border-2 text-center transition-all ${
                          formData.interests.includes(interest.id)
                            ? "border-purple-500 bg-purple-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="text-xl mb-1">{interest.emoji}</div>
                        <div className="text-xs font-medium text-gray-800">{interest.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button
                    onClick={handleSave}
                    disabled={isLoading}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    {isLoading ? "💾 Saving..." : "💾 Save Changes"}
                  </Button>
                  <Button
                    onClick={() => setIsEditing(false)}
                    variant="outline"
                    className="border-gray-300 text-gray-700"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              // View Mode
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-700 mb-2">Learning Goal</h4>
                    <p className="text-gray-600">{getLearningGoalLabel(formData.learningGoal) || "Not specified"}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-700 mb-2">Experience Level</h4>
                    <p className="text-gray-600">{getExperienceLabel(formData.experience) || "Not specified"}</p>
                  </div>
                </div>

                {formData.schoolName && (
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-700 mb-2">School</h4>
                      <p className="text-gray-600">{formData.schoolName}</p>
                    </div>
                    {formData.grade && (
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-700 mb-2">Grade</h4>
                        <p className="text-gray-600">{formData.grade}</p>
                      </div>
                    )}
                  </div>
                )}

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-700 mb-3">Interests</h4>
                  <div className="flex flex-wrap gap-2">
                    {formData.interests.length > 0 ? (
                      formData.interests.map((interestId) => {
                        const interest = interests.find((i) => i.id === interestId)
                        return interest ? (
                          <span
                            key={interestId}
                            className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm flex items-center space-x-1"
                          >
                            <span>{interest.emoji}</span>
                            <span>{interest.label}</span>
                          </span>
                        ) : null
                      })
                    ) : (
                      <p className="text-gray-500">No interests selected</p>
                    )}
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-700 mb-2">Account Details</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>
                      <strong>Email:</strong> {formData.email}
                    </p>
                    <p>
                      <strong>Account Type:</strong>{" "}
                      {user?.provider === "google"
                        ? "Google Account"
                        : user?.provider === "email"
                          ? "Email Account"
                          : "Guest Account"}
                    </p>
                    <p>
                      <strong>Member Since:</strong>{" "}
                      {user?.registrationDate ? new Date(user.registrationDate).toLocaleDateString() : "Unknown"}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
