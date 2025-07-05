import { useState, useEffect, useCallback } from 'react';
import { mockApiService } from './useApi';

export const useReferrals = (filters = {}) => {
  const [referrals, setReferrals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0
  });

  const fetchReferrals = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await mockApiService.getReferrals(filters);
      setReferrals(response.data);
      setPagination({
        page: response.page,
        limit: response.limit,
        total: response.total
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const createReferral = useCallback(async (referralData) => {
    try {
      const newReferral = await mockApiService.createReferral(referralData);
      setReferrals(prev => [newReferral, ...prev]);
      return newReferral;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  const updateReferral = useCallback(async (id, updates) => {
    try {
      const updatedReferral = await mockApiService.updateReferral(id, updates);
      setReferrals(prev => 
        prev.map(referral => 
          referral.id === id ? { ...referral, ...updatedReferral } : referral
        )
      );
      return updatedReferral;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  const deleteReferral = useCallback(async (id) => {
    try {
      setReferrals(prev => prev.filter(referral => referral.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  useEffect(() => {
    fetchReferrals();
  }, [fetchReferrals]);

  return {
    referrals,
    loading,
    error,
    pagination,
    createReferral,
    updateReferral,
    deleteReferral,
    refetchReferrals: fetchReferrals
  };
};