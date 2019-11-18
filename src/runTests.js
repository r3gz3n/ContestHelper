const child_process = require('child_process');
const path = require('path');
const vscode = require('vscode');
const getJsonConfig = require('./getJsonConfig');
const constants = require('./constants');
const fileCreator = require('./fileCreator');
const getFileNumber = require('./getFileNumber');


function runSpecifcTest(testNumber, filepath, config, finalResult) {
    let result = {};
    const timelimit = parseInt(config.timelimit);
    console.log(`Running test #${testNumber}`);
    var pathOfExecutable = path.join(filepath.dir, filepath.name);
    var pathOfInputFile = path.join(filepath.dir, constants.INPUT_PREFIX + testNumber + constants.TXT);
    var pathOfOutputFile = path.join(filepath.dir, constants.OUTPUT_PREFIX + testNumber + constants.TXT);
    var input, correctOutput, programOutput, verdict, message;
    correctOutput = fileCreator.readFile(pathOfOutputFile).replace(/\r?\n|\r/g, "\n").trim();
    input = fileCreator.readFile(pathOfInputFile);
    let runProcess = child_process.spawnSync(pathOfExecutable.toString(), {
        timeout: timelimit + 500,
        input: input
    });
    programOutput = runProcess.stdout.toString().replace(/\r?\n|\r/g, "\n").trim();
    if (runProcess.status === 0) {
        if (programOutput === correctOutput) {
            verdict = "AC";
            message = "OK";
            console.log("Correct output");
        }
        else {
            verdict = "WA";
            message = "Wrong Answer";
            console.log("Wrong Answer");
        }            
        result = {
            testNumber: testNumber,
            input: input,
            programOutput: programOutput,
            correctOutput: correctOutput,
            verdict: verdict,
            message: message,
        };
        finalResult.push(result);
    }
    else {
        console.log(`Stderr: ${runProcess.stderr}`);
        console.log(`Signal: ${runProcess.signal}`);
        if (runProcess.error !== null) {
            console.log(`Error while running the program: ${runProcess.error.toString()}`);
            if (runProcess.error.message.split(' ')[2] === "ETIMEDOUT") {
                verdict = "TLE";
                message = "Time Limit Exceeded";
            }
        }
        result = {
            testNumber: testNumber,
            input: input,
            programOutput: programOutput,
            correctOutput: correctOutput,
            verdict: verdict,
            message: message,
        };
        finalResult.push(result);
    }
}

async function runTests(flag) {
    var finalResult = [];
    var filepath = path.parse(vscode.window.activeTextEditor.document.fileName);
    var config = await getJsonConfig(filepath.dir);
    
    if (flag === constants.RUN_ALL) {
        const numberOfTests = parseInt(config.numberoftests);
        for (let testNumber = 0;testNumber < numberOfTests;++testNumber) {
            runSpecifcTest(testNumber, filepath, config, finalResult);
        }
    }
    else {
        const [isValid, pathOfContestDir, validTestNumber] = await getFileNumber();
        if (isValid === true) {
            runSpecifcTest(validTestNumber, filepath, config, finalResult);
        }
        else {
            console.error("Wrong test number!!!");
            vscode.window.showErrorMessage("Please enter correct test number!!!");
        }
    }
    
    return finalResult;
}


module.exports = runTests;