import React, { useState, useEffect, useCallback, Fragment } from 'react';

const calculateNameAddress = complex => {
  var nameAddress = "";

  if (complex.name !== "") {
    nameAddress = complex.name;

    if (complex.address !== "") {
      nameAddress += " - ";
    }
  }
  if (complex.address !== "") {
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
  const [iTeamId] = useState(props?.iTeamId? props.iTeamId : "0")
  const [iTeamNumber, setITeamNumber] = useState(props?.iTeamNumber? props.iTeamNumber.toString() : "");
  const [mentor1Name, setMentor1Name] = useState(props?.mentor1?.name? props.mentor1.name : "");
  const [mentor1Phone, setMentor1Phone] = useState(props?.mentor1?.phone? props.mentor1.phone : "");
  const [mentor2Name, setMentor2Name] = useState(props?.mentor2?.name? props.mentor2.name : "");
  const [mentor2Phone, setMentor2Phone] = useState(props?.mentor2?.phone? props.mentor2.phone : "");
  const [complexes, setComplexes] = useState(props?.complexes? sortComplexes(props.complexes) : []);
  const [complexApartmentLists] = useState(props?.complexes? organizeComplexApartments(props.complexes) : []);
  const [newComplexName, setNewComplexName] = useState("");
  const [newComplexAddress, setNewComplexAddress] = useState("");
  const [newApartment, setNewApartment] = useState("");
  const [isAltered, setIsAltered] = useState(false);
  const [iTeamNumberError, setITeamNumberError] = useState(false);
  const [complexNameAddressError, setComplexNameAddressError] = useState(false);
  const [existingComplexError, setExistingComplexError] = useState(false);
  const [emptyApartmentError, setEmptyApartmentError] = useState(false);
  const [existingApartmentError, setExistingApartmentError] = useState(false);

  useEffect(() => {
    var hasBeenAltered = props?.iTeamNumber? iTeamNumber !== props.iTeamNumber.toString() : true;
    hasBeenAltered = (!hasBeenAltered && props?.mentor1?.name? mentor1Name !== props.mentor1.name : true);
    hasBeenAltered = (!hasBeenAltered && props?.mentor1?.phone? mentor1Phone !== props.mentor1.phone : true);
    hasBeenAltered = (!hasBeenAltered && props?.mentor2?.name? mentor2Name !== props.mentor2.name : true);
    hasBeenAltered = (!hasBeenAltered && props?.mentor2?.phone? mentor2Phone !== props.mentor2.phone : true);

    if (!hasBeenAltered && props?.complexes? true : false) {
      var sortedOriginalComplexes = sortComplexes(props.complexes);
      var sortedCurrentComplexes = sortComplexes(complexes);

      hasBeenAltered = !(sortedOriginalComplexes.length === sortedCurrentComplexes.length && sortedOriginalComplexes.every(function(complex, complexIndex) {
        var hasBeenAltered = complex.name !== sortedCurrentComplexes[complexIndex].name;
        hasBeenAltered = (hasBeenAltered || complex.address !== sortedCurrentComplexes[complexIndex].address);

        if (!hasBeenAltered) {
          const nameAddress = calculateNameAddress(complex);
          var complexApartmentList = complexApartmentLists.filter(list => list[0] === nameAddress)[0].slice(1);
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
    props.iTeamNumber,
    iTeamNumber,
    props.mentor1.name,
    mentor1Name,
    props.mentor1.phone,
    mentor1Phone,
    props.mentor2.name,
    mentor2Name,
    props.mentor2.phone,
    mentor2Phone,
    props.complexes,
    complexes,
    complexApartmentLists
  ]);

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
    if (apartment === "") {
      setEmptyApartmentError(true);
      hasErrors = true;
    }

    if (complex.apartments.includes(apartment)) {
      setExistingApartmentError(true);
      hasErrors = true;
    }

    if (!hasErrors) {
      setComplexApartments(complex, complex.apartments.concat([apartment]).sort());
    }
  }, [setComplexApartments]);

  const updateITeam = useCallback(() => {
    var hasErrors = false;
    if (iTeamNumber === "") {
      setITeamNumberError(true);
      hasErrors = true;
    }

    if (!hasErrors && isAltered) {
      //Call server to update I-Team
      console.log("Update I-Team.");
    }
  }, [iTeamNumber, isAltered]);

  const deleteITeam = useCallback(() => {
    //Call server to delete I-Team
    console.log("Delete I-Team.");
  }, []);

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
          <div className="form-group" id={iTeamId + "-complexAccordion"}>
            {
              complexes.length > 0
              ?
              complexes.map( (complex, index) => (
                <Fragment key={iTeamId + "-complexKey" + index}>
                  <div className="card">
                    <div className="btn-group" role="group">
                      <button
                        className="btn btn-light btn-block text-left card-header"
                        id={iTeamId + "-complexHeading" + index}
                        type="button"
                        data-toggle="collapse"
                        data-target={"#" + iTeamId + "-complex" + index}
                        aria-expanded="false"
                        aria-controls={iTeamId + "-complex" + index}
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
                    <div id={iTeamId + "-complex" + index} className="collapse" aria-labelledby={iTeamId + "-complexHeading" + index} data-parent={"#" + iTeamId + "-complexAccordion"}>
                      <div className="card-body">
                        <div className="input-group form-group">
                          <input
                            type="text"
                            className={(emptyApartmentError || existingApartmentError) ? "form-control is-invalid" : "form-control"}
                            placeholder="Add an apartment"
                            onChange={e => {
                              setNewApartment(e.target.value);
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
                                addNewApartment(complex, newApartment);
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
                                <Fragment key={iTeamId + "-complex" + index + "-apartment" + apartmentIndex}>
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
        <div className="col">
          <button type="button" className="btn btn-primary" disabled={!isAltered} onClick={() => updateITeam()}>Save/Update</button>
          <button type="button" className="btn btn-danger float-right" onClick={() => deleteITeam()}>Delete</button>
        </div>
      </div>
    </form>
    </>
  )
}

export default ITeamExpand