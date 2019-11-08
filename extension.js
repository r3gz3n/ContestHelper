const vscode = require('vscode');
const listenerConstructor = require('./src/listener');
const editTest = require('./src/editTest');
const compileAndRun = require('./src/compile');
const getWebView = require('./src/getWebView');
var resultsPanel = null;

function startServer() {
	try {
		listenerConstructor();
		console.log("Listener started successfully!!!");
		vscode.window.showInformationMessage("ContestHelper: Server started successfully!!!");
	} catch (exception) {
		console.error(exception);
		vscode.window.showErrorMessage("ContestHelper: Listener failed to start!!!");
		process.exit(1);
	}

}

function editTestFile() {
	editTest();
}

async function runAllTests() {
	var results = await compileAndRun(-1);
	resultPanel = await getWebView(resultsPanel, results);
	if (resultsPanel !== null)
		resultsPanel.reveal();

	return results;	
			
}

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	// Activating ContestHelper
	console.log('Activating ContestHelper...');
	startServer();
	var editTestFileCommand = vscode.commands.registerCommand('extension.editTestFile', () => editTestFile());

	var runAllTestsCommand = vscode.commands.registerCommand('extension.runAllTests', () => runAllTests());

	context.subscriptions.push(editTestFileCommand);
	context.subscriptions.push(runAllTestsCommand);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}