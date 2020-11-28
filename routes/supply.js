const express = require('express');
const supplyRouter = express.Router();
const db_con = require('../config/dbConnection');

supplyRouter.get('/', (req, res) => {
  
  harga = req.query.harga;
  let query = '';
  if (harga === '0') {
    query = 'SELECT id_bahan, nama_bahan FROM bahan';  
  } else if (harga === '1') {
    query = 'SELECT * FROM bahan'; 
  } else {
    console.log('invalid value of query parameter')
  }
  
  //const query = 'SELECT id_bahan, nama_bahan FROM bahan';
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
