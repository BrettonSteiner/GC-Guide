import React, {useState, useEffect, Fragment} from 'react';
import MediaQuery from 'react-responsive';
import './Schedule.css';
import Map from '../Map/Map';

const ScheduleTable = (props) => {
  const [tableData, setTableData] = useState([]);
  const [maps, setMaps] = useState([]);
  
  useEffect(() => {
    //Call database for data
    fetch('/schedule/')
      .then((response) => response.json())
      .then((data) => setTableData(data.schedule));
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
      { tableData.length > 0
        ?
        tableData.map( (row, index) => (
          <Fragment key={"tableData" + index}>
            <tr className="accordion-toggle collapsed" 
              id={"trAccordionHeader" + index}
              data-toggle="collapse"
              data-target={"#trCollapse" + index} 
              aria-controls={"#trCollapse" + index} 
              onClick={() => {
                props.changeEvent(row);
                setMaps(maps.includes(index)? maps : maps.concat(index));
              }}>
              <td>{row.date}<br/>{row.startTime? row.startTime : null}{row.endTime? " - " + row.endTime : null}</td>
              <td>{row.name}</td>
              <td className="align-middle"><i className="fas fa-chevron-down"></i></td>
            </tr>
            <tr className="hide-table-padding no-hover">
              <td colSpan="3">
                <div id={"trCollapse" + index} className="collapse" data-parent="#scheduleTable">
                  <div className="in p-3">
                    {row.description && row.description !== `` ? (<p>{row.description}</p>) : null}
                    {row.location && row.location !== `` ? (<p>Location: {row.location}</p>) : null}
                    <MediaQuery maxDeviceWidth={992}>
                      {row.mapSpots && row.mapSpots.length > 0 ? (<div className="mobileMap" id={"mobileMap" + index}>
                        {
                          maps?.includes(index)? <Map event={row} /> : null
                        }
                      </div>) : null}
                    </MediaQuery>
                  </div>
                </div>
              </td>
            </tr>
          </Fragment>
        ))
        :
        <tr>
          <td colSpan="3" className="centered">
            No events
          </td>
        </tr>
      }
    </tbody>
  </table>
  </>);
}

export default ScheduleTable;