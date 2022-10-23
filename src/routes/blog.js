const express = require('express');
const { body } = require('express-validator');

const router = express.Router();

const blogController = require('../controllers/blog');

router.post('/post', [
        body('title').isLength({min: 5}).withMessage('Input title minimal 5 character'),
        body('body').isLength({min: 5}).withMessage('Input body minimal 5 character'),
    ],
    blogController.creteBlog);

// Gunakan pagination
// router.get('/posts?page=1&perPage=5', blogController.getAllBlogPost); // param query nya biar user yang kirim
router.get('/posts', blogController.getAllBlogPost);

router.get('/post/:postId', blogController.getAllBlogPostById);

router.patch('/post/:postId', [
    body('title').isLength({min: 5}).withMessage('Input title minimal 5 character'),
    body('body').isLength({min: 5}).withMessage('Input body minimal 5 character'),
    ],
    blogController.updateBlogPost);

router.delete('/post/:postId', blogController.deleteBlogPost);

module.exports = router;