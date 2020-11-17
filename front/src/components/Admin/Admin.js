import React, {useState, } from 'react';
import Tabs from '../Tabs/Tabs.js';
import './Admin.css';
import ITeamAdmin from './ITeamAdmin/ITeamAdmin.js';
import MajorCollegeAdmin from './MajorCollegeAdmin/MajorCollegeAdmin.js';
import ScheduleAdmin from './ScheduleAdmin/ScheduleAdmin.js';

const testSemesters = [
  {name: "Winter 2020", activeFlag: false},
  {name: "Spring 2020", activeFlag: false},
  {name: "Fall 2020", activeFlag: true},
  {name: "Winter 2021", activeFlag: false},
]

const Admin = (props) => {
  const [semesters, setSemesters] = useState(testSemesters);
  const [selectedSemesterName, setSelectedSemesterName] = useState(semesters[0]?.name);
  let selectedSemester = semesters.find(sem => sem.name === selectedSemesterName);

  let changeSemester = (e) => {
    setSelectedSemesterName(e.target.value);
  };

  let activateSemester = () => {
    //call backend to update
    setSemesters(currSemesters => {
      return currSemesters.map(sem => {
        if (sem.name === selectedSemesterName)
          return {...sem, activeFlag: true}
        return {...sem, activeFlag: false}
      });
    });
  };

  let deactivateSemester = () => {
    setSemesters(currSemesters => {
      return currSemesters.map(sem => {
        if (sem.name === selectedSemesterName)
          return {...sem, activeFlag: false}
        return {...sem}
      });
    });
  };

  return(
    <>
      <div className="header" id="header">
        <div className="admin-container" >
          <div className="header-logo"></div>
          <h4 className="header-text">Get Connected Guide Admin</h4>
        </div>
      </div>
      <div className="admin-container">
        <div className="semester-div">
          <select className="form-control semester-select" id="semester-select" value={selectedSemester?.name}
            onChange={changeSemester}>
              {semesters.map(semester => {
                return (<option key={semester.name} value={semester.name}>{semester.name}{semester.activeFlag ? " (Active)" : ""}</option>)
              })}
          </select>
          {selectedSemester?.activeFlag
          ? (<input type="button" value="Deactivate Semester" className="btn btn-warning" onClick={deactivateSemester}/>)
          : (<input type="button" value="Set As Active Semester" className="btn btn-info" onClick={activateSemester}/>)}
        </div>
        <Tabs>
          <div label="I-Teams">
            <ITeamAdmin />
          </div>
          <div label="Academic Connections">
            <MajorCollegeAdmin />
          </div>
          <div label="Schedule">
            <ScheduleAdmin />
          </div>
        </Tabs>
      </div>
    </>
  );
}

export default Admin;