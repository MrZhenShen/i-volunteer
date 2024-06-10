import React from 'react';

import { Map } from '../components/map/Map';
import DateRange from '../components/DateRange';
import LoadingOverlay from '../components/LoadingOverlay';

const AnalyticsPage = () => {

  return (
    <>
    <div className="flex pt-2 justify-between">
        <h1 className="text-lg font-bold">Аналітика</h1>
    </div>
    <div className=" flex relative pt-2">
        <DateRange  />
    </div>
    <div className="flex-grow relative pt-2 ">
        <Map
          markers={[
            {
              id: 1,
              type: "event",
              position: [49.84108232367849, 24.030532836914066],
              selected: false
            },
            {
              id: 2,
              type: "rescuer",
              position: [49.84047343621103, 24.045767784118652],
              selected: false
            }
          ]} />
      </div>
      {/* <LoadingOverlay /> */}
    </>
    
  );
};

export default AnalyticsPage;
