import axios from 'axios';

const stateFetch = async (user, id) => { 
  axios.defaults.headers.common = {'Authorization': `bearer ${user.json.token}`}
  return await axios.get(`/api/name/blogs/${id}/validate`);
}

axios.interceptors.response.use(response => {
  return response;
}, error => {
if (error.response.status === 401) {
   throw Error("user is not authorized to edit this blog");
}
throw Error(error);
});

export default stateFetch;