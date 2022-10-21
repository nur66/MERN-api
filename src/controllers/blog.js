const { validationResult } = require("express-validator");

exports.creteBlog = (req, res, next) => {
    const title = req.body.title;
    const image = req.body.image;
    const body = req.body.body;

    const errors = validationResult(req);   // dia akan mengirimkan message yang telah kita tentukan di router

    // kalo ada error dia akan bernilai false
    // jika errornya tidak kosong maka...
    // if(!errors.isEmpty()){
    //     res.status(400).json({
    //         message: "Request body error",
    //         data: null
    //     })
    // }

    if(!errors.isEmpty()){
        const err = new Error('Input value tidak sesuai');
        err.errorStatus = 400;
        err.data = errors.array();
        throw err;
    }

    const result = {
        message: "Create blog successfully",
        data: {
            post_id: 1,
            title: "Title Blog",
            // image: "image.jpg",
            body: "Lorem ipsum is simply dummy text of the printing",
            created_at: "20/10/2022",
            author : {
                uuid: 1,
                name: "Testing"
            }
        }
    }

    res.status(201).json(result);
}