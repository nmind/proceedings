/** @type {import('./$types').EntryGenerator} */
export async function entries() {
	const data = await import('$lib/data.json');

	return data.evaluatedLibraries.map((library) => ({ slug: library.slug }));
}
