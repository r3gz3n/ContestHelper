const vscode = require('vscode');
const fs = require('fs');
const path = require('path');
const constants = require('./constants');
const fileOpener = require('./fileOpener');


function isValidTestNumber(testNumber) {
    var filepath = path.parse(vscode.window.activeTextEditor.document.fileName);
    var rawdata = fs.readFileSync(path.join(filepath.dir, constants.CONFIG_FILE_NAME));
    var config = JSON.parse(rawdata);
    var intTestNumber = parseInt(testNumber);
    if (!isNaN(intTestNumber) && (intTestNumber < config.numberoftests))
        return [true, filepath.dir, intTestNumber.toString()];
    return [false, '', ''];
}

async function editTest() {
    var testNumber = await vscode.window.showInputBox({
        placeHolder: 'Enter the test number'
    });
    const [isValid, pathOfContestDir, validTestNumber] = isValidTestNumber(testNumber);
    if (isValid === true) {
        var inputPath = path.join(pathOfContestDir, constants.INPUT_PREFIX + validTestNumber + constants.TXT);
        var outputPath = path.join(pathOfContestDir, constants.OUTPUT_PREFIX + validTestNumber + constants.TXT);
        fileOpener.openTestFile(inputPath, outputPath);
    }
    else {
        console.error("Wrong test number!!!");
        vscode.window.showErrorMessage("Please enter correct test number!!!");
    }
}

module.exports = editTest;