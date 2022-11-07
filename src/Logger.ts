import { Uri, window, workspace } from "vscode";

namespace Logger {
	type ErrorLevel = "debug" | "info" | "warn" | "error";
	type LogMessage = [ErrorLevel, string];
	type JsonType =
		| bigint
		| boolean
		| number
		| string
		| null
		| JsonType[]
		| {
				[key: string]: JsonType;
		  };

	const _outputChannel = window.createOutputChannel("VSCode Rimraf");
	const _fs = workspace.fs;
	const _lines: string[] = [];

	export const rootDirectory = workspace.workspaceFolders?.[0]?.uri;

	let _logFileUri: Uri | undefined = undefined;
	let _saveLogs = false;

	function _print(...newLines: string[]): void {
		_lines.push(...newLines);
		newLines.forEach(line => _outputChannel.appendLine(line));

		if (!rootDirectory) return;

		if (!_logFileUri) _logFileUri = Uri.file(`${rootDirectory.path}/vscode-rimraf.debug.log`);
		if (_saveLogs) _fs.writeFile(_logFileUri, Buffer.from(_lines.join("\r\n")));
	}

	function _log(...messages: LogMessage[]): void {
		_print(...messages.map(message => `[${message[0]}] [${new Date().toISOString()}] ${message[1]}`));
	}

	export function debug(...items: JsonType[]): void {
		_log(...items.map(item => ["debug", typeof item === "string" ? item : JSON.stringify(item)] as LogMessage));
	}

	export function info(...messages: string[]): void {
		_log(...messages.map(message => ["info", message] as LogMessage));
		messages.forEach(message => console.log(message));
	}

	export function warn(...warnings: string[]): void {
		_log(...warnings.map(warning => ["warn", warning] as LogMessage));
		warnings.forEach(warning => console.warn(warning));
	}

	export function error(...errors: (string | Error)[]): void {
		_log(...errors.map(error => ["error", error instanceof Error ? error.stack ?? error.message : error] as LogMessage));
		errors.forEach(error => console.error(error));
	}

	export function refresh(): void {
		_print();
	}

	export function clear(): void {
		refresh();

		if (_logFileUri) _fs.delete(_logFileUri);
		_outputChannel.clear();
		console.clear();
	}

	export function save(): void {
		_saveLogs = true;
		debug(`set _saveLogs: ${_saveLogs}`);
		refresh();
	}
}

export default Logger;
