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
    startDate: null,
    endDate: null
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
  const [pagable, setPagable] = useState({
    page: 1,
    size: 1000000,
    sortBy: 'createdAt',
    sortOrder: 'desc'
  });

  useEffect(() => {
    const currentStartDate = new Date(dateRange.startDate);
    const currentEndDate = new Date(dateRange.endDate);
    const timePeriod_Millisecond = currentEndDate - currentStartDate + 1000 * 60 * 60 * 24;

    const previousStartDate = new Date(currentStartDate - timePeriod_Millisecond);
    const previousEndDate = new Date(currentEndDate - timePeriod_Millisecond);

    dispatch(fetchEvents(pagable));
    

    const currentStats = calculateStatistics(events, dateRange);
    setCurrentEventsCount(currentStats.eventsCount);
    setCurrentEventsDailyCount(currentStats.dailyCounts);

    const previousStats = calculateStatistics(events, {
      startDate: previousStartDate,
      endDate: previousEndDate,
    });
    setPreviousEventsCount(previousStats.eventsCount);

  }, [dispatch, dateRange]);

  const calculateStatistics = (events, dateRange) => {
    const startDate = new Date(dateRange.startDate);
    const endDate = new Date(dateRange.endDate);

    const eventsInDateRange = events.filter(event => {
      const eventDate = new Date(event.createdAt);
      return eventDate >= startDate && eventDate <= endDate;
    });

    const totalVolunteers = [];
    eventsInDateRange.forEach(event => event.volunteers.forEach(volunteer => totalVolunteers.push(volunteer)));

    const activeEvents = eventsInDateRange.filter(event => event.status === 'IN_PROGRESS');
    const activeVolunteers = [];
    activeEvents.forEach(event => event.volunteers.forEach(volunteer => activeVolunteers.push(volunteer)));

    const eventsCount = {
      activeEvents: activeEvents.length,
      totalEvents: eventsInDateRange.length,
      activeVolunteers: activeVolunteers.length,
      totalVolunteers: totalVolunteers.length
    };

    const dailyCounts = {
      activeEvents: calculateCountByDays(activeEvents, dateRange, 'events'),
      totalEvents: calculateCountByDays(eventsInDateRange, dateRange, 'events'),
      activeVolunteers: calculateCountByDays(activeEvents, dateRange, 'volunteers'),
      totalVolunteers: calculateCountByDays(eventsInDateRange, dateRange, 'volunteers')
    };

    return { eventsCount, dailyCounts };
  };

  const calculateCountByDays = (items, dateRange, type) => {
    const counts = {};
    const startDate = new Date(dateRange.startDate);
    const endDate = new Date(dateRange.endDate);

    for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
      const dateString = date.toISOString().split('T')[0];
      counts[dateString] = 0;
    }

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
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 999);

    setDateRange({ startDate: startDate, endDate: endDate });
  };

  const renderCount = (count, previousCount, dailyCounts) => {
    const difference = count - previousCount;
    const differenceText = (difference >= 0) ? `+${difference}` : difference;
    const differenceColor = (difference > 0) ? 'bg-red-50' : (difference === 0 ? 'bg-body-50' : 'bg-green-50');

    return (
      <div className="flex flex-col items-start w-full">
        <div className="flex items-center">
          <span className="text-3xl font-bold text-primary-500">{count}</span>
          <span className={`ml-2 text-sm ${differenceColor}`}>{differenceText}</span>
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
            markers={events
              .filter(event => {
                const eventDate = new Date(event.createdAt);
                const currentStartDate = new Date(dateRange.startDate);
                const currentEndDate = new Date(dateRange.endDate);
                return eventDate >= currentStartDate && eventDate <= currentEndDate;
              })
              .map(event => ({
                id: event.id,
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
