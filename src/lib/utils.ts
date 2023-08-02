import type { Evaluation } from './types';

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

export function sortEvaluationsByDate(arr: Evaluation[]) {
	return arr.sort((a, b) => {
		return new Date(b.date).getTime() - new Date(a.date).getTime();
	});
}

export function getMostRecentEvaluationSchema(arr: Evaluation[]) {
	return arr.reduce((highest, current) => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore - TS doesn't like the @version property,
		// I believe b/c it's an explicitly string-keyed object
		if (current['@context']['@version'] > highest['@context']['@version']) {
			return current;
		} else {
			return highest;
		}
	}, arr[0]);
}

export function findEvaluationSchemaByVersion(arr: Evaluation[], version: number) {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore - see above
	return arr.find((item) => item['@context']['@version'] === version);
}
