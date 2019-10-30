const constants = require('./constants.js');

function codeforcesParser(data) {
    var parsedData = {};
    parsedData.website = constants.CODEFORCES.WEBSITE;
    var url = data.url.split('/');
    if (url[3] === constants.CODEFORCES.PROBLEMSET)
        parsedData.contestId = url[5];
    else 
        parsedData.contestId = url[4];
    parsedData.problemId = url[6];
    parsedData.filename = data.languages.java.taskClass;
    parsedData.tests = data.tests;
    return parsedData;
}
module.exports = codeforcesParser;