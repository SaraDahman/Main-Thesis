import "./style.css";
import React from "react";
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";
import axios from "axios";

function Map() {
  const [markers, setMarkers] = React.useState([]);
  React.useEffect(function persistForm() {
    localStorage.setItem("lat", markers.lat);
    localStorage.setItem("lng", markers.lng);
  });

  axios
    .get("/business")
    .then(function (response) {
      // handle success
      console.log("data", response.data[1].location[0].lat);
      localStorage.setItem("dataMarkers", JSON.stringify(response.data));
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
  //display bussins places
  function displayMarkers() {
    console.log("display", JSON.parse(localStorage.getItem("dataMarkers")));
    var data = JSON.parse(localStorage.getItem("dataMarkers"));

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        localStorage.setItem("poslatitude", position.coords.latitude);
        localStorage.setItem("poslongitude", position.coords.longitude);
        setMarkers({
          lat: Number(localStorage.getItem("poslatitude")),
          lng: Number(localStorage.getItem("poslongitude")),
        });
        console.log(position.coords);
        console.log("resived");
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
    return data.map((markers, index) => {
      return (
        <div>
          <Marker
            key={index}
            id="index"
            label={{
              text: markers.BusinessName,
              fontFamily: "Arial",
              fontSize: "15px",
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

  return (
    <GoogleMap
      defaultZoom={15}
      defaultCenter={{
        lat: Number(localStorage.getItem("poslatitude")),
        lng: Number(localStorage.getItem("poslongitude")),
      }}
      defaultUO={false}
      onClick={(event) => {
        setMarkers({
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
        });
        console.log(markers);
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
    <div style={{ width: "100vw", height: "40vh" }}>
      <WrappedMap
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAzICfk_cT_rY6SjI_OHIZBABrGW7B7ars`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
      <button
        onClick={() => {
          axios
            .post("http://localhost:5000/addLocation", {
              lat: localStorage.getItem("lat"),
              lng: localStorage.getItem("lng"),
            })
            .then(function (response) {
              console.log(response);
            })
            .catch(function (error) {
              console.log(error);
            });
          console.log(localStorage.getItem("lat"), localStorage.getItem("lng"));
        }}
      >
        Save Location
      </button>
      {/* <button
        onClick={function getLocation() {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
              localStorage.setItem("poslatitude", position.coords.latitude);
              console.log(localStorage.getItem("poslatitude"));
            });
            console.log("hi");
          } else {
            alert("Geolocation is not supported by this browser.");
          }
        }}
      >
        dddd
      </button> */}
    </div>
  );
}
