import { motion } from "framer-motion"
import { useEffect, useState } from "react"

function Welcome({ onEnter }) {
  const [progress, setProgress] = useState(0)
  const [ready, setReady] = useState(false)

  // 🔥 Loading Animation
  useEffect(() => {
    let count = 0

    const interval = setInterval(() => {
      count += Math.floor(Math.random() * 10) + 5
      if (count >= 100) {
        count = 100
        clearInterval(interval)
        setReady(true)
      }
      setProgress(count)
    }, 120)

    return () => clearInterval(interval)
  }, [])

  // 🔥 Enter Key Support
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Enter" && ready) {
        onEnter()
      }
    }

    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [ready])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-[#020617] flex flex-col items-center justify-center z-[999] overflow-hidden"
    >
      {/* 🔥 Background Glow */}
      <div className="absolute w-[600px] h-[600px] bg-indigo-500/20 blur-3xl rounded-full"></div>

      {/* 🔥 Title */}
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-4xl md:text-5xl font-bold mb-8 z-10"
      >
        Initializing...
      </motion.h1>

      {/* 🔥 Progress Bar */}
      <div className="w-64 h-2 bg-white/10 rounded-full overflow-hidden mb-4 z-10">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          className="h-full bg-indigo-500"
        />
      </div>

      {/* 🔥 Percentage */}
      <p className="text-gray-400 mb-6 z-10">
        {progress}%
      </p>

      {/* 🔥 Ready State */}
      {ready && (
        <>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-gray-300 mb-6 z-10"
          >
            Press Enter or Click to Continue
          </motion.p>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onEnter}
            className="px-6 py-3 bg-indigo-500 rounded-lg hover:bg-indigo-600 transition z-10"
          >
            Enter
          </motion.button>
        </>
      )}
    </motion.div>
  )
}

export default Welcome