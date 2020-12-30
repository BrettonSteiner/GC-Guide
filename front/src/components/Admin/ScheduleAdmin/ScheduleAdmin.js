import React, { useState, useMemo, /*useEffect*/ } from 'react';
import DataTable from '../DataTable/DataTable';
import ScheduleExpand from "../ScheduleExpand/ScheduleExpand.js";

const dummyExpandData = [{
  "eventId": "dummyId1",
  "date": "09/13/2019",
  "startTime": "3:00 pm",
  "endTime": "3:40 pm",
  "name": "Meet Your I-Team",
  "location": "BYU-Idaho Stadium",
  "description": "At 3:00 p.m. on September 13 students will meet their New Student Mentor at the Meet Your I-Team gathering. Here, students will make new friends and get acquainted with other new students at BYU-Idaho. Meet Your I-Team will take place at the BYU-Idaho Stadium adjacent to the Hart Building.",
  "mapSpots": [{ "lat": 43.821020, "lng": -111.785403}]
}, {
  "eventId": "dummyId2",
  "date": "09/13/2019",
  "startTime": "9:00 am",
  "endTime": "5:00 pm",
  "name": "Registration",
  "location": "Get Connected Tent",
  "description": "New students can register for Get Connected activities here. Registration grants access to the New Student Talent Show, a free lunch, and I-Night!",
  "mapSpots": [{ "lat": 43.81792, "lng": -111.783822}]
}, {
  "eventId": "dummyId3",
  "name": "Registration",
}, {
  "eventId": "dummyId4",
  "date": "09/13/2019",
}, {
  "eventId": "dummyId5",
  "startTime": "9:00 am",
  "endTime": "5:00 pm",
}, {
  "eventId": "dummyId6",
  "startTime": "9:00 am",
}, {
  "eventId": "dummyId7",
  "endTime": "5:00 pm",
}, {
  "eventId": "dummyId8",
  "location": "Get Connected Tent",
}, {
  "eventId": "dummyId9",
  "description": "New students can register for Get Connected activities here. Registration grants access to the New Student Talent Show, a free lunch, and I-Night!",
}, {
  "eventId": "dummyId10",
  "mapSpots": [{ "lat": 43.81792, "lng": -111.783822}]
}, {
  "eventId": "dummyId11",
  "date": "09/13/2019",
  "startTime": "9:00 am",
  "endTime": "5:00 pm",
  "name": "Registration",
  "location": "Get Connected Tent",
}];

const ScheduleAdmin = (props) => {
  // const [selectedEventId, setSelectedEventId] = useState("");
  const [schedule, setSchedule] = useState(dummyExpandData);

  const columns = useMemo(() => {
    return [
      {
        Header: "Event Name",
        accessor: "name",
        filter: "filterEventNames"
      },
      {
        Header: "Date",
        accessor: "date",
        filter: 'filterDates'
      },
      {
        Header: "Time",
        accessor: "displayTimes",
        filter: 'filterTimes'
      },
      {
        Header: "Location",
        accessor: "location",
        filter: "filterLocations"
      },
      {
        id: "expander",
        hideFilter: true,
        Cell: ({ row }) =>
          // Use the row.canExpand and row.getToggleRowExpandedProps prop getter
          // to build the toggle for expanding a row
          (<i className={row.isExpanded ? "fas fa-chevron-down fa-vc" : "fas fa-chevron-up fa-vc"}></i>),
      },
    ] 
  });

  const filterEventNames = (rows, id, filterValue) => {
    return rows.filter(row => {
      return row.original?.name?.toLowerCase().includes(filterValue.toLowerCase());
    });
  }

  const filterDates = (rows, id, filterValue) => {
    return rows.filter(row => {
      return row.original?.date?.toLowerCase().includes(filterValue.toLowerCase());
    });
  }

  const filterTimes = (rows, id, filterValue) => {
    return rows.filter(row => {
      return row.original?.startTime?.toLowerCase().includes(filterValue.toLowerCase()) || row.original?.startTime?.toLowerCase().includes(filterValue.toLowerCase());
    });
  }

  const filterLocations = (rows, id, filterValue) => {
    return rows.filter(row => {
      return row.original?.location?.toLowerCase().includes(filterValue.toLowerCase());
    });
  }

  return (
    <>
    <div id="scheduleTab" className="card">
      <div className="card-header d-flex justify-content-between">
        <h5 className="mb-0 align-self-center">
          Schedule <span class="badge badge-secondary">{schedule.length} Events</span>
        </h5>
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
        <DataTable columns={columns} 
          data={schedule.map(row => {
            let newRow= {...row};
            newRow.displayTimes = <><div>{newRow.startTime? newRow.startTime : null}{newRow.endTime? " - " + newRow.endTime : null}</div></>;
            return newRow;
          })}
          SubComponent={({row}) => { return (<ScheduleExpand row={row.original}/>) }}
          customFilters={{filterEventNames, filterDates, filterTimes, filterLocations}}/>
      </div>
    </div>
    </>
  )
}

export default ScheduleAdmin