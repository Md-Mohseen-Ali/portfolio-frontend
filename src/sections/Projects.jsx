import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

function Projects() {
  const projectRef = useRef()
  const [selectedProject, setSelectedProject] = useState(null)

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
      title: "E-Commerce Web Application ",
      desc: "Built a full-stack e-commerce platform with authentication, product management, cart system, and order processing.",
      tech: "Spring Boot, React, Oracle Database",
      details:
        "Includes login system, product listing, cart, order processing, and layered backend architecture.",
      highlight: true,
    },
    {
      title: "Employee Management System",
      desc: "Manage employee data with structured CRUD operations.",
      tech: "Spring Boot, React, Oracle Database",
      details: "Layered architecture with validation and REST API design.",
    },
    {
      title: "Library Management System",
      desc: "System to manage books and transactions efficiently.",
      tech: "Java, JDBC, Oracle Database",
      details:
        "Handles issue/return system with structured database handling.",
    },
  ]

  return (
    <section
      id="projects"
      ref={projectRef}
      className="min-h-screen flex items-center px-6 relative overflow-hidden"
    >
      {/* 🔥 Background Glow */}
      <div className="absolute w-[500px] h-[500px] bg-indigo-500/20 blur-3xl rounded-full top-20 left-10"></div>

      <div className="max-w-6xl mx-auto w-full relative z-10">

        {/* 🔥 Heading */}
        <h2 className="text-5xl font-bold mb-12 text-center">
          My <span className="text-indigo-400">Projects</span>
        </h2>

        {/* 🔥 Grid */}
        <div className="grid md:grid-cols-2 gap-8 items-stretch">

          {projects.map((proj, index) => (
            <div
              key={index}
              onClick={() => setSelectedProject(proj)}
              className={`project-card cursor-pointer h-full flex flex-col relative group backdrop-blur-xl border rounded-2xl p-6 shadow-lg overflow-hidden transition-all duration-500
              ${proj.highlight 
                ? "bg-indigo-500/10 border-indigo-400/40 scale-105 shadow-[0_0_50px_rgba(99,102,241,0.5)]" 
                : "bg-white/10 border-indigo-400/20 hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(99,102,241,0.3)]"
              }`}
            >

              {/* Top Gradient */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-400 to-purple-500"></div>

              {/* Featured Badge */}
              {proj.highlight && (
                <span className="absolute top-4 right-4 text-xs px-3 py-1 bg-indigo-500/20 border border-indigo-400/40 rounded-full">
                  Featured
                </span>
              )}

              <div className="flex flex-col h-full">

                {/* Content */}
                <div className="flex-grow">

                  <h3 className="text-2xl font-semibold mb-3 group-hover:text-indigo-300 transition">
                    {proj.title}
                  </h3>

                  <p className="text-gray-400 mb-4 leading-relaxed">
                    {proj.desc}
                  </p>

                  <p className="text-sm text-indigo-300 mb-2 font-medium">
                    {proj.tech}
                  </p>

                </div>

                {/* Divider */}
                <div className="w-full h-[1px] bg-white/10 my-4"></div>

                {/* Buttons */}
                <div className="mt-auto flex gap-4">
                  <button className="px-4 py-2 bg-indigo-500 rounded-lg">
                    View
                  </button>
                </div>

              </div>
            </div>
          ))}

        </div>
      </div>

      {/* 🔥 MODAL */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

          <div className="bg-[#0f172a] border border-indigo-400/30 rounded-2xl p-8 max-w-lg w-full relative">

            {/* Close */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              ✕
            </button>

            {/* Title */}
            <h2 className="text-3xl font-bold mb-4">
              {selectedProject.title}
            </h2>

            {/* Desc */}
            <p className="text-gray-400 mb-4">
              {selectedProject.desc}
            </p>

            {/* Tech */}
            <p className="text-indigo-300 mb-4">
              {selectedProject.tech}
            </p>

            {/* Details */}
            <p className="text-gray-500 mb-6">
              {selectedProject.details}
            </p>

            {/* Buttons */}
            <div className="flex gap-4">
              <a className="px-4 py-2 bg-indigo-500 rounded-lg">
                Live
              </a>
              <a className="px-4 py-2 border border-indigo-400 rounded-lg">
                GitHub
              </a>
            </div>

          </div>
        </div>
      )}

    </section>
  )
}

export default Projects