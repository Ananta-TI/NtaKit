// preview
import NtaButton from "../components/docs/NtaButton";
import GithubIsometric from "../components/docs/GithubIsometric";

// code
import NtaButtonRaw from "../components/docs/NtaButton.jsx?raw";
import GithubIsometricRaw from "../components/docs/GithubIsometric.jsx?raw";

// cleaner
import { getCleanCode } from "../utils/cleaner";

export const componentRegistry = {
    "github-isometric": {
    name: "Github Isometric Animation",
    component: GithubIsometric,
    code: getCleanCode(GithubIsometricRaw),
  },
  "nta-button": {
    name: "NTA Animated Button",
    component: NtaButton,
    // Di sini sihirnya, kodenya dibersihin dulu sebelum masuk registry
    code: getCleanCode(NtaButtonRaw), 
  },
};