const fs = require("node:fs/promises");

console.log('First');

async  function readFiles() {
    try {
        const data = await fs.readFile('file1.txt', 'utf-8');
        console.log(data);
    } catch (error) {
        console.error('Error reading the file', error);
    }
}

readFiles();

console.log('Last');