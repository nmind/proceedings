import { render } from '@testing-library/svelte';
import { test } from 'vitest';
import EvaluationDetail from '../src/lib/components/EvaluationDetail.svelte';

test('renders evaluation detail', async () => {
  const { getByText } = render(EvaluationDetail, {
    props: {
      evaluation: {
        id: 1,
        name: 'Test Evaluation',
        description: 'This is a test evaluation',
        questions: [
          {
            id: 1,
            text: 'Question 1',
            options: [
              { id: 1, text: 'Option 1' },
              { id: 2, text: 'Option 2' },
            ],
          },
          {
            id: 2,
            text: 'Question 2',
            options: [
              { id: 3, text: 'Option 3' },
              { id: 4, text: 'Option 4' },
            ],
          },
        ],
      },
    },
  });

  expect(getByText('Test Evaluation')).toBeInTheDocument();
  expect(getByText('This is a test evaluation')).toBeInTheDocument();
  expect(getByText('Question 1')).toBeInTheDocument();
  expect(getByText('Option 1')).toBeInTheDocument();
  expect(getByText('Option 2')).toBeInTheDocument();
  expect(getByText('Question 2')).toBeInTheDocument();
  expect(getByText('Option 3')).toBeInTheDocument();
  expect(getByText('Option 4')).toBeInTheDocument();
});
