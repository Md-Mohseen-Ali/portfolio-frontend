import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import ResumeModal from "../components/ResumeModal"

function Navbar() {
  const [active, setActive] = useState("home")
  const [openResume, setOpenResume] = useState(false)

  const navItems = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Skills", id: "skills" },
    { name: "Projects", id: "projects" },
    { name: "Training", id: "training" },
    { name: "Certifications", id: "certifications" },
    { name: "Achievements", id: "achievements" },
    { name: "Contact", id: "contact" },
  ]

  // 🔥 SCROLL DETECTION
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) =>
        document.getElementById(item.id)
      )

      const scrollY = window.scrollY

      sections.forEach((section, index) => {
        if (!section) return

        const offsetTop = section.offsetTop - 120
        const height = section.offsetHeight

        if (scrollY >= offsetTop && scrollY < offsetTop + height) {
          setActive(navItems[index].id)
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {/* 🔥 NAVBAR */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 w-full bg-[#0f172a]/70 backdrop-blur-lg z-50 border-b border-indigo-400/10"
      >
        {/* 🔥 SOFT GLOW */}
        <div className="absolute inset-0 -z-10 bg-indigo-500/5 blur-2xl"></div>

        <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">

          {/* LOGO */}
          <motion.h1
            whileHover={{ scale: 1.05 }}
            className="text-xl font-bold tracking-wide"
          >
            Ayan.dev
          </motion.h1>

          {/* NAV LINKS */}
          <ul className="hidden md:flex gap-8 relative">

            {navItems.map((item) => (
              <li key={item.id} className="relative group">

                <a
                  href={`#${item.id}`}
                  className={`transition duration-300 ${
                    active === item.id
                      ? "text-indigo-400"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  {item.name}
                </a>

                {/* 🔥 ANIMATED UNDERLINE */}
                {active === item.id && (
                  <motion.div
                    layoutId="underline"
                    className="absolute left-0 -bottom-1 h-[2px] w-full bg-indigo-400 rounded"
                  />
                )}

                {/* 🔥 HOVER LINE */}
                <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-white transition-all duration-300 group-hover:w-full"></span>

              </li>
            ))}

          </ul>

          {/* 🔥 RESUME BUTTON */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setOpenResume(true)}
            className="px-5 py-2 bg-indigo-500 rounded-lg hover:bg-indigo-600 transition shadow-lg shadow-indigo-500/20"
          >
            Resume
          </motion.button>

        </div>
      </motion.nav>

      {/* 🔥 RESUME MODAL */}
      <ResumeModal
        isOpen={openResume}
        onClose={() => setOpenResume(false)}
      />
    </>
  )
}

export default Navbar