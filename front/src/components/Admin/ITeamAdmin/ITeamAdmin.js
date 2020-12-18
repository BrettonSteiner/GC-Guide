import React, { /*useState, useEffect*/ } from 'react';
import ITeamExpand from '../ITeamExpand/ITeamExpand.js';

const ITeamAdmin = (props) => {
  // const [selectedITeamId, setSelectedITeamId] = useState("");
  const dummyExpandData = {
    "iTeamNumber": 1,
    "mentor1": {
      "name": "Simba",
      "phone": "208-555-1234"
    },
    "mentor2": {
      "name": "Nala",
      "phone": "208-555-5678"
    },
    "complexes": [{
      "name": "Pride Rock",
      "address": "Sunrise, Africa",
      "apartments": [
        "101",
        "102",
        "103",
        "104",
        "105"
      ]
    },
    {
      "name": "Pride Lands",
      "address": "Sunrise, Africa",
      "apartments": [
        "2101",
        "2102",
        "2103",
        "2104",
        "2105"
      ]
    }]
  }

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
          <ITeamExpand
            iTeamNumber={dummyExpandData.iTeamNumber}
            mentor1={dummyExpandData.mentor1}
            mentor2={dummyExpandData.mentor2}
            complexes={dummyExpandData.complexes}
          />
        </div>
      </div>
    </>
  )
}

export default ITeamAdmin