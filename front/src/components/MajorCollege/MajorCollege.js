import React, { useState, useEffect, useContext } from 'react';
import { StudentContext } from '../../contexts/StudentContext/StudentContext.js';
import "./MajorCollege.css";
import dummyData from './collegeDummyData.json'
import AutoComplete from '../AutoComplete/AutoComplete';

const MajorCollege = (props) => {
  const {major, setMajor, college, setCollege, collegeError, setCollegeError} = useContext(StudentContext);
  // TODO: Once we get to a point where we always need the back-end running, remove the dummyData back-up.
  const [collegeData, setCollegeData] = useState(dummyData.colleges);
  const [allMajors, setAllMajors] = useState([]);

  useEffect(() => {
    //Call database for data
    fetch('/colleges/')
      .then((response) => response.json())
      .then((data) => {
        let majorList = [];
        setCollegeData(data?.colleges);

        data.colleges.forEach((col) => {
          col.majors.forEach((maj) => {
            majorList.push(maj);
          })
        });

        setAllMajors(majorList);
      });
  }, []);

  const changeMajor = (newMajor) => {
    setMajor(newMajor);
    setCollege(collegeData.find((col) => col.majors.includes(newMajor)));
    setCollegeError(false);

  };

  return (<>
  <div className="form-group">
    <label htmlFor="majorName">Major Name</label>
    <AutoComplete suggestions={allMajors} onChange={changeMajor} hasError={collegeError && (!college || !major)}/>
  </div>
  { major && college ? 
  <div className="centered" id="collegeResults">
    <h5>Academic Connections College:</h5>
    <p><b id="collegeName">{college.name}</b></p>
    <p className={college.flagColor + '-box'}><b id="collegeColor">{college.flagColor}</b></p>
  </div> : null }
  </>);
}

export default MajorCollege;