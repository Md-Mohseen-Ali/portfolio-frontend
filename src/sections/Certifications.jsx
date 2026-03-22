import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

function Certifications() {
  const [selected, setSelected] = useState(null)
  const certRef = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {

      gsap.fromTo(
        ".cert-card",
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: certRef.current,
            start: "top 85%",
            toggleActions: "play reverse play reverse",
          },
        }
      )

    }, certRef)

    return () => ctx.revert()
  }, [])

  const certs = [
    {
      title: "Java Full Stack Internship",
      org: "Briztech Infosystems Pvt. Ltd",
      date: "Oct 2023 – Nov 2023",
      desc: "Completed Java Full Stack internship with hands-on development and A+ grade performance.",
      file: "/briztech.png",
      highlight: true,
    },
    {
      title: "Advanced Java Certificate",
      org: "Naresh IT Technologies",
      date: "Mar 2024 – May 2024",
      desc: "Covered JDBC, Servlets, JSP, and backend development concepts.",
      file: "/advance-java.png",
    },
    {
      title: "DSA Summer Training",
      org: "W3Grads (Angaar Batch)",
      date: "Jun 2025 – Jul 2025",
      desc: "Focused on data structures and real-world problem solving.",
      file: "/dsa-cert.png",
    },
    {
      title: "MySQL Bootcamp",
      org: "Udemy (Colt Steele)",
      date: "Sept 2024",
      desc: "Completed SQL training from beginner to advanced level.",
      file: "/udemy.png",
    },
  ]

  return (
    <section
      id="certifications"
      ref={certRef}
      className="min-h-screen flex items-center px-6 relative overflow-hidden"
    >
      {/* Glow */}
      <div className="absolute w-[500px] h-[500px] bg-indigo-500/20 blur-3xl rounded-full top-20 right-10"></div>

      <div className="max-w-6xl mx-auto w-full relative z-10">

        {/* Heading */}
        <h2 className="text-5xl font-bold mb-12 text-center">
          My <span className="text-indigo-400">Certifications</span>
        </h2>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-8">

          {certs.map((cert, index) => (
            <div
              key={index}
              className={`cert-card h-full flex flex-col backdrop-blur-xl border rounded-2xl p-6 shadow-lg transition-all duration-300 transform hover:-translate-y-2 hover:scale-[1.02]
              ${cert.highlight 
                ? "bg-indigo-500/10 border-indigo-400/40 shadow-[0_0_40px_rgba(99,102,241,0.4)]" 
                : "bg-white/10 border-indigo-400/20 hover:shadow-[0_0_30px_rgba(99,102,241,0.3)]"
              }`}
            >

              <div className="flex-grow space-y-2">

                <h3 className="text-xl font-semibold transition group-hover:text-indigo-300">
                  {cert.title}
                </h3>

                <p className="text-sm text-indigo-300">
                  {cert.org}
                </p>

                <p className="text-xs text-gray-500">
                  {cert.date}
                </p>

                <p className="text-gray-400 text-sm leading-relaxed">
                  {cert.desc}
                </p>

              </div>

              {/* Button */}
              <button
                onClick={() => setSelected(cert.file)}
                className="mt-4 px-4 py-2 bg-indigo-500 rounded-lg hover:bg-indigo-600 transition transform hover:scale-105"
              >
                View Certificate
              </button>

            </div>
          ))}

        </div>
      </div>

      {/* MODAL */}
      {selected && (
        <div
          onClick={() => setSelected(null)}
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-[90%] max-w-5xl"
          >
<div className="relative w-[90%] max-w-5xl"></div>
            {/* Close */}
            <button
              onClick={() => setSelected(null)}
              className="absolute -top-12 right-0 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 border border-white/20 text-white text-xl hover:bg-indigo-500 transition"
            >
              ✕
            </button>

            {/* Image */}
            <div className="flex justify-center items-center">
  <img
    src={selected}
    alt="certificate"
    className="max-h-[80vh] w-auto rounded-xl shadow-2xl object-contain"
  />
</div>

          </div>
        </div>
      )}

    </section>
  )
}

export default Certifications