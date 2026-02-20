import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Brands from "@/components/Brands";
import Portfolio from "@/components/Portfolio";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Story from "@/components/Story";


export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-secondary selection:text-background">
      <Navbar />
      <Hero />
      <Story />
      <Brands />
      <Portfolio />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}
