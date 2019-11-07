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
    var runProcess = child_process.spawn(pathOfExecutable.toString(), ['<', pathOfInputFile], {timeout: timelimit});
    setTimeout(() => {
        verdict = "TLE";
        runProcess.kill();
    }, timelimit);
    correctOutput = fileCreator.readFile(pathOfOutputFile).replace(/\r?\n|\r/g, "\n").trim();
    input = fileCreator.readFile(pathOfInputFile);
    runProcess.stdin.write(input);
    runProcess.stdout.on('data', (data) => {
        programOutput = data.toString().replace(/\r?\n|\r/g, "\n").trim();
        if (programOutput === correctOutput) {
            verdict = "AC";
            console.log("Correct output");
        }
        else {
            verdict = "WA";
            console.log(`Expected output:\n${result.correctOutput}`);
            console.log(`Your output:\n${result.programOutput}`);
        }            
        result = {
            input: input,
            programOutput: programOutput,
            correctOutput: correctOutput,
            verdict: verdict
        };
        finalResult.push(result);
    });
    runProcess.stderr.on('data', (data) => {
        console.error(`Stderr: ${data}`);
    });
    runProcess.on('exit', code => {
        if (code === 0) console.log("Ran successfully");
        else console.log("Error will running");
    });
}

function runTests(flag) {
    var finalResult = [];
    var filepath = path.parse(vscode.window.activeTextEditor.document.fileName);
    getJsonConfig(filepath.dir).then( config => {
        if (flag === -1) {
            const numberOfTests = parseInt(config.numberoftests);
            for (let testNumber = 0;testNumber < numberOfTests;++testNumber) {
                runSpecifcTest(testNumber, filepath, config, finalResult);
            }
        }
        else {
            runSpecifcTest(flag, filepath, config, finalResult);
        }
    });
    return finalResult;
}


module.exports = runTests;