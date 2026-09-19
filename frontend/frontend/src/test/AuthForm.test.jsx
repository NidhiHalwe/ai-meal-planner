import { render, screen, fireEvent } from '@testing-library/react';
import AuthForm from '../components/AuthForm';

describe('AuthForm', () => {
  it('renders login state and submits values', () => {
    const onSubmit = vi.fn();

    render(<AuthForm mode="login" onSubmit={onSubmit} loading={false} />);

    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'user@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: '123456' } });
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));

    expect(onSubmit).toHaveBeenCalledWith('user@example.com', '123456');
  });

  it('renders signup title and calls submit with signup label', () => {
    const onSubmit = vi.fn();

    render(<AuthForm mode="signup" onSubmit={onSubmit} loading={false} />);

    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'user@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: '123456' } });
    fireEvent.click(screen.getByRole('button', { name: 'Create Account' }));

    expect(screen.getByRole('heading', { name: 'Sign Up' })).toBeInTheDocument();
    expect(onSubmit).toHaveBeenCalledWith('user@example.com', '123456');
  });
});
