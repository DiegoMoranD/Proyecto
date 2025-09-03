import React, { useEffect, useState } from "react";
import Config from "../../layouts/PageAuth/Config";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateUsuario = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const getRol = () => {
    const rol = sessionStorage.getItem('rol');
    return rol ? JSON.parse(rol) : null;
  }

  const rol = getRol();

  // Un estado por campo
  const [name, setName] = useState("");
  const [paterno, setPaterno] = useState("");
  const [materno, setMaterno] = useState("");
  const [telefono, setTelefono] = useState("");
  const [username, setUsername] = useState("");
  const [empresa_id, setEmpresaId] = useState("");

  const [empresas, setEmpresas] = useState([]);

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const response = await Config.getUsuarioByAdmin(id);
        const data = response.data;
        setName(data.name || "");
        setPaterno(data.paterno || "");
        setMaterno(data.materno || "");
        setTelefono(data.telefono || "");
        setUsername(data.username || "");
        setEmpresaId(data.empresa_id || "");
      } catch (error) {
        console.error("Error al obtener al usuario", error);
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

    fetchUsuario();
    fetchEmpresas();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await Config.updateUsuarioByAdmin(id, {
        name,
        paterno,
        materno,
        telefono,
        username,
        empresa_id,
      });
      Swal.fire({
        title: "Usuario Actualizado",
        text: "El usuario ha sido actualizado correctamente.",
        icon: "success"
      }).then(() => {
        navigate(`/${rol}/usuario`);
      });
    } catch (error) {
      Swal.fire({
        title: "Hubo un error",
        text: "Parece que hubo un error en el formulario, revise bien los campos.",
        icon: "error"
      });
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4 border-b pb-2 border-gray-950/30">
        Registro de Usuario
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Nombres */}
          <div>
            <label className="block text-gray-700 font-medium mb-3">Nombres</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Ej: Juan Carlos"
            />
          </div>

          {/* Apellido Paterno */}
          <div>
            <label className="block text-gray-700 font-medium mb-3">Apellido Paterno</label>
            <input
              type="text"
              value={paterno}
              onChange={e => setPaterno(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Ej: Pérez"
            />
          </div>

          {/* Apellido Materno */}
          <div>
            <label className="block text-gray-700 font-medium mb-3">Apellido Materno</label>
            <input
              type="text"
              value={materno}
              onChange={e => setMaterno(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Ej: López"
            />
          </div>

          {/* Teléfono */}
          <div>
            <label className="block text-gray-700 font-medium mb-3">Teléfono</label>
            <input
              type="tel"
              value={telefono}
              onChange={e => setTelefono(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Ej: 555-123-4567"
            />
          </div>

          {/* Nombre de Usuario */}
          <div>
            <label className="block text-gray-700 font-medium mb-3">Nombre de Usuario</label>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Ej: juanperez"
            />
          </div>

          {/* Empresa ID */}
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
        </div>

        {/* Botón de Enviar */}
        <div className="mt-12 text-center">
          <button
            type="submit"
            className="bg-green-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-green-600 transition"
          >
            Guardar Usuario
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateUsuario;
