const express = require('express');
const { createBlog,
        getBlogs,
        getBlog,
        deleteBlog,
        patchBlog,
        validateBlog
} = require('../../Controller/blogControllers');
const requireAuthBlog = require('../../middleware/Blog/requireAuthBlog');
const provideAuthor_ID = require('../../middleware/Blog/provideAuthor_ID');

const blogRouter = express.Router();

//get blogs
blogRouter.get('/', getBlogs);

//get a blog
blogRouter.get('/:id', getBlog);

//post a new blog
blogRouter.post('/', createBlog);

//add who is author of the blog to request
blogRouter.use('/:id', provideAuthor_ID);

//validate a blog's user
blogRouter.get('/:id/validate', validateBlog);

//chek if client is authorized to edit blog, if he is a author
blogRouter.use('/:id', requireAuthBlog);

//patch a blog
blogRouter.patch('/:id', patchBlog);

//delete a blog
blogRouter.delete('/:id', deleteBlog);

module.exports = blogRouter;