import React, { useState, useEffect, useCallback, Fragment } from 'react';
import DatePicker from "react-datepicker";
import AdminMap from './AdminMap.js';

import "react-datepicker/dist/react-datepicker.css";
import './ScheduleExpand.css';

const calculateHour = time => {
  return time.split(":", 1)[0];
}

const calculateMinute = time => {
  var minute = time.split(":", 2)[1];
  return minute.split(" ", 1)[0];
}

const calculateMeridiem = time => {
  var meridiem = time.split(":", 2)[1];
  return meridiem.split(" ", 2)[1];
}

const ScheduleExpand = (props) => {
  const [eventId] = useState("0");
  const [eventName, setEventName] = useState(props?.name? props.name : "");
  const [date, setdate] = useState(props?.date? new Date(props.date) : new Date());
  const [startHour, setStartHour] = useState(props?.startTime? calculateHour(props.startTime) : "-- Select --");
  const [startMinute, setStartMinute] = useState(props?.startTime? calculateMinute(props.startTime) : "-- Select --");
  const [startMeridiem, setStartMeridiem] = useState(props?.startTime? calculateMeridiem(props.startTime) : "-- Select --");
  const [endHour, setEndHour] = useState(props?.endTime? calculateHour(props.endTime) : "-- Select --");
  const [endMinute, setEndMinute] = useState(props?.endTime? calculateMinute(props.endTime) : "-- Select --");
  const [endMeridiem, setEndMeridiem] = useState(props?.endTime? calculateMeridiem(props.endTime): "-- Select --");
  const [location, setLocation] = useState(props?.location? props.location : "");
  const [description, setDescription] = useState(props?.description? props.description : "");
  const [mapSpots, setMapSpots] = useState(props?.mapSpots? props.mapSpots : []);
  const [selectedMapSpot, setSelectedMapSpot] = useState(-1);
  const [isAltered, setIsAltered] = useState(false);
  const [eventNameError, setEventNameError] = useState(false);
  const [dateError, setDateError] = useState(false);
  const [startTimeError, setStartTimeError] = useState(false);
  const [endTimeError, setEndTimeError] = useState(false);

  useEffect(() => {
    var hasBeenAltered = props?.name? eventName !== props.name : true;
    hasBeenAltered = (!hasBeenAltered && props?.date? (date? date.getTime() : null) !== new Date(props.date).getTime() : true);
    hasBeenAltered = (!hasBeenAltered && props?.startTime? startHour !== calculateHour(props.startTime) : true);
    hasBeenAltered = (!hasBeenAltered && props?.startTime? startMinute !== calculateMinute(props.startTime) : true);
    hasBeenAltered = (!hasBeenAltered && props?.startTime? startMeridiem !== calculateMeridiem(props.startTime) : true);
    hasBeenAltered = (!hasBeenAltered && props?.endTime? endHour !== calculateHour(props.endTime) : true);
    hasBeenAltered = (!hasBeenAltered && props?.endTime? endMinute !== calculateMinute(props.endTime) : true);
    hasBeenAltered = (!hasBeenAltered && props?.endTime? endMeridiem !== calculateMeridiem(props.endTime) : true);
    hasBeenAltered = (!hasBeenAltered && props?.location? location !== props.location : true);
    hasBeenAltered = (!hasBeenAltered && props?.description? description !== props.description : true);

    if (!hasBeenAltered && props?.mapSpots? true : false) {
      var sortedOriginalMapSpots = props.mapSpots.slice().sort();
      var sortedCurrentMapSpots = mapSpots.slice().sort();

      hasBeenAltered = !(sortedOriginalMapSpots.length === sortedCurrentMapSpots.length && sortedOriginalMapSpots.every(function(value, index) {
        return (value.lat === sortedCurrentMapSpots[index].lat && value.lng === sortedCurrentMapSpots[index].lng);
      }));
    }

    setIsAltered(hasBeenAltered);
  }, [
    props.name,
    eventName,
    props.date,
    date,
    props.startTime,
    startHour,
    startMinute,
    startMeridiem,
    props.endTime,
    endHour,
    endMinute,
    endMeridiem,
    props.location,
    location,
    props.description,
    description,
    props.mapSpots,
    mapSpots
  ]);

  useEffect(() => {
    if (props?.startTime) {
      setStartHour(calculateHour(props.startTime));
      setStartMinute(calculateMinute(props.startTime));
      setStartMeridiem(calculateMeridiem(props.startTime));
    }
  }, [props.startTime]);

  useEffect(() => {
    if (props?.endTime) {
      setEndHour(calculateHour(props.endTime));
      setEndMinute(calculateMinute(props.endTime));
      setEndMeridiem(calculateMeridiem(props.endTime));
    }
  }, [props.endTime]);

  const updateEvent = useCallback(() => {
    var hasErrors = false;
    if (eventName === "") {
      setEventNameError(true);
      hasErrors = true;
    }

    if (date === null) {
      setDateError(true);
      hasErrors = true;
    }

    if (!((startHour === "-- Select --" && startMinute === "-- Select --" && startMeridiem === "-- Select --")
       || (startHour !== "-- Select --" && startMinute !== "-- Select --" && startMeridiem !== "-- Select --"))) {
      setStartTimeError(true);
      hasErrors = true;
    }

    if (!((endHour === "-- Select --" && endMinute === "-- Select --" && endMeridiem === "-- Select --")
       || (endHour !== "-- Select --" && endMinute !== "-- Select --" && endMeridiem !== "-- Select --"))) {
      setEndTimeError(true);
      hasErrors = true;
    }

    if (!hasErrors && isAltered) {
      //Call server to update event
      console.log("Update event.");
    }
  }, [eventName, date, startHour, startMinute, startMeridiem, endHour, endMinute, endMeridiem, isAltered]);

  const deleteEvent = useCallback(() => {
    //Call server to delete event
    console.log("Delete event.");
  }, []);

  return (
    <>
    <form>
      <div className="row">
        <div className="col-6">
          <div className="form-group">
            <label htmlFor="eventName">Event Name</label>
            <input
              type="text"
              className={eventNameError ? "form-control is-invalid" : "form-control"}
              id="eventName"
              placeholder="Event Name"
              defaultValue={eventName}
              onChange={e => {
                setEventName(e.target.value);
                if (eventNameError) {
                  setEventNameError(false);
                }
              }}>
            </input>
            <div className="invalid-feedback">
              { eventNameError ? (<>Please provide an event name.</>) : null }
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="date">Date</label><br/>
            <DatePicker
              className={dateError ? "form-control date is-invalid" : "form-control date"}
              selected={date}
              onChange={date => {
                setdate(date);
                if (dateError) {
                  setDateError(false);
                }
              }}
            />
            <div className="invalid-feedback d-block">
              { dateError ? (<>Please provide a date.</>) : null }
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="startTime">Start Time</label>
            <div className="input-group">
              <select
                className={startTimeError ? "form-control is-invalid" : "form-control"}
                id="startHour"
                defaultValue={startHour}
                onChange={e => {
                  setStartHour(e.target.value);
                  if (startTimeError) {
                    setStartTimeError(false);
                  }
                }}>
                <option>-- Select --</option>
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
              <select
                className={startTimeError ? "form-control is-invalid" : "form-control"}
                id="startMinute"
                defaultValue={startMinute}
                onChange={e => {
                  setStartMinute(e.target.value);
                  if (startTimeError) {
                    setStartTimeError(false);
                  }
                }}>
                <option>-- Select --</option>
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
              <select
                className={startTimeError ? "form-control is-invalid" : "form-control"}
                id="startMeridiem"
                defaultValue={startMeridiem}
                onChange={e => {
                  setStartMeridiem(e.target.value);
                  if (startTimeError) {
                    setStartTimeError(false);
                  }
                }}>
                <option>-- Select --</option>
                <option>am</option>
                <option>pm</option>
              </select>
            </div>
            <div className="invalid-feedback d-block">
              { startTimeError ? (<>Please fill all start time fields or none at all.</>) : null }
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="endTime">End Time</label>
            <div className="input-group">
              <select
                className={endTimeError ? "form-control is-invalid" : "form-control"}
                id="endHour"
                defaultValue={endHour}
                onChange={e => {
                  setEndHour(e.target.value);
                  if (endTimeError) {
                    setEndTimeError(false);
                  }
                }}>
                <option>-- Select --</option>
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
              <select
                className={endTimeError ? "form-control is-invalid" : "form-control"}
                id="endMinute"
                defaultValue={endMinute}
                onChange={e => {
                  setEndMinute(e.target.value);
                  if (endTimeError) {
                    setEndTimeError(false);
                  }
                }}>
                <option>-- Select --</option>
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
              <select
                className={endTimeError ? "form-control is-invalid" : "form-control"}
                id="endMeridiem"
                defaultValue={endMeridiem}
                onChange={e => {
                  setEndMeridiem(e.target.value);
                  if (endTimeError) {
                    setEndTimeError(false);
                  }
                }}>
                <option>-- Select --</option>
                <option>am</option>
                <option>pm</option>
              </select>
            </div>
            <div className="invalid-feedback d-block">
              { endTimeError ? (<>Please fill all end time fields or none at all.</>) : null }
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              className="form-control"
              id="location"
              placeholder="Location"
              defaultValue={location}
              onChange={e => {
                setLocation(e.target.value);
              }}>
            </input>
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              type="text"
              className="form-control"
              id="description"
              placeholder="Description"
              rows="4"
              defaultValue={description}
              onChange={e => {
                setDescription(e.target.value);
              }}>
            </textarea>
          </div>
        </div>
        <div className="col-6">
          <div className="form-group">
            <label>Click To Add Map Marker</label>
            <AdminMap height="382px" mapSpots={mapSpots} setMapSpots={setMapSpots} selectedMapSpot={selectedMapSpot}/>
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
                {
                mapSpots.length > 0
                ?
                mapSpots.map( (mapSpot, index) => (
                  <Fragment key={eventId + "mapSpot" + index}>
                      <tr className={selectedMapSpot === index ? "mapSpot selectedMapSpot" : "mapSpot"}>
                        <td
                          onClick={() => {
                            if (selectedMapSpot !== index) {
                              setSelectedMapSpot(index);
                            }
                            else {
                              setSelectedMapSpot(-1);
                            }
                          }}>{mapSpot.lat}</td>
                        <td
                          onClick={() => {
                            if (selectedMapSpot !== index) {
                              setSelectedMapSpot(index);
                            }
                            else {
                              setSelectedMapSpot(-1);
                            }
                          }}>{mapSpot.lng}</td>
                        <td>
                          <button
                            className="btn btn-outline-secondary float-right"
                            type="button"
                            onClick={() => {
                              setMapSpots(mapSpots.filter(row => !(row.lat === mapSpot.lat && row.lng === mapSpot.lng)));
                              if (selectedMapSpot === index) {
                                setSelectedMapSpot(-1);
                              }
                            }}>
                            <i className="fas fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                  </Fragment>
                ))
                :
                <tr>
                  <td colSpan="3" className="centered">
                    No map markers
                  </td>
                </tr>
              }
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <button type="button" className="btn btn-primary" disabled={!isAltered} onClick={() => updateEvent()}>Save/Update</button>
          <button type="button" className="btn btn-danger float-right" onClick={() => deleteEvent()}>Delete</button>
        </div>
      </div>
    </form>
    </>
  )
}

export default ScheduleExpand