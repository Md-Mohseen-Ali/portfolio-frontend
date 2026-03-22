import { useState } from "react"

function Navbar() {
  const [active, setActive] = useState("home")

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

  return (
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
                onClick={() => setActive(item.id)}
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

        {/* Resume Button */}
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:block px-4 py-2 bg-indigo-500 rounded-lg hover:bg-indigo-600 transition"
        >
          Resume
        </a>
      </div>
    </nav>
  )
}

export default Navbar