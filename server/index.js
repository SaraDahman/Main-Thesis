const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const keys = require("../config/keys");
const links = require("./../middleware/router");
const cors = require("cors");
app.use(express.json());

// connect to database
mongoose
  .connect(keys.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Database is connected to digital Page");
  })
  .catch((error) => {
    console.log("Error In Database Connection");
  });
app.use(cors());
app.use("/", links);

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"));
  });
}

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
