//getBlog getBlogs createBlog deleteBlog
let blogModel = require("../Models/blogModel");

const getBlogs = async (req, res) => {
    const user_id = req.user._id.toString();
    try
    {
        const blogs = await blogModel.find({}).sort({createdAt: -1}).limit(20);

        //filter Blogs
        let yourBlogs = [];
        let notYourBlogs = [];
        for (const blog of blogs)
        {
            const resBlog = {_id: blog._id, title: blog.title, author: blog.author, body: blog.body, comments: blog.comments, createdAt: blog.createdAt, updatedAt: blog.updatedAt}
            if (blog.user_id === user_id)
            {
                yourBlogs.push(resBlog);
            }
            else
            {
                notYourBlogs.push(resBlog);
            }
        }

        res.status(200).json({yourBlogs, notYourBlogs});
    }
    catch (error)
    {
        res.status(400).json({ error: error.message });
    }
}

const getBlog = async (req, res) => {
    const { id } = req.params;
    try
    {
        const blog = await blogModel.findById(id).select("-user_id");
        if (!blog)
        {
            return res.status(404).json({ error: "Blog not found" });
        }
        res.status(200).json(blog);
    }
    catch (error)
    {
        res.status(400).json({ error: error.message });
    }
}


const createBlog = async (req, res) => {
    const user_id = req.user._id;
    try
    {
        const blog = await blogModel.create({ ...req.body, user_id});
        const resBlog = {_id: blog._id, title: blog.title, author: blog.author, body: blog.body, comments: blog.comments, createdAt: blog.createdAt, updatedAt: blog.updatedAt}
        res.status(200).json(resBlog);
    }
    catch (error)
    {
        res.status(400).json({ error: error.message });
    }
}

const deleteBlog = async (req, res) => {
    const { id } = req.params;
    try
    {
        const blog = await blogModel.findByIdAndDelete(id);
        res.status(200).json(blog);
    }
    catch (error)
    {
        res.status(400).json({ error: error.message });
    }
}

const patchBlog = async (req, res) => {
    const { id } = req.params;
    try
    {
        const blog = await blogModel.findByIdAndUpdate(id, { ...req.body });
        const responseBlog = await blogModel.findById(id).select("-user_id");
        res.status(200).json(responseBlog);
    }
    catch (error)
    {
        res.status(400).json({ error: error.message });
    }
}

const validateBlog = (req, res) => {
    const author_id = req.author_id;
    if (req.user._id.toString() == author_id)
    {
        res.status(200).json({state: "true"});
    }
    else
    {
        res.status(200).json({state: "false", error: "You are not allowed to change this blog."});
    }
}

module.exports = {
    createBlog,
    getBlogs,
    getBlog,
    deleteBlog,
    patchBlog,
    validateBlog
}