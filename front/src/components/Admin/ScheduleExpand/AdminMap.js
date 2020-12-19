import React, {useState, useEffect, useCallback} from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker
} from "@react-google-maps/api";

const Map = (props) => {
  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  });
  const [mapRef, setMapRef] = useState(null);
  const [height, setHeight] = useState('300px');
  const [zoom, setZoom] = useState(17);
  const [center, setCenter] = useState({lat: 43.818256, lng: -111.783633});
  const [markers, setMarkers] = useState(props?.mapSpots? props.mapSpots : []);
  const [selectedMarker, setSelectedMarker] = useState("");
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
    setMarkers(props?.mapSpots? props.mapSpots : []);
  }, [props.mapSpots]);

  useEffect(() => {
    setSelectedMarker(props?.selectedMapSpot? props.selectedMapSpot : 0);
    if (mapRef && selectedMarker !== -1) {
      var latLng = new window.google.maps.LatLng(markers[selectedMarker].lat, markers[selectedMarker].lng);
      mapRef.panTo(latLng);
    }
  }, [props.selectedMapSpot, mapRef, markers, selectedMarker]);

  const calculateMarkerColor = useCallback((index) => {
    var markerIcon = "http://maps.google.com/mapfiles/ms/icons/blue-dot.png";
    if (selectedMarker === index) {
      markerIcon = "http://maps.google.com/mapfiles/ms/icons/orange-dot.png";
    }

    return markerIcon;
  }, [selectedMarker]);

  const calculateMarkerAnimation = useCallback((index) => {
    var animation = null;
    if (selectedMarker === index) {
      animation = window.google.maps.Animation.BOUNCE;
    }

    return animation;
  }, [selectedMarker]);

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading maps";

  return (<>
  <div>
    <GoogleMap
      onLoad={map => {
        setMapRef(map);
      }}
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
        props.setMapSpots(current => [...current, {
          lat: event.latLng.lat(),
          lng: event.latLng.lng()
        }]);
      }}
    >
      {markers.map((marker, index) => (
        <Marker
          key={"marker" + index}
          position={{ lat: marker.lat, lng: marker.lng }}
          icon={calculateMarkerColor(index)}
          animation={calculateMarkerAnimation(index)}
        />
      ))}
    </GoogleMap>
  </div>
  </>);
}

export default Map;