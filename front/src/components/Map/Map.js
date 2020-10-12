import React, {useState, useEffect} from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

const Map = (props) => {
  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  });
  // const [mapRef, setMapRef] = useState(null);
  const [height, setHeight] = useState('300px');
  const [zoom, setZoom] = useState(15);
  const [center, setCenter] = useState({lat: 43.8144, lng: -111.7833});
  const [markers, setMarkers] = useState(null);
  const [selected, setSelected] = useState(null);
  const [options] = useState({ streetViewControl: false});

  useEffect(() => {
    setHeight(props?.height? props.height : '300px');
  }, [props.height]);
  useEffect(() => {
    setZoom(props?.zoom? props.zoom : 15);
  }, [props.zoom]);
  useEffect(() => {
    setCenter(props?.center? props.center : {lat: 43.8144, lng: -111.7833});
  }, [props.center]);
  useEffect(() => {
    setMarkers(props.event.mapSpots? props.event.mapSpots : []);
    // if (mapRef && markers !== []) {
      //Add code to find correct center for all markers
      //Add code to find a good zoom level for all markers

      //Use below function to move the map to the new center
      // mapRef.panTo({lat: 44.0000, lng: -111.0000});

      //Set the new zoom level, too;
      // setZoom(17);
    // }
  }, [props.event.mapSpots]);

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading maps";

  return (<>
  <div>
    <GoogleMap
      // onLoad={map => setMapRef(map)}
      mapContainerStyle={{
        width: '100%',
        height: height,
      }}
      zoom={zoom}
      center={center}
      options={options}
    >
      {markers.map((row, index) => (
        <Marker 
          key={"marker" + index} 
          position={{ lat: parseFloat(row.lat), lng: parseFloat(row.lng) }}
          onClick={() => {
            setSelected(row);
          }}
        />
      ))}

      {selected ? (
      <InfoWindow 
        position={{ lat: parseFloat(selected.lat), lng: parseFloat(selected.lng) }}
        onCloseClick={() => {
          setSelected(null);
        }}
      >
        <div>
          <h5>Title</h5>
          <p>Location</p>
        </div>
      </InfoWindow>) : null}
    </GoogleMap>
  </div>
  </>);
}

export default Map;