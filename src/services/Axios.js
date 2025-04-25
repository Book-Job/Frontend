import axios from "axios";

export const baseAip = axios.create({
  baseURL: 'http://43.200.107.80:8080/api/v1',
  withCredentials: true,
});