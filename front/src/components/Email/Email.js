import React/*, {useState, useContext}*/ from 'react';
// import { StudentContext } from '../contexts/StudentContext';

const Email = (props) => {
  // const {ITeamNumber, major, college, setITeamError, setCollegeError} = useContext(StudentContext);
  return (<>
  <div class="form-group">
    <label for="byuiEmail">BYU-I Email Address</label>
    <input type="email" class="form-control" id="byuiEmail" aria-describedby="emailHelp" placeholder="BYU-I Email Address"></input>
    <small id="emailHelp" class="form-text text-muted">This will not subscribe you to anything. It is a one-time email only.</small>
  </div>
  <div class="form-check">
    <input class="form-check-input" type="checkbox" value="" id="iTeamCheck"></input>
    <label class="form-check-label" for="iTeamCheck">
      Include I-Team information
    </label>
  </div>
  <div class="form-check">
    <input class="form-check-input" type="checkbox" value="" id="collegeCheck"></input>
    <label class="form-check-label" for="collegeCheck">
      Include College information
    </label>
  </div>
  <div class="form-group form-check">
    <input class="form-check-input" type="checkbox" value="" id="scheduleCheck" checked></input>
    <label class="form-check-label" for="scheduleCheck">
      Include Get Connected schedule
    </label>
  </div>
  <button type="button" class="btn btn-primary">Send Email</button>
  </>);
}

export default Email;