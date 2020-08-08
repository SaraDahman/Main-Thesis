import React from "react";
import img from "../Pictures/0.jpg";
import { useState, useEffect } from "react";
import axios from "axios";
import Uploadimage from "../UploadImage";
var jwtDecode = require("jwt-decode");
// import jwtDecode from "jwt-decode";

function Res() {
  
  // localStorage.getItem("tokenIdBusiness");
  var token = localStorage.getItem("tokenIdBusiness");
  // var decoded = jwtDecode(token);

  var idBusiness = token;
  console.log(token);
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
  }, []);

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
        <button onClick={handleSubmit}> Add </button>
      </div>

      {/* meeeaaalllss */}
      <div className="addmeal" id="cards">
        {meals.map((Element, index) => {
          return (
            <div className="card" key={index}>
              <img src={Element.image} alt="Avatar" style={{ width: "100%" }} />
              <div className="container1">
                <h4>
                  <b>{Element.mealName}</b>
                </h4>
                <p className="p">{Element.discription}</p>
              </div>
            </div>
          );
        })}
        {/*  . . .  */}
        <br />
        {/* <div className='card'>
          <img src={img} alt='Avatar' style={{ width: '100%' }} />
          <div className='container1'>
            <h4>
              <b>Name</b>
            </h4>
            <p className='p'>Description</p>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default Res;
