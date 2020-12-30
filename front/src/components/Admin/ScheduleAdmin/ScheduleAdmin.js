import React, { useState, useMemo, useEffect, } from 'react';
import DataTable from '../DataTable/DataTable';
import ScheduleExpand from "../ScheduleExpand/ScheduleExpand.js";

const ScheduleAdmin = (props) => {
  const [events, setEvents] = useState(props?.events? props.events : []);

  useEffect(() => {
    setEvents(props?.events);
  }, [props?.events]);

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
          Schedule <span class="badge badge-secondary">{events.length} Events</span>
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
          data={events.map(row => {
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

export default ScheduleAdmin;