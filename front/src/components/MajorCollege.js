import React, {useState, useContext, useEffect} from 'react';
import { StudentContext } from '../contexts/StudentContext';

const MajorCollege = (props) => {
  const {setMajor, setCollege, collegeError, setCollegeError} = useContext(StudentContext);
  useEffect(() => {
    //Call database for data
  }, [])
  return (<></>);
}

export default MajorCollege;