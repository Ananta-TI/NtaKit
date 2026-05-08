export const getCleanCode = (rawCode) => {
  if (!rawCode) return "";

  return rawCode
    // 0. Standarisasi format enter (Fix bug spasi bolong di Windows)
    .replace(/\r\n/g, '\n')

    // 1. Hapus logic ThemeContext & dark mode
    .replace(/import\s+\{([^}]+ThemeContext[^}]+)\}\s+from\s+['"].*['"];?\n?/g, '')
    .replace(/const\s+\{.*isDarkMode.*\}\s+=\s+useContext\(ThemeContext\);?\n?/g, '')

    // 2. Hapus BLOK [DOC-ONLY] beserta isinya (seperti <div> wrapper)
    // HARUS jalan duluan sebelum hapus komentar JSX biasa!
    .replace(/\s*\{\/\*\s*\[DOC-ONLY\]\s*\*\/\}\n?[\s\S]*?\{\/\*\s*\[\/DOC-ONLY\]\s*\*\/\}\n?/g, '')

    // 3. Hapus sisa komentar JSX: {/* komentar */}
    .replace(/\s*\{\/\*[\s\S]*?\*\/\}/g, '')

    // 4. Hapus JSDoc & komentar Multi-line JS: /** komentar */ atau /* komentar */
    .replace(/\s*\/\*[\s\S]*?\*\//g, '')

    // 5. Hapus komentar Single-line: // komentar (Kecuali URL https://)
    .replace(/(?<!:)\/\/.*$/gm, '')

    // 6. Bersihkan baris yang hanya berisi spasi/tab (bekas indentasi komentar yang dihapus)
    .replace(/^[ \t]+$/gm, '')

    // 7. GENGGAMAN AKHIR: Rapatkan baris kosong
    // Jika ada 3 atau lebih baris kosong beruntun, jadikan 2 baris saja (1 enter jarak)
    .replace(/\n\s*\n\s*\n/g, '\n\n')

    // 8. Potong enter berlebih di ujung paling atas dan bawah file
    .trim();
};