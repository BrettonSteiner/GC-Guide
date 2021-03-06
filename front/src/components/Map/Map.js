import React, {useState, useEffect, useCallback} from "react";
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
  const [center, setCenter] = useState({lat: 43.818256, lng: -111.783633});
  const [markers, setMarkers] = useState(null);
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
  
  const recenterMap = useCallback(() => {
    if (mapRef && props.event.mapSpots && props.event.mapSpots.length) {
      const bounds = new window.google.maps.LatLngBounds();
      if (props.event.mapSpots.length === 1) {
        var marker = props.event.mapSpots[0];
        bounds.extend(new window.google.maps.LatLng(parseFloat(marker.lat) + 0.0005, parseFloat(marker.lng) + 0.0005));
        bounds.extend(new window.google.maps.LatLng(parseFloat(marker.lat) - 0.0005, parseFloat(marker.lng) - 0.0005));
      }
      else if (props.event.mapSpots.length > 1) {
        props.event.mapSpots.forEach(marker => {
          bounds.extend(new window.google.maps.LatLng(parseFloat(marker.lat), parseFloat(marker.lng)));
        });
      }
      mapRef.fitBounds(bounds);
      mapRef.setZoom(mapRef.zoom > 18 ? 18 : mapRef.zoom);
    }
    else if (mapRef) {
      mapRef.setCenter(center);
      mapRef.setZoom(zoom);
    }
  }, [center, mapRef, props.event.mapSpots, zoom]);

  useEffect(() => {
    setMarkers(props.event.mapSpots? props.event.mapSpots : []);
    recenterMap();
  }, [props.event.mapSpots, recenterMap]);

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