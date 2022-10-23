const { validationResult } = require("express-validator");
const BlogPost = require('../models/blog');

exports.creteBlog = (req, res, next) => {

    const errors = validationResult(req);   // dia akan mengirimkan message yang telah kita tentukan di router

    // haru lakukan pengecekan sebelum get request body
    if(!errors.isEmpty()){
        const err = new Error('Input value tidak sesuai');
        err.errorStatus = 400;
        err.data = errors.array();
        throw err;
    }

    if(!req.file){
        const err = new Error('Image harus di upload');
        err.errorStatus = 422;
        err.data = errors.array();
        throw err;
    }

    const title = req.body.title;
    const image = req.file.path; // artinya kita hanya menerima URL nya saja yang kita simpan di folder images-storage
    const body = req.body.body;

    const Posting = new BlogPost({
        title: title,
        body: body,
        image: image,
        author: {uid: 1, name: 'Nur Iswanto'}
    });

    Posting.save()
    .then(result => {
        res.status(201).json({
            message: "Create blog successfully",
            data: result
        });
        // const result = {
        //     message: "Create blog successfully",
        //     data: {
        //         post_id: 1,
        //         title: "Title Blog",
        //         // image: "image.jpg",
        //         body: "Lorem ipsum is simply dummy text of the printing",
        //         created_at: "20/10/2022",
        //         author : {
        //             uuid: 1,
        //             name: "Testing"
        //         }
        //     }
        // }
        // res.status(201).json(result);
    })
    .catch(err => {
        console.log('err ', err);
    });


}

exports.getAllBlogPost = (req, res, next) => {
    BlogPost.find()
    .then(result => {
        res.status(200).json({
            message: 'Data Blog Post Berhasil dipanggil',
            data: result
        })
    })
    .catch(err => {
        next(err); // ini akan mengirimkan kedepan atau step berikutnya
        // dan akan di handle oleh middleware error global
    });
}