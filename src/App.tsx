import './styles/globals.css'
import { useBackgroundShift } from './hooks/useBackgroundShift'
import Starfield from './components/Starfield'
import YearMarker from './components/YearMarker'
import Hero from './components/Hero'
import Ticker from './components/Ticker'
import Experience from './components/Experience'
import OpenSource from './components/OpenSource'
import Stack from './components/Stack'
import Education from './components/Education'
import Interests from './components/Interests'
import Quote from './components/Quote'
import Footer from './components/Footer'

export default function App() {
  useBackgroundShift()

  return (
    <>
      <a href="#experience" className="skip-link">Skip to content</a>
      <Starfield />
      <YearMarker />
      <div className="parallax-wrap">
        <Hero />
        <Ticker />
        <Experience />
        <OpenSource />
        <Stack />
        <Education />
        <Interests />
        <Quote />
        <Footer />
      </div>
    </>
  )
}
