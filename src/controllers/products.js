
exports.createProduct = (req, res, next) => {
    const name = req.body.name;
    res.json(
        {
            message: 'Create Product Success',
            data: {
                id: 1,
                name: name,
                price: 8000
            }
        }
    );
}

exports.getAllProducts = (req, res, next) => {
    console.log('url :', req.originalUrl);
    console.log('method :', req.method);
    res.json(
        {
            message: 'Get All Product Success',
            data: [
                {
                    id: 1,
                    name: 'Sari gandum',
                    price: 8000
                },
                {
                    id: 1,
                    name: 'Biskuat Cokelat',
                    price: 6500
                }
            ]
        }
    );
    next();
}

exports.tesGetParram = (req, res, next) => {
    const url = req.query.name;

    console.log(url);


    // const url = require('url');
    
    // const current_url = new URL('http://usefulangle.com/preview?id=123&type=article');
    
    // console.log(current_url);
    // const search_params = current_url.searchParams;

    // const id = search_params.get('id');

    // // "123"
    // console.log(id);
    res.json(
        {
            message: 'Data dummy',
            data: [
                {
                    id: 1,
                    name: 'tes',
                    price: 5000
                }
            ]
        }
    )
    next();
}