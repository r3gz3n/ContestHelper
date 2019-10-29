const fileCreator = require('./fileCreator.js');
const constants = require('./constants.js');

function codechefParser(data) {
    var parsedData = {};
    parsedData.website = constants.CODECHEF.WEBSITE;
    var url = data.url.split('/');
    if (url[3] === constants.CODECHEF.PROBLEMS) {
        parsedData.contestId = constants.CODECHEF.PRACTICE;
        parsedData.problemId = url[4];
    }
    else {
        parsedData.contestId = url[3];
        parsedData.problemId = url[5];
    }
    parsedData.filename = data.languages.java.taskClass;
    parsedData.tests = data.tests;
    return parsedData;
}

module.exports = codechefParser;
