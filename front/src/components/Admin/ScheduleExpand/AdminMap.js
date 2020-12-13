import React, {useState, useEffect, /*useCallback*/} from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
} from "@react-google-maps/api";

const Map = (props) => {
  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  });
  const [height, setHeight] = useState('300px');
  const [zoom, setZoom] = useState(17);
  const [center, setCenter] = useState({lat: 43.818256, lng: -111.783633});
  const [markers, setMarkers] = useState([]);
  const [options] = useState({ streetViewControl: false});

  useEffect(() => {
    setHeight(props?.height? props.height : '300px');
  }, [props.height]);

  useEffect(() => {
    setZoom(props?.zoom? props.zoom : 17);
  }, [props.zoom]);

  useEffect(() => {
    setCenter(props?.center? props.center : {lat: 43.818256, lng: -111.783633});
  }, [props.center]);

  useEffect(() => {
    setMarkers(props.event.mapSpots? props.event.mapSpots : []);
  }, [props.event.mapSpots]);

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading maps";

  return (<>
  <div>
    <GoogleMap
      mapContainerStyle={{
        width: '100%',
        height: height,
      }}
      zoom={zoom}
      center={center}
      options={options}
      onClick={(event) => {
        setMarkers(current => [...current, {
          lat: event.latLng.lat(),
          lng: event.latLng.lng()
        }]);
      }}
    >
      {markers.map((marker, index) => (
        <Marker
          key={"marker" + index}
          position={{ lat: marker.lat, lng: marker.lng }}
        />
      ))}
    </GoogleMap>
  </div>
  </>);
}

export default Map;