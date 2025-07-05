import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiMail, FiPhone, FiMapPin, FiSend, FiClock, FiMessageSquare, FiUsers, FiHelpCircle } = FiIcons;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    message: '',
    contactReason: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Thank you for your message! We\'ll get back to you within 24 hours.');
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        subject: '',
        message: '',
        contactReason: 'general'
      });
    }, 2000);
  };

  const contactInfo = [
    {
      icon: FiMail,
      title: "Email Us",
      details: "hello@linkrefer.dental",
      description: "Send us an email and we'll respond within 24 hours"
    },
    {
      icon: FiPhone,
      title: "Call Us",
      details: "+1 (555) 123-4567",
      description: "Available Monday-Friday, 9AM-6PM EST"
    },
    {
      icon: FiMapPin,
      title: "Visit Us",
      details: "123 Dental Ave, Suite 100\nNew York, NY 10001",
      description: "Our headquarters in the heart of NYC"
    },
    {
      icon: FiClock,
      title: "Support Hours",
      details: "24/7 Online Support",
      description: "Round-the-clock assistance for all users"
    }
  ];

  const contactReasons = [
    { value: 'general', label: 'General Inquiry', icon: FiMessageSquare },
    { value: 'sales', label: 'Sales & Pricing', icon: FiUsers },
    { value: 'support', label: 'Technical Support', icon: FiHelpCircle },
    { value: 'partnership', label: 'Partnership Opportunities', icon: FiUsers }
  ];

  const faqs = [
    {
      question: "How quickly can I get started?",
      answer: "You can sign up and start using Link.Refer.Dental immediately. Our onboarding process takes just a few minutes."
    },
    {
      question: "Is there a free trial available?",
      answer: "Yes! We offer a 14-day free trial with full access to all Professional plan features."
    },
    {
      question: "Do you offer training and support?",
      answer: "Absolutely. We provide comprehensive training materials, video tutorials, and dedicated support to help you succeed."
    },
    {
      question: "Can I integrate with my existing practice management system?",
      answer: "Yes, we offer integrations with most major practice management systems. Contact us to discuss your specific needs."
    }
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
            Get in Touch
            <span className="bg-gradient-to-r from-primary-500 to-primary-600 bg-clip-text text-transparent">
              {' '}With Us
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-dental-600 max-w-2xl mx-auto"
          >
            Have questions about Link.Refer.Dental? We&apos;re here to help you transform your referral process.
          </motion.p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="px-4 sm:px-6 lg:px-8 mb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <SafeIcon icon={info.icon} className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-dental-900 mb-2">{info.title}</h3>
                <p className="text-dental-900 font-medium mb-2 whitespace-pre-line">{info.details}</p>
                <p className="text-dental-600 text-sm">{info.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="px-4 sm:px-6 lg:px-8 mb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white p-8 rounded-2xl shadow-lg"
            >
              <h2 className="text-2xl font-bold text-dental-900 mb-6">Send us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Contact Reason */}
                <div>
                  <label className="block text-sm font-medium text-dental-700 mb-2">
                    How can we help you?
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {contactReasons.map((reason) => (
                      <label
                        key={reason.value}
                        className={`flex items-center space-x-2 p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                          formData.contactReason === reason.value
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-dental-200 hover:border-primary-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="contactReason"
                          value={reason.value}
                          checked={formData.contactReason === reason.value}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        <SafeIcon icon={reason.icon} className="w-4 h-4 text-primary-600" />
                        <span className="text-sm font-medium text-dental-900">{reason.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Name & Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-dental-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-dental-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Dr. John Smith"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dental-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-dental-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                {/* Company & Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-dental-700 mb-2">
                      Practice/Company
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-dental-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="ABC Dental Practice"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dental-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-dental-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-medium text-dental-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-dental-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="How can we help you?"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-dental-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-dental-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                    placeholder="Tell us more about your needs..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white py-3 px-6 rounded-lg font-medium hover:from-primary-600 hover:to-primary-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <SafeIcon icon={FiSend} className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </motion.div>

            {/* FAQ Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl font-bold text-dental-900 mb-6">Frequently Asked Questions</h2>
                <p className="text-dental-600 mb-8">
                  Find quick answers to common questions about Link.Refer.Dental.
                </p>
              </div>

              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                    className="bg-white p-6 rounded-xl shadow-lg"
                  >
                    <h3 className="text-lg font-semibold text-dental-900 mb-3">{faq.question}</h3>
                    <p className="text-dental-600">{faq.answer}</p>
                  </motion.div>
                ))}
              </div>

              {/* Additional Help */}
              <div className="bg-gradient-to-br from-primary-500 to-primary-600 p-6 rounded-xl text-white">
                <h3 className="text-xl font-semibold mb-3">Need More Help?</h3>
                <p className="text-primary-100 mb-4">
                  Our support team is available 24/7 to assist you with any questions or technical issues.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="mailto:support@linkrefer.dental"
                    className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg font-medium transition-colors text-center"
                  >
                    Email Support
                  </a>
                  <a
                    href="tel:+15551234567"
                    className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg font-medium transition-colors text-center"
                  >
                    Call Support
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            <div className="h-96 bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
              <div className="text-center">
                <SafeIcon icon={FiMapPin} className="w-16 h-16 text-primary-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-dental-900 mb-2">Visit Our Office</h3>
                <p className="text-dental-600">
                  123 Dental Ave, Suite 100<br />New York, NY 10001
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;