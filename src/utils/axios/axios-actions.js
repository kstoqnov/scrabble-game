import axios from 'axios';

const instance = axios.create({
  //cloud  url 
  baseURL: 'https:///'
});

export default instance;