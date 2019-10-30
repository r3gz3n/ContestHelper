const vscode = require("vscode");

class Configuration {
    static getSetting(name) {
        return vscode.workspace.getConfiguration('contesthelper', null).get(name);
    }
    static getDirectoryPath() {
        return this.getSetting('directory-path').trim();
    }
}
exports.Configuration = Configuration;