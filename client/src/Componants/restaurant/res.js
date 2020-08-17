import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Uploadimage from "../UploadImage";

function Res() {
  // localStorage.getItem("tokenIdBusiness");
  var token = localStorage.getItem("tokenIdBusiness");
  // var decoded = jwtDecode(token);

  var idBusiness = token;
  console.log("=====token===>", token);
  const [counter, setCounter] = useState(0);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [price, setPrice] = useState("");
  const [pic, setPic] = useState("");
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    axios
      .get(`/business/meal/${idBusiness}`)
      .then((response) => {
        var mealss = response.data;
        console.log(response.data);

        setMeals(mealss);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [counter]);

  // let refreshPage= () => {
  //   window.location.reload(false);
  // }

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
        console.log(response);
        setCounter(counter + 1);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  let imgCallback = (imageUrl) => {
    setPic(imageUrl);
    console.log(pic);
  };

  let deleteMeal = (e) => {
    var id = e.target.name;
    console.log(e.target.name);
    axios
      .post(`/meal/remove/${idBusiness}`, { idMeal: id })
      .then((response) => {
        console.log(response);
        console.log("meal removed");
        setCounter(counter + 1);
      })
      .catch((err) => {
        console.log("failed to remove", err);
      });
  };

  if (meals) {
    return (
      <div className="con">
        <div className="addmeal" id="add" style={{ textAlign: "center" }}>
          <h1>ADD MEAL</h1>
          <input
            type="text"
            placeholder="NAME"
            value={name}
            onChange={(event) => setName(event.target.value)}
          ></input>
          <br />
          <br />
          <input
            type="text"
            placeholder="DESCRIPTION"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          ></input>
          <br />
          <br />
          <input
            type="number"
            placeholder="AMOUNT"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
          ></input>
          <br />
          <br />
          <input
            type="text"
            placeholder="price"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
          ></input>
          <br />
          <br />
          <Uploadimage imgurl={imgCallback} />

          <br />
          <Button variant="contained" id="btn" onClick={handleSubmit}>
            Add
          </Button>
          <br />
          <br />
          <Button variant="contained" color="secondary" href="/orders" id="btn">
            Show Orders
          </Button>
        </div>

        {/* meeeaaalllss */}
        <div className="addmeal" id="cards">
          {meals.map((Element, index) => {
            return (
              <div className="card" key={index}>
                <img
                  src={Element.image}
                  alt="Avatar"
                  style={{ width: "100%", height: "240px" }}
                />
                <div className="container1">
                  <h4>
                    <b>{Element.mealName}</b>
                  </h4>
                  <p>
                    Amount :{Element.mealAmount} &nbsp; &nbsp; Price :
                    {Element.price}
                  </p>
                  <p className="p">{Element.discription}</p>
                </div>
                <Button name={Element.idMeal} onClick={deleteMeal}>
                  Delete
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    return (
      <div className="con">
        <div className="addmeal" id="add">
          <h1>ADD MEAL</h1>
          <input
            type="text"
            placeholder="NAME"
            value={name}
            onChange={(event) => setName(event.target.value)}
          ></input>
          <br />
          <br />
          <input
            type="text"
            placeholder="DESCRIPTION"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          ></input>
          <br />
          <br />
          <input
            type="number"
            placeholder="AMOUNT"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
          ></input>
          <br />
          <br />
          <input
            type="text"
            placeholder="price"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
          ></input>
          <br />
          <Uploadimage imgurl={imgCallback} />
          <br />
          <br />
          <Button variant="contained" id="btn" onClick={handleSubmit}>
            Add
          </Button>
          <br />
        </div>
      </div>
    );
  }
}

export default Res;
