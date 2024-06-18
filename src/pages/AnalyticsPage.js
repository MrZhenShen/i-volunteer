import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Map } from '../components/map/Map';
import DateRange from '../components/DateRange';
import LoadingOverlay from '../components/LoadingOverlay';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

import { fetchEvents } from '../features/events/thunks';

const AnalyticsPage = () => {
  const dispatch = useDispatch();
  let { data: events, loading, error } = useSelector((state) => state.events);

  const [dateRange, setDateRange] = useState({
    startDate: new Date().toISOString().split('T')[0], // init date range with today date
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

  const [pageable, setPageable] = useState({
    page: 1,
    size: 100,
    sortBy: 'createdAt',
    sortOrder: 'desc'
  });

  useEffect(() => {

    // current date range
    let currentStartDate = new Date(dateRange.startDate);
    let currentEndDate = new Date(dateRange.endDate);
    const timePeriod = currentEndDate - currentStartDate + 1000 * 60 * 60 * 24;

    // cprevious date range
    let previousStartDate = new Date(currentStartDate - timePeriod);
    let previousEndDate = new Date(currentEndDate - timePeriod);  

    let testEvents = 
    [
      { id: 1, eventType: 'FIRE', createdAt: '2024-06-03', status: 'FINISHED', volunteers: [1,2], address:{latitude: 49.801, longitude: 24.035} },
      { id: 2, eventType: 'FIRE', createdAt: '2024-06-04', status: 'FINISHED', volunteers: [3], address:{latitude: 49.802, longitude: 24.048} },
      { id: 3, eventType: 'FIRE', createdAt: '2024-06-05', status: 'FINISHED', volunteers: [41,42,43,44], address:{latitude: 49.804, longitude: 24.032} },
      { id: 4, eventType: 'FIRE', createdAt: '2024-06-06', status: 'FINISHED', volunteers: [51], address:{latitude: 49.803, longitude: 24.039} },
      { id: 5, eventType: 'FIRE', createdAt: '2024-06-07', status: 'FINISHED', volunteers: [61,64,66], address:{latitude: 49.850, longitude: 24.041} },
      { id: 6, eventType: 'FIRE', createdAt: '2024-06-08', status: 'FINISHED', volunteers: [71,72,73,74,75,76], address:{latitude: 49.849, longitude: 24.045} },
      { id: 7, eventType: 'FIRE', createdAt: '2024-06-08', status: 'FINISHED', volunteers: [81,82, 83], address:{latitude: 49.847, longitude: 24.036} },
      { id: 8, eventType: 'FIRE', createdAt: '2024-06-09', status: 'FINISHED', volunteers: [92,94], address:{latitude: 49.848, longitude: 24.043} },      
      { id: 9, eventType: 'FIRE', createdAt: '2024-06-10', status: 'FINISHED', volunteers: [1,2], address:{latitude: 49.801, longitude: 24.038} },
      { id: 10, eventType: 'FIRE', createdAt: '2024-06-10', status: 'FINISHED', volunteers: [3], address:{latitude: 49.802, longitude: 24.045} },
      { id: 11, eventType: 'FIRE', createdAt: '2024-06-11', status: 'FINISHED', volunteers: [41,42,43,44], address:{latitude: 49.849, longitude: 24.032} },
      { id: 12, eventType: 'FIRE', createdAt: '2024-06-12', status: 'FINISHED', volunteers: [51], address:{latitude: 49.803, longitude: 24.037} },
      { id: 13, eventType: 'FIRE', createdAt: '2024-06-13', status: 'FINISHED', volunteers: [61,64,66], address:{latitude: 49.848, longitude: 24.040} },
      { id: 14, eventType: 'FIRE', createdAt: '2024-06-15', status: 'FINISHED', volunteers: [71,72,73,74,75,76], address:{latitude: 49.850, longitude: 24.034} },
      { id: 15, eventType: 'FIRE', createdAt: '2024-06-17', status: 'IN_PROGRESS', volunteers: [81,82, 83], address:{latitude: 49.847, longitude: 24.033} },
      { id: 16, eventType: 'FIRE', createdAt: '2024-06-18', status: 'CREATED', volunteers: [92,94], address:{latitude: 49.846, longitude: 24.039} },
    ];

    // get events in previous and currents date ranges
    
    dispatch(fetchEvents(pageable));
    // dispatch(fetchEvents({ startDate: previousStartDate, endDate: currentEndDate }));
    
    //events = testEvents; // use test events
    
    //console.log(events)
    //alert(`${JSON.stringify(events)}`)

    // calculate statistic for selected date range
    let eventsInDateRange = events.filter(event => { const eventDate = new Date(event.createdAt); return eventDate >= currentStartDate && eventDate <= currentEndDate; });
    let totalVolunteers = []; eventsInDateRange.forEach(event => event.volunteers.forEach(volunteer => totalVolunteers.push(volunteer)));

    let activeEvents = eventsInDateRange.filter(event => event.status === 'IN_PROGRESS');
    let activeVolunteers = []; activeEvents.forEach(event => event.volunteers.forEach(volunteer => activeVolunteers.push(volunteer)));
    setCurrentEventsCount({ activeEvents: activeEvents.length, totalEvents: eventsInDateRange.length, activeVolunteers: new Set(activeVolunteers).size, totalVolunteers: new Set(totalVolunteers).size} );

    // calculate statiostic for each day for selected date range
    setCurrentEventsDailyCount( { 
      activeEvents: calculateCountByDays(activeEvents, dateRange, 'events'),
      totalEvents: calculateCountByDays(eventsInDateRange, dateRange, 'events'),
      activeVolunteers: calculateCountByDays(activeEvents, dateRange, 'volunteers'),
      totalVolunteers: calculateCountByDays(eventsInDateRange, dateRange, 'volunteers') 
    } );
    
    // calculate statistic for previuos date range
    eventsInDateRange = events.filter(event => { const eventDate = new Date(event.createdAt); return eventDate >= previousStartDate && eventDate <= previousEndDate; });  
    totalVolunteers = []; eventsInDateRange.forEach(event => event.volunteers.forEach(volunteer => totalVolunteers.push(volunteer)));

    activeEvents = eventsInDateRange.filter(event => event.status === 'IN_PROGRESS');
    activeVolunteers = []; activeEvents.forEach(event => event.volunteers.forEach(volunteer => activeVolunteers.push(volunteer)));
    setPreviousEventsCount({ activeEvents: activeEvents.length, totalEvents: eventsInDateRange.length, activeVolunteers: new Set(activeVolunteers).size, totalVolunteers: new Set(totalVolunteers).size} );

  }, [dispatch, dateRange]);

  // calculate events or volonteers in date range
  const calculateCountByDays = (items, dateRange, type) => {
    const counts = {};
    const startDate = new Date(dateRange.startDate);
    const endDate = new Date(dateRange.endDate);
  
    // Initialize all dates in the range with count 0
    for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
      const dateString = date.toISOString().split('T')[0];
      counts[dateString] = 0;
    }
  
    // Count items for each date
    items.forEach(item => {
      const date = new Date(item.createdAt);
      if (!isNaN(date.getTime())) {
        const dateString = date.toISOString().split('T')[0];
        if (type === 'events') {
          counts[dateString]++;
        } else if (type === 'volunteers') {
          counts[dateString] += item.volunteers.length;
        }
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
  
  };

  // render statistics cell and chart
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
              type: 'event',
              position: [event.address.latitude, event.address.longitude],
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
