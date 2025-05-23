import React from "react";

const UsuarioForm = () => {
  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4 border-b pb-2 border-gray-950/30">
        Registro de Usuario
      </h2>

      <form>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Nombres */}
          <div>
            <label className="block text-gray-700 font-medium mb-3">Nombres</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Ej: Juan Carlos"
            />
          </div>

          {/* Apellido Paterno */}
          <div>
            <label className="block text-gray-700 font-medium mb-3">Apellido Paterno</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Ej: Pérez"
            />
          </div>

          {/* Apellido Materno */}
          <div>
            <label className="block text-gray-700 font-medium mb-3">Apellido Materno</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Ej: López"
            />
          </div>

          {/* Teléfono */}
          <div>
            <label className="block text-gray-700 font-medium mb-3">Teléfono</label>
            <input
              type="tel"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Ej: 555-123-4567"
            />
          </div>

          {/* Nombre de Usuario */}
          <div>
            <label className="block text-gray-700 font-medium mb-3">Nombre de Usuario</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Ej: juanperez"
            />
          </div>

          {/* Contraseña */}
          <div>
            <label className="block text-gray-700 font-medium mb-3">Contraseña</label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="********"
            />
          </div>

          {/* Tipo de Usuario ID */}
          <div>
            <label className="block text-gray-700 font-medium mb-3">Tipo de Usuario</label>
            <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400">
              <option value="">Seleccionar</option>
              <option value="1">Administrador</option>
              <option value="2">Médico</option>
              <option value="3">Recepcionista</option>
            </select>
          </div>

          {/* Empresa ID */}
          <div>
            <label className="block text-gray-700 font-medium mb-3">Empresa ID</label>
            <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400">
              <option value="">Seleccionar</option>
              <option value="EMP-001">EMP-001</option>
              <option value="EMP-002">EMP-002</option>
              <option value="EMP-003">EMP-003</option>
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

export default UsuarioForm;
