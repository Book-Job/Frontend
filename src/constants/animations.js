import confetti from 'canvas-confetti'

export const fireCelebrationConfetti = () => {
  confetti({
    particleCount: 250,
    origin: { x: 0.2, y: 0.7 },
    angle: 60,
    spread: 90,
    startVelocity: 45,
  })

  confetti({
    particleCount: 250,
    origin: { x: 0.8, y: 0.7 },
    angle: 120,
    spread: 90,
    startVelocity: 45,
  })
}
