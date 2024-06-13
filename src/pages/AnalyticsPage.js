import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Map } from '../components/map/Map';
import DateRange from '../components/DateRange';
import LoadingOverlay from '../components/LoadingOverlay';
import { fetchEvents } from '../features/events/thunks';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const AnalyticsPage = () => {
  const dispatch = useDispatch();
  const { data: events, loading } = useSelector((state) => state.events);
  const [dateRange, setDateRange] = useState({ startDate: null, endDate: null });
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

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      console.log('Fetching events for date range:', dateRange);
      dispatch(fetchEvents({ startDate: dateRange.startDate, endDate: dateRange.endDate }));
    }
  }, [dispatch, dateRange]);

  useEffect(() => {
    if (events.length > 0) {
      const activeEvents = events.filter(event => event.status === 'active').length;
      const activeVolunteers = events.reduce((acc, event) => acc + event.volunteers.length, 0);

      setPreviousCounts(eventCounts);

      setEventCounts({
        activeEvents,
        totalEvents: events.length,
        activeVolunteers,
      });

      const dailyCounts = calculateDailyCounts(events);
      setDailyEventCounts(dailyCounts);

      console.log('Event counts updated:', {
        activeEvents,
        totalEvents: events.length,
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
  }, [events, eventCounts]);

  const calculateDailyCounts = (events) => {
    const counts = {};
    events.forEach(event => {
      const date = new Date(event.date);
      if (!isNaN(date.getTime())) {
        const dateString = date.toISOString().split('T')[0];
        if (!counts[dateString]) {
          counts[dateString] = 0;
        }
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
    const differenceText = difference > 0 ? `+${difference}` : difference;
    const differenceColor = difference > 0 ? 'bg-green-200' : 'bg-red-200';

    return (
      <div className="flex flex-col items-start w-full">
        <div className="flex items-center mb-2">
          <span className="text-3xl font-bold text-primary-500">{count}</span>
          {difference !== 0 && (
            <span className={`ml-2 text-sm ${differenceColor} px-1 rounded`}>
              {differenceText}
            </span>
          )}
        </div>
        <ResponsiveContainer width="100%" height={100}>
          <LineChart data={dailyCounts}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <CartesianGrid stroke="#f5f5f5" />
            <Line type="monotone" dataKey="count" stroke="#387908" />
          </LineChart>
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
            markers={events.map((event) => ({
              id: event.id,
              type: event.eventType,
              position: [event.latitude, event.longitude],
              selected: false,
            }))}
            className="absolute inset-0"
          />
        </div>
        <div className="w-1/3 flex flex-col space-y-4">
          <div className="flex flex-col items-start bg-white p-4 rounded shadow">
            <div className="text-md font-bold text-body-900">Активних подій</div>
            {renderCount(eventCounts.activeEvents, previousCounts.activeEvents, dailyEventCounts)}
          </div>
          <div className="flex flex-col items-start bg-white p-4 rounded shadow">
            <div className="text-md font-bold text-body-900">Всього подій</div>
            {renderCount(eventCounts.totalEvents, previousCounts.totalEvents, dailyEventCounts)}
          </div>
          <div className="flex flex-col items-start bg-white p-4 rounded shadow">
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
