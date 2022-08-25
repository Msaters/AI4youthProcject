import { useState } from "react";
import { useAuthContext } from '../../hooks/useAuthContext'

const BlogDetailsComponent = ({blog, setIsEditing, stateValue}) => {
    const {user} = useAuthContext();
    const handleEditClick = () =>{
        if (user) {
            setIsEditing(true);
        }
    }

    return (
        <div className="positionRelative">
            <div className="blogDetails">
                <h2>{blog.title}</h2>
                <h3>written by {blog.author}</h3>
                <p>{blog.body}</p>
            </div>  
            {stateValue() && <div className="BlogDetailsComponentEdit"><button onClick={handleEditClick}>Edit</button></div>}
        </div>
    );
}
 
export default BlogDetailsComponent;