import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import BlogDetailsComponent from "../../components/Blogs/BlogDetailComponent";
import BlogDetailsComponentEdit from "../../components/Blogs/BlogDetailsComponentEdit ";
import { useAuthContext } from '../../hooks/useAuthContext';
import stateFetch from "../../axios/stateFetch";

const BlogDetails = () => {
    const { id } = useParams();
    const [isEditing, setIsEditing] = useState(null);
    const [error, setError] = useState(null);
    const [blog, setBlog] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [state, setState] = useState(null);
    const {user} = useAuthContext();
    const {state: blogData} = useLocation();

    useEffect(() => {
        const fetchState = async () => {
            //chek if client is authenticated to edit the blog
            try {
                const response = await stateFetch(user, id);
                if (response.statusText != "OK") {
                    throw Error(response);
                }
                setState(response.data.state);
            } catch (error) {
                if (error.message === "user is not authorized to edit this blog")
                {
                    console.log("user is not authorized to edit this blog");
                    setState("false");
                    return;
                }
                setError(error);
            }
        }

        const fetchBlog = async () => {
            //get the blog data
            try {
                const response = await fetch(`/api/name/blogs/${id}`, {headers: {'Authorization': `Bearer ${user.json.token}`}});
                const json = await response.json();
                if (!response.ok) {
                    throw Error(json);
                }
                setBlog(json);
                setIsLoading(false);
            } catch (error) {
                setError(error);
                setIsLoading(false);
            }
           }
           
           //fetch all data when authorized
           if (user) {
            fetchState();
             if (blogData) {
                setBlog(blogData);
                setIsLoading(false);
             }
            else
            {
                fetchBlog();
            }
           }    
    }, [blogData, user])

    const stateValue = () => {
        return state == "true";
    }

    return ( 
        <> 
            { isLoading && <h2>Loading...</h2>}
            { error && <h1 className="error">Error: {error}</h1> }
            { !isEditing && blog && <BlogDetailsComponent blog={blog} setIsEditing={setIsEditing} stateValue={stateValue}/> }
            { isEditing && blog && <BlogDetailsComponentEdit blog={blog} setIsEditing={setIsEditing} setBlog={setBlog} stateValue={stateValue}/> }
            { !blog && <h2>Loading...</h2> }
        </>
        );
}
 
export default BlogDetails;