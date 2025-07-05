import { useState, useMemo, useCallback } from 'react';

export const useAdvancedFiltering = (data, initialFilters = {}) => {
  const [filters, setFilters] = useState(initialFilters);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = useMemo(() => {
    if (!data || !Array.isArray(data)) return [];

    let filtered = data.filter(item => {
      // Text search
      if (searchTerm) {
        const searchableFields = Object.values(item).join(' ').toLowerCase();
        if (!searchableFields.includes(searchTerm.toLowerCase())) {
          return false;
        }
      }

      // Apply filters
      return Object.entries(filters).every(([key, value]) => {
        if (!value || value === 'All' || value === '') return true;
        
        if (Array.isArray(value)) {
          return value.includes(item[key]);
        }
        
        if (typeof value === 'object' && value.min !== undefined && value.max !== undefined) {
          const itemValue = parseFloat(item[key]);
          return itemValue >= value.min && itemValue <= value.max;
        }
        
        return item[key] === value;
      });
    });

    // Apply sorting
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        
        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return filtered;
  }, [data, filters, sortConfig, searchTerm]);

  const updateFilter = useCallback((key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters(initialFilters);
    setSearchTerm('');
    setSortConfig({ key: null, direction: 'asc' });
  }, [initialFilters]);

  const requestSort = useCallback((key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  }, [sortConfig]);

  return {
    filteredData,
    filters,
    searchTerm,
    sortConfig,
    updateFilter,
    setSearchTerm,
    clearFilters,
    requestSort,
    totalCount: data?.length || 0,
    filteredCount: filteredData.length
  };
};