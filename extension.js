const vscode = require('vscode');
const listenerConstructor = require('./src/listener');
const editTest = require('./src/editTest');
const compileAndRun = require('./src/compile');
const getWebView = require('./src/getWebView');
const constants = require('./src/constants');
var panels = {resultsPanel: null};

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

function generateWebView(results) {
	getWebView(panels, results);
	if (panels.resultsPanel !== null)
		panels.resultsPanel.reveal();
}

async function runTests() {
	var results = await compileAndRun(constants.RUN_ALL);
	generateWebView(results);
}


async function runSpecificTest() {
	var results = await compileAndRun(constants.RUN_SPECIFIC);
	generateWebView(results);
}

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	// Activating ContestHelper
	console.log('Activating ContestHelper...');
	startServer();
	var editTestFileCommand = vscode.commands.registerCommand('extension.editTestFile', () => editTestFile());

	var runAllTestsCommand = vscode.commands.registerCommand('extension.runAllTests', () => runTests());

	var runSpecificTestCommand = vscode.commands.registerCommand('extension.runSpecificTest', () => runSpecificTest());

	context.subscriptions.push(editTestFileCommand);
	context.subscriptions.push(runAllTestsCommand);
	context.subscriptions.push(runSpecificTestCommand);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}