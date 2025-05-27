import React from 'react'

function EmpresaForms() {
    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4 border-b pb-2 border-gray-950/30">
                Registro de Usuario
            </h2>

            <form>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <label className="block text-gray-700 font-medium mb-3">Nombre</label>
                        <input
                            type="text"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Ej: Juan Carlos"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-3">Correo</label>
                        <input
                            type="text"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Ej: Pérez"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-3">Apellido Materno</label>
                        <input
                            type="text"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Ej: López"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-3">Teléfono</label>
                        <input
                            type="tel"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Ej: 555-123-4567"
                        />
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
    )
}

export default EmpresaForms