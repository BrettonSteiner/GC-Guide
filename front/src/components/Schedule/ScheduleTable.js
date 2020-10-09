import React, {useState, useEffect, Fragment} from 'react';
import './Schedule.css';
import data from './dummyData.json'
import Map from '../Map/Map';

const ScheduleTable = (props) => {
  const [tableData, setTableData] = useState([]);
  
  useEffect(() => {
    //Call database for data
    setTableData(data.dummyData);
  }, []);

  return (<>
  <table className="table table-hover" id="scheduleTable">
    <thead>
      <tr>
        <th scope="col">Time</th>
        <th scope="col">Event</th>
        <th scope="col"></th>
      </tr>
    </thead>
    <tbody>
      {
        tableData.map( (row, index) => (
          <Fragment key={"tableData" + index}>
            <tr className="accordion-toggle collapsed" 
              id={"trAccordionHeader" + index}
              data-toggle="collapse" 
              data-target={"#trCollapse" + index} 
              aria-controls={"#trCollapse" + index} 
              onClick={() => props.changeEvent(row)}>
              <td>{row.date}<br/>{row.time}</td>
              <td>{row.name}</td>
              <td className="align-middle"><i className="fas fa-chevron-down"></i></td>
            </tr>
            <tr className="hide-table-padding no-hover">
              <td colSpan="3">
                <div id={"trCollapse" + index} className="collapse" data-parent="#scheduleTable">
                  <div className="in p-3">
                    {row.details && row.details !== `` ? (<p>{row.details}</p>) : null}
                    {row.location && row.location !== `` ? (<p>Location: {row.location}</p>) : null}
                    {row.mapSpots && row.mapSpots.length > 0 ? (<div className="mobileMap" id={"mobileMap" + index}></div>) : null}
                  </div>
                </div>
              </td>
            </tr>
          </Fragment>
        ))
      }
    </tbody>
  </table>
  </>);
}

export default ScheduleTable;