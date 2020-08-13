import React, { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import Button from '@material-ui/core/Button';
import './ordered.css';
import CartItem from '../cartItem/cartItem';

function Order() {
  const [orders, setOrders] = useState([]);
  const [value, setValue] = useState([]);
  const [ele, setEle] = useState([]);

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

  const handleClick = (id) => {
    // var value = e.target.value; //id of the restraunt
    // console.log(value + '-------- value ---------');
    console.log(id);
    // console.log(value);
    // console.log(values[1][0].resId);
    // var idBusiness = value[0].resId;
    // console.log(values[0]);
    // alert('confiremed!');
    // for (var i = 0; i < values.length; i++) {
    //   if (values[i][0].resId === value.toString()) {
    //     console.log(values[i][0] + '------------');
    //   } else {
    //     console.log(true);
    //   }
    // }
    // for (var i = 0; i < value.length; i++) {
    //   console.log(value[i].idMeal);
    //   axios
    //     .post(`/meal/pending/${idBusiness}`, {
    //       mealId: value[i].idMeal,
    //       UserId: userId,
    //       quantity: 1,
    //     })
    //     .then((res) => {
    //       console.log('done' + res.data);
    //     })
    //     .catch((err) => {
    //       console.log(err + 'err catching data');
    //     });
    // }
    // deleteAllOrders();
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
  var keys = Object.keys(orders);
  var values = Object.values(orders);
  console.log(values);
  var i = 0;
  return (
    <div>
      <div className='cards'>
        {keys.map((ele) => {
          console.log(ele, '------- ele --------');
          var resturantId = ele;
          var value = orders[ele];
          i = 0;
          // console.log(orders);
          // console.log(value);
          return (
            <div>
              <div className='cards'>
                {value.map((element, index) => {
                  return (
                    <div key={index}>
                      <CartItem element={element} />
                    </div>
                  );
                })}
              </div>
              <Button
                variant='contained'
                id='btn'
                onClick={() => {
                  handleClick(value);
                }}
                class='btn'
              >
                buy
              </Button>
              {/* <Button variant='contained' id='btn' onClick={deleteAllOrders}>
                    deleteAll
                  </Button> */}
            </div>
          );
          // i = i + 1;
        })}
      </div>
    </div>
  );
}

export default Order;
