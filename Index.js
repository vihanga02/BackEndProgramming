const fs = require("node:fs");
const zliv = require("zlib");

const readableStream = fs.createReadStream('./file.txt', {
    encoding: 'utf8',
    highWaterMark: 2
});

readableStream.pipe(gzip).pipe(fs.WriteStream('./file2.txt.gz'))

const writabeleStream = fs.createWriteStream('./file2.txt');

readableStream.pipe(writabeleStream);