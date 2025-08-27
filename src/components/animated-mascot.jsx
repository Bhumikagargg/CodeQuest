"use client"

import { motion } from "framer-motion"

export function AnimatedMascot() {
  return (
    <motion.div
      className="relative"
      animate={{
        y: [0, -10, 0],
        rotate: [0, 5, -5, 0],
      }}
      transition={{
        duration: 3,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
    >
      <motion.div
        className="w-32 h-32 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center shadow-2xl"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          className="w-20 h-20 bg-white rounded-full flex items-center justify-center"
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
          }}
        >
          {/* Robot Face */}
          <div className="relative">
            {/* Eyes */}
            <motion.div
              className="flex space-x-2 mb-2"
              animate={{
                scaleY: [1, 0.1, 1],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: 2,
              }}
            >
              <div className="w-3 h-3 bg-gray-800 rounded-full"></div>
              <div className="w-3 h-3 bg-gray-800 rounded-full"></div>
            </motion.div>
            {/* Mouth */}
            <motion.div
              className="w-6 h-3 border-2 border-gray-800 rounded-b-full"
              animate={{
                scaleX: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
              }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Floating particles around mascot */}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-yellow-400 rounded-full"
          style={{
            top: `${20 + Math.sin(i) * 30}%`,
            left: `${20 + Math.cos(i) * 30}%`,
          }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            delay: i * 0.3,
            repeat: Number.POSITIVE_INFINITY,
          }}
        />
      ))}
    </motion.div>
  )
}
