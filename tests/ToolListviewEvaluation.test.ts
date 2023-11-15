import { render } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import ToolListviewEvaluation from '../src/lib/components/ToolListviewEvaluation.svelte';
import data from '../tests/fixtures/evaluatedTools/amira.json';

describe('ToolListviewEvaluation', () => {
	it('renders without visual regressions', () => {
		const { container } = render(ToolListviewEvaluation, {
			props: {
				checklist: data.evaluations[0].checklist,
				schemaVersion: Number(data.evaluations[0].checklistVersion)
			}
		});

		expect(container.firstChild).toMatchSnapshot();
	});
});
