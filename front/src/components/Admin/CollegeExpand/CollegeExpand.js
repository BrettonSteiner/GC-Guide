import React, { useState, useEffect, useCallback, Fragment } from 'react';

const CollegeExpand = (props) => {
  const [createMode] = useState(props?.row?.createMode? props.row.createMode : false);
  const [cancelTarget] = useState(props?.row?.cancelTarget? props.row.cancelTarget : "");
  const [semesterId, setSemesterId] = useState(props?.row?.semesterId? props.row.semesterId : null);
  const [collegeId] = useState(props?.row?._id? props.row._id : "0");
  const [originalCollegeName] = useState(props?.row?.name? props.row.name : "");
  const [originalFlagColor] = useState(props?.row?.flagColor? props.row.flagColor : "-- Select --");
  const [originalMajors] = useState(props?.row?.majors? props.row.majors.slice().sort() : []);
  const [collegeName, setCollegeName] = useState(props?.row?.name? props.row.name : "");
  const [flagColor, setflagColor] = useState(props?.row?.flagColor? props.row.flagColor : "-- Select --");
  const [majors, setMajors] = useState(props?.row?.majors? props.row.majors.slice().sort() : []);
  const [newMajor, setNewMajor] = useState("");
  const [isAltered, setIsAltered] = useState(false);
  const [collegeNameError, setCollegeNameError] = useState(false);
  const [flagColorError, setFlagColorError] = useState(false);
  const [emptyMajorNameError, setEmptyMajorNameError] = useState(false);
  const [existingMajorNameError, setExistingMajorNameError] = useState(false);
  let rerenderSemester = props.rerenderSemester;

  useEffect(() => {
    var hasBeenAltered = collegeName !== originalCollegeName;
    hasBeenAltered = (!hasBeenAltered? flagColor !== originalFlagColor : true);

    if (!hasBeenAltered) {
      var sortedOriginalMajors = originalMajors.slice().sort();
      var sortedCurrentMajors = majors.slice().sort();

      hasBeenAltered = !(sortedOriginalMajors.length === sortedCurrentMajors.length && sortedOriginalMajors.every(function(value, index) {
        return value === sortedCurrentMajors[index];
      }));
    }

    setIsAltered(hasBeenAltered);
  }, [
    originalCollegeName,
    originalFlagColor,
    originalMajors,
    collegeName,
    flagColor,
    majors
  ]);

  useEffect(() => {
    setSemesterId(props?.row?.semesterId? props.row.semesterId : null);
  }, [props?.row?.semesterId]);

  const addNewMajor = useCallback(major => {
    var hasErrors = false;
    if (major === "") {
      setEmptyMajorNameError(true);
      hasErrors = true;
    }

    if (majors.includes(major)) {
      setExistingMajorNameError(true);
      hasErrors = true;
    }

    if (!hasErrors) {
      setMajors(majors.concat([major]).sort());
    }
  }, [majors]);

  const resetForm = useCallback(() => {
    setCollegeName(originalCollegeName);
    setflagColor(originalFlagColor);
    setMajors(originalMajors);
    setNewMajor("");
    setCollegeNameError(false);
    setFlagColorError(false);
    setEmptyMajorNameError(false);
    setExistingMajorNameError(false);
  }, [
    originalCollegeName,
    originalFlagColor,
    originalMajors,
  ]);

  let generateCollegeJson = useCallback(() => {
    let collegeJson;
    if (createMode) {
      collegeJson = {
        "semesterId": semesterId,
        "name": collegeName,
        "flagColor": flagColor,
        "majors": majors
      };
    }
    else {
      collegeJson = {
        "semesterId": semesterId,
        "collegeId": collegeId,
        "name": collegeName,
        "flagColor": flagColor,
        "majors": majors
      };
    }

    return collegeJson;
  }, [
    createMode,
    semesterId,
    collegeId,
    collegeName,
    flagColor,
    majors
  ]);

  const createCollege = useCallback(() => {
    var hasErrors = false;
    if (collegeName === "") {
      setCollegeNameError(true);
      hasErrors = true;
    }

    if (flagColor === "-- Select --") {
      setFlagColorError(true);
      hasErrors = true;
    }

    if (!hasErrors && isAltered) {
      //Call server to create college
      var collegeJson = generateCollegeJson();
      // console.log("Create college.");
      fetch('/colleges/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(collegeJson),
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error("HTTP status " + response.status);
        }
        response.json();
      })
      .then((data) => {
        rerenderSemester();
        // console.log(data);
        resetForm();
      });
    }
  }, [collegeName, flagColor, isAltered, generateCollegeJson, rerenderSemester, resetForm]);

  const updateCollege = useCallback(() => {
    var hasErrors = false;
    if (collegeName === "") {
      setCollegeNameError(true);
      hasErrors = true;
    }

    if (flagColor === "-- Select --") {
      setFlagColorError(true);
      hasErrors = true;
    }

    if (!hasErrors && isAltered) {
      //Call server to update college
      var collegeJson = generateCollegeJson();
      // console.log("Update College:");
      fetch('/colleges/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(collegeJson),
      })
      .then((response) => response.json())
      .then((data) => {
        rerenderSemester();
        // console.log(data);
      });
    }
  }, [collegeName, flagColor, isAltered, generateCollegeJson, rerenderSemester]);

  const deleteCollege = useCallback(() => {
    //Call server to delete college
    // console.log("Delete college.");
    fetch('/colleges/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({semesterId: semesterId, collegeId: collegeId}),
    })
    .then(() => rerenderSemester());
  }, [semesterId, collegeId, rerenderSemester]);

  return (
    <>
    <form>
      <div className="row">
        <div className="col">
          <div className="form-group">
            <label htmlFor="collegeName">College Name</label>
            <input
              type="text"
              className={collegeNameError ? "form-control is-invalid" : "form-control"}
              placeholder="College Name"
              defaultValue={originalCollegeName}
              onChange={e => {
                setCollegeName(e.target.value);
                if (collegeNameError) {
                  setCollegeNameError(false);
                }
              }}>
            </input>
            <div className="invalid-feedback">
              { collegeNameError ? (<>Please provide a college name.</>) : null }
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="flagColor">Flag Color</label>
            <select
              className={flagColorError ? "form-control is-invalid" : "form-control"}
              defaultValue={originalFlagColor}
              onChange={e => {
                setflagColor(e.target.value);
                if (flagColorError) {
                  setFlagColorError(false);
                }
              }}>
              <option>-- Select --</option>
              <option>Red</option>
              <option>Orange</option>
              <option>Yellow</option>
              <option>Green</option>
              <option>Blue</option>
              <option>Purple</option>
              <option>Grey</option>
            </select>
            <div className="invalid-feedback">
              { flagColorError ? (<>Please provide a flag color.</>) : null }
            </div>
          </div>
        </div>
        <div className="col">
          <div className="form-group">
            <label htmlFor="majors">Majors</label>
            <div className="input-group">
              <input
                type="text"
                className={(emptyMajorNameError || existingMajorNameError) ? "form-control is-invalid" : "form-control"}
                placeholder="Add a major"
                onChange={e => {
                  setNewMajor(e.target.value);
                  if (emptyMajorNameError) {
                    setEmptyMajorNameError(false);
                  }
                  if (existingMajorNameError) {
                    setExistingMajorNameError(false);
                  }
                }}>
              </input>
              <div className="input-group-append">
                <button 
                  className="btn btn-outline-secondary align-middle"
                  type="button"
                  onClick={() => {
                    addNewMajor(newMajor);
                  }}>
                  <i className="fas fa-plus"></i>
                </button>
              </div>
              <div className="invalid-feedback">
                { emptyMajorNameError ? (<>Please provide a major name.</>) : null }
                { existingMajorNameError ? (<>That major name already exists in the list.</>) : null }
              </div>
            </div>
          </div>
          <table className="table table-sm">
            <tbody>
              {
                majors.length > 0
                ?
                majors.map( (major, index) => (
                  <Fragment key={collegeId + "major" + index}>
                    <tr>
                      <td>{major}</td>
                      <td>
                        <button
                          className="btn btn-outline-secondary float-right"
                          type="button"
                          onClick={() => {
                            setMajors(majors.filter(row => row !== major));
                          }}>
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  </Fragment>
                ))
                :
                <tr>
                  <td className="centered">
                    No majors
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
      <div className="row">
        { createMode === true
          ?
          <div className="col">
            <button
              type="button"
              className="btn btn-primary"
              disabled={!isAltered}
              data-toggle="collapse"
              data-target={"#" + cancelTarget}
              aria-controls={cancelTarget}
              onClick={() => createCollege()}
            >Create College</button>
            <button type="reset" className="btn btn-warning admin-btn" disabled={!isAltered} onClick={() => resetForm()}>Reset</button>
            { cancelTarget !== ""?
              <button
                type="button"
                className="btn btn-danger float-right"
                data-toggle="collapse"
                data-target={"#" + cancelTarget}
                aria-controls={cancelTarget}
              >Cancel</button>
              :
              null
            }
          </div>
          :
          <div className="col">
            <button type="button" className="btn btn-primary" disabled={!isAltered} onClick={() => updateCollege()}>Save/Update</button>
            <button type="reset" className="btn btn-warning admin-btn" disabled={!isAltered} onClick={() => resetForm()}>Reset</button>
            <button type="button" className="btn btn-danger float-right" onClick={() => deleteCollege()}>Delete</button>
          </div>
        }
      </div>
    </form>
    </>
  )
}

export default CollegeExpand;