import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import GithubIsometric from "./GithubIsometric";
import NtaButton from "./NtaButton";
import NtaSpotlightGrid from "./SpotlightGrid";



const handleButtonClick = () => {
  console.log('Button has been clicked!');
};

const myServices = [
  { title: "Frontend", desc: "Crafting beautiful UI." },
  { title: "Backend", desc: "Building secure APIs." },
  { title: "Security", desc: "Penetration testing." }
];

export default function PlaygroundHome() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 ">
        <h1 className="text-5xl md:text-7xl font-black tracking-tight ">
          Playground
        </h1>
<GithubIsometric 
  username="Ananta-TI"
/>
<NtaButton
  text="Submit Data"
  className="w-full font-bold"
  delay={200}
  onClick={handleButtonClick}
/>
<NtaSpotlightGrid 
  items={myServices} 
  spotlightColor="rgba(57, 211, 83, 0.3)" 
  spotlightSize={400} 
/>
    </div>
  );
}