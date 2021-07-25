import axios from "axios";

export const API = axios.create({
  baseURL: "https://sbl-todo-api.herokuapp.com/api/v1",
});
