import React, {useState, useEffect} from 'react';
import './Schedule.css';
import ScheduleTable from './ScheduleTable';
import Map from '../Map/Map';

const Schedule = (props) => {
  const [currentEvent, setCurrentEvent] = useState({});
  
  useEffect(() => {
    // call the google maps API to update the map
  }, [currentEvent]);

  return (<>
  <div className="row" id="scheduleComponent">
    <div className="col-lg table-wrapper-scroll-y my-custom-scrollbar" id="scheduleTableHolder">
      <h6 className="centered" id="scheduleTableInstructions">Select an Event for details</h6>
      <ScheduleTable changeEvent={setCurrentEvent}/>
    </div>
    <div className="col-lg" id="scheduleDesktopMapHolder">
      {currentEvent?.name ? <h5 className="centered" id="selectedEventName">{currentEvent.name}</h5> : <h5 className="centered" id="selectedEventName">Select an Event to see its location</h5>}
      <div id="map">
        <Map height="700px" event={currentEvent} />
      </div>
    </div>
  </div>
  </>);
}

export default Schedule;