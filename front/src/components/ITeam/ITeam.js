import React, {useState, useContext, useEffect} from 'react';
import { StudentContext } from '../../contexts/StudentContext/StudentContext.js';
import AutoComplete from '../AutoComplete/AutoComplete.js';
import './iTeam.css';
import dummyData from './dummy.json';

const ITeam = (props) => {
  const [myTeam, setMyTeam] = useState('');
  const [myPlace, setMyPlace] = useState('');
  const [myApartNo, setMyApartNo] = useState('');
  const [iTeams, setITeams] = useState([]);
  const [data, setData] = useState([]);

  const {setITeamNumber, ITeamError, setITeamError} = useContext(StudentContext);

  useEffect(() => {
    //Call database for data
    setITeams(dummyData.dummyIteams);
    setData(dummyData.dummyModel1);
  }, []);

  useEffect(() => {
    if (myPlace?.teams?.length === 1) {
      let iTeamNumber = myPlace.teams[0].iTeamNumber;
      setMyTeam(iTeams.find((team) => team?.number === iTeamNumber));
      setITeamNumber(iTeamNumber);
      setITeamError(false);
    }
  }, [myPlace, iTeams, setITeamError, setITeamNumber]);

  let placeOnChange = (value) => {
    setMyPlace(data.find((place) => place.nameAddress === value));
    setMyApartNo(''); 
    setMyTeam('');
    // findMyTeam('');
  }

  let findMyTeam = (apartNo) => {
    setMyApartNo(apartNo);
    // figure out my I team info.
    let tempTeamNumber = myPlace.teams.find((team) => team.apartmentNos.includes(apartNo)).iTeamNumber; 
    setMyTeam(iTeams.find((team) => team.number === tempTeamNumber));
    setITeamNumber(tempTeamNumber);
    setITeamError(false);
  };

  return (<>
    <div className="form-group">
      <label htmlFor="byuaddressOrApartmentComplexNameiEmail">Address or Apartment Complex Name</label>
      <AutoComplete suggestions={data.map((place) => place.nameAddress)} onChange={placeOnChange} 
        hasError={(ITeamError && !myPlace)}/>
    </div>
    {myPlace?.teams?.length > 1 ? <div className="form-group">
      <label htmlFor="apartmentNumber">Apartment Number</label>
      <select className={(ITeamError && !myApartNo) ? "form-control error-style" : "form-control"}
        id="apartmentNumber" value={myApartNo}
        onChange={(e) => findMyTeam(e.target.value)}>

          { myPlace ? [ <option key={-1}>-- Choose --</option>, 
              myPlace.teams.map( (team, index) => {
                return team.apartmentNos.map( (apartment) => {
                  return (
                    <option key={apartment+index} value={apartment}>{apartment}</option>
                  )
                })
              }) ] : null
          }

      </select>
    </div> : null} 
    { myTeam ? 
    <div className="centered" id="iTeamResults">
      <h5>I-Team:</h5>
      <p><b id="iTeamNumber">{myTeam.number}</b></p>
      <h5>Mentors:</h5>
      <p><b id="mentorName1">{myTeam.maleName}</b><br></br><b id="mentorName2">{myTeam.femaleName}</b></p>
      <small id="iTeamHelp" className="form-text text-muted">To protect private information, mentor contact information is given only by BYU-I email or from an I-Rep wearing a blue shirt.</small>
    </div> : null }
  </>);
}

export default ITeam;