import "./globals.css";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Marquee from "./Marquee";
import HowItWorks from "./HowItWorks";
import NumbersStrip from "./NumbersStrip";
import FeaturedCourses from "./FeaturedCourses";
import RolePanels from "./RolePanels";
import Instructors from "./Instructors";
import Testimonials from "./Testimonials";
import Pricing from "./Pricing";
import FAQ from "./FAQ";
import CTABanner from "./CTABanner";
import Footer from "./Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <HowItWorks />
        <NumbersStrip />
        <FeaturedCourses />
        <RolePanels />
        <Instructors />
        <Testimonials />
        <Pricing />
        <FAQ />
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
