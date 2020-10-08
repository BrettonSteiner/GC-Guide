import React from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

const libraries = ["places"];
const center = {
  lat: 43.8144,
  lng: -111.7833
}
const options = {
  streetViewControl: false,
}

const Map = (props) => {
  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading maps";

  return (<>
  <div>
    <GoogleMap
      mapContainerStyle={{
        width: '100%',
        height: props.height,
      }}
      zoom={15}
      center={center}
      options={options}
    />
  </div>
  </>);
}

export default Map;