import React, { useState, useEffect, useCallback, Fragment } from 'react';

const CollegeExpand = (props) => {
  const [collegeName, setCollegeName] = useState(props?.name? props.name : '');
  const [flagColor, setflagColor] = useState(props?.flagColor? props.flagColor : "-- Select --");
  const [majors, setMajors] = useState(props?.majors? props.majors.slice().sort() : []);
  const [newMajor, setNewMajor] = useState("");
  const [isAltered, setIsAltered] = useState(false);
  const [collegeNameError, setCollegeNameError] = useState(false);
  const [flagColorError, setFlagColorError] = useState(false);
  const [emptyMajorNameError, setEmptyMajorNameError] = useState(false);
  const [existingMajorNameError, setExistingMajorNameError] = useState(false);

  useEffect(() => {
    var hasBeenAltered = props?.name? collegeName !== props.name : true;

    hasBeenAltered = (!hasBeenAltered && props?.flagColor? flagColor !== props.flagColor : true)

    if (!hasBeenAltered && props?.majors? true : false) {
      var sortedOriginalMajors = props.majors.slice().sort();
      var sortedCurrentMajors = majors.slice().sort();

      hasBeenAltered = !(sortedOriginalMajors.length === sortedCurrentMajors.length && sortedOriginalMajors.every(function(value, index) {
        return value === sortedCurrentMajors[index];
      }));
    }

    setIsAltered(hasBeenAltered);
  }, [props.name, collegeName, props.flagColor, flagColor, props.majors, majors]);

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
      console.log("Update college.")
    }
  }, [collegeName, flagColor, isAltered]);

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
              id="collegeName"
              placeholder="College Name"
              defaultValue={collegeName}
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
              id="flagColor"
              defaultValue={props?.flagColor? props.flagColor : flagColor}
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
                id="majors"
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
                  <Fragment key={props.name + "major" + index}>
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
                <div className="centered">
                  No majors
                </div>
              }
            </tbody>
          </table>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <button type="button" className="btn btn-primary" disabled={!isAltered} onClick={() => updateCollege()}>Save/Update</button>
          <button type="button" className="btn btn-danger float-right">Delete</button>
        </div>
      </div>
    </form>
    </>
  )
}

export default CollegeExpand;