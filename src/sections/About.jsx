import { motion, useMotionValue, useTransform } from "framer-motion"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

function About() {
  const aboutRef = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-item",
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: aboutRef.current,
            start: "top 85%",
          },
        }
      )
    }, aboutRef)

    return () => ctx.revert()
  }, [])

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
      className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden"
    >
      {/* 🔥 Background Glow */}
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

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center relative z-10">

        {/* 🔵 LEFT TEXT */}
        <div className="flex flex-col justify-center">

          <h2 className="about-item text-5xl font-bold mb-6 leading-tight">
            About <span className="text-indigo-400">Me</span>
          </h2>

          {/* 🔥 Highlight Line */}
          <div className="about-item w-16 h-1 bg-indigo-400 mb-6 rounded"></div>

          <p className="about-item text-gray-300 mb-4 leading-relaxed">
            My journey into technology began with my Diploma in Computer Engineering,
            where I built a strong foundation in programming and problem-solving.
          </p>

          <p className="about-item text-gray-400 mb-4 leading-relaxed">
            During this time, I explored different technologies, but Java naturally stood out to me.
            The more I worked with it, the more it pulled me toward backend development.
          </p>

          <p className="about-item text-gray-400 mb-4 leading-relaxed">
            Currently, I am pursuing my B.Tech, where I am deepening my understanding of full-stack development.
            I focus on building scalable applications using Java and Spring Boot.
          </p>

          <p className="about-item text-gray-500 leading-relaxed">
            Through continuous learning and real-world projects,
            I am shaping myself into a Java developer with a strong inclination toward backend systems.
          </p>

        </div>

        {/* 🔴 RIGHT IMAGE */}
        <div className="flex justify-center items-center">

          <motion.div
            className="about-item relative"
            style={{ rotateX, rotateY }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            whileHover={{ scale: 1.05 }}
          >
            <img
              src="/your-image.jpeg"
              alt="Ayan"
              className="w-80 h-[420px] object-cover rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] border border-indigo-400/20"
            />

            {/* 🔥 Glow Behind */}
            <div className="absolute inset-0 -z-10 bg-indigo-500/20 blur-3xl rounded-2xl"></div>

            {/* 🔥 Floating Label */}
            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 px-4 py-2 bg-indigo-500/20 border border-indigo-400/40 rounded-lg text-sm backdrop-blur-md">
              Java Developer Enthusiast
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  )
}

export default About