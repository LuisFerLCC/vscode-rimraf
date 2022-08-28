import path from "path";
import { runTests } from "@vscode/test-electron";

import "./__test__";
import "./__test__/extension.test";

async function main(): Promise<void> {
	try {
		const extensionDevelopmentPath = path.resolve(__dirname, "../../");
		const extensionTestsPath = path.resolve(__dirname, "./__test__/index");
		await runTests({ extensionDevelopmentPath, extensionTestsPath });
	} catch (err) {
		console.error("Failed to run tests");
		process.exit(1);
	}
}

main();
