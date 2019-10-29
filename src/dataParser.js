const constants = require('./constants.js')
const codeforcesParser = require('./codeforcesParser.js');
const codechefParser = require('./codechefParser.js');

function parseProblemData(data) {
    var websiteName = data.url.split('/')[2];
    var parsedData = {};

    if (websiteName.includes(constants.CODEFORCES.WEBSITE)) {
        console.log("Parsing codeforces' problem data...");
        parsedData = codeforcesParser(data);
    }
    else if (websiteName.includes(constants.CODECHEF.WEBSITE)) {
        console.log("Parsing codechef's problem data...");
        parsedData = codechefParser(data);
    }
    else {
        console.log("Sorry, currently we do not support websites other than codechef and codeforces!!!");
        vscode.window.showErrorMessage("ContestHelper: Sorry, we do not support websites other than codechef and codeforces!!!");
    }
    console.log(parsedData);
}

module.exports = parseProblemData;