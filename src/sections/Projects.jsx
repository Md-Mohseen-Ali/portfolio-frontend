import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

function Projects() {
  const projectRef = useRef()
  const [selectedProject, setSelectedProject] = useState(null)
  const [showComingSoon, setShowComingSoon] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".project-card",
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: projectRef.current,
            start: "top 85%",
            toggleActions: "play reverse play reverse",
          },
        }
      )
    }, projectRef)

    return () => ctx.revert()
  }, [])

  const projects = [
    {
      title: "E-Commerce Web Application",
      desc: "Built a full-stack e-commerce platform with authentication, product management, cart system, and order processing.",
      tech: "Spring Boot, React, Oracle Database",
      details:
        "Includes login system, product listing, cart, order processing, and layered backend architecture.",
      github: "https://github.com/Md-Mohseen-Ali/E-Commerce-Project", // 🔥 PUT YOUR LINK
      highlight: true,
    },
    {
      title: "Employee Management System",
      desc: "Manage employee data with structured CRUD operations.",
      tech: "Spring Boot, React, Oracle Database",
      details: "Layered architecture with validation and REST API design.",
      github: "https://github.com/Md-Mohseen-Ali/Employee-Management-System-",
    },
    {
      title: "Library Management System",
      desc: "System to manage books and transactions efficiently.",
      tech: "Java, JDBC, Oracle Database",
      details:
        "Handles issue/return system with structured database handling.",
      github: "https://github.com/Md-Mohseen-Ali/Library-management-system",
    },
  ]

  return (
    <section
      id="projects"
      ref={projectRef}
      className="min-h-screen flex items-center px-6 relative overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute w-[500px] h-[500px] bg-indigo-500/20 blur-3xl rounded-full top-20 left-10"></div>

      <div className="max-w-6xl mx-auto w-full relative z-10">
        <h2 className="text-5xl font-bold mb-12 text-center">
          My <span className="text-indigo-400">Projects</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          {projects.map((proj, index) => (
            <div
              key={index}
              onClick={() => setSelectedProject(proj)}
              className={`project-card cursor-pointer h-full flex flex-col relative group backdrop-blur-xl border rounded-2xl p-6 shadow-lg overflow-hidden transition-all duration-500
              ${
                proj.highlight
                  ? "bg-indigo-500/10 border-indigo-400/40 scale-105 shadow-[0_0_50px_rgba(99,102,241,0.5)]"
                  : "bg-white/10 border-indigo-400/20 hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(99,102,241,0.3)]"
              }`}
            >
              <div className="flex flex-col h-full">
                <div className="flex-grow">
                  <h3 className="text-2xl font-semibold mb-3 group-hover:text-indigo-300 transition">
                    {proj.title}
                  </h3>

                  <p className="text-gray-400 mb-4">{proj.desc}</p>

                  <p className="text-sm text-indigo-300 mb-2">
                    {proj.tech}
                  </p>
                </div>

                <div className="mt-auto">
                  <button className="px-4 py-2 bg-indigo-500 rounded-lg">
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PROJECT MODAL */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#0f172a] border border-indigo-400/30 rounded-2xl p-8 max-w-lg w-full relative">

            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4"
            >
              ✕
            </button>

            <h2 className="text-3xl font-bold mb-4">
              {selectedProject.title}
            </h2>

            <p className="text-gray-400 mb-4">
              {selectedProject.desc}
            </p>

            <p className="text-indigo-300 mb-4">
              {selectedProject.tech}
            </p>

            <p className="text-gray-500 mb-6">
              {selectedProject.details}
            </p>

            {/* 🔥 BUTTONS */}
            <div className="flex gap-4">

              {/* LIVE BUTTON → COMING SOON */}
              <button
                onClick={() => setShowComingSoon(true)}
                className="px-4 py-2 bg-indigo-500 rounded-lg"
              >
                Live 🚀
              </button>

              {/* GITHUB BUTTON */}
              <a
                href={selectedProject.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 border border-indigo-400 rounded-lg"
              >
                GitHub 💻
              </a>

            </div>
          </div>
        </div>
      )}

      {/* 🔥 COMING SOON MODAL */}
      {showComingSoon && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#0f172a] p-8 rounded-2xl text-center">

            <h2 className="text-2xl font-bold mb-4">
              Coming Soon 🚀
            </h2>

            <p className="text-gray-400 mb-6">
              Live demo will be available soon.
            </p>

            <button
              onClick={() => setShowComingSoon(false)}
              className="px-4 py-2 bg-indigo-500 rounded-lg"
            >
              Close
            </button>

          </div>
        </div>
      )}
    </section>
  )
}

export default Projects