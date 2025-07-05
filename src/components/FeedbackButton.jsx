import React, { useState } from 'react';
import { FeedbackWorkflow } from '@questlabs/react-sdk';
import questConfig from '../config/questConfig';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiMessageSquare, FiChevronUp, FiChevronDown } = FiIcons;

const FeedbackButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const userId = localStorage.getItem('userId') || questConfig.USER_ID;

  const EventTracking = () => {
    // Track feedback button clicks for analytics
    console.log('Feedback button clicked', {
      timestamp: new Date().toISOString(),
      userId: userId,
      action: 'feedback_opened'
    });
  };

  return (
    <>
      {/* Floating Feedback Button */}
      <button
        onClick={() => {
          EventTracking();
          setIsOpen((prev) => !prev);
        }}
        style={{ background: questConfig.PRIMARY_COLOR }}
        className="flex gap-1 rounded-t-md rounded-b-none justify-end items-center px-3 text-14 leading-5 font-semibold py-2 text-white z-50 fixed top-[calc(50%-20px)] -right-10 rotate-[270deg] transition-all h-9 hover:right-0 hover:shadow-lg duration-300"
        aria-label="Open Feedback"
      >
        <div className="w-fit h-fit rotate-90 transition-all duration-300">
          <SafeIcon 
            icon={isOpen ? FiChevronDown : FiChevronUp} 
            className="w-4 h-4"
          />
        </div>
        <p className="text-white text-sm font-medium leading-none">Feedback</p>
      </button>

      {/* Feedback Workflow Component */}
      {isOpen && (
        <div className="fixed top-1/2 right-4 transform -translate-y-1/2 z-50 w-96 max-w-[90vw]">
          <FeedbackWorkflow
            uniqueUserId={userId}
            questId={questConfig.QUEST_FEEDBACK_QUESTID}
            isOpen={isOpen}
            accent={questConfig.PRIMARY_COLOR}
            onClose={() => setIsOpen(false)}
            className="shadow-2xl rounded-xl border border-dental-200"
          >
            <FeedbackWorkflow.ThankYou />
          </FeedbackWorkflow>
        </div>
      )}
    </>
  );
};

export default FeedbackButton;