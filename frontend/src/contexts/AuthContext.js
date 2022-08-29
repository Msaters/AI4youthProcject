import { createContext, useEffect, useReducer, useState } from "react";
import { useLogout } from "../hooks/useLogout";
import { useRefreshToken } from "../hooks/useRefreshToken";

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [RefreshToken, setRefreshToken] = useState(null);
    const {logout} = useLogout();
    const {RefreshAccessToken} = useRefreshToken();

    const handleLogout = (email) => {
        return new Promise(async (resolve, reject) => {
            try {
                await logout(email, RefreshToken);
                resolve();
            } catch(err) {
                reject(err);
            }
    })}

    const handleRefreshingOfAccessToken = (email) => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await RefreshAccessToken(email, RefreshToken);
                resolve(response);
            } catch(err) {
                reject(err);
            }
    })}

    const userReducer = (state, action) => {
        switch (action.type) {
            case "LOGIN":
                //makue user log in and log in on useEffect too
                const {email, accessToken, refreshToken} = action.payload.json;
                localStorage.setItem("user", JSON.stringify({email, accessToken}));
                localStorage.setItem("refreshToken", JSON.stringify({"refreshToken": refreshToken}));
                setRefreshToken(refreshToken);
                return { user: {json: {email, accessToken}} };

            case "LOGOUT":
                console.log(state, action);
                handleLogout(state.user.json.email).then(() => {
                    localStorage.removeItem("user");
                    localStorage.removeItem("refreshToken");
                    setRefreshToken(null);     
                })
                .catch(err => { console.log(err); });
                return { user: null };
                
            case "Refresh_AccessToken":
                handleRefreshingOfAccessToken(state.user.json.email).then((response) => {
                    //localStorage.removeItem("user");
                    //localStorage.setItem("user", JSON.stringify({email, accessToken}));
                    console.log(response);
                    return state;
                })
                .catch(err => { 
                    console.log(err); 
                    //TO DO SHOW THIS ERROR IN LOGOUT OR SMTHG TO CLIENT (navigate or SMTHG)
                    userReducer(null, {type: "LOGOUT"});
                });

            default: 
               return state;
        }
    }

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        const objectRefreshToken = JSON.parse(localStorage.getItem("refreshToken"));
        if (user && objectRefreshToken) {
            const {refreshToken} = objectRefreshToken;
            const {email, accessToken} = user;
            dispatch({type: "LOGIN", payload: {json: {email, accessToken, refreshToken}}});
        }
    }, []);

    const [state, dispatch] = useReducer(userReducer, {user: null});

    console.log("User status:", state);
    console.log("Refresh token:", RefreshToken);

    return (
        <>
            <AuthContext.Provider value={{...state, dispatch}} >
                {children}
            </AuthContext.Provider>
        </>
    )
}
