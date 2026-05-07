export const getCleanCode = (rawCode) => {
  return rawCode
    // 1. Hapus logic context & dark mode
    .replace(/import {.*ThemeContext.*} from ".*";/g, '')
    .replace(/const {.*isDarkMode.*} = useContext\(ThemeContext\);/g, '')
    
    // 2. Update Regex untuk format JSX Comment {/* [DOC-ONLY] */}
    .replace(/\{\/\* \[DOC-ONLY\] \*\/\}[\s\S]*?\{\/\* \[\/DOC-ONLY\] \*\/\}/g, '')

    // 3. Rapikan sisa baris kosong
    .replace(/\n\s*\n\s*\n/g, '\n\n')
    .trim();
};