import React, {useState,/*useContext*/} from 'react';
// import { StudentContext } from '../contexts/StudentContext';

const Email = (props) => {
  // const {ITeamNumber, major, college, setITeamError, setCollegeError} = useContext(StudentContext);
  const [includeSchedule, setIncludeSchedule] = useState(true);
  return (<>
  <div className="form-group">
    <label htmlFor="byuiEmail">BYU-I Email Address</label>
    <input type="email" className="form-control" id="byuiEmail" aria-describedby="emailHelp" placeholder="BYU-I Email Address"></input>
    <small id="emailHelp" className="form-text text-muted">This will not subscribe you to anything. It is a one-time email only.</small>
  </div>
  <div className="form-check">
    <input className="form-check-input" type="checkbox" value="" id="iTeamCheck"></input>
    <label className="form-check-label" htmlFor="iTeamCheck">
      Include I-Team information
    </label>
  </div>
  <div className="form-check">
    <input className="form-check-input" type="checkbox" value="" id="collegeCheck"></input>
    <label className="form-check-label" htmlFor="collegeCheck">
      Include Academic Connections information
    </label>
  </div>
  <div className="form-group form-check">
    <input className="form-check-input" type="checkbox" checked={includeSchedule} id="scheduleCheck" onClick={(value) => setIncludeSchedule(value)}></input>
    <label className="form-check-label" htmlFor="scheduleCheck">
      Include Get Connected schedule
    </label>
  </div>
  <button type="button" className="btn btn-primary">Send Email</button>
  <div id="emailResult">
    <br></br>
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