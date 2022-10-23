const { validationResult } = require("express-validator");
const BlogPost = require('../models/blog');
const path = require('path'); // untuk menghapus image di file static kita
const fs = require('fs'); // untuk remove image harus menggunakan file system

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
    const currentPage = req.query.page || 1; // kalau user tidak mengirimkan maka kita kasih default 1
    const perPage = req.query.perPage || 5;
    let totalData;

    BlogPost.find()
    .countDocuments() // untuk menghitung banyak data
    .then(count => {
        totalData = count;
        // return agar bisa masuk promise baru
        return BlogPost.find()
        .skip((currentPage - 1) * perPage)
        .limit(perPage);
    })
    .then(result => {
        res.status(200).json({
            message: 'Get All Blog Berhasil dipanggil',
            data: result,
            total_data: totalData,
            per_page: perPage,
            current_page: currentPage
        })
    })
    .catch(err => {
        next(err); // ini akan mengirimkan kedepan atau step berikutnya
        // dan akan di handle oleh middleware error global
    });


    // tak digunakan lagi
    // BlogPost.find()
    // .then(result => {
    //     res.status(200).json({
    //         message: 'Data Blog Post Berhasil dipanggil',
    //         data: result
    //     })
    // })
}

exports.getAllBlogPostById = (req, res,next) => {
    const postId = req.params.postId;
    BlogPost.findById(postId)
    .then(result => {
        // jika result tidak ditemukan
        if(!result){
            const error = new Error('Blog Post tidak ditemukan');
            error.errorStatus = 404;
            throw error;
        }

        res.status(200).json({
            message: 'Data Blog Post berhasil dipanggil',
            data: result
        })
    })
    .catch(err => {
        next(err);
    });
}

exports.updateBlogPost = (req, res, next) => {
    // const postId = req.params.postId;

    const errors = validationResult(req);

    // jika errornya tidak kosong
    if(!errors.isEmpty){
        const err = new Error('Input value tidak sesuai');
        err.errorStatus = 400;
        err.data = errors.array();
        throw err;
    }

    if(!req.file){
        const err = new Error('Image harus di upload');
        err.errorStatus = 422;
        throw err;
    }

    const postId = req.params.postId;
    const title = req.body.title;
    const image = req.file.path;
    const body = req.body.body;

    // disini akan terjadi 2 promise
    BlogPost.findById(postId)
    .then(post => {
        // jika post tidak ditemukan
        if(!post){
            const err = new Error('Blog Post tidak ditemukan');
            err.errorStatus = 404;
            throw err;
        }

        post.title = title;
        post.body = body;
        post.image = image;

        return post.save();
    })
    .then(result => {
        res.status(200).json({
            message: 'Update Berhasil dilakukan',
            data: result
        })
    })
    .catch(err => {
        next(err);
    })

}

exports.deleteBlogPost = (req, res,next) => {
    const postId = req.params.postId;

    BlogPost.findById(postId)
    .then(post => {
        if(!post){
            const error = new Error('Data tidak ditemukan');
            err.errorStatus = 404;
            throw err;
        }

        removeImage(post.image);
        return BlogPost.findByIdAndRemove(postId);
        
    })
    .then(result => {
        res.status(200).json({
            message: 'Data berhasil dihapus',
            data: result
        })
    })
    .catch(err => {
        next(err);
    })
}

// function baru untuk menghapus image
const removeImage = (filePath) => {
    console.log('filepath : ', filePath);
    console.log('dirname: ' . __dirname );

    // __dirname adalah file controller kita saat ini
    // kita akan menggabungkan dengan file images-storage, karena ada di luar folder kita 2 kali maka kita kasih ../../
    filePath = path.join(__dirname, '../../', filePath);
    fs.unlink(filePath, err => console.log(err));
}