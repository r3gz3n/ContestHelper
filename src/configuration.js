const vscode = require("vscode");

class Configuration {
    static getSetting(name) {
        return vscode.workspace.getConfiguration('contesthelper', null).get(name);
    }

    static getDirectoryPath() {
        return this.getSetting('directory-path').trim();
    }

    static getCompilerFlags() {
        return this.getSetting('compiler-flags').trim();
    }

    static getCompiler() {
        return this.getSetting('cpp-compiler').trim();
    }

    static getPortNumber() {
        return this.getSetting('port-number').trim();
    }

    static getCodeSnippetPath() {
        return this.getSetting('code-snippet').trim();
    }
}
exports.Configuration = Configuration;