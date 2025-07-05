import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import ReactECharts from 'echarts-for-react';

const {
  FiTrendingUp,
  FiUsers,
  FiActivity,
  FiDollarSign,
  FiCalendar,
  FiDownload,
  FiFilter,
  FiBarChart,
  FiPieChart,
  FiTarget,
  FiClock,
  FiMapPin,
  FiStar,
  FiArrowUp,
  FiArrowDown,
  FiRefreshCw,
  FiEye,
  FiSettings
} = FiIcons;

const Analytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState('referrals');
  const [activeChart, setActiveChart] = useState('trends');
  const [isLoading, setIsLoading] = useState(false);

  const metrics = [
    {
      title: "Total Referrals",
      value: "1,247",
      change: "+15%",
      trend: "up",
      icon: FiActivity,
      color: "primary",
      subtext: "vs last period"
    },
    {
      title: "Conversion Rate",
      value: "84%",
      change: "+8%",
      trend: "up",
      icon: FiTrendingUp,
      color: "green",
      subtext: "completion rate"
    },
    {
      title: "Revenue Generated",
      value: "$127,500",
      change: "+22%",
      trend: "up",
      icon: FiDollarSign,
      color: "blue",
      subtext: "total earnings"
    },
    {
      title: "Network Growth",
      value: "89",
      change: "+12%",
      trend: "up",
      icon: FiUsers,
      color: "purple",
      subtext: "new connections"
    },
    {
      title: "Avg Response Time",
      value: "2.4h",
      change: "-18%",
      trend: "down",
      icon: FiClock,
      color: "orange",
      subtext: "faster responses"
    },
    {
      title: "Patient Satisfaction",
      value: "4.8/5",
      change: "+5%",
      trend: "up",
      icon: FiStar,
      color: "yellow",
      subtext: "average rating"
    }
  ];

  const referralTrendsOptions = {
    title: {
      text: 'Referral Trends Over Time',
      left: 'left',
      textStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1e293b'
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#999'
        }
      },
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: '#e2e8f0',
      borderWidth: 1,
      textStyle: {
        color: '#334155'
      }
    },
    legend: {
      data: ['Sent', 'Received', 'Completed', 'Cancelled'],
      top: 40,
      textStyle: {
        color: '#64748b'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '20%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      axisLine: {
        lineStyle: {
          color: '#e2e8f0'
        }
      },
      axisLabel: {
        color: '#64748b'
      }
    },
    yAxis: {
      type: 'value',
      axisLine: {
        lineStyle: {
          color: '#e2e8f0'
        }
      },
      axisLabel: {
        color: '#64748b'
      },
      splitLine: {
        lineStyle: {
          color: '#f1f5f9'
        }
      }
    },
    series: [
      {
        name: 'Sent',
        type: 'line',
        smooth: true,
        lineStyle: {
          color: '#0ea5e9',
          width: 3
        },
        itemStyle: {
          color: '#0ea5e9'
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(14,165,233,0.3)' },
              { offset: 1, color: 'rgba(14,165,233,0.1)' }
            ]
          }
        },
        data: [45, 52, 48, 61, 58, 67, 74, 69, 78, 85, 82, 89]
      },
      {
        name: 'Received',
        type: 'line',
        smooth: true,
        lineStyle: {
          color: '#10b981',
          width: 3
        },
        itemStyle: {
          color: '#10b981'
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(16,185,129,0.3)' },
              { offset: 1, color: 'rgba(16,185,129,0.1)' }
            ]
          }
        },
        data: [32, 38, 35, 42, 45, 51, 48, 55, 62, 58, 65, 71]
      },
      {
        name: 'Completed',
        type: 'line',
        smooth: true,
        lineStyle: {
          color: '#8b5cf6',
          width: 3
        },
        itemStyle: {
          color: '#8b5cf6'
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(139,92,246,0.3)' },
              { offset: 1, color: 'rgba(139,92,246,0.1)' }
            ]
          }
        },
        data: [28, 34, 31, 38, 41, 47, 44, 51, 58, 54, 61, 67]
      },
      {
        name: 'Cancelled',
        type: 'line',
        smooth: true,
        lineStyle: {
          color: '#ef4444',
          width: 2,
          type: 'dashed'
        },
        itemStyle: {
          color: '#ef4444'
        },
        data: [4, 6, 5, 8, 7, 9, 6, 8, 10, 7, 9, 11]
      }
    ]
  };

  const specialtyDistributionOptions = {
    title: {
      text: 'Referrals by Specialty',
      left: 'left',
      textStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1e293b'
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: '#e2e8f0',
      borderWidth: 1
    },
    legend: {
      orient: 'vertical',
      left: 'right',
      top: 'middle',
      textStyle: {
        color: '#64748b'
      }
    },
    series: [
      {
        name: 'Referrals',
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['40%', '50%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '16',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 335, name: 'Orthodontics', itemStyle: { color: '#0ea5e9' } },
          { value: 310, name: 'Oral Surgery', itemStyle: { color: '#10b981' } },
          { value: 234, name: 'Periodontics', itemStyle: { color: '#8b5cf6' } },
          { value: 195, name: 'Endodontics', itemStyle: { color: '#f59e0b' } },
          { value: 173, name: 'Pediatric', itemStyle: { color: '#ef4444' } },
          { value: 148, name: 'Prosthodontics', itemStyle: { color: '#06b6d4' } },
          { value: 92, name: 'Oral Pathology', itemStyle: { color: '#84cc16' } }
        ]
      }
    ]
  };

  const performanceMetricsOptions = {
    title: {
      text: 'Performance Metrics Comparison',
      left: 'left',
      textStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1e293b'
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: '#e2e8f0',
      borderWidth: 1
    },
    legend: {
      data: ['Response Time (hours)', 'Completion Rate (%)', 'Patient Satisfaction (1-5)'],
      top: 40,
      textStyle: {
        color: '#64748b'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '20%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      axisLine: {
        lineStyle: {
          color: '#e2e8f0'
        }
      },
      axisLabel: {
        color: '#64748b'
      }
    },
    yAxis: [
      {
        type: 'value',
        name: 'Hours / Percentage',
        position: 'left',
        axisLine: {
          lineStyle: {
            color: '#e2e8f0'
          }
        },
        axisLabel: {
          color: '#64748b'
        },
        splitLine: {
          lineStyle: {
            color: '#f1f5f9'
          }
        }
      }
    ],
    series: [
      {
        name: 'Response Time (hours)',
        type: 'bar',
        yAxisIndex: 0,
        itemStyle: {
          color: '#0ea5e9'
        },
        data: [2.1, 1.9, 2.3, 1.8, 2.0, 1.7]
      },
      {
        name: 'Completion Rate (%)',
        type: 'line',
        yAxisIndex: 0,
        lineStyle: {
          color: '#10b981',
          width: 3
        },
        itemStyle: {
          color: '#10b981'
        },
        data: [85, 87, 84, 89, 88, 91]
      },
      {
        name: 'Patient Satisfaction (1-5)',
        type: 'line',
        yAxisIndex: 0,
        lineStyle: {
          color: '#8b5cf6',
          width: 3
        },
        itemStyle: {
          color: '#8b5cf6'
        },
        data: [4.2, 4.3, 4.1, 4.5, 4.4, 4.6]
      }
    ]
  };

  const geographicDistributionOptions = {
    title: {
      text: 'Geographic Distribution',
      left: 'left',
      textStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1e293b'
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} referrals',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: '#e2e8f0',
      borderWidth: 1
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '15%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego'],
      axisLine: {
        lineStyle: {
          color: '#e2e8f0'
        }
      },
      axisLabel: {
        color: '#64748b',
        rotate: 45
      }
    },
    yAxis: {
      type: 'value',
      axisLine: {
        lineStyle: {
          color: '#e2e8f0'
        }
      },
      axisLabel: {
        color: '#64748b'
      },
      splitLine: {
        lineStyle: {
          color: '#f1f5f9'
        }
      }
    },
    series: [
      {
        name: 'Referrals',
        type: 'bar',
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: '#0ea5e9' },
              { offset: 1, color: '#0284c7' }
            ]
          }
        },
        data: [245, 198, 156, 134, 112, 98, 87, 76]
      }
    ]
  };

  const topReferrers = [
    {
      name: "Dr. Sarah Johnson",
      specialty: "Orthodontics",
      referrals: 45,
      revenue: "$12,500",
      rating: 4.9,
      location: "New York, NY"
    },
    {
      name: "Dr. Michael Chen",
      specialty: "Oral Surgery",
      referrals: 38,
      revenue: "$18,750",
      rating: 4.8,
      location: "Los Angeles, CA"
    },
    {
      name: "Dr. Emily Rodriguez",
      specialty: "Periodontics",
      referrals: 32,
      revenue: "$9,800",
      rating: 4.7,
      location: "Chicago, IL"
    },
    {
      name: "Dr. James Wilson",
      specialty: "Endodontics",
      referrals: 28,
      revenue: "$8,400",
      rating: 4.6,
      location: "Houston, TX"
    },
    {
      name: "Dr. Lisa Park",
      specialty: "Pediatric",
      referrals: 25,
      revenue: "$6,250",
      rating: 4.8,
      location: "Phoenix, AZ"
    }
  ];

  const recentInsights = [
    {
      title: "Peak Referral Hours",
      value: "2-4 PM",
      description: "Most referrals are sent during afternoon hours",
      icon: FiClock,
      color: "blue"
    },
    {
      title: "Top Performing Specialty",
      value: "Orthodontics",
      description: "Highest conversion rate at 92%",
      icon: FiTrendingUp,
      color: "green"
    },
    {
      title: "Geographic Hotspot",
      value: "New York",
      description: "Leading city for referral volume",
      icon: FiMapPin,
      color: "purple"
    },
    {
      title: "Patient Satisfaction Leader",
      value: "Dr. Sarah Johnson",
      description: "Consistently highest patient ratings",
      icon: FiStar,
      color: "yellow"
    }
  ];

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const exportReport = () => {
    alert('Report exported successfully!');
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
            Comprehensive insights into your referral performance and network growth
          </p>
        </div>

        {/* Enhanced Controls */}
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
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="px-3 py-2 border border-dental-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
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
                <SafeIcon icon={FiFilter} className="w-5 h-5 text-dental-600" />
                <select
                  value={selectedMetric}
                  onChange={(e) => setSelectedMetric(e.target.value)}
                  className="px-3 py-2 border border-dental-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="referrals">Referrals</option>
                  <option value="revenue">Revenue</option>
                  <option value="performance">Performance</option>
                  <option value="geography">Geography</option>
                  <option value="specialty">Specialty</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiBarChart} className="w-5 h-5 text-dental-600" />
                <select
                  value={activeChart}
                  onChange={(e) => setActiveChart(e.target.value)}
                  className="px-3 py-2 border border-dental-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="trends">Trends</option>
                  <option value="distribution">Distribution</option>
                  <option value="performance">Performance</option>
                  <option value="geography">Geography</option>
                </select>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={handleRefresh}
                className={`bg-dental-100 text-dental-600 px-4 py-2 rounded-lg font-medium hover:bg-dental-200 transition-colors flex items-center space-x-2 ${
                  isLoading ? 'animate-pulse' : ''
                }`}
              >
                <SafeIcon icon={FiRefreshCw} className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </button>
              <button
                onClick={exportReport}
                className="bg-primary-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-600 transition-colors flex items-center space-x-2"
              >
                <SafeIcon icon={FiDownload} className="w-4 h-4" />
                <span>Export Report</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      metric.color === 'primary'
                        ? 'bg-primary-100'
                        : metric.color === 'green'
                        ? 'bg-green-100'
                        : metric.color === 'blue'
                        ? 'bg-blue-100'
                        : metric.color === 'purple'
                        ? 'bg-purple-100'
                        : metric.color === 'orange'
                        ? 'bg-orange-100'
                        : 'bg-yellow-100'
                    }`}
                  >
                    <SafeIcon
                      icon={metric.icon}
                      className={`w-6 h-6 ${
                        metric.color === 'primary'
                          ? 'text-primary-600'
                          : metric.color === 'green'
                          ? 'text-green-600'
                          : metric.color === 'blue'
                          ? 'text-blue-600'
                          : metric.color === 'purple'
                          ? 'text-purple-600'
                          : metric.color === 'orange'
                          ? 'text-orange-600'
                          : 'text-yellow-600'
                      }`}
                    />
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
                      className={`w-4 h-4 ${
                        metric.trend === 'up' ? 'text-green-500' : 'text-red-500'
                      }`}
                    />
                    <span
                      className={`text-sm font-medium ${
                        metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {metric.change}
                    </span>
                  </div>
                  <p className="text-dental-500 text-xs mt-1">{metric.subtext}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dynamic Chart Display */}
        <div className="grid grid-cols-1 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            {activeChart === 'trends' && (
              <ReactECharts option={referralTrendsOptions} style={{ height: '400px' }} />
            )}
            {activeChart === 'distribution' && (
              <ReactECharts option={specialtyDistributionOptions} style={{ height: '400px' }} />
            )}
            {activeChart === 'performance' && (
              <ReactECharts option={performanceMetricsOptions} style={{ height: '400px' }} />
            )}
            {activeChart === 'geography' && (
              <ReactECharts option={geographicDistributionOptions} style={{ height: '400px' }} />
            )}
          </motion.div>
        </div>

        {/* Insights and Top Performers */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Key Insights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <h2 className="text-xl font-semibold text-dental-900 mb-6">Key Insights</h2>
            <div className="space-y-4">
              {recentInsights.map((insight, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      insight.color === 'blue'
                        ? 'bg-blue-100'
                        : insight.color === 'green'
                        ? 'bg-green-100'
                        : insight.color === 'purple'
                        ? 'bg-purple-100'
                        : 'bg-yellow-100'
                    }`}
                  >
                    <SafeIcon
                      icon={insight.icon}
                      className={`w-5 h-5 ${
                        insight.color === 'blue'
                          ? 'text-blue-600'
                          : insight.color === 'green'
                          ? 'text-green-600'
                          : insight.color === 'purple'
                          ? 'text-purple-600'
                          : 'text-yellow-600'
                      }`}
                    />
                  </div>
                  <div>
                    <p className="font-medium text-dental-900">{insight.title}</p>
                    <p className="text-primary-600 font-semibold">{insight.value}</p>
                    <p className="text-dental-600 text-sm">{insight.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Top Referrers Enhanced */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="lg:col-span-2 bg-white rounded-xl shadow-lg"
          >
            <div className="p-6 border-b border-dental-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-dental-900">Top Referrers</h2>
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
                      Doctor
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
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-dental-200">
                  {topReferrers.map((referrer, index) => (
                    <tr key={index} className="hover:bg-dental-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-dental-900">{referrer.name}</div>
                          <div className="text-sm text-dental-500">{referrer.location}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-dental-900">{referrer.specialty}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-dental-900">{referrer.referrals}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-green-600">{referrer.revenue}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <SafeIcon icon={FiStar} className="w-4 h-4 text-yellow-400 mr-1" />
                          <span className="text-sm text-dental-900">{referrer.rating}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;