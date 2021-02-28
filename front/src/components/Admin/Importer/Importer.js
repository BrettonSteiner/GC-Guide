import React, { useState, useEffect } from 'react';
import { CSVReader } from 'react-papaparse';

const Importer = (props) => {
  const [url] = useState(props?.url);
  const [semesterId, setSemesterId] = useState(props?.semesterId);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [errorsExist, setErrorsExist] = useState(false);
  const [importInProcess, setImportInProcess] = useState(false);
  const [importResult, setImportResult] = useState(null);
  const [importResultError, setImportResultError] = useState(false);
  let rerenderSemester = props.rerenderSemester;

  useEffect(() => {
    setSemesterId(props?.semesterId? props.semesterId: null);
  }, [props?.semesterId]);

  const handleOnFileLoad = (data) => {
    // console.log(data);
    var rowData = [];
    data.forEach(row => {
      rowData.push(row.data);
      if (row.errors && row.errors.length) {
        setError('Malformities found in CSV file. Please fix the errors and try again.');
        setErrorsExist(true);
      }
    });

    setData(rowData);
  }

  const handleOnError = (error) => {
    console.log(error);
    setError(error);
    setErrorsExist(true);
  }

  const handleOnRemoveFile = () => {
    setData(null);
    setError(null);
    setErrorsExist(false);
    setImportResult(null);
    setImportResultError(false);
  }

  const importData = () => {
    if (url === null || url === undefined) {
      setError('No import url provided. Contact developers for help.');
      return;
    }
    else if (semesterId === null || semesterId === undefined) {
      setError('No semesterId provided. Contact developers for help.');
      return;
    }

    if (!errorsExist) {
      setImportInProcess(true);
      var json = {
        semesterId: semesterId,
        data: data
      };
      
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(json),
      })
      .then((response) => {
        setImportInProcess(false);
        return response.json();
      })
      .then((data) => {
        if (data !== null) {
          setImportResult(data.message);
          setImportResultError(!data.success);
          if (data.success) {
            rerenderSemester();
          }
        }
      });
    }
  }

  return (
    <>
    <form>
      <div className="form-group">
        <CSVReader
          onDrop={handleOnFileLoad}
          onError={handleOnError}
          style={{}}
          config={{
            header: true,
            dynamicTyping: true,
            skipEmptyLines: true
          }}
          addRemoveButton
          onRemoveFile={handleOnRemoveFile}
        >
          <span>Drop CSV file here or click to upload.</span>
        </CSVReader>
        <small className="form-text text-muted centered">Notice: Imported data will <strong>replace</strong> existing data.</small>
      </div>
      <div className="form-group centered">
        <button type="button" className="btn btn-primary" disabled={data === null || errorsExist || importInProcess} onClick={importData}>
          {importInProcess ?
          <><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Importing data...</>
          : <>Import Data</>
          }
        </button>
      </div>
      <br></br>
      {error !== null || (importResultError && importResult !== null) ?
      <div className="alert alert-danger">
        {`Error: `} 
        {error !== null ? error : null}
        {importResultError ? importResult : null}
        <button type="button" className="close" aria-label="Close" onClick={() => { setError(null); setImportResult(null); setImportResultError(false); }}>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      : null}
      {importResult !== null && !importResultError ?
      <div className="alert alert-success">
        {importResult}
        <button type="button" className="close" aria-label="Close" onClick={() => setImportResult(null)}>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      : null}
    </form>
    </>
  )
}

export default Importer;