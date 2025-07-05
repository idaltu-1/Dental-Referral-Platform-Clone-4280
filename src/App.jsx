import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import { QuestProvider } from '@questlabs/react-sdk';
import '@questlabs/react-sdk/dist/style.css';

import { AuthProvider } from './context/AuthContext';
import { RoleProvider } from './context/RoleContext';
import ProtectedRoute from './components/ProtectedRoute';
import StripeProvider from './components/StripeProvider';
import ErrorBoundary from './components/ErrorBoundary';
import Header from './components/Header';
import Footer from './components/Footer';
import questConfig from './config/questConfig';

// Pages
import Home from './pages/Home';
import Features from './pages/Features';
import Pricing from './pages/Pricing';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import GetStarted from './pages/GetStarted';
import Network from './pages/Network';
import Analytics from './pages/Analytics';
import AdvancedAnalytics from './pages/AdvancedAnalytics';
import Rewards from './pages/Rewards';
import ReferralProgram from './pages/ReferralProgram';
import ReferralManagement from './pages/ReferralManagement';
import Billing from './pages/Billing';
import UserManagement from './pages/UserManagement';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Feedback from './pages/Feedback';
import HelpHub from './pages/HelpHub';

function App() {
  return (
    <ErrorBoundary>
      <QuestProvider
        apiKey={questConfig.APIKEY}
        entityId={questConfig.ENTITYID}
        apiType="PRODUCTION"
      >
        <AuthProvider>
          <RoleProvider>
            <StripeProvider>
              <Router>
                <div className="min-h-screen bg-gradient-to-br from-dental-50 via-white to-primary-50">
                  <Header />
                  <motion.main
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Routes>
                      {/* Public Routes */}
                      <Route path="/" element={<Home />} />
                      <Route path="/features" element={<Features />} />
                      <Route path="/pricing" element={<Pricing />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/feedback" element={<Feedback />} />
                      <Route path="/help" element={<HelpHub />} />

                      {/* Protected Routes */}
                      <Route path="/onboarding" element={
                        <ProtectedRoute>
                          <Onboarding />
                        </ProtectedRoute>
                      } />
                      <Route path="/dashboard" element={
                        <ProtectedRoute>
                          <Dashboard />
                        </ProtectedRoute>
                      } />
                      <Route path="/get-started" element={
                        <ProtectedRoute>
                          <GetStarted />
                        </ProtectedRoute>
                      } />
                      <Route path="/network" element={
                        <ProtectedRoute>
                          <Network />
                        </ProtectedRoute>
                      } />
                      <Route path="/analytics" element={
                        <ProtectedRoute>
                          <Analytics />
                        </ProtectedRoute>
                      } />
                      <Route path="/advanced-analytics" element={
                        <ProtectedRoute>
                          <AdvancedAnalytics />
                        </ProtectedRoute>
                      } />
                      <Route path="/rewards" element={
                        <ProtectedRoute>
                          <Rewards />
                        </ProtectedRoute>
                      } />
                      <Route path="/referral-program" element={
                        <ProtectedRoute>
                          <ReferralProgram />
                        </ProtectedRoute>
                      } />
                      <Route path="/referrals" element={
                        <ProtectedRoute>
                          <ReferralManagement />
                        </ProtectedRoute>
                      } />
                      <Route path="/billing" element={
                        <ProtectedRoute>
                          <Billing />
                        </ProtectedRoute>
                      } />
                      <Route path="/user-management" element={
                        <ProtectedRoute>
                          <UserManagement />
                        </ProtectedRoute>
                      } />
                      <Route path="/profile" element={
                        <ProtectedRoute>
                          <Profile />
                        </ProtectedRoute>
                      } />
                      <Route path="/settings" element={
                        <ProtectedRoute>
                          <Settings />
                        </ProtectedRoute>
                      } />
                    </Routes>
                  </motion.main>
                  <Footer />
                </div>
              </Router>
            </StripeProvider>
          </RoleProvider>
        </AuthProvider>
      </QuestProvider>
    </ErrorBoundary>
  );
}

export default App;