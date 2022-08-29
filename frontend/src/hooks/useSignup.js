import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
    const [isLoading, setIsLoading] = useState(null);
    const [error, setError] = useState(null);
    const {dispatch} = useAuthContext();

    const signup = async (email, password) => {
        setIsLoading(true);
        try
        {
            const response = await fetch("http://localhost:5000/api/name/user/signup", {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email: email, password: password})
            })

            const json = await response.json();
            console.log(json);
            if (!response.ok)
            {
                setError(json.error);
                setIsLoading(false);
            }
            else
            {
                dispatch({type: "LOGIN", payload: {json}});
                setIsLoading(false);
            }
        }
        catch (error)
        {
            setError({error})
            setIsLoading(false);
        }
    }
    return { signup, error, isLoading };
}