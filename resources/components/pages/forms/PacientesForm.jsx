import React, { useEffect, useState } from "react";
import Config from "../../layouts/PageAuth/Config";
import { useNavigate } from "react-router-dom";

const PacientesForm = () => {
  const userString = sessionStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;
  const navigate = useNavigate();


  const [paciente, setPaciente] = useState({
    nombre: "",
    sex: "",
    fecha_nacimiento: "",
    tipo_sangre: "",
    peso: "",
    altura: "",
    imc: "",
    fecha_registro: "",
    empresa_id: "",
  })

  const [empresas, setEmpresaName] = useState([]);
  const getRol = () => {
    const rol = sessionStorage.getItem('rol');
    return rol ? JSON.parse(rol) : null;
  }

  const rol = getRol();

  useEffect(() => {
    const fetchEmpresa = async () => {
      try {
        const response = await Config.getAlltEmpresa();
        setEmpresaName(response.data);
      } catch (error) {
        console.error("Error encontrado", error);
      }
    };
    fetchEmpresa();


    const peso = parseFloat(paciente.peso);
    const altura = parseFloat(paciente.altura);
    if (!isNaN(peso) && !isNaN(altura) && altura > 0) {
      const imcCalculado = (peso / (altura * altura)).toFixed(2);
      setPaciente((prevPaciente) => ({
        ...prevPaciente,
        imc: imcCalculado,
      }));
    } else {
      setPaciente((prevPaciente) => ({
        ...prevPaciente,
        imc: "",
      }));
    }
  }, [paciente.peso, paciente.altura]);



  const handlePacienteChange = (e) => {
    setPaciente({ ...paciente, [e.target.name]: e.target.value });
  };

  const submitPaciente = async (e) => {
    e.preventDefault();

    // Calcula el IMC antes de enviar
    const peso = parseFloat(paciente.peso);
    const altura = parseFloat(paciente.altura);
    const imc = altura > 0 ? (peso / (altura * altura)).toFixed(2) : 0;

    // Determinar empresa_id según el rol
    let empresa_id = paciente.empresa_id;
    if (rol === 'medico' || rol === 'recepcion') {
      empresa_id = user.empresa_id; // Usa la empresa del usuario logueado
    }

    try {
      const response = await Config.storePaciente({
        ...paciente,
        imc,
        empresa_id, // Asegura que se envía el campo correcto
      });
      alert("Paciente registrado exitosamente");
      setPaciente({
        nombre: "",
        sex: "",
        fecha_nacimiento: "",
        tipo_sangre: "",
        peso: "",
        altura: "",
        imc: "",
        fecha_registro: "",
        empresa_id: ""
      });
      navigate(`/${rol}/pacientes`);
    } catch (error) {
      alert("Error al registrar paciente");
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 border-b pb-4 border-gray-600/25">
        Registro de Paciente
      </h2>

      <form onSubmit={submitPaciente}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Nombre del Paciente */}
          <div>
            <label className="block text-gray-700 font-medium mb-3">Nombre</label>
            <input
              type="text"
              name="nombre"
              value={paciente.nombre}
              onChange={handlePacienteChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Ej: Juan Pérez"
            />
          </div>

          {/* Fecha de Nacimiento */}
          <div>
            <label className="block text-gray-700 font-medium mb-3">
              Fecha de Nacimiento
            </label>
            <input
              type="date"
              name="fecha_nacimiento"
              value={paciente.fecha_nacimiento}
              onChange={handlePacienteChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

          </div>

          {/* Tipo de Sangre */}
          <div>
            <label className="block text-gray-700 font-medium mb-3">
              Tipo de Sangre
            </label>
            <select
              value={paciente.tipo_sangre}
              name="tipo_sangre"
              onChange={handlePacienteChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400">
              <option value="">Seleccionar</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>

          {/* Peso */}
          <div>
            <label className="block text-gray-700 font-medium mb-3">Peso (kg)</label>
            <input
              type="number"
              step="0.1"
              name="peso"
              value={paciente.peso}
              onChange={handlePacienteChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Ej: 70.5"
            />
          </div>

          {/* Altura */}
          <div>
            <label className="block text-gray-700 font-medium mb-3">Altura (m)</label>
            <input
              type="number"
              step="0.01"
              name="altura"
              value={paciente.altura}
              onChange={handlePacienteChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Ej: 1.75"
            />
          </div>

          {/* IMC */}
          <div>
            <label className="block text-gray-700 font-medium mb-3">IMC</label>
            <input
              type="number"
              name="imc"
              value={paciente.imc}
              readOnly
              onChange={handlePacienteChange}
              step="0.1"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="El IMC Sera calculado"
            />
          </div>

          {/* Fecha de Registro */}
          <div>
            <label className="block text-gray-700 font-medium mb-3">
              Fecha de Registro
            </label>
            <input
              type="date"
              name="fecha_registro"
              value={paciente.fecha_registro}
              onChange={handlePacienteChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {(rol === 'admin' || rol === 'root') && (
            <div>
              <label className="block text-gray-700 font-medium mb-3">Empresa ID</label>
              <select
                value={paciente.empresa_id}
                name="empresa_id"
                onChange={handlePacienteChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Selecciona una empresa</option>
                {empresas.map((empresa) => (
                  <option key={empresa.id} value={empresa.id}>
                    {empresa.nombre}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="block text-gray-700 font-medium mb-3">
              Sexo
            </label>
            <select
              value={paciente.sex}
              name="sex"
              onChange={handlePacienteChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400">
              <option value="">Seleccionar</option>
              <option value="Femenino">Femenino</option>
              <option value="Masculino">Masculino</option>
              <option value="Binario">Binario</option>
              <option value="No Definido">No Definido</option>
              <option value="Otro">Otro</option>
            </select>
          </div>

          {/* Empresa ID */}
          {(rol === 'medico' || rol === 'recepcion') && (
            <div>
              <label className="block text-gray-700 font-medium mb-3">Empresa</label>
              <input
                type="text"
                value={user.empresa_id}
                readOnly
                className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-100"
              />
            </div>
          )}
        </div>

        {/* Botón de Enviar */}
        <div className="mt-12 text-center">
          <button
            type="submit"
            className="bg-green-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-green-600 transition"
          >
            Guardar Paciente
          </button>
        </div>
      </form>
    </div>
  );
};

export default PacientesForm;
