import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import ReactECharts from 'echarts-for-react';
import QuickActions from '../components/QuickActions';
import { useRealTimeUpdates } from '../hooks/useRealTimeUpdates';
import { useNotifications } from '../hooks/useNotifications';
import { useRole } from '../context/RoleContext';
import { useAuth } from '../context/AuthContext';
import { SkeletonCard, LoadingSpinner } from '../components/LoadingStates';

const {
  FiTrendingUp,
  FiUsers,
  FiCalendar,
  FiActivity,
  FiArrowUp,
  FiArrowDown,
  FiEye,
  FiRefreshCw,
  FiCrown,
  FiShield
} = FiIcons;

const Dashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { data: realTimeData, isConnected } = useRealTimeUpdates('dashboard');
  const { addNotification } = useNotifications();
  const { isSuperAdmin, subscriptionLevel, getSubscriptionLimits } = useRole();
  const { user } = useAuth();

  const [stats, setStats] = useState([
    {
      title: "Total Referrals",
      value: "247",
      change: "+12%",
      trend: "up",
      icon: FiActivity,
      color: "primary"
    },
    {
      title: "Active Connections",
      value: "89",
      change: "+8%",
      trend: "up",
      icon: FiUsers,
      color: "green"
    },
    {
      title: "Completion Rate",
      value: "94%",
      change: "+2%",
      trend: "up",
      icon: FiTrendingUp,
      color: "blue"
    },
    {
      title: "Avg. Response Time",
      value: "2.4h",
      change: "-15%",
      trend: "down",
      icon: FiCalendar,
      color: "purple"
    }
  ]);

  const [recentReferrals] = useState([
    {
      id: 1,
      patient: "Sarah Johnson",
      specialty: "Orthodontics",
      doctor: "Dr. Michael Chen",
      status: "Completed",
      date: "2024-01-15",
      priority: "High"
    },
    {
      id: 2,
      patient: "Robert Smith",
      specialty: "Oral Surgery",
      doctor: "Dr. Emily Rodriguez",
      status: "In Progress",
      date: "2024-01-14",
      priority: "Medium"
    },
    {
      id: 3,
      patient: "Maria Garcia",
      specialty: "Periodontics",
      doctor: "Dr. James Wilson",
      status: "Pending",
      date: "2024-01-13",
      priority: "Low"
    }
  ]);

  // Update stats with real-time data
  useEffect(() => {
    if (realTimeData?.data) {
      setStats(prev => prev.map(stat => {
        if (stat.title === "Total Referrals") {
          return { ...stat, value: String(parseInt(stat.value) + realTimeData.data.newReferrals) };
        }
        if (stat.title === "Active Connections") {
          return { ...stat, value: String(realTimeData.data.activeUsers) };
        }
        return stat;
      }));

      // Show notification for new referrals
      if (realTimeData.data.newReferrals > 0) {
        addNotification({
          type: 'referral',
          title: 'New Referrals',
          message: `${realTimeData.data.newReferrals} new referral(s) received`,
          autoRemove: true
        });
      }
    }
  }, [realTimeData, addNotification]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate refresh
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsRefreshing(false);
    addNotification({
      type: 'system',
      title: 'Data Refreshed',
      message: 'Dashboard data has been updated',
      autoRemove: true
    });
  };

  const chartOptions = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      },
      backgroundColor: 'rgba(255,255,255,0.95)',
      borderColor: '#e2e8f0',
      borderWidth: 1,
      textStyle: {
        color: '#334155'
      }
    },
    legend: {
      data: ['Referrals Sent', 'Referrals Received', 'Completed'],
      textStyle: {
        color: '#64748b'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
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
        name: 'Referrals Sent',
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
              {
                offset: 0,
                color: 'rgba(14,165,233,0.3)'
              },
              {
                offset: 1,
                color: 'rgba(14,165,233,0.1)'
              }
            ]
          }
        },
        data: [12, 18, 25, 32, 28, 35, 42]
      },
      {
        name: 'Referrals Received',
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
              {
                offset: 0,
                color: 'rgba(16,185,129,0.3)'
              },
              {
                offset: 1,
                color: 'rgba(16,185,129,0.1)'
              }
            ]
          }
        },
        data: [8, 15, 22, 28, 25, 31, 38]
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
              {
                offset: 0,
                color: 'rgba(139,92,246,0.3)'
              },
              {
                offset: 1,
                color: 'rgba(139,92,246,0.1)'
              }
            ]
          }
        },
        data: [7, 14, 20, 26, 23, 29, 36]
      }
    ]
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-orange-100 text-orange-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const subscriptionLimits = getSubscriptionLimits();

  return (
    <div className="min-h-screen bg-dental-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl font-bold text-dental-900 mb-2 flex items-center space-x-3"
              >
                <span>Dashboard</span>
                {isSuperAdmin() && (
                  <div className="flex items-center space-x-2">
                    <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                      <SafeIcon icon={FiShield} className="w-4 h-4" />
                      <span>Super Admin</span>
                    </div>
                  </div>
                )}
                {subscriptionLevel === 'celestial' && (
                  <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                    <SafeIcon icon={FiCrown} className="w-4 h-4" />
                    <span>Celestial</span>
                  </div>
                )}
              </motion.h1>
              <p className="text-dental-600">
                Welcome back! Here's what's happening with your referrals.
                {isSuperAdmin() && (
                  <span className="text-purple-600 font-medium"> You have full system access.</span>
                )}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              {/* Real-time Status */}
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className="text-sm text-dental-600">
                  {isConnected ? 'Live' : 'Offline'}
                </span>
              </div>
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="flex items-center space-x-2 px-4 py-2 bg-white border border-dental-200 rounded-lg hover:bg-dental-50 transition-colors disabled:opacity-50"
              >
                <SafeIcon icon={FiRefreshCw} className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </button>
            </div>
          </div>
        </div>

        {/* Subscription Limits Display */}
        {subscriptionLevel !== 'celestial' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-4 rounded-xl shadow-lg mb-8 border-l-4 border-primary-500"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-dental-900 capitalize">{subscriptionLevel} Plan</h3>
                <p className="text-dental-600 text-sm">
                  {subscriptionLimits.referrals === -1 ? 'Unlimited' : `${subscriptionLimits.referrals}/month`} referrals •{' '}
                  {subscriptionLimits.users === -1 ? 'Unlimited' : subscriptionLimits.users} users •{' '}
                  {subscriptionLimits.features} features
                </p>
              </div>
              <button className="text-primary-600 hover:text-primary-700 font-medium">
                Upgrade Plan
              </button>
            </div>
          </motion.div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-dental-600 text-sm font-medium">{stat.title}</p>
                  <p className="text-2xl font-bold text-dental-900 mt-1">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  stat.color === 'primary' ? 'bg-primary-100' :
                  stat.color === 'green' ? 'bg-green-100' :
                  stat.color === 'blue' ? 'bg-blue-100' : 'bg-purple-100'
                }`}>
                  <SafeIcon icon={stat.icon} className={`w-6 h-6 ${
                    stat.color === 'primary' ? 'text-primary-600' :
                    stat.color === 'green' ? 'text-green-600' :
                    stat.color === 'blue' ? 'text-blue-600' : 'text-purple-600'
                  }`} />
                </div>
              </div>
              <div className="flex items-center mt-4">
                <SafeIcon icon={stat.trend === 'up' ? FiArrowUp : FiArrowDown} className={`w-4 h-4 mr-1 ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`} />
                <span className={`text-sm font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change}
                </span>
                <span className="text-dental-500 text-sm ml-2">from last month</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Chart and Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-dental-900">Referral Trends</h2>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-3 py-2 border border-dental-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
            </div>
            <ReactECharts option={chartOptions} style={{ height: '350px' }} />
          </motion.div>

          {/* Enhanced Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <QuickActions />
          </motion.div>
        </div>

        {/* Recent Referrals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-xl shadow-lg"
        >
          <div className="p-6 border-b border-dental-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-dental-900">Recent Referrals</h2>
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
                    Patient
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-dental-500 uppercase tracking-wider">
                    Specialty
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-dental-500 uppercase tracking-wider">
                    Doctor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-dental-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-dental-500 uppercase tracking-wider">
                    Priority
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-dental-500 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-dental-200">
                {recentReferrals.map((referral) => (
                  <tr key={referral.id} className="hover:bg-dental-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-dental-900">{referral.patient}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-dental-900">{referral.specialty}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-dental-900">{referral.doctor}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(referral.status)}`}>
                        {referral.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(referral.priority)}`}>
                        {referral.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-dental-500">
                      {referral.date}
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

export default Dashboard;