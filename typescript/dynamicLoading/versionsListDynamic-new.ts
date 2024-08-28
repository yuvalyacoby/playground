import * as fs from 'fs';

const loader = () => {
    let exportedVersions = {};
    const files = fs.readdirSync('./versions');
    files.forEach(async file => {
        const [fileName] = file.split('.');
        const exported = require('./versions/' + fileName);
        exportedVersions = { ...exportedVersions, ...exported };

    });
    return exportedVersions; 
}

const res = loader()

export default res;
