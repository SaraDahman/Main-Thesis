import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
// import Uploadimage from '../UploadImage';
import swal from 'sweetalert';
function Res() {
  var token = localStorage.getItem('tokenIdBusiness');
  var idBusiness = token;
  const [counter, setCounter] = useState(0);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState('');
  // const [pic, setPic] = useState('');
  const [meals, setMeals] = useState([]);
  //   const [imageUrl, setImageUrl] = useState('h');
  const [mealData, setMealData] = useState({})

  useEffect(() => {
    axios
      .get(`/business/meal/${idBusiness}`)
      .then((response) => {
        var mealss = response.data;
        setMeals(mealss);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [counter]);

  /////////////////////////////////////////////////////////
  let handleImageUpload = async () => {
    if (name === '' || description === '' || amount === '' || price === '') {
      swal({
        title: 'Please fill in the fields',
        icon: 'warning',
      });
    } else {
      const { files } = document.querySelector('input[type="file"]');
      const formData = new FormData();
      formData.append('file', files[0]);
      // replace this with your upload preset name
      formData.append('upload_preset', 'ml_default');
      const options = {
        method: 'POST',
        body: formData,
      };

      var imgurl = '';
      let response = await fetch(
        'https://api.Cloudinary.com/v1_1/teamrocket123465/image/upload',
        options
      );

      let json = await response.json();
      imgurl = json.secure_url;
      axios
        .post(`/meal/add/${idBusiness}`, {
          mealName: name,
          mealDiscription: description,
          mealAmount: amount,
          price: price,
          mealURL: imgurl,
        })
        .then((response) => {
          swal('NEW MEAL ADDED', 'Wohoooo', 'success');
          setCounter(counter + 1);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    setName('')
    setAmount('')
    setDescription('')
    setPrice('')
  };

  /////////////////////////////////////////////////////////////

  // let imgCallback = (imageUrl) => {
  // 	setPic(imageUrl);
  // };

  ////////////////////////////////////////////////////////////
  let deleteMeal = (e) => {
    var id = e.target.name;
    axios
      .post(`/meal/remove/${idBusiness}`, { idMeal: id })
      .then((response) => {
        axios
          .put(`/business/meal/pending/${idBusiness}`, { mealId: id })
          .then((response) => {
            swal('REMOVED', 'looking forward for new meals', 'success');
            setCounter(counter + 1);
          });
      })
      .catch((err) => {
        console.log('failed to remove', err);
      });
  };

  let edit = (data) => {
    setName(data.mealName)
    setDescription(data.discription)
    setAmount(data.mealAmount)
    setPrice(data.price)
    setMealData(data)
  }

  let update = () => {
    var mealid = mealData.idMeal
    console.log(mealid);
  }
  /////////////////////////////////////////////////////////////

  if (meals) {
    return (
      <div className='con'>
        <div
          className='addmeal'
          id='add'
          style={{
            textAlign: 'center',
          }}
        >
          <h1>ADD MEAL</h1>
          <input
            className='restaurant'
            type='text'
            placeholder='NAME'
            value={mealData.mealName ? mealData.mealName : name}
            onChange={mealData.mealName ? (event) => {
              setMealData({ ...mealData, mealName: event.target.value })
              setName(event.target.value)
            } : (event) => setName(event.target.value)}
            required
          ></input>
          <br />
          <br />
          <input
            className='restaurant'
            type='text'
            placeholder='DESCRIPTION'
            value={mealData.discription ? mealData.discription : description}
            onChange={mealData.discription ? (event) => {
              setMealData({ ...mealData, discription: event.target.value })
              setDescription(event.target.value)
            } : (event) => setDescription(event.target.value)}

          // onChange={(event) => setDescription(event.target.value)}
          ></input>
          <br />
          <br />
          <input
            className='restaurant'
            type='number'
            placeholder='AMOUNT'
            value={mealData.mealAmount ? mealData.mealAmount : amount}
            onChange={mealData.mealAmount ? (event) => {
              setMealData({ ...mealData, mealAmount: event.target.value })
              setAmount(event.target.value)
            } : (event) => setAmount(event.target.value)}

          // onChange={(event) => setAmount(event.target.value)}
          ></input>
          <br />
          <br />
          <input
            className='restaurant'
            type='number'
            placeholder='price USD'
            value={mealData.price ? mealData.price : price}
            onChange={mealData.price ? (event) => {
              setMealData({ ...mealData, price: event.target.value })
              setPrice(event.target.value)
            } : (event) => setPrice(event.target.value)}

          // onChange={(event) => setPrice(event.target.value)}
          ></input>
          <br />
          <br />

          {/* UPLOAD IMAGE */}

          <div className='form-group'>
            <input type='file' id='img' style={{ display: 'none' }} />
            <label for='img' className='restaurant'>
              Click me to upload image
                  </label>
          </div>

          <br />
          <Button
            variant='contained'
            id='btn'
            style={{ marginRight: '10px' }}
            onClick={update}
          >
            Update
          </Button>
          <Button
            variant='contained'
            id='btn'
            onClick={handleImageUpload}
            style={{ marginRight: '10px' }}
          >
            Add
          </Button>
          <Button variant='contained' color='secondary' href='/orders' id='btn'>
            Show Orders
          </Button>
        </div>
        <div className='addmeal' id='cards'>
          {meals.map((Element, index) => {
            return (
              <div className='card' key={index} onClick={(e) => { edit(Element) }}>
                <img
                  src={Element.image}
                  alt='Avatar'
                  style={{ width: '100%', height: '240px' }}
                />
                <div className='container1' >
                  <h4>
                    <b>{Element.mealName}</b>
                  </h4>
                  <p>
                    Amount :{Element.mealAmount} &nbsp; &nbsp; Price :
                    {Element.price} $
                  </p>
                  <p className='p'>{Element.discription}</p>
                </div>
                <button
                  name={Element.idMeal}
                  onClick={deleteMeal}
                  style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    fontSize: '20px',
                  }}
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
            className='restaurant'
            type='text'
            placeholder='NAME'
            value={name}
            onChange={(event) => setName(event.target.value)}
          ></input>
          <br />
          <br />
          <input
            className='restaurant'
            type='text'
            placeholder='DESCRIPTION'
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          ></input>
          <br />
          <br />
          <input
            className='restaurant'
            type='number'
            placeholder='AMOUNT'
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
          ></input>
          <br />
          <br />
          <input
            className='restaurant'
            type='number'
            placeholder='price USD'
            value={price}
            onChange={(event) => setPrice(event.target.value)}
          ></input>
          <br />
          <br />
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
