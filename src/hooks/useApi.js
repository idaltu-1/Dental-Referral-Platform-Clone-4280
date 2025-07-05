import { useState, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  const apiCall = useCallback(async (endpoint, options = {}) => {
    setLoading(true);
    setError(null);

    try {
      const defaultOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(user?.token && { Authorization: `Bearer ${user.token}` })
        }
      };

      const mergedOptions = {
        ...defaultOptions,
        ...options,
        headers: {
          ...defaultOptions.headers,
          ...options.headers
        }
      };

      // In production, replace with your actual API base URL
      const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
      const response = await fetch(`${baseUrl}${endpoint}`, mergedOptions);

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [user]);

  return { apiCall, loading, error };
};

// Mock API service for demo purposes
export const mockApiService = {
  // Referral Management
  getReferrals: async (filters = {}) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      data: [
        {
          id: 1,
          patientName: 'Sarah Johnson',
          patientEmail: 'sarah.j@email.com',
          patientPhone: '+1 (555) 123-4567',
          specialty: 'Orthodontics',
          referringDoctor: 'Dr. Michael Chen',
          receivingDoctor: 'Dr. Emily Rodriguez',
          status: 'Completed',
          priority: 'High',
          dateCreated: '2024-01-15',
          dateCompleted: '2024-01-20',
          notes: 'Patient requires comprehensive orthodontic treatment',
          urgency: 'Routine'
        },
        {
          id: 2,
          patientName: 'Robert Smith',
          patientEmail: 'robert.s@email.com',
          patientPhone: '+1 (555) 987-6543',
          specialty: 'Oral Surgery',
          referringDoctor: 'Dr. Sarah Johnson',
          receivingDoctor: 'Dr. James Wilson',
          status: 'In Progress',
          priority: 'Medium',
          dateCreated: '2024-01-14',
          dateCompleted: null,
          notes: 'Wisdom tooth extraction required',
          urgency: 'Urgent'
        }
      ],
      total: 2,
      page: 1,
      limit: 10
    };
  },

  createReferral: async (referralData) => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    return {
      id: Date.now(),
      ...referralData,
      status: 'Pending',
      dateCreated: new Date().toISOString().split('T')[0]
    };
  },

  updateReferral: async (id, updates) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { id, ...updates, dateUpdated: new Date().toISOString() };
  },

  // Network Management
  getNetworkProfessionals: async (filters = {}) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return {
      data: [
        {
          id: 1,
          name: 'Dr. Sarah Johnson',
          email: 'sarah.johnson@email.com',
          phone: '+1 (555) 123-4567',
          specialty: 'Orthodontics',
          practice: 'Elite Orthodontics',
          location: 'New York, NY',
          rating: 4.9,
          reviews: 127,
          experience: '15 years',
          verified: true,
          responseTime: '< 2 hours',
          specializations: ['Invisalign', 'Braces', 'Retainers'],
          avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face'
        }
      ]
    };
  },

  // Analytics Data
  getAnalyticsData: async (period = '30d') => {
    await new Promise(resolve => setTimeout(resolve, 1200));
    return {
      metrics: {
        totalReferrals: 247,
        conversionRate: 84,
        revenue: 127500,
        networkGrowth: 89,
        avgResponseTime: 2.4,
        patientSatisfaction: 4.8
      },
      trends: {
        referralsSent: [45, 52, 48, 61, 58, 67, 74, 69, 78, 85, 82, 89],
        referralsReceived: [32, 38, 35, 42, 45, 51, 48, 55, 62, 58, 65, 71],
        completed: [28, 34, 31, 38, 41, 47, 44, 51, 58, 54, 61, 67]
      }
    };
  },

  // Rewards and Points
  getRewardsData: async () => {
    await new Promise(resolve => setTimeout(resolve, 900));
    return {
      userPoints: 2450,
      userLevel: 'Gold',
      levelProgress: 75,
      recentActivity: [
        {
          action: 'Completed referral to Dr. Smith',
          points: 100,
          date: '2024-01-15',
          type: 'earned'
        },
        {
          action: 'Received patient feedback (5 stars)',
          points: 75,
          date: '2024-01-14',
          type: 'earned'
        }
      ]
    };
  }
};