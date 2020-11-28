// Middleware for handling transaction logic
const db_con = require('../config/dbConnection');

function getCostForSupply(query, amount) {
  return new Promise((resolve, reject) => {
    db_con.query(query, function (err, result) {
      if (err) {
        reject('database error');
        throw err;
      }
      console.log(result);
      cost = result[0].harga_satuan;
      console.log('cost: ', cost);
      resolve(cost * amount);
    });
  });
}

processTransaction = async function (req, res, next) {
  console.log('Transaction request: ');
  console.log(req.body);
  console.log(req.body.buyList);
  console.log(req.body.payAmount);

  let buyList = req.body.buyList;
  console.log('buyList', buyList);
  let payAmount = req.body.payAmount;

  let costList = [];
  for (let buy of buyList) {
    console.log('buy', buy);
    supplyName = buy.nama;
    supplyAmount = buy.amount;
    console.log('supply: ', supplyName, supplyAmount);
    const query = `SELECT * FROM bahan WHERE nama_bahan = '${supplyName}'`;
    const cost = await getCostForSupply(query, supplyAmount);
    costList.push(cost);
  }

  Promise.all(costList)
    .then(() => {
      const totalCost = costList.reduce((a, b) => a + b);
      console.log('totalCost: ', totalCost);
      let data = {};
      if (payAmount < totalCost) {
        // - memberikan respon jumlah uang yang kurang dan status transaksi
        const res = totalCost - payAmount;
        const status = 'failed'; // status gagal
        data = { status: status, need: res };
      } else {
        // - memberikan respon jumlah uang hasil transaksi dan status transaksi (??what is jumlah uang hasil transaksi??)
        const res = totalCost;
        const status = 'success'; // status berhasil
        data = { status: status, value: res };
      }

      res.locals.data = data;

      return next();
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = processTransaction;
