import React from "react";

const SuscripcionForm = () => {
  return (
    <div className="min-w-[800px] h-fit mx-auto bg-white shadow-lg rounded-lg p-10 mt-10">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4 border-b pb-2 border-gray-950/30">
        Registro de Suscripción
      </h2>

      <form>
        <div className="grid grid-cols-1 gap-4">
          {/* Nombre de la Suscripción */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Nombre de la Suscripción
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Ej: Premium Plus"
            />
          </div>

          {/* Precio */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Precio ($)</label>
            <input
              type="number"
              step="0.01"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Ej: 99.99"
            />
          </div>

          {/* Descuento */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Descuento (%)</label>
            <input
              type="number"
              step="1"
              min="0"
              max="100"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Ej: 10"
            />
          </div>

          {/* Días de Suscripción */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Días de Suscripción
            </label>
            <input
              type="number"
              step="1"
              min="1"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Ej: 30"
            />
          </div>
        </div>

        {/* Botón de Enviar */}
        <div className="mt-6 text-center">
          <button
            type="submit"
            className="bg-indigo-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-indigo-600 transition"
          >
            Guardar Suscripción
          </button>
        </div>
      </form>
    </div>
  );
};

export default SuscripcionForm;
