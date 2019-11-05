const fs = require('fs');
const path = require('path')
const configuration = require('./configuration');
const constants = require('./constants')

function createFolder(dir) {
    if (!fs.existsSync(dir))
        fs.mkdirSync(dir);
    console.log(dir + " created successfully!!!");
}

function writeIntoFile(pathOfFile, data) {
    fs.writeFile(pathOfFile, data, {flag: 'w'}, (err) => {
        if (err) console.error(err);
        console.log(pathOfFile + " created successfully!!!");
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

function createConfigFile(pathOfConfigFile, parsedData) {
    writeIntoFile(pathOfConfigFile, JSON.stringify(parsedData));
}

function generateFiles(parsedData) {
    if (typeof parsedData !== 'undefined' && parsedData) {
        var baseDir = configuration.Configuration.getDirectoryPath();
        createFolder(baseDir);
        var pathOfWebsiteDir = path.join(baseDir, parsedData.website);
        createFolder(pathOfWebsiteDir);
        var pathOfContestDir = path.join(pathOfWebsiteDir, parsedData.contestid);
        createFolder(pathOfContestDir);
        var pathOfProblemDir = path.join(pathOfContestDir, parsedData.problemid);
        createFolder(pathOfProblemDir);
        var pathOfSourceFile = path.join(pathOfProblemDir, parsedData.filename + ".cpp");
        createSourceFile(pathOfSourceFile);
        var pathOfConfigFile = path.join(pathOfProblemDir, constants.CONFIG_FILE_NAME);
        createConfigFile(pathOfConfigFile, parsedData);
        return [pathOfSourceFile, pathOfContestDir];
    }
    else {
        console.error("Error occurred while parsing data!!!");
        return null;
    }
}

function deleteFile(pathOfFile) {
    fs.unlink(pathOfFile, (err) => {
        if (err) {
            console.error(err);
        }
    });
}

module.exports = {
    generateFiles: generateFiles,
    writeIntoFile: writeIntoFile,
    deleteFile: deleteFile
}