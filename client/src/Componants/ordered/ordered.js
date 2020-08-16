import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import Button from "@material-ui/core/Button";
import "./ordered.css";
import CartItem from "../cartItem/cartItem";

function Order() {
  const [orders, setOrders] = useState([]);
  // const [value, setValue] = useState([]);
  // const [ele, setEle] = useState([]);

  var userId = localStorage.getItem("tokenIdBusiness");
  console.log(userId, "-----");

  //refresh the page
  function refreshPage() {
    window.location.reload(false);
  }

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
        console.log(err, "err catching data");
      });
  }, []);

  const handleClick = (id) => {
    var value = id;
    var idBusiness = value[0].resId;
    // console.log(value);
    for (var i = 0; i < value.length; i++) {
      console.log(value[i].idMeal);
      console.log(value[i].mealAmount);
      axios
        .post(`/meal/pending/${idBusiness}`, {
          mealId: value[i].idMeal,
          UserId: userId,
          quantity: value[i].mealAmount,
        })
        .then((res) => {
          console.log("done" + res.data);
          window.location.href = "/payment";
        })
        .catch((err) => {
          console.log(err + "err catching data");
        });
    }

    // deleteAllOrders(idBusiness);
    window.location.href = "/payment";
    refreshPage();
  };

  //refresh the basket all over again
  // function deleteAllOrders(resId) {
  //   var userId = localStorage.getItem("tokenIdBusiness");
  //   axios
  //     .put(`/order/remove/${userId}`, {
  //       resId: resId,
  //     })
  //     .then((res) => {
  //       console.log("all refreshed successfully" + res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err + "err deleteing data");
  //     });
  // }
  //refreshPage();
  //map thro every singel item and display it
  var keys = Object.keys(orders);
  // var values = Object.values(orders);
  // console.log(values);
  return (
    <div>
      {/* <button id='btn' variant='contained' href='/user'>
        back to restaurants
      </button> */}
      <div className="cards">
        {keys.map((ele) => {
          var totalPrice = 0;
          var value = orders[ele];
          return (
            <div>
              <div className="cards">
                {value.map((element, index) => {
                  totalPrice += element["price"] * element["mealAmount"];
                  console.log(element["price"]);
                  return (
                    <div key={index}>
                      <CartItem element={element} />
                    </div>
                  );
                  // console.log(totalPrice);
                })}
              </div>
              <h5> total price :{totalPrice}</h5>;
              <Button
                variant="contained"
                id="btn"
                onClick={() => {
                  handleClick(value);
                }}
                className="btn"
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
