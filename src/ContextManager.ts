import { ExtensionContext, workspace } from "vscode";

import Logger from "./Logger";

class ContextManager {
	private static _vscodeContext: ExtensionContext;
	private static _enabled = false;

	static get vscodeContext(): ExtensionContext {
		Logger.debug("get VSCode Extension context");
		return this._vscodeContext;
	}

	static setVscodeContext(newContext: ExtensionContext): void {
		Logger.debug("set VSCode Extension context");
		this._vscodeContext = newContext;
	}

	static get enabled(): boolean {
		Logger.debug(`get Extension is enabled: ${this._enabled}`);
		return this._enabled;
	}

	static setEnabled(newEnabled: boolean): void {
		Logger.debug(`set Extension is enabled: ${newEnabled}`);
		this._enabled = newEnabled;
	}
}

namespace ContextManager {
	export namespace Config {
		export type DefaultState = "enabled" | "disabled" | "prompt";

		const defaultStateKey = "defaultState";
		const config = workspace.getConfiguration("vscodeRimraf");

		export function getDefaultState(): DefaultState {
			const defaultState = config.get(defaultStateKey, "prompt") as DefaultState;

			Logger.debug(`get config Default State: ${defaultState}`);
			return defaultState;
		}

		export function setDefaultState(newDefaultState: DefaultState): void {
			Logger.debug(`set config Default State: ${newDefaultState}`);
			config.update(defaultStateKey, newDefaultState, true);
		}
	}
}

export default ContextManager;
