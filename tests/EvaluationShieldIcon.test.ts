import { render } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import { getCompletionFractionFromSectionTier, mungeChecklistSectionTier } from '../src/lib/utils';
import { fillColors } from '../src/lib/constants';
import EvaluationShieldIcon from '../src/lib/components/EvaluationShieldIcon.svelte';
import data from '../tests/fixtures/evaluatedTools/3d-slicer.json';

describe('EvaluationShieldIcon', () => {
	it('renders without visual regressions', () => {
		const { container } = render(EvaluationShieldIcon, {
			props: {
				fillColor: fillColors.bronze,
				sectionTierCompletionFraction: getCompletionFractionFromSectionTier(
					data.evaluations[0].checklist.testing.bronze
				),
				sectionTierCompletionEvidence: mungeChecklistSectionTier(
					data.evaluations[0].checklist.testing.bronze,
					Number(data.evaluations[0].checklistVersion)
				)
			}
		});

		expect(container.firstChild).toMatchSnapshot();
	});
});
