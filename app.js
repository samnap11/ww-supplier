const express = require("express");
const dotenv = require("dotenv");
const mysql = require("mysql");
const bodyParser = require("body-parser");

dotenv.config();

const db_con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db_con.connect(function(err) {
    if (err) throw err;
    console.log("database connected!");
});

const app = express();

app.use(bodyParser.json());

// Testing
app.get("/url", (req, res, next) => {
    res.json(["Silverqueen", "500"]);
});

//-------------------------------TRANSACTION----------------------------------------//


// Middleware for handling transaction logic
processTransaction = function (req, res, next) {
    console.log("Transaction request: ");
    console.log(req.body);
    console.log(req.body.buyList);
    console.log(req.body.payAmount);

    let buyList = req.body.buyList;
    console.log("buyList", buyList);
    let payAmount = req.body.payAmount;
    let totalCost = 0;
    

    for (let buy of buyList) {
        console.log("buy", buy);
        supplyName = buy.nama;
        supplyAmount = buy.amount;
        console.log("supply: ", supplyName, supplyAmount);
        const query = `SELECT * FROM bahan WHERE nama_bahan = '${supplyName}'`;
        db_con.query(query, function(err, result) {
            if(err) throw err;
            console.log(result);
            cost = result[0].harga_satuan;
            console.log("cost: ", cost);
            totalCost += cost * supplyAmount;
        })
    }

    console.log("totalCost: ", totalCost);

    let data = {};
    if (payAmount < totalCost) {
        // - memberikan respon jumlah uang yang kurang dan status transaksi
        const res = totalCost - payAmount;
        const status = "failed"; // status gagal
        data = {"status": status, "need": res,};
    } else {
        // - memberikan respon jumlah uang hasil transaksi dan status transaksi (??what is jumlah uang hasil transaksi??)
        const res = totalCost;
        const status = "success"; // status berhasil
        data = {"status": status, "value": res,};
    }

    res.locals.data = data;

    return next();
}

// Melakukan transaksi bahan dengan Factory Management Pro
// a. Input yang diberikan adalah jumlah uang yang dimiliki, daftar bahan yang ingin dibeli, beserta jumlahnya
// b. Apabila uang cukup, layanan memberikan respon jumlah uang hasil transaksi beserta status berhasil
// c. Apabila uang tidak cukup, layanan memberikan respon jumlah uang yang kurang
//    agar transaksi berhasil beserta status gagal.
// (Note)
// Request dikirim dalam format JSON dalam bentuk berikut:
// {
//     buyList: [
//         {nama: susu, amount: 10},
//         {nama: kacang, amount: 200}
//     ],
//     payAmount: 100000     
// }

app.post("/api/txn", processTransaction, (req, res) => {
    res.json(res.locals.data);
});

//-------------------------------END OF TRANSACTION----------------------------------------//


//-------------------------------QUERY SUPPLY----------------------------------------//

// Memberikan daftar bahan yang dijual
// Menerima request dari factory management program
// Mengembalikan data berisi daftar bahan-bahan yang ada
// Bisa beserta harga, dan bisa tanpa harga (ide: either dikirim via request di json, atau ditangani client aja langsung)
app.get("/bahan", (req, res) => {
    const query = 'SELECT * FROM bahan';
    db_con.query(query, function(err, result) {
        if(err) throw err;
        let dat = [];
        for (let i in result) {
            dat.push(result[i]);
        }
        res.json(dat);
    })
});

//-------------------------------END OF QUERY SUPPLY----------------------------------------//

app.listen(process.env.PORT, () => {
    console.log("Server ws supplier is running on port")
});