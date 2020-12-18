import React, { /*useState, useEffect*/ } from 'react';
import CollegeExpand from '../CollegeExpand/CollegeExpand.js';

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
    <div className="card">
    <div className="card-header d-flex justify-content-between">
          <h5 className="align-middle">Academic Connections</h5>
          <div className="d-flex flex-row-reverse">
            <input type="button" value="Import Data From File" className="btn btn-info admin-btn "/>
            <input type="button" value="Add College" className="btn btn-info admin-btn "/>
          </div>
        </div>
        <div className="card-body">
          {/* ADD ADMIN STUFF HERE */}
          <p>There are {props.colleges.length} Colleges in this semester</p>
          <CollegeExpand name={dummyExpandData.name} flagColor={dummyExpandData.flagColor} majors={dummyExpandData.majors} />
        </div>
      </div>
    </>
  )
}

export default MajorCollegeAdmin;