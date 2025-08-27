import { Code, Star, Sparkles, Zap, Trophy, Rocket } from "./icons"

export function FloatingIcons() {
  const icons = [
    { Icon: Code, delay: 0, position: { top: "20%", left: "10%" } },
    { Icon: Star, delay: 0.5, position: { top: "30%", right: "15%" } },
    { Icon: Sparkles, delay: 1, position: { top: "60%", left: "5%" } },
    { Icon: Zap, delay: 1.5, position: { top: "70%", right: "10%" } },
    { Icon: Trophy, delay: 2, position: { top: "40%", left: "85%" } },
    { Icon: Rocket, delay: 2.5, position: { top: "80%", left: "80%" } },
  ]

  return (
    <div className="fixed inset-0 pointer-events-none">
      {icons.map(({ Icon, delay, position }, index) => (
        <div
          key={index}
          className="absolute text-white opacity-20 animate-float-rotate"
          style={{
            ...position,
            animationDelay: `${delay}s`,
          }}
        >
          <Icon size={32} />
        </div>
      ))}
    </div>
  )
}
