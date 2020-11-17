import React, { /*useState, useEffect*/ } from 'react'

const ITeamAdmin = (props) => {
  // const [selectedITeamId, setSelectedITeamId] = useState("");

  return (
    <>
    <div className="card">
        <div className="card-header d-flex justify-content-between">
          <h5 className="align-middle">I-Teams</h5>
          <div className="d-flex flex-row-reverse">
            <input type="button" value="Import Data From File" className="btn btn-info admin-btn "/>
            <input type="button" value="Add I-Team" className="btn btn-info admin-btn "/>
          </div>
        </div>
        <div className="card-body">
          {/* ADD ADMIN STUFF HERE */}
          <p>There are {props.iteams.length} I-Teams in this semester</p>
        </div>
      </div>
    </>
  )
}

export default ITeamAdmin