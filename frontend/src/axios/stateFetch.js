import axios from 'axios';

const stateFetch = async (id) => { 
  return await axios.get(`http://localhost:4000/api/name/blogs/${id}/validate`);
}

export default stateFetch;