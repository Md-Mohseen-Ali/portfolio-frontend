import { motion, useMotionValue, useSpring } from "framer-motion"
import { useEffect } from "react"

function CustomCursor() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springX = useSpring(mouseX, { stiffness: 100, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 100, damping: 20 })

  useEffect(() => {
    const move = (e) => {
      mouseX.set(e.clientX - 16)
      mouseY.set(e.clientY - 16)
    }

    window.addEventListener("mousemove", move)
    return () => window.removeEventListener("mousemove", move)
  }, [])

  return (
    <motion.div
      style={{ x: springX, y: springY }}
      className="fixed top-0 left-0 w-8 h-8 bg-indigo-500/30 rounded-full pointer-events-none z-50 blur-md"
    />
  )
}

export default CustomCursor