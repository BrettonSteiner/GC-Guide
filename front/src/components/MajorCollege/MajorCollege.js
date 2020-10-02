import React/*, {useState, useContext, useEffect}*/ from 'react';
// import { StudentContext } from '../contexts/StudentContext';
import "./MajorCollege.css";

const MajorCollege = (props) => {
  // const {setMajor, setCollege, collegeError, setCollegeError} = useContext(StudentContext);
  // useEffect(() => {
  //   //Call database for data
  // }, [])
  return (<>
  <div className="form-group">
    <label htmlFor="majorName">Major Name</label>
    <input type="text" className="form-control" id="majorName" placeholder="Major Name"></input>
  </div>
  <div className="centered" id="collegeResults">
    <h5>Academic Connections College:</h5>
    <p><b id="collegeName">College of Physical Sciences and Engineering</b></p>
    <p className="color-box"><b id="collegeColor">Orange</b></p>
  </div>
  </>);
}

export default MajorCollege;