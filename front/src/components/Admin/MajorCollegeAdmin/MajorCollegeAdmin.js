import React, { /*useState, useEffect*/ } from 'react';
import CollegeExpand from '../CollegeExpand/CollegeExpand';

const MajorCollegeAdmin = (props) => {
  // const [selectedCollegeId, setSelectedCollegeId] = useState("");
  const dummyExpandData = {
    "name": "College of Physical Sciences and Engineering",
    "flagColor": "Orange",
    "majors": [
      "Computer Science",
      "Software Engineering",
      "Mechanical Engineering",
      "Electrical Engineering"
    ]
  };

  return (
    <>
    <div id="collegeTab" className="card">
      <div className="card-header d-flex justify-content-between">
        <h5 className="align-middle">Academic Connections</h5>
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
        {/* ADD ADMIN STUFF HERE */}
        <p>There are {props.colleges.length} Colleges in this semester</p>
        <CollegeExpand row={dummyExpandData}/>
      </div>
    </div>
    </>
  )
}

export default MajorCollegeAdmin;