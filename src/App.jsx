import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import Header from "./components/ui/Header";
import Footer from "./components/ui/Footer";
import LandingPage from "./pages/LandingPage";
import ComponentPage from "./pages/ComponentPage";

function App() {
  return (
    <ThemeProvider>
      <Router>
<div className="min-h-screen bg-brand-bg text-brand-text transition-colors duration-300">
          <Header /> {/* Header muncul di semua halaman */}
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/components/:id" element={<ComponentPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;