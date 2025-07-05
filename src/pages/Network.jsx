import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiSearch, FiMapPin, FiStar, FiUser, FiPhone, FiMail, FiFilter, FiUsers, FiAward, FiCalendar } = FiIcons;

const Network = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');

  const specialties = [
    'All', 'Orthodontics', 'Oral Surgery', 'Periodontics', 'Endodontics', 
    'Prosthodontics', 'Pediatric Dentistry', 'Oral Pathology'
  ];

  const locations = [
    'All', 'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia'
  ];

  const practitioners = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "Orthodontics",
      practice: "Elite Orthodontics",
      location: "New York, NY",
      rating: 4.9,
      reviews: 127,
      experience: "15 years",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
      phone: "+1 (555) 123-4567",
      email: "sarah.johnson@eliteortho.com",
      specializations: ["Invisalign", "Braces", "Retainers"],
      verified: true,
      responseTime: "< 2 hours"
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialty: "Oral Surgery",
      practice: "Advanced Oral Surgery Center",
      location: "Los Angeles, CA",
      rating: 4.8,
      reviews: 89,
      experience: "12 years",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face",
      phone: "+1 (555) 987-6543",
      email: "michael.chen@aosc.com",
      specializations: ["Implants", "Extractions", "Jaw Surgery"],
      verified: true,
      responseTime: "< 4 hours"
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      specialty: "Periodontics",
      practice: "Gum Health Specialists",
      location: "Chicago, IL",
      rating: 4.7,
      reviews: 156,
      experience: "18 years",
      image: "https://images.unsplash.com/photo-1594824947317-d0c8f5c1a2c4?w=150&h=150&fit=crop&crop=face",
      phone: "+1 (555) 456-7890",
      email: "emily.rodriguez@gumhealth.com",
      specializations: ["Gum Disease", "Implants", "Cosmetic Gum Surgery"],
      verified: true,
      responseTime: "< 1 hour"
    },
    {
      id: 4,
      name: "Dr. James Wilson",
      specialty: "Endodontics",
      practice: "Root Canal Associates",
      location: "Houston, TX",
      rating: 4.6,
      reviews: 94,
      experience: "10 years",
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face",
      phone: "+1 (555) 234-5678",
      email: "james.wilson@rootcanal.com",
      specializations: ["Root Canals", "Endodontic Surgery", "Retreatment"],
      verified: true,
      responseTime: "< 3 hours"
    },
    {
      id: 5,
      name: "Dr. Lisa Park",
      specialty: "Pediatric Dentistry",
      practice: "Happy Kids Dental",
      location: "Phoenix, AZ",
      rating: 4.9,
      reviews: 203,
      experience: "14 years",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
      phone: "+1 (555) 345-6789",
      email: "lisa.park@happykids.com",
      specializations: ["Pediatric Care", "Sedation", "Special Needs"],
      verified: true,
      responseTime: "< 2 hours"
    },
    {
      id: 6,
      name: "Dr. Robert Martinez",
      specialty: "Prosthodontics",
      practice: "Smile Restoration Center",
      location: "Philadelphia, PA",
      rating: 4.8,
      reviews: 78,
      experience: "20 years",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face",
      phone: "+1 (555) 567-8901",
      email: "robert.martinez@smilerest.com",
      specializations: ["Dentures", "Crowns", "Bridges"],
      verified: true,
      responseTime: "< 6 hours"
    }
  ];

  const filteredPractitioners = practitioners.filter(practitioner => {
    const matchesSearch = practitioner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         practitioner.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         practitioner.practice.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'All' || practitioner.specialty === selectedSpecialty;
    const matchesLocation = selectedLocation === 'All' || practitioner.location.includes(selectedLocation);
    
    return matchesSearch && matchesSpecialty && matchesLocation;
  });

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
            Professional Network
          </motion.h1>
          <p className="text-dental-600">Connect with verified dental professionals in your area.</p>
        </div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-xl shadow-lg mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dental-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search practitioners..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-dental-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* Specialty Filter */}
            <div className="relative">
              <SafeIcon icon={FiFilter} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dental-400 w-5 h-5" />
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-dental-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none"
              >
                {specialties.map(specialty => (
                  <option key={specialty} value={specialty}>{specialty}</option>
                ))}
              </select>
            </div>

            {/* Location Filter */}
            <div className="relative">
              <SafeIcon icon={FiMapPin} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dental-400 w-5 h-5" />
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-dental-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none"
              >
                {locations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>

            {/* Results Count */}
            <div className="flex items-center justify-center md:justify-start">
              <span className="text-dental-600 font-medium">
                {filteredPractitioners.length} practitioners found
              </span>
            </div>
          </div>
        </motion.div>

        {/* Practitioners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPractitioners.map((practitioner, index) => (
            <motion.div
              key={practitioner.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            >
              {/* Header */}
              <div className="relative p-6 pb-4">
                <div className="flex items-start space-x-4">
                  <div className="relative">
                    <img
                      src={practitioner.image}
                      alt={practitioner.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    {practitioner.verified && (
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
                        <SafeIcon icon={FiAward} className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-dental-900">{practitioner.name}</h3>
                    <p className="text-primary-600 font-medium">{practitioner.specialty}</p>
                    <p className="text-dental-600 text-sm">{practitioner.practice}</p>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-2 mt-3">
                  <div className="flex items-center">
                    <SafeIcon icon={FiStar} className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-dental-900 font-medium ml-1">{practitioner.rating}</span>
                  </div>
                  <span className="text-dental-500 text-sm">({practitioner.reviews} reviews)</span>
                </div>
              </div>

              {/* Details */}
              <div className="px-6 pb-4">
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-dental-600 text-sm">
                    <SafeIcon icon={FiMapPin} className="w-4 h-4 mr-2" />
                    {practitioner.location}
                  </div>
                  <div className="flex items-center text-dental-600 text-sm">
                    <SafeIcon icon={FiCalendar} className="w-4 h-4 mr-2" />
                    {practitioner.experience} experience
                  </div>
                  <div className="flex items-center text-dental-600 text-sm">
                    <SafeIcon icon={FiUsers} className="w-4 h-4 mr-2" />
                    Response time: {practitioner.responseTime}
                  </div>
                </div>

                {/* Specializations */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {practitioner.specializations.map((spec, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-primary-50 text-primary-600 text-xs rounded-full"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Contact Actions */}
                <div className="flex space-x-2">
                  <button className="flex-1 bg-gradient-to-r from-primary-500 to-primary-600 text-white py-2 px-4 rounded-lg font-medium hover:from-primary-600 hover:to-primary-700 transition-all duration-200 flex items-center justify-center space-x-2">
                    <SafeIcon icon={FiUser} className="w-4 h-4" />
                    <span>Connect</span>
                  </button>
                  <button className="p-2 border border-dental-200 rounded-lg hover:bg-dental-50 transition-colors">
                    <SafeIcon icon={FiPhone} className="w-4 h-4 text-dental-600" />
                  </button>
                  <button className="p-2 border border-dental-200 rounded-lg hover:bg-dental-50 transition-colors">
                    <SafeIcon icon={FiMail} className="w-4 h-4 text-dental-600" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredPractitioners.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <SafeIcon icon={FiUsers} className="w-16 h-16 text-dental-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-dental-900 mb-2">No practitioners found</h3>
            <p className="text-dental-600">Try adjusting your search criteria or filters.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Network;