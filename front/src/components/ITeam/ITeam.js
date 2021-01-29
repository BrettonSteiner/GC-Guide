import React, {useState, useContext, useEffect} from 'react';
import { StudentContext } from '../../contexts/StudentContext/StudentContext.js';
import AutoComplete from '../AutoComplete/AutoComplete.js';
import './iTeam.css';
import dummyData from './dummy.json';

const ITeam = (props) => {
  const [myTeam, setMyTeam] = useState('');
  const [myPlace, setMyPlace] = useState('');
  const [myApartNo, setMyApartNo] = useState('');
  const [iTeams, setITeams] = useState(dummyData.iTeams);
  const [data, setData] = useState(dummyData.complexes);

  const {setITeamNumber, ITeamError, setITeamError} = useContext(StudentContext);

  useEffect(() => {
    //Call database for data
    fetch('/iteams/public/')
      .then((response) => response.json())
      .then((data) => {
        setITeams(data.iTeams);
        setData(data.complexes);
      });
  }, []);

  useEffect(() => {
    if (myPlace?.teams?.length === 1) {
      let iTeamNumber = myPlace.teams[0].iTeamNumber;
      setMyTeam(iTeams.find((team) => team?.iTeamNumber === iTeamNumber));
      setITeamNumber(iTeamNumber);
      setITeamError(false);
    } 
  }, [myPlace, iTeams, setITeamError, setITeamNumber]);

  let placeOnChange = (value) => {
    setMyPlace(data.find((place) => place.nameAddress === value));
    setMyApartNo(''); 
    setMyTeam('');
    setITeamNumber('');
    // findMyTeam('');
  }

  let findMyTeam = (apartNo) => {
    if (apartNo !== "-- Choose --") {
      setMyApartNo(apartNo);
      // figure out my I team info.
      let tempTeamNumber = myPlace.teams.find((team) => team.apartments.includes(apartNo)).iTeamNumber; 
      setMyTeam(iTeams.find((team) => team.iTeamNumber === tempTeamNumber));
      setITeamNumber(tempTeamNumber);
      setITeamError(false);
    } else {
      setMyApartNo("");
      setMyTeam("");
      setITeamNumber("");
    }
  };

  return (<>
    <div className="form-group">
      <label htmlFor="addressOrApartmentComplexName">Address or Apartment Complex Name</label>
      <AutoComplete suggestions={data ? data.map((place) => place.nameAddress) : []} onChange={placeOnChange} 
        hasError={(ITeamError && !myPlace)}/>
    </div>
    {myPlace?.teams?.length > 1 ? <div className="form-group">
      <label htmlFor="apartmentNumber">Apartment Number</label>
      <select className={(ITeamError && !myApartNo) ? "form-control error-style" : "form-control"}
        id="apartmentNumber" value={myApartNo}
        onChange={(e) => findMyTeam(e.target.value)}>

          { myPlace ? [ <option key={-1}>-- Choose --</option>, 
              myPlace.teams.map( (team, index) => {
                return team.apartments.map( (apartment) => {
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
      <p><b id="iTeamNumber">{myTeam.iTeamNumber}</b></p>
      <h5>Mentors:</h5>
      <p><b id="mentorName1">{myTeam.mentor1.name}</b><br></br><b id="mentorName2">{myTeam.mentor2.name}</b></p>
      <small id="iTeamHelp" className="form-text text-muted">To protect private information, mentor contact information is given only by BYU-I email or from an I-Rep wearing a blue shirt.</small>
    </div> : null }
  </>);
}

export default ITeam;