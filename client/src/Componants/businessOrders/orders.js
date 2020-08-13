import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
var token = localStorage.getItem('tokenIdBusiness');

function Orders() {
  const [counter, setCounter] = useState(0);
  const [orders, setOrders] = useState([]);
  var [clientss, setClients] = useState({});

  useEffect(() => {
    async function rendering() {
      axios
        .get(`/meal/pending/${token}`)
        .then(async (response) => {
          var clients = response.data;
          console.log(response.data);
          // setOrders(response.data);
          setClients(clients);
          clientss = clients;

          ////////////////////////////
          var x = [];
          for (var key in clientss) {
            var id = key;
            console.log(id);
            let response = await axios.get(`/user/login/${id}`);

            var user = response.data;

            var obj = {
              name: '',
              phone: 0,
              orders: [],
            };
            obj.name = user.FullName;
            obj.phone = user.Phone;
            obj.orders = clientss[key];
            x.push(obj);
          }
          
          setOrders(x);
          console.log(x);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    rendering();
  }, [orders, counter]);

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
      <p>{orders.length}</p>
    </div>
  );
}

export default Orders;
