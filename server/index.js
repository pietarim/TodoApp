const express = require("express");
const tehtavaRoute = require("./controllers/tehtavaRoute");
const kayttajaLisaysRouter = require("./controllers/lisaaKayttaja");
const kirjautuminenRouter = require("./controllers/kirjauduSisaan");
const http = require("http");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

const mongodb = process.env.DBURL;
const port = process.env.PORT;

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

mongoose
  .connect(mongodb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.error("error connection to MongoDB:", error.message);
  });

const app = express();

app.use(cors(corsOptions));

app.use(express.static("build"));

app.use(express.json());

app.get("/api", (req, res) => {
  res.send("hei");
});

app.use("/api/tehtavat", tehtavaRoute);

app.use("/api/lisaaKayttaja", kayttajaLisaysRouter);

app.use("/api/kirjautuminen", kirjautuminenRouter);

const server = http.createServer(app);

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
