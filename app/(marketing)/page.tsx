import Features from "./components/Features";
import AboutUs from "./components/About";
import HearoSection from "./components/HeroSection";
import StartYourJourney from "./components/StartYourJourney";

export default function page() {
  return (
    <>
      <HearoSection />
      <Features />
      <AboutUs />
      <StartYourJourney />
    </>
  );
}
