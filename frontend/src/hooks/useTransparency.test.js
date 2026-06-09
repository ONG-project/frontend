import { describe, it, expect } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useTransparency } from './useTransparency';

describe('useTransparency', () => {
  it('initializes with loading state', async () => {
    const { result } = renderHook(() => useTransparency('test-ong-id'));

    // Should immediately be in loading state
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeNull();
    
    // Wait for the hook to finish loading
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
  });

  it('fetches and populates data correctly', async () => {
    const { result } = renderHook(() => useTransparency('test-ong-id'));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data.profile.name).toBe('ONG Test Profile');
    expect(result.current.data.verification.status).toBe('verified');
    expect(result.current.data.financial.balance).toBe(1000);
    expect(result.current.data.campaigns).toEqual([]);
    expect(result.current.data.changeHistory).toEqual([]);
    expect(result.current.data.pendingRequests).toEqual([]);
    expect(result.current.data.documents).toEqual([]);
    expect(result.current.data.dataSources).toEqual([]);
  });

  it('does nothing if no ongId is provided', async () => {
    const { result } = renderHook(() => useTransparency(null));

    // Will immediately set loading false because ongId is falsy
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    expect(result.current.data.profile).toBeNull();
  });
});
