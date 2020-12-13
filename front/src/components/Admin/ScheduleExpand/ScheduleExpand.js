import React, { useState, /*useEffect*/ } from 'react';
import DatePicker from "react-datepicker";
import AdminMap from './AdminMap.js';

import "react-datepicker/dist/react-datepicker.css";
import './ScheduleExpand.css';

const ScheduleExpand = (props) => {
  const [currentEvent, /*setCurrentEvent*/] = useState({});
  const [eventDate, setEventDate] = useState(new Date());

  return (
    <>
    <form>
      <div className="row">
        <div className="col-6">
          <div className="form-group">
            <label htmlFor="eventName">Event Name</label>
            <input type="text" className="form-control" id="eventName" placeholder="Event Name"></input>
          </div>
          <div className="form-group">
            <label htmlFor="date">Date</label><br/>
            <DatePicker className="form-control date" selected={eventDate} onChange={date => setEventDate(date)} />
          </div>
          <div className="form-group">
            <label htmlFor="startTime">Start Time</label>
            <div className="input-group">
              <select className="form-control" id="startHour">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
                <option>10</option>
                <option>11</option>
                <option>12</option>
              </select>
              <select className="form-control" id="startMinute">
                <option>00</option>
                <option>05</option>
                <option>10</option>
                <option>15</option>
                <option>20</option>
                <option>25</option>
                <option>30</option>
                <option>35</option>
                <option>40</option>
                <option>45</option>
                <option>50</option>
                <option>55</option>
              </select>
              <select className="form-control" id="startAmPm">
                <option>am</option>
                <option>pm</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="endTime">End Time</label>
            <div className="input-group">
              <select className="form-control" id="endHour">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
                <option>10</option>
                <option>11</option>
                <option>12</option>
              </select>
              <select className="form-control" id="endMinute">
                <option>00</option>
                <option>05</option>
                <option>10</option>
                <option>15</option>
                <option>20</option>
                <option>25</option>
                <option>30</option>
                <option>35</option>
                <option>40</option>
                <option>45</option>
                <option>50</option>
                <option>55</option>
              </select>
              <select className="form-control" id="endAmPm">
                <option>am</option>
                <option>pm</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input type="text" className="form-control" id="location" placeholder="Location"></input>
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea type="text" className="form-control" id="description" placeholder="Description" rows="4"></textarea>
          </div>
        </div>
        <div className="col-6">
          <div className="form-group">
            <label>Click To Add Map Marker</label>
            <AdminMap height="382px" event={currentEvent} />
            {/* <div className="adminMap"></div> */}
          </div>
          <div className="form-group">
            <label>Map Markers</label>
            <table className="table table-sm">
              <thead>
                <tr>
                  <th scope="col">Latitude</th>
                  <th scope="col">Longtitude</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Lat</td>
                  <td>Lng</td>
                  <td>
                    <button className="btn btn-outline-secondary float-right" type="button"><i className="fas fa-trash"></i></button>
                  </td>
                </tr>
                <tr>
                  <td>Lat</td>
                  <td>Lng</td>
                  <td>
                    <button className="btn btn-outline-secondary float-right" type="button"><i className="fas fa-trash"></i></button>
                  </td>
                </tr>
                <tr>
                  <td>Lat</td>
                  <td>Lng</td>
                  <td>
                    <button className="btn btn-outline-secondary float-right" type="button"><i className="fas fa-trash"></i></button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
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

export default ScheduleExpand