// @ts-check

import { readFileSync } from "fs";
import { pathToFileURL } from "url";

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
	minify: true,
	sourcemap: true,

	watch: watchMode,
	plugins: [
		copyPlugin({ src: "./node_modules/empty-trash/lib/", dest: "./dist/lib/" }),

		{
			name: "import.meta.url",

			setup({ onLoad }) {
				onLoad({ filter: /\.js$/, namespace: "file" }, args => {
					let code = readFileSync(args.path, "utf8");
					code = code.replace(/\bimport\.meta\.url\b/g, JSON.stringify(pathToFileURL(args.path)));
					return { contents: code };
				});
			},
		},
	],
}).then(() => {
	if (!watchMode) return stdout.write("Compiled successfully.\n");

	tick();
	return setInterval(tick, 1000);
});
