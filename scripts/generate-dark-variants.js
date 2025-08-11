const fs = require('fs');
const path = require('path');

function findImageFiles(dir, baseDir = '') {
  const files = [];
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const relativePath = path.join(baseDir, item);
    
    if (fs.statSync(fullPath).isDirectory()) {
      files.push(...findImageFiles(fullPath, relativePath));
    } else if (/\.(jpg|jpeg|png|webp|mp4)$/i.test(item)) {
      files.push('/' + relativePath.replace(/\\/g, '/'));
    }
  }
  
  return files;
}

function generateDarkVariantsManifest() {
  const publicDir = path.join(process.cwd(), 'public');
  const assetsDir = path.join(publicDir, 'assets');
  
  if (!fs.existsSync(assetsDir)) {
    console.log('No assets directory found');
    return;
  }
  
  const allFiles = findImageFiles(assetsDir, 'assets');
  const manifest = {};
  
  // Find all files that have -dark variants
  for (const file of allFiles) {
    if (file.includes('-dark.')) {
      // This is a dark variant, find its light counterpart
      const lightFile = file.replace('-dark.', '.');
      if (allFiles.includes(lightFile)) {
        manifest[lightFile] = file;
      }
    }
  }
  
  // Write manifest
  const manifestPath = path.join(publicDir, 'dark-variants.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  
  console.log(`Generated dark variants manifest with ${Object.keys(manifest).length} entries:`);
  Object.entries(manifest).forEach(([light, dark]) => {
    console.log(`  ${light} → ${dark}`);
  });
}

generateDarkVariantsManifest();