import React, { useEffect, useState } from "react";
import Config from "../../layouts/PageAuth/Config";
import { useNavigate } from "react-router-dom";

function EmpresaForm() {

  const getRol = () => {
    const rol = sessionStorage.getItem('rol');
    return rol ? JSON.parse(rol) : null;
  }

  const rol = getRol();
  const [suscripcion, setSuscripcion] = useState([]);
  const navigate = useNavigate();
  const [empresa, setEmpresa] = useState({
    nombre: "",
    correo: "",
    rfc: "",
    cedula: "",
    telefono: "",
    suscripcion_id: "",
    fecha_registro: "",
    fecha_vencimiento: "",
    fecha_compra: "",
    cuenta_valida: 1,
  });

  useEffect(() => {
    const fetchSuscipcion = async () => {
      try {
        const response = await Config.getAllSuscripcion();
        setSuscripcion(response.data);
      } catch (error) {
        console.error("Error encontrado", error);
      }
    };
    fetchSuscipcion();
  }, []);

  const handleChange = (e) => {
    setEmpresa({ ...empresa, [e.target.name]: e.target.value });
  };

  const submitEmpresa = async (e) => {
  e.preventDefault();
  try {
    const response = await Config.storeEmpresaByRoot({
      ...empresa
    });

    // Si el registro fue exitoso (status 201 o success en la respuesta)
    if (response.status === 201 || response.data.success) {
      alert("Empresa registrada exitosamente");
      // Redirige a la tabla de empresas
      navigate(`/${rol}/empresa`);
    }
  } catch (error) {
    alert("Error al registrar la empresa");
    console.error(error);
  }
};

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 border-b pb-4 border-gray-600/25">
        Registro de Empresa
      </h2>

      <form onSubmit={submitEmpresa}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Nombre de la empresa */}
          <div>
            <label className="block text-gray-700 font-medium mb-3">
              Nombre de la empresa
            </label>
            <input
              type="text"
              name="nombre"
              value={empresa.nombre}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Ej: Tech Solutions S.A."
            />
          </div>

          {/* Correo */}
          <div>
            <label className="block text-gray-700 font-medium mb-3">
              Correo
            </label>
            <input
              type="email"
              name="correo"
              value={empresa.correo}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Ej: contacto@empresa.com"
            />
          </div>

          {/* Teléfono */}
          <div>
            <label className="block text-gray-700 font-medium mb-3">
              Teléfono
            </label>
            <input
              type="tel"
              name="telefono"
              value={empresa.telefono}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Ej: +52 123 456 7890"
            />
          </div>

          {/* RFC */}
          <div>
            <label className="block text-gray-700 font-medium mb-3">RFC</label>
            <input
              type="text"
              name="rfc"
              value={empresa.rfc}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Ej: ABC123456XYZ"
            />
          </div>

          {/* Cédula */}
          <div>
            <label className="block text-gray-700 font-medium mb-3">
              Cédula
            </label>
            <input
              type="text"
              name="cedula"
              value={empresa.cedula}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Ej: 123456789"
            />
          </div>

          {/* Suscripción ID */}
          <div>
            <label className="block text-gray-700 font-medium mb-3">
              Tipo de suscripción
            </label>
            <select
              name="suscripcion_id"
              value={empresa.suscripcion_id}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Selecciona una suscripción</option>
              {suscripcion.map((suscripciones) => (
                <option key={suscripciones.id} value={suscripciones.id}>
                  {suscripciones.nombre}
                </option>
              ))}
            </select>
          </div>

          {/* Fecha de registro */}
          <div>
            <label className="block text-gray-700 font-medium mb-3">
              Fecha de registro
            </label>
            <input
              type="date"
              name="fecha_registro"
              value={empresa.fecha_registro}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Vencimiento de suscripción */}
          <div>
            <label className="block text-gray-700 font-medium mb-3">
              Vencimiento de suscripción
            </label>
            <input
              type="date"
              name="fecha_vencimiento"
              value={empresa.fecha_vencimiento}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Fecha de compra */}
          <div>
            <label className="block text-gray-700 font-medium mb-3">
              Fecha de compra
            </label>
            <input
              type="date"
              name="fecha_compra"
              value={empresa.fecha_compra}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        {/* Botón de Enviar */}
        <div className="mt-12 text-center">
          <button
            type="submit"
            className="bg-green-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-green-600 transition">
            Registrar Empresa
          </button>
        </div>
      </form>
    </div>
  )
}

export default EmpresaForm