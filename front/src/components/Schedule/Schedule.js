import React/*, {useState, useEffect}*/ from 'react';
import './Schedule.css';
import ScheduleTable from './ScheduleTable';

const Schedule = (props) => {
  // useEffect(() => {
  //   //Call database for data
  // }, [])
  return (<>
  <div class="row" id="scheduleComponent">
    <div class="col-lg table-wrapper-scroll-y my-custom-scrollbar" id="scheduleTableHolder">
      <ScheduleTable/>
    </div>
    <div class="col-lg" id="scheduleDesktopMapHolder">
      <h5 class="centered" id="selectedEventName">Name of Event</h5>
      <div id="map"></div>
    </div>
  </div>
  </>);
}

export default Schedule;