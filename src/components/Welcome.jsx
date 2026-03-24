import { motion } from "framer-motion"

function Welcome({ onEnter }) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-[#020617] flex flex-col items-center justify-center z-[999]"
    >
      {/* 🔥 Glow Background */}
      <div className="absolute w-[500px] h-[500px] bg-indigo-500/20 blur-3xl rounded-full"></div>

      {/* 🔥 Text */}
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl md:text-6xl font-bold mb-6 z-10"
      >
        Welcome
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-gray-400 mb-10 z-10"
      >
        Experience my portfolio
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
 