/*
extract_content.js
Node script to extract the ZIP archives that are already in the repository into the STgeorge-main project tree.

Usage (run from repository root):

1) Install dependency (one-time):
   npm install adm-zip

2) Run the script:
   node scripts/extract_content.js

What it does:
- Creates the following directories (if missing):
  STgeorge-main/assets/data/agpeya/
  STgeorge-main/assets/data/bible/
  STgeorge-main/assets/data/commentary/old/
  STgeorge-main/assets/data/commentary/new/
- Extracts the contents of these zip files (if present in repo root):
  STgeorge-main.zip
  الاجبيه_json.zip
  الكتاب المقدس.zip
  تفسير عهد قديم .zip
  تفسير عهد جديد.zip

Notes:
- This script only extracts files. It does not modify any existing source files inside STgeorge-main/. It places extracted files under STgeorge-main/assets/data/ ...
- You requested that the ZIPs remain in the repo; this script will not delete them.
*/

const fs = require('fs');
const path = require('path');
const AdmZip = require('adm-zip');

function ensureDir(p) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

function extractZipTo(zipPath, destDir) {
  if (!fs.existsSync(zipPath)) {
    console.log(`SKIP: ${zipPath} not found`);
    return;
  }
  console.log(`Extracting ${zipPath} -> ${destDir}`);
  const zip = new AdmZip(zipPath);
  zip.extractAllTo(destDir, /*overwrite*/ true);
}

function main() {
  const repoRoot = process.cwd();
  const stgeorgeRoot = path.join(repoRoot, 'STgeorge-main');
  ensureDir(stgeorgeRoot);

  const outAgpeya = path.join(stgeorgeRoot, 'assets', 'data', 'agpeya');
  const outBible = path.join(stgeorgeRoot, 'assets', 'data', 'bible');
  const outCommentOld = path.join(stgeorgeRoot, 'assets', 'data', 'commentary', 'old');
  const outCommentNew = path.join(stgeorgeRoot, 'assets', 'data', 'commentary', 'new');

  [outAgpeya, outBible, outCommentOld, outCommentNew].forEach(ensureDir);

  // Files in repository root (names must match exactly)
  const filesToExtract = [
    { name: 'STgeorge-main.zip', dest: stgeorgeRoot },
    { name: 'الاجبيه_json.zip', dest: outAgpeya },
    { name: 'الكتاب المقدس.zip', dest: outBible },
    { name: 'تفسير عهد قديم .zip', dest: outCommentOld },
    { name: 'تفسير عهد جديد.zip', dest: outCommentNew },
  ];

  filesToExtract.forEach(item => {
    const zipPath = path.join(repoRoot, item.name);
    extractZipTo(zipPath, item.dest);
  });

  console.log('\nExtraction complete.');
  console.log('Please open the STgeorge-main project (e.g., open STgeorge-main folder in your code editor) and run the app locally to verify.');
  console.log('Next steps (manual): modify App code to read JSON files under STgeorge-main/assets/data/ ... and wire UI screens (Agpeya, Bible, Commentaries, About).');
}

main();
