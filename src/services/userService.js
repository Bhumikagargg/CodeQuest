// User service for handling authentication and user data
import { auth, googleProvider } from "../firebase"
import { signInWithPopup } from "firebase/auth"

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3001/api"

// Check if user exists in backend
export const checkUserExists = async (email) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/check`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })

    if (!response.ok) {
      throw new Error("Failed to check user")
    }

    const data = await response.json()
    return data.exists
  } catch (error) {
    console.error("Error checking user:", error)
    const existingUsers = JSON.parse(localStorage.getItem("codequest-users") || "[]")
    return existingUsers.some((user) => user.email === email)
  }
}

// Get user profile
export const getUserProfile = async (email) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/profile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })

    if (!response.ok) throw new Error("Failed to get user profile")
    return await response.json()
  } catch (error) {
    console.error("Error getting user profile:", error)
    const existingUsers = JSON.parse(localStorage.getItem("codequest-users") || "[]")
    return existingUsers.find((user) => user.email === email) || null
  }
}

// Create new user
export const createUser = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })

    if (!response.ok) throw new Error("Failed to create user")
    return await response.json()
  } catch (error) {
    console.error("Error creating user:", error)
    const existingUsers = JSON.parse(localStorage.getItem("codequest-users") || "[]")
    const newUser = {
      ...userData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      progress: {
        kids: { easy: [], medium: [], hard: [] },
        beginners: { easy: [], medium: [], hard: [] },
        totalXP: 0,
        badges: [],
      },
    }
    existingUsers.push(newUser)
    localStorage.setItem("codequest-users", JSON.stringify(existingUsers))
    return newUser
  }
}

// Update user profile
export const updateUserProfile = async (email, updates) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, ...updates }),
    })

    if (!response.ok) throw new Error("Failed to update user")
    return await response.json()
  } catch (error) {
    console.error("Error updating user:", error)
    const existingUsers = JSON.parse(localStorage.getItem("codequest-users") || "[]")
    const userIndex = existingUsers.findIndex((user) => user.email === email)
    if (userIndex !== -1) {
      existingUsers[userIndex] = { ...existingUsers[userIndex], ...updates }
      localStorage.setItem("codequest-users", JSON.stringify(existingUsers))
      return existingUsers[userIndex]
    }
    throw new Error("User not found")
  }
}

// ✅ Google OAuth with Firebase
export const authenticateWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider)
    const user = result.user

    return {
      email: user.email,
      name: user.displayName,
      provider: "google",
      avatar: user.photoURL,
      isNewUser: result._tokenResponse?.isNewUser || false,
    }
  } catch (error) {
    console.error("Google Sign-In failed:", error)
    throw error
  }
}

// Email authentication (simulated)
export const authenticateWithEmail = async (email, password, isSignUp) => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      if (isSignUp) {
        const userExists = await checkUserExists(email)
        if (userExists) {
          reject(new Error("User already exists with this email"))
          return
        }

        resolve({
          email,
          name: email.split("@")[0],
          provider: "email",
          avatar: email.charAt(0).toUpperCase(),
          isNewUser: true,
        })
      } else {
        const userExists = await checkUserExists(email)
        if (!userExists) {
          reject(new Error("No account found with this email"))
          return
        }

        const userProfile = await getUserProfile(email)
        if (!userProfile) {
          reject(new Error("Failed to retrieve user profile"))
          return
        }

        resolve({
          ...userProfile,
          isNewUser: false,
        })
      }
    }, 1500)
  })
}
