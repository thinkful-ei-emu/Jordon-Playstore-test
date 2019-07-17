/* eslint-disable strict */

const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));
const playstore = require('./playstore');

app.get('/apps', (req, res) => {
  const sort = req.query.sort;
  const genres = req.query.genres;
  let results = playstore;
  if (genres) {
    results = playstore.filter(app => {
      return app
        .Genres
        .toLowerCase()
        .includes(genres.toLowerCase());
    });
  }

  if (sort) {
    if (!['rating', 'app'].includes(sort)) {
      res
        .status(400)
        .send('Must sort by Rating or App');
    }
    if (['rating'].includes(sort)) {
      console.log('Should sort by rating');
      results
        .sort((a, b) => {
          return b.Rating - a.Rating;
        });
    }
  }
 
  res.json(results);
  
});

module.exports = app;