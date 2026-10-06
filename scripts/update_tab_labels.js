import fs from 'fs';
import path from 'path';

const dir = 'components/specializovana/programovani-2';
const files = fs.readdirSync(dir).filter(f => f.endsWith('Chapter.tsx'));

let changed = 0;
files.forEach(f => {
    let filepath = path.join(dir, f);
    let content = fs.readFileSync(filepath, 'utf8');
    let m = content.match(/subtitle="Lekce (\d+)"/);
    if (m) {
        let lessonNum = m[1];
        if (content.includes("label: 'Lekce'")) {
            let newContent = content.replace("label: 'Lekce'", `label: 'Lekce ${lessonNum}'`);
            fs.writeFileSync(filepath, newContent, 'utf8');
            changed++;
            console.log('Updated ' + f + ' to Lekce ' + lessonNum);
        }
    }
});
console.log('Total files changed: ' + changed);
