const express = require('express');
const { createBlog,
        getBlogs,
        getBlog,
        deleteBlog,
        patchBlog
} = require('../../Controller/blogControllers');

const blogRouter = express.Router();

//get blogs
blogRouter.get('/', getBlogs);

//get a blog
blogRouter.get('/:id', getBlog);

//post a new blog
blogRouter.post('/', createBlog);


//patch a blog
blogRouter.patch('/:id', patchBlog);

//delete a blog
blogRouter.delete('/:id', deleteBlog);

module.exports = blogRouter;