import React/*, {useState, useContext, useEffect}*/ from 'react';
// import { StudentContext } from '../contexts/StudentContext';

const ITeam = (props) => {
  // const {setITeamNumber, ITeamError, setITeamError} = useContext(StudentContext);
  // useEffect(() => {
  //   //Call database for data
  // }, [])
  return (<>
  <form>
    <div class="form-group">
      <label for="byuaddressOrApartmentComplexNameiEmail">Address or Apartment Complex Name</label>
      <input type="text" class="form-control" id="addressOrApartmentComplexName" placeholder="Address or Apartment Complex Name"></input>
    </div>
    <div class="form-group">
      <label for="apartmentNumber">Apartment Number</label>
      <input type="text" class="form-control" id="apartmentNumber" placeholder="Apartment Number"></input>
    </div>
  </form>
  </>);
}

export default ITeam;