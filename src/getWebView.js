const vscode = require('vscode');
const getWebViewContent = require('./getWebViewContent');

function getWebView(panels, results) {
    if (panels.resultsPanel === null) {
        panels.resultsPanel = vscode.window.createWebviewPanel("results", "Result", vscode.ViewColumn.Beside);
    }
    panels.resultsPanel.webview.html = getWebViewContent(results);
    panels.resultsPanel.onDidDispose(() => {
        panels.resultsPanel.dispose();
        panels.resultsPanel = null;
    });
}

module.exports = getWebView;