import React from 'react';

const TodaysScheduleWidget = () => {
  // Placeholder data - replace with actual data fetching
  const todaysJobs = [
    { id: 1, time: '09:00 AM', client: 'John Doe', location: '123 Main St', status: 'Scheduled' },
    { id: 2, time: '11:30 AM', client: 'Jane Smith', location: '456 Oak Ave', status: 'Scheduled' },
    { id: 3, time: '02:00 PM', client: 'Bob Johnson', location: '789 Pine Ln', status: 'In Progress' },
  ];

  return (
    <div className='bg-white p-6 rounded-lg shadow h-full'>
      <h3 className='text-xl font-semibold text-gray-800 mb-4'>Today&apos;s Schedule</h3>
      {todaysJobs.length > 0 ? (
        <ul className='space-y-4'>
          {todaysJobs.map((job) => (
            <li key={job.id} className='p-3 bg-light rounded-md hover:shadow-md transition-shadow'>
              <div className='flex justify-between items-center mb-1'>
                <span className='font-medium text-primary'>{job.time}</span>
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded-full ${job.status === 'Scheduled' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}`}
                >
                  {job.status}
                </span>
              </div>
              <p className='text-gray-700 text-sm'>Client: {job.client}</p>
              <p className='text-gray-600 text-xs'>Location: {job.location}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className='text-gray-500'>No jobs scheduled for today.</p>
      )}
    </div>
  );
};

export default TodaysScheduleWidget; 