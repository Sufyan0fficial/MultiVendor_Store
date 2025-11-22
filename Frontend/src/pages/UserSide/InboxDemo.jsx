import React from 'react';
import CustomerInbox from '../../components/Inbox';
import Inbox from '../../components/Inbox';

const InboxDemo = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Customer Inbox
        </h1>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <Inbox />
        </div>
      </div>
    </div>
  );
};

export default InboxDemo;
