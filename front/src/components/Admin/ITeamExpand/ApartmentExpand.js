import React, { /*useState, useEffect*/ } from 'react';

const ApartmentExpand = (props) => {
  // const [selectedITeamExpandId, setSelectedITeamExpandId] = useState("");

  return (
    <>
    <div className="input-group form-group">
      <input type="text" className="form-control" placeholder="Add an apartment"></input>
      <div className="input-group-append">
        <button className="btn btn-outline-secondary align-middle" type="button"><i className="fas fa-plus"></i></button>
      </div>
    </div>
    <table className="table table-sm">
      <tbody>
        <tr>
          <td>Apartment 1</td>
          <td>
            <button className="btn btn-outline-secondary float-right" type="button"><i className="fas fa-trash"></i></button>
          </td>
        </tr>
        <tr>
          <td>Apartment 2</td>
          <td>
            <button className="btn btn-outline-secondary float-right" type="button"><i className="fas fa-trash"></i></button>
          </td>
        </tr>
        <tr>
          <td>Apartment 3</td>
          <td>
            <button className="btn btn-outline-secondary float-right" type="button"><i className="fas fa-trash"></i></button>
          </td>
        </tr>
      </tbody>
    </table>
    </>
  )
}

export default ApartmentExpand