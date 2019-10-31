const vscode = require('vscode');
const constants = require('./constants.js');



function openFile (pathOfSourceFile) {
    console.log(`code "${pathOfSourceFile}"`);
    vscode.workspace.openTextDocument(pathOfSourceFile).then(document => {
		vscode.window.showTextDocument(document, {preview: false});
	});
}

module.exports = openFile;