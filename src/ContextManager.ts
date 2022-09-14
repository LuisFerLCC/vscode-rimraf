import { ExtensionContext } from "vscode";

let _context: ExtensionContext;

namespace ContextManager {
	export function get(): ExtensionContext {
		return _context;
	}

	export function set(newContext: ExtensionContext): void {
		_context = newContext;
	}
}

export default ContextManager;
