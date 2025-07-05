import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import ReactECharts from 'echarts-for-react';

const { FiTrendingUp, FiBarChart, FiPieChart, FiActivity, FiUsers, FiDollarSign, FiCalendar, FiDownload, FiFilter, FiRefreshCw, FiTarget, FiMapPin, FiClock, FiStar, FiArrowUp, FiArrowDown, FiEye, FiSettings } = FiIcons;

const AdvancedAnalytics = () => {
  const [dateRange, setDateRange] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState('referrals');
  const [comparisonMode, setComparisonMode] = useState('period');
  const [isLoading, setIsLoading] = useState(false);

  const kpiMetrics = [
    {
      title: "Total Referrals",
      value: "1,847",
      change: "+15.2%",
      trend: "up",
      icon: FiActivity,
      color: "primary",
      description: "Total referrals processed",
      target: 2000,
      progress: 92.35
    },
    {
      title: "Conversion Rate",
      value: "87.3%",
      change: "+3.1%",
      trend: "up",
      icon: FiTrendingUp,
      color: "green",
      description: "Referral completion rate",
      target: 85,
      progress: 102.7
    },
    {
      title: "Revenue Impact",
      value: "$247,850",
      change: "+22.4%",
      trend: "up",
      icon: FiDollarSign,
      color: "blue",
      description: "Total revenue generated",
      target: 250000,
      progress: 99.1
    },
    {
      title: "Network Growth",
      value: "156",
      change: "+8.7%",
      trend: "up",
      icon: FiUsers,
      color: "purple",
      description: "New connections this period",
      target: 150,
      progress: 104
    },
    {
      title: "Avg Response Time",
      value: "1.8h",
      change: "-12.3%",
      trend: "down",
      icon: FiClock,
      color: "orange",
      description: "Average response time",
      target: 2,
      progress: 90
    },
    {
      title: "Patient Satisfaction",
      value: "4.87",
      change: "+2.1%",
      trend: "up",
      icon: FiStar,
      color: "yellow",
      description: "Average patient rating",
      target: 4.8,
      progress: 101.5
    }
  ];

  // Advanced chart configurations
  const referralFlowOptions = {
    title: {
      text: 'Referral Flow Analysis',
      left: 'center',
      textStyle: { fontSize: 18, fontWeight: 'bold', color: '#1e293b' }
    },
    tooltip: { trigger: 'item', formatter: '{a} <br/>{b} : {c} ({d%})' },
    legend: { orient: 'vertical', left: 'left', top: 'middle' },
    series: [{
      name: 'Referral Flow',
      type: 'pie',
      radius: ['40%', '70%'],
      center: ['60%', '50%'],
      data: [
        { value: 847, name: 'Completed', itemStyle: { color: '#10b981' } },
        { value: 234, name: 'In Progress', itemStyle: { color: '#0ea5e9' } },
        { value: 156, name: 'Pending', itemStyle: { color: '#f59e0b' } },
        { value: 89, name: 'Cancelled', itemStyle: { color: '#ef4444' } }
      ],
      emphasis: { itemStyle: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: 'rgba(0, 0, 0, 0.5)' } }
    }]
  };

  const performanceTrendsOptions = {
    title: {
      text: 'Performance Trends Over Time',
      left: 'center',
      textStyle: { fontSize: 18, fontWeight: 'bold', color: '#1e293b' }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'cross' },
      backgroundColor: 'rgba(255,255,255,0.95)',
      borderColor: '#e2e8f0',
      textStyle: { color: '#334155' }
    },
    legend: {
      data: ['Referrals', 'Completion Rate', 'Response Time', 'Satisfaction'],
      top: 40
    },
    grid: { left: '3%', right: '4%', bottom: '3%', top: '20%', containLabel: true },
    xAxis: {
      type: 'category',
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      axisLine: { lineStyle: { color: '#e2e8f0' } }
    },
    yAxis: [
      {
        type: 'value',
        name: 'Count',
        position: 'left',
        axisLabel: { color: '#64748b' },
        splitLine: { lineStyle: { color: '#f1f5f9' } }
      },
      {
        type: 'value',
        name: 'Percentage',
        position: 'right',
        axisLabel: { color: '#64748b', formatter: '{value}%' },
        splitLine: { show: false }
      }
    ],
    series: [
      {
        name: 'Referrals',
        type: 'bar',
        yAxisIndex: 0,
        data: [120, 132, 101, 134, 90, 230, 210, 185, 200, 165, 180, 195],
        itemStyle: { color: '#0ea5e9' }
      },
      {
        name: 'Completion Rate',
        type: 'line',
        yAxisIndex: 1,
        smooth: true,
        data: [82, 85, 88, 87, 89, 91, 87, 89, 92, 88, 90, 87],
        lineStyle: { color: '#10b981', width: 3 },
        itemStyle: { color: '#10b981' }
      },
      {
        name: 'Response Time',
        type: 'line',
        yAxisIndex: 0,
        smooth: true,
        data: [2.8, 2.5, 2.2, 2.0, 1.8, 1.9, 2.1, 1.7, 1.6, 1.8, 1.5, 1.8],
        lineStyle: { color: '#f59e0b', width: 3 },
        itemStyle: { color: '#f59e0b' }
      },
      {
        name: 'Satisfaction',
        type: 'line',
        yAxisIndex: 1,
        smooth: true,
        data: [4.2, 4.3, 4.5, 4.4, 4.6, 4.7, 4.5, 4.8, 4.9, 4.7, 4.8, 4.87],
        lineStyle: { color: '#8b5cf6', width: 3 },
        itemStyle: { color: '#8b5cf6' }
      }
    ]
  };

  const geographicHeatmapOptions = {
    title: {
      text: 'Geographic Distribution of Referrals',
      left: 'center',
      textStyle: { fontSize: 18, fontWeight: 'bold', color: '#1e293b' }
    },
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} referrals'
    },
    grid: { left: '3%', right: '4%', bottom: '3%', top: '15%', containLabel: true },
    xAxis: {
      type: 'category',
      data: ['NY', 'CA', 'TX', 'FL', 'IL', 'PA', 'OH', 'GA', 'NC', 'MI'],
      axisLabel: { color: '#64748b' }
    },
    yAxis: {
      type: 'value',
      axisLabel: { color: '#64748b' },
      splitLine: { lineStyle: { color: '#f1f5f9' } }
    },
    series: [{
      type: 'bar',
      data: [245, 198, 156, 134, 112, 98, 87, 76, 65, 54],
      itemStyle: {
        color: {
          type: 'linear',
          x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [
            { offset: 0, color: '#0ea5e9' },
            { offset: 1, color: '#0284c7' }
          ]
        }
      },
      emphasis: { itemStyle: { color: '#0369a1' } }
    }]
  };

  const specialtyPerformanceOptions = {
    title: {
      text: 'Performance by Specialty',
      left: 'center',
      textStyle: { fontSize: 18, fontWeight: 'bold', color: '#1e293b' }
    },
    tooltip: { trigger: 'axis' },
    legend: { data: ['Volume', 'Success Rate'], top: 40 },
    grid: { left: '3%', right: '4%', bottom: '3%', top: '20%', containLabel: true },
    xAxis: {
      type: 'category',
      data: ['Orthodontics', 'Oral Surgery', 'Periodontics', 'Endodontics', 'Prosthodontics'],
      axisLabel: { rotate: 45, color: '#64748b' }
    },
    yAxis: [
      { type: 'value', name: 'Volume', position: 'left', axisLabel: { color: '#64748b' } },
      { type: 'value', name: 'Success Rate (%)', position: 'right', axisLabel: { color: '#64748b' } }
    ],
    series: [
      {
        name: 'Volume',
        type: 'bar',
        yAxisIndex: 0,
        data: [420, 345, 289, 234, 156],
        itemStyle: { color: '#0ea5e9' }
      },
      {
        name: 'Success Rate',
        type: 'line',
        yAxisIndex: 1,
        smooth: true,
        data: [92, 88, 85, 90, 87],
        lineStyle: { color: '#10b981', width: 3 },
        itemStyle: { color: '#10b981' }
      }
    ]
  };

  const topPerformers = [
    { name: 'Dr. Sarah Johnson', specialty: 'Orthodontics', referrals: 89, revenue: '$45,600', rating: 4.9 },
    { name: 'Dr. Michael Chen', specialty: 'Oral Surgery', referrals: 76, revenue: '$67,800', rating: 4.8 },
    { name: 'Dr. Emily Rodriguez', specialty: 'Periodontics', referrals: 65, revenue: '$32,400', rating: 4.7 },
    { name: 'Dr. James Wilson', specialty: 'Endodontics', referrals: 58, revenue: '$28,900', rating: 4.6 },
    { name: 'Dr. Lisa Park', specialty: 'Pediatric', referrals: 54, revenue: '$21,600', rating: 4.8 }
  ];

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  const exportReport = () => {
    alert('Advanced analytics report exported successfully!');
  };

  return (
    <div className="min-h-screen bg-dental-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-dental-900 mb-2"
          >
            Advanced Analytics Dashboard
          </motion.h1>
          <p className="text-dental-600">
            Deep insights and comprehensive analytics for your dental referral network
          </p>
        </div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-xl shadow-lg mb-8"
        >
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiCalendar} className="w-5 h-5 text-dental-600" />
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="px-3 py-2 border border-dental-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="7d">Last 7 days</option>
                  <option value="30d">Last 30 days</option>
                  <option value="90d">Last 90 days</option>
                  <option value="6m">Last 6 months</option>
                  <option value="1y">Last year</option>
                  <option value="custom">Custom Range</option>
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiTarget} className="w-5 h-5 text-dental-600" />
                <select
                  value={selectedMetric}
                  onChange={(e) => setSelectedMetric(e.target.value)}
                  className="px-3 py-2 border border-dental-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="referrals">Referrals</option>
                  <option value="revenue">Revenue</option>
                  <option value="performance">Performance</option>
                  <option value="network">Network Growth</option>
                  <option value="satisfaction">Patient Satisfaction</option>
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiBarChart} className="w-5 h-5 text-dental-600" />
                <select
                  value={comparisonMode}
                  onChange={(e) => setComparisonMode(e.target.value)}
                  className="px-3 py-2 border border-dental-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="period">Compare Periods</option>
                  <option value="specialty">Compare Specialties</option>
                  <option value="geography">Compare Regions</option>
                  <option value="practitioners">Compare Practitioners</option>
                </select>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={handleRefresh}
                disabled={isLoading}
                className="flex items-center space-x-2 px-4 py-2 bg-dental-100 text-dental-600 rounded-lg hover:bg-dental-200 transition-colors"
              >
                <SafeIcon icon={FiRefreshCw} className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </button>
              <button
                onClick={exportReport}
                className="flex items-center space-x-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
              >
                <SafeIcon icon={FiDownload} className="w-4 h-4" />
                <span>Export Report</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* KPI Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {kpiMetrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    metric.color === 'primary' ? 'bg-primary-100' :
                    metric.color === 'green' ? 'bg-green-100' :
                    metric.color === 'blue' ? 'bg-blue-100' :
                    metric.color === 'purple' ? 'bg-purple-100' :
                    metric.color === 'orange' ? 'bg-orange-100' : 'bg-yellow-100'
                  }`}>
                    <SafeIcon icon={metric.icon} className={`w-6 h-6 ${
                      metric.color === 'primary' ? 'text-primary-600' :
                      metric.color === 'green' ? 'text-green-600' :
                      metric.color === 'blue' ? 'text-blue-600' :
                      metric.color === 'purple' ? 'text-purple-600' :
                      metric.color === 'orange' ? 'text-orange-600' : 'text-yellow-600'
                    }`} />
                  </div>
                  <div>
                    <p className="text-dental-600 text-sm font-medium">{metric.title}</p>
                    <p className="text-2xl font-bold text-dental-900">{metric.value}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1">
                    <SafeIcon 
                      icon={metric.trend === 'up' ? FiArrowUp : FiArrowDown} 
                      className={`w-4 h-4 ${metric.trend === 'up' ? 'text-green-500' : 'text-red-500'}`} 
                    />
                    <span className={`text-sm font-medium ${
                      metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {metric.change}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="mb-2">
                <div className="flex justify-between text-sm text-dental-600 mb-1">
                  <span>Progress to Target</span>
                  <span>{metric.progress.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-dental-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      metric.progress >= 100 ? 'bg-green-500' : 'bg-primary-500'
                    }`}
                    style={{ width: `${Math.min(metric.progress, 100)}%` }}
                  ></div>
                </div>
              </div>
              
              <p className="text-dental-500 text-xs">{metric.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Referral Flow Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <ReactECharts option={referralFlowOptions} style={{ height: '400px' }} />
          </motion.div>

          {/* Performance Trends */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <ReactECharts option={performanceTrendsOptions} style={{ height: '400px' }} />
          </motion.div>

          {/* Geographic Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <ReactECharts option={geographicHeatmapOptions} style={{ height: '400px' }} />
          </motion.div>

          {/* Specialty Performance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <ReactECharts option={specialtyPerformanceOptions} style={{ height: '400px' }} />
          </motion.div>
        </div>

        {/* Top Performers Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="p-6 border-b border-dental-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-dental-900">Top Performing Practitioners</h2>
              <button className="text-primary-600 hover:text-primary-700 font-medium flex items-center space-x-1">
                <span>View All</span>
                <SafeIcon icon={FiEye} className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-dental-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-dental-500 uppercase tracking-wider">
                    Practitioner
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-dental-500 uppercase tracking-wider">
                    Specialty
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-dental-500 uppercase tracking-wider">
                    Referrals
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-dental-500 uppercase tracking-wider">
                    Revenue
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-dental-500 uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-dental-500 uppercase tracking-wider">
                    Trend
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-dental-200">
                {topPerformers.map((performer, index) => (
                  <tr key={index} className="hover:bg-dental-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-dental-900">{performer.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-dental-900">{performer.specialty}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-dental-900">{performer.referrals}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-green-600">{performer.revenue}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <SafeIcon icon={FiStar} className="w-4 h-4 text-yellow-400 mr-1" />
                        <span className="text-sm text-dental-900">{performer.rating}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <SafeIcon icon={FiTrendingUp} className="w-4 h-4 text-green-500" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdvancedAnalytics;