/** @type {import('./$types').EntryGenerator} */
export async function entries() {
	const data = await import('$lib/data/concat_data.json');

	return data.evaluatedTools.map((tool) => ({ slug: tool.slug }));
}
