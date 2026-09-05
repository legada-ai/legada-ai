import { Experience } from "@/experience/Experience";
import { Navigation } from "@/components/ui/Navigation";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { Hero } from "@/components/sections/Hero";
import { StackSection } from "@/components/sections/StackSection";
import { Mission } from "@/components/sections/Mission";
import { Institution } from "@/components/sections/Institution";
import { Activities } from "@/components/sections/Activities";
import { Leadership } from "@/components/sections/Leadership";
import { Manifesto } from "@/components/sections/Manifesto";
import { Join } from "@/components/sections/Join";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <main>
      <SmoothScroll />
      <Experience />
      <div className="noise" aria-hidden="true" />
      <Navigation />
      <Hero />
      <StackSection />
      <Mission />
      <Institution />
      <Activities />
      <Leadership />
      <Manifesto />
      <Join />
      <Footer />
    </main>
  );
}
