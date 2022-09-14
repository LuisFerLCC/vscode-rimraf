import { RollupOptions } from "rollup";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";

export default <RollupOptions>{
	input: "./src/extension.ts",

	output: {
		file: "./dist/extension.js",
		name: "Extension bundle",

		format: "commonjs",
		sourcemap: true,
	},

	plugins: [nodeResolve(), typescript(), terser()],
	external: ["vscode"],
	treeshake: true,
};
