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
  const [createMode] = useState(props?.row?.createMode? props.row.createMode : false);
  const [cancelTarget] = useState(props?.row?.cancelTarget? props.row.cancelTarget : "");
  const [eventId] = useState(props?.row?._id? props.row._id : "0");
  const [originalEventName] = useState(props?.row?.name? props.row.name : "");
  const [originalDate] = useState(props?.row?.date? new Date(props.row.date) : new Date());
  const [originalStartHour] = useState(props?.row?.startTime? calculateHour(props.row.startTime) : "-- Select --");
  const [originalStartMinute] = useState(props?.row?.startTime? calculateMinute(props.row.startTime) : "-- Select --");
  const [originalStartMeridiem] = useState(props?.row?.startTime? calculateMeridiem(props.row.startTime) : "-- Select --");
  const [originalEndHour] = useState(props?.row?.endTime? calculateHour(props.row.endTime) : "-- Select --");
  const [originalEndMinute] = useState(props?.row?.endTime? calculateMinute(props.row.endTime) : "-- Select --");
  const [originalEndMeridiem] = useState(props?.row?.endTime? calculateMeridiem(props.row.endTime): "-- Select --");
  const [originalLocation] = useState(props?.row?.location? props.row.location : "");
  const [originalDescription] = useState(props?.row?.description? props.row.description : "");
  const [originalMapSpots] = useState(props?.row?.mapSpots? props.row.mapSpots : []);
  const [eventName, setEventName] = useState(props?.row?.name? props.row.name : "");
  const [date, setDate] = useState(props?.row?.date? new Date(props.row.date) : new Date());
  const [startHour, setStartHour] = useState(props?.row?.startTime? calculateHour(props.row.startTime) : "-- Select --");
  const [startMinute, setStartMinute] = useState(props?.row?.startTime? calculateMinute(props.row.startTime) : "-- Select --");
  const [startMeridiem, setStartMeridiem] = useState(props?.row?.startTime? calculateMeridiem(props.row.startTime) : "-- Select --");
  const [endHour, setEndHour] = useState(props?.row?.endTime? calculateHour(props.row.endTime) : "-- Select --");
  const [endMinute, setEndMinute] = useState(props?.row?.endTime? calculateMinute(props.row.endTime) : "-- Select --");
  const [endMeridiem, setEndMeridiem] = useState(props?.row?.endTime? calculateMeridiem(props.row.endTime): "-- Select --");
  const [location, setLocation] = useState(props?.row?.location? props.row.location : "");
  const [description, setDescription] = useState(props?.row?.description? props.row.description : "");
  const [mapSpots, setMapSpots] = useState(props?.row?.mapSpots? props.row.mapSpots : []);
  const [selectedMapSpot, setSelectedMapSpot] = useState(-1);
  const [isAltered, setIsAltered] = useState(false);
  const [eventNameError, setEventNameError] = useState(false);
  const [dateError, setDateError] = useState(false);
  const [startTimeError, setStartTimeError] = useState(false);
  const [endTimeError, setEndTimeError] = useState(false);

  useEffect(() => {
    var hasBeenAltered = eventName !== originalEventName;
    hasBeenAltered = (!hasBeenAltered? (date? date.getTime() : null) !== originalDate.getTime() : true);
    hasBeenAltered = (!hasBeenAltered? startHour !== originalStartHour : true);
    hasBeenAltered = (!hasBeenAltered? startMinute !== originalStartMinute : true);
    hasBeenAltered = (!hasBeenAltered? startMeridiem !== originalStartMeridiem : true);
    hasBeenAltered = (!hasBeenAltered? endHour !== originalEndHour : true);
    hasBeenAltered = (!hasBeenAltered? endMinute !== originalEndMinute : true);
    hasBeenAltered = (!hasBeenAltered? endMeridiem !== originalEndMeridiem : true);
    hasBeenAltered = (!hasBeenAltered? location !== originalLocation : true);
    hasBeenAltered = (!hasBeenAltered? description !== originalDescription : true);

    if (!hasBeenAltered) {
      var sortedOriginalMapSpots = originalMapSpots.slice().sort();
      var sortedCurrentMapSpots = mapSpots.slice().sort();

      hasBeenAltered = !(sortedOriginalMapSpots.length === sortedCurrentMapSpots.length && sortedOriginalMapSpots.every(function(value, index) {
        return (value.lat === sortedCurrentMapSpots[index].lat && value.lng === sortedCurrentMapSpots[index].lng);
      }));
    }

    setIsAltered(hasBeenAltered);
  }, [
    originalEventName,
    originalDate,
    originalStartHour,
    originalStartMinute,
    originalStartMeridiem,
    originalEndHour,
    originalEndMinute,
    originalEndMeridiem,
    originalLocation,
    originalDescription,
    originalMapSpots,
    eventName,
    date,
    startHour,
    startMinute,
    startMeridiem,
    endHour,
    endMinute,
    endMeridiem,
    location,
    description,
    mapSpots
  ]);

  const resetForm = useCallback(() => {
    setEventName(originalEventName);
    setDate(originalDate);
    setStartHour(originalStartHour);
    setStartMinute(originalStartMinute);
    setStartMeridiem(originalStartMeridiem);
    setEndHour(originalEndHour);
    setEndMinute(originalEndMinute);
    setEndMeridiem(originalEndMeridiem);
    setLocation(originalLocation);
    setDescription(originalDescription);
    setMapSpots(originalMapSpots);
    setSelectedMapSpot(-1);
    setEventNameError(false);
    setDateError(false);
    setStartTimeError(false);
    setEndTimeError(false);
  }, [
    originalEventName,
    originalDate,
    originalStartHour,
    originalStartMinute,
    originalStartMeridiem,
    originalEndHour,
    originalEndMinute,
    originalEndMeridiem,
    originalLocation,
    originalDescription,
    originalMapSpots
  ]);

  const createEvent = useCallback(() => {
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
      //Call server to create event
      console.log("Create event.");
    }
  }, [eventName, date, startHour, startMinute, startMeridiem, endHour, endMinute, endMeridiem, isAltered]);

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
              placeholder="Event Name"
              defaultValue={originalEventName}
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
              defaultValue={originalDate}
              selected={date}
              onChange={date => {
                setDate(date);
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
                defaultValue={originalStartHour}
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
                defaultValue={originalStartMinute}
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
                defaultValue={originalStartMeridiem}
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
                defaultValue={originalEndHour}
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
                defaultValue={originalEndMinute}
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
                defaultValue={originalEndMeridiem}
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
              placeholder="Location"
              defaultValue={originalLocation}
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
              placeholder="Description"
              rows="4"
              defaultValue={originalDescription}
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
                              else if (selectedMapSpot > index) {
                                setSelectedMapSpot(selectedMapSpot - 1);
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
        { createMode === true
          ?
          <div className="col">
            <button type="button" className="btn btn-primary" disabled={!isAltered} onClick={() => createEvent()}>Create I-Team</button>
            <button type="reset" className="btn btn-warning admin-btn" disabled={!isAltered} onClick={() => resetForm()}>Reset</button>
            { cancelTarget !== ""?
              <button
                type="button"
                className="btn btn-danger float-right"
                data-toggle="collapse"
                data-target={"#" + cancelTarget}
                aria-controls={cancelTarget}
              >Cancel</button>
              :
              null
            }
          </div>
          :
          <div className="col">
            <button type="button" className="btn btn-primary" disabled={!isAltered} onClick={() => updateEvent()}>Save/Update</button>
            <button type="reset" className="btn btn-warning admin-btn" disabled={!isAltered} onClick={() => resetForm()}>Reset</button>
            <button type="button" className="btn btn-danger float-right" onClick={() => deleteEvent()}>Delete</button>
          </div>
        }
      </div>
    </form>
    </>
  )
}

export default ScheduleExpand