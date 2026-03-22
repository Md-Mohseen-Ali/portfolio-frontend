import { motion } from "framer-motion"
import { createPortal } from "react-dom"
import { useEffect, useState } from "react"

function ResumeModal({ isOpen, onClose }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
  if (isOpen) {
    document.body.style.overflow = "hidden"
  } else {
    document.body.style.overflow = "auto"
  }

  return () => {
    document.body.style.overflow = "auto"
  }
}, [isOpen])

  if (!mounted || !isOpen) return null

  return createPortal(
    <div
      onClick={onClose}
      className="fixed inset-0 z-[99999] bg-black/90 flex items-center justify-center"
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="relative w-[90%] max-w-5xl h-[85vh] bg-[#0f172a] rounded-xl overflow-hidden shadow-2xl"
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-2xl z-50"
        >
          ✕
        </button>

        {/* PDF */}
        <iframe
          src="/resume.pdf"
          title="Resume"
          className="w-full h-full"
        />
      </motion.div>
    </div>,
    document.body
  )
}

export default ResumeModal