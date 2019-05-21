import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001"
});
// eslint-disable-next-line
const getAllUsers = async () => {
  const resp = await api.get("/users");
  return resp.data
}

const createUser = async data => {
  const resp = await api.post("/users/register", data);
  return resp.data;
};

const loginUser = async data => {
  try {
    const resp = await api.post("/users/login", data);
    return resp.data;
  } catch (error) {
    console.error(error);
  }
};

const addEntry = async data => {
  const resp = await api.post(`/users/${data.user_id}/entry`, data);
  return resp.data
}

const getUserEntries = async data => {
  const resp = await api.get(`/users/${data.user_id}/entries`);
  return resp.data.entries
}

export { createUser, loginUser, addEntry, getUserEntries };
