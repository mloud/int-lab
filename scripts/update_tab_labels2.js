import fs from 'fs';
import path from 'path';

const dir = 'components/specializovana/programovani-2';
const files = fs.readdirSync(dir).filter(f => f.endsWith('Chapter.tsx'));

let changed = 0;
files.forEach(f => {
    let filepath = path.join(dir, f);
    let content = fs.readFileSync(filepath, 'utf8');
    if (content.includes("label: 'Lekce'")) {
        let m = content.match(/Lekce (\d+)/i);
        if (m) {
            let lessonNum = m[1];
            let newContent = content.replace("label: 'Lekce'", `label: 'Lekce ${lessonNum}'`);
            fs.writeFileSync(filepath, newContent, 'utf8');
            changed++;
            console.log('Updated ' + f + ' to Lekce ' + lessonNum);
        } else {
            console.log('Could not find lesson number in ' + f);
        }
    }
});
console.log('Total files changed: ' + changed);
