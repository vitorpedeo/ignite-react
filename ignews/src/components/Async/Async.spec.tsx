import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import { Async } from '.';

describe('Async component', () => {
  it('should render correctly', async () => {
    render(<Async />);

    expect(screen.getByText('Hello Async')).toBeInTheDocument();

    await waitForElementToBeRemoved(screen.queryByText('Description'));

    await waitFor(() => {
      return expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });
})
