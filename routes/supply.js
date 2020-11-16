const express = require('express');
const supplyRouter = express.Router();
const db_con = require('../config/dbConnection');

supplyRouter.get('/', (req, res) => {
  const query = 'SELECT * FROM bahan';
  db_con.query(query, function (err, result) {
    if (err) throw err;
    let dat = [];
    for (let i in result) {
      dat.push(result[i]);
    }
    res.json(dat);
  });
});

module.exports = supplyRouter;
