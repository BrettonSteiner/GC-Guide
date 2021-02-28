import React, {useState, useEffect, useContext, useCallback} from 'react';
import { StudentContext } from '../../contexts/StudentContext/StudentContext.js';

const Email = (props) => {
  const [email, setEmail] = useState("");
  const [semester, setSemester] = useState();
  const [includeITeam, setIncludeITeam] = useState(false);
  const [includeAcInfo, setIncludeAcInfo] = useState(false);
  const [includeSchedule, setIncludeSchedule] = useState(true);
  const [emailInProcess, setEmailInProcess] = useState(false);
  const [emailResult, setEmailResult] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [errorsExist, setErrorsExist] = useState(false);
  const [emailResultError, setEmailResultError] = useState(false);

  const {iTeam, major, college, iTeamError, setITeamError, collegeError, setCollegeError} = useContext(StudentContext);

  useEffect(() => {
    //Call database for data
    fetch('/semesters/active')
      .then((response) => response.json())
      .then((data) => {
        setSemester(data);
      });
  }, []);

  const checkForErrors = useCallback(() => {
    let hasErrors = false;

    if (includeITeam && !iTeam) {
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
  }, [includeITeam, iTeam, includeAcInfo, major, college, email, setCollegeError, setITeamError]);

  const sendEmail = () => {
    let hasErrors = checkForErrors();
    if (!hasErrors) {
      setEmailInProcess(true);
      var json = {
        semesterId: semester._id,
        iTeamId: iTeam._id,
        collegeId: college._id,
        includeITeam: includeITeam,
        includeAcademicConnections: includeAcInfo,
        includeSchedule: includeSchedule,
        emailAddress: email
      };
      
      fetch('/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(json),
      })
      .then((response) => {
        setEmailInProcess(false);
        if (!response.ok) {
          setEmailResult("HTTP status " + response.status);
          setEmailResultError(true);
          return null;
        }

        return response.json();
      })
      .then((data) => {
        if (data !== null) {
          setEmailResult(data.message);
          setEmailResultError(false);
        }
      });
    }
  }

  return (<>
  <div className="form-group">
    <label htmlFor="byuiEmail">BYU-I Email Address</label>
    <input type="email" className="form-control" id="byuiEmail" aria-describedby="emailHelp" placeholder="BYU-I Email Address" value={email} onChange={(e) => {setEmail(e.target.value); setEmailError(false); setErrorsExist(false);}}/>
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
  <button type="button" className="btn btn-primary" disabled={(!includeITeam && !includeAcInfo && !includeSchedule) || emailInProcess} onClick={sendEmail}>
    {emailInProcess ?
    <><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Sending email...</>
    : <>Send Email</>
    }
  </button>
  <div id="emailResult">
    <br></br>
    {errorsExist || emailResultError ? (<>
      <div className="alert alert-danger">
        {`Error: `} 
        {emailError ? ` Invalid email address. Must be '...@byui.edu'.` : null}
        {iTeamError ? ` Missing I-Team Information.` : null}
        {collegeError ? ` Missing Academic Connections information.` : null}
        {emailResultError ? emailResult : null}
      <button type="button" className="close" aria-label="Close" onClick={() => { setErrorsExist(false); setEmailResultError(false); }}>
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    </>) : null}
    {emailResult !== "" && !emailResultError ?
    <div className="alert alert-success">
      {emailResult}
      <button type="button" className="close" aria-label="Close" onClick={() => setEmailResult("")}>
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    : null}
  </div>
  </>);
}

export default Email;