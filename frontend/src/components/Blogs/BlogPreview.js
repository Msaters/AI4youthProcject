const BlogPreview = ({ blog }) => {
    let snippet = "";
    let length = blog.body.length > 150 ? 150 : blog.body.length;
    for (let i = 0; i < length; i++)
    {
        snippet += blog.body[i];
    }


    return ( 
        <div className="card">
            <h2><strong>{blog.title}</strong></h2>
            <h3>written by {blog.author}</h3>
            <p>{snippet}</p>

        </div>
     );
}
 
export default BlogPreview;