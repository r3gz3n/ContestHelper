const path = require('path');
const fs = require('fs');
const vscode = require('vscode');
const constants = require('./constants');

async function getJsonConfig(problemDir) {
    var rawdata = fs.readFileSync(path.join(problemDir, constants.CONFIG_FILE_NAME));
    return JSON.parse(rawdata);
}

module.exports = getJsonConfig;