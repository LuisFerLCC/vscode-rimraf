import { context } from "esbuild";
import copy from "@sprout2000/esbuild-copy-plugin";

const { stdout } = process;
const { copyPlugin } = copy;

const banner = `/**
 * VSCode Rimraf
 * Visual Studio Code extension by LuisFerLCC
 * luisferlcc.vscode-rimraf
 *
 * https://github.com/luisferlcc/vscode-rimraf/blob/master/LICENSE
 */
`;

let dots = 0;

function tick() {
	dots = (dots % 3) + 1;

	console.clear();

	stdout.write(`ESBuild is active.
Watching${Array(dots).fill(".").join("")}`);
}

context({
	tsconfig: "./tsconfig.base.json",

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
	sourcesContent: false,

	plugins: [copyPlugin({ src: "./src/lib/", dest: "./dist/lib/" })],
}).then(context => {
	if (!process.argv.includes("--watch")) {
		stdout.write("Compiled successfully.\n");
		context.rebuild();
		return context.dispose();
	}

	context.watch().then(() => {
		tick();
		return setInterval(tick, 1000);
	});

	return;
});
