import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import ReactECharts from 'echarts-for-react';
import { DatabaseService } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../hooks/useNotifications';

const {
  FiActivity, FiTrendingUp, FiClock, FiCheckCircle, FiAlertCircle, FiUsers,
  FiCalendar, FiMapPin, FiPhone, FiMail, FiMessageSquare, FiEye, FiEdit,
  FiFilter, FiDownload, FiRefreshCw, FiBarChart, FiTarget, FiStar, FiArrowUp,
  FiArrowDown, FiMoreVertical, FiFileText, FiShare2, FiPrinter, FiX, FiSearch,
  FiDollarSign, FiPercent, FiClock3, FiAward, FiTrendingDown, FiZap, FiHeart,
  FiThumbsUp, FiThumbsDown, FiAlertTriangle, FiInfo, FiChevronRight, FiChevronDown
} = FiIcons;

const ReferralTracking = () => {
  const { user } = useAuth();
  const { addNotification } = useNotifications();
  
  const [selectedReferral, setSelectedReferral] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('30d');
  const [statusFilter, setStatusFilter] = useState('All');
  const [specialtyFilter, setSpecialtyFilter] = useState('All');
  const [loading, setLoading] = useState(false);
  const [referrals, setReferrals] = useState([]);
  const [trackingData, setTrackingData] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [expandedTimeline, setExpandedTimeline] = useState({});

  // Enhanced mock data with comprehensive tracking information
  const enhancedReferrals = [
    {
      id: 'ref_001',
      patientName: 'Sarah Johnson',
      patientEmail: 'sarah.j@email.com',
      patientPhone: '+1 (555) 123-4567',
      patientAge: 34,
      specialty: 'Orthodontics',
      referringDoctor: 'Dr. Michael Chen',
      receivingDoctor: 'Dr. Emily Rodriguez',
      receivingPractice: 'Elite Orthodontics',
      status: 'Completed',
      priority: 'High',
      urgency: 'Routine',
      dateCreated: '2024-01-15',
      dateScheduled: '2024-01-18',
      dateCompleted: '2024-01-25',
      estimatedValue: 3500,
      actualValue: 3200,
      patientSatisfaction: 5.0,
      referralSource: 'Direct',
      insuranceProvider: 'Delta Dental',
      timeline: [
        {
          status: 'Created',
          date: '2024-01-15 09:30 AM',
          description: 'Referral created and sent to Dr. Rodriguez',
          completedBy: 'Dr. Michael Chen',
          duration: null,
          automated: false
        },
        {
          status: 'Received',
          date: '2024-01-15 10:45 AM',
          description: 'Referral received and reviewed by specialist',
          completedBy: 'Dr. Emily Rodriguez',
          duration: '1h 15m',
          automated: false
        },
        {
          status: 'Scheduled',
          date: '2024-01-16 02:15 PM',
          description: 'Patient appointment scheduled for consultation',
          completedBy: 'Elite Orthodontics Staff',
          duration: '1d 3h 30m',
          automated: true
        },
        {
          status: 'Consultation',
          date: '2024-01-18 10:00 AM',
          description: 'Initial consultation completed successfully',
          completedBy: 'Dr. Emily Rodriguez',
          duration: '2d 7h 45m',
          automated: false
        },
        {
          status: 'Treatment Plan',
          date: '2024-01-20 03:30 PM',
          description: 'Comprehensive treatment plan created and approved',
          completedBy: 'Dr. Emily Rodriguez',
          duration: '2d 5h 30m',
          automated: false
        },
        {
          status: 'Completed',
          date: '2024-01-25 11:00 AM',
          description: 'Treatment initiated - referral successfully completed',
          completedBy: 'Dr. Emily Rodriguez',
          duration: '5d 7h 30m',
          automated: false
        }
      ],
      notes: 'Patient requires comprehensive orthodontic treatment. Excellent cooperation and compliance. Insurance pre-authorization obtained.',
      followUps: [
        {
          date: '2024-01-30',
          type: 'Progress Check',
          status: 'Scheduled',
          notes: 'First follow-up appointment to assess progress'
        },
        {
          date: '2024-02-15',
          type: 'Adjustment',
          status: 'Pending',
          notes: 'Routine adjustment appointment'
        }
      ],
      metrics: {
        responseTime: '1h 15m',
        schedulingTime: '3 days',
        completionTime: '10 days',
        totalDuration: '10d 7h 30m',
        efficiency: 92,
        communicationScore: 98
      },
      communications: [
        {
          type: 'Email',
          date: '2024-01-15 09:35 AM',
          from: 'Dr. Michael Chen',
          to: 'Dr. Emily Rodriguez',
          subject: 'Orthodontic Referral - Sarah Johnson',
          status: 'Delivered'
        },
        {
          type: 'Phone',
          date: '2024-01-16 10:00 AM',
          from: 'Elite Orthodontics',
          to: 'Sarah Johnson',
          subject: 'Appointment Confirmation',
          status: 'Completed'
        }
      ],
      alerts: [
        {
          type: 'success',
          message: 'Insurance pre-authorization approved',
          date: '2024-01-17'
        }
      ]
    },
    {
      id: 'ref_002',
      patientName: 'Robert Smith',
      patientEmail: 'robert.s@email.com',
      patientPhone: '+1 (555) 987-6543',
      patientAge: 45,
      specialty: 'Oral Surgery',
      referringDoctor: 'Dr. Sarah Johnson',
      receivingDoctor: 'Dr. James Wilson',
      receivingPractice: 'Advanced Oral Surgery',
      status: 'In Progress',
      priority: 'Medium',
      urgency: 'Urgent',
      dateCreated: '2024-01-20',
      dateScheduled: '2024-01-22',
      dateCompleted: null,
      estimatedValue: 2800,
      actualValue: null,
      patientSatisfaction: null,
      referralSource: 'Emergency',
      insuranceProvider: 'Cigna',
      timeline: [
        {
          status: 'Created',
          date: '2024-01-20 11:00 AM',
          description: 'Emergency referral for wisdom tooth extraction',
          completedBy: 'Dr. Sarah Johnson',
          duration: null,
          automated: false
        },
        {
          status: 'Received',
          date: '2024-01-20 11:30 AM',
          description: 'Urgent referral received and prioritized',
          completedBy: 'Dr. James Wilson',
          duration: '30m',
          automated: false
        },
        {
          status: 'Scheduled',
          date: '2024-01-20 02:00 PM',
          description: 'Emergency consultation scheduled for next available slot',
          completedBy: 'Advanced Oral Surgery Staff',
          duration: '2h 30m',
          automated: true
        },
        {
          status: 'Consultation',
          date: '2024-01-22 09:00 AM',
          description: 'Emergency consultation completed, surgery scheduled',
          completedBy: 'Dr. James Wilson',
          duration: '2d 7h',
          automated: false
        }
      ],
      notes: 'Impacted wisdom teeth causing severe pain. Emergency surgery recommended within 48 hours.',
      followUps: [
        {
          date: '2024-01-24',
          type: 'Surgery',
          status: 'Scheduled',
          notes: 'Wisdom tooth extraction surgery'
        }
      ],
      metrics: {
        responseTime: '30m',
        schedulingTime: '2h 30m',
        completionTime: 'In Progress',
        totalDuration: 'Ongoing',
        efficiency: 95,
        communicationScore: 88
      },
      communications: [
        {
          type: 'Phone',
          date: '2024-01-20 11:15 AM',
          from: 'Dr. Sarah Johnson',
          to: 'Dr. James Wilson',
          subject: 'Emergency Referral Discussion',
          status: 'Completed'
        }
      ],
      alerts: [
        {
          type: 'warning',
          message: 'Patient experiencing severe pain - expedite scheduling',
          date: '2024-01-20'
        }
      ]
    },
    {
      id: 'ref_003',
      patientName: 'Maria Garcia',
      patientEmail: 'maria.g@email.com',
      patientPhone: '+1 (555) 456-7890',
      patientAge: 28,
      specialty: 'Periodontics',
      referringDoctor: 'Dr. Michael Chen',
      receivingDoctor: 'Dr. Lisa Park',
      receivingPractice: 'Gum Health Center',
      status: 'Pending',
      priority: 'Low',
      urgency: 'Routine',
      dateCreated: '2024-01-22',
      dateScheduled: null,
      dateCompleted: null,
      estimatedValue: 1500,
      actualValue: null,
      patientSatisfaction: null,
      referralSource: 'Routine Checkup',
      insuranceProvider: 'MetLife',
      timeline: [
        {
          status: 'Created',
          date: '2024-01-22 03:45 PM',
          description: 'Referral created for periodontal evaluation',
          completedBy: 'Dr. Michael Chen',
          duration: null,
          automated: false
        },
        {
          status: 'Sent',
          date: '2024-01-22 03:47 PM',
          description: 'Referral sent to Dr. Lisa Park for review',
          completedBy: 'System',
          duration: '2m',
          automated: true
        }
      ],
      notes: 'Patient showing early signs of gum disease. Preventive periodontal care recommended.',
      followUps: [],
      metrics: {
        responseTime: 'Pending',
        schedulingTime: 'Pending',
        completionTime: 'Pending',
        totalDuration: 'Ongoing',
        efficiency: null,
        communicationScore: null
      },
      communications: [
        {
          type: 'Email',
          date: '2024-01-22 03:47 PM',
          from: 'System',
          to: 'Dr. Lisa Park',
          subject: 'New Periodontal Referral - Maria Garcia',
          status: 'Delivered'
        }
      ],
      alerts: [
        {
          type: 'info',
          message: 'Awaiting specialist response',
          date: '2024-01-22'
        }
      ]
    }
  ];

  // Load referrals and tracking data
  useEffect(() => {
    loadTrackingData();
  }, [user, timeRange, statusFilter, specialtyFilter]);

  const loadTrackingData = async () => {
    if (!user?.userId) return;
    
    setLoading(true);
    try {
      // Enhanced mock data for demonstration
      setReferrals(enhancedReferrals);
      
      // Calculate comprehensive tracking analytics
      const totalValue = enhancedReferrals.reduce((sum, r) => sum + (r.actualValue || r.estimatedValue), 0);
      const completedCount = enhancedReferrals.filter(r => r.status === 'Completed').length;
      const conversionRate = enhancedReferrals.length > 0 ? (completedCount / enhancedReferrals.length * 100).toFixed(1) : 0;
      
      setTrackingData({
        totalReferrals: enhancedReferrals.length,
        completedReferrals: completedCount,
        inProgressReferrals: enhancedReferrals.filter(r => r.status === 'In Progress').length,
        pendingReferrals: enhancedReferrals.filter(r => r.status === 'Pending').length,
        averageResponseTime: '45 minutes',
        averageCompletionTime: '8.5 days',
        totalValue: totalValue,
        conversionRate: parseFloat(conversionRate),
        averagePatientSatisfaction: 4.8,
        averageEfficiency: 93,
        communicationScore: 91
      });
    } catch (error) {
      console.error('Error loading tracking data:', error);
      addNotification({
        type: 'error',
        title: 'Loading Error',
        message: 'Failed to load referral tracking data',
        autoRemove: true
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
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

  const getTimelineIcon = (status) => {
    switch (status) {
      case 'Created': return FiFileText;
      case 'Received': return FiCheckCircle;
      case 'Scheduled': return FiCalendar;
      case 'Consultation': return FiUsers;
      case 'Treatment Plan': return FiTarget;
      case 'Completed': return FiStar;
      case 'Sent': return FiShare2;
      default: return FiActivity;
    }
  };

  const getEfficiencyColor = (efficiency) => {
    if (efficiency >= 90) return 'text-green-600';
    if (efficiency >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  const exportReport = async () => {
    try {
      const csvData = referrals.map(referral => ({
        'Patient Name': referral.patientName,
        'Specialty': referral.specialty,
        'Status': referral.status,
        'Created Date': referral.dateCreated,
        'Receiving Doctor': referral.receivingDoctor,
        'Estimated Value': referral.estimatedValue,
        'Actual Value': referral.actualValue || 'N/A',
        'Response Time': referral.metrics.responseTime,
        'Completion Time': referral.metrics.completionTime,
        'Patient Satisfaction': referral.patientSatisfaction || 'N/A',
        'Efficiency Score': referral.metrics.efficiency || 'N/A'
      }));
      
      const csv = convertToCSV(csvData);
      downloadCSV(csv, 'referral-tracking-report.csv');
      
      addNotification({
        type: 'referral',
        title: 'Report Exported',
        message: 'Comprehensive referral tracking report exported successfully',
        autoRemove: true
      });
    } catch (error) {
      console.error('Export error:', error);
      addNotification({
        type: 'error',
        title: 'Export Failed',
        message: 'Failed to export report',
        autoRemove: true
      });
    }
  };

  const convertToCSV = (data) => {
    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(','),
      ...data.map(row => headers.map(header => JSON.stringify(row[header])).join(','))
    ].join('\n');
    return csvContent;
  };

  const downloadCSV = (csv, filename) => {
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const filteredReferrals = referrals.filter(referral => {
    const matchesSearch = referral.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         referral.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         referral.receivingDoctor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || referral.status === statusFilter;
    const matchesSpecialty = specialtyFilter === 'All' || referral.specialty === specialtyFilter;
    
    return matchesSearch && matchesStatus && matchesSpecialty;
  });

  // Enhanced chart options
  const referralFlowOptions = {
    title: {
      text: 'Referral Flow Analysis',
      left: 'center',
      textStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1e293b'
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a}<br/>{b}: {c} ({d%})'
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      top: 'middle'
    },
    series: [{
      name: 'Referral Status',
      type: 'pie',
      radius: ['40%', '70%'],
      center: ['60%', '50%'],
      data: [
        { value: trackingData.completedReferrals || 0, name: 'Completed', itemStyle: { color: '#10b981' } },
        { value: trackingData.inProgressReferrals || 0, name: 'In Progress', itemStyle: { color: '#0ea5e9' } },
        { value: trackingData.pendingReferrals || 0, name: 'Pending', itemStyle: { color: '#f59e0b' } }
      ]
    }]
  };

  const performanceMetricsOptions = {
    title: {
      text: 'Performance Metrics Trends',
      left: 'center',
      textStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1e293b'
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    legend: {
      data: ['Response Time (hours)', 'Completion Rate (%)', 'Patient Satisfaction', 'Efficiency Score'],
      top: 40
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
      data: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      axisLine: {
        lineStyle: {
          color: '#e2e8f0'
        }
      }
    },
    yAxis: [
      {
        type: 'value',
        name: 'Hours / Percentage',
        position: 'left',
        axisLabel: {
          color: '#64748b'
        }
      }
    ],
    series: [
      {
        name: 'Response Time (hours)',
        type: 'line',
        smooth: true,
        data: [2.1, 1.8, 1.5, 1.2],
        lineStyle: { color: '#0ea5e9', width: 3 },
        itemStyle: { color: '#0ea5e9' }
      },
      {
        name: 'Completion Rate (%)',
        type: 'line',
        smooth: true,
        data: [85, 88, 91, 94],
        lineStyle: { color: '#10b981', width: 3 },
        itemStyle: { color: '#10b981' }
      },
      {
        name: 'Patient Satisfaction',
        type: 'line',
        smooth: true,
        data: [4.2, 4.5, 4.7, 4.8],
        lineStyle: { color: '#8b5cf6', width: 3 },
        itemStyle: { color: '#8b5cf6' }
      },
      {
        name: 'Efficiency Score',
        type: 'line',
        smooth: true,
        data: [88, 90, 92, 93],
        lineStyle: { color: '#f59e0b', width: 3 },
        itemStyle: { color: '#f59e0b' }
      }
    ]
  };

  const toggleTimelineExpansion = (referralId) => {
    setExpandedTimeline(prev => ({
      ...prev,
      [referralId]: !prev[referralId]
    }));
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Enhanced Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-dental-900 mb-2">Advanced Referral Tracking</h1>
          <p className="text-dental-600">
            Comprehensive monitoring and analysis of your referral performance with detailed insights
          </p>
        </div>
      </motion.div>

      {/* Enhanced Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col lg:flex-row items-start lg:items-center justify-between bg-white rounded-lg p-4 shadow-lg space-y-4 lg:space-y-0"
      >
        <div className="flex flex-wrap items-center gap-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="border border-dental-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-dental-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500"
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          
          <select
            value={specialtyFilter}
            onChange={(e) => setSpecialtyFilter(e.target.value)}
            className="border border-dental-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500"
          >
            <option value="All">All Specialties</option>
            <option value="Orthodontics">Orthodontics</option>
            <option value="Oral Surgery">Oral Surgery</option>
            <option value="Periodontics">Periodontics</option>
            <option value="Endodontics">Endodontics</option>
          </select>
          
          <div className="relative">
            <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dental-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search referrals..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-dental-300 rounded-lg px-3 py-2 pl-10 focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={loadTrackingData}
            disabled={loading}
            className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 transition-colors"
          >
            <SafeIcon icon={FiRefreshCw} className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
          <button
            onClick={exportReport}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <SafeIcon icon={FiDownload} className="w-4 h-4" />
            <span>Export Report</span>
          </button>
        </div>
      </motion.div>

      {/* Enhanced KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: 'Total Referrals',
            value: trackingData.totalReferrals || 0,
            change: '+12%',
            trend: 'up',
            icon: FiUsers,
            color: 'primary',
            subtitle: 'from last month'
          },
          {
            title: 'Conversion Rate',
            value: `${trackingData.conversionRate || 0}%`,
            change: '+5.3%',
            trend: 'up',
            icon: FiTrendingUp,
            color: 'green',
            subtitle: 'completion rate'
          },
          {
            title: 'Avg Response Time',
            value: trackingData.averageResponseTime || 'N/A',
            change: '-18%',
            trend: 'down',
            icon: FiClock,
            color: 'yellow',
            subtitle: 'faster responses'
          },
          {
            title: 'Patient Satisfaction',
            value: trackingData.averagePatientSatisfaction || 'N/A',
            change: '+2.1%',
            trend: 'up',
            icon: FiStar,
            color: 'purple',
            subtitle: 'average rating'
          }
        ].map((metric, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.05 }}
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-lg p-6 shadow-lg border border-dental-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-dental-600">{metric.title}</p>
                <p className="text-2xl font-bold text-dental-900">{metric.value}</p>
                <p className={`text-sm flex items-center ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  <SafeIcon icon={metric.trend === 'up' ? FiArrowUp : FiArrowDown} className="w-4 h-4 mr-1" />
                  {metric.change} {metric.subtitle}
                </p>
              </div>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                metric.color === 'primary' ? 'bg-primary-100' :
                metric.color === 'green' ? 'bg-green-100' :
                metric.color === 'yellow' ? 'bg-yellow-100' : 'bg-purple-100'
              }`}>
                <SafeIcon icon={metric.icon} className={`w-6 h-6 ${
                  metric.color === 'primary' ? 'text-primary-600' :
                  metric.color === 'green' ? 'text-green-600' :
                  metric.color === 'yellow' ? 'text-yellow-600' : 'text-purple-600'
                }`} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-lg p-6 shadow-lg border border-dental-200"
        >
          <ReactECharts option={referralFlowOptions} style={{ height: '300px' }} />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-lg p-6 shadow-lg border border-dental-200"
        >
          <ReactECharts option={performanceMetricsOptions} style={{ height: '300px' }} />
        </motion.div>
      </div>

      {/* Referrals List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-white rounded-lg shadow-lg border border-dental-200"
      >
        <div className="p-6 border-b border-dental-200">
          <h3 className="text-lg font-semibold text-dental-900">Recent Referrals ({filteredReferrals.length})</h3>
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
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-dental-500 uppercase tracking-wider">
                  Progress
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-dental-500 uppercase tracking-wider">
                  Value
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-dental-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-dental-200">
              {filteredReferrals.map((referral) => (
                <tr key={referral.id} className="hover:bg-dental-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-dental-900">{referral.patientName}</div>
                      <div className="text-sm text-dental-500">{referral.receivingDoctor}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-dental-900">{referral.specialty}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(referral.status)}`}>
                      {referral.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-full bg-dental-200 rounded-full h-2 mr-3">
                        <div
                          className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${((referral.timeline?.length || 1) / 6) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-dental-500">{referral.timeline?.length || 1} of 6 steps</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-dental-900">
                      ${(referral.actualValue || referral.estimatedValue || 0).toLocaleString()}
                      {!referral.actualValue && (
                        <span className="text-xs text-dental-500 block">Estimated</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => setSelectedReferral(referral)}
                      className="text-primary-600 hover:text-primary-900 mr-3 transition-colors"
                    >
                      <SafeIcon icon={FiEye} className="w-4 h-4" />
                    </button>
                    <button className="text-dental-600 hover:text-dental-900 transition-colors">
                      <SafeIcon icon={FiMoreVertical} className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Detailed Referral Modal */}
      <AnimatePresence>
        {selectedReferral && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-dental-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-dental-900">
                    Referral Details - {selectedReferral.patientName}
                  </h2>
                  <button
                    onClick={() => setSelectedReferral(null)}
                    className="text-dental-400 hover:text-dental-600"
                  >
                    <SafeIcon icon={FiX} className="w-6 h-6" />
                  </button>
                </div>
              </div>
              
              <div className="p-6 space-y-6">
                {/* Patient Information */}
                <div className="bg-dental-50 rounded-lg p-4">
                  <h3 className="font-semibold text-dental-900 mb-3">Patient Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-dental-600">Name</label>
                      <p className="font-medium">{selectedReferral.patientName}</p>
                    </div>
                    <div>
                      <label className="text-sm text-dental-600">Email</label>
                      <p className="font-medium">{selectedReferral.patientEmail}</p>
                    </div>
                    <div>
                      <label className="text-sm text-dental-600">Phone</label>
                      <p className="font-medium">{selectedReferral.patientPhone}</p>
                    </div>
                    <div>
                      <label className="text-sm text-dental-600">Age</label>
                      <p className="font-medium">{selectedReferral.patientAge}</p>
                    </div>
                  </div>
                </div>

                {/* Timeline */}
                <div className="bg-dental-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-dental-900">Referral Timeline</h3>
                    <button
                      onClick={() => toggleTimelineExpansion(selectedReferral.id)}
                      className="text-primary-600 hover:text-primary-700"
                    >
                      <SafeIcon 
                        icon={expandedTimeline[selectedReferral.id] ? FiChevronUp : FiChevronDown} 
                        className="w-5 h-5" 
                      />
                    </button>
                  </div>
                  <div className="space-y-4">
                    {selectedReferral.timeline?.slice(0, expandedTimeline[selectedReferral.id] ? undefined : 3).map((step, index) => {
                      const Icon = getTimelineIcon(step.status);
                      return (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="flex-shrink-0 w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                            <SafeIcon icon={Icon} className="w-4 h-4 text-primary-600" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium text-dental-900">{step.status}</h4>
                              <span className="text-sm text-dental-500">{step.date}</span>
                            </div>
                            <p className="text-sm text-dental-600 mt-1">{step.description}</p>
                            <div className="flex items-center space-x-4 mt-1">
                              <p className="text-xs text-dental-500">By: {step.completedBy}</p>
                              {step.duration && (
                                <p className="text-xs text-dental-500">Duration: {step.duration}</p>
                              )}
                              {step.automated && (
                                <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                                  Automated
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Metrics */}
                <div className="bg-dental-50 rounded-lg p-4">
                  <h3 className="font-semibold text-dental-900 mb-3">Performance Metrics</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <label className="text-sm text-dental-600">Response Time</label>
                      <p className="font-medium">{selectedReferral.metrics?.responseTime || 'N/A'}</p>
                    </div>
                    <div>
                      <label className="text-sm text-dental-600">Completion Time</label>
                      <p className="font-medium">{selectedReferral.metrics?.completionTime || 'N/A'}</p>
                    </div>
                    <div>
                      <label className="text-sm text-dental-600">Efficiency Score</label>
                      <p className={`font-medium ${getEfficiencyColor(selectedReferral.metrics?.efficiency)}`}>
                        {selectedReferral.metrics?.efficiency || 'N/A'}
                        {selectedReferral.metrics?.efficiency && '%'}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm text-dental-600">Patient Satisfaction</label>
                      <p className="font-medium">
                        {selectedReferral.patientSatisfaction ? 
                          `${selectedReferral.patientSatisfaction}/5.0` : 'N/A'
                        }
                      </p>
                    </div>
                  </div>
                </div>

                {/* Alerts */}
                {selectedReferral.alerts && selectedReferral.alerts.length > 0 && (
                  <div className="bg-dental-50 rounded-lg p-4">
                    <h3 className="font-semibold text-dental-900 mb-3">Alerts & Notifications</h3>
                    <div className="space-y-2">
                      {selectedReferral.alerts.map((alert, index) => (
                        <div key={index} className={`flex items-center space-x-2 p-3 rounded-lg ${
                          alert.type === 'success' ? 'bg-green-50 border border-green-200' :
                          alert.type === 'warning' ? 'bg-yellow-50 border border-yellow-200' :
                          'bg-blue-50 border border-blue-200'
                        }`}>
                          <SafeIcon 
                            icon={
                              alert.type === 'success' ? FiCheckCircle :
                              alert.type === 'warning' ? FiAlertTriangle : FiInfo
                            } 
                            className={`w-4 h-4 ${
                              alert.type === 'success' ? 'text-green-600' :
                              alert.type === 'warning' ? 'text-yellow-600' : 'text-blue-600'
                            }`} 
                          />
                          <span className="text-sm">{alert.message}</span>
                          <span className="text-xs text-dental-500 ml-auto">{alert.date}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Notes */}
                <div className="bg-dental-50 rounded-lg p-4">
                  <h3 className="font-semibold text-dental-900 mb-3">Clinical Notes</h3>
                  <p className="text-dental-700">{selectedReferral.notes || 'No additional notes provided.'}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ReferralTracking;