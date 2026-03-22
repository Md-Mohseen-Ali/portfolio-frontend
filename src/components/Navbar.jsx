import { useState, useEffect } from "react"
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

  // 🔥 SCROLL ACTIVE SECTION DETECTION
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
      <nav className="fixed top-0 left-0 w-full bg-[#0f172a]/80 backdrop-blur-md z-50 shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">

          {/* Logo */}
          <h1 className="text-xl font-bold">Md Mohseen Ali</h1>

          {/* Nav Links */}
          <ul className="hidden md:flex gap-6">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`cursor-pointer transition ${
                    active === item.id
                      ? "text-indigo-400"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>

          {/* 🔥 Resume Button (MODAL) */}
          <button
  onClick={() => {
    console.log("clicked")
    setOpenResume(true)
  }}
  className="px-4 py-2 bg-indigo-500 rounded-lg hover:bg-indigo-600 transition"
>
  Resume
</button>
        </div>
      </nav>

      {/* 🔥 RESUME MODAL */}
      <ResumeModal
        isOpen={openResume}
        onClose={() => setOpenResume(false)}
      />
    </>
  )
}

export default Navbar