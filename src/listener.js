const app = require('express')();
const bodyParser = require('body-parser');
const parseProblemData = require('./dataParser.js')
const fileCreator = require('./fileCreator.js')


function listenerConstructor() {
	// This function will start the server and listen to the given port
	// Make sure port is same as mention in the Competitive Companion extension in your browser
	const port = 8080;

	app.use(bodyParser.json());

	app.post('/', (req, res) => {
		const data = req.body;
		var parsedData = parseProblemData(data);
		fileCreator(parsedData);
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