import React, { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import Button from '@material-ui/core/Button';
import './ordered.css';
import CartItem from '../cartItem/cartItem';

function Order() {
  const [orders, setOrders] = useState([]);

  var userId = localStorage.getItem('tokenIdBusiness');
  console.log(userId, '-----');

  //find all uesers ordered items ..
  useEffect(() => {
    axios
      .get(`/order/find/${userId}`)
      .then((res) => {
        if (res.data.length !== 0) {
          console.log(res.data);
          setOrders(res.data);
        }
      })
      .catch((err) => {
        console.log(err, 'err catching data');
      });
  }, []);

  const handleClick = () => {
    var idBusiness = orders[0].resId;
    alert('confiremed!');
    for (var i = 0; i < orders.length; i++) {
      console.log(orders[i].idMeal);
      axios
        .post(`/meal/pending/${idBusiness}`, {
          mealId: orders[i].idMeal,
          UserId: userId,
          quantity: 1,
        })
        .then((res) => {
          console.log('done' + res.data);
        })
        .catch((err) => {
          console.log(err + 'err catching data');
        });
    }
    deleteAllOrders();
  };

  //refresh the basket all over again
  function deleteAllOrders() {
    var userId = localStorage.getItem('tokenIdBusiness');
    axios
      .get(`/order/removeall/${userId}`)
      .then((res) => {
        console.log('all refreshed successfully' + res.data);
      })
      .catch((err) => {
        console.log(err + 'err deleteing data');
      });
  }

  //map thro every singel item and display it
  return (
    <div>
      <div className='cards'>
        {orders.map((element, index) => {
          return (
            <div key={index}>
              <CartItem element={element} />
            </div>
          );
        })}
      </div>
      <Button variant='contained' id='btn' onClick={handleClick}>
        buy
      </Button>
      {/* <Button variant='contained' id='btn' onClick={deleteAllOrders}>
        deleteAll
      </Button> */}
    </div>
  );
}

export default Order;
