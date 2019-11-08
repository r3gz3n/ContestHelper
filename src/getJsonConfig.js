const path = require('path');
const fs = require('fs');
const constants = require('./constants');

function getJsonConfig(problemDir) {
    var rawdata = fs.readFileSync(path.join(problemDir, constants.CONFIG_FILE_NAME));
    return JSON.parse(rawdata);
}

module.exports = getJsonConfig;