const child_process = require('child_process');
const configuration = require('./configuration');
const path = require('path');
const vscode = require('vscode');
const runTests = require('./runTests');


function compileAndRun(flag) {
    var sourceFileLocation = vscode.window.activeTextEditor.document.fileName;
    var pathOfSourceFile = path.parse(sourceFileLocation);
    var pathOfExecutable = path.join(pathOfSourceFile.dir, pathOfSourceFile.name);
    var cppCompiler = configuration.Configuration.getCompiler();
    var compilerArgs = [sourceFileLocation, '-o', pathOfExecutable.toString()];
    var inputFlags = configuration.Configuration.getCompilerFlags();
    compilerArgs = compilerArgs.concat(inputFlags.split(' '));
    // TODO(r3gz3n): validate compiler and check if command exists
    const process = child_process.spawn(cppCompiler, compilerArgs);
    process.stdout.on('data', (data) => {
        console.log(`Compilation Output: ${data}`);
    });
    process.stderr.on('data', (data) => {
        // TODO(r3gz3n): print error into webview panel
        console.log("Stderr: " + data.toString());
    });
    process.on('exit', (code) => {
    if (code === 0) {
            console.log("Compiled Successfully!!!");
            vscode.window.showInformationMessage(`ContestHelper: ${pathOfSourceFile.base} compiled successfully!!!`);
            runTests(flag);
        }
        else
            vscode.window.showErrorMessage("ContestHelper: Compilation error!!!");
    });
}

module.exports = compileAndRun;