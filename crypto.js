const crypto = require('crypto');

const jwtSecret = crypto.randomBytes(16).toString('base64');

console.log(jwtSecret);