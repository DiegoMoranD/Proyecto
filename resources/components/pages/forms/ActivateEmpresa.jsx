import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Config from "../../layouts/PageAuth/Config";

function ActivateEmpresa() {
    const { token } = useParams(); // Extraer el token de la URL
    const [empresa, setEmpresa] = useState(null);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [activating, setActivating] = useState(false);

    useEffect(() => {
        const fetchEmpresa = async () => {
            try {
                const response = await Config.getEmpresaByToken(token);
                setEmpresa(response.data.empresa);
                setMessage(response.data.message);
            } catch (error) {
                setMessage(
                    error.response?.data?.message || "Error al obtener los datos de la empresa."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchEmpresa();
    }, [token]);

    const handleActivate = async () => {
        setActivating(true);
        setMessage(""); // Limpiar el mensaje previo
        try {
            const response = await Config.activateEmpresa(token);
            setMessage(response.data.message);
            setEmpresa((prev) => ({ ...prev, cuenta_valida: 0 })); // Actualizar el estado local
        } catch (error) {
            setMessage(
                error.response?.data?.message || "Error al activar la cuenta. Intenta nuevamente."
            );
        } finally {
            setActivating(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
                    Activar Empresa
                </h1>
                {loading ? (
                    <p className="text-center text-gray-600">Cargando datos...</p>
                ) : empresa ? (
                    <>
                        <p className="text-center text-gray-600 mb-4">
                            Empresa: <strong>{empresa.nombre}</strong>
                        </p>
                        <p className="text-center text-gray-600 mb-4">
                            Correo: {empresa.correo}
                        </p>
                        <p className="text-center text-gray-600 mb-4">
                            Teléfono: {empresa.telefono}
                        </p>
                        <p className="text-center text-gray-600 mb-4">
                            Estado:{" "}
                            <span
                                className={`font-bold ${empresa.cuenta_valida ? "text-red-500" : "text-green-500"
                                    }`}
                            >
                                {empresa.cuenta_valida ? "No válida" : "Válida"}
                            </span>
                        </p>
                        {empresa.cuenta_valida === 1 && (
                            <button
                                onClick={handleActivate}
                                disabled={activating}
                                className={`w-full py-2 px-4 text-white font-medium rounded ${activating
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-blue-500 hover:bg-blue-600"
                                    }`}
                            >
                                {activating ? "Activando..." : "Activar Empresa"}
                            </button>
                        )}
                    </>
                ) : (
                    <p className="text-center text-red-600">{message}</p>
                )}
                {message && !loading && (
                    <div className="flex flex-col">
                        <p className="text-center text-gray-600 mt-4">{message}</p>

                        {empresa.cuenta_valida === 0 && (
                            <a href="/login" className="bg-blue-500 hover:bg-blue-600 transition-colors duration-500 text-white p-2 rounded text-center mt-3 font-medium">Volver al Login</a>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default ActivateEmpresa;