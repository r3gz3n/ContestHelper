function baseParser(data) {
    this.data = data;
}

baseParser.prototype.parseData = function() {
    var parsedData = {};
    parsedData.memorylimit = this.data.memoryLimit;
    parsedData.timelimit = this.data.timeLimit;
    parsedData.filename = this.data.languages.java.taskClass;
    parsedData.tests = this.data.tests;
    parsedData.numberoftests = parseInt(this.data.tests.length);
    return parsedData;
}

module.exports = baseParser;
