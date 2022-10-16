import axios from 'axios';

var Method, Body, Url;
const changeFetchingGlobalParameters = (method, url, body) => {
  Method = method;
  Url = url;
  Body = body;
}

const configureAxiosInterceptors = (dispatch) => {
  axios.interceptors.response.use(response => {
    return response;
  }, error => {
    console.log(error);
    if (error.response.data.error === "jwt expired")
    {
      console.log("expired");
      dispatch({type: "Refresh_AccessToken"});
      createAxiosRequest({method: Method, url: Url, body: Body});
    }

    if (error.response.status === 401) {
      throw Error("user is not authorized to edit this blog");
    }
    throw Error(error);
});
}
 
export const setAxiosAuthenticationHeader = (accessToken) => {
  axios.defaults.headers.common = {
    'Authorization': `bearer ${accessToken}`,
    //add content type header
    'Content-Type': 'application/json'
  };
}

export const createAxiosRequest = ({method, url, body}) => {
  //change global parameters values to latest fetch request
  changeFetchingGlobalParameters(method, url, body);
  console.log(method, url, body);
  //if there is no body to fetch, just fetch method and URL
  if (!body)
  {
    return axios({
      method: method,
      url: url
    });
 }

 //if there is body to fetch
 return axios({
  method: method,
  url: url,
  data: body
});
}

export default configureAxiosInterceptors;