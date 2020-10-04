import React, {useState, useContext, useEffect} from 'react';
import { StudentContext } from '../../contexts/StudentContext/StudentContext.js';
import data from './dummy.json';

const ITeam = (props) => {
  const [myTeam, setMyTeam] = useState(null);
  const [myPlace, setMyPlace] = useState(null);
  const [myApartNo, setMyApartNo] = useState(null);
  const [iTeams, setITeams] = useState([]);
  const [places, setPlaces] = useState([]);

  const {setITeamNumber, ITeamError, setITeamError} = useContext(StudentContext);

  useEffect(() => {
    //Call database for data
    setITeams(data.dummyIteams);
    setPlaces(data.dummyModel1);
  }, []);

  let findMyTeam = (apartNo) => {
    setMyApartNo(apartNo);
    // determine team from location data
    setMyTeam(iTeams[0]);
    setITeamNumber(iTeams[0].number);
    setITeamError(false);
  };

  return (<>
    <div className="form-group">
      <label htmlFor="byuaddressOrApartmentComplexNameiEmail">Address or Apartment Complex Name</label>
      {/* Change from select to input to use autocomplete with 'places' */}
      <select type="text" className={!ITeamError ? "form-control" : "form-control error-style"} 
        id="addressOrApartmentComplexName" 
        placeholder="Address or Apartment Complex Name"
        value={myPlace} onChange={(e) => setMyPlace(e.target.value)}
        onBlur={(e) => setMyPlace(e.target.value)} > 
        {places.map((place) => {
          return (
          <option key={place.nameAddress} value={place.nameAddress} >{place.nameAddress}</option>
          )
        })}
        </select>
    </div>
    <div className="form-group">
      <label htmlFor="apartmentNumber">Apartment Number</label>
      {/* Change input to a select with options based on 'myPlace' */}
      <input type="text" className="form-control" 
        id="apartmentNumber" placeholder="Apartment Number" 
        value={myApartNo} onChange={(e) => findMyTeam(e.target.value)}/>
    </div>
    { myTeam ? 
    <div className="centered" id="iTeamResults">
      <h5>I-Team:</h5>
      <p><b id="iTeamNumber">{myTeam.number}</b></p>
      <h5>Mentors:</h5>
      <p><b id="mentorName1">Brandon Sanders</b><br></br><b id="mentorName2">Melissa Frank</b></p>
      <small id="iTeamHelp" className="form-text text-muted">To protect private information, mentor contact information is given only by BYU-I email or from an I-Rep wearing a blue shirt.</small>
    </div> : null }
  </>);
}

export default ITeam;