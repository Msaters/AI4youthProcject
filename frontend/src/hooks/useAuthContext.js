import { AuthContext } from "../contexts/AuthContext"
import { useContext } from "react"

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    console.log('useAuthContextt must be used inside a AuthContextProvider');
    throw Error('useAuthContextt must be used inside a AuthContextProvider');
  }

  return context;
}