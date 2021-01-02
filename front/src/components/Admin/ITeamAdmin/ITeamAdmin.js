import React, { useState, useMemo, useEffect,} from 'react';
import DataTable from '../DataTable/DataTable';
import ITeamExpand from '../ITeamExpand/ITeamExpand';

const ITeamAdmin = (props) => {
  const [iTeams, setITeams] = useState(props?.iTeams? props.iTeams : []);

  useEffect(() => {
    setITeams(props?.iTeams);
  }, [props?.iTeams]);

  // let [expanded, setExpanded] = useState([])
  // let [allExpanded, setAllExpanded] = useState(true)
  const columns = useMemo(() => {
    return [
      {
        Header: "I-Team Number",
        accessor: "iTeamNumber",
      },
      {
        Header: "Mentors",
        accessor: "displayMentors",
        filter: 'filterMentors'
      },
      {
        Header: "Phone Numbers",
        accessor: "displayNumbers",
        filter: 'filterPhoneNumbers'
      },
      {
        Header: "Complex Names",
        accessor: "displayComplexes",
        filter: "filterComplex"
      },
      {
        Header: "Addresses",
        accessor: "displayAddresses",
        filter: "filterAddresses"
      },
      {
        id: "expander",
        hideFilter: true,
        Cell: ({ row }) =>
          // Use the row.canExpand and row.getToggleRowExpandedProps prop getter
          // to build the toggle for expanding a row
          (<i className={row.isExpanded ? "fas fa-chevron-down fa-vc" : "fas fa-chevron-up fa-vc"}></i>),
      },
    ] 
  });

  const filterMentors = (rows, id, filterValue) => {
    return rows.filter(row => {
      return row.original?.mentor1?.name?.toLowerCase().includes(filterValue.toLowerCase()) || row.original?.mentor2?.name?.toLowerCase().includes(filterValue.toLowerCase());
    })
  }
  
  const filterPhoneNumbers = (rows, id, filterValue) => {
    return rows.filter(row => {
      return row.original?.mentor1?.phone?.toLowerCase().includes(filterValue.toLowerCase()) || row.original?.mentor2?.phone?.toLowerCase().includes(filterValue.toLowerCase());
    })
  }

  const filterComplex = (rows, id, filterValue) => {
    return rows.filter(row => {
      let found = false;
      row.original?.complexes?.forEach(complex => {
        if (complex?.name?.toLowerCase().includes(filterValue.toLowerCase()))
          found = true;
      })
      return found;
    })
  }
  
  const filterAddresses = (rows, id, filterValue) => {
    return rows.filter(row => {
      let found = false;
      row.original?.complexes?.forEach(complex => {
        if (complex?.address?.toLowerCase().includes(filterValue.toLowerCase()))
          found = true;
      });
      return found;
    })
  }

  return (
    <>
    <div id="iTeamTab" className="card">
      <div className="card-header d-flex justify-content-between">
        <h5 className="mb-0 align-self-center">
          I-Teams <span className="badge badge-secondary">{iTeams.length} I-Teams</span>
        </h5>
        <div className="d-flex flex-row-reverse">
          <input type="button" value="Import Data From File" className="btn btn-info admin-btn"/>
          <input
            id="addITeamButton"
            type="button"
            value="Add I-Team"
            className="btn btn-info admin-btn"
            data-toggle="collapse"
            data-target="#createITeamCollapse"
            aria-controls="createITeamCollapse"
          />
        </div>
      </div>
      <div id="createITeamCollapse" className="collapse border-bottom" aria-labelledby="addITeamButton" data-parent="#iTeamTab">
        <div className="card-body">
          <ITeamExpand row={{createMode:true, cancelTarget:"createITeamCollapse"}}/>
        </div>
      </div>
      <div className="card-body">
        <DataTable columns={columns} 
          data={iTeams.map(row => {
            let newRow= {...row};
            newRow.displayMentors = <><div>{newRow.mentor1?.name? newRow.mentor1.name : null}</div><div>{newRow.mentor2?.name? newRow.mentor2.name : null}</div></>;
            newRow.displayNumbers = <><div>{newRow.mentor1?.phone? newRow.mentor1.phone : null}</div><div>{newRow.mentor2?.phone? newRow.mentor2.phone : null}</div></>;
            newRow.displayComplexes = (newRow.complexes && newRow.complexes.length > 0) ? <div>{newRow.complexes[0].name}{(newRow.complexes.length > 1 && newRow.complexes[0].name) ? " ..." : ""}</div> : null;
            newRow.displayAddresses = (newRow.complexes && newRow.complexes.length > 0) ? <div>{newRow.complexes[0].address}{(newRow.complexes.length > 1 && newRow.complexes[0].address) ? " ..." : ""}</div> : null;
            return newRow;
          })}
          SubComponent={({row}) => { return (<ITeamExpand row={row.original}/>) }}
          customFilters={{filterMentors, filterPhoneNumbers, filterAddresses, filterComplex}}/>
      </div>
    </div>
    </>
  )
}

export default ITeamAdmin;