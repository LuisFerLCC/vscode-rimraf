import vscode from "vscode";

export function activate(context: vscode.ExtensionContext): void {
	console.log('Congratulations, your extension "vscode-rimraf" is now active!');

	const disposable = vscode.commands.registerCommand("vscode-rimraf.helloWorld", () => {
		vscode.window.showInformationMessage("Hello World from VSCode rimraf!");
	});

	context.subscriptions.push(disposable);
}

export function deactivate(): void {
	return;
}
