import React, { useState, useMemo, useEffect, } from 'react';
import DataTable from '../DataTable/DataTable';
import CollegeExpand from '../CollegeExpand/CollegeExpand';
import Importer from '../Importer/Importer';

const MajorCollegeAdmin = (props) => {
  const [semesterId, setSemesterId] = useState(props?.semester?._id? props.semester._id : null);
  const [colleges, setColleges] = useState(props?.semester?.colleges? props.semester.colleges : []);

  useEffect(() => {
    setSemesterId(props?.semester?._id? props.semester._id : null)
    setColleges(props?.semester?.colleges? props.semester.colleges : []);
  }, [props?.semester]);

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
  }, []);

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
      {!semesterId
      ? <div className="grayscale">
          <h5 className="grayscale-text">Create a new semester to begin.</h5>
        </div>
      : null
      }
      <ul className="nav nav-tabs" id="collegeTabs" role="tablist">
        <li className="nav-item">
          <a className="nav-link active" id="collegesTab" data-toggle="tab" href="#colleges" role="tab" aria-controls="colleges" aria-selected="true">
            <h5 className="mb-0 align-self-center">Colleges <span className="badge badge-secondary">{colleges.length}</span></h5>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" id="createCollegeTab" data-toggle="tab" href="#createCollege" role="tab" aria-controls="createCollege" aria-selected="false">
            <h5 className="mb-0 align-self-center">Create New College</h5>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" id="importCollegesTab" data-toggle="tab" href="#importColleges" role="tab" aria-controls="importColleges" aria-selected="false">
            <h5 className="mb-0 align-self-center">Import Colleges From File</h5>
          </a>
        </li>
      </ul>
      <div className="tab-content">
        <div className="card-body tab-pane show active" id="colleges" role="tabpanel" aria-labelledby="collegesTab">
          <DataTable columns={columns} 
            data={colleges.map(row => {
              let newRow= {...row};
              newRow.semesterId = semesterId;
              newRow.displayMajors = (newRow.majors && newRow.majors.length > 0) ? <div>{newRow.majors[0]}{(newRow.majors.length > 1 && newRow.majors[0]) ? " ..." : ""}</div> : null;
              return newRow;
            })}
            SubComponent={({row}) => { return (<CollegeExpand row={row.original} rerenderSemester={props?.rerenderSemester? props.rerenderSemester : null}/>) }}
            customFilters={{filterCollegeNames, filterFlagColors, filterMajors}}/>
        </div>
        <div className="card-body tab-pane" id="createCollege" role="tabpanel" aria-labelledby="createCollegeTab">
          <CollegeExpand row={{semesterId:semesterId, createMode:true}} rerenderSemester={props?.rerenderSemester? props.rerenderSemester : null}/>
        </div>
        <div className="card-body tab-pane" id="importColleges" role="tabpanel" aria-labelledby="importCollegesTab">
          <Importer semesterId={semesterId} url="/colleges/import" rerenderSemester={props?.rerenderSemester? props.rerenderSemester : null}/>
        </div>
      </div>
    </div>
    </>
  )
}

export default MajorCollegeAdmin;