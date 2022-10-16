import { useState } from "react";

export const useRefreshToken = () => {
  const [error, setError] = useState();
  
  const RefreshAccessToken = async (payload) => {
    const {refresh_token, email} = payload;
    const fetchConfig = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({refresh_token: refresh_token, email: email})
    }

    try
    {
      const response = await fetch("http://localhost:5000/api/name/user/token", fetchConfig);

      const json = await response.json();
      if (!response.ok)
      {
        setError(json.error);
        throw Error(json.error);
      }
      
      return json;
    } catch (error) {
      setError(error);
      throw Error(error);
    }
  }

  return {RefreshAccessToken, error};
}