'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // for selectable, draggable, clickable
import listPlugin from '@fullcalendar/list';

// REMOVED FullCalendar CSS imports - relying on plugins to inject their styles
// import '@fullcalendar/core/main.css'; 
// import '@fullcalendar/daygrid/main.css';
// import '@fullcalendar/timegrid/main.css';
// import '@fullcalendar/list/main.css';

import { PlusCircle, CalendarDays as CalendarIcon, UserCheck, Filter } from 'lucide-react';

// Mock job data for calendar events
const mockScheduledJobs = [
  {
    id: 'J001',
    title: 'J001: John Doe - Ceiling Fan Install',
    start: '2024-05-15T09:00:00',
    end: '2024-05-15T11:00:00',
    backgroundColor: '#007bff', // Blue (Primary)
    borderColor: '#0056b3',
    extendedProps: { technician: 'Mike L.', clientId: '1', status: 'Scheduled' }
  },
  {
    id: 'J002',
    title: 'J002: Jane Smith - Kitchen Wiring Repair',
    start: '2024-05-16T14:00:00',
    end: '2024-05-16T17:00:00',
    backgroundColor: '#ffc107', // Yellow (Warning-like for In Progress)
    borderColor: '#cc9a06',
    extendedProps: { technician: 'Sarah B.', clientId: '2', status: 'In Progress' }
  },
  {
    id: 'J003',
    title: 'J003: Alice Brown - Safety Inspection',
    start: '2024-05-17T11:00:00',
    end: '2024-05-17T12:30:00',
    backgroundColor: '#28a745', // Green (Success)
    borderColor: '#1e7e34',
    extendedProps: { technician: 'Chris P.', clientId: '3', status: 'Completed' }
  },
  {
    id: 'J004',
    title: 'J004: Robert Green - Breaker Install',
    // All day event example
    start: '2024-05-20',
    backgroundColor: '#007bff',
    borderColor: '#0056b3',
    extendedProps: { technician: 'David K.', clientId: '4', status: 'Scheduled' }
  }
];

const mockTechniciansFilter = [
    { id: 'all', name: 'All Technicians' },
    { id: 'mike_l', name: 'Mike L.' },
    { id: 'sarah_b', name: 'Sarah B.' },
    { id: 'chris_p', name: 'Chris P.' },
    { id: 'david_k', name: 'David K.' },
];

const CalendarPage = () => {
  const [events, setEvents] = useState(mockScheduledJobs);
  const [selectedTechnician, setSelectedTechnician] = useState('all');

  // Basic filtering logic (can be expanded)
  useEffect(() => {
    if (selectedTechnician === 'all') {
      setEvents(mockScheduledJobs);
    } else {
      setEvents(mockScheduledJobs.filter(job => job.extendedProps.technician === mockTechniciansFilter.find(t=>t.id === selectedTechnician)?.name));
    }
  }, [selectedTechnician]);

  const handleEventClick = (clickInfo: any) => {
    // In a real app, show a modal or navigate to job details
    alert(`Event Clicked: ${clickInfo.event.title}\nJob ID: ${clickInfo.event.id}\nStatus: ${clickInfo.event.extendedProps.status}`);
    // Example navigation: router.push(`/jobs/${clickInfo.event.id}`);
  };

  const handleDateSelect = (selectInfo: any) => {
    // For creating new events by selecting dates
    let title = prompt('Please enter a new title for your event');
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: `NEW_${Date.now()}`,
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
        backgroundColor: '#6c757d', // Secondary color for new events
        borderColor: '#5a6268',
        extendedProps: { technician: 'Unassigned', status: 'Draft' }
      });
      alert('New event added (mock). This would typically open a new job form.')
    }
  };

  return (
    <div>
      <div className='flex flex-col sm:flex-row justify-between items-center mb-6 gap-4'>
        <h1 className='text-3xl font-bold text-dark flex items-center'>
          <CalendarIcon className='mr-3 h-8 w-8 text-primary' /> Calendar / Schedule
        </h1>
        <div className='flex items-center gap-3'>
            <div className='min-w-[200px]'>
                <label htmlFor='filter-technician-calendar' className='sr-only'>Filter by Technician</label>
                <select 
                    id='filter-technician-calendar' 
                    name='filter-technician-calendar' 
                    className='default-select'
                    value={selectedTechnician}
                    onChange={(e) => setSelectedTechnician(e.target.value)}
                >
                {mockTechniciansFilter.map(tech => (
                    <option key={tech.id} value={tech.id}>{tech.name}</option>
                ))}
                </select>
            </div>
            <Link href='/jobs/new' className='btn-primary whitespace-nowrap'>
                <PlusCircle size={20} className='mr-2' /> Schedule New Job
            </Link>
        </div>
      </div>

      <div className='bg-white p-4 sm:p-6 rounded-lg shadow'>
        {/* Ensure FullCalendar CSS is loaded. It might need to be imported in globals.css or layout.tsx if not automatically handled by Next.js. 
            e.g., import '@fullcalendar/core/main.css'; import '@fullcalendar/daygrid/main.css'; etc.
            For now, assuming basic styles work or it injects its own styles.
        */}
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
          }}
          initialView='dayGridMonth'
          weekends={true}
          events={events}
          selectable={true} // Allows date selection
          selectMirror={true}
          dayMaxEvents={true} // When too many events, shows a "+more" link
          editable={true} // Allows dragging and resizing events (placeholder for now, needs eventDrop/eventResize handlers)
          eventClick={handleEventClick} // Handle event clicks
          select={handleDateSelect} // Handle date range selection
          // eventDrop={(info) => alert(`${info.event.title} was dropped on ${info.event.startStr}`)} // Placeholder for drag-n-drop update
          // eventResize={(info) => alert(`${info.event.title} was resized`)} // Placeholder for resize update
          height="auto" // Adjust height as needed, or set specific value like "70vh"
          contentHeight="auto"
          aspectRatio={1.5} // Adjust aspect ratio
        />
      </div>
    </div>
  );
};

export default CalendarPage; 