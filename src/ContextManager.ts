import { ExtensionContext, workspace } from "vscode";

import Logger from "./Logger";

class ContextManager {
	private static _vscodeContext: ExtensionContext;
	private static _enabled = false;

	static get vscodeContext(): ExtensionContext {
		Logger.debug("get VSCode Extension context");
		return ContextManager._vscodeContext;
	}

	static setVscodeContext(newContext: ExtensionContext): void {
		Logger.debug("set VSCode Extension context");
		ContextManager._vscodeContext = newContext;
	}

	static get enabled(): boolean {
		Logger.debug(`get Extension is enabled: ${ContextManager._enabled}`);
		return ContextManager._enabled;
	}

	static setEnabled(newEnabled: boolean): void {
		Logger.debug(`set Extension is enabled: ${newEnabled}`);
		ContextManager._enabled = newEnabled;
	}
}

namespace ContextManager {
	export namespace Config {
		export type DefaultState = "enabled" | "disabled" | "prompt";

		const defaultStateKey = "defaultState";
		const config = workspace.getConfiguration("vscodeRimraf");

		export function getDefaultState(): DefaultState {
			const defaultState: DefaultState = config.get(defaultStateKey, "prompt");

			Logger.debug(`get config Default State: ${defaultState}`);
			return defaultState;
		}

		export async function setDefaultState(newDefaultState: DefaultState): Promise<void> {
			Logger.debug(`set config Default State: ${newDefaultState}`);
			await config.update(defaultStateKey, newDefaultState, true);
		}
	}
}

export default ContextManager;
