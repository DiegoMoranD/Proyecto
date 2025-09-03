import React, { useEffect, useState } from "react";
import Config from "../../layouts/PageAuth/Config";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function EmpresaForms() {
    const { id } = useParams();

    const navigate = useNavigate();
    const getRol = () => {
        const rol = sessionStorage.getItem('rol');
        return rol ? JSON.parse(rol) : null;
    }

    const rol = getRol();

    // Un estado por campo
    const [nombre, setNombre] = useState("");
    const [rfc, setRFC] = useState("");
    const [cedula, setCedula] = useState("");
    const [telefono, setTelefono] = useState("");

    useEffect(() => {
        const fetchEmpresa = async () => {
            try {
                const response = await Config.getEmpresaByAdmin(id);
                const data = response.data;
                setNombre(data.nombre || "");
                setRFC(data.rfc || "");
                setCedula(data.cedula || "");
                setTelefono(data.telefono || "");
            } catch (error) {
                console.error("Error al obtener la empresa", error);
            }
        };

        fetchEmpresa();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await Config.updateEmpresaByAdmin(id, {
                nombre,
                rfc,
                cedula,
                telefono,
            });
            Swal.fire({
                title: "Empresa Actualizada",
                text: "La empresa ha sido actualizada correctamente.",
                icon: "success"
            }).then(() => {
                navigate(`/${rol}/empresa`);
            });
        } catch (error) {
            Swal.fire({
                title: "Hubo un error",
                text: "Parece que hubo un error en el formulario, revise bien los campos.",
                icon: "error"
            });
            console.error(error);
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4 border-b pb-2 border-gray-950/30">
                Registro de Usuario
            </h2>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <label className="block text-gray-700 font-medium mb-3">Nombre</label>
                        <input
                            type="text"
                            value={nombre}
                            onChange={e => setNombre(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Ej: Juan Carlos"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-3">RFC</label>
                        <input
                            type="text"
                            value={rfc}
                            onChange={e => setRFC(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Ej: DAR1424"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-3">Cedula</label>
                        <input
                            type="text"
                            value={cedula}
                            onChange={e => setCedula(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Ej: 514556GS"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-3">Teléfono</label>
                        <input
                            type="tel"
                            value={telefono}
                            onChange={e => setTelefono(e.target.value)}
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