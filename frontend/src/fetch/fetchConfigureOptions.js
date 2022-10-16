import axios from 'axios';

var Method, Body, Url;
const changeFetchingGlobalParameters = (method, url, body) => {
  Method = method;
  Url = url;
  Body = body;
}

var AuthHeader