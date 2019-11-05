const codeforcesParser = require('./codeforcesParser');
const codechefParser = require('./codechefParser');
const constants = require('./constants');


function checkWebsiteSupport(websiteName) {
    var supportWebsite = false;
    constants.SUPPORTED_WEBSITES.forEach(function(website) {
        if (websiteName.includes(website)) {
            supportWebsite = true;
        }
    });
    return supportWebsite;
}

function getParser(websiteName, data) {
    if (checkWebsiteSupport(websiteName) === false)
        return null;
    if (websiteName.includes(constants.CODEFORCES.WEBSITE)) {
        console.log("Parsing codeforces' problem data...");
        parser = new codeforcesParser(data);
    }
    else if (websiteName.includes(constants.CODECHEF.WEBSITE)) {
        console.log("Parsing codechef's problem data...");
        parser = new codechefParser(data);
    }
    return parser;
}

module.exports = getParser;