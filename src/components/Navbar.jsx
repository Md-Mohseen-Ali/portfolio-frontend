import { useState, useEffect } from "react"
import { motion, useMotionValue, useTransform } from "framer-motion"
import ResumeModal from "../components/ResumeModal"

function Navbar() {
  const [active, setActive] = useState("home")
  const [openResume, setOpenResume] = useState(false)
  const [scrolled, setScrolled] = useState(false)

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
      setScrolled(window.scrollY > 50)

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

  // 🔥 CURSOR GLOW
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const glowX = useTransform(mouseX, (v) => v - 120)
  const glowY = useTransform(mouseY, (v) => v - 120)

  const handleMouseMove = (e) => {
    mouseX.set(e.clientX)
    mouseY.set(e.clientY)
  }

  return (
    <>
      <motion.nav
        onMouseMove={handleMouseMove}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#0f172a]/80 backdrop-blur-xl py-2 border-b border-indigo-400/10"
            : "bg-transparent py-4"
        }`}
      >
        {/* 🔥 SOFT CURSOR GLOW */}
        <motion.div
          style={{ left: glowX, top: glowY }}
          className="fixed w-[250px] h-[250px] bg-indigo-500/10 blur-3xl rounded-full pointer-events-none z-0"
        />

        <div className="max-w-6xl mx-auto flex justify-between items-center px-6 relative z-10">

          {/* 🔥 LOGO WITH GRADIENT */}
          <motion.h1
            whileHover={{ scale: 1.08 }}
            className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent cursor-pointer"
          >
            Mohseen.dev
          </motion.h1>

          {/* 🔥 NAV LINKS */}
          <ul className="hidden md:flex gap-6 bg-white/5 backdrop-blur-lg px-4 py-2 rounded-full border border-white/10">

            {navItems.map((item) => (
              <li key={item.id} className="relative">

                <a
                  href={`#${item.id}`}
                  className="relative px-3 py-1 text-sm"
                >
                  {active === item.id && (
                    <motion.span
                      layoutId="pill"
                      className="absolute inset-0 bg-indigo-500/20 rounded-full"
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    />
                  )}

                  <span
                    className={`relative z-10 ${
                      active === item.id
                        ? "text-indigo-300"
                        : "text-gray-300 hover:text-white"
                    }`}
                  >
                    {item.name}
                  </span>
                </a>

              </li>
            ))}

          </ul>

          {/* 🔥 MAGNETIC + RIPPLE BUTTON */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect()
              const x = e.clientX - rect.left - rect.width / 2
              const y = e.clientY - rect.top - rect.height / 2
              e.currentTarget.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translate(0,0)"
            }}
            onClick={() => setOpenResume(true)}
            className="relative overflow-hidden px-5 py-2 rounded-lg bg-indigo-500 text-white shadow-lg shadow-indigo-500/30"
          >
            Resume

            {/* 🔥 ripple effect */}
            <span className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition"></span>
          </motion.button>

        </div>
      </motion.nav>

      {/* 🔥 MODAL */}
      <ResumeModal
        isOpen={openResume}
        onClose={() => setOpenResume(false)}
      />
    </>
  )
}

export default Navbar