const vscode = require('vscode');
const fileOpener = require('./fileOpener');
const getFileNumber = require('./getFileNumber');

async function editTest() {
    const [isValid, pathOfContestDir, validTestNumber] = await getFileNumber();
    if (isValid === true) {
        fileOpener.openTestFile(pathOfContestDir, validTestNumber);
    }
    else {
        console.error("Wrong test number!!!");
        vscode.window.showErrorMessage("Please enter correct test number!!!");
    }
}

module.exports = editTest;