import React, { /*useState, useEffect*/ } from 'react';
import ComplexExpand from './ComplexExpand.js';

const ITeamExpand = (props) => {
  // const [selectedITeamExpandId, setSelectedITeamExpandId] = useState("");

  return (
    <>
    <form>
      <div className="row">
        <div className="col-4">
          <div className="form-group">
            <label htmlFor="iTeamNumber">I-Team Number</label>
            <input type="text" className="form-control" id="iTeamNumber" placeholder="I-Team Number"></input>
          </div>
          <div className="form-group">
            <label htmlFor="mentor1Name">Mentor 1 Name</label>
            <input type="text" className="form-control" id="mentor1Name" placeholder="Mentor 1 Name"></input>
          </div>
          <div className="form-group">
            <label htmlFor="mentor1Phone">Mentor 1 Phone Number</label>
            <input type="text" className="form-control" id="mentor1Phone" placeholder="Mentor 1 Phone Number"></input>
          </div>
          <div className="form-group">
            <label htmlFor="mentor2Name">Mentor 2 Name</label>
            <input type="text" className="form-control" id="mentor2Name" placeholder="Mentor 2 Name"></input>
          </div>
          <div className="form-group">
            <label htmlFor="mentor2Phone">Mentor 2 Phone Number</label>
            <input type="text" className="form-control" id="mentor2Phone" placeholder="Mentor 2 Phone Number"></input>
          </div>
        </div>
        <div className="col-8">
          <div className="form-group">
            <label htmlFor="complexAddress">Address / Complex Name</label>
            <div className="input-group">
              <input type="text" className="form-control" id="complexAddress" placeholder="Address"></input>
              <input type="text" className="form-control" id="complexName" placeholder="Complex Name"></input>
              <div className="input-group-append">
                <button className="btn btn-outline-secondary align-middle" type="button"><i className="fas fa-plus"></i></button>
              </div>
            </div>
          </div>
          <div className="form-group">
            <ComplexExpand></ComplexExpand>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <button type="button" className="btn btn-primary">Save/Update</button>
          <button type="button" className="btn btn-danger float-right">Delete</button>
        </div>
      </div>
    </form>
    </>
  )
}

export default ITeamExpand