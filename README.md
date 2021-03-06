# WS-Supplier

## Deskripsi Web Service

WS-Supplier merupakan Web Service yang menyediakan layanan milik Supplier Bahan Coklat. Terdapat dua layanan yang disediakan, yaitu layanan untuk melihat daftar bahan beserta harga, dan layanan untuk melakukan pembelian bahan. Web Service ini memiliki berbasis REST dan diimplementasikan dengan menggunakan `express.js` di atas `node.js`. URL layanan, beserta HTTP method untuk pengaksesan, yang disediakan oleh WS-Supplier adalah sebagai berikut:

1. `GET /bahan?harga={}`

Endpoint ini akan mengembalikan response dengan payload json yang berisi daftar bahan yang ada pada supplier. Apabila nilai dari query `harga` bernilai 1, maka Web Service akan mengembalikan harga supply, sedangkan jika tidak bernilai 1, Web Service tidak mengembalikan harga (hanya list nama bahan saja). Contoh payload response dalam format json adalah sebagai berikut:

`[{ id_bahan: 1, nama_bahan: "susu", harga_satuan: 5000 }, { id_bahan: 2, nama_bahan: "kacang", harga_satuan: 3000 }]`

2. `POST /transaksi`

Endpoint ini digunakan untuk menerima serta memproses permintaan pembelian bahan dari klien. Contoh payload request untuk melakukan pembelian bahan adalah sebagai berikut. buyList merupakan list dari bahan, beserta jumlah yang ingin dibeli, dan payAmount merupakan jumlah uang yang digunakan untuk pembayaran.

`{ buyList: [{nama: susu, amount: 10}, {nama: kacang, amount: 200}], payAmount: 100000 }`

Web Service akan mengembalikan response dengan payload json yang menyatakan apakah transaksi berhasil atau tidak. Jika transaksi berhasil, dan total transaksi yang dilakukan adalah 15000, maka akan dikembalikan data json berikut:

`{ status: "success", value: 15000 }`


## Deskripsi Basis Data

Basis data yang digunakan oleh WS Supplier hanya terdiri atas sebuah tabel, yaitu bahan, dengan atribut sebagai berikut.

| Nama Tabel  | Atribut |
| ------------- | ------------- |
| bahan  | (id_bahan, nama_bahan, harga_satuan)  |


## Pembagian Kerja

1. Service Transaksi : 13518017, 13518041, 13518048
2. Service Bahan : 13518017, 13518041, 13518048
