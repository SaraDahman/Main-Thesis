import './style.css';
import React, { useEffect } from 'react';
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
} from 'react-google-maps';
import axios from 'axios';

function Map() {
  const [markers, setMarkers] = React.useState([]);
  React.useEffect(function persistForm() {
    localStorage.setItem('lat', markers.lat);
    localStorage.setItem('lng', markers.lng);
    localStorage.setItem('userLocation', JSON.stringify(markers));
  });
  useEffect(() => {
    axios
      .get('/business')
      .then(function (response) {
        // handle success
        localStorage.setItem('dataMarkers', JSON.stringify(response.data));
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);

  var data = JSON.parse(localStorage.getItem('dataMarkers'));
  //display bussins places
  function displayMarkers() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        localStorage.setItem('poslatitude', position.coords.latitude);
        localStorage.setItem('poslongitude', position.coords.longitude);
        setMarkers({
          lat: Number(localStorage.getItem('poslatitude')),
          lng: Number(localStorage.getItem('poslongitude')),
        });
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
    if (data) {
      return data.map((markers, index) => {
        return (
          <div>
            <Marker
              key={index}
              id='index'
              label={{
                text: markers.BusinessName,
                fontFamily: 'Arial',
                fontSize: '15px',
              }}
              position={{
                lat: markers.location[0].lat,
                lng: markers.location[0].lng,
              }}
            />
          </div>
        );
      });
    }
  }

  return (
    <GoogleMap
      defaultZoom={15}
      defaultCenter={{
        lat: Number(localStorage.getItem('poslatitude')),
        lng: Number(localStorage.getItem('poslongitude')),
      }}
      defaultUO={false}
      onClick={(event) => {
        setMarkers({
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
        });
      }}
    >
      <Marker
        position={{
          lat: markers.lat,
          lng: markers.lng,
        }}
      />
      {displayMarkers()}
    </GoogleMap>
  );
}
const WrappedMap = withScriptjs(withGoogleMap(Map));
export default function GoogleMaps() {
  return (
    <div>
      <div style={{ width: '100vw', height: '60vh' }}>
        <WrappedMap
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAzICfk_cT_rY6SjI_OHIZBABrGW7B7ars`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100%` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    </div>
  );
}
