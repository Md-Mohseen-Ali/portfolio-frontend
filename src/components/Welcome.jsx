import { motion } from "framer-motion"
import { useEffect, useState } from "react"

function Welcome({ onEnter }) {
  const [text, setText] = useState("")
  const fullText = "Initializing Portfolio..."

  // 🔥 Typing Effect
  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      setText(fullText.slice(0, i))
      i++
      if (i > fullText.length) clearInterval(interval)
    }, 50)

    return () => clearInterval(interval)
  }, [])

  // 🔥 Enter key support
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Enter") {
        onEnter()
      }
    }

    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-[#020617] flex flex-col items-center justify-center z-[999] overflow-hidden"
    >
      {/* 🔥 Glow Background */}
      <div className="absolute w-[600px] h-[600px] bg-indigo-500/20 blur-3xl rounded-full"></div>

      {/* 🔥 Typing Text */}
      <h1 className="text-3xl md:text-4xl font-mono text-indigo-400 mb-6 z-10">
        {text}
        <span className="animate-pulse">|</span>
      </h1>

      {/* 🔥 Main Title */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="text-5xl md:text-6xl font-bold mb-6 z-10"
      >
        Welcome, Ayan
      </motion.h2>

      {/* 🔥 Instruction */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="text-gray-400 mb-10 z-10"
      >
        Press Enter or Click to Continue
      </motion.p>

      {/* 🔥 ENTER BUTTON */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onEnter}
        className="px-6 py-3 bg-indigo-500 rounded-lg hover:bg-indigo-600 transition z-10"
      >
        Enter
      </motion.button>
    </motion.div>
  )
}

export default Welcome