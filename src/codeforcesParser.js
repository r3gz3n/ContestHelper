const constants = require('./constants');
var baseParser = require('./baseParser');

function codeforcesParser(data) {
    this.data = data;
}

codeforcesParser.prototype = new baseParser();

codeforcesParser.prototype.parseData = function() {
    var parsedData = baseParser.prototype.parseData.call(this);
    parsedData.website = constants.CODEFORCES.WEBSITE;
    var url = this.data.url.split('/');
    if (url[3] === constants.CODEFORCES.PROBLEMSET)
        parsedData.contestid = url[5];
    else 
        parsedData.contestid = url[4];
    parsedData.problemid = url[6];
    return parsedData;
}
module.exports = codeforcesParser;