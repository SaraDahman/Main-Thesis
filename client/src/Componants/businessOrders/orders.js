import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
var token = localStorage.getItem('tokenIdBusiness');

function Orders() {
  return (
    <div className='addmeal' id='cards'>
      <h1>ORDERS</h1>
      {/* {meals.map((Element, index) => {
            return (
              <div className='card' key={index}>
                <img
                  src={Element.image}
                  alt='Avatar'
                  style={{ width: '100%' }}
                />
                <div className='container1'>
                  <h4>
                    <b>{Element.mealName}</b>
                  </h4>
                  <p>{Element.mealAmount}</p>
                  <p className='p'>{Element.discription}</p>
                </div>
                <button name={Element.idMeal} onClick={deleteMeal}>
                  Delete
                </button>
              </div>
            );
          })} */}
    </div>
  );
}

export default Orders;
