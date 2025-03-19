import React from "react";

const TipoUsuarioForm = () => {
  return (
    <div className="min-w-[800px] h-fit mx-auto bg-white shadow-lg rounded-lg p-10 mt-10">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4 border-b pb-2 border-gray-950/30">
        Registro de Tipo de Usuario
      </h2>

      <form>
        <div className="grid grid-cols-1 gap-4">
          {/* Nombre del Tipo de Usuario */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Tipo de Usuario
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Ej: Administrador"
            />
          </div>

          {/* Permisos - Checkboxes */}
          <fieldset className="border border-gray-300 rounded-md p-4">
            <legend className="text-gray-700 font-medium">Permisos</legend>

            <div className="flex flex-col gap-2 mt-2">
              {/* Registro de Paciente */}
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox text-purple-600"
                />
                <span className="ml-2">Registro de Paciente</span>
              </label>

              {/* Registro de Medicamento */}
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox text-purple-600"
                />
                <span className="ml-2">Registro de Medicamento</span>
              </label>

              {/* Agendar Cita */}
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox text-purple-600"
                />
                <span className="ml-2">Agendar Cita</span>
              </label>

              {/* Eliminar Paciente */}
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox text-purple-600"
                />
                <span className="ml-2">Eliminar Paciente</span>
              </label>

              {/* Eliminar Cita */}
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox text-purple-600"
                />
                <span className="ml-2">Eliminar Cita</span>
              </label>
            </div>
          </fieldset>
        </div>

        {/* Botón de Enviar */}
        <div className="mt-6 text-center">
          <button
            type="submit"
            className="bg-purple-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-purple-600 transition"
          >
            Guardar Tipo de Usuario
          </button>
        </div>
      </form>
    </div>
  );
};

export default TipoUsuarioForm;
