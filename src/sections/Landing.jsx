import { motion, useMotionValue, useTransform } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import ResumeModal from "../components/ResumeModal"

gsap.registerPlugin(ScrollTrigger)

function Landing() {
  const [openResume, setOpenResume] = useState(false)
  const heroRef = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {

      gsap.from(".hero-title", {
        y: 100,
        opacity: 0,
        duration: 1,
      })

      gsap.from(".hero-subtitle", {
        y: 50,
        opacity: 0,
        delay: 0.3,
      })

      gsap.to(".hero-content", {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "+=500",
          scrub: true,
          pin: false,
        },
        y: -150,
        opacity: 0,
      })

      gsap.from(".reveal", {
        y: 100,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
      })

    }, heroRef)

    return () => ctx.revert()
  }, [])

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const glowX = useTransform(mouseX, [-300, 300], [-100, 100])
  const glowY = useTransform(mouseY, [-300, 300], [-100, 100])

  function handleMouseMove(e) {
    const { clientX, clientY } = e
    mouseX.set(clientX - window.innerWidth / 2)
    mouseY.set(clientY - window.innerHeight / 2)
  }

  return (
    <>
      <section
        ref={heroRef}
        id="home"
        onMouseMove={handleMouseMove}
        className="h-screen flex items-center justify-center px-6 relative overflow-hidden"
      >
        {/* Glow */}
        <motion.div
          style={{ x: glowX, y: glowY }}
          className="absolute w-[600px] h-[600px] bg-indigo-500/20 blur-3xl rounded-full"
        />

        {/* Floating Background */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute w-[400px] h-[400px] bg-purple-500/10 blur-2xl rounded-full top-20 left-20"
        />

        <div className="text-center relative z-10 max-w-2xl">

          {/* Name */}
          <h1 className="hero-title text-6xl font-bold">
            {"Hi, I'm Mohseen".split(" ").map((word, i) => (
              <span key={i} className="inline-block mr-2 overflow-hidden">
                <span className="inline-block reveal">{word}</span>
              </span>
            ))}
          </h1>

          {/* Role */}
          <motion.h2
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="text-xl md:text-2xl text-gray-300 mt-4"
          >
           Java Developer Enthusiast
          </motion.h2>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-gray-400 mt-6"
          >
            I craft scalable backend systems and immersive frontend experiences.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="mt-8 flex flex-wrap justify-center gap-4"
          >

            {/* Projects */}
            <motion.a
              href="#projects"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect()
                const x = e.clientX - rect.left - rect.width / 2
                const y = e.clientY - rect.top - rect.height / 2
                e.currentTarget.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translate(0px,0px)"
              }}
              className="px-6 py-3 bg-indigo-500 rounded-lg shadow-lg hover:bg-indigo-600 transition"
            >
              View Projects
            </motion.a>

            {/* 🔥 VIEW CV (MODAL) */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              onClick={() => setOpenResume(true)}
              className="px-6 py-3 border border-indigo-400 rounded-lg hover:bg-indigo-500/20 transition"
            >
              View CV
            </motion.button>

            {/* DOWNLOAD CV */}
            <motion.a
              whileHover={{ scale: 1.1 }}
              href="/resume.pdf"
              download
              className="px-6 py-3 border border-gray-500 rounded-lg hover:bg-gray-700 transition"
            >
              Download CV
            </motion.a>

          </motion.div>
        </div>
      </section>

      {/* 🔥 RESUME MODAL */}
      <ResumeModal
        isOpen={openResume}
        onClose={() => setOpenResume(false)}
      />
    </>
  )
}

export default Landing