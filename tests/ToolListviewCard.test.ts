import { render, cleanup, fireEvent, screen } from '@testing-library/svelte';
import { describe, it, expect, afterEach, vi } from 'vitest';
import ToolListviewCard from '../src/lib/components/ToolListviewCard.svelte';
import data from '../tests/fixtures/evaluatedTools/amira.json';

describe('ToolListviewCard', () => {
	afterEach(cleanup);

	it('should render tool name', () => {
		render(ToolListviewCard, {
			props: {
				tool: data,
				setMetadataQuery: () => null
			}
		});
		expect(screen.getByText('Amira')).toBeDefined();
	});

	it('should render tool URL', () => {
		render(ToolListviewCard, {
			props: {
				tool: data,
				setMetadataQuery: () => null
			}
		});
		expect(screen.getByText('github.com/amira')).toBeDefined();
	});

	it('should render tool tags', () => {
		render(ToolListviewCard, {
			props: {
				tool: data,
				setMetadataQuery: () => null
			}
		});
		expect(screen.getByText('numpy')).toBeDefined();
		expect(screen.getByText('mrs')).toBeDefined();
	});

	it('should fire a setMetadataQuery callback when a tag is clicked', async () => {
		const setMetadataQueryMock = vi.fn();
		render(ToolListviewCard, {
			props: {
				tool: data,
				setMetadataQuery: setMetadataQueryMock
			}
		});

		const button = screen.getByText('numpy');
		fireEvent.click(button);

		expect(setMetadataQueryMock).toHaveBeenCalled();
	});
});
