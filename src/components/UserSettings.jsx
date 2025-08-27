"use client"

import { useState } from "react"
import { Button } from "./Button"

export function UserSettings({ user, onBack, onUpdateUser, onLogout }) {
  const [settings, setSettings] = useState({
    notifications: true,
    soundEffects: true,
    darkMode: false,
    language: "en",
    difficulty: "auto",
    parentalControls: user?.age && Number.parseInt(user.age) < 13,
  })
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const handleSettingChange = (setting, value) => {
    setSettings((prev) => ({ ...prev, [setting]: value }))
  }

  const handleSaveSettings = () => {
    // In a real app, save to backend
    localStorage.setItem("codequest-settings", JSON.stringify(settings))
    alert("Settings saved! ✅")
  }

  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      // In a real app, call delete API
      localStorage.removeItem("codequest-users")
      localStorage.removeItem("codequest-progress")
      localStorage.removeItem("codequest-settings")
      alert("Account deleted successfully.")
      onLogout()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-600 to-slate-700 p-6">
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
            <h1 className="text-3xl font-bold">⚙️ Settings</h1>
            <p className="text-sm opacity-80">Customize your experience</p>
          </div>

          <div className="w-20"></div>
        </div>

        <div className="space-y-8">
          {/* General Settings */}
          <div className="bg-white rounded-2xl p-8 shadow-2xl">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="text-3xl mr-3">🎛️</span>
              General Settings
            </h3>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-gray-800">Notifications</h4>
                  <p className="text-gray-600 text-sm">Receive updates about new challenges and achievements</p>
                </div>
                <button
                  onClick={() => handleSettingChange("notifications", !settings.notifications)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.notifications ? "bg-blue-600" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.notifications ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-gray-800">Sound Effects</h4>
                  <p className="text-gray-600 text-sm">Play sounds for interactions and achievements</p>
                </div>
                <button
                  onClick={() => handleSettingChange("soundEffects", !settings.soundEffects)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.soundEffects ? "bg-blue-600" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.soundEffects ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-gray-800">Dark Mode</h4>
                  <p className="text-gray-600 text-sm">Switch to dark theme (coming soon)</p>
                </div>
                <button
                  onClick={() => handleSettingChange("darkMode", !settings.darkMode)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.darkMode ? "bg-blue-600" : "bg-gray-300"
                  }`}
                  disabled
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.darkMode ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Language</h4>
                <select
                  value={settings.language}
                  onChange={(e) => handleSettingChange("language", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="en">🇺🇸 English</option>
                  <option value="es">🇪🇸 Español</option>
                  <option value="fr">🇫🇷 Français</option>
                  <option value="de">🇩🇪 Deutsch</option>
                  <option value="zh">🇨🇳 中文</option>
                </select>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Default Difficulty</h4>
                <select
                  value={settings.difficulty}
                  onChange={(e) => handleSettingChange("difficulty", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="auto">🎯 Auto (Recommended)</option>
                  <option value="easy">🟢 Always Easy</option>
                  <option value="medium">🟡 Always Medium</option>
                  <option value="hard">🔴 Always Hard</option>
                </select>
              </div>
            </div>
          </div>

          {/* Privacy & Safety */}
          <div className="bg-white rounded-2xl p-8 shadow-2xl">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="text-3xl mr-3">🔒</span>
              Privacy & Safety
            </h3>

            <div className="space-y-6">
              {user?.age && Number.parseInt(user.age) < 13 && (
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-800">Parental Controls</h4>
                    <p className="text-gray-600 text-sm">Enhanced safety features for young learners</p>
                  </div>
                  <button
                    onClick={() => handleSettingChange("parentalControls", !settings.parentalControls)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.parentalControls ? "bg-green-600" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.parentalControls ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              )}

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">📊 Data Usage</h4>
                <p className="text-blue-700 text-sm mb-3">
                  We collect minimal data to improve your learning experience. Your progress is stored locally and can
                  be exported.
                </p>
                <Button
                  onClick={() => {
                    const data = {
                      user: user,
                      progress: JSON.parse(localStorage.getItem("codequest-progress") || "{}"),
                      settings: settings,
                    }
                    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
                    const url = URL.createObjectURL(blob)
                    const a = document.createElement("a")
                    a.href = url
                    a.download = "codequest-data.json"
                    a.click()
                  }}
                  variant="solid"
                  className="text-black text-sm border border-black mt-4 mb-4"                
                  >
                  📥 Export My Data
                </Button>
              </div>
            </div>
          </div>

          {/* Account Management */}
          <div className="bg-white rounded-2xl p-8 shadow-2xl">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="text-3xl mr-3">👤</span>
              Account Management
            </h3>

            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">Account Information</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>
                    <strong>Email:</strong> {user?.email}
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

              <div className="flex space-x-4">
                <Button onClick={handleSaveSettings} className="bg-green-600 hover:bg-green-700 text-white">
                  💾 Save Settings
                </Button>

                <Button onClick={onLogout} variant="outline" className="border-gray-300 text-gray-700">
                  🚪 Sign Out
                </Button>
              </div>

              {/* Danger Zone */}
              <div className="border-t border-gray-200 pt-6">
                <h4 className="font-semibold text-red-600 mb-4">⚠️ Danger Zone</h4>
                <div className="bg-red-50 p-4 rounded-lg">
                  <p className="text-red-700 text-sm mb-4">
                    Deleting your account will permanently remove all your progress, achievements, and data. This action
                    cannot be undone.
                  </p>
                  <Button onClick={() => setShowDeleteConfirm(true)} className="bg-red-600 hover:bg-red-700 text-white">
                    🗑️ Delete Account
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
              <div className="text-center">
                <div className="text-6xl mb-4">⚠️</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Delete Account?</h3>
                <p className="text-gray-600 mb-6">
                  This will permanently delete your account and all associated data. This action cannot be undone.
                </p>
                <div className="flex space-x-4">
                  <Button
                    onClick={() => setShowDeleteConfirm(false)}
                    variant="outline"
                    className="flex-1 border-gray-300 text-gray-700"
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleDeleteAccount} className="flex-1 bg-red-600 hover:bg-red-700 text-white">
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
