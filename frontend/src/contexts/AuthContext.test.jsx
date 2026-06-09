import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { AuthProvider, useAuth } from './AuthContext';
import { act } from 'react';

// Simple component to test the context
function TestComponent() {
  const { user, login, logout, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div data-testid="user-status">{user ? `Logged in as ${user.name}` : 'Not logged in'}</div>
      <button onClick={() => login({ email: 'test@example.com', password: 'password' })}>Login</button>
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
}

describe('AuthContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('provides loading state initially when checking token', async () => {
    localStorage.setItem('@ongplus:token', 'fake-token');
    
    const { container } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    // Initial state is loading, so AuthProvider renders nothing (children not rendered)
    expect(screen.queryByTestId('user-status')).not.toBeInTheDocument();

    // After fetch completes, user is logged in (mock responds with Test User)
    await waitFor(() => {
      expect(screen.getByTestId('user-status')).toHaveTextContent('Logged in as Test User');
    });
  });

  it('allows user to login', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId('user-status')).toHaveTextContent('Not logged in');

    act(() => {
      screen.getByText('Login').click();
    });

    await waitFor(() => {
      expect(screen.getByTestId('user-status')).toHaveTextContent('Logged in as Test User');
    });
    
    expect(localStorage.getItem('@ongplus:token')).toBe('mock-access-token');
  });

  it('allows user to logout', async () => {
    localStorage.setItem('@ongplus:token', 'fake-token');
    localStorage.setItem('@ongplus:refresh_token', 'fake-refresh');
    
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('user-status')).toHaveTextContent('Logged in as Test User');
    });

    act(() => {
      screen.getByText('Logout').click();
    });

    await waitFor(() => {
      expect(screen.getByTestId('user-status')).toHaveTextContent('Not logged in');
    });
    
    expect(localStorage.getItem('@ongplus:token')).toBeNull();
  });
});
