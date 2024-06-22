const fs = require("fs");
const { nextTick } = require("process");

const readableStream = fs.createReadStream(__filename);
readableStream.close();

readableStream.on("close", () => {
    console.log("Stream Close event call back.");
})

setImmediate(() => console.log("Immediate Timer 1"));
setTimeout(() => console.log("Timeout Timer 1"), 0);
Promise.resolve().then(() => console.log("Promise 1"));
process,nextTick(() => console.log("Process.nextTick 1"));