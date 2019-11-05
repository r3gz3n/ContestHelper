const vscode = require('vscode');
const constants = require('./constants');
const path = require('path');
const getJsonConfig = require('./getJsonConfig');
const fileCreator = require('./fileCreator');


function openFile(pathOfSourceFile) {
  vscode.workspace.openTextDocument(pathOfSourceFile).then(document => {
    vscode.window.showTextDocument(document, {
      preview: false
    });
  });
}

function openFolder(pathOfFolder) {
 // TODO(r3gz3n): Figure out how to open a folder in vscode 
}

async function openTestFile(problemDir, testNumber) {
  var pathOfInputFile = path.join(problemDir, `in${testNumber}` + constants.TXT);
  var pathOfOutputFile = path.join(problemDir, `out${testNumber}` + constants.TXT);
  var config = await getJsonConfig(problemDir);
  fileCreator.writeIntoFile(pathOfInputFile, config.tests[testNumber].input);
  fileCreator.writeIntoFile(pathOfOutputFile, config.tests[testNumber].output);
  vscode.workspace.openTextDocument(pathOfInputFile).then(document => {
    vscode.window.showTextDocument(document, vscode.ViewColumn.Beside);
    vscode.workspace.onDidSaveTextDocument((document) => {
      var text = document.getText();
      config.tests[testNumber].input = text;
    });
    vscode.workspace.onDidCloseTextDocument((document) => {
      fileCreator.deleteFile(pathOfInputFile);
    });
  });
  vscode.workspace.openTextDocument(pathOfOutputFile).then(document => {
    vscode.window.showTextDocument(document, vscode.ViewColumn.Beside);
    vscode.workspace.onDidSaveTextDocument((document) => {
      var text = document.getText();
      config.tests[testNumber].output = text;
      vscode.workspace.onDidCloseTextDocument((document) => {
        fileCreator.deleteFile(pathOfInputFile);
      });
    });
  });
}

module.exports = {
  openFile: openFile,
  openFolder: openFolder,
  openTestFile: openTestFile
};