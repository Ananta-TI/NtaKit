// utils/extractDependencies.js

export function extractDependencies(code = "") {
  const regex = /from\s+['"]([^'"]+)['"]/g;

  const deps = new Set();
  let match;

  while ((match = regex.exec(code)) !== null) {
    const pkg = match[1];

    // skip relative imports
    if (
      pkg.startsWith(".") ||
      pkg.startsWith("/")
    ) continue;

    deps.add(pkg);
  }

  return [...deps];
}