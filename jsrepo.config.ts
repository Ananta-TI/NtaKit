import { defineConfig } from 'jsrepo';
import { repository } from "jsrepo/outputs";

export default defineConfig({
  registry: {
    name: "NtaKit",
    items: [
      {
        name: "animated-beam",
        type: "registry:component",
        files: [{ path: "src/components/registry/AnimatedBeam.jsx" }]
      },
      {
        name: "background",
        type: "registry:component",
        files: [{ path: "src/components/registry/KineticGrid.jsx" }]
      },
      {
        name: "github-isometric",
        type: "registry:component",
        files: [{ path: "src/components/registry/GithubIsometric.jsx" }]
      },
      {
        name: "button",
        type: "registry:component",
        files: [{ path: "src/components/registry/Button.jsx" }]
      },
      {
        name: "spotlight-grid",
        type: "registry:component",
        files: [{ path: "src/components/registry/SpotlightGrid.jsx" }]
      },
      {
        name: "contact-form",
        type: "registry:component",
        files: [{ path: "src/components/registry/ContactForm.jsx" }]
      }
    ],
    // This is the most important part so that .json file per component is created!
    outputs: [repository()],
  },
  paths: {
    components: './src/components/registry',
		component: './src/playground'
  }
});