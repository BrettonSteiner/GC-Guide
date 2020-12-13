import React, { /*useState, useEffect*/ } from 'react';
import ApartmentExpand from './ApartmentExpand.js';

const ComplexExpand = (props) => {
  // const [selectedITeamExpandId, setSelectedITeamExpandId] = useState("");

  return (
    <>
    <div id="complexAccordion">
      <div className="card">
        <div className="btn-group" role="group">
          <button className="btn btn-light btn-block text-left card-header" id="complexHeadingOne" type="button" data-toggle="collapse" data-target="#complexOne" aria-expanded="true" aria-controls="complexOne">
            <h5 className="mb-0">
              Complex 1 <i className="card-header-icon fas fa-chevron-down fa-vc"></i>
            </h5>
          </button>
          <button className="btn btn-outline-secondary float-right" type="button"><i className="fas fa-trash"></i></button>
        </div>
        <div id="complexOne" className="collapse show" aria-labelledby="complexHeadingOne" data-parent="#complexAccordion">
          <div className="card-body">
            <ApartmentExpand></ApartmentExpand>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="btn-group" role="group">
          <button className="btn btn-light btn-block text-left card-header" id="complexHeadingTwo" type="button" data-toggle="collapse" data-target="#complexTwo" aria-expanded="false" aria-controls="complexTwo">
            <h5 className="mb-0">
              Complex 2 <i className="card-header-icon fas fa-chevron-down fa-vc"></i>
            </h5>
          </button>
          <button className="btn btn-outline-secondary float-right" type="button"><i className="fas fa-trash"></i></button>
        </div>
        <div id="complexTwo" className="collapse" aria-labelledby="complexHeadingTwo" data-parent="#complexAccordion">
          <div className="card-body">
            <ApartmentExpand></ApartmentExpand>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default ComplexExpand