import React, { useState, useEffect, useCallback, Fragment } from 'react';

const calculateNameAddress = complex => {
  var nameAddress = "";

  if (complex.name !== undefined && complex.name !== null && complex.name !== "") {
    nameAddress = complex.name;

    if (complex.address !== undefined && complex.address !== null && complex.address !== "") {
      nameAddress += " - ";
    }
  }
  if (complex.address !== undefined && complex.address !== null && complex.address !== "") {
    nameAddress += complex.address;
  }

  return nameAddress;
}

const sortComplexes = unsortedComplexes => {
  return unsortedComplexes.sort((a, b) => {
    var aNameAddress = calculateNameAddress(a).toLowerCase();
    var bNameAddress = calculateNameAddress(b).toLowerCase();
    if (aNameAddress < bNameAddress) {
      return -1;
    }
    else if (aNameAddress > bNameAddress) {
      return 1;
    }
    else {
      return 0;
    }
  });
};

const organizeComplexApartments = complexes => {
  var complexApartmentList = [];
  complexes.forEach(complex => {
    var apartmentList = [];
    apartmentList = apartmentList.concat(complex.apartments);
    apartmentList.sort();
    apartmentList.unshift(calculateNameAddress(complex));
    complexApartmentList.push(apartmentList);
  });

  return complexApartmentList;
};

const ITeamExpand = (props) => {
  const [createMode] = useState(props?.row?.createMode? props.row.createMode : false);
  const [semesterId, setSemesterId] = useState(props?.row?.semesterId? props.row.semesterId : null);
  const [iTeamId] = useState(props?.row?._id? props.row._id : "0");
  const [originalITeamNumber] = useState(props?.row?.iTeamNumber? props.row.iTeamNumber.toString() : "");
  const [originalMentor1Name] = useState(props?.row?.mentor1?.name? props.row.mentor1.name : "");
  const [originalMentor1Phone] = useState(props?.row?.mentor1?.phone? props.row.mentor1.phone : "");
  const [originalMentor2Name] = useState(props?.row?.mentor2?.name? props.row.mentor2.name : "");
  const [originalMentor2Phone] = useState(props?.row?.mentor2?.phone? props.row.mentor2.phone : "");
  const [originalComplexes] = useState(props?.row?.complexes? sortComplexes(props.row.complexes) : []);
  const [originalComplexApartmentLists] = useState(props?.row?.complexes? organizeComplexApartments(props.row.complexes) : []);
  const [iTeamNumber, setITeamNumber] = useState(props?.row?.iTeamNumber? props.row.iTeamNumber.toString() : "");
  const [mentor1Name, setMentor1Name] = useState(props?.row?.mentor1?.name? props.row.mentor1.name : "");
  const [mentor1Phone, setMentor1Phone] = useState(props?.row?.mentor1?.phone? props.row.mentor1.phone : "");
  const [mentor2Name, setMentor2Name] = useState(props?.row?.mentor2?.name? props.row.mentor2.name : "");
  const [mentor2Phone, setMentor2Phone] = useState(props?.row?.mentor2?.phone? props.row.mentor2.phone : "");
  const [complexes, setComplexes] = useState(props?.row?.complexes? sortComplexes(props.row.complexes) : []);
  const [newComplexName, setNewComplexName] = useState("");
  const [newComplexAddress, setNewComplexAddress] = useState("");
  const [newApartments, setNewApartments] = useState([]);
  const [isAltered, setIsAltered] = useState(false);
  const [iTeamNumberError, setITeamNumberError] = useState(false);
  const [complexNameAddressError, setComplexNameAddressError] = useState(false);
  const [existingComplexError, setExistingComplexError] = useState(false);
  const [emptyApartmentError, setEmptyApartmentError] = useState(false);
  const [existingApartmentError, setExistingApartmentError] = useState(false);
  const [result, setResult] = useState(null);
  const [resultError, setResultError] = useState(false);
  let rerenderSemester = props.rerenderSemester;

  useEffect(() => {
    var hasBeenAltered = iTeamNumber !== originalITeamNumber;
    hasBeenAltered = (!hasBeenAltered? mentor1Name !== originalMentor1Name : true);
    hasBeenAltered = (!hasBeenAltered? mentor1Phone !== originalMentor1Phone : true);
    hasBeenAltered = (!hasBeenAltered? mentor2Name !== originalMentor2Name : true);
    hasBeenAltered = (!hasBeenAltered? mentor2Phone !== originalMentor2Phone : true);

    if (!hasBeenAltered) {
      var sortedOriginalComplexes = sortComplexes(originalComplexes);
      var sortedCurrentComplexes = sortComplexes(complexes);

      hasBeenAltered = !(sortedOriginalComplexes.length === sortedCurrentComplexes.length && sortedOriginalComplexes.every(function(complex, complexIndex) {
        var hasBeenAltered = complex.name !== sortedCurrentComplexes[complexIndex].name;
        hasBeenAltered = (hasBeenAltered || complex.address !== sortedCurrentComplexes[complexIndex].address);

        if (!hasBeenAltered) {
          const nameAddress = calculateNameAddress(complex);
          var complexApartmentList = originalComplexApartmentLists.filter(list => list[0] === nameAddress)[0].slice(1);
          var sortedCurrentComplexApartments = sortedCurrentComplexes[complexIndex].apartments.sort();

          hasBeenAltered = !(complexApartmentList.length === sortedCurrentComplexApartments.length && complexApartmentList.every(function(apartment, apartmentIndex) {
            return apartment === sortedCurrentComplexApartments[apartmentIndex];
          }));
        }

        // I invert this because it is supposed to return True if it has not been altered for the final conditions to work out properly
        return !hasBeenAltered;
      }));
    }

    setIsAltered(hasBeenAltered);
  }, [
    originalITeamNumber,
    originalMentor1Name,
    originalMentor1Phone,
    originalMentor2Name,
    originalMentor2Phone,
    originalComplexes,
    originalComplexApartmentLists,
    iTeamNumber,
    mentor1Name,
    mentor1Phone,
    mentor2Name,
    mentor2Phone,
    complexes
  ]);

  useEffect(() => {
    setSemesterId(props?.row?.semesterId? props.row.semesterId : null);
  }, [props?.row?.semesterId]);

  const addNewComplex = useCallback((complexName, complexAddress) => {
    var hasErrors = false;
    if (complexName === "" && complexAddress === "") {
      setComplexNameAddressError(true);
      hasErrors = true;
    }

    if (complexName !== "" && complexAddress !== "") {
      if (complexes.findIndex(complex => (complex.name === complexName && complex.address === complexAddress)) !== -1) {
        setExistingComplexError(true);
        hasErrors = true;
      }
    }
    else if (complexName !== "" && complexAddress === "") {
      if (complexes.findIndex(complex => (complex.name === complexName && complex.address === "")) !== -1) {
        setExistingComplexError(true);
        hasErrors = true;
      }
    }
    else if (complexName === "" && complexAddress !== "") {
      if (complexes.findIndex(complex => (complex.name === "" && complex.address === complexAddress)) !== -1) {
        setExistingComplexError(true);
        hasErrors = true;
      }
    }

    if (!hasErrors) {
      const complex = {
        "name": complexName,
        "address": complexAddress,
        "apartments": []
      }
      setComplexes(sortComplexes(complexes.concat([complex])));
    }
  }, [complexes]);

  const setComplexApartments = useCallback((complex, apartments) => {
    // Remove old complex entirely
    var newComplexList = complexes.filter(currentComplex => calculateNameAddress(currentComplex) !== calculateNameAddress(complex));

    // Re-add the complex with the correct apartment list
    complex.apartments = apartments.sort();
    newComplexList.push(complex);

    setComplexes(sortComplexes(newComplexList));
  }, [complexes]);

  const addNewApartment = useCallback((complex, apartment) => {
    var hasErrors = false;
    if (apartment === undefined || apartment === null || apartment === "") {
      setEmptyApartmentError(true);
      hasErrors = true;
    }

    if (apartment !== undefined && apartment !== null && complex.apartments.includes(apartment)) {
      setExistingApartmentError(true);
      hasErrors = true;
    }

    if (!hasErrors) {
      setComplexApartments(complex, complex.apartments.concat([apartment]).sort());
    }
  }, [setComplexApartments]);

  const resetForm = useCallback(() => {
    setITeamNumber(originalITeamNumber);
    setMentor1Name(originalMentor1Name);
    setMentor1Phone(originalMentor1Phone);
    setMentor2Name(originalMentor2Name);
    setMentor2Phone(originalMentor2Phone);
    var complexes = originalComplexes;
    complexes.forEach(complex => {
      const nameAddress = calculateNameAddress(complex);
      complex.apartments = originalComplexApartmentLists.filter(list => list[0] === nameAddress)[0].slice(1);
    });
    setComplexes(complexes);
    setNewComplexName("");
    setNewComplexAddress("");
    setNewApartments([]);
    setITeamNumberError(false);
    setComplexNameAddressError(false);
    setExistingComplexError(false);
    setEmptyApartmentError(false);
    setExistingApartmentError(false);
    setResult(null);
    setResultError(false);
  }, [
    originalITeamNumber,
    originalMentor1Name,
    originalMentor1Phone,
    originalMentor2Name,
    originalMentor2Phone,
    originalComplexes,
    originalComplexApartmentLists
  ]);

  let generateITeamJson = useCallback(() => {
    let iTeamJson;
    if (createMode) {
      iTeamJson = {
        "semesterId": semesterId,
        "iTeamNumber": iTeamNumber,
        "mentor1": {
          "name": mentor1Name,
          "phone": mentor1Phone
        },
        "mentor2": {
          "name": mentor2Name,
          "phone": mentor2Phone
        },
        "complexes": complexes
      };
    }
    else {
      iTeamJson = {
        "semesterId": semesterId,
        "iTeamId": iTeamId,
        "iTeamNumber": iTeamNumber,
        "oldITeamNumber": originalITeamNumber,
        "mentor1": {
          "name": mentor1Name,
          "phone": mentor1Phone
        },
        "mentor2": {
          "name": mentor2Name,
          "phone": mentor2Phone
        },
        "complexes": complexes
      };
    }

    return iTeamJson;
  }, [
    createMode,
    semesterId,
    iTeamId,
    iTeamNumber,
    originalITeamNumber,
    mentor1Name,
    mentor1Phone,
    mentor2Name,
    mentor2Phone,
    complexes
  ]);

  const createITeam = useCallback(() => {
    var hasErrors = false;
    if (iTeamNumber === "") {
      setITeamNumberError(true);
      hasErrors = true;
    }

    if (!hasErrors && isAltered) {
      // Call server to update I-Team
      var iTeamJson = generateITeamJson();
      fetch('/iteams/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(iTeamJson),
      })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data !== null) {
          setResult(data.message);
          setResultError(!data.success);
          if (data.success) {
            rerenderSemester();
          }
        }
      });
    }
  }, [iTeamNumber, isAltered, generateITeamJson, rerenderSemester]);

  const updateITeam = useCallback(() => {
    var hasErrors = false;
    if (iTeamNumber === "") {
      setITeamNumberError(true);
      hasErrors = true;
    }

    if (!hasErrors && isAltered) {
      // Call server to update I-Team
      var iTeamJson = generateITeamJson();
      fetch('/iteams/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(iTeamJson),
      })
      .then((response) => response.json())
      .then((data) => {
        if (data !== null) {
          setResult(data.message);
          setResultError(!data.success);
          if (data.success) {
            rerenderSemester();
          }
        }
      });
    }
  }, [iTeamNumber, isAltered, generateITeamJson, rerenderSemester]);

  const deleteITeam = useCallback(() => {
    // Call server to delete I-Team
    fetch('/iteams/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({semesterId: semesterId, iTeamId: iTeamId, iTeamNumber: iTeamNumber}),
    })
    .then((response) => response.json())
    .then((data) => {
      if (data !== null) {
        setResult(data.message);
        setResultError(!data.success);
        if (data.success) {
          rerenderSemester();
        }
      }
    });
  }, [semesterId, iTeamId, iTeamNumber, rerenderSemester]);

  return (
    <>
    <form>
      <div className="row">
        <div className="col-4">
          <div className="form-group">
            <label htmlFor="iTeamNumber">I-Team Number</label>
            <input
              type="number"
              min="1"
              step="1"
              className={iTeamNumberError ? "form-control is-invalid" : "form-control"}
              id="iTeamNumber"
              placeholder="I-Team Number"
              defaultValue={iTeamNumber}
              onChange={e => {
                setITeamNumber(e.target.value);
                if (iTeamNumberError) {
                  setITeamNumberError(false);
                }
              }}>
            </input>
            <div className="invalid-feedback">
              { iTeamNumberError ? (<>Please provide an I-Team number.</>) : null }
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="mentor1Name">Mentor 1 Name</label>
            <input
              type="text"
              className="form-control"
              id="mentor1Name"
              placeholder="Mentor 1 Name"
              defaultValue={mentor1Name}
              onChange={e => {
                setMentor1Name(e.target.value);
              }}>
            </input>
          </div>
          <div className="form-group">
            <label htmlFor="mentor1Phone">Mentor 1 Phone Number</label>
            <input
              type="text"
              className="form-control"
              id="mentor1Phone"
              placeholder="Mentor 1 Phone Number"
              defaultValue={mentor1Phone}
              onChange={e => {
                setMentor1Phone(e.target.value);
              }}>
            </input>
          </div>
          <div className="form-group">
            <label htmlFor="mentor2Name">Mentor 2 Name</label>
            <input
              type="text"
              className="form-control"
              id="mentor2Name"
              placeholder="Mentor 2 Name"
              defaultValue={mentor2Name}
              onChange={e => {
                setMentor2Name(e.target.value);
              }}>
            </input>
          </div>
          <div className="form-group">
            <label htmlFor="mentor2Phone">Mentor 2 Phone Number</label>
            <input
              type="text"
              className="form-control"
              id="mentor2Phone"
              placeholder="Mentor 2 Phone Number"
              defaultValue={mentor2Phone}
              onChange={e => {
                setMentor2Phone(e.target.value);
              }}>
            </input>
          </div>
        </div>
        <div className="col-8">
          <div className="form-group">
            <label htmlFor="complexAddress">Complex Name / Address</label>
            <div className="input-group">
              <input
                type="text"
                className={(complexNameAddressError || existingComplexError) ? "form-control is-invalid" : "form-control"}
                id="complexName"
                placeholder="Complex Name"
                onChange={e => {
                  setNewComplexName(e.target.value);
                  if (complexNameAddressError) {
                    setComplexNameAddressError(false);
                  }
                  if (existingComplexError) {
                    setExistingComplexError(false);
                  }
                }}>
              </input>
              <input
                type="text"
                className={(complexNameAddressError || existingComplexError) ? "form-control is-invalid" : "form-control"}
                id="complexAddress"
                placeholder="Address"
                onChange={e => {
                  setNewComplexAddress(e.target.value);
                  if (complexNameAddressError) {
                    setComplexNameAddressError(false);
                  }
                  if (existingComplexError) {
                    setExistingComplexError(false);
                  }
                }}>
              </input>
              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary align-middle"
                  type="button"
                  onClick={() => {
                    addNewComplex(newComplexName, newComplexAddress);
                  }}>
                  <i className="fas fa-plus"></i>
                </button>
              </div>
              <div className="invalid-feedback">
                { complexNameAddressError ? (<>Please provide a complex name, an address, or both.</>) : null }
                { existingComplexError ? (<>That complex already exists in the list.</>) : null }
              </div>
            </div>
          </div>
          <div className="form-group" id={"id" + iTeamId + "-complexAccordion"}>
            {
              complexes.length > 0
              ?
              complexes.map( (complex, index) => (
                <Fragment key={"id" + iTeamId + "-complexKey" + index}>
                  <div className="card">
                    <div className="btn-group" role="group">
                      <button
                        className="btn btn-light btn-block text-left card-header"
                        id={"id" + iTeamId + "-complexHeading" + index}
                        type="button"
                        data-toggle="collapse"
                        data-target={"#id" + iTeamId + "-complex" + index}
                        aria-expanded="false"
                        aria-controls={"id" + iTeamId + "-complex" + index}
                        onClick={() => {
                          if (emptyApartmentError) {
                            setEmptyApartmentError(false);
                          }
                          if (existingApartmentError) {
                            setExistingApartmentError(false);
                          }
                        }}>
                        <h5 className="mb-0">
                          { calculateNameAddress(complex) }
                          <i className="card-header-icon fas fa-chevron-down fa-vc"></i>
                        </h5>
                      </button>
                      <button
                        className="btn btn-outline-secondary float-right"
                        type="button"
                        onClick={() => {
                          setComplexes(complexes.filter(row => !(row.name === complex.name && row.address === complex.address)));
                        }}>
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                    <div
                      id={"id" + iTeamId + "-complex" + index}
                      className="collapse"
                      aria-labelledby={"id" + iTeamId + "-complexHeading" + index}
                      data-parent={"#id" + iTeamId + "-complexAccordion"}
                      >
                      <div className="card-body">
                        <div className="input-group form-group">
                          <input
                            type="text"
                            className={(emptyApartmentError || existingApartmentError) ? "form-control is-invalid" : "form-control"}
                            placeholder="Add an apartment"
                            onChange={e => {
                              var updatedNewApartments = newApartments.slice();
                              updatedNewApartments[index] = e.target.value;
                              setNewApartments(updatedNewApartments);
                              if (emptyApartmentError) {
                                setEmptyApartmentError(false);
                              }
                              if (existingApartmentError) {
                                setExistingApartmentError(false);
                              }
                            }}>
                          </input>
                          <div className="input-group-append">
                            <button
                              className="btn btn-outline-secondary align-middle"
                              type="button"
                              onClick={() => {
                                addNewApartment(complex, newApartments[index]);
                              }}>
                              <i className="fas fa-plus"></i>
                            </button>
                          </div>
                          <div className="invalid-feedback">
                            { emptyApartmentError ? (<>Please provide a(n) apartment number(s).</>) : null }
                            { existingApartmentError ? (<>That apartment already exists in the list.</>) : null }
                          </div>
                        </div>
                        <table className="table table-sm">
                          <tbody>
                            {
                              complex.apartments.length > 0
                              ?
                              complex.apartments.map( (apartment, apartmentIndex) => (
                                <Fragment key={"id" + iTeamId + "-complex" + index + "-apartment" + apartmentIndex}>
                                  <tr>
                                    <td>{apartment}</td>
                                    <td>
                                      <button
                                        className="btn btn-outline-secondary float-right"
                                        type="button"
                                        onClick={() => {
                                          setComplexApartments(complex, complex.apartments.filter(row => row !== apartment));
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
                                  No apartments
                                </td>
                              </tr>
                            }
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </Fragment>
              ))
              :
              <div className="centered">
                No complexes
              </div>
            }
          </div>
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
              onClick={() => createITeam()}
            >Create I-Team</button>
            <button type="reset" className="btn btn-warning admin-btn" disabled={!isAltered} onClick={() => resetForm()}>Reset</button>
          </div>
          :
          <div className="col">
            <button type="button" className="btn btn-primary" disabled={!isAltered} onClick={() => updateITeam()}>Save/Update</button>
            <button type="reset" className="btn btn-warning admin-btn" disabled={!isAltered} onClick={() => resetForm()}>Reset</button>
            <button type="button" className="btn btn-danger float-right" onClick={() => deleteITeam()}>Delete</button>
          </div>
        }
      </div>
      {result !== null ?
      <><br></br>
      <div className={resultError? "alert alert-danger" : "alert alert-success"}>
        {resultError? ("Error: " + result) : result}
        <button type="button" className="close" aria-label="Close" onClick={() => { setResult(null); if (resultError) { setResultError(false); } }}>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      </>
      : null }
    </form>
    </>
  )
}

export default ITeamExpand