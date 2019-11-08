const vscode = require('vscode');
const getWebViewContent = require('./getWebViewContent');

function getWebView(resultsPanel, results) {
    var panel = resultsPanel;
    if (panel === null) {
        panel = vscode.window.createWebviewPanel("results", "Result", vscode.ViewColumn.Two);
    }
    panel.webview.html = getWebViewContent(results);
    panel.onDidDispose(() => {
        panel = null;
    });
    return panel;
}

module.exports = getWebView;