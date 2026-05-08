// preview
import NtaButton from "../components/docs/NtaButton";
import GithubIsometric from "../components/docs/GithubIsometric";
import NtaSpotlightGrid from "../components/docs/SpotlightGrid";

// code
import NtaButtonRaw from "../components/docs/NtaButton.jsx?raw";
import GithubIsometricRaw from "../components/docs/GithubIsometric.jsx?raw";
import NtaSpotlightGridRaw from "../components/docs/SpotlightGrid.jsx?raw";

// cleaner
import { getCleanCode } from "../utils/cleaner";

export const componentRegistry = {
  "github-isometric": {
    name: "github isometric",
    component: GithubIsometric,
    code: getCleanCode(GithubIsometricRaw),
    // 👇 Tambahkan usage khusus Github Isometric di sini
    usage: `import GithubIsometric from "./GithubIsometric";

<GithubIsometric 
  username="Ananta-TI"
/>`
  },

  "nta-button": {
    name: "button",
    component: NtaButton,
    code: getCleanCode(NtaButtonRaw),
    
    // 👇 Tulis persis seperti format "orang-orang" itu
    usage: `import NtaButton from "./NtaButton";

const handleButtonClick = () => {
  console.log('Button has been clicked!');
};

<NtaButton
  text="Submit Data"
  className="w-full font-bold"
  delay={200}
  onClick={handleButtonClick}
/>`
  },

  "spotlight-grid": {
    name: "Spotlight Grid",
    component: NtaSpotlightGrid,
    code: getCleanCode(NtaSpotlightGridRaw),
    usage: `import NtaSpotlightGrid from "./NtaSpotlightGrid";

const myServices = [
  { title: "Frontend", desc: "Crafting beautiful UI." },
  { title: "Backend", desc: "Building secure APIs." },
  { title: "Security", desc: "Penetration testing." }
];

<NtaSpotlightGrid 
  items={myServices} 
  spotlightColor="rgba(57, 211, 83, 0.3)" 
  spotlightSize={400} 
/>`
  }
};