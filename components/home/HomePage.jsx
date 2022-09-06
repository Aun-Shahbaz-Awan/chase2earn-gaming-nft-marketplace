import React from "react";
// --------------------------------------- wegmi
import { useAccount} from "wagmi";
import Navbar from "../../components/Navbar.jsx";
import Footer from "../../components/Footer.jsx";
import AboutUs from "./sub-components/AboutUs.jsx";
import Hero from "./sub-components/Hero.jsx";
import CollectionTypeSection from "./sub-components/CollectionTypeSection.jsx";

function HomePage() {
  const { address, isConnected } = useAccount();
  console.log("Is Connected:", isConnected, " - Address:", address);

  return (
    <div className="relative bg-[url('/assets/main/Hero_Background.png')] bg-no-repeat bg-cover h-screen">
      <div className="absolute bg-[url('/assets/main/Hero_Background_Overlay.png')] bg-no-repeat bg-cover h-screen w-full">
        <Navbar />
        <Hero />
        <CollectionTypeSection />
        <AboutUs />
        <Footer />
      </div>
    </div>
  );
}

export default HomePage;
