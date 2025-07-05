import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiSearch, FiFilter, FiX, FiCalendar, FiMapPin, FiUser, FiSave, FiRefreshCw } = FiIcons;

const AdvancedSearch = ({ onSearch, onSaveSearch, savedSearches = [], placeholder = "Search..." }) => {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    dateRange: { start: '', end: '' },
    status: '',
    priority: '',
    specialty: '',
    location: '',
    assignedTo: ''
  });

  const handleBasicSearch = (query) => {
    setSearchQuery(query);
    onSearch({ query, filters: {} });
  };

  const handleAdvancedSearch = () => {
    const searchParams = {
      query: searchQuery,
      filters: Object.fromEntries(
        Object.entries(filters).filter(([_, value]) => 
          value && (typeof value === 'string' ? value.trim() : true)
        )
      )
    };
    onSearch(searchParams);
    setIsAdvancedOpen(false);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setFilters({
      dateRange: { start: '', end: '' },
      status: '',
      priority: '',
      specialty: '',
      location: '',
      assignedTo: ''
    });
    onSearch({ query: '', filters: {} });
  };

  const saveCurrentSearch = () => {
    const searchName = prompt('Enter a name for this search:');
    if (searchName && onSaveSearch) {
      onSaveSearch({
        name: searchName,
        query: searchQuery,
        filters
      });
    }
  };

  return (
    <div className="relative">
      {/* Basic Search */}
      <div className="relative">
        <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dental-400 w-5 h-5" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => handleBasicSearch(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-10 pr-20 py-3 border border-dental-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
          {(searchQuery || Object.values(filters).some(v => v)) && (
            <button
              onClick={clearSearch}
              className="p-1 text-dental-400 hover:text-red-500 transition-colors"
            >
              <SafeIcon icon={FiX} className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
            className={`p-2 rounded-md transition-colors ${
              isAdvancedOpen ? 'bg-primary-100 text-primary-600' : 'text-dental-400 hover:text-primary-600'
            }`}
          >
            <SafeIcon icon={FiFilter} className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Advanced Search Panel */}
      {isAdvancedOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 right-0 mt-2 bg-white border border-dental-200 rounded-lg shadow-lg z-50 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-dental-900">Advanced Search</h3>
            <button
              onClick={() => setIsAdvancedOpen(false)}
              className="text-dental-400 hover:text-dental-600"
            >
              <SafeIcon icon={FiX} className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {/* Date Range */}
            <div>
              <label className="block text-sm font-medium text-dental-700 mb-2">
                <SafeIcon icon={FiCalendar} className="w-4 h-4 inline mr-1" />
                Date Range
              </label>
              <div className="space-y-2">
                <input
                  type="date"
                  value={filters.dateRange.start}
                  onChange={(e) => setFilters(prev => ({
                    ...prev,
                    dateRange: { ...prev.dateRange, start: e.target.value }
                  }))}
                  className="w-full px-3 py-2 border border-dental-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <input
                  type="date"
                  value={filters.dateRange.end}
                  onChange={(e) => setFilters(prev => ({
                    ...prev,
                    dateRange: { ...prev.dateRange, end: e.target.value }
                  }))}
                  className="w-full px-3 py-2 border border-dental-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-dental-700 mb-2">Status</label>
              <select
                value={filters.status}
                onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                className="w-full px-3 py-2 border border-dental-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="">All Statuses</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            {/* Priority */}
            <div>
              <label className="block text-sm font-medium text-dental-700 mb-2">Priority</label>
              <select
                value={filters.priority}
                onChange={(e) => setFilters(prev => ({ ...prev, priority: e.target.value }))}
                className="w-full px-3 py-2 border border-dental-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="">All Priorities</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>

            {/* Specialty */}
            <div>
              <label className="block text-sm font-medium text-dental-700 mb-2">Specialty</label>
              <select
                value={filters.specialty}
                onChange={(e) => setFilters(prev => ({ ...prev, specialty: e.target.value }))}
                className="w-full px-3 py-2 border border-dental-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="">All Specialties</option>
                <option value="orthodontics">Orthodontics</option>
                <option value="oral-surgery">Oral Surgery</option>
                <option value="periodontics">Periodontics</option>
                <option value="endodontics">Endodontics</option>
              </select>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-dental-700 mb-2">
                <SafeIcon icon={FiMapPin} className="w-4 h-4 inline mr-1" />
                Location
              </label>
              <input
                type="text"
                value={filters.location}
                onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                placeholder="City, State"
                className="w-full px-3 py-2 border border-dental-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            {/* Assigned To */}
            <div>
              <label className="block text-sm font-medium text-dental-700 mb-2">
                <SafeIcon icon={FiUser} className="w-4 h-4 inline mr-1" />
                Assigned To
              </label>
              <input
                type="text"
                value={filters.assignedTo}
                onChange={(e) => setFilters(prev => ({ ...prev, assignedTo: e.target.value }))}
                placeholder="Doctor name"
                className="w-full px-3 py-2 border border-dental-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          {/* Saved Searches */}
          {savedSearches.length > 0 && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-dental-700 mb-2">Saved Searches</label>
              <div className="flex flex-wrap gap-2">
                {savedSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSearchQuery(search.query);
                      setFilters(search.filters);
                    }}
                    className="px-3 py-1 bg-dental-100 text-dental-700 rounded-full text-sm hover:bg-dental-200 transition-colors"
                  >
                    {search.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between">
            <button
              onClick={saveCurrentSearch}
              className="flex items-center space-x-2 px-4 py-2 text-dental-600 border border-dental-200 rounded-lg hover:bg-dental-50 transition-colors"
            >
              <SafeIcon icon={FiSave} className="w-4 h-4" />
              <span>Save Search</span>
            </button>

            <div className="flex items-center space-x-3">
              <button
                onClick={clearSearch}
                className="flex items-center space-x-2 px-4 py-2 text-dental-600 border border-dental-200 rounded-lg hover:bg-dental-50 transition-colors"
              >
                <SafeIcon icon={FiRefreshCw} className="w-4 h-4" />
                <span>Clear</span>
              </button>
              <button
                onClick={handleAdvancedSearch}
                className="flex items-center space-x-2 px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
              >
                <SafeIcon icon={FiSearch} className="w-4 h-4" />
                <span>Search</span>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default AdvancedSearch;