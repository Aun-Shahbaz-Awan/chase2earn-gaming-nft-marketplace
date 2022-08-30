
import AboutUs from "../components/AboutUs.jsx";
import Footer from "../components/Footer.jsx";
import Hero from "../components/Hero.jsx";
import Navbar from "../components/Navbar.jsx";
import NFTShowcase from "../components/NFTShowcase.jsx";

export default function Home() {
  return (
    <>
      <div className="relative bg-[url('/assets/main/Hero_Background.png')] bg-no-repeat bg-cover h-screen">
        <div className="absolute bg-[url('/assets/main/Hero_Background_Overlay.png')] bg-no-repeat bg-cover h-screen w-full">
          <Navbar />
          <Hero />
          <NFTShowcase />
          <AboutUs />
          <Footer />
        </div>
      </div>
    </>
  );
}
