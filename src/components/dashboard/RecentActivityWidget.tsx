import React from 'react';

const RecentActivityWidget = () => {
  // Placeholder data
  const activities = [
    { id: 1, text: 'New lead added: ACME Corp', time: '10 mins ago' },
    { id: 2, text: 'Job #J1023 status updated to Completed', time: '1 hour ago' },
    { id: 3, text: 'Quote #Q502 sent to Mike Williams', time: '3 hours ago' },
    { id: 4, text: 'Invoice #INV003 marked as Paid', time: 'Yesterday' },
  ];

  return (
    <div className='bg-white p-6 rounded-lg shadow h-full'>
      <h3 className='text-xl font-semibold text-gray-800 mb-4'>Recent Activity</h3>
      {activities.length > 0 ? (
        <ul className='space-y-3'>
          {activities.map((activity) => (
            <li key={activity.id} className='text-sm text-gray-600 border-b border-gray-100 pb-2 last:border-b-0 last:pb-0'>
              <p>{activity.text}</p>
              <p className='text-xs text-gray-400'>{activity.time}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className='text-gray-500'>No recent activity.</p>
      )}
    </div>
  );
};

export default RecentActivityWidget; 