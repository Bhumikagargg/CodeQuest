"use client"

import { motion } from "framer-motion"

export function LearningPathCard({ title, subtitle, description, icon, gradient, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{
        scale: 1.05,
        y: -10,
      }}
      whileTap={{ scale: 0.98 }}
      className={`relative p-8 rounded-3xl ${gradient} text-white shadow-2xl overflow-hidden cursor-pointer`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-4 right-4 text-6xl">{icon}</div>
        <div className="absolute bottom-4 left-4 text-2xl opacity-50">{"🌟".repeat(3)}</div>
      </div>

      <div className="relative z-10">
        <motion.div
          className="text-5xl mb-4"
          animate={{
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: 3,
          }}
        >
          {icon}
        </motion.div>

        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p className="text-lg opacity-90 mb-4">{subtitle}</p>
        <p className="text-sm opacity-75 mb-6">{description}</p>

        <div className="flex space-x-2">
          {["🎮", "🏆", "⭐"].map((emoji, i) => (
            <motion.span
              key={i}
              className="text-xl"
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1,
                delay: i * 0.2,
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: 2,
              }}
            >
              {emoji}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Hover effect overlay */}
      <motion.div
        className="absolute inset-0 bg-white/10 opacity-0"
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  )
}
