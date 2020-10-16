import React, {useState, useEffect} from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
} from "@react-google-maps/api";

const Map = (props) => {
  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  });
  const [mapRef, setMapRef] = useState(null);
  const [height, setHeight] = useState('300px');
  const [zoom, setZoom] = useState(17);
  const [center, setCenter] = useState({lat: 43.8144, lng: -111.7833});
  const [markers, setMarkers] = useState(null);
  const [options] = useState({ streetViewControl: false});

  useEffect(() => {
    setHeight(props?.height? props.height : '300px');
  }, [props.height]);
  useEffect(() => {
    setZoom(props?.zoom? props.zoom : 17);
  }, [props.zoom]);
  useEffect(() => {
    setCenter(props?.center? props.center : {lat: 43.8144, lng: -111.7833});
  }, [props.center]);
  useEffect(() => {
    setMarkers(props.event.mapSpots? props.event.mapSpots : []);
    recenterMap();
  }, [props.event.mapSpots]);

  const recenterMap = () => {
    if (mapRef && props.event.mapSpots) {
      const bounds = new window.google.maps.LatLngBounds();
      props.event.mapSpots.forEach(marker => {
        bounds.extend(new window.google.maps.LatLng(parseFloat(marker.lat), parseFloat(marker.lng)));
      });
      mapRef.fitBounds(bounds);
      mapRef.setZoom(mapRef.zoom > 18 ? 18 : mapRef.zoom);
    }
    else if (mapRef) {
      mapRef.setCenter(center);
      mapRef.setZoom(zoom);
    }
  };

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading maps";

  return (<>
  <div>
    <GoogleMap
      onLoad={map => {
        setMapRef(map);
        recenterMap();
      }}
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
        />
      ))}
    </GoogleMap>
  </div>
  </>);
}

export default Map;