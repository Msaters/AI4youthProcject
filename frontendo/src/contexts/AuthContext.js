import { createContext, useEffect, useReducer } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const userReducer = (state, action) => {
        switch (action.type) {
            case "LOGIN":
                localStorage.setItem("user", JSON.stringify(action.payload));
                return { user: action.payload };
            case "LOGOUT":
                localStorage.removeItem("user");
                return { user: null };
            default: 
               return state;
        }
    }

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));

        if (user) {
            dispatch({type: "LOGIN", payload: user});
        }
    }, []);

    const [state, dispatch] = useReducer(userReducer, {user: null});

    console.log("User status:", state);

    return (
        <>
            <AuthContext.Provider value={{...state, dispatch}} >
                {children}
            </AuthContext.Provider>
        </>
    )
}
