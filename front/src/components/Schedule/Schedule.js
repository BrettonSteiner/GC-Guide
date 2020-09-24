import React/*, {useState, useEffect}*/ from 'react';

const Schedule = (props) => {
  // useEffect(() => {
  //   //Call database for data
  // }, [])
  return (<>
  <div class="card">
    <button class="btn btn-light btn-block text-left card-header" id="headingThree" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="true" aria-controls="collapseThree">
      <h5 class="mb-0">
        Get Connected Schedule
      </h5>
    </button>
    <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
      <div class="card-body">
        Schedule content
      </div>
    </div>
  </div>
  </>);
}

export default Schedule;