const express = require('express');
require('./config/dbConnection');
const bodyParser = require('body-parser');
const supplyRouter = require('./routes/supply');
const transactionsRouter = require('./routes/transaction');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use('/supply', supplyRouter);
app.use('/transactions', transactionsRouter);

// Testing
app.get('/', (req, res, next) => {
  coklat = {
    nama: 'Silverqueen',
    harga: 500,
  };
  res.send(coklat);
});

//-------------------------------TRANSACTION----------------------------------------//

// Melakukan transaksi bahan dengan Factory Management Pro
// a. Input yang diberikan adalah jumlah uang yang dimiliki, daftar bahan yang ingin dibeli, beserta jumlahnya
// b. Apabila uang cukup, layanan memberikan respon jumlah uang hasil transaksi beserta status berhasil
// c. Apabila uang tidak cukup, layanan memberikan respon jumlah uang yang kurang
//    agar transaksi berhasil beserta status gagal.
// (Note)
// a. Middleware processTransaction digunakan untuk handle transaction logic
// b. Request dikirim oleh client ke API dalam format JSON dalam bentuk berikut:
// {
//     buyList: [
//         {nama: susu, amount: 10},
//         {nama: kacang, amount: 200}
//     ],
//     payAmount: 100000
// }

//-------------------------------END OF TRANSACTION----------------------------------------//

//-------------------------------QUERY SUPPLY----------------------------------------//

// Memberikan daftar bahan yang dijual
// Menerima request dari factory management program
// Mengembalikan data berisi daftar bahan-bahan yang ada
// Bisa beserta harga, dan bisa tanpa harga

// TODO: nentuin di mana info pake harga atau ngga itu diletakkan,
//      (ide: either dikirim via request di json, atau ditangani si client aja langsung)

//-------------------------------END OF QUERY SUPPLY----------------------------------------//

app.listen(process.env.PORT, () => {
  console.log(`Server ws supplier is running on port ${process.env.PORT}`);
});
