import React from 'react';
import img from '../Pictures/0.jpg';
import { useState } from 'react';
import axios from 'axios';

function Res() {
  var idBusiness = 4175;
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [pic, setPic] = useState('');

  let handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`/meal/add/${idBusiness}`, {
        mealName: name,
        mealDiscription: description,
        mealAmount: amount,
        mealURL: pic,
      })
      .then((response) => {
        alert(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
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
          placeholder='Pic'
          value={pic}
          onChange={(event) => setPic(event.target.value)}
        ></input>
        <br />
        <br />
        <button onClick={handleSubmit}> Add </button>
      </div>
      <div className='addmeal' id='cards'>
        <div class='card'>
          <img src={img} alt='Avatar' style={{ width: '100%' }} />
          <div class='container1'>
            <h4>
              <b>Name</b>
            </h4>
            <p className='p'>Description</p>
          </div>
        </div>
        {/*  . . .  */}
        <br />
        <div class='card'>
          <img src={img} alt='Avatar' style={{ width: '100%' }} />
          <div class='container1'>
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
