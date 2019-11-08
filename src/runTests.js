const child_process = require('child_process');
const path = require('path');
const vscode = require('vscode');
const getJsonConfig = require('./getJsonConfig');
const constants = require('./constants');
const fileCreator = require('./fileCreator');

function callbackClosure(data, callback) {
    return function() {
        return callback(data);
    }
}

function runSpecifcTest(testNumber, filepath, config, finalResult) {
    let result = {};
    const timelimit = parseInt(config.timelimit);
    console.log(`Running test #${testNumber}`);
    var pathOfExecutable = path.join(filepath.dir, filepath.name);
    var pathOfInputFile = path.join(filepath.dir, constants.INPUT_PREFIX + testNumber + constants.TXT);
    var pathOfOutputFile = path.join(filepath.dir, constants.OUTPUT_PREFIX + testNumber + constants.TXT);
    var input, correctOutput, programOutput, verdict;
    correctOutput = fileCreator.readFile(pathOfOutputFile).replace(/\r?\n|\r/g, "\n").trim();
    input = fileCreator.readFile(pathOfInputFile);
    var runProcess = child_process.spawnSync(pathOfExecutable.toString(), ['<', pathOfInputFile], {
        timeout: timelimit,
        input: input
    });
    if (runProcess.status === 0) {
        programOutput = runProcess.stdout.toString().replace(/\r?\n|\r/g, "\n").trim();
        if (programOutput === correctOutput) {
            verdict = "AC";
            console.log("Correct output");
        }
        else {
            verdict = "WA";
            console.log(`Expected output:\n${correctOutput}`);
            console.log(`Your output:\n${programOutput}`);
        }            
        result = {
            input: input,
            programOutput: programOutput,
            correctOutput: correctOutput,
            verdict: verdict
        };
        finalResult.push(result);
    }
    else console.log(`Error while running the program ${runProcess.status}`);
}

async function runTests(flag) {
    var finalResult = [];
    var filepath = path.parse(vscode.window.activeTextEditor.document.fileName);
    var config = await getJsonConfig(filepath.dir);
    
    if (flag === -1) {
        const numberOfTests = parseInt(config.numberoftests);
        for (let testNumber = 0;testNumber < numberOfTests;++testNumber) {
            runSpecifcTest(testNumber, filepath, config, finalResult);
        }
    }
    else {
        runSpecifcTest(flag, filepath, config, finalResult);
    }
    
    return finalResult;
}


module.exports = runTests;