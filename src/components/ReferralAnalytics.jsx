import React from 'react';
import { motion } from 'framer-motion';
import ReactECharts from 'echarts-for-react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiTrendingUp, FiUsers, FiDollarSign, FiTarget, FiCalendar, FiAward } = FiIcons;

const ReferralAnalytics = ({ referralStats }) => {
  // Generate chart data for referral trends
  const getReferralTrendChart = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const referrals = [8, 12, 15, 10, 18, 24];
    const successful = [6, 9, 12, 8, 15, 20];

    return {
      title: {
        text: 'Referral Trends',
        textStyle: {
          fontSize: 16,
          fontWeight: 'bold',
          color: '#1f2937'
        }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        }
      },
      legend: {
        data: ['Total Referrals', 'Successful Referrals']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: months
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'Total Referrals',
          type: 'line',
          data: referrals,
          smooth: true,
          lineStyle: {
            color: '#3b82f6'
          },
          itemStyle: {
            color: '#3b82f6'
          }
        },
        {
          name: 'Successful Referrals',
          type: 'line',
          data: successful,
          smooth: true,
          lineStyle: {
            color: '#10b981'
          },
          itemStyle: {
            color: '#10b981'
          }
        }
      ]
    };
  };

  // Generate chart data for referral sources
  const getReferralSourceChart = () => {
    return {
      title: {
        text: 'Referral Sources',
        textStyle: {
          fontSize: 16,
          fontWeight: 'bold',
          color: '#1f2937'
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: 'Referral Source',
          type: 'pie',
          radius: '50%',
          data: [
            { value: 35, name: 'Direct Invitation' },
            { value: 25, name: 'Social Media' },
            { value: 20, name: 'Email' },
            { value: 15, name: 'Word of Mouth' },
            { value: 5, name: 'Other' }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
  };

  // Generate chart data for conversion rates
  const getConversionChart = () => {
    const specialties = ['Orthodontics', 'Oral Surgery', 'Periodontics', 'Endodontics', 'Pediatric'];
    const conversionRates = [85, 72, 90, 68, 95];

    return {
      title: {
        text: 'Conversion Rates by Specialty',
        textStyle: {
          fontSize: 16,
          fontWeight: 'bold',
          color: '#1f2937'
        }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
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
        data: specialties,
        axisLabel: {
          interval: 0,
          rotate: 45
        }
      },
      yAxis: {
        type: 'value',
        max: 100,
        axisLabel: {
          formatter: '{value}%'
        }
      },
      series: [
        {
          name: 'Conversion Rate',
          type: 'bar',
          data: conversionRates,
          itemStyle: {
            color: '#8b5cf6'
          },
          label: {
            show: true,
            position: 'top',
            formatter: '{c}%'
          }
        }
      ]
    };
  };

  const performanceMetrics = [
    {
      title: 'Monthly Growth',
      value: '+34%',
      description: 'Referrals vs last month',
      icon: FiTrendingUp,
      color: 'green',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Top Performing Specialty',
      value: 'Pediatric',
      description: '95% conversion rate',
      icon: FiAward,
      color: 'purple',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Avg. Time to Convert',
      value: '2.8 days',
      description: 'From referral to signup',
      icon: FiCalendar,
      color: 'blue',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Network Effect',
      value: '3.2x',
      description: 'Referrals per active user',
      icon: FiUsers,
      color: 'orange',
      bgColor: 'bg-orange-50'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {performanceMetrics.map((metric, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`${metric.bgColor} p-4 rounded-lg border border-gray-200`}
          >
            <div className="flex items-center justify-between">
              <div className={`w-10 h-10 rounded-lg bg-${metric.color}-100 flex items-center justify-center`}>
                <SafeIcon icon={metric.icon} className={`w-5 h-5 text-${metric.color}-600`} />
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                <p className="text-sm text-gray-600">{metric.title}</p>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">{metric.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Referral Trends Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-xl shadow-lg"
        >
          <ReactECharts
            option={getReferralTrendChart()}
            style={{ height: '300px' }}
          />
        </motion.div>

        {/* Referral Sources Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-6 rounded-xl shadow-lg"
        >
          <ReactECharts
            option={getReferralSourceChart()}
            style={{ height: '300px' }}
          />
        </motion.div>
      </div>

      {/* Conversion Rates Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white p-6 rounded-xl shadow-lg"
      >
        <ReactECharts
          option={getConversionChart()}
          style={{ height: '400px' }}
        />
      </motion.div>

      {/* Insights and Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white p-6 rounded-xl shadow-lg"
      >
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Insights & Recommendations
        </h3>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
            <div>
              <p className="text-gray-800 font-medium">Strong Growth Momentum</p>
              <p className="text-gray-600 text-sm">Your referral program is showing excellent growth with 34% increase this month.</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
            <div>
              <p className="text-gray-800 font-medium">Pediatric Specialty Excellence</p>
              <p className="text-gray-600 text-sm">Pediatric referrals have the highest conversion rate. Consider featuring this specialty more prominently.</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
            <div>
              <p className="text-gray-800 font-medium">Improve Endodontics Conversion</p>
              <p className="text-gray-600 text-sm">Endodontics has the lowest conversion rate. Consider reviewing the referral process for this specialty.</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
            <div>
              <p className="text-gray-800 font-medium">Leverage Social Media</p>
              <p className="text-gray-600 text-sm">Social media accounts for 25% of referrals. Consider creating specialized social media campaigns.</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ReferralAnalytics;