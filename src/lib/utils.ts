import tippy from 'tippy.js';

import type { Evaluation, EvaluationSchema, Tool } from './types';
import type { Props } from 'tippy.js/index.d.ts';

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

export function getCompletionFractionFromSectionTier(sectionTier: Record<string, boolean>) {
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

export function getToolUrlByTextDescriptor(tool: Tool, urlText: string) {
	return tool.urls.find((url: Record<string, string>) => url.text === urlText);
}

function filterTagsByExactQueryMatchesOnly(tools: Tool[], tagQueries: string[]) {
	tagQueries.map((tagQuery) => {
		tools = tools.filter((item) =>
			item.tags.some((tag) => tag.toLowerCase() === tagQuery.toLowerCase())
		);
	});

	return tools;
}

function filterTagsWithFinalQueryInclusiveMatching(tools: Tool[], tagQueries: string[]) {
	const exactMatchQueries = tagQueries.slice(0, -1);
	const inclusiveMatchQuery = tagQueries[tagQueries.length - 1];

	// first filter by exact matches on all known-to-be-complete tags
	exactMatchQueries.map((tagQuery) => {
		tools = tools.filter((item) =>
			item.tags.some((tag) => tag.toLowerCase() === tagQuery.toLowerCase())
		);
	});

	// then filter by inclusive match on final tag, in case the user isn't done typing
	tools = tools.filter((item) =>
		item.tags.some((tag) => tag.toLowerCase().includes(inclusiveMatchQuery.toLowerCase()))
	);

	return tools;
}

export async function filterToolData(
	textQuery: string,
	tagQuery: string,
	sectionTierQuery: string[]
) {
	const data = await import('$lib/data.json');
	let ongoingFilteredTools = data.evaluatedTools;
	let tagFilterFunction = filterTagsWithFinalQueryInclusiveMatching;

	// first filter by sectionTier completion
	if (sectionTierQuery.length) {
		sectionTierQuery.map((completedSectionTier) => {
			const [completedSection, completedTier] = completedSectionTier.split('-');

			ongoingFilteredTools = ongoingFilteredTools.filter((tool) => {
				const mostRecentEvaluation = getMostRecentEvaluation(tool.evaluations);
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
		if (tagQuery.endsWith(',')) {
			tagFilterFunction = filterTagsByExactQueryMatchesOnly;
		}

		// split on commas, then remove any empty strings and leading-or-trailing spaces
		const tagQueries = tagQuery
			.split(',')
			.flatMap((tagQuery) => (tagQuery.trim() ? [tagQuery.trim()] : []));

		ongoingFilteredTools = tagFilterFunction(ongoingFilteredTools, tagQueries);
	}

	// then filter by name
	if (textQuery) {
		ongoingFilteredTools = ongoingFilteredTools.filter(
			(item) => item.name.toLowerCase().includes(textQuery.toLowerCase())
			// @TODO: ask NMIND team if we also want to search by description:
			// || item.description.toLowerCase().includes(textQuery.toLowerCase())
		);
	}

	return ongoingFilteredTools;
}

// Stolen with no apologies from
// https://dev.to/danawoodman/svelte-quick-tip-using-actions-to-integrate-with-javascript-libraries-tippy-tooltips-2m94
export function tooltip(node: HTMLElement, params: { content?: string; allowHTML?: boolean }) {
	// Determine the title to show
	const custom = params.content;
	const title = node.title;
	const label = node.getAttribute('aria-label');
	const finalContent = custom || title || label || '';

	// Ensure the "aria-label" attribute is set:
	// https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-label_attribute
	if (!label) node.setAttribute('aria-label', finalContent);

	// Clear out the HTML title attribute; we don't want the default behavior showing up on hover.
	node.title = '';

	// Support any of the Tippy props by forwarding all "params":
	// https://atomiks.github.io/tippyjs/v6/all-props/
	const tip = tippy(node, { ...params, content: finalContent });

	return {
		// If the props change, update the Tippy instance:
		update: (newParams: Props) => tip.setProps({ ...newParams, content: finalContent }),

		// Clean up the Tippy instance on unmount:
		destroy: () => tip.destroy()
	};
}
