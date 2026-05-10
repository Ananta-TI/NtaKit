// preview
import NtaButton from "../components/Demo/ButtonDemo";
import GithubIsometric from "../components/Demo/GithubIsometricDemo";
import NtaSpotlightGrid from "../components/Demo/SpotlightGridDemo";
import ContactDemo from "../components/Demo/ContactFromDemo";

// code
import ContactRaw from "../components/registry/ContactForm.jsx?raw";
import NtaButtonRaw from "../components/registry/Button.jsx?raw";
import GithubIsometricRaw from "../components/registry/GithubIsometric.jsx?raw";
import NtaSpotlightGridRaw from "../components/registry/SpotlightGrid.jsx?raw";

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

  "button": {
    name: "button",
    component: NtaButton,
    code: getCleanCode(NtaButtonRaw),
    
    // 👇 Tulis persis seperti format "orang-orang" itu
    usage: `import NtaButton from "./Button";

export default function App() {
  return (
    <NtaButton
      text="Get Started"
      glowColor="280 100 70"
      glowIntensity={1}
      borderRadius={16}
      animated={true}
      colors={[
        "#c084fc",
        "#f472b6",
        "#38bdf8"
      ]}
      onClick={() => console.log("Clicked")}
    />
  );
}`
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
  },
"contact-form": {
    name: "contact form",
    component: ContactDemo,
    code: getCleanCode(ContactRaw),

    usage: `import ContactForm from "./ContactForm";

export default function App() {
  // Fungsi ini akan menangkap data dari form
  const handleFormSubmit = async (formData) => {
    console.log("Data yang dikirim:", formData);
    
    // Simulasi loading API selama 2 detik
    // (Animasi loading di tombol akan berputar selama ini berjalan)
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    // Lanjutkan dengan pengiriman ke API/Supabase/EmailJS milik user
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-6 bg-zinc-50 dark:bg-zinc-950">
      <ContactForm 
        onSubmit={handleFormSubmit} 
        title="Get in Touch"
        successMessage="Pesan berhasil dikirim ke Ananta!" 
      />
    </div>
  );
}`
  }
};