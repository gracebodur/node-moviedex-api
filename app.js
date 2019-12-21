require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const validMovies = require("./moviedex.json");
const cors = require("cors");
const helmet = require("helmet");
const app = express();
const morganSetting = process.env.NODE_ENV === "production" ? "tiny" : "common";

app.use(morgan(morganSetting));
app.use(cors());
app.use(helmet());

app.use((error, req, res, next) => {
  let response;
  if (process.env.NODE_ENV === "production") {
    response = { error: { message: "server error" } };
  } else {
    response = { error };
  }
  res.status(500).json(response);
});

app.use(function authorize(req, res, next) {
  const TOKEN = process.env.API_TOKEN;
  const token = req.header("Authorization").split(" ")[1];

  if (token === TOKEN) {
    next();
  } else {
    res.sendStatus(401);
  }
});

app.get("/movie", function handleGetMovies(req, res) {
  let response = validMovies;
  if (req.query.genre) {
    response = response.filter(movie =>
      movie.genre.toLowerCase().includes(req.query.genre.toLowerCase())
    );
  }
  if (req.query.country) {
    response = response.filter(movie =>
      movie.country.toLowerCase().includes(req.query.country.toLowerCase())
    );
  }
  if (req.query.avg_vote) {
    response = response.filter(
      movie => Number(movie.avg_vote) >= Number(req.query.avg_vote)
    );
  }
  res.json(response);
});

module.exports = app;
