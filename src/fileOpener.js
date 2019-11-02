const vscode = require('vscode');


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

function openTestFile(pathOfInputFile, pathOfOutputFile) {
  vscode.workspace.openTextDocument(pathOfInputFile).then(document => {
    vscode.window.showTextDocument(document, vscode.ViewColumn.Beside);
  });
  vscode.workspace.openTextDocument(pathOfOutputFile).then(document => {
    vscode.window.showTextDocument(document, vscode.ViewColumn.Beside);
  });
}

module.exports = {
  openFile: openFile,
  openFolder: openFolder,
  openTestFile: openTestFile
};