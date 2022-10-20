const express = require('express');

const app = express();
const productRoutes = require('./src/routes/products');

app.use('/', productRoutes);

app.listen(5000, ()=> {
    console.log('Server run on port 5000');
})