import React/*, {useState, useContext, useEffect}*/ from 'react';
// import { StudentContext } from '../contexts/StudentContext';

const MajorCollege = (props) => {
  // const {setMajor, setCollege, collegeError, setCollegeError} = useContext(StudentContext);
  // useEffect(() => {
  //   //Call database for data
  // }, [])
  return (<>
  <form>
    <div class="form-group">
      <label for="majorName">Major Name</label>
      <input type="text" class="form-control" id="majorName" placeholder="Major Name"></input>
    </div>
  </form>
  </>);
}

export default MajorCollege;