import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
    const [isLoading, setIsLoading] = useState(null);
    const [error, setError] = useState(null);
    const {dispatch} = useAuthContext();

    const logout = async (email, password) => {
        setIsLoading(true);
        try
        {
            dispatch({type: "LOGOUT"});
            setIsLoading(false);
        }
        catch (error)
        {
            setError({error})
            setIsLoading(false);
        }
    }
    return { logout, error, isLoading };
}