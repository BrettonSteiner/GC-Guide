import React, {useState, useCallback} from 'react';
import Tabs from '../Tabs/Tabs.js';
import './Admin.css';
import ITeamAdmin from './ITeamAdmin/ITeamAdmin.js';
import MajorCollegeAdmin from './MajorCollegeAdmin/MajorCollegeAdmin.js';
import ScheduleAdmin from './ScheduleAdmin/ScheduleAdmin.js';
import dummyData from './dummy.json';

const Admin = (props) => {
  const [semesters, setSemesters] = useState(dummyData);
  const [selectedSemesterName, setSelectedSemesterName] = useState(semesters[0]?.name);
  const [deleteSemesterConfirmation, setDeleteSemesterConfirmation] = useState(false);
  const [newSemester, setNewSemester] = useState(null);
  const [newSemesterError, setNewSemesterError] = useState(false);
  let selectedSemester = semesters.find(sem => sem.name === selectedSemesterName);

  let changeSemester = (e) => {
    setSelectedSemesterName(e.target.value);
    setDeleteSemesterConfirmation(false);
  };

  let activateSemester = () => {
    // call backend to update
    setSemesters(currSemesters => {
      return currSemesters.map(sem => {
        if (sem.name === selectedSemesterName)
          return {...sem, activeFlag: true}
        return {...sem, activeFlag: false}
      });
    });
    setDeleteSemesterConfirmation(false);
  };

  let deactivateSemester = () => {
    // call backend to update
    setSemesters(currSemesters => {
      return currSemesters.map(sem => {
        if (sem.name === selectedSemesterName)
          return {...sem, activeFlag: false}
        return {...sem}
      });
    });
    setDeleteSemesterConfirmation(false);
  };

  let deleteSemester = () => {
    // call backend to delete
    setSemesters(currSemesters => {
      var newSemesterList = currSemesters.filter(semester => {
        return semester.name !== selectedSemesterName;
      });
      setSelectedSemesterName(newSemesterList[0]?.name);
      return newSemesterList;
    });
    setDeleteSemesterConfirmation(false);
  };

  const createSemester = useCallback(() => {
    var hasErrors = false;
    if (newSemester === null || newSemester === "") {
      setNewSemesterError(true);
      hasErrors = true;
    }

    if (!hasErrors) {
      // Call server to create semester
      console.log("Create semester.");
      // Should use the result from the server to do this, but for now here is a dummy version.
      var newSemesterObject = {
        "name": newSemester,
        "activeFlag": false,
        "iTeams": [],
        "colleges": [],
        "events": []
      }
      setSemesters(currSemesters => {
        currSemesters.unshift(newSemesterObject);
        return currSemesters;
      });
      setNewSemester(null);
      setSelectedSemesterName(semesters[0]?.name);
      setDeleteSemesterConfirmation(false);
    }
  }, [newSemester, semesters]);

  return(
    <>
      <div className="header" id="header">
        <div className="admin-container" >
          <div className="header-logo"></div>
          <h4 className="header-text">Get Connected Guide Admin</h4>
        </div>
      </div>
      <div className="admin-subheader" id="subheader">
        <div className="semester-div">
          <select
            className="form-control semester-select"
            id="semester-select"
            value={selectedSemester?.name}
            onChange={changeSemester}>
              {semesters.map(semester => {
                return (<option key={semester.name} value={semester.name}>{semester.name}{semester.activeFlag ? " (Active)" : ""}</option>)
              })}
          </select>
          {selectedSemester?.activeFlag
          ? <input type="button" value="Deactivate Semester" className="btn btn-warning admin-btn" onClick={deactivateSemester}/>
          : <input type="button" value="Set As Active Semester" className="btn btn-info admin-btn" onClick={activateSemester}/>}
          {deleteSemesterConfirmation === false
          ? <input type="button" value="Delete Semester" className="btn btn-danger admin-btn" onClick={() => setDeleteSemesterConfirmation(true)}/>
          : <input type="button" value="Are You Sure You Want To Delete This Semester?" className="btn btn-danger admin-btn" onClick={deleteSemester}/>
          }
          <div className="d-flex justify-content-end" style={{width: "100%"}}>
            {newSemester === null
            ? <input type="button" value="Create New Semester" className="btn btn-info admin-btn flex-row-reverse" onClick={() => {setNewSemester(""); setDeleteSemesterConfirmation(false);}}/>
            : <div className="input-group semester-select admin-btn">
                <input
                  type="text"
                  className={newSemesterError ? "form-control is-invalid" : "form-control"}
                  placeholder="Create new semester"
                  onChange={e => {
                    setNewSemester(e.target.value);
                    if (newSemesterError) {
                      setNewSemesterError(false);
                    }
                  }}>
                </input>
                <div className="input-group-append">
                  <button 
                    className="btn btn-outline-secondary align-middle"
                    type="button"
                    onClick={() => {
                      createSemester();
                    }}>
                    <i className="fas fa-plus"></i>
                  </button>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
      <div className="admin-container">
        <Tabs>
          <div label="I-Teams" recordCount={selectedSemester.iTeams?.length}>
            <ITeamAdmin iTeams={selectedSemester.iTeams}/>
          </div>
          <div label="Academic Connections" recordCount={selectedSemester.colleges?.length}>
            <MajorCollegeAdmin colleges={selectedSemester.colleges}/>
          </div>
          <div label="Schedule" recordCount={selectedSemester.events?.length}>
            <ScheduleAdmin events={selectedSemester.events}/>
          </div>
        </Tabs>
      </div>
    </>
  );
}

export default Admin;