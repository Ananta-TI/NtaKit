import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import Header from "./components/ui/Header";

import AppLayout from "./pages/AppLayout";
import LandingPage from "./pages/LandingPage";
import ComponentPage from "./pages/ComponentPage";
import InstallationPage from "./components/ui/Installation";
import Contact from "./components/ui/Contact";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-brand-bg text-brand-text">
          
          {/* HEADER GLOBAL */}
          <Header />

          <Routes>

            {/* PUBLIC / SIMPLE PAGES */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/contact" element={<Contact />} />

            {/* ALL DOCS LAYOUT (SIDEBAR + PROMO) */}
            <Route element={<AppLayout />}>
              <Route path="/components/:id" element={<ComponentPage />} />
              <Route path="/installation" element={<InstallationPage />} />
            </Route>

          </Routes>

        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;