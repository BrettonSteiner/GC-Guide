import React/*, {useState, useContext, useEffect}*/ from 'react';
// import { StudentContext } from '../contexts/StudentContext';

const MajorCollege = (props) => {
  // const {setMajor, setCollege, collegeError, setCollegeError} = useContext(StudentContext);
  // useEffect(() => {
  //   //Call database for data
  // }, [])
  return (<>
  <div class="card">
    <button class="btn btn-light btn-block text-left card-header" id="headingTwo" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
      <h5 class="mb-0">
        My Academic Connections College
      </h5>
    </button>
    <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
      <div class="card-body">
        <form>
          <div class="form-group">
            <label for="majorName">Major Name</label>
            <input type="text" class="form-control" id="majorName" placeholder="Major Name"></input>
          </div>
        </form>
      </div>
    </div>
  </div>
  </>);
}

export default MajorCollege;