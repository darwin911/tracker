import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001'
})

const createUser = async (data) => {
  const resp = await api.post('/users/register', data);
  return resp.data
}

const loginUser = async (data) => {
  const resp = await api.post('/users/login', data);
  return resp.data
}

export {
  createUser,
  loginUser
}