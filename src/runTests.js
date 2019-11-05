const child_process = require('child_process');
const configuration = require('./configuration');
const path = require('path');
const vscode = require('vscode');
const getJsonConfig = require('./getJsonConfig');

function runSpecifcTest(testNumber, filepath, config) {
    const timelimit = parseInt(config.timelimit);
    console.log(`Running test #${testNumber}`);
    var pathOfExecutable = path.join(filepath.dir, filepath.name);
    console.log(pathOfExecutable);
    var runProcess = child_process.spawn(pathOfExecutable.toString(), {timeout: timelimit});
    setTimeout(() => {
        runProcess.kill();
    }, timelimit);
    runProcess.stdin.write(config.tests[testNumber].input);
    runProcess.stdout.on('data', (data) => {
        var myOutput = data.toString().replace(/\r?\n|\r/g, "\n").trim();
        var correctOutput = config.tests[testNumber].output.replace(/\r?\n|\r/g, "\n").trim();
        if (myOutput === correctOutput)
            console.log("Correct output");
        else {
            console.log(`Expected output:\n${correctOutput}`);
            console.log(`Your output:\n${myOutput}`);
        }
    });
    runProcess.stderr.on('data', (data) => {
        console.error(`Stderr: ${data}`);
    });
    runProcess.on('exit', code => {
        if (code === 0) console.log("Ran successfully");
        else console.log("Error will running");
    });
}

function runAllTests() {
    var filepath = path.parse(vscode.window.activeTextEditor.document.fileName);
    getJsonConfig(filepath.dir).then( config => {
        const numberOfTests = parseInt(config.numberoftests);
        for (var testNumber = 0;testNumber < numberOfTests;++testNumber) {
            runSpecifcTest(testNumber, filepath, config);
        }
    });
}



function runTests(flag) {
    console.log(flag);
    if (flag === -1) {
        console.log(flag);
        runAllTests();
    }
    else runSpecifcTest(flag);
}


module.exports = runTests;