import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Config from "../../layouts/PageAuth/Config";
import AuthUser from "../../layouts/PageAuth/AuthUser";

function Register() {
    const { getToken } = AuthUser();
    const navigate = useNavigate();

    // Estado para los datos de la empresa
    const [empresa, setEmpresa] = useState({
        nombre: "",
        correo: "",
        telefono: "", // Debe ser un número entero
        cedula: "",
        suscripcion_id: 1, // Cambiado a "suscripcion_id" para coincidir con la base de datos
    });

    // Estado para los datos del usuario
    const [usuario, setUsuario] = useState({
        name: "", // Cambiado a "name" para coincidir con la base de datos
        paterno: "", // Cambiado a "paterno"    
        materno: "", // Cambiado a "materno"
        email: "",
        password: "", // Cambiado a "password"
        telefono: "", // Debe ser un número entero
        empresa_id: null, // Cambiado a "empresa_id"
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (getToken()) {
            navigate("/");
        }
    }, [getToken, navigate]);

    const handleEmpresaChange = (e) => {
        setEmpresa({ ...empresa, [e.target.name]: e.target.value });
    };

    const handleUsuarioChange = (e) => {
        setUsuario({ ...usuario, [e.target.name]: e.target.value });
    };

    const submitRegistro = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Registrar la empresa
            const empresaResponse = await Config.getEmpresaStore({
                nombre: empresa.nombre,
                correo: empresa.correo,
                telefono: parseInt(empresa.telefono, 10), // Convertir a número entero
                cedula: empresa.cedula,
                suscripcion_id: empresa.suscripcion_id,
                rfc: "default_rfc", // Agregar un valor por defecto si es necesario
                tocken_acceso: "default_token", // Agregar un valor por defecto si es necesario
                cuenta_valida: 1, // Valor por defecto
                fecha_registro: new Date().toISOString().split("T")[0], // Fecha actual
                fecha_vencimiento: "2025-12-31", // Fecha de ejemplo
                fecha_compra: new Date().toISOString().split("T")[0], // Fecha actual
            });

            const empresa_id = empresaResponse.data.id; // Obtener el ID de la empresa registrada

            // Registrar el usuario con el ID de la empresa
            const usuarioData = { ...usuario, empresa_id };
            await Config.getUsuarioStore({
                name: usuarioData.name,
                paterno: usuarioData.paterno,
                materno: usuarioData.materno,
                email: usuarioData.email,
                password: usuarioData.password,
                telefono: parseInt(usuarioData.telefono, 10), // Convertir a número entero
                empresa_id: usuarioData.empresa_id,
            });

            alert("Empresa y usuario registrados exitosamente");
            navigate("/login");
        } catch (error) {
            if (error.response && error.response.status === 422) {
                // Mostrar errores específicos del backend
                const errors = error.response.data.errors;
                const errorMessages = Object.values(errors).flat().join("\n");
                alert(`Errores de validación:\n${errorMessages}`);
            } else {
                console.error("Error al registrar:", error);
                alert("Ocurrió un error al registrar los datos.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-[#626365] text-black h-screen flex justify-center items-center">
            <div className="bg-[#fff] border border-[#e11a31] rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative">
                <h1 className="text-4xl text-black/75 font-bold text-center mb-12">
                    Registro de Empresa y Usuario
                </h1>
                <form onSubmit={submitRegistro} className="grid grid-cols-2 gap-4">
                    {/* Datos de la Empresa */}
                    <h2 className="col-span-2 text-2xl font-semibold mb-4">Datos de la Empresa</h2>
                    <div className="relative">
                        <input
                            type="text"
                            name="nombre"
                            value={empresa.nombre}
                            onChange={handleEmpresaChange}
                            required
                            className="block w-full py-2.5 px-0 text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder="Nombre de la Empresa"
                        />
                    </div>
                    <div className="relative">
                        <input
                            type="email"
                            name="correo"
                            value={empresa.correo}
                            onChange={handleEmpresaChange}
                            required
                            className="block w-full py-2.5 px-0 text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder="Correo de la Empresa"
                        />
                    </div>
                    <div className="relative">
                        <input
                            type="text"
                            name="telefono"
                            value={empresa.telefono}
                            onChange={handleEmpresaChange}
                            required
                            className="block w-full py-2.5 px-0 text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder="Teléfono de la Empresa"
                        />
                    </div>
                    <div className="relative">
                        <input
                            type="text"
                            name="cedula"
                            value={empresa.cedula}
                            onChange={handleEmpresaChange}
                            required
                            className="block w-full py-2.5 px-0 text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder="Cédula Profesional"
                        />
                    </div>

                    {/* Datos del Usuario */}
                    <h2 className="col-span-2 text-2xl font-semibold mt-8 mb-4">Datos del Usuario</h2>
                    <div className="relative">
                        <input
                            type="text"
                            name="name"
                            value={usuario.name}
                            onChange={handleUsuarioChange}
                            required
                            className="block w-full py-2.5 px-0 text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder="Nombre del Usuario"
                        />
                    </div>
                    <div className="relative">
                        <input
                            type="text"
                            name="paterno"
                            value={usuario.paterno}
                            onChange={handleUsuarioChange}
                            required
                            className="block w-full py-2.5 px-0 text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder="Apellido Paterno"
                        />
                    </div>
                    <div className="relative">
                        <input
                            type="text"
                            name="materno"
                            value={usuario.materno}
                            onChange={handleUsuarioChange}
                            required
                            className="block w-full py-2.5 px-0 text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder="Apellido Materno"
                        />
                    </div>
                    <div className="relative">
                        <input
                            type="email"
                            name="email"
                            value={usuario.email}
                            onChange={handleUsuarioChange}
                            required
                            className="block w-full py-2.5 px-0 text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder="Email del Usuario"
                        />
                    </div>
                    <div className="relative">
                        <input
                            type="password"
                            name="password"
                            value={usuario.password}
                            onChange={handleUsuarioChange}
                            required
                            className="block w-full py-2.5 px-0 text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder="Contraseña"
                        />
                    </div>
                    <div className="relative">
                        <input
                            type="text"
                            name="telefono"
                            value={usuario.telefono}
                            onChange={handleUsuarioChange}
                            required
                            className="block w-full py-2.5 px-0 text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder="Teléfono del Usuario"
                        />
                    </div>

                    <button
                        type="submit"
                        className={`col-span-2 w-full mb-4 text-[18px] mt-6 rounded-full ${
                            loading
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-slate-300 hover:bg-[#e11a31] hover:text-white"
                        } py-2 transition-colors duration-300 font-semibold`}
                        disabled={loading}
                    >
                        {loading ? "Registrando..." : "Registrar"}
                    </button>

                    <div>
                        <span className="m-4">
                            Ya tienes una cuenta{" "}
                            <a
                                className="text-blue-500 hover:text-cyan-400 cursor-pointer"
                                href={"/login"}
                            >
                                Iniciar sesión
                            </a>
                        </span>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;