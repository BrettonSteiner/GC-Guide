import React, { useState, useMemo, /*useEffect,*/} from 'react';
import DataTable from '../DataTable/DataTable';
import ITeamExpand from '../ITeamExpand/ITeamExpand';

const dummyData = [{
  iTeamId: "dummyId1",
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
  iTeamId: "dummyId2",
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
}, {
  iTeamId: "dummyId3",
  iTeamNumber: 3
}, {
  iTeamId: "dummyId4",
  iTeamNumber: 4,
  mentor1: {
    name: "Only Mentor1",
    phone: "111-111-1111"
  }
}, {
  iTeamId: "dummyId5",
  iTeamNumber: 5,
  mentor2: {
    name: "Only Mentor2",
    phone: "222-222-2222"
  }
}, {
  iTeamId: "dummyId6",
  iTeamNumber: 6,
  mentor1: {
    name: "Only Name1"
  },
  mentor2: {
    name: "Only Name2"
  },
}, {
  iTeamId: "dummyId7",
  iTeamNumber: 7,
  mentor1: {
    phone: "Only Phone1"
  },
  mentor2: {
    phone: "Only Phone2"
  },
}, {
  iTeamId: "dummyId8",
  iTeamNumber: 8,
  mentor1: {
    name: "Only Name1"
  },
  mentor2: {
    phone: "Only Phone2"
  },
}, {
  iTeamId: "dummyId9",
  iTeamNumber: 9,
  complexes: [{
    name: "Only",
    address: "Complexes",
    apartments: [
      "101",
      "102",
      "103",
      "104",
      "105"
    ]
  }, {
    name: "Only2",
    address: "Complexes2",
    apartments: [
      "2101",
      "2102",
      "2103",
      "2104",
      "2105"
    ]
  }]
}, {
  iTeamId: "dummyId10",
  iTeamNumber: 10,
  complexes: [{
    name: "Name only",
    apartments: [
      "2101",
      "2102",
      "2103",
      "2104",
      "2105"
    ]
  }]
}, {
  iTeamId: "dummyId11",
  iTeamNumber: 11,
  complexes: [{
    address: "Address only",
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
  const [iteams, setIteams] = useState(dummyData);

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
          I-Teams <span class="badge badge-secondary">{iteams.length} I-Teams</span>
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
      <div id="createITeamCollapse" className="collapse" aria-labelledby="addITeamButton" data-parent="#iTeamTab">
        <div className="card-body">
          <ITeamExpand row={{createMode:true, cancelTarget:"createITeamCollapse"}}/>
        </div>
      </div>
      <div className="card-body">
        <DataTable columns={columns} 
          data={iteams.map(row => {
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

export default ITeamAdmin