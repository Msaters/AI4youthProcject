import { useState } from "react";

export const useLogout = () => {
    const [isLoading, setIsLoading] = useState(null);
    const [error, setError] = useState(null);

    const logout = async (email, refresh_token) => {
        setIsLoading(true);
        try
        {
            const response = await fetch("http://localhost:5000/api/name/user/logout", {
                method: "DELETE",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email: email, refresh_token: refresh_token})
            })

            const json = await response.json();

            if (!response.ok)
            {
                setError(json.error);
                setIsLoading(false);
                throw Error(json.error);
            }
            else
            {
                setIsLoading(false);
            }
        }
        catch (error)
        {
            setError({error})
            setIsLoading(false);
            throw Error(error);
        }
    }
    return { logout, error, isLoading };
}