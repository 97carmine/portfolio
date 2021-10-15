import { readFileSync } from "fs";
import { resolve } from "path";

/**
 * @param path The path of the asset mafinest file
 * @param filtering Callback to filter function
 * @returns Return the asset manifest filtered in Array format
 */
const obtainAssetManifest = (
	filtering: (value: [string, unknown]) => boolean
): [string, string | { src: string; integrity: string }][] => {
	const file = resolve(__dirname, "static/asset-manifest.json");
	const data = readFileSync(file, "utf-8");
	const dataFiltered = Object.entries<string | { src: string; integrity: string }>(JSON.parse(data)).filter(filtering);
	return dataFiltered;
};

export { obtainAssetManifest };
