const express = require('express');

const app = express();
const router = express.Router();

// jika tidak spesifik idak perlu menggunakan metod route apapun
router.use('/product', (req, res, next) => {
    console.log('url :', req.originalUrl);
    console.log('method :', req.method);
    res.json({name: 'Nur', email: 'nuriswanto66@gmail.com'})
    // agar dia berlanjut ke method berikutnya maka gunakan next, agar juga tidak loading terus
    next(); // wajib
})

// jika spesifik maka tambahkan method url nya
router.get('/tes', (req, res, ext) => {
    res.json({title: 'Tes'});
    next();
})

app.use('/', router);
// sehingga ketika dijalankan localhost:5000/product akan menghasilkan console log url dan method

app.listen(5000, ()=> {
    console.log('Server run on port 5000');
})