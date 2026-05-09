import { defineConfig } from 'jsrepo';
import { repository } from "jsrepo/outputs";

export default defineConfig({
  registry: {
    name: "NtaKit",
    items: [
      {
        name: "github-isometric",
        type: "registry:component",
        files: [{ path: "src/components/registry/GithubIsometric.jsx" }]
      },
      {
        name: "nta-button",
        type: "registry:component",
        files: [{ path: "src/components/registry/NtaButton.jsx" }]
      },
      {
        name: "spotlight-grid",
        type: "registry:component",
        files: [{ path: "src/components/registry/SpotlightGrid.jsx" }]
      }
    ],
    // Ini bagian yang paling penting agar file .json per komponen terbuat!
    outputs: [repository()],
  },
  paths: {
    components: "./src/components/registry"
  }
});