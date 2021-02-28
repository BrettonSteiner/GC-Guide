import React, { useState, useMemo, useEffect, } from 'react';
import DataTable from '../DataTable/DataTable';
import ScheduleExpand from "../ScheduleExpand/ScheduleExpand.js";
import Importer from '../Importer/Importer';

const ScheduleAdmin = (props) => {
  const [semesterId, setSemesterId] = useState(props?.semester?._id? props.semester._id : null);
  const [events, setEvents] = useState(props?.semester?.events? props.semester.events : []);

  useEffect(() => {
    setSemesterId(props?.semester?._id? props.semester._id : null)
    setEvents(props?.semester?.events? props.semester.events : []);
  }, [props?.semester]);

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
  }, []);

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
      const timeString = (row.original?.startTime? row.original.startTime : "")
        + (row.original?.endTime? (" - " + row.original.endTime) : "");
      return timeString.toLowerCase().includes(filterValue.toLowerCase());
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
      {!semesterId
      ? <div className="grayscale">
          <h5 className="grayscale-text">Create a new semester to begin.</h5>
        </div>
      : null
      }
      <ul className="nav nav-tabs" id="eventTabs" role="tablist">
        <li className="nav-item">
          <a className="nav-link active" id="eventsTab" data-toggle="tab" href="#events" role="tab" aria-controls="events" aria-selected="true">
            <h5 className="mb-0 align-self-center">Events <span className="badge badge-secondary">{events.length}</span></h5>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" id="createEventTab" data-toggle="tab" href="#createEvent" role="tab" aria-controls="createEvent" aria-selected="false">
            <h5 className="mb-0 align-self-center">Create New Event</h5>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" id="importEventsTab" data-toggle="tab" href="#importEvents" role="tab" aria-controls="importEvents" aria-selected="false">
            <h5 className="mb-0 align-self-center">Import Events From File</h5>
          </a>
        </li>
      </ul>
      <div className="tab-content">
        <div className="card-body tab-pane show active" id="events" role="tabpanel" aria-labelledby="eventsTab">
          <DataTable columns={columns} 
            data={events.map(row => {
              let newRow= {...row};
              newRow.semesterId = semesterId;
              newRow.displayTimes = <><div>{newRow.startTime? newRow.startTime : null}{newRow.endTime? " - " + newRow.endTime : null}</div></>;
              return newRow;
            })}
            SubComponent={({row}) => { return (<ScheduleExpand row={row.original} rerenderSemester={props?.rerenderSemester? props.rerenderSemester : null}/>) }}
            customFilters={{filterEventNames, filterDates, filterTimes, filterLocations}}/>
        </div>
        <div className="card-body tab-pane" id="createEvent" role="tabpanel" aria-labelledby="createEventTab">
          <ScheduleExpand row={{semesterId:semesterId, createMode:true}} rerenderSemester={props?.rerenderSemester? props.rerenderSemester : null}/>
        </div>
        <div className="card-body tab-pane" id="importEvents" role="tabpanel" aria-labelledby="importEventsTab">
          <Importer semesterId={semesterId} url="/schedule/import" rerenderSemester={props?.rerenderSemester? props.rerenderSemester : null}/>
        </div>
      </div>
    </div>
    </>
  )
}

export default ScheduleAdmin;