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

    // get current date range
    let currentStartDate = new Date(dateRange.startDate);
    let currentEndDate = new Date(dateRange.endDate);

    const timePeriod_Millisecond = currentEndDate - currentStartDate + 1000 * 60 * 60 * 24;

    // get previous date range
    let previousStartDate = new Date(currentStartDate - timePeriod_Millisecond);
    let previousEndDate = new Date(currentEndDate - timePeriod_Millisecond);  

    let testEvents = 
    [
      {
        "id": 18,
        "eventType": "OTHER",
        "zipCode": null,
        "address": {
          "id": 18,
          "street": "вулиця",
          "apartmentNumber": "1",
          "buildingNumber": null,
          "city": "Львів",
          "state": "Львівська",
          "zipCode": "79000",
          "latitude": 49.87118501043983,
          "longitude": 23.985214233398438
        },
        "volunteers": [
          {
            "id": 2,
            "correlationId": "2b69deb8-4795-43f1-936a-dc1ce43ae368",
            "firstName": "Ростислав",
            "lastName": "Гриник",
            "mobilePhone": "0639302157",
            "address": {
              "id": null,
              "street": "Стрийська",
              "apartmentNumber": null,
              "buildingNumber": "61",
              "city": "Львів",
              "state": "Львівьска обл.",
              "zipCode": "79031",
              "latitude": 0,
              "longitude": 0
            },
            "birthDate": "1990-03-15",
            "latitude": 0,
            "longitude": 0,
            "status": "REQUESTED",
            "tokens": [
              {
                "id": 154,
                "token": "APA91bH3f4sOpfxYyemBOyljXelpEwD0sFpPNCkEzep3ze6l8RdaznDXl7u1hio9trVLlDE8yvNeNfRrWyL4P18aTLATkKYc8lHYUzc2zb0XfRh1QPYKG_byRljU216xQEEKkltKdcRt",
                "expiryDateTime": "2024-07-05T19:57:20.248048"
              }
            ],
            "rnokpp": "1"
          }
        ],
        "description": "вода",
        "status": "IN_PROGRESS",
        "createdAt": "2024-06-18T14:16:27.302288"
      },
      {
        "id": 19,
        "eventType": "SEARCH_AND_RESCUE",
        "zipCode": null,
        "address": {
          "id": 19,
          "street": "вулиця",
          "apartmentNumber": "1",
          "buildingNumber": null,
          "city": "Львів",
          "state": "Львівська",
          "zipCode": "79000",
          "latitude": 49.91144015213966,
          "longitude": 23.887023925781254
        },
        "volunteers": [],
        "description": "опис події",
        "status": "IN_PROGRESS",
        "createdAt": "2024-06-18T14:17:38.513258"
      }
    ];

    // get events
    
    // get events in previous and currents date ranges
    // not yet implemented
    // dispatch(fetchEvents({ startDate: previousStartDate, endDate: currentEndDate }));

    // get all events
    dispatch(fetchEvents(pageable));
    
    // get test events
    //events = testEvents; 

    // calculate general statistic for selected date range
    let eventsInDateRange = events.filter(event => {
      const eventDate = new Date(event.createdAt);
      return eventDate >= currentStartDate && eventDate <= currentEndDate;
    });  
    let totalVolunteers = []; eventsInDateRange.forEach(event => event.volunteers.forEach(volunteer => totalVolunteers.push(volunteer)));
    console.log(eventsInDateRange)

    let activeEvents = eventsInDateRange.filter(event => event.status === 'IN_PROGRESS');
    let activeVolunteers = []; activeEvents.forEach(event => event.volunteers.forEach(volunteer => activeVolunteers.push(volunteer)));
    setCurrentEventsCount({ activeEvents: activeEvents.length, totalEvents: eventsInDateRange.length, activeVolunteers: new Set(activeVolunteers).size, totalVolunteers: new Set(totalVolunteers).size} );

    // calculate statistic for each day for selected date range
    setCurrentEventsDailyCount( { 
      activeEvents: calculateCountByDays(activeEvents, dateRange, 'events'),
      totalEvents: calculateCountByDays(eventsInDateRange, dateRange, 'events'),
      activeVolunteers: calculateCountByDays(activeEvents, dateRange, 'volunteers'),
      totalVolunteers: calculateCountByDays(eventsInDateRange, dateRange, 'volunteers') 
    } );
    
    // calculate statistic for previuos date range
    eventsInDateRange = events.filter(event => {
      const eventDate = new Date(event.createdAt);
      return eventDate >= previousStartDate && eventDate <= previousEndDate;
    });  
    totalVolunteers = []; eventsInDateRange.forEach(event => event.volunteers.forEach(volunteer => totalVolunteers.push(volunteer)));

    activeEvents = eventsInDateRange.filter(event => event.status === 'IN_PROGRESS');
    activeVolunteers = []; activeEvents.forEach(event => event.volunteers.forEach(volunteer => activeVolunteers.push(volunteer)));
    setPreviousEventsCount({ activeEvents: activeEvents.length, totalEvents: eventsInDateRange.length, activeVolunteers: new Set(activeVolunteers).size, totalVolunteers: new Set(totalVolunteers).size} );

  }, [dispatch, dateRange]);

  // calculate statistic on events or volonteers in dateRange
  // type = [`events`, `volunteers`]
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

  // handle date range changed
  const handleDateChange = (value) => {

    const [startDate, endDate] = value;
  
    // Set hours to include the entire day
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 999);

    setDateRange({ startDate: startDate, endDate: endDate });
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
