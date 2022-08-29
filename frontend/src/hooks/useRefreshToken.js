import { useState } from "react";

export const useRefreshToken = () => {
  const [error, setError] = useState();
  
  const RefreshAccessToken = async (refresh_token, email) => {
    const fetchConfig = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email: email, refresh_token: refresh_token})
    }

    try
    {
      const response = await fetch("localhost:5000/api/name/user/token", fetchConfig);
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