const vscode = require('vscode');
const getParser = require('./getParser')

function parseProblemData(data) {
    var websiteName = data.url.split('/')[2];
    var parsedData;
    var parser = getParser(websiteName, data);
    if (parser !== null) {
        parsedData = parser.parseData();
    }
    else {
        console.log("Sorry, currently we do not support websites other than codechef and codeforces!!!");
        vscode.window.showErrorMessage("ContestHelper: Unable to parse the data!!!");
    }
    return parsedData;
}

module.exports = parseProblemData;