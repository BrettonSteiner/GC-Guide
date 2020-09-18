import React, {useState, useContext} from 'react';
import { StudentContext, useEffect } from '../contexts/StudentContext';

const ITeam = (props) => {
  const {setITeamNumber, ITeamError, setITeamError} = useContext(StudentContext);
  useEffect(() => {
    //Call database for data
  }, [])
  return (<></>);
}

export default ITeam;