import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiUsers, FiTrendingUp, FiShield, FiZap, FiCalendar, FiMessageSquare, FiBarChart, FiSettings, FiCheck } = FiIcons;

const Features = () => {
  const mainFeatures = [
    {
      icon: FiUsers,
      title: "Professional Network",
      description: "Connect with verified dental professionals across all specialties",
      details: [
        "Verified practitioner profiles",
        "Specialty-based search and filtering",
        "Practice location mapping",
        "Professional credentials display"
      ]
    },
    {
      icon: FiTrendingUp,
      title: "Referral Management",
      description: "Comprehensive referral tracking and management system",
      details: [
        "End-to-end referral tracking",
        "Automated status updates",
        "Patient progress monitoring",
        "Referral history archive"
      ]
    },
    {
      icon: FiBarChart,
      title: "Advanced Analytics",
      description: "Detailed insights into your referral patterns and success rates",
      details: [
        "Referral conversion rates",
        "Performance metrics dashboard",
        "Revenue tracking",
        "Custom reporting tools"
      ]
    },
    {
      icon: FiMessageSquare,
      title: "Secure Communication",
      description: "HIPAA-compliant messaging and file sharing",
      details: [
        "Encrypted messaging system",
        "Secure file attachments",
        "Group discussions",
        "Patient case consultations"
      ]
    },
    {
      icon: FiCalendar,
      title: "Appointment Coordination",
      description: "Streamlined scheduling and appointment management",
      details: [
        "Integrated calendar system",
        "Automated appointment reminders",
        "Availability sharing",
        "Booking confirmations"
      ]
    },
    {
      icon: FiShield,
      title: "HIPAA Compliance",
      description: "Full compliance with healthcare privacy regulations",
      details: [
        "End-to-end encryption",
        "Access control management",
        "Audit trail logging",
        "Data backup and recovery"
      ]
    }
  ];

  const additionalFeatures = [
    "Multi-practice management",
    "Mobile app access",
    "Integration with practice management systems",
    "Customizable workflows",
    "Automated follow-up reminders",
    "Patient outcome tracking",
    "Referral source analytics",
    "Team collaboration tools"
  ];

  return (
    <div className="min-h-screen py-20">
      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 mb-20">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-dental-900 mb-6"
          >
            Powerful Features for
            <span className="bg-gradient-to-r from-primary-500 to-primary-600 bg-clip-text text-transparent">
              {" "}Modern Dental Practices
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-dental-600 max-w-3xl mx-auto"
          >
            Discover how Link.Refer.Dental can transform your referral process with our comprehensive suite of professional tools.
          </motion.p>
        </div>
      </section>

      {/* Main Features */}
      <section className="px-4 sm:px-6 lg:px-8 mb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {mainFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <SafeIcon icon={feature.icon} className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-dental-900 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-dental-600 mb-4">
                      {feature.description}
                    </p>
                    <ul className="space-y-2">
                      {feature.details.map((detail, idx) => (
                        <li key={idx} className="flex items-center space-x-2">
                          <SafeIcon icon={FiCheck} className="w-4 h-4 text-primary-500" />
                          <span className="text-dental-700">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Features */}
      <section className="px-4 sm:px-6 lg:px-8 mb-20 bg-dental-50 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-dental-900 mb-4">
              And Much More
            </h2>
            <p className="text-xl text-dental-600 max-w-2xl mx-auto">
              Our platform includes dozens of additional features designed to streamline your dental practice operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-3"
              >
                <SafeIcon icon={FiCheck} className="w-5 h-5 text-primary-500 flex-shrink-0" />
                <span className="text-dental-700 font-medium">{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="px-4 sm:px-6 lg:px-8 mb-20">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-8 md:p-12 text-white text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <SafeIcon icon={FiSettings} className="w-16 h-16 mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Seamless Integration
              </h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto">
                Link.Refer.Dental integrates with your existing practice management software and workflows, making adoption effortless.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                <div className="bg-white/10 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-2">Easy Setup</h3>
                  <p className="text-primary-100">Get started in minutes with our guided onboarding process.</p>
                </div>
                <div className="bg-white/10 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-2">API Access</h3>
                  <p className="text-primary-100">Connect with your existing systems using our robust API.</p>
                </div>
                <div className="bg-white/10 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
                  <p className="text-primary-100">Our team is here to help you every step of the way.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;