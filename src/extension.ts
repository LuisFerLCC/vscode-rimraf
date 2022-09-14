import { commands, Disposable, ExtensionContext, window } from "vscode";
import ContextManager from "./ContextManager";
import { CustomProvider } from "./CustomProvider";

export function activate(context: ExtensionContext): void {
	ContextManager.set(context);

	const disposables: Disposable[] = [
		commands.registerCommand("vscode-rimraf.helloWorld", () => {
			window.showInformationMessage("Hello World from VSCode rimraf!");
		}),

		window.createTreeView("testTreeView", {
			treeDataProvider: new CustomProvider(),
		}),
	];

	context.subscriptions.push(...disposables);
}

export function deactivate(): void {
	return;
}
