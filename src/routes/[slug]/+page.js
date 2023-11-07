/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
	const data = await import('$lib/data/concat_data.json');
	const tool = data.evaluatedTools.find((tool) => tool.slug === params.slug);
	if (!tool) {
		return { status: 404 };
	} else {
		return tool;
	}
}
