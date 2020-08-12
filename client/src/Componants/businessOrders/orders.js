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

  console.log(orders, '=========');

  // let deleteMeal = (e) => {
  //   var id = e.target.name;
  //   console.log(e.target.name);
  //   axios
  //     .post(`/meal/remove/${token}`, { idMeal: id })
  //     .then((response) => {
  //       console.log(response);
  //       console.log('meal removed');
  //       setCounter(counter + 1);
  //     })
  //     .catch((err) => {
  //       console.log('failed to remove', err);
  //     });
  // };

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
            <button name={Element.meal.idMeal}>Confirm</button>
          </div>
        );
      })}
    </div>
  );
}

export default Orders;
