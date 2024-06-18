import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Map } from '../components/map/Map';
import DateRange from '../components/DateRange';
import LoadingOverlay from '../components/LoadingOverlay';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

import { fetchEvents } from '../features/events/thunks';

const AnalyticsPage = () => {
  const dispatch = useDispatch();
  const { data: events, loading, error } = useSelector((state) => state.events);

  const [dateRange, setDateRange] = useState({
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0]
  });
  
  const [currentEventsCount, setCurrentEventsCount] = useState({
    activeEvents: 0,
    totalEvents: 0,
    activeVolunteers: 0,
    totalVolunteers: 0,
  });
  const [previousEventsCount, setPreviousEventsCount] = useState({
    activeEvents: 0,
    totalEvents: 0,
    activeVolunteers: 0,
    totalVolunteers: 0,
  });
  const [currentEventsDailyCount, setCurrentEventsDailyCount] = useState({
    activeEvents: [],
    totalEvents: [],
    activeVolunteers: [],
    totalVolunteers: [],
  });


  useEffect(() => {

    let currentEvents = //events;
    [
      { id: 1, eventType: 'FIRE', date: '2024-06-10', status: 'done', volunteers: 	[1,2], latitude: 49.841082, longitude: 24.030533 },
      { id: 2, eventType: 'FIRE', date: '2024-06-10', status: 'done', volunteers: 	[3], latitude: 49.841082, longitude: 24.030533 },
      { id: 3, eventType: 'FIRE', date: '2024-06-11', status: 'done', volunteers: 	[41,42,43,44], latitude: 49.841082, longitude: 24.030533 },
      { id: 4, eventType: 'FIRE', date: '2024-06-12', status: 'done', volunteers: 	[51], latitude: 49.841082, longitude: 24.030533 },
      { id: 5, eventType: 'FIRE', date: '2024-06-13', status: 'done', volunteers: 	[61,64,66], latitude: 49.841082, longitude: 24.030533 },
      { id: 6, eventType: 'FIRE', date: '2024-06-15', status: 'done', volunteers: 	[71,72,73,74,75,76], latitude: 49.842082, longitude: 24.031533 },
      { id: 7, eventType: 'FIRE', date: '2024-06-16', status: 'active', volunteers: [81,82, 83], latitude: 49.843082, longitude: 24.032533 },
      { id: 8, eventType: 'FIRE', date: '2024-06-16', status: 'active', volunteers: [92,94], latitude: 49.844082, longitude: 24.033533 },
    ];
    
    let previousEvents = 
    [
      { id: 1, eventType: 'FIRE', date: '2024-06-03', status: 'done', volunteers: [1,2], latitude: 49.841082, longitude: 24.030533 },
      { id: 2, eventType: 'FIRE', date: '2024-06-04', status: 'done', volunteers: [3], latitude: 49.841082, longitude: 24.030533 },
      { id: 3, eventType: 'FIRE', date: '2024-06-05', status: 'done', volunteers: [41,42,43,44], latitude: 49.841082, longitude: 24.030533 },
      { id: 4, eventType: 'FIRE', date: '2024-06-06', status: 'done', volunteers: [51], latitude: 49.841082, longitude: 24.030533 },
      { id: 5, eventType: 'FIRE', date: '2024-06-07', status: 'done', volunteers: [61,64,66], latitude: 49.841082, longitude: 24.030533 },
      { id: 6, eventType: 'FIRE', date: '2024-06-08', status: 'done', volunteers: [71,72,73,74,75,76], latitude: 49.842082, longitude: 24.031533 },
      { id: 7, eventType: 'FIRE', date: '2024-06-08', status: 'done', volunteers: [81,82, 83], latitude: 49.843082, longitude: 24.032533 },
      { id: 8, eventType: 'FIRE', date: '2024-06-09', status: 'done', volunteers: [92,94], latitude: 49.844082, longitude: 24.033533 },
    ];     
    
    let activeVolunteersSet = new Set();
    let totalVolunteersSet = new Set();

    let startDate = new Date(dateRange.startDate);
    let endDate = new Date(dateRange.endDate);
    const timePeriod = endDate - startDate + 1000 * 60 * 60 * 24;
    let events = currentEvents.filter(event => { const eventDate = new Date(event.date); return eventDate >= startDate && eventDate <= endDate; });
    events.forEach(event => event.volunteers.forEach(volunteer => totalVolunteersSet.add(volunteer)));

    let activeEvents = events.filter(event => event.status === 'active');
    activeEvents.forEach(event => event.volunteers.forEach(volunteer => activeVolunteersSet.add(volunteer)));
    setCurrentEventsCount({ activeEvents: activeEvents.length, totalEvents: events.length, activeVolunteers: activeVolunteersSet.size, totalVolunteers: totalVolunteersSet.size} );

    setCurrentEventsDailyCount( { 
      activeEvents: calculateEventsCountByDays(activeEvents, dateRange),
      totalEvents: calculateEventsCountByDays(events, dateRange),
      activeVolunteers: calculateVolunteersCountByDays(activeVolunteersSet, dateRange),
      totalVolunteers: calculateVolunteersCountByDays(totalVolunteersSet, dateRange) 
    } );
    //alert(JSON.stringify(currentEventsDailyCount.totalEvents, null, 2));
    //alert(`Start Date: ${startDate}\nEnd Date: ${endDate}\nDate period: ${periodDataMs/1000/60/60/24} days`);
    //alert(JSON.stringify(events, null, 2));
    
    startDate = new Date(startDate - timePeriod);
    endDate = new Date(endDate - timePeriod);
    events = previousEvents.filter(event => { const eventDate = new Date(event.date); return eventDate >= startDate && eventDate <= endDate; });  
    totalVolunteersSet.clear(); events.forEach(event => event.volunteers.forEach(volunteer => totalVolunteersSet.add(volunteer)));

    activeEvents = events.filter(event => event.status === 'active');
    activeVolunteersSet.clear(); activeEvents.forEach(event => event.volunteers.forEach(volunteer => activeVolunteersSet.add(volunteer)));
    setPreviousEventsCount({ activeEvents: activeEvents.length, totalEvents: events.length, activeVolunteers: activeVolunteersSet.size, totalVolunteers: totalVolunteersSet.size} );

    //alert(`Start Date: ${startDate}\nEnd Date: ${endDate}\nDate period: ${periodDataMs/1000/60/60/24} days`);
    //alert(JSON.stringify(previousEvents, null, 2));

  }, [dispatch, dateRange]);


  const calculateEventsCountByDays = (events, dateRange) => {

    const counts = {};
    const startDate = new Date(dateRange.startDate);
    const endDate = new Date(dateRange.endDate);

    // Initialize all dates in the range with count 0
    for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
      const dateString = date.toISOString().split('T')[0];
      counts[dateString] = 0;
    }

    // Count events for each date
    events.forEach(event => {
      const date = new Date(event.date);
      if (!isNaN(date.getTime())) {
        const dateString = date.toISOString().split('T')[0];
        counts[dateString]++;
      }
    });

    return Object.keys(counts).map(date => ({
      date,
      count: counts[date],
    }));
  };

  const calculateVolunteersCountByDays = (events, dateRange) => {

    const counts = {};
    const startDate = new Date(dateRange.startDate);
    const endDate = new Date(dateRange.endDate);

    // Initialize all dates in the range with count 0
    for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
      const dateString = date.toISOString().split('T')[0];
      counts[dateString] = 0;
    }

    // Count events for each date
    events.forEach(event => {
      const date = new Date(event.date);
      if (!isNaN(date.getTime())) {
        const dateString = date.toISOString().split('T')[0];
        counts[dateString] += event.volunteers.length;
      }
    });

    return Object.keys(counts).map(date => ({
      date,
      count: counts[date],
    }));
  };

  const handleDateChange = (value) => {

    const [startDate, endDate] = value;
    const startDateISO = new Date(startDate.getTime() - (startDate.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
    const endDateISO = new Date(endDate.getTime() - (endDate.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
    setDateRange({ startDate: startDateISO, endDate: endDateISO });
  
    //alert(`Selected Date Range:\nStart Date: ${dateRange.startDate}\nEnd Date: ${dateRange.endDate}`);
  };

  const renderCount = (count, previousCount, dailyCounts) => {
    const difference = count - previousCount;
    const differenceText = (difference >= 0) ? `+${difference}` : difference;
    const differenceColor = (difference > 0) ? 'bg-red-50' : (difference === 0 ? 'bg-body-50' : 'bg-green-50');

    return (
      <div className="flex flex-col items-start w-full">
        <div className="flex items-center">
          <span className="text-3xl font-bold text-primary-500">{count}</span>
          {
            <span className={`ml-2 text-sm ${differenceColor}`}>
              {differenceText}
            </span>
          }
        </div>
        <ResponsiveContainer width="80%" height={80}>
          <AreaChart data={dailyCounts}>
            <defs>
              <linearGradient id="color_count" x1="0" y1="0" x2="0" y2="1">
                <stop offset="10%" stopColor="#1288CB" stopOpacity={0.4} />
                <stop offset="40%" stopColor="#1288CB" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <XAxis dataKey="date" axisLine={false} tickLine={false} tick={false} />
            <YAxis axisLine={false} tickLine={false} tick={false} />
            <Tooltip />
            <Area type="monotone" dataKey="count" stroke="#1288CB" fillOpacity={1} fill="url(#color_count)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-none py-4">
        <h1 className="text-body-900 text-lg font-bold mb-2">Аналітика</h1>
        <div className="relative z-10">
          <DateRange onChange={handleDateChange} />
        </div>
      </div>
      <div className="flex flex-grow">
        <div className="flex-grow relative z-0">
          <Map
            markers={events.map((event) => ({
              id: event.id,
              type: event.eventType,
              position: [event.latitude, event.longitude],
              selected: false,
            }))}
            className="absolute inset-0"
          />
        </div>
        <div className="w-1/3 flex flex-col space-y-1">
          <div className="flex flex-col items-start bg-white px-4">
            <div className="text-md font-bold text-body-900">Активних подій</div>
            {renderCount(currentEventsCount.activeEvents, previousEventsCount.activeEvents, currentEventsDailyCount.activeEvents)}
          </div>
          <div className="flex flex-col items-start bg-white px-4">
            <div className="text-md font-bold text-body-900">Всього подій</div>
            {renderCount(currentEventsCount.totalEvents, previousEventsCount.totalEvents, currentEventsDailyCount.totalEvents)}
          </div>
          {/*<div className="flex flex-col items-start bg-white px-4">
            <div className="text-md font-bold text-body-900">Активних добровольців</div>
            {renderCount(currentEventsCount.activeVolunteers, previousEventsCount.activeVolunteers, currentEventsDailyCount)}
          </div>*/}
          <div className="flex flex-col items-start bg-white px-4">
            <div className="text-md font-bold text-body-900">Всього добровольців</div>
            {renderCount(currentEventsCount.totalVolunteers, previousEventsCount.totalVolunteers, currentEventsDailyCount.totalVolunteers)}
          </div>
        </div>
      </div>
      {loading && <LoadingOverlay />}
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
};

export default AnalyticsPage;