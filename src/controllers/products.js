exports.createProduct = (req, res, next) => {
    res.json(
        {
            message: 'Create Product Success',
            data: {
                id: 1,
                name: 'Sari gandum',
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