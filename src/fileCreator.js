const fs = require('fs');
const path = require('path')
const configuration = require('./configuration.js');

function createFolder(dir) {
    if (!fs.existsSync(dir))
        fs.mkdirSync(dir);
    console.log(dir + " created successfully!!!");
}

function writeIntoFile(pathToContestDir, data) {
    fs.writeFile(pathToContestDir, data, {flag: 'w'}, (err) => {
        if (err) console.error(err);
        console.log(pathToContestDir + " created successfully!!!");
    });
}

function createTestFiles(dir, tests) {
    for (var idx = 0;idx < tests.length;++idx) {
        var inPath = path.join(dir, "in" + idx.toString() + ".txt");
        var outPath = path.join(dir, "out" + idx.toString() + ".txt");
        writeIntoFile(inPath, tests[idx].input);
        writeIntoFile(outPath, tests[idx].output);
    }
}

function createSourceFile(pathOfSourceFile) {
    if (!fs.existsSync(pathOfSourceFile))
        fs.closeSync(fs.openSync(pathOfSourceFile, 'w'));
    console.log(pathOfSourceFile + " created successfully!!!");
}

function generateFiles(parsedData) {
    if (typeof parsedData !== 'undefined' && parsedData) {
        var baseDir = configuration.Configuration.getDirectoryPath();
        createFolder(baseDir);
        var pathOfWebsiteDir = path.join(baseDir, parsedData.website);
        createFolder(pathOfWebsiteDir);
        var pathOfContestDir = path.join(pathOfWebsiteDir, parsedData.contestId);
        createFolder(pathOfContestDir);
        var pathOfProblemDir = path.join(pathOfContestDir, parsedData.problemId);
        createFolder(pathOfProblemDir);
        createTestFiles(pathOfProblemDir, parsedData.tests);
        var pathOfSourceFile = path.join(pathOfProblemDir, parsedData.filename + ".cpp");
        createSourceFile(pathOfSourceFile);
        return pathOfSourceFile;
    }
    else {
        console.error("Error occurred while parsing data!!!");
        return null;
    }
}

module.exports = generateFiles;