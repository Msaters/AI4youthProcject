const blogModel = require('../../Models/blogModel');

const provideAuthor_ID = async (req, res, next) => {
  //get blog by id and then
  //get author_id from a blog
	const { id } = req.params;
	try
	{
		var blog = await blogModel.findById(id);
    if (!blog)
    {
      return res.status(404).json({error:'Blog not found'});
    }
		req.author_id = blog.user_id;
		next();
	}
	catch (error)
	{
		res.status(400).json({ error: error.message });
	}
}
module.exports = provideAuthor_ID;