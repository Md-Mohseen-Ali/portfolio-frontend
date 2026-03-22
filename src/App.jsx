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

function App() {
  return (
    <div className="bg-[#0f172a] text-white">
      <Navbar />
      <Landing />
      <About />
      <Skills />
      <Projects />
      <Training />
      <Certifications />
      <Achievements />
      <Contact />
      <CustomCursor />
    </div>
  )
}

export default App