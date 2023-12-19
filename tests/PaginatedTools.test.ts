import { render, cleanup, fireEvent, screen, waitFor } from '@testing-library/svelte';
import { describe, it, expect, afterEach } from 'vitest';
import PaginatedTools from '../src/lib/components/PaginatedTools.svelte';

const firstThreeToolsWithDockerTag = ['BET', 'FEAT', 'FLIRT'];
const firstFiveToolsByName = [
	'3D Slicer',
	'Amira',
	'Analysis of Dysfunctional NeuroImages (ADNI)',
	'Analysis of Functional NeuroImages (AFNI)',
	'Analyze'
];
const secondFiveToolsByName = ['ANTs', 'antspy', 'BASIL', 'BET', 'BIANCA'];
const firstFiveToolsByEvalDate = [
	'SCHMRIB Software Library (SCHSL)',
	'SIENA',
	'3D Slicer',
	'CamBA',
	'FreeSurfer'
];

describe('PaginatedTools always', () => {
	afterEach(cleanup);

	it('should render the search inputs', () => {
		render(PaginatedTools);
		expect(screen.getByText('Search by text:')).toBeDefined();
		expect(screen.getByText('Search by tag:')).toBeDefined();
	});

	it('should render the section and tier completion filter', () => {
		render(PaginatedTools);
		expect(screen.getByText('Search by minimum standard:')).toBeDefined();
	});
});

describe('PaginatedTools when no data is provided', () => {
	afterEach(cleanup);

	it('should render the no-matches text', () => {
		render(PaginatedTools);
		expect(screen.getByText('No matching tools found.')).toBeDefined();
	});
});

describe('PaginatedTools when data is provided', () => {
	afterEach(cleanup);

	it('should render the pagination buttons', async () => {
		render(PaginatedTools);

		// async b/c the pagination buttons are only rendered
		// after the data.json manifest has been read && parsed
		await waitFor(() => {
			expect(screen.getByText('Previous')).toBeDefined();
			expect(screen.getByText('Next')).toBeDefined();
		});
	});

	it('should filter tools by search query', async () => {
		render(PaginatedTools);
		await waitFor(() => {
			expect(screen.getByText('Previous')).toBeDefined();
		});

		const input = screen.getByPlaceholderText('Enter tool name/description');
		fireEvent.input(input, { target: { value: 'CamBA' } });

		await waitFor(() => {
			// i.e. there is now a tool-card visible with the name CamBA
			//  (it typically does not appear in the first 5 tools)
			expect(screen.getByRole('heading', { name: /CamBA/ })).toBeDefined();
		});
	});

	it('should filter tools by metadata query', async () => {
		render(PaginatedTools);
		await waitFor(() => {
			expect(screen.getByText('Previous')).toBeDefined();
		});

		const input = screen.getByPlaceholderText('Enter tool metadata');
		fireEvent.input(input, { target: { value: 'docker' } });

		await waitFor(() => {
			expect(screen.getAllByText('docker')).length > 1;
		});

		firstThreeToolsWithDockerTag.forEach((tool) => {
			expect(screen.getByRole('heading', { name: tool })).toBeDefined();
		});
	});

	it('should filter tools by section and tier completion', async () => {
		render(PaginatedTools);
		await waitFor(() => {
			expect(screen.getByText('Previous')).toBeDefined();
		});

		const selectElement = screen.getByLabelText('Documentation') as HTMLSelectElement;
		fireEvent.change(selectElement, { target: { value: 'gold' } });

		await waitFor(() => {
			screen.getByLabelText('Sort by:');

			// i.e. there is now a tool-card visible with the name NiPy
			//  (it typically does not appear in the first 5 tools)
			expect(screen.getByRole('heading', { name: /NiPy/ })).toBeDefined();
		});
	});

	it('should sort tools by sorting query', async () => {
		render(PaginatedTools);
		await waitFor(() => {
			expect(screen.getByText('Previous')).toBeDefined();
		});
		firstFiveToolsByName.forEach((tool) => {
			expect(screen.getByRole('heading', { name: tool })).toBeDefined();
		});

		const select = screen.getByLabelText('Sort by:');
		fireEvent.change(select, { target: { value: 'Most-Recent Evaluation' } });

		await waitFor(() => {
			firstFiveToolsByEvalDate.forEach((tool) => {
				expect(screen.getByRole('heading', { name: tool })).toBeDefined();
			});
		});
	});

	it('should paginate tools', async () => {
		render(PaginatedTools);

		await waitFor(() => {
			expect(screen.getByText('Previous')).toBeDefined();
			expect(screen.getByText('Next')).toBeDefined();
		});

		firstFiveToolsByName.forEach((tool) => {
			expect(screen.getByRole('heading', { name: tool })).toBeDefined();
		});

		const nextButton = screen.getByText('Next');
		fireEvent.click(nextButton);

		await waitFor(() => {
			secondFiveToolsByName.forEach((tool) => {
				expect(screen.getByRole('heading', { name: tool })).toBeDefined();
			});
		});
	});
});
