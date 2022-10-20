const express = require('express');

const app = express();
const productRoutes = require('./src/routes/products');

// agar api kita dapat diakses di origin apapun, kita harus setup
// kalau hanya origin codepen yang diizinkan maka bisa ditambahkan spesifik
app.use((req, res, next) => {
    // res.setHeader('Access-Control-Allow-Origin', 'https://codepen.io');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTION');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
})

app.use('/', productRoutes);
// app.use('/v1', productRoutes);

app.listen(5000, ()=> {
    console.log('Server run on port 5000');
})