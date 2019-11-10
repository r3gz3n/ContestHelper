const child_process = require('child_process');
const configuration = require('./configuration');
const path = require('path');
const vscode = require('vscode');
const runTests = require('./runTests');


async function compileAndRunHelper(flag) {
    var sourceFileLocation = vscode.window.activeTextEditor.document.fileName;
    var pathOfSourceFile = path.parse(sourceFileLocation);
    var pathOfExecutable = path.join(pathOfSourceFile.dir, pathOfSourceFile.name);
    var cppCompiler = configuration.Configuration.getCompiler();
    var compilerArgs = [sourceFileLocation, '-o', pathOfExecutable.toString()];
    var inputFlags = configuration.Configuration.getCompilerFlags();
    var results;
    var inputArgs = inputFlags.split(' ');
    if (inputArgs.length > 0)
        compilerArgs = compilerArgs.concat();
    // TODO(r3gz3n): validate compiler and check if command exists
    const compileProcess = child_process.spawnSync(cppCompiler, compilerArgs);
    if (compileProcess.status === 0) {
        console.log("Compiled Successfully!!!");
        vscode.window.showInformationMessage(`ContestHelper: ${pathOfSourceFile.base} compiled successfully!!!`);
        results = await runTests(flag);
    }
    else {
        console.error(compileProcess.stderr.toString());
        vscode.window.showErrorMessage("ContestHelper: Compilation error!!!");
    }
    return results;
}

async function compileAndRun(flag) {
    var results = await compileAndRunHelper(flag);
    return new Promise((resolve, reject) => {
        if (results !== null && results !== 'undefined') return resolve(results);
        else return reject('Error while compiling and running the code!!!');
    });
}

module.exports = compileAndRun;