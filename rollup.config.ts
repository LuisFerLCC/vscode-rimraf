import { RollupOptions } from "rollup";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";
import copy from "rollup-plugin-copy";

export default <RollupOptions>{
	input: "./src/extension.ts",

	output: {
		file: "./dist/extension.js",

		format: "commonjs",
		sourcemap: true,
	},

	plugins: [
		nodeResolve(),
		commonjs(),
		typescript(),
		terser(),
		copy({
			targets: [{ src: "./node_modules/empty-trash/lib/**/*", dest: "./dist/lib" }],
		}),
	],
	external: ["vscode"],
	treeshake: true,
};
