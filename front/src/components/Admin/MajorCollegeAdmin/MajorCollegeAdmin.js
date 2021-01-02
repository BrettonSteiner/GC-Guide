import React, { useState, useMemo, useEffect, } from 'react';
import DataTable from '../DataTable/DataTable';
import CollegeExpand from '../CollegeExpand/CollegeExpand';

const MajorCollegeAdmin = (props) => {
  const [colleges, setColleges] = useState(props?.colleges? props.colleges : []);

  useEffect(() => {
    setColleges(props?.colleges);
  }, [props?.colleges]);

  const columns = useMemo(() => {
    return [
      {
        Header: "College Name",
        accessor: "name",
        filter: 'filterCollegeNames'
      },
      {
        Header: "Flag Color",
        accessor: "flagColor",
        filter: 'filterFlagColors'
      },
      {
        Header: "Majors",
        accessor: "displayMajors",
        filter: 'filterMajors'
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

  const filterCollegeNames = (rows, id, filterValue) => {
    return rows.filter(row => {
      return row.original?.name?.toLowerCase().includes(filterValue.toLowerCase());
    });
  }

  const filterFlagColors = (rows, id, filterValue) => {
    return rows.filter(row => {
      return row.original?.flagColor?.toLowerCase().includes(filterValue.toLowerCase());
    });
  }

  const filterMajors = (rows, id, filterValue) => {
    return rows.filter(row => {
      let found = false;
      row.original?.majors?.forEach(major => {
        if (major?.toLowerCase().includes(filterValue.toLowerCase()))
          found = true;
      })
      return found;
    })
  }

  return (
    <>
    <div id="collegeTab" className="card">
      <div className="card-header d-flex justify-content-between">
        <h5 className="mb-0 align-self-center">
          Academic Connections <span className="badge badge-secondary">{colleges.length} Colleges</span>
        </h5>
        <div className="d-flex flex-row-reverse">
          <input type="button" value="Import Data From File" className="btn btn-info admin-btn "/>
          <input
            id="addCollegeButton"
            type="button"
            value="Add College"
            className="btn btn-info admin-btn"
            data-toggle="collapse"
            data-target="#createCollegeCollapse"
            aria-controls="createCollegeCollapse"
          />
        </div>
      </div>
      <div id="createCollegeCollapse" className="collapse border-bottom" aria-labelledby="addCollegeButton" data-parent="#collegeTab">
        <div className="card-body">
          <CollegeExpand row={{createMode:true, cancelTarget:"createCollegeCollapse"}}/>
        </div>
      </div>
      <div className="card-body">
        <DataTable columns={columns} 
          data={colleges.map(row => {
            let newRow= {...row};
            newRow.displayMajors = (newRow.majors && newRow.majors.length > 0) ? <div>{newRow.majors[0]}{(newRow.majors.length > 1 && newRow.majors[0]) ? " ..." : ""}</div> : null;
            return newRow;
          })}
          SubComponent={({row}) => { return (<CollegeExpand row={row.original}/>) }}
          customFilters={{filterCollegeNames, filterFlagColors, filterMajors}}/>
      </div>
    </div>
    </>
  )
}

export default MajorCollegeAdmin;