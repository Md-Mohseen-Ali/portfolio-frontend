import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

function Skills() {
  const skillsRef = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {

      gsap.fromTo(
        ".skill-card",
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: skillsRef.current,
            start: "top 85%",
            toggleActions: "play reverse play reverse",
          },
        }
      )

    }, skillsRef)

    return () => ctx.revert()
  }, [])

  const skills = [
    "Java",
    "Spring Boot",
    "React",
    "MySQL",
    "REST API",
    "Git",
    "HTML",
    "CSS",
    "JavaScript",
  ]

  return (
    <section
      id="skills"
      ref={skillsRef}
      className="min-h-screen flex items-center px-6 relative overflow-hidden"

      
    >
      {/* 🔥 Background Glow */}
      <div className="absolute w-[500px] h-[500px] bg-purple-500/20 blur-3xl rounded-full top-20 right-10"></div>

      <div className="max-w-6xl mx-auto w-full relative z-10">

        {/* Heading */}
        <h2 className="text-5xl font-bold mb-12 text-center">
          My <span className="text-indigo-400">Skills</span>
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 perspective-[1000px]">
             
  {skills.map((skill, index) => (
  <div
  key={index}
  className="skill-card relative transform-gpu backdrop-blur-xl bg-white/10 border border-indigo-400/20 rounded-xl p-6 text-center text-lg font-medium shadow-lg overflow-hidden transition-all duration-300"

  onMouseMove={(e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = ((y - centerY) / centerY) * 12
    const rotateY = ((x - centerX) / centerX) * 12

    e.currentTarget.style.transform = `
      rotateX(${-rotateX}deg)
      rotateY(${rotateY}deg)
      scale(1.05)
    `

    // light movement
    const light = e.currentTarget.querySelector(".light")
    light.style.left = `${x}px`
    light.style.top = `${y}px`

    // shine
    const shine = e.currentTarget.querySelector(".shine")
    shine.style.opacity = 1

    // dynamic shadow
    e.currentTarget.style.boxShadow = `
      ${-rotateY}px ${rotateX}px 30px rgba(0,0,0,0.3)
    `
  }}

  onMouseLeave={(e) => {
    e.currentTarget.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)"
    e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.2)"

    const shine = e.currentTarget.querySelector(".shine")
    shine.style.opacity = 0
  }}
>
  {/* LIGHT */}
  <div className="light absolute w-40 h-40 bg-white/20 blur-2xl rounded-full pointer-events-none transform -translate-x-1/2 -translate-y-1/2"></div>

  {/* SHINE */}
  <div className="shine absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 pointer-events-none transition"></div>

  {/* CONTENT */}
  <span className="relative z-10">{skill}</span>
</div>
))}
        </div>
      </div>
    </section>
  )
}

export default Skills