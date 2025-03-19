import React from 'react'

function CreateEmpresa() {
  return (
    <div className="min-w-[800px] h-fit mx-auto bg-white shadow-lg rounded-lg p-10 mt-10">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4 border-b pb-2 border-gray-950/30">
        Registro de Empresa
      </h2>

      <form>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Nombre de la empresa */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Nombre de la empresa
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Ej: Tech Solutions S.A."
            />
          </div>

          {/* Teléfono */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Teléfono
            </label>
            <input
              type="tel"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Ej: +52 123 456 7890"
            />
          </div>

          {/* RFC */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">RFC</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Ej: ABC123456XYZ"
            />
          </div>

          {/* Cédula */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Cédula
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Ej: 123456789"
            />
          </div>

          {/* Suscripción ID */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Suscripción ID
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Ej: SUB-00123"
            />
          </div>

          {/* Fecha de registro */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Fecha de registro
            </label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Vencimiento de suscripción */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Vencimiento de suscripción
            </label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Fecha de compra */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Fecha de compra
            </label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        {/* Botón de Enviar */}
        <div className="mt-6 text-center">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-600 transition"
          >
            Guardar Empresa
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateEmpresa