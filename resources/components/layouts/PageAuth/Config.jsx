import axios from "axios";

const base_api_url = "http://127.0.0.1:8000/api/v1";

export default {
  // * configuracion de la aplicacion
  getLogin: (data) => axios.post(`${base_api_url}/auth/login`, data),
  getLogout: () => axios.post(`${base_api_url}/auth/logout`),

  // todo configuracion de suscripcion
  getSuscripcionStore: (data) => axios.post(`${base_api_url}/auth/suscripcion`, data),

  // ? configuracion de empresa
  getEmpresaStore: (data) => axios.post(`${base_api_url}/auth/empresa`, data),
  getAlltEmpresa: (data) => axios.get(`${base_api_url}/auth/empresa`, data),
  getEmpresaByToken: (token, data) => axios.get(`${base_api_url}/auth/empresa/${token}`, data),
  getGenerateRecoveryToken: (data) => axios.post(`${base_api_url}/auth/generar-token-recuperacion`, data),
  getGenerateNewToken: (data) => axios.post(`${base_api_url}/auth/recuperar-token`, data),
  validateRecoveryToken: (token) => axios.get(`${base_api_url}/auth/validar-token-recuperacion/${token}`),
  updatePassword: (data) => axios.post(`${base_api_url}/auth/actualizar-password`, data),

  // ! configuracion de usuarios
  getUsuarioStore: (data) => axios.post(`${base_api_url}/auth/register`, data),
  getCheckEmail: (data) => axios.post(`${base_api_url}/auth/check-email`, data),
  getRecover: (data) => axios.post(`${base_api_url}/auth/recuperar`, data),
  activateEmpresa: (token) => axios.post(`${base_api_url}/auth/activar-empresa/${token}`),

  // * configuracion de pacientes
    getAllPaciente: (data) => axios.get(`${base_api_url}/auth/paciente`, data),

}