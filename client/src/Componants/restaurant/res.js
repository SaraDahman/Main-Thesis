import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Uploadimage from '../UploadImage';
import swal from 'sweetalert';

function Res() {
  // localStorage.getItem("tokenIdBusiness");
  var token = localStorage.getItem('tokenIdBusiness');
  // var decoded = jwtDecode(token);

  var idBusiness = token;
  console.log('=====token===>', token);
  const [counter, setCounter] = useState(0);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState('');
  const [pic, setPic] = useState('');
  const [meals, setMeals] = useState([]);
  const [imageUrl, setImageUrl] = useState('h');

  useEffect(() => {
    axios
      .get(`/business/meal/${idBusiness}`)
      .then((response) => {
        var mealss = response.data;
        console.log(response.data);

        setMeals(mealss);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [counter]);

  // let refreshPage= () => {
  //   window.location.reload(false);
  // }

  // let handleSubmit = (e) => {
  //   e.preventDefault();

  //   axios
  //     .post(`/meal/add/${idBusiness}`, {
  //       mealName: name,
  //       mealDiscription: description,
  //       mealAmount: amount,
  //       price: price,
  //       mealURL: imageUrl,
  //     })
  //     .then((response) => {
  //       console.log(response);
  //       setCounter(counter + 1);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  /////////////////////////////////////////////////////////
  let handleImageUpload = async () => {
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

    axios
      .post(`/meal/add/${idBusiness}`, {
        mealName: name,
        mealDiscription: description,
        mealAmount: amount,
        price: price,
        mealURL: imgurl,
      })
      .then((response) => {
        // console.log(response);
        swal('NEW MEAL ADDED', 'Wohoooo', 'success');
        setCounter(counter + 1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /////////////////////////////////////////////////////////////

  let imgCallback = (imageUrl) => {
    setPic(imageUrl);
    console.log(pic);
  };

  ////////////////////////////////////////////////////////////
  let deleteMeal = (e) => {
    var id = e.target.name;
    console.log(e.target.name);
    axios
      .post(`/meal/remove/${idBusiness}`, { idMeal: id })
      .then((response) => {
        console.log(response);
        console.log('meal removed');
        axios
          .put(`/business/meal/pending/${idBusiness}`, { mealId: id })
          .then((response) => {
            console.log('all meals removed from pending');
            swal('REMOVED', 'looking forward for new meals', 'success');
            setCounter(counter + 1);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log('failed to remove', err);
      });
  };

  /////////////////////////////////////////////////////////////

  if (meals) {
    return (
      <div className='con'>
        <div className='addmeal' id='add' style={{ textAlign: 'center' }}>
          <h1>ADD MEAL</h1>
          <input
            type='text'
            placeholder='NAME'
            value={name}
            onChange={(event) => setName(event.target.value)}
          ></input>
          <br />
          <br />
          <input
            type='text'
            placeholder='DESCRIPTION'
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          ></input>
          <br />
          <br />
          <input
            type='number'
            placeholder='AMOUNT'
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
          ></input>
          <br />
          <br />
          <input
            type='text'
            placeholder='price'
            value={price}
            onChange={(event) => setPrice(event.target.value)}
          ></input>
          <br />
          <br />

          {/* UPLOAD IMAGE */}
          <main className='Image'>
            <section className='left-side'>
              <form>
                <div className='form-group'>
                  <input type='file' />
                </div>
              </form>
            </section>
            {/* <section className='right-side'>
          <p>The resulting image will be displayed here</p>
          {imageUrl && (
            <img src={imageUrl} alt={imageAlt} className='displayed-image' />
          )}
        </section> */}
          </main>

          {/* END OF UPLOAD IMAGE  */}

          {/* <Uploadimage imgurl={imgCallback} /> */}

          <br />
          <Button variant='contained' id='btn' onClick={handleImageUpload}>
            Add
          </Button>
          <br />
          <br />
          <Button variant='contained' color='secondary' href='/orders' id='btn'>
            Show Orders
          </Button>
        </div>

        {/* meeeaaalllss */}
        <div className='addmeal' id='cards'>
          {meals.map((Element, index) => {
            return (
              <div className='card' key={index}>
                <img
                  src={Element.image}
                  alt='Avatar'
                  style={{ width: '100%', height: '240px' }}
                />
                <div className='container1'>
                  <h4>
                    <b>{Element.mealName}</b>
                  </h4>
                  <p>
                    Amount :{Element.mealAmount} &nbsp; &nbsp; Price :
                    {Element.price}
                  </p>
                  <p className='p'>{Element.discription}</p>
                </div>
                <button
                  name={Element.idMeal}
                  onClick={deleteMeal}
                  style={{ backgroundColor: '#00000000' }}
                >
                  Delete
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    return (
      <div className='con'>
        <div className='addmeal' id='add'>
          <h1>ADD MEAL</h1>
          <input
            type='text'
            placeholder='NAME'
            value={name}
            onChange={(event) => setName(event.target.value)}
          ></input>
          <br />
          <br />
          <input
            type='text'
            placeholder='DESCRIPTION'
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          ></input>
          <br />
          <br />
          <input
            type='number'
            placeholder='AMOUNT'
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
          ></input>
          <br />
          <br />
          <input
            type='text'
            placeholder='price'
            value={price}
            onChange={(event) => setPrice(event.target.value)}
          ></input>
          <br />
          <Uploadimage imgurl={imgCallback} />
          <br />
          <br />
          <Button variant='contained' id='btn' onClick={handleImageUpload}>
            Add
          </Button>
          <br />
        </div>
      </div>
    );
  }
}

export default Res;
