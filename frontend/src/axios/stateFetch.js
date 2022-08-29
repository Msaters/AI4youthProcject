import axios from 'axios';
import {useAuthContext} from '../hooks/useAuthContext';

const stateFetch = async (user, id) => { 
  axios.defaults.headers.common = {'Authorization': `bearer ${user.json.accessToken}`};
  return await axios.get(`http://localhost:4000/api/name/blogs/${id}/validate`);
}

axios.interceptors.response.use(response => {
  console.log("TUDUU");
  return response;
}, error => {
  if (error.response.data.error === "jwt expired")
  {
    const {dispatch} = useAuthContext();
    console.log("expired");
    dispatch({type: "Refresh_AccessToken"});
  }

  if (error.response.status === 401) {
    throw Error("user is not authorized to edit this blog");
  }
  throw Error(error);
});

export default stateFetch;