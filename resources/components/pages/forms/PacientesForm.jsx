import React from "react";

const PacientesForm = () => {
  return (
    <div className="min-w-[800px] h-fit mx-auto bg-white shadow-lg rounded-lg p-10 mt-10">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4 border-b pb-2 border-gray-950/30">
        Registro de Paciente
      </h2>

      <form>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Nombre del Paciente */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Nombre</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Ej: Juan Pérez"
            />
          </div>

          {/* Fecha de Nacimiento */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Fecha de Nacimiento
            </label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Tipo de Sangre */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Tipo de Sangre
            </label>
            <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400">
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
            <label className="block text-gray-700 font-medium mb-1">Peso (kg)</label>
            <input
              type="number"
              step="0.1"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Ej: 70.5"
            />
          </div>

          {/* Altura */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Altura (m)</label>
            <input
              type="number"
              step="0.01"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Ej: 1.75"
            />
          </div>

          {/* IMC */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">IMC</label>
            <input
              type="number"
              step="0.1"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Ej: 23.1"
            />
          </div>

          {/* Fecha de Registro */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Fecha de Registro
            </label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Usuario Registro */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Usuario Registro
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Ej: admin123"
            />
          </div>

          {/* Empresa ID */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Empresa ID</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Ej: EMP-001"
            />
          </div>
        </div>

        {/* Botón de Enviar */}
        <div className="mt-6 text-center">
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
