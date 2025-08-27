"use client"

import { motion } from "framer-motion"

export function JumpingAnimals() {
  const animals = [
    { emoji: "🐸", name: "frog", delay: 0 },
    { emoji: "🐰", name: "rabbit", delay: 0.5 },
    { emoji: "🦘", name: "kangaroo", delay: 1 },
    { emoji: "🐱", name: "cat", delay: 1.5 },
  ]

  return (
    <div className="absolute bottom-10 left-0 right-0 flex justify-center space-x-8">
      {animals.map((animal, index) => (
        <motion.div
          key={animal.name}
          className="text-4xl cursor-pointer"
          animate={{
            y: [0, -30, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 1.5,
            delay: animal.delay,
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: 2,
            ease: "easeOut",
          }}
          whileHover={{
            scale: 1.2,
            y: -40,
          }}
          whileTap={{
            scale: 0.9,
          }}
        >
          {animal.emoji}
        </motion.div>
      ))}
    </div>
  )
}
