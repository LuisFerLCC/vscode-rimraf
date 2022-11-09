/**
 * Source: NPM empty-trash
 * * Reimplemented to use __dirname instead of import.meta.url since ESBuild does not handle the latter correctly.
 */

import { execFile as _execFile } from "child_process";
import { existsSync } from "fs";
import { rm } from "fs/promises";
import path from "path";
import { promisify } from "util";

import { window } from "vscode";
import { runJxa } from "run-jxa";
import xdgTrashdir from "xdg-trashdir";
import pFilter from "p-filter";

import Logger from "./Logger";

const execFile = promisify(_execFile);

async function _emptyLinuxTrashes(): Promise<void[]> {
	const trashDirs = await pFilter(await xdgTrashdir.all(), existsSync);
	return Promise.all(trashDirs.map(trashDir => rm(trashDir, { recursive: true })));
}

// ! DO NOT install empty-trash package. Reasons stated on line 3.
async function _emptyTrash(): Promise<any> {
	switch (process.platform) {
		case "darwin":
			return runJxa(`
				const finder = Application("Finder");
				if (finder.trash.items.length) finder.empty();
			`);

		case "win32":
			return execFile(path.join(__dirname, "lib/empty-recycle-bin.exe"));
	}

	return _emptyLinuxTrashes();
}

export default async function emptyTrash(): Promise<void> {
	Logger.debug("emptyTrash()");

	await _emptyTrash()
		.then(() => Logger.info("Trash successfully emptied."))
		.catch(error => {
			Logger.error(error);
			window.showErrorMessage("An error occurred while trying to empty the trash.");
		});
}
