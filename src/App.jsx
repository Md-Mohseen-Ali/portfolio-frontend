import { useState } from "react"

import Navbar from "./components/Navbar"
import Landing from "./sections/Landing"
import About from "./sections/About"
import Projects from "./sections/Projects"
import Skills from "./sections/Skills"
import Training from "./sections/Training"
import Certifications from "./sections/Certifications"
import Achievements from "./sections/Achievements"
import Contact from "./sections/Contact"
import CustomCursor from "./components/CustomCursor"
import Welcome from "./components/Welcome"

function App() {
  const [entered, setEntered] = useState(false)

  return (
    <>
      {/* 🔥 GLOBAL CURSOR (always active) */}
      <CustomCursor />

      {/* 🔥 WELCOME SCREEN */}
      {!entered && (
        <Welcome onEnter={() => setEntered(true)} />
      )}

      {/* 🔥 MAIN PORTFOLIO */}
      {entered && (
        <div className="bg-[#0f172a] text-white overflow-x-hidden">
          <Navbar />
          <Landing />
          <About />
          <Skills />
          <Projects />
          <Training />
          <Certifications />
          <Achievements />
          <Contact />
        </div>
      )}
    </>
  )
}

export default App