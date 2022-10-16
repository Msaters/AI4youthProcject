const requireAuthBlog = async (req, res, next) => {
	//verify user authentication
	const UserID = req.user._id.toString();
	const AuthorID = req.author_id;

	//check if user trying to edit a blog is a author of that blog
	if (UserID == AuthorID)
	{
		return next();
	}
	res.status(401).json({error: 'You must be a author to edit this blog'});
}

module.exports = requireAuthBlog;