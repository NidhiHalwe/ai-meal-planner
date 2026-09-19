import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App shell', () => {
  it('renders the navigation and landing route', () => {
    render(<App />);
    expect(screen.getByText('NutriHub')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
  });
});
