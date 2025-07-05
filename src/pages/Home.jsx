import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useAuth } from '../context/AuthContext';

const {
  FiArrowRight,
  FiUsers,
  FiTrendingUp,
  FiShield,
  FiZap,
  FiStar,
  FiActivity,
  FiBarChart3
} = FiIcons;

const Home = () => {
  const { isAuthenticated, user } = useAuth();

  const features = [
    {
      icon: FiUsers,
      title: "Professional Network",
      description: "Connect with verified dental professionals across all specialties"
    },
    {
      icon: FiTrendingUp,
      title: "Referral Tracking",
      description: "Track and manage all your referrals with detailed analytics"
    },
    {
      icon: FiShield,
      title: "HIPAA Compliant",
      description: "Secure platform ensuring patient privacy and data protection"
    },
    {
      icon: FiZap,
      title: "Instant Notifications",
      description: "Real-time updates on referral status and patient progress"
    }
  ];

  const testimonials = [
    {
      name: "Dr. Sarah Johnson",
      role: "Oral Surgeon",
      practice: "Elite Dental Care",
      rating: 5,
      text: "Link.Refer.Dental has revolutionized how we manage referrals. The platform is intuitive and has significantly improved our patient coordination."
    },
    {
      name: "Dr. Michael Chen",
      role: "Orthodontist",
      practice: "Smile Specialists",
      rating: 5,
      text: "The referral tracking features are outstanding. We've seen a 40% increase in referral completion rates since using this platform."
    },
    {
      name: "Dr. Emily Rodriguez",
      role: "Periodontist",
      practice: "Gum Health Center",
      rating: 5,
      text: "Finally, a platform designed specifically for dental professionals. The networking features have helped me connect with amazing colleagues."
    }
  ];

  const stats = [
    { number: "10,000+", label: "Dental Professionals" },
    { number: "50,000+", label: "Referrals Tracked" },
    { number: "98%", label: "Success Rate" },
    { number: "24/7", label: "Support Available" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-dental-900 mb-6"
            >
              The Future of
              <span className="bg-gradient-to-r from-primary-500 to-primary-600 bg-clip-text text-transparent">
                {' '}Dental Referrals
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-dental-600 mb-8 max-w-3xl mx-auto"
            >
              Connect with dental professionals, streamline referrals, and grow your practice with our comprehensive referral management platform.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              {isAuthenticated ? (
                <>
                  {/* Dashboard Button for Authenticated Users */}
                  <Link
                    to="/dashboard"
                    className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-primary-600 hover:to-primary-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2"
                  >
                    <SafeIcon icon={FiBarChart3} className="w-5 h-5" />
                    <span>Go to Dashboard</span>
                    <SafeIcon icon={FiArrowRight} className="w-5 h-5" />
                  </Link>
                  <Link
                    to="/referrals"
                    className="border-2 border-primary-200 text-primary-600 px-8 py-4 rounded-xl font-semibold hover:bg-primary-50 transition-all duration-200 flex items-center space-x-2"
                  >
                    <SafeIcon icon={FiActivity} className="w-5 h-5" />
                    <span>Manage Referrals</span>
                  </Link>
                </>
              ) : (
                <>
                  {/* Login/Signup Buttons for Non-Authenticated Users */}
                  <Link
                    to="/login"
                    className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-primary-600 hover:to-primary-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2"
                  >
                    <span>Start Free Trial</span>
                    <SafeIcon icon={FiArrowRight} className="w-5 h-5" />
                  </Link>
                  <Link
                    to="/features"
                    className="border-2 border-primary-200 text-primary-600 px-8 py-4 rounded-xl font-semibold hover:bg-primary-50 transition-all duration-200"
                  >
                    Learn More
                  </Link>
                </>
              )}
            </motion.div>

            {/* User Welcome Message for Authenticated Users */}
            {isAuthenticated && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="mt-8 p-4 bg-primary-50 border border-primary-200 rounded-xl max-w-md mx-auto"
              >
                <p className="text-primary-700">
                  Welcome back! Access your dashboard to manage referrals and track your network growth.
                </p>
              </motion.div>
            )}
          </div>
        </div>

        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-100 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-dental-100 rounded-full blur-3xl opacity-50"></div>
        </div>
      </section>

      {/* Quick Access Section for Authenticated Users */}
      {isAuthenticated && (
        <section className="py-16 bg-gradient-to-r from-primary-50 to-primary-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-dental-900 mb-4">
                Quick Access
              </h2>
              <p className="text-xl text-dental-600 max-w-2xl mx-auto">
                Jump directly to the tools you use most
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { 
                  icon: FiBarChart3, 
                  title: "Dashboard", 
                  description: "View analytics & overview",
                  link: "/dashboard",
                  color: "from-blue-500 to-blue-600"
                },
                { 
                  icon: FiActivity, 
                  title: "Referrals", 
                  description: "Manage patient referrals",
                  link: "/referrals",
                  color: "from-green-500 to-green-600"
                },
                { 
                  icon: FiUsers, 
                  title: "Network", 
                  description: "Browse professionals",
                  link: "/network",
                  color: "from-purple-500 to-purple-600"
                },
                { 
                  icon: FiTrendingUp, 
                  title: "Analytics", 
                  description: "Advanced reporting",
                  link: "/analytics",
                  color: "from-orange-500 to-orange-600"
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link
                    to={item.link}
                    className={`block bg-gradient-to-r ${item.color} text-white p-6 rounded-xl hover:shadow-lg transition-all duration-200 group`}
                  >
                    <SafeIcon icon={item.icon} className="w-8 h-8 mb-3 group-hover:scale-110 transition-transform" />
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm opacity-90">{item.description}</p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-dental-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-dental-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-dental-900 mb-4">
              Why Choose Link.Refer.Dental?
            </h2>
            <p className="text-xl text-dental-600 max-w-2xl mx-auto">
              Built specifically for dental professionals, our platform offers everything you need to manage referrals efficiently.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center mb-4">
                  <SafeIcon icon={feature.icon} className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-dental-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-dental-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-dental-900 mb-4">
              Trusted by Dental Professionals
            </h2>
            <p className="text-xl text-dental-600 max-w-2xl mx-auto">
              See what leading dental professionals are saying about our platform.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-dental-50 p-6 rounded-xl"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <SafeIcon key={i} icon={FiStar} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-dental-700 mb-4 italic">
                  &quot;{testimonial.text}&quot;
                </p>
                <div>
                  <div className="font-semibold text-dental-900">{testimonial.name}</div>
                  <div className="text-dental-600 text-sm">{testimonial.role}</div>
                  <div className="text-dental-500 text-sm">{testimonial.practice}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-500 to-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your Referral Process?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of dental professionals who are already using Link.Refer.Dental to streamline their referral management.
            </p>
            {isAuthenticated ? (
              <Link
                to="/dashboard"
                className="bg-white text-primary-600 px-8 py-4 rounded-xl font-semibold hover:bg-dental-50 transition-all duration-200 shadow-lg hover:shadow-xl inline-flex items-center space-x-2"
              >
                <SafeIcon icon={FiBarChart3} className="w-5 h-5" />
                <span>Access Your Dashboard</span>
                <SafeIcon icon={FiArrowRight} className="w-5 h-5" />
              </Link>
            ) : (
              <Link
                to="/login"
                className="bg-white text-primary-600 px-8 py-4 rounded-xl font-semibold hover:bg-dental-50 transition-all duration-200 shadow-lg hover:shadow-xl inline-flex items-center space-x-2"
              >
                <span>Start Your Free Trial</span>
                <SafeIcon icon={FiArrowRight} className="w-5 h-5" />
              </Link>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;