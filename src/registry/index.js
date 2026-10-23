// preview
import AnimatedBeamDemo from "../components/Demo/AnimatedBeamDemo";
import { SubmitButton } from "../components/registry/SubmitButton";
import MagneticEffectDemo from "../components/Demo/MagneticEffectDemo";
import KineticGrid from "../components/registry/KineticGrid";
import KineticGridDemo from "../components/Demo/KineticGridDemo";
import GithubIsometric from "../components/Demo/GithubIsometricDemo";
import ContactDemo from "../components/Demo/ContactFromDemo";

// code
import AnimatedBeamRaw from "../components/registry/AnimatedBeam.jsx?raw";
import ContactRaw from "../components/registry/ContactForm.jsx?raw";
import SubmitButtonRaw from "../components/registry/SubmitButton.jsx?raw";
import MagnetRaw from "../components/registry/Magnet.jsx?raw";
import KineticGridRaw from "../components/registry/KineticGrid.jsx?raw";
import GithubIsometricRaw from "../components/registry/GithubIsometric.jsx?raw";

// cleaner
import { getCleanCode } from "../utils/cleaner";

export const componentRegistry = {

  "animated-beam": {
    name: "animated beam",
    category: "components",
    component: AnimatedBeamDemo,
    code: getCleanCode(AnimatedBeamRaw),
    defaultProps: {
      pathColor: "gray",
      pathWidth: 3,
      pathOpacity: 0.2,
      gradientStartColor: "#61DBFB",
      gradientStopColor: "#9c40ff",
      curvature: 0,
      reverse: false,
      startXOffset: 0,
      startYOffset: 0,
      endXOffset: 0,
      endYOffset: 0,
    },
    propsTable: [
      {
        name: "className",
        type: "string",
        required: false,
        default: "",
        desc: "Additional class for styling the SVG wrapper",
        controlType: "text",
      },
      {
        name: "curvature",
        type: "number",
        required: false,
        default: "0",
        desc: "Beam curve amount (negative = curve up, positive = curve down)",
        controlType: "number",
      },
      {
        name: "reverse",
        type: "boolean",
        required: false,
        default: "false",
        desc: "Reverse gradient direction",
        controlType: "toggle",
      },
      {
        name: "pathColor",
        type: "string",
        required: false,
        default: '"gray"',
        desc: "Beam path stroke color",
        controlType: "color",
      },
      {
        name: "pathWidth",
        type: "number",
        required: false,
        default: "3",
        desc: "Beam path stroke width in pixels",
        controlType: "number",
      },
      {
        name: "pathOpacity",
        type: "number",
        required: false,
        default: "0.2",
        desc: "Beam path opacity",
        controlType: "number",
      },
      {
        name: "gradientStartColor",
        type: "string",
        required: false,
        default: '"#61DBFB"',
        desc: "Gradient start color",
        controlType: "color",
      },
      {
        name: "gradientStopColor",
        type: "string",
        required: false,
        default: '"#9c40ff"',
        desc: "Gradient stop color",
        controlType: "color",
      },
      {
        name: "duration",
        type: "number",
        required: false,
        default: "4",
        desc: "Gradient animation duration in seconds",
        controlType: "number",
      },
      {
        name: "delay",
        type: "number",
        required: false,
        default: "0",
        desc: "Gradient animation delay in seconds",
        controlType: "number",
      },
      {
        name: "startXOffset",
        type: "number",
        required: false,
        default: "0",
        desc: "Start point X offset in pixels",
        controlType: "number",
      },
      {
        name: "startYOffset",
        type: "number",
        required: false,
        default: "0",
        desc: "Start point Y offset in pixels",
        controlType: "number",
      },
      {
        name: "endXOffset",
        type: "number",
        required: false,
        default: "0",
        desc: "End point X offset in pixels",
        controlType: "number",
      },
      {
        name: "endYOffset",
        type: "number",
        required: false,
        default: "0",
        desc: "End point Y offset in pixels",
        controlType: "number",
      },
    ],
    controls: [
      { name: "curvature", label: "Curvature", type: "number", default: 0 },
      { name: "pathWidth", label: "Path Width (px)", type: "number", default: 3 },
      { name: "pathOpacity", label: "Path Opacity", type: "number", default: 0.2 },
      { name: "gradientStartColor", label: "Gradient Start", type: "color", default: "#61DBFB" },
      { name: "gradientStopColor", label: "Gradient Stop", type: "color", default: "#9c40ff" },
      { name: "duration", label: "Duration (s)", type: "number", default: undefined },
      { name: "delay", label: "Delay (s)", type: "number", default: undefined },
    ],
    usage: `import AnimatedBeam from "./AnimatedBeam";

// You need refs for container, from, and to elements
const containerRef = useRef(null);
const fromRef = useRef(null);
const toRef = useRef(null);

<AnimatedBeam
  containerRef={containerRef}
  fromRef={fromRef}
  toRef={toRef}
  curvature={-30}
/>`,
  },

  "github-isometric": {
    name: "github isometric",
    category: "components",
    component: GithubIsometric,
    code: getCleanCode(GithubIsometricRaw),
    defaultProps: { username: "Ananta-TI" },
    propsTable: [
      {
        name: "username",
        type: "string",
        required: false,
        default: "Ananta-TI",
        desc: "GitHub username to fetch and visualize contributions for",
        controlType: "text",
      },
    ],
    controls: [
      { name: "username", label: "GitHub Username", type: "text", default: "Ananta-TI" },
    ],
    usage: `import GithubIsometric from "./GithubIsometric";

<GithubIsometric 
  username="Ananta-TI"
/>`
  },

  "magnetic-effect": {
    name: "magnetic effect",
    category: "components",
    component: MagneticEffectDemo,
    code: getCleanCode(MagnetRaw),
    defaultProps: {
      padding: 100,
      disabled: false,
      magnetStrength: 2,
      exclusive: true,
      axis: "both",
      tilt: 0,
      scale: 1,
      stiffness: 170,
      damping: 16,
      mass: 1,
    },
    propsTable: [
      {
        name: "children",
        type: "ReactNode",
        required: true,
        default: "-",
        desc: "Child element to apply magnetic effect (usually a button)",
        controlType: "children",
      },
      {
        name: "padding",
        type: "number",
        required: false,
        default: "100",
        desc: "Activation radius around the element in pixels",
        controlType: "number",
      },
      {
        name: "magnetStrength",
        type: "number",
        required: false,
        default: "2",
        desc: "Strength of the magnetic pull",
        controlType: "number",
      },
      {
        name: "maxOffset",
        type: "number",
        required: false,
        default: "-",
        desc: "Maximum movement offset in pixels",
        controlType: "number",
      },
      {
        name: "exclusive",
        type: "boolean",
        required: false,
        default: "true",
        desc: "Only one magnet active at a time",
        controlType: "toggle",
      },
      {
        name: "axis",
        type: "string",
        required: false,
        default: '"both"',
        desc: "Movement axis: both, x, or y",
        controlType: "text",
      },
      {
        name: "tilt",
        type: "number",
        required: false,
        default: "0",
        desc: "Tilt rotation in degrees",
        controlType: "number",
      },
      {
        name: "scale",
        type: "number",
        required: false,
        default: "1",
        desc: "Scale factor when active",
        controlType: "number",
      },
      {
        name: "stiffness",
        type: "number",
        required: false,
        default: "170",
        desc: "Spring stiffness",
        controlType: "number",
      },
      {
        name: "damping",
        type: "number",
        required: false,
        default: "16",
        desc: "Spring damping",
        controlType: "number",
      },
      {
        name: "mass",
        type: "number",
        required: false,
        default: "1",
        desc: "Spring mass",
        controlType: "number",
      },
    ],
    controls: [],
    usage: `import MagneticEffect from "./MagneticEffect";

export default function App() {
  return (
    <MagneticEffect>
      <button>Magnetic Button</button>
    </MagneticEffect>
  );
}`
  },

  "background": {
    name: "kinetic grid",
    category: "backgrounds",
    component: KineticGridDemo,
    code: getCleanCode(KineticGridRaw),
    defaultProps: {
      cellSize: 95,
      influenceRadius: 280,
      visibilityRadius: 340,
      hoverWarp: 25,
      clickWarp: 28,
      dotSpacing: 58,
      cursorLerp: 1,
      pressLerpIn: 0.09,
      pressLerpOut: 0.09,
      outsideGridOpacity: 0.018,
      outsideNodeOpacity: 0.025,
      outsideDotOpacity: 0.01,
      nodeBaseRadius: 1.5,
      nodeActiveRadius: 3.2,
    },
    propsTable: [
      {
        name: "isDarkMode",
        type: "boolean",
        required: false,
        default: "true",
        desc: "Enable dark mode for grid and node colors",
        controlType: "toggle",
      },
      {
        name: "cellSize",
        type: "number",
        required: false,
        default: "95",
        desc: "Grid cell size in pixels",
        controlType: "number",
      },
      {
        name: "influenceRadius",
        type: "number",
        required: false,
        default: "280",
        desc: "Mouse influence radius in pixels",
        controlType: "number",
      },
      {
        name: "visibilityRadius",
        type: "number",
        required: false,
        default: "340",
        desc: "Visual radius for grid visibility fade",
        controlType: "number",
      },
      {
        name: "hoverWarp",
        type: "number",
        required: false,
        default: "25",
        desc: "Warp amount on hover",
        controlType: "number",
      },
      {
        name: "clickWarp",
        type: "number",
        required: false,
        default: "28",
        desc: "Warp amount on click/press",
        controlType: "number",
      },
      {
        name: "dotSpacing",
        type: "number",
        required: false,
        default: "58",
        desc: "Background dots spacing in pixels",
        controlType: "number",
      },
      {
        name: "cursorLerp",
        type: "number",
        required: false,
        default: "1",
        desc: "Cursor follow speed (1 = instant)",
        controlType: "number",
      },
      {
        name: "pressLerpIn",
        type: "number",
        required: false,
        default: "0.09",
        desc: "Press ease-in speed",
        controlType: "number",
      },
      {
        name: "pressLerpOut",
        type: "number",
        required: false,
        default: "0.09",
        desc: "Press ease-out speed",
        controlType: "number",
      },
      {
        name: "outsideGridOpacity",
        type: "number",
        required: false,
        default: "0.018",
        desc: "Grid line opacity outside mouse radius",
        controlType: "number",
      },
      {
        name: "outsideNodeOpacity",
        type: "number",
        required: false,
        default: "0.025",
        desc: "Node opacity outside mouse radius",
        controlType: "number",
      },
      {
        name: "outsideDotOpacity",
        type: "number",
        required: false,
        default: "0.01",
        desc: "Dot texture opacity outside mouse radius",
        controlType: "number",
      },
      {
        name: "nodeBaseRadius",
        type: "number",
        required: false,
        default: "1.5",
        desc: "Base node radius in pixels",
        controlType: "number",
      },
      {
        name: "nodeActiveRadius",
        type: "number",
        required: false,
        default: "3.2",
        desc: "Active node radius in pixels",
        controlType: "number",
      },
    ],
    controls: [
      { name: "cellSize", label: "Cell Size", type: "number", default: 95 },
      { name: "influenceRadius", label: "Influence Radius", type: "number", default: 280 },
      { name: "visibilityRadius", label: "Visibility Radius", type: "number", default: 340 },
      { name: "hoverWarp", label: "Hover Warp", type: "number", default: 25 },
      { name: "clickWarp", label: "Click Warp", type: "number", default: 28 },
      { name: "dotSpacing", label: "Dot Spacing", type: "number", default: 58 },
      { name: "cursorLerp", label: "Cursor Lerp", type: "number", default: 1 },
      { name: "pressLerpIn", label: "Press Lerp In", type: "number", default: 0.09 },
      { name: "pressLerpOut", label: "Press Lerp Out", type: "number", default: 0.09 },
      { name: "outsideGridOpacity", label: "Outside Grid Opacity", type: "number", default: 0.018 },
      { name: "outsideNodeOpacity", label: "Outside Node Opacity", type: "number", default: 0.025 },
      { name: "outsideDotOpacity", label: "Outside Dot Opacity", type: "number", default: 0.01 },
      { name: "nodeBaseRadius", label: "Node Base Radius", type: "number", default: 1.5 },
      { name: "nodeActiveRadius", label: "Node Active Radius", type: "number", default: 3.2 },
      { name: "isDarkMode", label: "Dark Mode", type: "boolean", default: true },
    ],
    usage: `import KineticGrid from "./KineticGrid";

export default function App() {
  return (
    <KineticGrid isDarkMode={true} />
  );
}`
  },

  "submit-button": {
    name: "button",
    category: "components",
    component: SubmitButton,
    code: getCleanCode(SubmitButtonRaw),
    defaultProps: { loading: false },
    propsTable: [
      {
        name: "loading",
        type: "boolean",
        required: false,
        default: "false",
        desc: "When true, button is disabled and displays 'Sending' text",
        controlType: "toggle",
      },
      {
        name: "width",
        type: "number",
        required: false,
        default: "-",
        desc: "Button width in pixels",
        controlType: "number",
      },
      {
        name: "height",
        type: "number",
        required: false,
        default: "-",
        desc: "Button height in pixels",
        controlType: "number",
      },
      {
        name: "borderRadius",
        type: "number",
        required: false,
        default: "-",
        desc: "Border radius in pixels",
        controlType: "number",
      },
    ],
    controls: [],
    usage: `import { SubmitButton } from "./SubmitButton";

export default function App() {
  return (
    <SubmitButton loading={false} />
  );
}`
  },

  "contact-form": {
    name: "contact form",
    category: "components",
    component: ContactDemo,
    code: getCleanCode(ContactRaw),
    defaultProps: {
      title: "Get in Touch",
      buttonText: "Send Message",
      compact: false,
    },
    propsTable: [
      {
        name: "onSubmit",
        type: "function",
        required: true,
        default: "-",
        desc: "Async/sync handler to handle form submission. Receives name, email, subject, message data.",
        controlType: "function",
      },
      {
        name: "title",
        type: "string",
        required: false,
        default: "Get in Touch",
        desc: "Title displayed above the form. Leave empty string to hide title.",
        controlType: "text",
      },
      {
        name: "successMessage",
        type: "string",
        required: false,
        default: "Message sent successfully.",
        desc: "Message displayed when form is successfully sent.",
        controlType: "text",
      },
      {
        name: "errorMessage",
        type: "string",
        required: false,
        default: "Something went wrong. Please try again.",
        desc: "Message displayed when submission fails or onSubmit produces an error.",
        controlType: "text",
      },
      {
        name: "buttonText",
        type: "string",
        required: false,
        default: "Send Message",
        desc: "Text displayed on the submit button when form is idle.",
        controlType: "text",
      },
      {
        name: "loadingText",
        type: "string",
        required: false,
        default: "Sending...",
        desc: "Text displayed on the submit button while form is sending data.",
        controlType: "text",
      },
      {
        name: "successDuration",
        type: "number",
        required: false,
        default: "5000",
        desc: "Duration success message is displayed before automatically disappearing in milliseconds.",
        controlType: "number",
      },
      {
        name: "compact",
        type: "boolean",
        required: false,
        default: "false",
        desc: "Enables smaller layout for preview, modal, card, or narrow container.",
        controlType: "toggle",
      },
      {
        name: "className",
        type: "string",
        required: false,
        default: "",
        desc: "Additional class to change or add styling to the main wrapper.",
        controlType: "text",
      },
    ],
    controls: [],
    usage: `import Contact from "./Contact";

  <Contact />
  `},
};
