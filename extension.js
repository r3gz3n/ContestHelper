const vscode = require('vscode');

function startServer() {
	// This function will start the server and listen to the given port
	// Make sure port is same as mention in the Competitive Companion extension in your browser

	const app = require('express')();
	const bodyParser = require('body-parser');

	const port = 8080;

	app.use(bodyParser.json());

	app.post('/', (req, res) => {
		const data = req.body;

		console.log('Full body:');
		console.log(JSON.stringify(data, null, 4));

		res.sendStatus(200);
	});

	app.listen(port, err => {
		if (err) {
			console.error(err);
			process.exit(1);
		}

		console.log(`Listening on port ${port}`);
	});
}


function startCompetitiveCompanionServer() {
	try {
		startServer();
		vscode.window.showInformationMessage("Contest Helper: Server started successfully!!!");
	}
	catch (exception) {
		console.log(exception);
		vscode.window.showErrorMessage("Contest Helper: Server failed to start!!!");
	}
}


/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "contesthelper" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	startCompetitiveCompanionServer();
	// let disposable = vscode.commands.registerCommand('extension.startCompetitiveCompanionServer', startCompetitiveCompanionServer);
	// context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
