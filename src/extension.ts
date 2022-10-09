import vscode, { commands, ExtensionContext, window, workspace } from "vscode";

import ContextManager from "./ContextManager";
import emptyTrash from "./emptyTrash";
import Logger from "./Logger";

const PackageJSON = require("../package.json");

const horizontalLine = "=".repeat(70);

export async function activate(context: ExtensionContext): Promise<void> {
	Logger.clear();
	Logger.info(
		horizontalLine,
		`Visual Studio Code version: ${vscode.version}`,
		`VSCode Rimraf version:      ${PackageJSON.version}`,
		`Platform:                   ${process.platform}`,
		`Workspace root directory:   ${Logger.rootDirectory?.fsPath ?? "Workspace not open"}`,
		horizontalLine
	);

	ContextManager.setVscodeContext(context);

	const defaultState = ContextManager.Config.getDefaultState();

	switch (defaultState) {
		case "enabled": {
			ContextManager.setEnabled(true);
			break;
		}

		case "prompt": {
			Logger.debug("vscode.window.showWarningMessage()");

			const answer = await window.showWarningMessage(
				"Enabling VSCode Rimraf will empty the trash.",
				{
					modal: true,
					detail:
						"VSCode Rimraf works by automatically emptying the trash every time you delete a file. Please restore " +
						"any important files you may have in the trash before enabling VSCode Rimraf.",
				},
				"Enable",
				"Enable this time",
				"Disable"
			);

			Logger.info(`Warning dialog box answer: ${answer ?? "Cancel"}`);

			if (!answer) break;
			if (answer !== "Enable this time")
				ContextManager.Config.setDefaultState(`${answer.toLowerCase()}d` as ContextManager.Config.DefaultState);

			ContextManager.setEnabled(answer.replace(" this time", "") === "Enable");
			break;
		}
	}

	if (ContextManager.enabled) emptyTrash();

	ContextManager.vscodeContext.subscriptions.push(
		workspace.onDidDeleteFiles(() => {
			Logger.debug("workspace.onDidDeleteFiles(...)");
			if (ContextManager.enabled) emptyTrash();
		}),

		commands.registerCommand("vscode-rimraf.toggle", () => {
			Logger.debug("command toggle");
			ContextManager.setEnabled(!ContextManager.enabled);
			window.showInformationMessage(`VSCode Rimraf is now ${ContextManager.enabled ? "enabled" : "disabled"}.`);
		}),

		commands.registerCommand("vscode-rimraf.empty-trash", async () => {
			Logger.debug("command empty-trash");
			await emptyTrash();
			window.showInformationMessage("The trash is now empty.");
		}),

		commands.registerCommand("vscode-rimraf.save-logs", () => {
			Logger.debug("command save-logs");
			if (!Logger.rootDirectory) {
				const message = "The log file cannot be saved; no workspace open.";

				Logger.error(message);
				return window.showErrorMessage(message);
			}

			Logger.save();
			return window.showInformationMessage(`Debug logs will be saved at "${Logger.rootDirectory}\\vscode-rimraf.debug.log".`);
		})
	);
	Logger.info("The commands have been registered.");
}

export function deactivate(): void {
	return;
}
