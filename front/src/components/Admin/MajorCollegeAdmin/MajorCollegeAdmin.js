import React, { useState, useMemo, /*useEffect*/ } from 'react';
import DataTable from '../DataTable/DataTable';
import CollegeExpand from '../CollegeExpand/CollegeExpand';

const dummyExpandData = [{
  "collegeId": "dummyId1",
  "name": "College of Physical Sciences and Engineering",
  "flagColor": "Orange",
  "majors": [
    "Computer Science",
    "Software Engineering",
    "Mechanical Engineering",
    "Electrical Engineering"
  ]
}, {
  "collegeId": "dummyId2",
  "name": "College of Agriculture",
  "flagColor": "Purple",
  "majors": [
    "Agriculture Science"
  ]
}, {
  "collegeId": "dummyId3",
  "name": "College of Language and Letters",
  "majors": [
    "English",
    "Spanish"
  ]
}, {
  "collegeId": "dummyId4",
  "name": "College of General Studies",
  "flagColor": "Grey",
}, {
  "collegeId": "dummyId5",
  "flagColor": "Red",
  "majors": [
    "Accounting",
  ]
}, {
  "collegeId": "dummyId6",
  "name": "College of Literally Nothing But A Name",
}, {
  "collegeId": "dummyId7",
  "flagColor": "Yellow",
}, {
  "collegeId": "dummyId8",
  "majors": [
    "Random Extra Major",
    "Maybe Actually A Minor"
  ]
}, {
  "collegeId": "dummyId9",
  "flagColor": "Red",
  "majors": [
    "Accounting",
  ]
}, {
  "collegeId": "dummyId10",
  "flagColor": "Red",
  "majors": [
    "Accounting",
  ]
}, {
  "collegeId": "dummyId11",
  "flagColor": "Red",
  "majors": [
    "Accounting",
  ]
}];

const MajorCollegeAdmin = (props) => {
  // const [selectedCollegeId, setSelectedCollegeId] = useState("");
  const [colleges, setColleges] = useState(dummyExpandData);

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
          Academic Connections <span class="badge badge-secondary">{colleges.length} Colleges</span>
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
      <div id="createCollegeCollapse" className="collapse" aria-labelledby="addCollegeButton" data-parent="#collegeTab">
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