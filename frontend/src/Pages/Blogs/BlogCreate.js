import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import {useAuthContext} from '../../hooks/useAuthContext';

const BlogCreate = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [body, setBody] = useState('');
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(null);
    const navigate = useNavigate();
    const {user} = useAuthContext();
    
    const HandleSubmit = async (e) =>
    {
        if (!user) 
        {
            setError("Request not authenticated");
            return;
        }

        setIsPending(true);
        e.preventDefault();
        //SEND FETCH TO API
        const requestOptions = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.json.accessToken}`
            },
            body: JSON.stringify({ title: title, author: author, body: body})
        };

        try{
            const response = await fetch("http://localhost:4000/api/name/blogs/", requestOptions);
            const json = await response.json();

            if (!response.ok)
            {
                console.log(json);
                throw new Error(json.error);
            }
            else
            {
                navigate("/blogs");
                setError(null);
            }
        }
        catch (error)
        {
            setError(error);
        }

        setIsPending(false);
    }

    return ( 
        <>
            { error && <h1 className="error">ERROR: {error.message}</h1> }
            <h1>Create your blog</h1>
            <div className="formContainer">
                <form className="blogCreate" onSubmit={HandleSubmit}>
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
                    { isPending && <button className="button" disabled>Loading...</button>}
                    { !isPending && <button className="button">create</button>}
                </form>
            </div>
        </>
     );
}
 
export default BlogCreate;