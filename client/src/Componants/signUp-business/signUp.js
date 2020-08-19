// import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
// import { positions } from "@material-ui/system";
import Button from '@material-ui/core/Button';
import './style.css';
import image from '../Pictures/pic.png';
import React, { useState } from 'react';
import axios from 'axios';
// import { Redirect } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '350px',
    },
  },
}));

function SignUp() {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [type, setType] = useState('');
  const [location, setLocation] = useState({});
  const [BusinessImage, setBusinessImage] = useState('');
  const [warning, setWarning] = useState('');
  const [warning2, setWarning2] = useState('');

  // const [imageUrlm, setImageUrl] = useState("");
  // const [imageAlt, setImageAlt] = useState("");
  //, email:'',password:'',phone:'',restPhone:'',location:''}
  //useEffect(() => {}, []);

  let handleChange = (e) => {
    // let input = e.target.value;
    if (e.target.name === 'name') {
      setName(e.target.value);
    } else if (e.target.name === 'email') {
      setEmail(e.target.value);
    } else if (e.target.name === 'phone') {
      if (
        e.target.value.length > 7 &&
        e.target.value.length < 14 &&
        e.target.value.length !== 0
      ) {
        setPhone(e.target.value);
        setWarning2('');
      } else if (e.target.value.length !== 0) {
        if (e.target.value.length < 7) {
          setPhone(e.target.value);
          setWarning2('it has to be larger than 7');
        } else {
          setPhone(e.target.value);
          setWarning2('it has to be less than 14');
        }
      } else {
        setPhone(e.target.value);
        setWarning2('');
      }
    } else if (e.target.name === 'type') {
      setType(e.target.value);
    } else if (e.target.name === 'password') {
      if (e.target.value.length < 8 && e.target.value.length !== 0) {
        setPassword(e.target.value);
        setWarning('it has to be greater than 8');
      } else {
        setWarning('');
        setPassword(e.target.value);
      }
    } else if (e.target.name === 'BusinessImage') {
      setBusinessImage(e.target.value);
    }
  };
  const history = useHistory();

  ///////////////////////////////////////////////////////////

  let handleImageUpload = async (e) => {
    e.preventDefault();

    const { files } = document.querySelector('input[type="file"]');
    const formData = new FormData();
    formData.append('file', files[0]);
    // replace this with your upload preset name
    formData.append('upload_preset', 'ml_default');
    const options = {
      method: 'POST',
      body: formData,
    };

    // return fetch(
    //   'https://api.Cloudinary.com/v1_1/teamrocket123465/image/upload',
    //   options
    // )
    var imgurl = '';
    let response = await fetch(
      'https://api.Cloudinary.com/v1_1/teamrocket123465/image/upload',
      options
    );

    let json = await response.json();
    imgurl = json.secure_url;
    // setImageUrl(url);
    console.log(imgurl);

    navigator.geolocation.getCurrentPosition(function (position) {
      /* setLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });*/
      const location = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      console.log(location);
      const phoneNum = Number(phone);
      console.log(phoneNum, typeof phoneNum, ' ---- phoneNum ------');
      axios
        .post('/business/signup', {
          BusinessName: name,
          email: email,
          password: password,
          phone: Number(phone), // static phone number because post request doesnt work
          location: location,
          type: type,
          BusinessImage: imgurl,
        })
        .then((response) => {
          console.log('success');
          console.log(response.data);
          Swal.fire('User created successfully !!');
          Swal.fire('please confirm your email to be able to sign in');

          // alert("User created successfully !!", "an Email has been sent to your account, please confirm your email to be able to sign in !");
          // const id = "" + response.data
          // setUserId(id);
          // console.log(userId, "------- user id -----")
          // alert(userId);
          axios
            .post(`/confirmEmail`, {
              userId: response.data,
              email: email,
            })
            .then(() => {
              console.log('confirmEmail is sent');
            });
          //   alert(response.data);
          localStorage.setItem('singup', 'singup');
          history.push('/sign-in');
        })
        .catch((err) => {
          console.log('err signing in!', err);
        });
      console.log('Latitude is :', position.coords.latitude);
      console.log('Longitude is :', position.coords.longitude);
    });

    setBusinessImage('');
    setName('');
    setEmail('');
    setLocation('');
    setPassword('');
    setPhone('');
    setType('');
  };

  /////////////////////////////////////////////////////////
  // let handleSubmit = (e) => {
  //   e.preventDefault();
  //   //get business location
  //   navigator.geolocation.getCurrentPosition(function (position) {
  //     /* setLocation({
  //       lat: position.coords.latitude,
  //       lng: position.coords.longitude,
  //     });*/
  //     const location = {
  //       lat: position.coords.latitude,
  //       lng: position.coords.longitude,
  //     };
  //     console.log(location);
  //     const phoneNum = Number(phone);
  //     console.log(phoneNum, typeof phoneNum, ' ---- phoneNum ------');
  //     axios
  //       .post('/business/signup', {
  //         BusinessName: name,
  //         email: email,
  //         password: password,
  //         phone: Number(phone), // static phone number because post request doesnt work
  //         location: location,
  //         type: type,
  //         BusinessImage: BusinessImage,
  //       })
  //       .then((response) => {
  //         console.log('success');
  //         console.log(response.data);
  //         Swal.fire('User created successfully !!');
  //         Swal.fire('please confirm your email to be able to sign in');

  //         // alert("User created successfully !!", "an Email has been sent to your account, please confirm your email to be able to sign in !");
  //         // const id = "" + response.data
  //         // setUserId(id);
  //         // console.log(userId, "------- user id -----")
  //         // alert(userId);
  //         axios
  //           .post(`/confirmEmail`, {
  //             userId: response.data,
  //             email: email,
  //           })
  //           .then(() => {
  //             console.log('confirmEmail is sent');
  //           });
  //         //   alert(response.data);
  //         localStorage.setItem('singup', 'singup');
  //         history.push('/sign-in');
  //       })
  //       .catch((err) => {
  //         console.log('err signing in!', err);
  //       });
  //     console.log('Latitude is :', position.coords.latitude);
  //     console.log('Longitude is :', position.coords.longitude);
  //   });

  //   setBusinessImage('');
  //   setName('');
  //   setEmail('');
  //   setLocation('');
  //   setPassword('');
  //   setPhone('');
  //   setType('');
  // };

  return (
    <div className='container1'>
      <div className='in'>
        {location.lat}
        <div className='form'>
          <form
            className={classes.root}
            id='form'
            noValidate
            autoComplete='off'
          >
            <h1>Sign Up</h1>
            <TextField
              id='standard-basic'
              label='Business name'
              type='name'
              name='name'
              value={name}
              onChange={(e) => handleChange(e)}
            />{' '}
            <br></br>
            <TextField
              id='standard-basic'
              label='Business email'
              type='email'
              name='email'
              value={email}
              onChange={(e) => handleChange(e)}
            />
            <br></br>
            <TextField
              id='standard-basic'
              label='Password'
              type='password'
              name='password'
              value={password}
              style={{ marginBottom: '0px' }}
              onChange={(e) => handleChange(e)}
            />
            <h6>{warning}</h6>
            <br></br>
            <TextField
              id='standard-basic'
              label='Business phone'
              type='name'
              name='phone'
              value={phone}
              style={{ marginBottom: '0px', marginTop: '0px' }}
              onChange={(e) => handleChange(e)}
            />
            <h6>{warning2}</h6>
            <br></br>
            <TextField
              id='standard-basic'
              label='type'
              type='name'
              name='type'
              style={{ marginTop: '0px' }}
              value={type}
              onChange={(e) => handleChange(e)}
            />
            <br></br>
            <br />
            {/* <TextField
              id='standard-basic'
              label='Business Image'
              type='text'
              name='BusinessImage'
              value={BusinessImage}
              onChange={(e) => handleChange(e)}
            /> */}
            <main className='Image'>
              <section className='left-side'>
                <form>
                  <div className='form-group'>
                    <input type='file' id='img' style={{ display: 'none' }} />
                    <label for='img'>Click me to upload image</label>
                  </div>
                </form>
              </section>
            </main>
            {/* <div className="form-group">
              <input type="file" />
            </div>
            <br></br> */}
            {/* <TextField
              id="standard-basic"
              label="Location"
              type="name"
              name="location"
              value={location}
              onChange={(e) => handleChange(e)}
            /> */}
            <br></br>
            <br></br>
            <Button variant='contained' id='btn' onClick={handleImageUpload}>
              Sign Up
            </Button>
          </form>
        </div>
      </div>
      <div className='in'>
        <img src={image} alt='' className='img'></img>
      </div>
    </div>
  );
}

export default SignUp;
