import { commands, ExtensionContext, window, workspace } from "vscode";
import emptyTrash from "empty-trash";

import ContextManager from "./ContextManager";

export async function activate(context: ExtensionContext): Promise<void> {
	ContextManager.setVscodeContext(context);

	const defaultState = ContextManager.Config.getDefaultState();

	switch (defaultState) {
		case "enabled": {
			ContextManager.setEnabled(true);
			break;
		}

		case "prompt": {
			await window
				.showWarningMessage(
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
				)
				.then(answer => {
					if (!answer) return;
					if (answer !== "Enable this time")
						ContextManager.Config.setDefaultState(`${answer.toLowerCase()}d` as ContextManager.Config.DefaultState);

					ContextManager.setEnabled(answer.replace(" this time", "") === "Enable");
				});

			break;
		}
	}

	if (ContextManager.enabled) emptyTrash();

	ContextManager.vscodeContext.subscriptions.push(
		workspace.onDidDeleteFiles(() => {
			if (ContextManager.enabled) emptyTrash();
		}),

		commands.registerCommand("vscode-rimraf.toggle", () => {
			ContextManager.setEnabled(!ContextManager.enabled);
			window.showInformationMessage(`VSCode Rimraf is now ${ContextManager.enabled ? "en" : "dis"}abled.`);
		})
	);
}

export function deactivate(): void {
	return;
}
