const express = require('express');
const processTransaction = require('../middleware/processTransaction');
const transactionsRouter = express.Router();

transactionsRouter.post('/', processTransaction, (req, res) => {
  res.send(res.locals.data);
});

module.exports = transactionsRouter;
