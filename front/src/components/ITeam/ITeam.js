import React/*, {useState, useContext, useEffect}*/ from 'react';
// import { StudentContext } from '../contexts/StudentContext';

const ITeam = (props) => {
  // const {setITeamNumber, ITeamError, setITeamError} = useContext(StudentContext);
  // useEffect(() => {
  //   //Call database for data
  // }, [])
  return (<>
  <div class="form-group">
    <label for="byuaddressOrApartmentComplexNameiEmail">Address or Apartment Complex Name</label>
    <input type="text" class="form-control" id="addressOrApartmentComplexName" placeholder="Address or Apartment Complex Name"></input>
  </div>
  <div class="form-group">
    <label for="apartmentNumber">Apartment Number</label>
    <input type="text" class="form-control" id="apartmentNumber" placeholder="Apartment Number"></input>
  </div>
  <div class="centered" id="iTeamResults">
    <h5>I-Team:</h5>
    <p><b id="iTeamNumber">89</b></p>
    <h5>Mentors:</h5>
    <p><b id="mentorName1">Brandon Sanders</b><br></br><b id="mentorName2">Melissa Frank</b></p>
    <small id="iTeamHelp" class="form-text text-muted">To protect private information, mentor contact information is given only by BYU-I email or from an I-Rep wearing a blue shirt.</small>
  </div>
  </>);
}

export default ITeam;