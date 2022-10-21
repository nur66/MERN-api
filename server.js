const express = require('express');
const bodyParser = require('body-parser');  // untuk mengakses request body
const mongoose = require('mongoose');

const app = express();

const authRoutes = require('./src/routes/auth');
const blogRoutes = require('./src/routes/blog');

app.use(bodyParser.json());  // type Json

// agar api kita dapat diakses di origin apapun, kita harus setup
// kalau hanya origin codepen yang diizinkan maka bisa ditambahkan spesifik
// app.use((req, res, next) => {
//     // res.setHeader('Access-Control-Allow-Origin', 'https://codepen.io');
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTION');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
// })

app.use('/v1/auth', authRoutes);
app.use('/v1/blog', blogRoutes);

// Error global dinamis
app.use((error, req, res, next)=> {
    const status = error.errorStatus || 500;
    const message = error.message;
    const data = error.data;

    res.status(status).json({message: message, data: data});
})

mongoose.connect('mongodb+srv://Nur66:Nurlisa_2311@cluster0.0depoxh.mongodb.net/?retryWrites=true&w=majority')
.then(() => {
    app.listen(5000, ()=> {
        console.log('Server run on port 5000');
    })
})
.catch(err => console.log(err));
