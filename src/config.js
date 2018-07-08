let a;
try {
    a = require("../config.json");
} catch (e) {
    a = {
        puppeteer: {}
    };
}
module.exports = a;
