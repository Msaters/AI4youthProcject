//getBlog getBlogs createBlog deleteBlog
let blogModel = require("../Models/blogModel");

const getBlogs = async (req, res) => {
    try
    {
        const blogs = await blogModel.find({}).sort({createdAt: -1});
        res.status(200).json(blogs);
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
        const blog = await blogModel.find({_id : id});
        res.status(200).json(blog);
    }
    catch (error)
    {
        res.status(400).json({ error: error.message });
    }
}


const createBlog = async (req, res) => {
    try
    {
        const blog = await blogModel.create({ ...req.body });
        res.status(200).json(blog);
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
        const responseBlog = await blogModel.findById(id);
        res.status(200).json(responseBlog);
    }
    catch (error)
    {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    createBlog,
    getBlogs,
    getBlog,
    deleteBlog,
    patchBlog
}