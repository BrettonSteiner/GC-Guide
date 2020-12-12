import React, { useState, useMemo /*, useEffect*/ } from 'react'
import DataTable from '../DataTable/DataTable'

const teamInfo = ({row}) => {
  return (
  <span>Does this work?{row?.iTeamNumber}</span>
  )
}

const ITeamAdmin = (props) => {
  // const [selectedITeamId, setSelectedITeamId] = useState("");

  let [expanded, setExpanded] = useState([])
  let [allExpanded, setAllExpanded] = useState(true)
  const columns = useMemo(() => {
    return [
      {
        Header: "I-Team Number",
        accessor: "iTeamNumber",
      },
      {
        Header: "Mentors",
        accessor: "",
      },
      {
        Header: "Phone Numbers",
        accessor: "",
      },
      {
        Header: "Addresses",
        accessor: "",
      },
      {
        Header: "Complex Names",
        accessor: "",
      },
      {
        id: "expander",
        canFilter: false,
        Header: "",
        accessor: "expander",
      },
    ] 
  })

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
          <DataTable columns={columns} data={[]} SubComponent={teamInfo}/>
        </div>
      </div>
    </>
  )
}

export default ITeamAdmin