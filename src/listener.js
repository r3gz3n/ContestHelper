const app = require('express')();
const bodyParser = require('body-parser');
const parseProblemData = require('./dataParser');
const fileCreator = require('./fileCreator');
const fileOpener = require('./fileOpener');
const configuration = require('./configuration');

function listenerConstructor() {
	// This function will start the server and listen to the given port
	// Make sure port is same as mention in the Competitive Companion extension in your browser
	const port = configuration.Configuration.getPortNumber();

	app.use(bodyParser.json());

	app.post('/', (req, res) => {
		const data = req.body;
		var parsedData = parseProblemData(data);
		const [pathOfSourceFile, pathOfContestDir] = fileCreator.generateFiles(parsedData);
		if (pathOfSourceFile)
			fileOpener.openFile(pathOfSourceFile);
		else 
			console.error("Unable to open the source file!!!");
		if (pathOfContestDir) 
			fileOpener.openFolder(pathOfContestDir);
		else
			console.error("Unable to open the contest directory!!!")
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

module.exports = listenerConstructor;