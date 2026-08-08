import IconSprite from "./components/IconSprite.jsx";
import GrainOverlay from "./components/GrainOverlay.jsx";
import ProgressAndToTop from "./components/ProgressAndToTop.jsx";
import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import Marquee from "./components/Marquee.jsx";
import About from "./components/About.jsx";
import Timeline from "./components/Timeline.jsx";
import Achievements from "./components/Achievements.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import T from "./components/T.jsx";

export default function App() {
  return (
    <>
      <T k="skip" as="a" className="skip-link" href="#main-content" />
      <IconSprite />
      <GrainOverlay />
      <ProgressAndToTop />
      <Nav />
      <Hero />
      <Marquee />
      <main id="main-content">
        <About />
        <Timeline />
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
