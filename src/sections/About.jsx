import { motion, useMotionValue, useTransform } from "framer-motion"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// 🔥 Register GSAP plugin
gsap.registerPlugin(ScrollTrigger)

function About() {
  const aboutRef = useRef()

  // 🔥 GSAP Animation
  useEffect(() => {
  const ctx = gsap.context(() => {

    gsap.fromTo(
      ".about-item",
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: aboutRef.current, 
          start: "top 85%",          
          toggleActions: "play reverse play reverse",
        },
      }
    )

  }, aboutRef)

  return () => ctx.revert()
}, [])
  // 🔥 3D Tilt Setup
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useTransform(mouseY, [-100, 100], [10, -10])
  const rotateY = useTransform(mouseX, [-100, 100], [-10, 10])

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    mouseX.set(x)
    mouseY.set(y)
  }

  function handleMouseLeave() {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <section
      id="about"
      ref={aboutRef}
      className="min-h-screen flex items-center px-6 relative overflow-hidden"
    >
      {/* 🔥 Animated Background Glow */}
      <motion.div
        animate={{
          x: [0, 100, -100, 0],
          y: [0, -50, 50, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute w-[500px] h-[500px] bg-indigo-500/20 blur-3xl rounded-full"
      />

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">

        {/* 🔵 LEFT TEXT */}
        <div>
          <h2 className="about-item text-5xl font-bold mb-6">
            About <span className="text-indigo-400">Me</span>
          </h2>

          <p className="about-item text-gray-300 mb-4">
            I'm a Full Stack Java Developer focused on building scalable systems 
            and immersive user experiences.
          </p>

          <p className="about-item text-gray-400 mb-4">
            I specialize in Spring Boot and React, designing applications that 
            feel smooth, responsive, and production-ready.
          </p>

          <p className="about-item text-gray-500">
            I don’t just build apps — I craft experiences.
          </p>
        </div>

        {/* 🔴 RIGHT INTERACTIVE CARD */}
        <motion.div
          className="about-item backdrop-blur-xl bg-white/10 border border-indigo-400/20 rounded-2xl p-6 shadow-2xl shadow-[0_0_30px_rgba(99,102,241,0.2)] transition"
          style={{
            rotateX,
            rotateY,
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <h3 className="text-xl font-semibold mb-4 text-indigo-300">
            Tech Stack
          </h3>

          <div className="flex flex-wrap gap-3">
            {[
              "Java",
              "Spring Boot",
              "React",
              "MySQL",
              "REST API",
              "Git",
            ].map((skill, index) => (
              <motion.span
                key={index}
                whileHover={{ scale: 1.15 }}
                className="px-4 py-2 rounded-lg bg-indigo-500/20 border border-indigo-400/40 text-sm text-white hover:bg-indigo-500/30 transition"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}

export default About