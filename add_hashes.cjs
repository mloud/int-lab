const fs = require('fs');
const path = require('path');

const routingContent = fs.readFileSync('d:/Skola/Vimperk/Aplikace Informatika/IntLab/routing.ts', 'utf-8');
const routeMap = {};
const routeRegex = /'([a-z0-9]+)':\s*'([a-z0-9-]+)'/g;
let match;
while ((match = routeRegex.exec(routingContent)) !== null) {
  routeMap[match[2]] = match[1];
}

const appContent = fs.readFileSync('d:/Skola/Vimperk/Aplikace Informatika/IntLab/App.tsx', 'utf-8');
const propToScreen = {};
const appRegex = /([a-zA-Z0-9_]+)=\{[^}]*setCurrentScreen\('([a-z0-9-]+)'\)[^}]*\}/g;
while ((match = appRegex.exec(appContent)) !== null) {
  if (match[1] === 'onBack' || match[1] === 'onStart') continue;
  propToScreen[match[1]] = match[2];
}

const propToHash = {};
for (const [prop, screen] of Object.entries(propToScreen)) {
  if (routeMap[screen]) {
    propToHash[prop] = routeMap[screen];
  }
}

function getFiles(dir) {
  const files = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of items) {
    if (item.isDirectory()) {
      files.push(...getFiles(path.join(dir, item.name)));
    } else if (item.name.endsWith('.tsx')) {
      files.push(path.join(dir, item.name));
    }
  }
  return files;
}
const tsxFiles = getFiles('d:/Skola/Vimperk/Aplikace Informatika/IntLab/components');

let updatedFiles = 0;
for (const file of tsxFiles) {
  let content = fs.readFileSync(file, 'utf-8');
  let originalContent = content;
  
  for (const [prop, hash] of Object.entries(propToHash)) {
    // We want to match <button ... onClick={prop} ...> ... </button>
    // Using a regex to find </button> that belongs to onClick={prop}
    const buttonRegex = new RegExp("(<button[^>]*onClick=\\{?\\s*" + prop + "\\s*\\}?[\\s\\S]*?)(<\\/button>)", 'g');
    
    content = content.replace(buttonRegex, (fullMatch, p1, p2) => {
      // If we already inserted a hash badge, skip
      if (p1.includes('absolute top-3 right-3') || p1.includes('font-mono font-bold text-gray-400 bg-gray-100/50')) return fullMatch;
      
      const injected = `<div className="absolute top-3 right-3 text-xs font-mono font-bold text-gray-400 bg-white/80 px-2 py-1 rounded-md border border-gray-200/50 uppercase tracking-widest shadow-sm z-10 backdrop-blur-sm group-hover:bg-blue-50 transition-colors">#${hash}</div>`;
      return p1 + injected + p2;
    });
  }
  
  if (content !== originalContent) {
    fs.writeFileSync(file, content);
    updatedFiles++;
    console.log('Updated', file);
  }
}
console.log('Total files updated:', updatedFiles);
