import React, { useEffect, useState } from "react";
import Config from "../../layouts/PageAuth/Config";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function UpdatePaciente() {
  const { id } = useParams();

  // Un estado por campo
  const [nombre, setNombre] = useState("");
  const [sex, setSex] = useState("");
  const [fecha_nacimiento, setFechaNacimiento] = useState("");
  const [tipo_sangre, setTipoSangre] = useState("");
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [imc, setImc] = useState("");
  const [fecha_registro, setFechaRegistro] = useState("");
  const [empresa_id, setEmpresaId] = useState("");
  const [empresas, setEmpresas] = useState([]);

  const navigate = useNavigate();

  const getRol = () => {
    const rol = sessionStorage.getItem('rol');
    return rol ? JSON.parse(rol) : null;
  }

  const rol = getRol();

  // Cargar datos del paciente y empresas al montar
  useEffect(() => {
    const fetchPaciente = async () => {
      try {
        const response = await Config.getPacienteById(id);
        const data = response.data;
        setNombre(data.nombre || "");
        setSex(data.sex || "");
        setFechaNacimiento(data.fecha_nacimiento || "");
        setTipoSangre(data.tipo_sangre || "");
        setPeso(data.peso || "");
        setAltura(data.altura || "");
        setImc(data.imc || "");
        setFechaRegistro(data.fecha_registro || "");
        setEmpresaId(data.empresa_id || "");
      } catch (error) {
        console.error("Error al obtener paciente", error);
      }
    };

    const fetchEmpresas = async () => {
      try {
        const response = await Config.getAlltEmpresa();
        setEmpresas(response.data);
      } catch (error) {
        console.error("Error al obtener empresas", error);
      }
    };

    fetchPaciente();
    fetchEmpresas();
  }, [id]);

  // Calcular IMC en tiempo real
  useEffect(() => {
    const pesoNum = parseFloat(peso);
    const alturaNum = parseFloat(altura);
    if (!isNaN(pesoNum) && !isNaN(alturaNum) && alturaNum > 0) {
      setImc((pesoNum / (alturaNum * alturaNum)).toFixed(2));
    } else {
      setImc("");
    }
  }, [peso, altura]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await Config.updatePaciente(id, {
        nombre,
        sex,
        fecha_nacimiento,
        tipo_sangre,
        peso,
        altura,
        imc,
        fecha_registro,
        empresa_id,
      });
      Swal.fire({
        title: "Paciente Actualizado",
        text: "Los datos del paciente han sido actualizados exitosamente",
        icon: "success"
      }).then(() => {
        navigate(`/${rol}/pacientes`);
      });
    } catch (error) {
      Swal.fire({
        title: "Hubo un error",
        text: "Parece que hubo un error en el formulario, revise bien los campos.",
        icon: "error"
      })
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 border-b pb-4 border-gray-600/25">
        Actualizar datos del Paciente
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block text-gray-700 font-medium mb-3">Nombre</label>
            <input
              type="text"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="Ej: Juan Pérez"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-3">Fecha de Nacimiento</label>
            <input
              type="date"
              value={fecha_nacimiento}
              onChange={e => setFechaNacimiento(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-3">Tipo de Sangre</label>
            <select
              value={tipo_sangre}
              onChange={e => setTipoSangre(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            >
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
          <div>
            <label className="block text-gray-700 font-medium mb-3">Peso (kg)</label>
            <input
              type="number"
              step="0.1"
              value={peso}
              onChange={e => setPeso(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="Ej: 70.5"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-3">Altura (m)</label>
            <input
              type="number"
              step="0.01"
              value={altura}
              onChange={e => setAltura(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="Ej: 1.75"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-3">IMC</label>
            <input
              type="number"
              value={imc}
              readOnly
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="El IMC será calculado"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-3">Fecha de Registro</label>
            <input
              type="date"
              value={fecha_registro}
              onChange={e => setFechaRegistro(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-3">Empresa ID</label>
            <select
              value={empresa_id}
              onChange={e => setEmpresaId(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="">Selecciona una empresa</option>
              {empresas.map((empresa) => (
                <option key={empresa.id} value={empresa.id}>
                  {empresa.nombre}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-3">Sexo</label>
            <select
              value={sex}
              onChange={e => setSex(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="">Seleccionar</option>
              <option value="Femenino">Femenino</option>
              <option value="Masculino">Masculino</option>
              <option value="Binario">Binario</option>
              <option value="No Definido">No Definido</option>
              <option value="Otro">Otro</option>
            </select>
          </div>

        </div>
        <div className="mt-12 text-center">
          <button
            type="submit"
            className="bg-green-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-green-600 transition"
          >
            Actualizar Paciente
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdatePaciente;