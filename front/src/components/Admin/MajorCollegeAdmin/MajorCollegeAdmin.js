import React, { /*useState, useEffect*/ } from 'react'

const MajorCollegeAdmin = (props) => {
  // const [selectedCollegeId, setSelectedCollegeId] = useState("");

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
        </div>
      </div>
    </>
  )
}

export default MajorCollegeAdmin