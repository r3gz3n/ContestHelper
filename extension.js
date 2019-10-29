const vscode = require('vscode');
const listenerConstructor = require('./src/listenerToCompetitiveCompanion.js');


function startCompetitiveCompanionServer() {
	try {
		listenerConstructor();
		console.log("Listener started successfully!!!");
		vscode.window.showInformationMessage("ContestHelper: Listener started successfully!!!");
	}
	catch (exception) {
		console.error(exception);
		vscode.window.showErrorMessage("ContestHelper: Listener failed to start!!!");
		process.exit(1);
	}
	
}


/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	// Activating ContestHelper
	console.log('Activating ContestHelper...');
	startCompetitiveCompanionServer();
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
