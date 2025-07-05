import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';

export const useRealTimeUpdates = (endpoint, options = {}) => {
  const [data, setData] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState(null);
  const wsRef = useRef(null);
  const { user } = useAuth();
  const { autoReconnect = true, reconnectInterval = 5000 } = options;

  useEffect(() => {
    if (!user?.token) return;

    // Simulate real-time updates for demo
    const simulateUpdates = () => {
      const interval = setInterval(() => {
        const mockData = {
          timestamp: new Date().toISOString(),
          type: 'update',
          data: {
            newReferrals: Math.floor(Math.random() * 5),
            activeUsers: 100 + Math.floor(Math.random() * 50),
            completedToday: Math.floor(Math.random() * 20)
          }
        };
        setData(mockData);
      }, 10000);

      setIsConnected(true);
      return interval;
    };

    const interval = simulateUpdates();

    return () => {
      clearInterval(interval);
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [user?.token, endpoint, autoReconnect, reconnectInterval]);

  const sendMessage = (message) => {
    if (wsRef.current && isConnected) {
      wsRef.current.send(JSON.stringify(message));
    }
  };

  return { data, isConnected, error, sendMessage };
};