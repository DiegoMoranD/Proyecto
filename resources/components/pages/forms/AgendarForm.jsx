import React from 'react'

function AgendarForm() {
    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6 border-b pb-4 border-gray-600/25">
                Agendar Consulta
            </h2>

            <form>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Nombre del Paciente */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-3">
                            Paciente
                        </label>
                        <select
                            name="tipo_sangre"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400">
                            <option value="">Seleccionar</option>
                            <option value="A+">A+</option>
                        </select>
                    </div>

                    {/* Fecha de Nacimiento */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-3">
                            Fecha
                        </label>
                        <input
                            type="date"
                            name="fecha_nacimiento"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-3">
                            Motivo
                        </label>
                        <input
                            type="time"
                            name="fecha_nacimiento"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-3">Empresa ID</label>
                        <select
                            name="empresa_id"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            <option value="">Selecciona una empresa</option>

                        </select>
                    </div>

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
}

export default AgendarForm