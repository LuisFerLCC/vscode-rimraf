import { window } from "vscode";
import _emptyTrash from "empty-trash";

import Logger from "./Logger";

export default async function emptyTrash(): Promise<void> {
	Logger.debug("emptyTrash()");
	await _emptyTrash()
		.then(() => Logger.info("Trash successfully emptied."))
		.catch(error => {
			Logger.error(error);
			window.showErrorMessage("An error occurred while trying to empty the trash.");
		});
}
