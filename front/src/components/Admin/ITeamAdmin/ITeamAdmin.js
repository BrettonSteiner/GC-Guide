import React, { useState, useMemo /*, useEffect*/ } from 'react';
import DataTable from '../DataTable/DataTable';
import ITeamExpand from '../ITeamExpand/ITeamExpand';

const teamInfo = ({row}) => {
  return (
  <ITeamExpand
    iTeamNumber={row.original.iTeamNumber}
    mentor1={row.original.mentor1}
    mentor2={row.original.mentor2}
    complexes={row.original.complexes}
  />
  )
}

const dummyData = [{
  iTeamNumber: 1,
  mentor1: {name: "Braden Steiner", phone: "801-123-4567" },
  mentor2: {name: "Rachel Steiner", phone: "801-987-6543" },
  complexes: [{
    name: "Somerset",
    address: "123 E. 450 S. Rexburg ID",
    apartments: ["101", "102", "103"],
  }, {
    name: "Ridge",
    address: "here",
    apartments: ["200", "201", "202"],
  }]
}, {
  iTeamNumber: 2,
  mentor1: {
    name: "Simba",
    phone: "208-555-1234"
  },
  mentor2: {
    name: "Nala",
    phone: "208-555-5678"
  },
  complexes: [{
    name: "Pride Rock",
    address: "100 Somewhere Sunrise, Africa",
    apartments: [
      "101",
      "102",
      "103",
      "104",
      "105"
    ]
  },
  {
    name: "Pride Lands",
    address: "450 Everywhere Sunrise, Africa",
    apartments: [
      "2101",
      "2102",
      "2103",
      "2104",
      "2105"
    ]
  }]
}]

const ITeamAdmin = (props) => {
  // const [selectedITeamId, setSelectedITeamId] = useState("");
  let [iteams, setIteams] = useState(dummyData);

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
        Header: "Addresses",
        accessor: "displayAddresses",
        filter: "filterAddresses"
      },
      {
        Header: "Complex Names",
        accessor: "displayComplexes",
        filter: "filterComplex"
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
  })

  const filterMentors = (rows, id, filterValue) => {
    return rows.filter(row => {
      return row.original?.mentor1.name.includes(filterValue) || row.original?.mentor2.name.includes(filterValue);
    })
  }
  
  const filterPhoneNumbers = (rows, id, filterValue) => {
    return rows.filter(row => {
      return row.original?.mentor1.phone.includes(filterValue) || row.original?.mentor2.phone.includes(filterValue);
    })
  }
  
  const filterAddresses = (rows, id, filterValue) => {
    return rows.filter(row => {
      let found = false;
      row.original?.complexes.forEach(complex => {
        if (complex?.address?.includes(filterValue))
          found = true;
      });
      return found;
    })
  }
  
  const filterComplex = (rows, id, filterValue) => {
    return rows.filter(row => {
      let found = false;
      row.original?.complexes.forEach(complex => {
        if (complex.name.includes(filterValue))
          found = true;
      })
      return found;
    })
  }

  return (
    <>
    <div className="card">
        <div className="card-header d-flex justify-content-between">
          <h5 className="align-middle">I-Teams</h5>
          <div className="d-flex flex-row-reverse">
            <input type="button" value="Import Data From File" className="btn btn-info admin-btn "/>
            <input type="button" value="Add I-Team" className="btn btn-info admin-btn "/>
          </div>
        </div>
        <div className="card-body">
          {/* ADD ADMIN STUFF HERE */}
          <p>There are {props.iteams.length} I-Teams in this semester</p>
          <DataTable columns={columns} 
            data={iteams.map(row => {
              let newRow= {...row};
              newRow.displayMentors = <><div>{newRow.mentor1.name}</div><div>{newRow.mentor2.name}</div></>;
              newRow.displayNumbers = <><div>{newRow.mentor1.phone}</div><div>{newRow.mentor2.phone}</div></>;
              newRow.displayAddresses = newRow.complexes.length > 0 ? <div>{newRow.complexes[0].address}{newRow.complexes.length > 1 ? "..." : ""}</div> : null;
              newRow.displayComplexes = newRow.complexes.length > 0 ? <div>{newRow.complexes[0].name}{newRow.complexes.length > 1 ? "..." : ""}</div> : null;
              return newRow;
            })} 
            SubComponent={teamInfo}
            customFilters={{filterMentors, filterPhoneNumbers, filterAddresses, filterComplex}}/>
        </div>
      </div>
    </>
  )
}

export default ITeamAdmin