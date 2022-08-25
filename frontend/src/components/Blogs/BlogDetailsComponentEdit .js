import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext'

const BlogDetailsComponentEdit  = ({blog, setIsEditing, setBlog, stateValue} ) => {
    const [title, setTitle] =   useState('');
    const [author, setAuthor] = useState('');
    const [body, setBody] = useState('');
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(null);
    const {user} = useAuthContext();
    let navigator = useNavigate();

    const handleDelete = () =>{

        if (!user) 
        {
            setError("Request not authenticated");
            return;
        }

        console.log("add here are you sure?");
        fetch(`/api/name/blogs/${blog._id}`, {method: 'DELETE', headers: {'Authorization': `Bearer ${user.json.token}`}})
        .then(res => {
            console.log(res);
            if (!res.ok)
            {
                throw new Error("coudn't handle deleteing something went wrong");
            }
            
            navigator("/blogs");
        })
        .catch(error) 
        {
            setError(error);
            console.log(error);
        }
    }


    const handleEdit = async (e) =>
    {
        setIsPending(true);
        e.preventDefault();

        if (!user) 
        {
            setError("Request not authenticated");
            return;
        }

        //fetch patch
        const response = await fetch(`/api/name/blogs/${blog._id}`, 
        {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${user.json.token}` },
            body: JSON.stringify({ title: title, author: author, body: body})
        });

        const json = await response.json();
        if (!response.ok)
        {
            setError({json});
            return;
        }

        setBlog(json);
        setIsEditing(false);
    }

    useEffect(() => {
        setTitle(blog.title);
        setAuthor(blog.author);
        setBody(blog.body);
    }, []);

    return (  
        <>
        {stateValue() && 
        (<div className="positionRelative">
            <div className="blogDetails">
                { error && <h1 className="error">ERROR: {error}</h1> }
                <h1>Edditing mode</h1>
                <div className="formContainer">
                    <form className="blogCreate" onSubmit={handleEdit}>
                        <label>Title of blog</label>
                        <input 
                            type="text" value={title} onChange={(e) => {setTitle(e.target.value)}} required
                        />

                        <label>Author of blog</label>
                        <input 
                            type="text" value={author} onChange={(e) => {setAuthor(e.target.value)}} required
                        />

                        <label>Content of blog</label>
                        <textarea value={body} onChange={(e) => {setBody(e.target.value)}} required/>
                        { isPending && <button className="BlogDetailsComponentAccept" disabled>Loading...</button>}
                        { !isPending && <button className="BlogDetailsComponentAccept" type="submit">accept</button>}
                        <div className="BlogDetailsComponentDelete"><button onClick={handleDelete}>delete</button></div>
                    </form>
                </div>
            </div>
        </div>)}
        { !stateValue() && <div className="error"><h2>You must be a blog author to edit that blog</h2></div>}
        </>
    );
}
 
export default BlogDetailsComponentEdit ;