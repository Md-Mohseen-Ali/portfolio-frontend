import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

function Achievements() {
  const [selected, setSelected] = useState(null)
  const achRef = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {

      gsap.fromTo(
        ".ach-card",
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: achRef.current,
            start: "top 85%",
            toggleActions: "play reverse play reverse",
          },
        }
      )

    }, achRef)

    return () => ctx.revert()
  }, [])

  const achievements = [
    {
      title: "TRINETRA Hackathon Participation",
      org: "VentureSpace (LPU)",
      date: "Feb 2025",
      desc: "Participated in a 20-hour hackathon focused on real-world problem solving and team collaboration.",
      file: "/hackathon.png",
    },
  ]

  return (
    <section
      id="achievements"
      ref={achRef}
      className="min-h-screen flex items-center px-6 relative overflow-hidden"
    >
      <div className="absolute w-[500px] h-[500px] bg-purple-500/20 blur-3xl rounded-full top-20 left-10"></div>

      <div className="max-w-5xl mx-auto w-full relative z-10">

        <h2 className="text-5xl font-bold mb-12 text-center">
          My <span className="text-indigo-400">Achievements</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-8">

          {achievements.map((item, index) => (
            <div
              key={index}
              className="ach-card h-full flex flex-col backdrop-blur-xl bg-white/10 border border-indigo-400/20 rounded-2xl p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02]"
            >

              <div className="flex-grow space-y-2">

                <h3 className="text-xl font-semibold">
                  {item.title}
                </h3>

                <p className="text-indigo-300 text-sm">
                  {item.org}
                </p>

                <p className="text-xs text-gray-500">
                  {item.date}
                </p>

                <p className="text-gray-400 text-sm">
                  {item.desc}
                </p>

              </div>

              <button
                onClick={() => setSelected(item.file)}
                className="mt-4 px-4 py-2 bg-indigo-500 rounded-lg hover:bg-indigo-600 transition"
              >
                View Certificate
              </button>

            </div>
          ))}

        </div>
      </div>

      {/* Modal */}
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
            <button
              onClick={() => setSelected(null)}
              className="absolute -top-12 right-0 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 border border-white/20 text-white text-xl hover:bg-indigo-500 transition"
            >
              ✕
            </button>

            <div className="flex justify-center items-center">
  <img
    src={selected}
    alt="achievement"
    className="max-h-[80vh] w-auto rounded-xl shadow-2xl object-contain"
  />
</div>
          </div>
        </div>
      )}

    </section>
  )
}

export default Achievements