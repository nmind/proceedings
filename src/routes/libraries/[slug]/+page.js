/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
	const data = await import('$lib/data.json');
	const library = data.evaluatedLibraries.find((library) => library.slug === params.slug);
	if (!library) {
		return { status: 404 };
	} else {
		return library;
	}
}
