import React, { useState, useEffect }/*, {useState, useContext, useEffect}*/ from 'react';
// import { StudentContext } from '../contexts/StudentContext';
import "./MajorCollege.css";
import dummyData from './collegeDummyData.json'

const MajorCollege = (props) => {
  // const {setMajor, setCollege, collegeError, setCollegeError} = useContext(StudentContext);
  // TODO: Once we get to a point where we always need the back-end running, remove the dummyData back-up.
  const [collegeData, setCollegeData] = useState(dummyData.colleges);

  useEffect(() => {
    //Call database for data
    fetch('/colleges/')
      .then((response) => response.json())
      .then((data) => setCollegeData(data?.colleges));
  }, [])

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