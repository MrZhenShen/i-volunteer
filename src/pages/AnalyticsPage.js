import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Map } from '../components/map/Map';
import DateRange from '../components/DateRange';
import LoadingOverlay from '../components/LoadingOverlay';
import { fetchEvents } from '../features/events/thunks';
import { AreaChart, Area, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const AnalyticsPage = () => {
  const dispatch = useDispatch();
  const { data: events, loading } = useSelector((state) => state.events);
  const [dateRange, setDateRange] = useState({ startDate: '2024-06-01', endDate: '2024-06-10' }); // For testing, use fixed date range
  const [eventCounts, setEventCounts] = useState({
    activeEvents: 0,
    totalEvents: 0,
    activeVolunteers: 0,
  });
  const [previousCounts, setPreviousCounts] = useState({
    activeEvents: 0,
    totalEvents: 0,
    activeVolunteers: 0,
  });
  const [dailyEventCounts, setDailyEventCounts] = useState([]);

  // Mock data for testing
  const mockEvents = [
    { id: 1, eventType: 'type1', date: '2024-06-01', status: 'active', volunteers: [2, 3, 4], latitude: 49.841082, longitude: 24.030533 },
    { id: 2, eventType: 'type1', date: '2024-06-02', status: 'active', volunteers: [2, 3, 4], latitude: 49.841082, longitude: 24.030533 },
    { id: 3, eventType: 'type1', date: '2024-06-05', status: 'active', volunteers: [2, 3, 4], latitude: 49.841082, longitude: 24.030533 },
    { id: 4, eventType: 'type1', date: '2024-06-05', status: 'active', volunteers: [2, 3, 4], latitude: 49.841082, longitude: 24.030533 },
    { id: 5, eventType: 'type1', date: '2024-06-05', status: 'active', volunteers: [2, 3, 4], latitude: 49.841082, longitude: 24.030533 },
    { id: 6, eventType: 'type2', date: '2024-06-09', status: 'active', volunteers: [2, 3, 4], latitude: 49.842082, longitude: 24.031533 },
    { id: 7, eventType: 'type3', date: '2024-06-10', status: 'active', volunteers: [2, 3, 4], latitude: 49.843082, longitude: 24.032533 },
    { id: 8, eventType: 'type4', date: '2024-06-10', status: 'active', volunteers: [1, 8, 3], latitude: 49.844082, longitude: 24.033533 },
    // Add more mock events as needed
  ];

  useEffect(() => {

    // if (dateRange.startDate && dateRange.endDate) {
    //   console.log('Fetching events for date range:', dateRange);
    //   dispatch(fetchEvents({ startDate: dateRange.startDate, endDate: dateRange.endDate }));
    // }

    // Use mock data for testing
    setMockData();
  }, [dispatch, dateRange]);

  const setMockData = () => {
    if (mockEvents.length > 0) {
      const activeEvents = mockEvents.filter(event => event.status === 'active').length;
      const activeVolunteers = mockEvents.reduce((acc, event) => acc + event.volunteers.length, 0);

      setPreviousCounts(eventCounts);

      setEventCounts({
        activeEvents,
        totalEvents: mockEvents.length,
        activeVolunteers,
      });

      const dailyCounts = calculateDailyCounts(mockEvents, dateRange);
      setDailyEventCounts(dailyCounts);

      console.log('Event counts updated:', {
        activeEvents,
        totalEvents: mockEvents.length,
        activeVolunteers,
      });
    } else {
      setPreviousCounts(eventCounts);

      setEventCounts({
        activeEvents: 0,
        totalEvents: 0,
        activeVolunteers: 0,
      });

      setDailyEventCounts([]);

      console.log('No events found for the selected date range.');
    }
  };

  const calculateDailyCounts = (events, dateRange) => {
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

  const handleDateChange = (startDate, endDate) => {
    setDateRange({ startDate, endDate });
  };

  const renderCount = (count, previousCount, dailyCounts) => {
    const difference = count - previousCount;
    const differenceText = ( difference > 0 ) ? `+${difference}` : difference;
    const differenceColor = ( difference > 0 )? 'bg-red-200' : (difference === 0 ? 'bg-body-200' : 'bg-green-200');

    return (
      <div className="flex flex-col items-start w-full">
        <div className="flex items-center mb-2">
          <span className="text-3xl font-bold text-primary-500">{count}</span>
          {
            <span className={`ml-2 text-sm ${differenceColor} px-1 rounded`}>
              {differenceText}
            </span>
          }
        </div>
        <ResponsiveContainer width="80%" height="80%">
          <AreaChart data={dailyCounts}>
            <defs>s
              <linearGradient id="color_count" x1="0" y1="0" x2="0" y2="1">
                <stop offset="2%" stopColor="#1288CB" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#1288CB" stopOpacity={0}/>
              </linearGradient>
            </defs>              
            <XAxis dataKey="date" tick={false} axisLine={false}/>
            <YAxis  tick={false} axisLine={false} />
            <Tooltip />
            <Area type="monotone" dataKey="count" stroke="#8884d8" fillOpacity={1} fill="url(#color_count)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-none py-4">
        <h1 className="text-body-900 text-lg font-bold mb-4">Аналітика</h1>
        <div className="relative z-10 mb-4">
          <DateRange onChange={handleDateChange} />
        </div>
      </div>
      <div className="flex flex-grow">
        <div className="flex-grow relative z-0 pr-4">
          <Map
            markers={mockEvents.map((event) => ({
              id: event.id,
              type: event.eventType,
              position: [event.latitude, event.longitude],
              selected: false,
            }))}
            className="absolute inset-0"
          />
        </div>
        <div className="w-1/3 flex flex-col space-y-4">
          <div className="flex flex-col items-start bg-white p-4">
            <div className="text-md font-bold text-body-900">Активних подій</div>
            {renderCount(eventCounts.activeEvents, previousCounts.activeEvents, dailyEventCounts)}
          </div>
          <div className="flex flex-col items-start bg-white p-4">
            <div className="text-md font-bold text-body-900">Всього подій</div>
            {renderCount(eventCounts.totalEvents, previousCounts.totalEvents, dailyEventCounts)}
          </div>
          <div className="flex flex-col items-start bg-white p-4">
            <div className="text-md font-bold text-body-900">Активних добровольців</div>
            {renderCount(eventCounts.activeVolunteers, previousCounts.activeVolunteers, dailyEventCounts)}
          </div>
        </div>
      </div>
      {loading && <LoadingOverlay />}
    </div>
  );
};

export default AnalyticsPage;
