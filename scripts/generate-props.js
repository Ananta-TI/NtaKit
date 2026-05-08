import fs from 'fs';
import path from 'path';
import { parse } from 'react-docgen';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const componentsDir = path.resolve(__dirname, '../src/components/docs');
const outputFile = path.resolve(__dirname, '../src/generated-props.json');

const registryProps = {};

// 1. Membersihkan Default Value (Agar tidak ada kutip ganda di angka/objek)
const formatDefaultValue = (val) => {
  if (!val || val === '--') return '--';
  let clean = val.replace(/\s+/g, ' ').trim();
  
  if (clean.length > 30) {
    if (clean.startsWith('[')) return '[...]';
    if (clean.startsWith('{')) return '{...}';
  }
  // Hanya hapus kutip jika itu string sederhana
  return clean.replace(/^['"`]|['"`]$/g, '');
};

// 2. Membersihkan Deskripsi (Hapus sampah "export default" dan duplikasi)
const formatDescription = (desc, propName) => {
  if (!desc || desc === '-') return '-';

  // Hapus baris yang mengandung 'export default' atau nama fungsi
  // Ini biasanya "sampah" yang ikut terbawa react-docgen
  let lines = desc.split('\n');
  let cleanLines = lines.filter(line => {
    const l = line.toLowerCase();
    return !l.includes('export default') && !l.includes('function') && !l.includes('{');
  });

  let clean = cleanLines.join(' ')
    .replace(/\*/g, '')      // Hapus bintang JSDoc
    .replace(/\//g, '')      // Hapus slash
    .replace(/\s+/g, ' ')    // Rapikan spasi
    .trim();

  // Jika setelah dibersihkan malah jadi kosong, kasih strip
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
        
        // Deteksi Tipe
        let type = propData.type?.name || 'any';
        if (type === 'any') {
            if (rawDefault === 'true' || rawDefault === 'false') type = 'boolean';
            else if (!isNaN(Number(rawDefault)) && rawDefault !== '--') type = 'number';
            else if (rawDefault.startsWith('"') || rawDefault.startsWith("'")) type = 'string';
            else if (rawDefault.startsWith('{') || rawDefault.startsWith('[')) type = 'object';
        }

        // AMBIL DESKRIPSI (Gunakan data dari parser, baru fallback ke regex sempit)
        let desc = propData.description;
        if (!desc) {
          // Regex ini mencari JSDoc yang "paling dekat" (tidak boleh ada /** lain di antaranya)
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