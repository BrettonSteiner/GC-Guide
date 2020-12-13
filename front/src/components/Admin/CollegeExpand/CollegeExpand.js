import React, { /*useState, useEffect*/ } from 'react';

const CollegeExpand = (props) => {
  // const [selectedCollegeId, setSelectedCollegeId] = useState("");

  return (
    <>
    <form>
      <div className="row">
        <div className="col">
          <div className="form-group">
            <label htmlFor="collegeName">College Name</label>
            <input type="text" className="form-control" id="collegeName" placeholder="College Name"></input>
          </div>
          <div className="form-group">
            <label htmlFor="flagColor">Flag Color</label>
            <select className="form-control" id="flagColor">
              <option>Red</option>
              <option>Orange</option>
              <option>Yellow</option>
              <option>Green</option>
              <option>Blue</option>
              <option>Purple</option>
              <option>Gray</option>
            </select>
          </div>
        </div>
        <div className="col">
          <div className="form-group">
            <label htmlFor="majors">Majors</label>
            <div className="input-group">
              <input type="text" className="form-control" id="majors" placeholder="Add a major"></input>
              <div className="input-group-append">
                <button className="btn btn-outline-secondary align-middle" type="button"><i className="fas fa-plus"></i></button>
              </div>
            </div>
          </div>
          <table className="table table-sm">
            <tbody>
              <tr>
                <td>Major 1</td>
                <td>
                  <button className="btn btn-outline-secondary float-right" type="button"><i className="fas fa-trash"></i></button>
                </td>
              </tr>
              <tr>
                <td>Major 2</td>
                <td>
                  <button className="btn btn-outline-secondary float-right" type="button"><i className="fas fa-trash"></i></button>
                </td>
              </tr>
              <tr>
                <td>Major 3</td>
                <td>
                  <button className="btn btn-outline-secondary float-right" type="button"><i className="fas fa-trash"></i></button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <button type="button" className="btn btn-primary">Save/Update</button>
          <button type="button" className="btn btn-danger float-right">Delete</button>
        </div>
      </div>
    </form>
    </>
  )
}

export default CollegeExpand