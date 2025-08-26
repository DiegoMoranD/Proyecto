import axios from "axios";

const base_api_url = "http://127.0.0.1:8000/api/v1";

export default {
  // todo configuracion de la aplicacion
  getLogin: (data) => axios.post(`${base_api_url}/auth/login`, data),
  getLogout: () => axios.post(`${base_api_url}/auth/logout`),

  // todo configuracion de suscripcion
  getAllSuscripcion: (data) => axios.get(`${base_api_url}/auth/suscripcion`, data),

  // todo configuracion de empresa
  getEmpresaStore: (data) => axios.post(`${base_api_url}/auth/empresa`, data),
  getAlltEmpresa: (data) => axios.get(`${base_api_url}/auth/empresa`, data),
  getEmpresaByToken: (token, data) => axios.get(`${base_api_url}/auth/empresa/${token}`, data),
  getGenerateRecoveryToken: (data) => axios.post(`${base_api_url}/auth/generar-token-recuperacion`, data),
  getGenerateNewToken: (data) => axios.post(`${base_api_url}/auth/recuperar-token`, data),
  validateRecoveryToken: (token) => axios.get(`${base_api_url}/auth/validar-token-recuperacion/${token}`),
  updatePassword: (data) => axios.post(`${base_api_url}/auth/actualizar-password`, data),

  // todo configuracion de usuarios
  getAllUsuarios: (data) => axios.get(`${base_api_url}/auth/usuario`, data),
  getUsuarioStore: (data) => axios.post(`${base_api_url}/auth/register`, data),
  getCheckEmail: (data) => axios.post(`${base_api_url}/auth/check-email`, data),
  activateEmpresa: (token) => axios.post(`${base_api_url}/auth/activar-empresa/${token}`),
  getAllTipoUsuario: (data) => axios.get(`${base_api_url}/auth/tipo-usuario`, data),
  getNameUser: (id) => axios.get(`${base_api_url}/auth/usuario-name/${id}`),
  // ! Empresa
  updateUsuarioByAdmin: (id, data) => axios.put(`${base_api_url}/admin/update-usuario/${id}`, data),
  getUsuarioByAdmin: (id) => axios.get(`${base_api_url}/admin/update-usuario/${id}`),
  updateEmpresaByAdmin: (id, data) => axios.put(`${base_api_url}/admin/update-empresa/${id}`, data),
  getEmpresaByAdmin: (id) => axios.get(`${base_api_url}/admin/update-empresa/${id}`),
  deletePacieteByAdmin: (id) => axios.delete(`${base_api_url}/admin/delete-paciente/${id}`),
  getEmpresaByID: (id) => axios.get(`${base_api_url}/auth/empresa/${id}`),


  // todo configuracion de pacientes
  getAllPaciente: (data) => axios.get(`${base_api_url}/auth/paciente`, data),

  // todo configuracion medico
  storePaciente: (data) => axios.post(`${base_api_url}/medico/registrar-paciente`, data),
  updatePaciente: (id, data) => axios.put(`${base_api_url}/medico/update-paciente/${id}`, data),
  getPacienteById: (id) => axios.get(`${base_api_url}/medico/update-paciente/${id}`),
  getPacienteByIdCitas: (id) => axios.get(`${base_api_url}/medico/paciente/${id}`),

  // * Medicamentos
  indexMedicamentoByAdmin: (data) => axios.get(`${base_api_url}/admin/medicamento/catalogo`, data),
  storeMedicamento: (data) => axios.post(`${base_api_url}/medicamento/regristro`, data),
  indexMedicamento: (data) => axios.get(`${base_api_url}/medicamento/catalogo`, data),
  updateMedicamento: (id, data) => axios.put(`${base_api_url}/medicamento/update/${id}`, data),
  getMedicamentoById: (id) => axios.get(`${base_api_url}/medicamento/ver/${id}`),
  deleteMedicamento: (id) => axios.delete(`${base_api_url}/medicamento/delete/${id}`),

  // * Agenda
  indexAgendaPaciente: (paciente_id) => axios.get(`${base_api_url}/medico/citas-paciente/${paciente_id}`),
  getCitaById: (id) => axios.get(`${base_api_url}/medico/citas/${id}`),
  indexAgenda: (data) => axios.get(`${base_api_url}/medico/agenda`, data),
  storeAgenda: (data) => axios.post(`${base_api_url}/medico/agendar-form`, data),
  showPacienteCita: (id) => axios.get(`${base_api_url}/medico/cita/${id}`),
  CitaDetalles: (id, data) => axios.post(`${base_api_url}/medico/cita-detalles/${id}`, data),
  citaAtendidaShow: (id) => axios.get(`${base_api_url}/medico/cita-atendida/${id}`),
  getCitasSemana: () => axios.get(`${base_api_url}/medico/citas-semana`),
  updateCita: (id, data) => axios.put(`${base_api_url}/medico/agendar-update/${id}`, data),
  cancelCita: (id, data) => axios.put(`${base_api_url}/medico/agendar-delete/${id}`, data),

  // ? Enviar PDF al Correo
  enviarPDFCita: (data) => axios.post(`${base_api_url}/medico/enviar-pdf-cita`, data),  

  // ? configuracion root
  getAllPacientesByAdmin: (data) => axios.get(`${base_api_url}/admin/pacientes`, data),
  storeEmpresaByRoot: (data) => axios.post(`${base_api_url}/root/crear-empresa`, data),
  storeUsuarioByRoot: (data) => axios.post(`${base_api_url}/root/crear-usuario`, data),
  deleteEmpresaByRoot: (id) => axios.delete(`${base_api_url}/root/delete-empresa/${id}`),
  deleteUsuarioByRoot: (id) => axios.delete(`${base_api_url}/root/delete-usuario/${id}`),

  getDashboardMetrics: () => axios.get(`${base_api_url}/auth/dashboard-metrics`),
  getUsersByRole: () => axios.get(`${base_api_url}/root/users-by-role`),
  getPacienteMetrics: () => axios.get(`${base_api_url}/medico/paciente-metrics`),
}