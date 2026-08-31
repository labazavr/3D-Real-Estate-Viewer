import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const errors = [];

const walk = (directory) =>
  fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(fullPath) : [fullPath];
  });

const sourceFiles = walk(path.join(root, 'src')).filter((file) => /\.(ts|tsx)$/.test(file));
const source = sourceFiles.map((file) => fs.readFileSync(file, 'utf8')).join('\n');

for (const file of sourceFiles) {
  const content = fs.readFileSync(file, 'utf8');
  for (const match of content.matchAll(/from\s+['"](@\/[^'"]+)['"]/g)) {
    const base = path.join(root, 'src', match[1].slice(2));
    const candidates = [base, `${base}.ts`, `${base}.tsx`, path.join(base, 'index.ts'), path.join(base, 'index.tsx')];
    if (!candidates.some((candidate) => fs.existsSync(candidate))) {
      errors.push(`Unresolved local import ${match[1]} in ${path.relative(root, file)}`);
    }
  }
}

if (/\bany\b/.test(source)) errors.push('Explicit any found in src.');
if (/TODO|FIXME/.test(source)) errors.push('TODO/FIXME marker found in src.');

for (const match of source.matchAll(/['"]\/(photos|previews)\/[^'"]+['"]/g)) {
  const assetPath = path.join(root, 'public', match[0].slice(2, -1));
  if (!fs.existsSync(assetPath)) errors.push(`Missing local asset: ${assetPath}`);
}

const requiredPaths = [
  'public/models',
  'public/photos',
  'src/entities/property',
  'src/entities/room',
  'src/entities/floor',
  'src/features/select-room',
  'src/features/select-floor',
  'src/features/change-view',
  'src/features/camera-controls',
  'src/widgets/property-viewer',
  'src/pages/properties',
  'src/pages/property-viewer',
];

for (const requiredPath of requiredPaths) {
  if (!fs.existsSync(path.join(root, requiredPath))) errors.push(`Missing required path: ${requiredPath}`);
}

if (!source.includes('path="/properties"')) errors.push('Missing /properties route.');
if (!source.includes('path="/properties/:id"')) errors.push('Missing /properties/:id route.');

if (errors.length > 0) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log(`Project validation passed: ${sourceFiles.length} TypeScript source files checked.`);
