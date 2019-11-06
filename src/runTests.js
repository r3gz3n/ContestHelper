const child_process = require('child_process');
const path = require('path');
const vscode = require('vscode');
const getJsonConfig = require('./getJsonConfig');
const constants = require('./constants');
const fileCreator = require('./fileCreator');

async function runSpecifcTest(testNumber, filepath, config) {
    var result = {};
    const timelimit = parseInt(config.timelimit);
    console.log(`Running test #${testNumber}`);
    var pathOfExecutable = path.join(filepath.dir, filepath.name);
    var pathOfInputFile = path.join(filepath.dir, constants.INPUT_PREFIX + testNumber + constants.TXT);
    var pathOfOutputFile = path.join(filepath.dir, constants.OUTPUT_PREFIX + testNumber + constants.TXT);
    console.log(pathOfExecutable);
    var runProcess = child_process.spawn(pathOfExecutable.toString(), ['<', pathOfInputFile], {timeout: timelimit});
    setTimeout(() => {
        runProcess.kill();
    }, timelimit);
    result.input = await fileCreator.readFile(pathOfInputFile).replace(/\r?\n|\r/g, "\n").trim();
    runProcess.stdin.write(result.input);
;
    runProcess.stdout.on('data', (data) => {
        result.myOutput = data.toString().replace(/\r?\n|\r/g, "\n").trim();
        result.correctOutput = fileCreator.readFile(pathOfOutputFile).replace(/\r?\n|\r/g, "\n").trim();
        if (result.myOutput === result.correctOutput)
            console.log("Correct output");
        else {
            console.log(`Expected output:\n${result.correctOutput}`);
            console.log(`Your output:\n${result.myOutput}`);
        }
    });
    runProcess.stderr.on('data', (data) => {
        console.error(`Stderr: ${data}`);
    });
    runProcess.on('exit', code => {
        if (code === 0) console.log("Ran successfully");
        else console.log("Error will running");
    });
    return result;
}

function runTests(flag) {
    var finalResult = [];
    var filepath = path.parse(vscode.window.activeTextEditor.document.fileName);
    getJsonConfig(filepath.dir).then( config => {
        if (flag === -1) {
            const numberOfTests = parseInt(config.numberoftests);
            for (var testNumber = 0;testNumber < numberOfTests;++testNumber) {
                finalResult.push(runSpecifcTest(testNumber, filepath, config));
            }
        }
        else {
            finalResult.push(runSpecifcTest(flag, filepath, config));
        }
    });
    return finalResult;
}


module.exports = runTests;