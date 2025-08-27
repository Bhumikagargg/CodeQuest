export function FloatingBubbles() {
  const bubbles = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    size: Math.random() * 60 + 20,
    delay: Math.random() * 2,
    duration: Math.random() * 3 + 4,
    x: Math.random() * 100,
  }))

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="absolute rounded-full bg-gradient-to-br from-cyan-300 to-blue-400 opacity-30 backdrop-blur-sm animate-float"
          style={{
            width: bubble.size,
            height: bubble.size,
            left: `${bubble.x}%`,
            animationDelay: `${bubble.delay}s`,
            animationDuration: `${bubble.duration}s`,
          }}
        />
      ))}
    </div>
  )
}
