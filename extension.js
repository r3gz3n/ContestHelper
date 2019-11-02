const vscode = require('vscode');
const listenerConstructor = require('./src/listener');
const editTest = require('./src/editTest');

function startServer() {
	try {
		listenerConstructor();
		console.log("Listener started successfully!!!");
		vscode.window.showInformationMessage("ContestHelper: Listener started successfully!!!");
	} catch (exception) {
		console.error(exception);
		vscode.window.showErrorMessage("ContestHelper: Listener failed to start!!!");
		process.exit(1);
	}

}

function editTestFile() {
	editTest();
}

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	// Activating ContestHelper
	console.log('Activating ContestHelper...');
	startServer();
	let disposable_2 = vscode.commands.registerCommand('extension.editTestFile', function () {
		editTestFile();
	});
	context.subscriptions.push(disposable_2);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}