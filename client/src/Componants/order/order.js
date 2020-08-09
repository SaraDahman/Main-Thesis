import React, { useEffect } from "react";
import axios from "axios";

function Order() {
  const [orders, setOdrers] = useState([]);
  useEffect(() => {
    axios
      .get("/business/meal/5999965")
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err, "err catching data");
      });
  }, []);
  return (
    <div>
      <h1>Your Basket</h1>
      <ul></ul>
      <h1>buy</h1>
    </div>
  );
}

export default Order;
