// @ts-check

import { build } from "esbuild";
import { copyPlugin } from "@sprout2000/esbuild-copy-plugin";

const { stdout } = process;
const watchMode = process.argv.includes("--watch");

const banner = `/**
 * VSCode Rimraf
 * Visual Studio Code extension by LuisFerLCC
 * luisferlcc.vscode-rimraf
 */
`;

let dots = 0;

function tick() {
	dots = (dots + 1) % 3;

	console.clear();
	stdout.write(`ESBuild is active.
Watching${Array(dots + 1)
		.fill(".")
		.join("")}`);
}

build({
	entryPoints: ["./src/extension.ts"],
	platform: "node",
	external: ["vscode"],

	outfile: "./dist/extension.js",
	banner: {
		js: banner,
	},
	bundle: true,
	treeShaking: true,
	minify: true,
	sourcemap: true,

	watch: watchMode,
	plugins: [copyPlugin({ src: "./src/lib/", dest: "./dist/lib/" })],
}).then(() => {
	if (!watchMode) return stdout.write("Compiled successfully.\n");

	tick();
	return setInterval(tick, 1000);
});
