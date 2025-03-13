import React from 'react';

export default function Login() {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-lg w-96">
                <h1 className="text-2xl font-bold mb-4">Iniciar Sesión</h1>
                <form>
                    <div className="mb-4">
                        <label className="block text-gray-700">Correo Electrónico</label>
                        <input
                            type="email"
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="Ingresa tu correo"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Contraseña</label>
                        <input
                            type="password"
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="Ingresa tu contraseña"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    >
                        Iniciar Sesión
                    </button>
                </form>
            </div>
        </div>
    );
}