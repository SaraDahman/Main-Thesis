// import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { positions } from "@material-ui/system";
import Button from "@material-ui/core/Button";
import "./style.css";
import image from "../Pictures/pic.png";
import React, { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "350px",
    },
  },
}));

function SignUp() {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");
  const [BusinessImage, setBusinessImage] = useState("");
  // const [imageUrlm, setImageUrl] = useState("");
  // const [imageAlt, setImageAlt] = useState("");
  //, email:'',password:'',phone:'',restPhone:'',location:''}

  let handleChange = (e) => {
    // let input = e.target.value;
    if (e.target.name === "name") {
      setName(e.target.value);
    } else if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "phone") {
      setPhone(e.target.value);
    } else if (e.target.name === "type") {
      setType(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    } else if (e.target.name === "BusinessImage") {
      setBusinessImage(e.target.value);
    }
  };
  const history = useHistory();

  let handleSubmit = (e) => {
    // e.preventDefault();
    //get business location
    navigator.geolocation.getCurrentPosition(function (position) {
      setLocation([
        {
          Lat: position.coords.latitude,
          lng: position.coords.longitude,
        },
      ]);
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
    });
    axios
      .post("/business/signup", {
        BusinessName: name,
        email: email,
        password: password,
        phone: phone,
        location: location,
        type: type,
        BusinessImage: BusinessImage,
      })
      .then((response) => {
        console.log(response.data);
        alert(response.data);
        history.push("/res");
      })
      .catch((err) => {
        console.log("err signing in!", err);
      });
    setBusinessImage("");
    setName("");
    setEmail("");
    setLocation("");
    setPassword("");
    setPhone("");
    setType("");
  };

  return (
    <div className="container1">
      <div className="in">
        <div className="form">
          <form
            className={classes.root}
            id="form"
            noValidate
            autoComplete="off"
          >
            <h1>Sign Up</h1>
            <TextField
              id="standard-basic"
              label="Business name"
              type="name"
              name="name"
              value={name}
              onChange={(e) => handleChange(e)}
            />{" "}
            <br></br>
            <TextField
              id="standard-basic"
              label="Business email"
              type="email"
              name="email"
              value={email}
              onChange={(e) => handleChange(e)}
            />
            <br></br>
            <TextField
              id="standard-basic"
              label="Password"
              type="password"
              name="password"
              value={password}
              onChange={(e) => handleChange(e)}
            />
            <br></br>
            <TextField
              id="standard-basic"
              label="Business phone"
              type="name"
              name="phone"
              value={phone}
              onChange={(e) => handleChange(e)}
            />
            <br></br>
            <TextField
              id="standard-basic"
              label="type"
              type="name"
              name="type"
              value={type}
              onChange={(e) => handleChange(e)}
            />
            <br></br>
            <TextField
              id="standard-basic"
              label="Business Image"
              type="text"
              name="BusinessImage"
              value={BusinessImage}
              onChange={(e) => handleChange(e)}
            />
            {/* <div className="form-group">
              <input type="file" />
            </div>
            <br></br> */}
            <TextField
              id="standard-basic"
              label="Location"
              type="name"
              name="location"
              value={location}
              onChange={(e) => handleChange(e)}
            />
            <br></br>
            <br></br>
            <Button variant="contained" id="btn" onClick={handleSubmit}>
              Sign Up
            </Button>
          </form>
        </div>
      </div>
      <div className="in">
        <img src={image} alt="" className="img"></img>
      </div>
    </div>
  );
}

export default SignUp;
