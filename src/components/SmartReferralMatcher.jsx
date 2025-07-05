import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiUser, FiMapPin, FiStar, FiClock, FiTarget, FiSend, FiRefreshCw, FiCheck } = FiIcons;

const SmartReferralMatcher = ({ userProfile, availablePractitioners, onReferralSent }) => {
  const [matchedPractitioners, setMatchedPractitioners] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sentReferrals, setSentReferrals] = useState(new Set());

  // Smart matching algorithm
  const calculateMatch = (practitioner, referralNeed) => {
    let score = 0;
    
    // Specialty match (highest weight)
    if (practitioner.specialty === referralNeed.specialty) {
      score += 40;
    }
    
    // Location proximity (medium weight)
    if (practitioner.location.includes(referralNeed.location)) {
      score += 25;
    }
    
    // Rating weight (medium weight)
    score += (practitioner.rating / 5) * 20;
    
    // Response time weight (lower weight)
    const responseHours = parseInt(practitioner.responseTime.match(/\d+/)[0]);
    if (responseHours <= 2) score += 10;
    else if (responseHours <= 4) score += 5;
    
    // Experience weight (lower weight)
    const experienceYears = parseInt(practitioner.experience.match(/\d+/)[0]);
    if (experienceYears >= 15) score += 5;
    else if (experienceYears >= 10) score += 3;
    
    return Math.min(score, 100);
  };

  const findMatches = (referralNeed) => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const matches = availablePractitioners
        .map(practitioner => ({
          ...practitioner,
          matchScore: calculateMatch(practitioner, referralNeed),
          matchReasons: getMatchReasons(practitioner, referralNeed)
        }))
        .filter(practitioner => practitioner.matchScore > 50)
        .sort((a, b) => b.matchScore - a.matchScore)
        .slice(0, 5);
      
      setMatchedPractitioners(matches);
      setIsLoading(false);
    }, 1000);
  };

  const getMatchReasons = (practitioner, referralNeed) => {
    const reasons = [];
    
    if (practitioner.specialty === referralNeed.specialty) {
      reasons.push('Specialty match');
    }
    
    if (practitioner.location.includes(referralNeed.location)) {
      reasons.push('Same location');
    }
    
    if (practitioner.rating >= 4.8) {
      reasons.push('High rating');
    }
    
    const responseHours = parseInt(practitioner.responseTime.match(/\d+/)[0]);
    if (responseHours <= 2) {
      reasons.push('Fast response');
    }
    
    const experienceYears = parseInt(practitioner.experience.match(/\d+/)[0]);
    if (experienceYears >= 15) {
      reasons.push('Extensive experience');
    }
    
    return reasons;
  };

  const handleSendReferral = (practitioner) => {
    setSentReferrals(prev => new Set([...prev, practitioner.id]));
    onReferralSent && onReferralSent(practitioner);
  };

  // Example referral need (this would come from user input or patient data)
  const exampleReferralNeed = {
    specialty: 'Orthodontics',
    location: 'New York',
    urgency: 'normal',
    patientAge: 'adult',
    insurance: 'accepted'
  };

  useEffect(() => {
    findMatches(exampleReferralNeed);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">Smart Referral Matching</h3>
          <p className="text-gray-600">AI-powered recommendations based on your referral needs</p>
        </div>
        <button
          onClick={() => findMatches(exampleReferralNeed)}
          disabled={isLoading}
          className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors flex items-center space-x-2"
        >
          <SafeIcon icon={isLoading ? FiRefreshCw : FiTarget} className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          <span>{isLoading ? 'Finding Matches...' : 'Refresh Matches'}</span>
        </button>
      </div>

      {/* Referral Need Summary */}
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <h4 className="font-semibold text-blue-900 mb-2">Current Referral Need</h4>
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
            {exampleReferralNeed.specialty}
          </span>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
            {exampleReferralNeed.location}
          </span>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
            {exampleReferralNeed.urgency} urgency
          </span>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
            {exampleReferralNeed.patientAge} patient
          </span>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <SafeIcon icon={FiRefreshCw} className="w-8 h-8 text-primary-500 animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Finding the best matches for your referral...</p>
          </div>
        </div>
      )}

      {/* Matched Practitioners */}
      {!isLoading && matchedPractitioners.length > 0 && (
        <div className="space-y-4">
          <h4 className="font-semibold text-gray-900">
            Top Matches ({matchedPractitioners.length})
          </h4>
          
          {matchedPractitioners.map((practitioner, index) => (
            <motion.div
              key={practitioner.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-lg border border-gray-200"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="relative">
                    <img
                      src={practitioner.image}
                      alt={practitioner.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">
                        {practitioner.matchScore}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h5 className="text-lg font-semibold text-gray-900">
                        {practitioner.name}
                      </h5>
                      <div className="flex items-center">
                        <SafeIcon icon={FiStar} className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600 ml-1">{practitioner.rating}</span>
                      </div>
                    </div>
                    
                    <p className="text-primary-600 font-medium mb-1">{practitioner.specialty}</p>
                    <p className="text-gray-600 text-sm mb-2">{practitioner.practice}</p>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                      <div className="flex items-center">
                        <SafeIcon icon={FiMapPin} className="w-4 h-4 mr-1" />
                        {practitioner.location}
                      </div>
                      <div className="flex items-center">
                        <SafeIcon icon={FiClock} className="w-4 h-4 mr-1" />
                        {practitioner.responseTime}
                      </div>
                    </div>
                    
                    {/* Match Reasons */}
                    <div className="flex flex-wrap gap-2">
                      {practitioner.matchReasons.map((reason, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full"
                        >
                          {reason}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col items-end space-y-2">
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">
                      {practitioner.matchScore}%
                    </div>
                    <div className="text-xs text-gray-500">Match Score</div>
                  </div>
                  
                  <button
                    onClick={() => handleSendReferral(practitioner)}
                    disabled={sentReferrals.has(practitioner.id)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
                      sentReferrals.has(practitioner.id)
                        ? 'bg-green-100 text-green-700 cursor-not-allowed'
                        : 'bg-primary-500 text-white hover:bg-primary-600'
                    }`}
                  >
                    <SafeIcon 
                      icon={sentReferrals.has(practitioner.id) ? FiCheck : FiSend} 
                      className="w-4 h-4" 
                    />
                    <span>
                      {sentReferrals.has(practitioner.id) ? 'Sent' : 'Send Referral'}
                    </span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* No Matches */}
      {!isLoading && matchedPractitioners.length === 0 && (
        <div className="text-center py-12">
          <SafeIcon icon={FiTarget} className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No matches found</h3>
          <p className="text-gray-600 mb-4">
            We couldn't find any practitioners that match your current criteria.
          </p>
          <button
            onClick={() => findMatches(exampleReferralNeed)}
            className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Matching Algorithm Info */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-semibold text-gray-900 mb-2">How Smart Matching Works</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
          <div>
            <strong>Specialty Match (40%):</strong> Exact specialty alignment
          </div>
          <div>
            <strong>Location (25%):</strong> Geographic proximity
          </div>
          <div>
            <strong>Rating (20%):</strong> Professional rating and reviews
          </div>
          <div>
            <strong>Response Time (10%):</strong> Average response speed
          </div>
          <div>
            <strong>Experience (5%):</strong> Years of practice
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartReferralMatcher;