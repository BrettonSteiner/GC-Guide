import React, {useState, useEffect, useCallback} from 'react';
import Tabs from '../Tabs/Tabs.js';
import './Admin.css';
import ITeamAdmin from './ITeamAdmin/ITeamAdmin.js';
import MajorCollegeAdmin from './MajorCollegeAdmin/MajorCollegeAdmin.js';
import ScheduleAdmin from './ScheduleAdmin/ScheduleAdmin.js';

const Admin = (props) => {
  const [semesters, setSemesters] = useState([]);
  const [selectedSemesterName, setSelectedSemesterName] = useState(null);
  const [deleteSemesterConfirmation, setDeleteSemesterConfirmation] = useState(false);
  const [newSemester, setNewSemester] = useState(null);
  const [newSemesterError, setNewSemesterError] = useState(false);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [username, setUsername] = useState(null);
  const [rerenderState, setRerenderState] = useState(false);

  useEffect(() => {
    fetch('/accounts/current')
    .then((response) => response.json())
    .then((data) => {
      setUsername(data.username);
    });
  }, [])

  useEffect(() => {
    //Call database for data
    fetch('/semesters/all/')
    .then((response) => response.json())
    .then((data) => {
      setSemesters(data.semesters);
      setSelectedSemesterName(data.semesters[0]?.name? data.semesters[0].name : null);
    });
  }, []);

  useEffect(() => {
    if (semesters.length > 0 && selectedSemesterName) {
      const semesterId = semesters.find(sem => sem.name === selectedSemesterName)._id;
      fetch('/semesters', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({'semesterId': semesterId}),
      })
      .then((response) => response.json())
      .then((data) => {
        setSelectedSemester(data);
      });
    }
    else {
      setSelectedSemester(null);
      if (rerenderState) {
        setRerenderState(!rerenderState);
      }
    }
  }, [selectedSemesterName, semesters, rerenderState]);

  let changeSemester = (e) => {
    setSelectedSemesterName(e.target.value);
    setDeleteSemesterConfirmation(false);
  };

  let rerenderSemester = () => {
    setRerenderState(!rerenderState);
  }

  let updateSemesterFlag = (flagValue) => {
    const semesterId = semesters.find(sem => sem.name === selectedSemesterName)._id;
    fetch('/semesters/updateActiveFlag', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({'semesterId': semesterId, "activeFlag": flagValue}),
    })
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      rerenderSemester();
      return data;
    });
  };

  let activateSemester = () => {
    // call backend to update
    updateSemesterFlag(true);
    // console.log("isSuccessful:", isSuccessful);
    setSemesters(currSemesters => {
      return currSemesters.map(sem => {
        if (sem.name === selectedSemesterName)
          return {...sem, activeFlag: true}
        return {...sem, activeFlag: false}
      });
    });
    setDeleteSemesterConfirmation(false);
    setNewSemester(null);
  };

  let deactivateSemester = () => {
    // call backend to update
    updateSemesterFlag(false);
    // console.log("isSuccessful:", isSuccessful);
    setSemesters(currSemesters => {
      return currSemesters.map(sem => {
        if (sem.name === selectedSemesterName)
          return {...sem, activeFlag: false}
        return {...sem}
      });
    });
    setDeleteSemesterConfirmation(false);
    setNewSemester(null);
  };

  let deleteSemester = () => {
    // call backend to delete
    // console.log("Delete semester.");
    fetch('/semesters/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({semesterId: selectedSemester?._id? selectedSemester._id : null}),
    })
    .then(() => {
      setSemesters(currSemesters => {
        var newSemesterList = currSemesters.filter(semester => {
          return semester.name !== selectedSemesterName;
        });
        setSelectedSemesterName(newSemesterList[0]?.name);
        return newSemesterList;
      });
      setDeleteSemesterConfirmation(false);
    });
  };

  let createSemester = () => {
    var hasErrors = false;
    if (newSemester === null || newSemester === "") {
      setNewSemesterError(true);
      hasErrors = true;
    }

    if (!hasErrors) {
      // Call server to create semester
      fetch('/semesters/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({name: newSemester}),
      })
      .then((response) => response.json())
      .then((data) => {
        fetch('/semesters/all/')
        .then((response) => response.json())
        .then((data) => {
          setSemesters(data.semesters);
          setSelectedSemesterName(newSemester);
          setNewSemester(null);
          setDeleteSemesterConfirmation(false);
        });
      });
    }
  };

  const redirect = useCallback(() => {
    props.history.push("/login");
  }, [props]);

  const logout = useCallback(() => {
    // Call server to logout of your account
    fetch('/accounts/logout')
    .then((response) => {
      if (response.redirected) {
        redirect();
      }
    });
  }, [redirect])

  return(
    <>
      <div className="header" id="header">
        <div className="admin-container">
          <div className="header-logo"></div>
          <div className="d-flex">
            <div className="mr-auto p-2"><h4 className="admin-header-text">Get Connected Guide Admin</h4></div>
            <div className="p-2 align-self-center admin-username-text">{username}</div>
            <div className="p-2 align-self-center"><button type="button" onClick={logout} className="btn btn-secondary btn-sm">Logout</button></div>
          </div>
            
        </div>
      </div>
      <div className="admin-subheader" id="subheader">
        <div className="semester-div">
          {selectedSemester
          ? <><select
              className="form-control semester-select"
              id="semester-select"
              value={selectedSemester?.name}
              onChange={changeSemester}>
                {semesters.length > 0
                ? semesters.map(semester => {
                  return (<option key={semester.name} value={semester.name}>{semester.name}{semester.activeFlag ? " (Active)" : ""}</option>)
                })
                : <option key="noSemestersFound" value="" disabled>No semesters found.</option>
                }
            </select>
            {selectedSemester.activeFlag
            ? <input type="button" value="Deactivate Semester" className="btn btn-warning admin-btn" onClick={deactivateSemester}/>
            : <input type="button" value="Set As Active Semester" className="btn btn-info admin-btn" onClick={activateSemester}/>}
            {deleteSemesterConfirmation === false
            ? <input type="button" value="Delete Semester" className="btn btn-danger admin-btn" onClick={() => {setDeleteSemesterConfirmation(true); setNewSemester(null);}}/>
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
                  <div className="input-group-append">
                    <button 
                      className="btn btn-outline-secondary align-middle"
                      type="button"
                      onClick={() => {
                        setNewSemester(null);
                        setDeleteSemesterConfirmation(false);
                      }}>
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                </div>
              }
            </div></>
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
      <div className="admin-container">
        <Tabs>
          <div label="I-Teams" recordCount={selectedSemester?.iTeams?.length}>
            <ITeamAdmin semester={selectedSemester} rerenderSemester={rerenderSemester}/>
          </div>
          <div label="Academic Connections" recordCount={selectedSemester?.colleges?.length}>
            <MajorCollegeAdmin semester={selectedSemester} rerenderSemester={rerenderSemester}/>
          </div>
          <div label="Schedule" recordCount={selectedSemester?.events?.length}>
            <ScheduleAdmin semester={selectedSemester} rerenderSemester={rerenderSemester}/>
          </div>
        </Tabs>
      </div>
    </>
  );
}

export default Admin;