import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
var token = localStorage.getItem('tokenIdBusiness');

function Orders() {
  const [counter, setCounter] = useState(0);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get(`/meal/pending/${token}`)
      .then((response) => {
        var mealss = response.data;
        console.log(response.data);
        setOrders(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [counter]);

  let decrement = (e) => {
    var mealId = e.target.name;
    var amount = e.target.value;
    axios
      .post(`/business/meal/pendingOne/${token}`, {
        mealId: mealId,
        mealAmount: -amount,
      })
      .then((response) => {
        console.log();
        console.log('quantitiy updated');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className='addmeal' id='cards'>
      <h1>ORDERS</h1>
      {orders.map((Element, index) => {
        return (
          <div className='card' key={index}>
            <b>{Element.name}</b>
            <b>{Element.phone}</b>
            <img
              src={Element.meal.image}
              alt='Avatar'
              style={{ width: '100%' }}
            />
            <div className='container1'>
              <h4>
                <b>{Element.meal.mealName}</b>
                <br />
                <span>{Element.quantity}</span>
              </h4>
              {/* <p>{Element.meal.mealAmount}</p> */}
              <p className='p'>{Element.discription}</p>
            </div>
            <button
              name={Element.meal.idMeal}
              value={Element.quantity}
              onClick={decrement}
            >
              Confirm
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default Orders;
