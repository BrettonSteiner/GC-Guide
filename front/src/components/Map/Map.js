import React from "react";
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
  const height = props?.height? props.height : '300px';
  const zoom = props?.zoom? props.zoom : 15;
  const center = {
    lat: props?.lat? props.lat : 43.8144,
    lng: props?.lng? props.lng : -111.7833
  }
  const options = {
    streetViewControl: false,
  }
  const markers = props?.event?.mapSpots? props.event.mapSpots : [];
  const [selected, setSelected] = React.useState(null);

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
    >
      {markers.map((marker) => (
        <Marker 
          key={props.event.name + props.event.location} 
          position={{ lat: parseFloat(marker.lat), lng: parseFloat(marker.lng) }}
          onClick={() => {
            setSelected(marker);
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