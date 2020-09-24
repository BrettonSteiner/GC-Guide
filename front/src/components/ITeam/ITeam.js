import React/*, {useState, useContext, useEffect}*/ from 'react';
// import { StudentContext } from '../contexts/StudentContext';

const ITeam = (props) => {
  // const {setITeamNumber, ITeamError, setITeamError} = useContext(StudentContext);
  // useEffect(() => {
  //   //Call database for data
  // }, [])
  return (<>
  <div className="card">
    <button class="btn btn-light btn-block text-left card-header" id="headingOne" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
      <h5 class="mb-0">
        My I-Team
      </h5>
    </button>
    <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
      <div class="card-body">
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
      </div>
    </div>
  </div>
  </>);
}

export default ITeam;