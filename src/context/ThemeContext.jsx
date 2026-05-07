import React, { createContext, useState, useEffect } from "react";

// 1. Inisialisasi Context
export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // 2. Cek apakah user sudah pernah milih tema sebelumnya di browser (localStorage)
  // Kalau belum ada, default-nya kita kasih Dark Mode (true) biar keren ala hacker
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme === "dark" : true;
  });

  // 3. Fungsi buat gonta-ganti tema
  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  // 4. Setiap kali isDarkMode berubah, kita update class di tag <html>
  // dan simpan pilihannya ke localStorage
// Di dalam useEffect ThemeContext.jsx
useEffect(() => {
  const root = window.document.documentElement;
  if (isDarkMode) {
    root.classList.remove("light"); // Hapus light mode
    root.classList.add("dark");    // (Opsional) tambahkan dark
    localStorage.setItem("theme", "dark");
  } else {
    root.classList.add("light");    // Aktifkan light mode
    root.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }
}, [isDarkMode]);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};