const express = require('express');
const app = express();

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

app.use('/api/entries', (req, res, next) => {
  const entries = [
    {
      id: 'lkjasdfoh',
      date: '4/2/2022',
      text: 'entry'
    },
    {
      id: 'lkjasdfoh',
      date: '4/2/2022',
      text: 'entry'
    }
  ];
  res.status(200).json(entries);
});

module.exports = app;
