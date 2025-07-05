import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiChevronUp, FiChevronDown, FiMoreVertical, FiEdit, FiTrash2, FiEye, FiDownload } = FiIcons;

const DataTable = ({ 
  data = [], 
  columns = [], 
  actions = [],
  pagination = true,
  pageSize = 10,
  sortable = true,
  selectable = false,
  onRowClick,
  onSort,
  onSelect,
  loading = false
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [actionMenuOpen, setActionMenuOpen] = useState(null);

  const totalPages = Math.ceil(data.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = data.slice(startIndex, endIndex);

  const handleSort = (columnKey) => {
    if (!sortable) return;

    let direction = 'asc';
    if (sortConfig.key === columnKey && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    
    setSortConfig({ key: columnKey, direction });
    onSort && onSort(columnKey, direction);
  };

  const handleSelectRow = (rowId) => {
    if (!selectable) return;

    const newSelected = new Set(selectedRows);
    if (newSelected.has(rowId)) {
      newSelected.delete(rowId);
    } else {
      newSelected.add(rowId);
    }
    setSelectedRows(newSelected);
    onSelect && onSelect(Array.from(newSelected));
  };

  const handleSelectAll = () => {
    if (selectedRows.size === currentData.length) {
      setSelectedRows(new Set());
      onSelect && onSelect([]);
    } else {
      const allIds = new Set(currentData.map(row => row.id));
      setSelectedRows(allIds);
      onSelect && onSelect(Array.from(allIds));
    }
  };

  const getSortIcon = (columnKey) => {
    if (sortConfig.key !== columnKey) return null;
    return sortConfig.direction === 'asc' ? FiChevronUp : FiChevronDown;
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-dental-600">Loading data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-dental-50">
            <tr>
              {selectable && (
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedRows.size === currentData.length && currentData.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-dental-300 text-primary-600 focus:ring-primary-500"
                  />
                </th>
              )}
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`px-6 py-3 text-left text-xs font-medium text-dental-500 uppercase tracking-wider ${
                    sortable && column.sortable !== false ? 'cursor-pointer hover:bg-dental-100' : ''
                  }`}
                  onClick={() => column.sortable !== false && handleSort(column.key)}
                >
                  <div className="flex items-center space-x-1">
                    <span>{column.label}</span>
                    {sortable && column.sortable !== false && (
                      <SafeIcon 
                        icon={getSortIcon(column.key) || FiChevronUp} 
                        className={`w-4 h-4 ${
                          sortConfig.key === column.key ? 'text-primary-600' : 'text-dental-300'
                        }`} 
                      />
                    )}
                  </div>
                </th>
              ))}
              {actions.length > 0 && (
                <th className="px-6 py-3 text-left text-xs font-medium text-dental-500 uppercase tracking-wider">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-dental-200">
            {currentData.map((row, index) => (
              <motion.tr
                key={row.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className={`hover:bg-dental-50 ${
                  onRowClick ? 'cursor-pointer' : ''
                } ${selectedRows.has(row.id) ? 'bg-primary-25' : ''}`}
                onClick={() => onRowClick && onRowClick(row)}
              >
                {selectable && (
                  <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={selectedRows.has(row.id)}
                      onChange={() => handleSelectRow(row.id)}
                      className="rounded border-dental-300 text-primary-600 focus:ring-primary-500"
                    />
                  </td>
                )}
                {columns.map((column) => (
                  <td key={column.key} className="px-6 py-4 whitespace-nowrap">
                    {column.render ? column.render(row[column.key], row) : (
                      <div className="text-sm text-dental-900">{row[column.key]}</div>
                    )}
                  </td>
                ))}
                {actions.length > 0 && (
                  <td className="px-6 py-4 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                    <div className="relative">
                      <button
                        onClick={() => setActionMenuOpen(actionMenuOpen === row.id ? null : row.id)}
                        className="text-dental-400 hover:text-dental-600"
                      >
                        <SafeIcon icon={FiMoreVertical} className="w-5 h-5" />
                      </button>
                      {actionMenuOpen === row.id && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-dental-200 z-20">
                          <div className="py-1">
                            {actions.map((action, actionIndex) => (
                              <button
                                key={actionIndex}
                                onClick={() => {
                                  action.onClick(row);
                                  setActionMenuOpen(null);
                                }}
                                className={`flex items-center w-full px-4 py-2 text-sm transition-colors ${
                                  action.danger 
                                    ? 'text-red-700 hover:bg-red-50' 
                                    : 'text-dental-700 hover:bg-dental-50'
                                }`}
                              >
                                {action.icon && <SafeIcon icon={action.icon} className="w-4 h-4 mr-2" />}
                                {action.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                )}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {data.length === 0 && (
        <div className="p-8 text-center">
          <p className="text-dental-500">No data available</p>
        </div>
      )}

      {/* Pagination */}
      {pagination && data.length > pageSize && (
        <div className="px-6 py-3 bg-dental-50 border-t border-dental-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-dental-700">
              Showing {startIndex + 1} to {Math.min(endIndex, data.length)} of {data.length} results
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 text-sm border border-dental-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-dental-100"
              >
                Previous
              </button>
              <div className="flex items-center space-x-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const page = i + 1;
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-1 text-sm rounded-lg ${
                        currentPage === page
                          ? 'bg-primary-500 text-white'
                          : 'border border-dental-200 hover:bg-dental-100'
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
              </div>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 text-sm border border-dental-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-dental-100"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;