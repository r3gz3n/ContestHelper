const vscode = require('vscode');
const path = require('path');
const constants = require('./constants');
const fileOpener = require('./fileOpener');
const getJsonConfig = require('./getJsonConfig');


async function isValidTestNumber(testNumber) {
    var filepath = path.parse(vscode.window.activeTextEditor.document.fileName);
    var config = await getJsonConfig(filepath.dir);
    var intTestNumber = parseInt(testNumber);
    if (!isNaN(intTestNumber) && (intTestNumber < config.numberoftests))
        return [true, filepath.dir, intTestNumber.toString()];
    return [false, '', ''];
}

async function editTest() {
    var testNumber = await vscode.window.showInputBox({
        placeHolder: 'Enter the test number'
    });
    const [isValid, pathOfContestDir, validTestNumber] = await isValidTestNumber(testNumber);
    if (isValid === true) {
        fileOpener.openTestFile(pathOfContestDir, validTestNumber);
    }
    else {
        console.error("Wrong test number!!!");
        vscode.window.showErrorMessage("Please enter correct test number!!!");
    }
}

module.exports = editTest;