const constants = require('./constants');
var baseParser = require('./baseParser');

function codechefParser(data) {
    this.data = data;
}

codechefParser.prototype = new baseParser();

codechefParser.prototype.parseData = function() {
    var parsedData = baseParser.prototype.parseData.call(this);
    parsedData.website = constants.CODECHEF.WEBSITE;
    var url = this.data.url.split('/');
    if (url[3] === constants.CODECHEF.PROBLEMS) {
        parsedData.contestid = constants.CODECHEF.PRACTICE;
        parsedData.problemid = url[4];
    }
    else {
        parsedData.contestid = url[3];
        parsedData.problemid = url[5];
    }
    return parsedData;
}

module.exports = codechefParser;
