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

  const glowX = useTransform(mouseX, (v) => v - 150)
  const glowY = useTransform(mouseY, (v) => v - 150)

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
            ? "bg-[#0f172a]/80 backdrop-blur-xl shadow-lg py-2"
            : "bg-transparent py-4"
        }`}
      >
        {/* 🔥 CURSOR SPOTLIGHT */}
        <motion.div
          style={{ left: glowX, top: glowY }}
          className="fixed w-[300px] h-[300px] bg-indigo-500/10 blur-3xl rounded-full pointer-events-none z-0"
        />

        <div className="max-w-6xl mx-auto flex justify-between items-center px-6 relative z-10">

          {/* LOGO */}
          <motion.h1
            whileHover={{ scale: 1.08 }}
            className="text-xl font-bold tracking-wide cursor-pointer"
          >
            Mohseen
          </motion.h1>

          {/* NAV LINKS */}
          <ul className="hidden md:flex gap-8 relative">

            {navItems.map((item) => (
              <li key={item.id} className="relative group">

                <motion.a
                  href={`#${item.id}`}
                  whileHover={{ scale: 1.1 }}
                  className={`transition duration-300 ${
                    active === item.id
                      ? "text-indigo-400"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  {item.name}
                </motion.a>

                {/* 🔥 ACTIVE UNDERLINE */}
                {active === item.id && (
                  <motion.div
                    layoutId="underline"
                    className="absolute left-0 -bottom-1 h-[2px] w-full bg-indigo-400 rounded"
                  />
                )}

                {/* 🔥 HOVER EFFECT */}
                <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-white transition-all duration-300 group-hover:w-full"></span>

              </li>
            ))}

          </ul>

          {/* 🔥 MAGNETIC BUTTON */}
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
            className="px-5 py-2 bg-indigo-500 rounded-lg hover:bg-indigo-600 transition shadow-lg shadow-indigo-500/20"
          >
            Resume
          </motion.button>

        </div>
      </motion.nav>

      {/* MODAL */}
      <ResumeModal
        isOpen={openResume}
        onClose={() => setOpenResume(false)}
      />
    </>
  )
}

export default Navbar