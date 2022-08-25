import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BlogPreview from "../../components/Blogs/BlogPreview"
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';

const Blogs = () => {
    const [notYourBlogs, setNotYourBlogs] = useState(null);
    const [yourBlogs, setYourBlogs] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const {user} = useAuthContext();

    useEffect(() => {
       const fetchBlogs = async () => {
        try {
            const response = await fetch("/api/name/blogs/", {headers: {'Authorization': `Bearer ${user.json.token}`}});
            const json = await response.json();
            if (!response.ok) {
                throw Error(json);
            }
            setYourBlogs(json.yourBlogs);
            setNotYourBlogs(json.notYourBlogs);
            setIsLoading(false);
        } catch (error) {
            setError(error);
            setIsLoading(false);
        }
       }

       if (user)
       {
        fetchBlogs();
       }
    }, [user]);

    const handleClickToBlogDetails = (blog) => {
        navigate(`/blogs/${blog._id}`, {state: blog});
    }

    return ( 
    <main>
        { isLoading && <h2>Loading...</h2>}
        { error && <div className="error">{error}</div> }
        { yourBlogs && 
        (<div className="yourBlogs">
            <h2>Your Blogs</h2>
            {yourBlogs.map((blog) => (<article key={blog._id} onClick={() => handleClickToBlogDetails(blog)}><BlogPreview blog={blog} /></article>))}
        </div>)}

        { notYourBlogs && 
        (<div className="notYourBlogs">
            <h2>Popular Blogs</h2>
            {notYourBlogs.map((blog) => (<article key={blog._id} onClick={() => handleClickToBlogDetails(blog)}><BlogPreview blog={blog} /></article>))}
        </div>)}

        <div className="addBlogLink">
            <h2>Write your own blog</h2>
            <h1><Link to={"/blogs/create"}>+</Link></h1>
        </div>
    </main> );
}
 
export default Blogs;