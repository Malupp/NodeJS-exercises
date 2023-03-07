const crypto = require("node:crypto");

const id = crypto.randomBytes(16).toString("hex");

console.log(`The random id generated is: ${id}`);
