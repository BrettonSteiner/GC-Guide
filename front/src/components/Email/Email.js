import React, {useState, useContext, useCallback} from 'react';
import { StudentContext } from '../../contexts/StudentContext/StudentContext.js';

const Email = (props) => {
  const [email, setEmail] = useState("");
  const [includeITeam, setIncludeITeam] = useState(false);
  const [includeAcInfo, setIncludeAcInfo] = useState(false);
  const [includeSchedule, setIncludeSchedule] = useState(true);
  const [emailError, setEmailError] = useState(false);
  const [errorsExist, setErrorsExist] = useState(false);

  const {ITeamNumber, major, college, ITeamError, setITeamError, collegeError, setCollegeError} = useContext(StudentContext);

  const checkForErrors = useCallback(() => {
    let hasErrors = false;

    if (includeITeam && !ITeamNumber) {
      setITeamError(true);
      hasErrors = true;
    }

    if (includeAcInfo && (!major || !college)) {
      setCollegeError(true);
      hasErrors = true;
    }

    if (!email || !email.includes("@byui.edu")) {
      setEmailError(true);
      hasErrors = true;
    } 

    setErrorsExist(hasErrors);

    return hasErrors;
  }, [includeITeam, ITeamNumber, includeAcInfo, major, college, email, setCollegeError, setITeamError]);

  const sendEmail = () => {
    let hasErrors = checkForErrors();
    if (!hasErrors) {
      //send email
    }
  }

  return (<>
  <div className="form-group">
    <label htmlFor="byuiEmail">BYU-I Email Address</label>
    <input type="email" className="form-control" id="byuiEmail" aria-describedby="emailHelp" placeholder="BYU-I Email Address" value={email} onChange={(e) => {setEmail(e.target.value); setEmailError(false);}}/>
    <small id="emailHelp" className="form-text text-muted">This will not subscribe you to anything. It is a one-time email only.</small>
  </div>
  <div className="form-check">
    <input className="form-check-input" type="checkbox" value={includeITeam} id="iTeamCheck" onChange={(e) => {setIncludeITeam(e.target.checked); setITeamError(false);}}></input>
    <label className="form-check-label" htmlFor="iTeamCheck">
      Include I-Team information
    </label>
  </div>
  <div className="form-check">
    <input className="form-check-input" type="checkbox" value={includeAcInfo} id="collegeCheck" onChange={(e) => {setIncludeAcInfo(e.target.checked); setCollegeError(false);}}></input>
    <label className="form-check-label" htmlFor="collegeCheck">
      Include Academic Connections information
    </label>
  </div>
  <div className="form-group form-check">
    <input className="form-check-input" type="checkbox" value={includeSchedule} id="scheduleCheck" onChange={(event) => setIncludeSchedule(event.target.checked)} defaultChecked></input>
    <label className="form-check-label" htmlFor="scheduleCheck">
      Include Get Connected schedule
    </label>
  </div>
  <button type="button" className="btn btn-primary" onClick={sendEmail}>Send Email</button>
  <div id="emailResult">
    <br></br>
    {errorsExist ? (<>
      <div className="alert alert-danger">
        {`Error: `} 
        {emailError ? ` Invalid email address. Must be '...@byui.edu'.` : null}
        {ITeamError ? ` Missing I-Team Information.` : null}
        {collegeError ? ` Missing Academic Connections information.` : null}
      <button type="button" className="close" aria-label="Close" onClick={() => setErrorsExist(false)}>
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    </>) : null}
    <div className="alert alert-success" role="alert">
      Email sent.
      <button type="button" className="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </div>
  </>);
}

export default Email;