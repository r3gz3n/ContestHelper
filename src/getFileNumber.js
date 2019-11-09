const vscode = require('vscode');
const path = require('path');
const getJsonConfig = require('./getJsonConfig');


async function isValidTestNumber(testNumber) {
    var filepath = path.parse(vscode.window.activeTextEditor.document.fileName);
    var config = await getJsonConfig(filepath.dir);
    var intTestNumber = parseInt(testNumber);
    if (!isNaN(intTestNumber) && (intTestNumber < config.numberoftests))
        return [true, filepath.dir, intTestNumber.toString()];
    return [false, '', ''];
}

async function getFileNumber() {
    var testNumber = await vscode.window.showInputBox({
        placeholder: 'enter the test number'
    });
    return await isValidTestNumber(testNumber);

}

module.exports = getFileNumber;