import React, { /*useState, useEffect*/ } from 'react'

const ScheduleAdmin = (props) => {
  // const [selectedEventId, setSelectedEventId] = useState("");

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
        </div>
      </div>
    </>
  )
}

export default ScheduleAdmin