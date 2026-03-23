import { motion } from "framer-motion"
import { useState } from "react"
import { GitHub, Linkedin } from "lucide-react"
function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  })

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(null)

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setSuccess(null)

    try {
      const res = await fetch(
        "https://contact-backend-0fv8.onrender.com/api/contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      )

      if (res.ok) {
        setSuccess(true)
        setForm({ name: "", email: "", message: "" })
      } else {
        setSuccess(false)
      }
    } catch (err) {
      setSuccess(false)
    }

    setLoading(false)
  }

  return (
    <section
      id="contact"
      className="min-h-screen flex items-center px-6 relative overflow-hidden"
    >
      {/* 🔥 Animated Background Glow */}
      <motion.div
        animate={{
          x: [0, 150, -150, 0],
          y: [0, -80, 80, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute w-[600px] h-[600px] bg-indigo-500/20 blur-3xl rounded-full top-20 right-10"
      />

      <div className="max-w-4xl mx-auto w-full relative z-10">

        {/* 🔥 Heading Animation */}
        <motion.h2
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: false }}
          className="text-5xl font-bold mb-10 text-center"
        >
          Contact <span className="text-indigo-400">Me</span>
        </motion.h2>

        {/* 🔥 Form Container */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: false }}
          className="backdrop-blur-xl bg-white/10 border border-indigo-400/20 rounded-2xl p-8 shadow-2xl shadow-indigo-500/10 space-y-6"
        >

          {/* Name */}
          <motion.input
            whileFocus={{ scale: 1.03 }}
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-transparent border border-white/20 focus:border-indigo-400 outline-none transition"
          />

          {/* Email */}
          <motion.input
            whileFocus={{ scale: 1.03 }}
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-transparent border border-white/20 focus:border-indigo-400 outline-none transition"
          />

          {/* Message */}
          <motion.textarea
            whileFocus={{ scale: 1.02 }}
            name="message"
            placeholder="Your Message"
            rows="5"
            value={form.message}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-transparent border border-white/20 focus:border-indigo-400 outline-none transition"
          />

          {/* 🔥 Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
            className="w-full py-3 bg-indigo-500 rounded-lg hover:bg-indigo-600 transition font-medium disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Message"}
          </motion.button>

          {/* 🔥 Feedback */}
          {success === true && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-green-400 text-sm text-center"
            >
              Message sent successfully 🚀
            </motion.p>
          )}

          {success === false && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-400 text-sm text-center"
            >
              Something went wrong. Try again.
            </motion.p>
          )}
        </motion.form>

        {/* 🔥 CONNECT SECTION */}
<motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.3 }}
  className="mt-10 text-center"
>
  <p className="text-gray-400 mb-4">
    Let's Connect
  </p>

  <div className="flex justify-center gap-6">

    {/* 🔗 LINKEDIN */}
    <motion.a
      href="https://linkedin.com/in/md-mohseen-ali-"   // 🔥 PUT YOUR LINK
      target="_blank"
      whileHover={{ scale: 1.2, rotate: 5 }}
      className="p-3 rounded-full bg-indigo-500/20 border border-indigo-400/30 hover:bg-indigo-500/40 transition"
    >
      <Linkedin size={22} />
    </motion.a>

    {/* 🔗 GITHUB */}
    <motion.a
      href="https://github.com/Md-Mohseen-Ali"   // 🔥 PUT YOUR LINK
      target="_blank"
      whileHover={{ scale: 1.2, rotate: -5 }}
      className="p-3 rounded-full bg-indigo-500/20 border border-indigo-400/30 hover:bg-indigo-500/40 transition"
    >
      <Github size={22} />
    </motion.a>

  </div>
</motion.div>
      </div>
    </section>
  )
}

export default Contact