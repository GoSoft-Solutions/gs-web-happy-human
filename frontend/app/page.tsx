import Header from "./components/First_section/Header";
import Home from "./components/First_section/Inicio";
import Intro from "./components/First_section/Intro_section";
import HeroSection from "./components/First_section/Acerca_de";
import DanielCorral from "./components/First_section/DanielCorral";
import Endsection from "./components/First_section/Trabajo";
import Footer from "./components/First_section/Footer";

export default function HomePage() {
  return (
    <main className="overflow-x-hidden">
      <Header />
      <Home />
      <Intro />
      <HeroSection />
      <DanielCorral />
      <Endsection />
      <Footer />
    </main>
  );
}