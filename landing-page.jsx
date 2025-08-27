"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { FloatingBubbles } from "./components/floating-bubbles"
import { AnimatedMascot } from "./components/animated-mascot"
import { JumpingAnimals } from "./components/jumping-animals"
import { LearningPathCard } from "./components/learning-path-card"
import { FloatingIcons } from "./components/floating-icons"
import { Sparkles, Users, Trophy, Crown, Code } from "lucide-react"

export default function LandingPage() {
  const [showAuthModal, setShowAuthModal] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      <FloatingBubbles />
      <FloatingIcons />

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-20 flex justify-between items-center p-6"
      >
        <motion.div className="flex items-center space-x-3" whileHover={{ scale: 1.05 }}>
          <motion.div
            className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <Code className="text-white" size={20} />
          </motion.div>
          <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            CodeQuest
          </span>
        </motion.div>

        <nav className="hidden md:flex space-x-6">
          {[
            { name: "🏠 Home", href: "#" },
            { name: "📊 Levels", href: "#" },
            { name: "🎮 Games", href: "#" },
            { name: "🏆 Challenge", href: "#" },
            { name: "👤 Profile", href: "#" },
          ].map((item, i) => (
            <motion.a
              key={item.name}
              href={item.href}
              className="text-white/80 hover:text-white transition-colors"
              whileHover={{ scale: 1.1 }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              {item.name}
            </motion.a>
          ))}
        </nav>
      </motion.header>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">
        {/* Mascot */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <AnimatedMascot />
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mb-8"
        >
          <motion.h1
            className="text-6xl md:text-8xl font-bold mb-4"
            animate={{
              backgroundPosition: ["0%", "100%"],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
            style={{
              background: "linear-gradient(45deg, #06b6d4, #8b5cf6, #ec4899, #06b6d4)",
              backgroundSize: "300% 300%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            CodeQuest
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-white/90 mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Embark on an Epic Coding Adventure
          </motion.p>

          <motion.p
            className="text-lg text-white/70 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Choose your path and master programming through interactive games and challenges
          </motion.p>
        </motion.div>

        {/* Learning Path Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl w-full mb-12">
          <LearningPathCard
            title="Kids Zone"
            subtitle="Ages 6-12 • Visual & Fun Learning"
            description="Start your coding journey with colorful blocks, friendly characters, and exciting adventures!"
            icon="😊"
            gradient="bg-gradient-to-br from-pink-500 to-rose-400"
            delay={0.2}
          />

          <LearningPathCard
            title="Beginner Path"
            subtitle="Teens & Adults • Real Programming"
            description="Learn actual coding languages with hands-on projects and real-world applications!"
            icon="🚀"
            gradient="bg-gradient-to-br from-emerald-500 to-teal-400"
            delay={0.4}
          />
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="flex flex-col sm:flex-row gap-4 mb-16"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 text-lg rounded-full shadow-2xl"
              onClick={() => setShowAuthModal(true)}
            >
              <Crown className="mr-2 h-5 w-5" />🔐 Login / Sign Up
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg rounded-full backdrop-blur-sm"
            >
              <Users className="mr-2 h-5 w-5" />🎮 Guest Mode
            </Button>
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="flex flex-wrap justify-center gap-8 text-center text-white/80"
        >
          {[
            { icon: Users, label: "Students", value: "10K+", emoji: "👥" },
            { icon: Trophy, label: "Challenges", value: "500+", emoji: "🏆" },
            { icon: Sparkles, label: "Success Rate", value: "95%", emoji: "⭐" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              className="flex flex-col items-center p-4 rounded-lg bg-white/5 backdrop-blur-sm"
              whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.1)" }}
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                duration: 2,
                delay: i * 0.3,
                repeat: Number.POSITIVE_INFINITY,
              }}
            >
              <div className="text-3xl mb-2">{stat.emoji}</div>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Jumping Animals */}
      <JumpingAnimals />

      {/* Decorative Elements */}
      <motion.div
        className="absolute top-20 left-10 text-4xl"
        animate={{ scale: [1, 1.2, 1], rotate: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      >
        ⭐
      </motion.div>
      <motion.div
        className="absolute top-40 right-20 text-3xl"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
      >
        🌟
      </motion.div>
      <motion.div
        className="absolute bottom-40 left-20 text-5xl"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
      >
        💫
      </motion.div>

      {/* Auth Modal */}
      <AnimatePresence>
        {showAuthModal && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowAuthModal(false)}
          >
            <motion.div
              className="bg-white rounded-2xl p-8 max-w-md w-full"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <motion.div
                  className="text-4xl mb-4"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  🚀
                </motion.div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Join CodeQuest!</h2>
                <p className="text-gray-600">Start your coding adventure today</p>
              </div>

              <div className="space-y-4">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg">
                  Continue with Google
                </Button>
                <Button className="w-full bg-gray-800 hover:bg-gray-900 text-white py-3 rounded-lg">
                  Continue with Email
                </Button>
                <Button variant="outline" className="w-full py-3 rounded-lg" onClick={() => setShowAuthModal(false)}>
                  Maybe Later
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
