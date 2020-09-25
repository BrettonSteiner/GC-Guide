import React/*, {useState, useContext, useEffect}*/ from 'react';
// import { StudentContext } from '../contexts/StudentContext';

const MajorCollege = (props) => {
  // const {setMajor, setCollege, collegeError, setCollegeError} = useContext(StudentContext);
  // useEffect(() => {
  //   //Call database for data
  // }, [])
  return (<>
  <div class="form-group">
    <label for="majorName">Major Name</label>
    <input type="text" class="form-control" id="majorName" placeholder="Major Name"></input>
  </div>
  <div class="centered" id="collegeResults">
    <h5>Academic Connections College:</h5>
    <p><b id="collegeName">College of Physical Sciences and Engineering</b></p>
    <p class="color-box"><b id="collegeColor">Orange</b></p>
  </div>
  </>);
}

export default MajorCollege;