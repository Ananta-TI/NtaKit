import fs from 'fs';
import path from 'path';
import { parse } from 'react-docgen';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const componentsDir = path.resolve(__dirname, '../src/components/registry');
const outputFile = path.resolve(__dirname, '../src/generated-props.json');

const registryProps = {};

// 1. Clean Default Value (So no double quotes in numbers/objects)
const formatDefaultValue = (val) => {
  if (!val || val === '--') return '--';
  let clean = val.replace(/\s+/g, ' ').trim();
  
  if (clean.length > 30) {
    if (clean.startsWith('[')) return '[...]';
    if (clean.startsWith('{')) return '{...}';
  }
  // Only remove quotes if it's a simple string
  return clean.replace(/^['"`]|['"`]$/g, '');
};

// 2. Clean Description (Remove "export default" trash and duplicates)
const formatDescription = (desc, propName) => {
  if (!desc || desc === '-') return '-';

  // Remove lines containing 'export default' or function name
  // This is usually "trash" carried by react-docgen
  let lines = desc.split('\n');
  let cleanLines = lines.filter(line => {
    const l = line.toLowerCase();
    return !l.includes('export default') && !l.includes('function') && !l.includes('{');
  });

  let clean = cleanLines.join(' ')
    .replace(/\*/g, '')      // Remove JSDoc asterisks
    .replace(/\//g, '')      // Remove slashes
    .replace(/\s+/g, ' ')    // Tidy up spaces
    .trim();

  // If cleaned result is empty, give dash
  return clean || '-';
};

const files = fs.readdirSync(componentsDir).filter(file => file.endsWith('.jsx'));

files.forEach(file => {
  const filePath = path.join(componentsDir, file);
  const sourceCode = fs.readFileSync(filePath, 'utf8').replace(/\r\n/g, '\n');
  
  try {
    const parsed = parse(sourceCode);
    const comp = parsed[0]; 
    
    if (comp.props) {
      const propsTable = Object.entries(comp.props).map(([name, propData]) => {
        const rawDefault = propData.defaultValue?.value || '--';
        
        // Detect Type
        let type = propData.type?.name || 'any';
        if (type === 'any') {
            if (rawDefault === 'true' || rawDefault === 'false') type = 'boolean';
            else if (!isNaN(Number(rawDefault)) && rawDefault !== '--') type = 'number';
            else if (rawDefault.startsWith('"') || rawDefault.startsWith("'")) type = 'string';
            else if (rawDefault.startsWith('{') || rawDefault.startsWith('[')) type = 'object';
        }

        // GET DESCRIPTION (Use parser data first, then fallback to narrow regex)
        let desc = propData.description;
        if (!desc) {
          // This regex finds the "closest" JSDoc (no other /** in between)
          const strictRegex = new RegExp(`\\/\\*\\*([^\\*]*(?:\\*(?!\\/)[^\\*]*)*)\\*\\/\\s*(?:\r?\n\\s*)*${name}\\b`);
          const match = sourceCode.match(strictRegex);
          desc = match ? match[1] : '-';
        }

        return {
          name,
          type,
          default: formatDefaultValue(rawDefault),
          desc: formatDescription(desc, name),
        };
      });
      
      const id = file.replace('.jsx', '').replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
      registryProps[id] = propsTable;
    }
  } catch (err) { /* skip */ }
});

fs.writeFileSync(outputFile, JSON.stringify(registryProps, null, 2));
console.log("✅ Auto-generate Props Fixed!");