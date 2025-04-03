import axios from "axios";

const base_api_url = "http://127.0.0.1:8000/api/v1";

export default {
  getLogin: (data) => axios.post(`${base_api_url}/auth/login`, data),
  getLogout: () => axios.post(`${base_api_url}/auth/logout`),
  getSuscripcion: (data) => axios.post(`${base_api_url}/auth/suscripcion`, data),
}