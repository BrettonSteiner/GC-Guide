import React, { /*useState, useEffect*/ } from 'react'
import ScheduleExpand from "../ScheduleExpand/ScheduleExpand.js";

const ScheduleAdmin = (props) => {
  // const [selectedEventId, setSelectedEventId] = useState("");
  const dummyExpandData = {
    "date": "09/13/2019",
    "startTime": "3:00 pm",
    "endTime": "3:40 pm",
    "name": "Meet Your I-Team",
    "location": "BYU-Idaho Stadium",
    "description": "At 3:00 p.m. on September 13 students will meet their New Student Mentor at the Meet Your I-Team gathering. Here, students will make new friends and get acquainted with other new students at BYU-Idaho. Meet Your I-Team will take place at the BYU-Idaho Stadium adjacent to the Hart Building.",
    "mapSpots": [{ "lat": 43.821020, "lng": -111.785403}]
  }

  return (
    <>
    <div id="scheduleTab" className="card">
      <div className="card-header d-flex justify-content-between">
        <h5 className="align-middle">Events</h5>
        <div className="d-flex flex-row-reverse">
          <input type="button" value="Import Data From File" className="btn btn-info admin-btn "/>
          <input
            id="addEventButton"
            type="button"
            value="Add Event"
            className="btn btn-info admin-btn"
            data-toggle="collapse"
            data-target="#createEventCollapse"
            aria-controls="createEventCollapse"
          />
        </div>
      </div>
      <div id="createEventCollapse" className="collapse" aria-labelledby="addEventButton" data-parent="#scheduleTab">
        <div className="card-body">
          <ScheduleExpand row={{createMode:true, cancelTarget:"createEventCollapse"}}/>
        </div>
      </div>
      <div className="card-body">
        {/* ADD ADMIN STUFF HERE */}
        <p>There are {props.events.length} Events in this semester</p>
        <ScheduleExpand row={dummyExpandData}/>
      </div>
    </div>
    </>
  )
}

export default ScheduleAdmin