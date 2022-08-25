import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
    const [isLoading, setIsLoading] = useState(null);
    const [error, setError] = useState(null);
    const {dispatch} = useAuthContext();

    const login = async (email, password) => {
        setIsLoading(true);
        try
        {
            const response = await fetch("/api/name/user/login", {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email: email, password: password})
            })

            const json = await response.json();

            if (!response)
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
    return { login, error, isLoading };
}