export const getCleanCode = (rawCode) => {
  if (!rawCode) return "";

  return rawCode
    // 0. Standardize line format (Fix missing space bug on Windows)
    .replace(/\r\n/g, '\n')

    // 1. Remove ThemeContext & dark mode logic
    .replace(/import\s+\{([^}]+ThemeContext[^}]+)\}\s+from\s+['"].*['"];?\n?/g, '')
    .replace(/const\s+\{.*isDarkMode.*\}\s+=\s+useContext\(ThemeContext\);?\n?/g, '')

    // 2. Remove [DOC-ONLY] block and its contents (like <div> wrapper)
    // MUST run before removing regular JSX comments!
    .replace(/\s*\{\/\*\s*\[DOC-ONLY\]\s*\*\/\}\n?[\s\S]*?\{\/\*\s*\[\/DOC-ONLY\]\s*\*\/\}\n?/g, '')

    // 3. Remove remaining JSX comments: {/* comment */}
    .replace(/\s*\{\/\*[\s\S]*?\*\/\}/g, '')

    // 4. Remove JSDoc & multi-line JS comments: /** comment */ or /* comment */
    .replace(/\s*\/\*[\s\S]*?\*\//g, '')

    // 5. Remove single-line comments: // comment (Except https:// URLs)
    .replace(/(?<!:)\/\/.*$/gm, '')

    // 6. Clean lines that only contain spaces/tabs (leftover indent from removed comments)
    .replace(/^[ \t]+$/gm, '')

    // 7. FINAL: Merge empty lines
    // If there are 3 or more consecutive empty lines, make it 2 lines only (1 line gap)
    .replace(/\n\s*\n\s*\n/g, '\n\n')

    // 8. Trim excess newlines at the very top and bottom of file
    .trim();
};
