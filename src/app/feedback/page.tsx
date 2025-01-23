'use client';
import React, { useState } from 'react';

const FeedbackPage: React.FC = () => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const handleSubmit = () => {
    if (name && message) {
      setFeedbackSubmitted(true);
      // Clear inputs if needed
      setName('');
      setMessage('');
    }
  };

  return (
    <div className="p-10 max-w-md mx-auto bg-white shadow-md rounded-md mt-5">
      <h1 className="text-3xl font-semibold text-center mb-5 ">Your Feedback</h1>

      {feedbackSubmitted ? (
        <p className="text-green-600 font-medium text-center">
          Thanks for Your feedback!
        </p>
      ) : (
        <>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded-md"
          />

          <textarea
            placeholder="Your Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded-md h-32"
          ></textarea>

          <button
            onClick={handleSubmit}
            className="w-full bg-gray-600 text-white py-2 rounded-md hover:bg-gray-700"
          >
            Send Feedback
          </button>
        </>
      )}
    </div>
  );
};

export default FeedbackPage;
