import { ExtensionContext, workspace } from "vscode";

class ContextManager {
	private static _vscodeContext: ExtensionContext;
	private static _enabled = false;

	static get vscodeContext(): ExtensionContext {
		return this._vscodeContext;
	}

	static setVscodeContext(newContext: ExtensionContext): void {
		this._vscodeContext = newContext;
	}

	static get enabled(): boolean {
		return this._enabled;
	}

	static setEnabled(newEnabled: boolean): void {
		this._enabled = newEnabled;
	}
}

namespace ContextManager {
	export namespace Config {
		export type DefaultState = "enabled" | "disabled" | "prompt";

		const defaultStateKey = "defaultState";
		const config = workspace.getConfiguration("vscodeRimraf");

		export function getDefaultState(): DefaultState {
			return config.get(defaultStateKey, "prompt") as DefaultState;
		}

		export function setDefaultState(newDefaultState: DefaultState): void {
			config.update(defaultStateKey, newDefaultState);
		}
	}
}

export default ContextManager;
