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

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">

        {/* 🔵 LEFT TEXT */}
        <div>
          <h2 className="about-item text-5xl font-bold mb-6">
            About <span className="text-indigo-400">Me</span>
          </h2>

          <p className="about-item text-gray-300 mb-4">
            My journey into technology began with my Diploma in Computer Engineering,
            where I built a strong foundation in programming and problem-solving.
            During this time, I explored different technologies, but Java naturally stood out to me.
            The more I worked with it, the more it pulled me toward backend development and system design.
          </p>

          <p className="about-item text-gray-400 mb-4">
            Currently, I am pursuing my B.Tech, where I am deepening my understanding of full-stack development.
            I focus on building scalable applications using Java and Spring Boot, along with modern frontend technologies.
          </p>

          <p className="about-item text-gray-500">
            Through continuous learning and real-world projects,
            I am shaping myself into a full-stack developer with a strong inclination toward backend systems.
          </p>
        </div>

        {/* 🔴 RIGHT SIDE */}
        <div className="relative flex justify-center items-center">

          {/* 🔥 IMAGE */}
          <motion.div
            className="about-item relative"
            style={{ rotateX, rotateY }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            whileHover={{ scale: 1.05 }}
          >
            <img
              src="/your-image.JPG"   // 👉 PUT IMAGE IN PUBLIC
              alt="Ayan"
              className="w-72 h-80 object-cover rounded-2xl shadow-2xl border border-indigo-400/20"
            />

            {/* Glow */}
            <div className="absolute inset-0 -z-10 bg-indigo-500/20 blur-2xl rounded-2xl"></div>
          </motion.div>

          

        </div>

      </div>
    </section>
  )
}

export default About