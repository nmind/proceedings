import { render } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import EvaluationDetail from '../src/lib/components/EvaluationDetail.svelte';
import data from '../tests/fixtures/evaluatedTools/3d-slicer.json';

describe('EvaluationDetail Component', () => {
	it('renders the evaluation overview', () => {
		const { getByText } = render(EvaluationDetail, {
			props: {
				evaluation: data.evaluations[0]
			}
		});
		expect(getByText('Checklist Version:')).toBeDefined();
		expect(getByText(data.evaluations[0].checklistVersion)).toBeDefined();
		expect(getByText('Tool Version:')).toBeDefined();
		expect(getByText(data.evaluations[0].toolVersion)).toBeDefined();
		expect(getByText('Date:')).toBeDefined();
		expect(getByText(data.evaluations[0].date)).toBeDefined();
		expect(getByText('Evaluator:')).toBeDefined();
		expect(getByText(data.evaluations[0].evaluatorEmail)).toBeDefined();
	});

	it('renders the evaluation checklist', () => {
		const { getAllByText } = render(EvaluationDetail, {
			props: {
				evaluation: data.evaluations[0]
			}
		});
		expect(getAllByText('Testing')).length === 3;
		expect(getAllByText('Infrastructure')).length === 3;
		expect(getAllByText('Documentation')).length === 3;
		expect(getAllByText('Bronze Tier')).length === 3;
		expect(getAllByText('Silver Tier')).length === 3;
		expect(getAllByText('Gold Tier')).length === 3;
	});
});
