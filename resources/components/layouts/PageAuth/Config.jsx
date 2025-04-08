import axios from "axios";

const base_api_url = "http://127.0.0.1:8000/api/v1";

export default {
  // configuracion de la aplicacion
  getLogin: (data) => axios.post(`${base_api_url}/auth/login`, data),
  getLogout: () => axios.post(`${base_api_url}/auth/logout`),

  // configuracion de suscripcion
  getSuscripcionStore: (data) => axios.post(`${base_api_url}/auth/suscripcion`, data),

  // configuracion de empresa
  getEmpresaStore: (data) => axios.post(`${base_api_url}/auth/empresa`, data),
  geAlltEmpresa: (data) => axios.get(`${base_api_url}/auth/empresa`, data),

  // configuracion de usuarios
  getUsuarioStore: (data) => axios.post(`${base_api_url}/auth/register`, data),
}