const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Entry = require('./models/entry');

const app = express();

mongoose.connect('mongodb://localhost:27017/final')
  .then(() => {
    console.log('connected to database');
  });

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PATCH, DELETE, OPTIONS'
    );
  next();
});

app.post('/api/entries', (req, res, next) => {
  const entry = new Entry({
    date: req.body.date,
    text: req.body.text
  });
  entry.save().then(newEntry => {
    res.status(201).json({
      entryId: newEntry._id
    });
  });
});

app.get('/api/entries', (req, res, next) => {
  Entry.find()
    .then(entries => {
      res.status(200).json(entries);
    })
    .catch(error => {
      console.log(error);
    });
});

app.delete('/api/entries/:id', (req, res, next) => {
  console.log(req.params);
  Entry.deleteOne({_id: req.params.id})
    .then(result => {
      console.log(result);
      res.status(200).json({message: 'post deleted'});
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = app;
