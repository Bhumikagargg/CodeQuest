"use client"

import { useState } from "react"
import { Button } from "./Button"
import { createUser } from "../services/userService"

export function UserRegistrationForm({ user, onComplete, onBack }) {
  const [formData, setFormData] = useState({
    firstName: user.name?.split(" ")[0] || "",
    lastName: user.name?.split(" ")[1] || "",
    email: user.email || "",
    age: "",
    learningGoal: "",
    experience: "",
    interests: [],
    parentEmail: "",
    schoolName: "",
    grade: "",
    preferredLanguage: "en",
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  })

  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState({})

  const learningGoals = [
    { id: "fun", label: "Learn for Fun", emoji: "🎮", description: "Explore coding as a hobby" },
    { id: "school", label: "School Project", emoji: "📚", description: "Complete assignments" },
    { id: "career", label: "Career Change", emoji: "💼", description: "Switch to tech career" },
    { id: "skills", label: "Improve Skills", emoji: "🚀", description: "Enhance existing knowledge" },
    { id: "kids", label: "Teach My Kids", emoji: "👨‍👩‍👧‍👦", description: "Help children learn coding" },
  ]

  const experienceLevels = [
    { id: "none", label: "Complete Beginner", emoji: "🌱", description: "Never coded before" },
    { id: "basic", label: "Some Experience", emoji: "🌿", description: "Tried coding a few times" },
    { id: "intermediate", label: "Intermediate", emoji: "🌳", description: "Know one language well" },
    { id: "advanced", label: "Advanced", emoji: "🏆", description: "Multiple languages & projects" },
  ]

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

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }))
    }
  }

  const handleInterestToggle = (interestId) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interestId)
        ? prev.interests.filter((id) => id !== interestId)
        : [...prev.interests, interestId],
    }))
  }

  const validateStep = (step) => {
    const newErrors = {}

    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = "First name is required"
      if (!formData.age) newErrors.age = "Age is required"
      if (Number.parseInt(formData.age) < 6) newErrors.age = "Must be at least 6 years old"
      if (Number.parseInt(formData.age) > 100) newErrors.age = "Please enter a valid age"
    }

    if (step === 2) {
      if (!formData.learningGoal) newErrors.learningGoal = "Please select a learning goal"
      if (!formData.experience) newErrors.experience = "Please select your experience level"
    }

    if (step === 3) {
      if (formData.interests.length === 0) newErrors.interests = "Please select at least one interest"
      if (Number.parseInt(formData.age) < 13 && !formData.parentEmail.trim()) {
        newErrors.parentEmail = "Parent email is required for users under 13"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const handlePrevious = () => {
    setCurrentStep((prev) => prev - 1)
  }

  const handleSubmit = async () => {
    if (!validateStep(3)) return

    setIsSubmitting(true)
    try {
      const userData = {
        ...formData,
        email: user.email,
        provider: user.provider,
        avatar: user.avatar,
        registrationDate: new Date().toISOString(),
        isMinor: Number.parseInt(formData.age) < 13,
      }

      const createdUser = await createUser(userData)
      console.log("User created successfully:", createdUser)

      onComplete(createdUser)
    } catch (error) {
      console.error("Error creating user:", error)
      setErrors({ submit: "Failed to create account. Please try again." })
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="text-4xl mb-2">👋</div>
        <h2 className="text-2xl font-bold text-gray-800">Welcome to CodeQuest!</h2>
        <p className="text-gray-600">Let's get to know you better</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => handleInputChange("firstName", e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.firstName ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your first name"
          />
          {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => handleInputChange("lastName", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your last name"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Age *</label>
        <input
          type="number"
          min="6"
          max="100"
          value={formData.age}
          onChange={(e) => handleInputChange("age", e.target.value)}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.age ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="How old are you?"
        />
        {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          type="email"
          value={formData.email}
          disabled
          className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600"
        />
        <p className="text-xs text-gray-500 mt-1">This email will be used for your account</p>
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="text-4xl mb-2">🎯</div>
        <h2 className="text-2xl font-bold text-gray-800">What's Your Goal?</h2>
        <p className="text-gray-600">Help us personalize your learning experience</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Learning Goal *</label>
        <div className="grid gap-3">
          {learningGoals.map((goal) => (
            <button
              key={goal.id}
              type="button"
              onClick={() => handleInputChange("learningGoal", goal.id)}
              className={`p-4 rounded-lg border-2 text-left transition-all ${
                formData.learningGoal === goal.id
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{goal.emoji}</span>
                <div>
                  <div className="font-semibold text-gray-800">{goal.label}</div>
                  <div className="text-sm text-gray-600">{goal.description}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
        {errors.learningGoal && <p className="text-red-500 text-xs mt-1">{errors.learningGoal}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Experience Level *</label>
        <div className="grid gap-3">
          {experienceLevels.map((level) => (
            <button
              key={level.id}
              type="button"
              onClick={() => handleInputChange("experience", level.id)}
              className={`p-4 rounded-lg border-2 text-left transition-all ${
                formData.experience === level.id
                  ? "border-green-500 bg-green-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{level.emoji}</span>
                <div>
                  <div className="font-semibold text-gray-800">{level.label}</div>
                  <div className="text-sm text-gray-600">{level.description}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
        {errors.experience && <p className="text-red-500 text-xs mt-1">{errors.experience}</p>}
      </div>
    </div>
  )

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="text-4xl mb-2">🎨</div>
        <h2 className="text-2xl font-bold text-gray-800">What Interests You?</h2>
        <p className="text-gray-600">Select areas you'd like to explore</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Interests * (Select at least one)</label>
        <div className="grid grid-cols-2 gap-3">
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
              <div className="text-2xl mb-1">{interest.emoji}</div>
              <div className="text-sm font-medium text-gray-800">{interest.label}</div>
            </button>
          ))}
        </div>
        {errors.interests && <p className="text-red-500 text-xs mt-1">{errors.interests}</p>}
      </div>

      {Number.parseInt(formData.age) < 13 && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Parent/Guardian Email *</label>
          <input
            type="email"
            value={formData.parentEmail}
            onChange={(e) => handleInputChange("parentEmail", e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.parentEmail ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="parent@example.com"
          />
          {errors.parentEmail && <p className="text-red-500 text-xs mt-1">{errors.parentEmail}</p>}
          <p className="text-xs text-gray-500 mt-1">Required for users under 13</p>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">School Name (Optional)</label>
          <input
            type="text"
            value={formData.schoolName}
            onChange={(e) => handleInputChange("schoolName", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Your school name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Grade (Optional)</label>
          <input
            type="text"
            value={formData.grade}
            onChange={(e) => handleInputChange("grade", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., 5th Grade, College"
          />
        </div>
      </div>

      {errors.submit && (
        <div className="p-3 bg-red-100 border border-red-300 rounded-lg">
          <p className="text-red-700 text-sm">{errors.submit}</p>
        </div>
      )}
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl p-8 max-w-2xl w-full shadow-2xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Step {currentStep} of 3</span>
            <button onClick={onBack} className="text-gray-500 hover:text-gray-700 text-sm">
              ← Back to Login
            </button>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* Form Content */}
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <Button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            variant="outline"
            className="border-gray-300 text-gray-700 disabled:opacity-50"
          >
            Previous
          </Button>

          {currentStep < 3 ? (
            <Button onClick={handleNext} className="bg-blue-600 hover:bg-blue-700 text-white">
              Next
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              {isSubmitting ? "🔄 Creating Account..." : "🚀 Complete Registration"}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
