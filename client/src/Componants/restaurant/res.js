import React from 'react';
import img from '../Pictures/0.jpg';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Uploadimage from '../UploadImage';

function Res() {
  var idBusiness = 4175;
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState('');
  const [pic, setPic] = useState('');
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    axios
      .get(`/meal/add/${idBusiness}`)
      .then((response) => {
        // alert(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  let handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`/meal/add/${idBusiness}`, {
        mealName: name,
        mealDiscription: description,
        mealAmount: amount,
        price: price,
        mealURL: pic,
      })
      .then((response) => {
        // alert(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let imgCallback = (imageUrl) => {
    setPic(imageUrl);
    console.log(pic);
  };

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
        <button onClick={handleSubmit}> Add </button>
      </div>
      <div className='addmeal' id='cards'>
        <div className='card'>
          <img src={img} alt='Avatar' style={{ width: '100%' }} />
          <div className='container1'>
            <h4>
              <b>Name</b>
            </h4>
            <p className='p'>Description</p>
          </div>
        </div>
        {/*  . . .  */}
        <br />
        <div className='card'>
          <img src={img} alt='Avatar' style={{ width: '100%' }} />
          <div className='container1'>
            <h4>
              <b>Name</b>
            </h4>
            <p className='p'>Description</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Res;
