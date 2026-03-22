import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

function Training() {
  const trainingRef = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {

      gsap.fromTo(
        ".training-card",
        { opacity: 0, x: -80 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.2,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: trainingRef.current,
            start: "top 85%",
            toggleActions: "play reverse play reverse",
          },
        }
      )

    }, trainingRef)

    return () => ctx.revert()
  }, [])

  const trainings = [
    {
      title: "Advanced Java Training",
      org: "Naresh IT Technologies, Hyderabad",
      date: "March 2024 – May 2024",
      desc: "Completed Advanced Java covering JDBC, Servlets, JSP, and backend development concepts.",
      highlight: true,
    },
    {
      title: "DSA Summer Training Program",
      org: "W3Grads (Angaar Batch)",
      date: "June 2025 – July 2025",
      desc: "Completed intensive training in Data Structures and Algorithms using Java/C++ with industrial problem-solving practices.",
    },
  ]

  return (
    <section
      id="training"
      ref={trainingRef}
      className="min-h-screen flex items-center px-6 relative overflow-hidden"
    >
      {/* 🔥 Background Glow */}
      <div className="absolute w-[500px] h-[500px] bg-purple-500/20 blur-3xl rounded-full top-20 left-10"></div>

      <div className="max-w-5xl mx-auto w-full relative z-10">

        {/* 🔥 Heading */}
        <h2 className="text-5xl font-bold mb-12 text-center">
          My <span className="text-indigo-400">Training</span>
        </h2>

        {/* 🔥 Timeline */}
        <div className="relative border-l border-indigo-400/30 pl-6 space-y-10">

          {trainings.map((item, index) => (
            <div
              key={index}
              className={`training-card relative backdrop-blur-xl border rounded-xl p-6 shadow-lg
              ${item.highlight
                ? "bg-indigo-500/10 border-indigo-400/40 shadow-[0_0_30px_rgba(99,102,241,0.4)]"
                : "bg-white/10 border-indigo-400/20"
              }`}
            >

              {/* 🔥 Timeline Dot */}
              <div className="absolute -left-3 top-6 w-5 h-5 bg-indigo-400 rounded-full"></div>

              {/* 🔥 Title */}
              <h3 className="text-xl font-semibold mb-2">
                {item.title}
              </h3>

              {/* 🔥 Organization */}
              <p className="text-indigo-300 text-sm mb-1">
                {item.org}
              </p>

              {/* 🔥 Date */}
              <p className="text-xs text-gray-500 mb-2">
                {item.date}
              </p>

              {/* 🔥 Description */}
              <p className="text-gray-400 text-sm">
                {item.desc}
              </p>

            </div>
          ))}

        </div>
      </div>
    </section>
  )
}

export default Training