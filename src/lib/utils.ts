import type { Evaluation, EvaluationSchema, Library } from './types';
import data from './data.json';

export function sortEvaluationsByDate(arr: Evaluation[]) {
	return arr.sort((a, b) => {
		return new Date(b.date).getTime() - new Date(a.date).getTime();
	});
}

export function getMostRecentEvaluation(evaluations: Evaluation[]): Evaluation | null {
	if (evaluations.length === 0) {
		return null;
	} else if (evaluations.length === 1) {
		return evaluations[0];
	} else {
		return evaluations.reduce((mostRecentEvaluationSoFar, currentEvaluation) => {
			// If there is no most recent evaluation so far, then the current evaluation is the most recent
			// NB: can't use optional chaining (?.) because `date` is a non-numerically-coalescable string,
			// which will silently return `false` for comparison-operators against `null` or `undefined`
			//  #WeLoveJavascript
			if (!mostRecentEvaluationSoFar || mostRecentEvaluationSoFar.date < currentEvaluation.date) {
				return currentEvaluation;
			} else {
				return mostRecentEvaluationSoFar;
			}
		});
	}
}

export function mungeChecklistValue(sectionTier: Record<string, boolean>) {
	const sectionTierMatrix = Object.entries(sectionTier);
	const positiveCount = sectionTierMatrix.filter(([, value]) => value).length;
	return { numerator: positiveCount, denominator: sectionTierMatrix.length };
}

export function getSectionTierPromptById(schema: EvaluationSchema, id: string) {
	const matchingItem = schema.items.find((item) => item.id === id);
	return matchingItem ? matchingItem.prompt : null;
}

export function mungeChecklistSectionTier(
	sectionTier: Record<string, boolean>,
	schemaVersion: number
) {
	const mungedData = [];
	const matchingSchema = findEvaluationSchemaByVersion(data.evaluationSchemas, schemaVersion);

	if (matchingSchema) {
		for (const [itemId, itemValue] of Object.entries(sectionTier)) {
			const prompt = getSectionTierPromptById(matchingSchema, itemId);

			if (prompt) {
				mungedData.push({
					prompt,
					value: itemValue
				});
			}
		}
	} else {
		throw new Error('No matching schema found!');
	}

	return mungedData;
}

export function findEvaluationSchemaByVersion(arr: EvaluationSchema[], version: number) {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore - TS doesn't like the string-bracket-lookups here, but it works fine
	return arr.find((item) => item['@context']['@version'] === version);
}

export function getLibraryUrlByTextDescriptor(library: Library, urlText: string) {
	return library.urls.find((url: Record<string, string>) => url.text === urlText);
}

export async function filterLibraryData(
	textQuery: string,
	tagQuery: string,
	sectionTierQuery: string[]
) {
	const data = await import('$lib/data.json');
	let ongoingFilteredLibraries = data.evaluatedLibraries;

	// first filter by sectionTier completion
	if (sectionTierQuery.length) {
		sectionTierQuery.map((completedSectionTier) => {
			const [completedSection, completedTier] = completedSectionTier.split('-');

			ongoingFilteredLibraries = ongoingFilteredLibraries.filter((library) => {
				const mostRecentEvaluation = getMostRecentEvaluation(library.evaluations);
				const currentSectionTierItems =
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-ignore - TS doesn't like the string-bracket-lookups here, but it works fine
					mostRecentEvaluation.checklist[completedSection][completedTier];
				return Object.values(currentSectionTierItems).every((item) => item);
			});
		});
	}

	// then filter by tag
	if (tagQuery) {
		ongoingFilteredLibraries = ongoingFilteredLibraries.filter((item) =>
			item.tags.some((tag) => tag.toLowerCase().includes(tagQuery.toLowerCase()))
		);
	}
	// then filter by name
	if (textQuery) {
		ongoingFilteredLibraries = ongoingFilteredLibraries.filter(
			(item) => item.name.toLowerCase().includes(textQuery.toLowerCase())
			// @TODO: ask NMIND team if we also want to search by description:
			// || item.description.toLowerCase().includes(textQuery.toLowerCase())
		);
	}

	return ongoingFilteredLibraries;
}
