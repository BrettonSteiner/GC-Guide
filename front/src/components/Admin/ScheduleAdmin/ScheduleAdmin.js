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
      <div className="card">
      <div className="card-header d-flex justify-content-between">
          <h5 className="align-middle">Events</h5>
          <div className="d-flex flex-row-reverse">
            <input type="button" value="Import Data From File" className="btn btn-info admin-btn "/>
            <input type="button" value="Add Event" className="btn btn-info admin-btn "/>
          </div>
        </div>
        <div className="card-body">
          {/* ADD ADMIN STUFF HERE */}
          <p>There are {props.events.length} Events in this semester</p>
          <ScheduleExpand 
            name={dummyExpandData.name}
            date={dummyExpandData.date}
            startTime={dummyExpandData.startTime}
            endTime={dummyExpandData.endTime}
            location={dummyExpandData.location}
            description={dummyExpandData.description}
            mapSpots={dummyExpandData.mapSpots}
          />
        </div>
      </div>
    </>
  )
}

export default ScheduleAdmin