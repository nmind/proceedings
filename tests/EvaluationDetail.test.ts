import { render, cleanup } from '@testing-library/svelte';
import { describe, it, expect, afterEach } from 'vitest';
import EvaluationDetail from '../src/lib/components/EvaluationDetail.svelte';
import data from '../tests/fixtures/evaluatedTools/3d-slicer.json';

describe('EvaluationDetail Component', () => {
	afterEach(cleanup);

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
		const { getAllByRole } = render(EvaluationDetail, {
			props: {
				evaluation: data.evaluations[0]
			}
		});

		const checklistHeadings = [
			'Testing',
			'Infrastructure',
			'Documentation',
			'Bronze Tier',
			'Silver Tier',
			'Gold Tier'
		];

		checklistHeadings.forEach((text) => {
			const headings = getAllByRole('heading', { name: text });
			expect(headings).length === 3;
		});
	});
});
