// Originally, this was a TS file: but we run it direct from the command line,
// so we need to disable TS (and its associated eslint rules). As such, types
// have been commented out, rather than removed, for future reference.

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { promises } from 'fs';
import { join } from 'path';
// import type { DataArray } from '../types';

const directories = {
	evaluatedTools: 'src/lib/data/evaluatedTools',
	evaluationSchemas: 'src/lib/data/evaluationSchemas'
};

// async function readDirectoryData(dirPath: string) {
async function readDirectoryData(dirPath) {
	const files = await promises.readdir(dirPath);
	const jsonFiles = files.filter((file) => file.endsWith('.json'));

	return Promise.all(
		jsonFiles.map(async (file) => {
			const filePath = join(dirPath, file);
			try {
				const fileContents = await promises.readFile(filePath, 'utf8');
				return JSON.parse(fileContents);
			} catch (error) {
				console.error(`Error reading file ${filePath}:`, error.message);
				throw error; // rethrow the error to catch it in the outer scope
			}
		})
	);
}

async function generateData() {
	// const data: Record<string, DataArray> = {};
	const data = {};

	for (const [key, dirPath] of Object.entries(directories)) {
		data[key] = await readDirectoryData(dirPath);
	}

	await promises.writeFile('./concat_data.json', JSON.stringify(data, null, 2));
	console.log('Generated concat_data.json successfully.');
}

generateData().catch((err) => {
	console.error('Failed to generate concat_data.json:', err);
	process.exit(1);
});
