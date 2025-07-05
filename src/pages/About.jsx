import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiUsers, FiTarget, FiHeart, FiAward, FiLinkedin, FiMail, FiArrowRight } = FiIcons;

const About = () => {
  const team = [
    {
      name: "Dr. Jennifer Martinez",
      role: "CEO & Co-Founder",
      bio: "Former practicing dentist with 15+ years of experience. Passionate about connecting dental professionals.",
      image: "https://images.unsplash.com/photo-1594824947317-d0c8f5c1a2c4?w=300&h=300&fit=crop&crop=face",
      linkedin: "#",
      email: "jennifer@linkrefer.dental"
    },
    {
      name: "David Chen",
      role: "CTO & Co-Founder",
      bio: "Healthcare technology veteran with expertise in HIPAA-compliant platforms and dental software.",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop&crop=face",
      linkedin: "#",
      email: "david@linkrefer.dental"
    },
    {
      name: "Dr. Sarah Williams",
      role: "Chief Medical Officer",
      bio: "Orthodontist and dental practice management expert. Leads our clinical advisory board.",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face",
      linkedin: "#",
      email: "sarah@linkrefer.dental"
    },
    {
      name: "Michael Thompson",
      role: "VP of Product",
      bio: "Product management expert focused on creating intuitive healthcare solutions for practitioners.",
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=300&h=300&fit=crop&crop=face",
      linkedin: "#",
      email: "michael@linkrefer.dental"
    }
  ];

  const values = [
    {
      icon: FiUsers,
      title: "Connection",
      description: "We believe in the power of professional networks to improve patient outcomes and practice growth."
    },
    {
      icon: FiTarget,
      title: "Excellence",
      description: "We strive for excellence in everything we do, from product development to customer service."
    },
    {
      icon: FiHeart,
      title: "Patient-First",
      description: "Every feature we build is designed with patient care and outcomes as the top priority."
    },
    {
      icon: FiAward,
      title: "Innovation",
      description: "We continuously innovate to stay ahead of the curve in dental technology and referral management."
    }
  ];

  const milestones = [
    {
      year: "2020",
      title: "Company Founded",
      description: "Link.Refer.Dental was founded by a team of dental professionals and tech experts"
    },
    {
      year: "2021",
      title: "Platform Launch",
      description: "Launched our first version with 100+ dental professionals in the beta program"
    },
    {
      year: "2022",
      title: "Major Growth",
      description: "Reached 1,000+ active users and processed over 10,000 referrals"
    },
    {
      year: "2023",
      title: "Series A Funding",
      description: "Secured $10M in Series A funding to accelerate growth and product development"
    },
    {
      year: "2024",
      title: "National Expansion",
      description: "Expanded to serve 10,000+ dental professionals across all 50 states"
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
            Connecting Dental Professionals
            <span className="bg-gradient-to-r from-primary-500 to-primary-600 bg-clip-text text-transparent">
              {" "}Nationwide
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-dental-600 max-w-3xl mx-auto mb-8"
          >
            We're on a mission to revolutionize how dental professionals connect, collaborate, and provide exceptional patient care through seamless referral management.
          </motion.p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="px-4 sm:px-6 lg:px-8 mb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white p-8 rounded-2xl shadow-lg"
            >
              <h2 className="text-3xl font-bold text-dental-900 mb-4">Our Mission</h2>
              <p className="text-dental-600 text-lg leading-relaxed">
                To create the most comprehensive and user-friendly platform that connects dental professionals, 
                streamlines referral processes, and ultimately improves patient outcomes through enhanced 
                collaboration and communication.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-br from-primary-500 to-primary-600 p-8 rounded-2xl text-white"
            >
              <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
              <p className="text-primary-100 text-lg leading-relaxed">
                To become the leading referral network platform in dentistry, fostering a connected community 
                where every dental professional has access to the expertise and resources they need to provide 
                the best possible care for their patients.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="px-4 sm:px-6 lg:px-8 mb-20 bg-dental-50 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-dental-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-dental-600 max-w-2xl mx-auto">
              These values guide everything we do and shape our commitment to the dental community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-lg text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <SafeIcon icon={value.icon} className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-dental-900 mb-3">{value.title}</h3>
                <p className="text-dental-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="px-4 sm:px-6 lg:px-8 mb-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-dental-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-dental-600 max-w-2xl mx-auto">
              Our diverse team combines deep dental expertise with cutting-edge technology skills.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold text-dental-900 mb-1">{member.name}</h3>
                <p className="text-primary-600 font-medium mb-3">{member.role}</p>
                <p className="text-dental-600 text-sm mb-4">{member.bio}</p>
                <div className="flex justify-center space-x-3">
                  <a
                    href={member.linkedin}
                    className="text-dental-400 hover:text-primary-500 transition-colors"
                  >
                    <SafeIcon icon={FiLinkedin} className="w-5 h-5" />
                  </a>
                  <a
                    href={`mailto:${member.email}`}
                    className="text-dental-400 hover:text-primary-500 transition-colors"
                  >
                    <SafeIcon icon={FiMail} className="w-5 h-5" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="px-4 sm:px-6 lg:px-8 mb-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-dental-900 mb-4">Our Journey</h2>
            <p className="text-xl text-dental-600">
              From a small startup to a leading platform in dental referral management.
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-primary-200"></div>

            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex items-center mb-8 ${
                  index % 2 === 0 ? 'justify-start' : 'justify-end'
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary-500 rounded-full z-10"></div>

                {/* Content */}
                <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                  <div className="bg-white p-6 rounded-xl shadow-lg">
                    <div className="text-2xl font-bold text-primary-600 mb-2">{milestone.year}</div>
                    <h3 className="text-xl font-semibold text-dental-900 mb-2">{milestone.title}</h3>
                    <p className="text-dental-600">{milestone.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-8 md:p-12 text-center text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Join Our Growing Community
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Be part of the future of dental referral management. Connect with professionals who share your commitment to excellence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/dashboard"
                className="bg-white text-primary-600 px-8 py-4 rounded-xl font-semibold hover:bg-dental-50 transition-all duration-200 shadow-lg hover:shadow-xl inline-flex items-center justify-center space-x-2"
              >
                <span>Get Started Today</span>
                <SafeIcon icon={FiArrowRight} className="w-5 h-5" />
              </Link>
              <Link
                to="/contact"
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all duration-200"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;