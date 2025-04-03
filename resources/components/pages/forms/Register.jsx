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
        telefono: "",
        cedula: "",
        tipoSuscripcion: "demo", // Por defecto "demo"
    });

    // Estado para los datos del usuario
    const [usuario, setUsuario] = useState({
        nombre: "",
        apellidoPaterno: "",
        apellidoMaterno: "",
        email: "",
        contraseña: "",
        telefono: "",
        empresaId: null, // Se asignará después de registrar la empresa
    });

    useEffect(() => {
        if (getToken()) {
            navigate("/");
        }
    }, []);

    const handleEmpresaChange = (e) => {
        setEmpresa({ ...empresa, [e.target.name]: e.target.value });
    };

    const handleUsuarioChange = (e) => {
        setUsuario({ ...usuario, [e.target.name]: e.target.value });
    };

    const submitRegistro = async (e) => {
        e.preventDefault();

        try {
            // Registrar la empresa
            const empresaResponse = await Config.post("/api/empresas", empresa);
            const empresaId = empresaResponse.data.id; // Obtener el ID de la empresa registrada

            // Registrar el usuario con el ID de la empresa
            const usuarioData = { ...usuario, empresaId };
            await Config.post("/api/usuarios", usuarioData);

            alert("Empresa y usuario registrados exitosamente");
            navigate("/login");
        } catch (error) {
            console.error("Error al registrar:", error);
            alert("Ocurrió un error al registrar los datos.");
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
                            placeholder=""
                        />
                        <label className="absolute text-sm text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Nombre de la Empresa
                        </label>
                    </div>
                    <div className="relative">
                        <input
                            type="email"
                            name="correo"
                            value={empresa.correo}
                            onChange={handleEmpresaChange}
                            required
                            className="block w-full py-2.5 px-0 text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=""
                        />
                        <label className="absolute text-sm text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Correo de la Empresa
                        </label>
                    </div>
                    <div className="relative">
                        <input
                            type="text"
                            name="telefono"
                            value={empresa.telefono}
                            onChange={handleEmpresaChange}
                            required
                            className="block w-full py-2.5 px-0 text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=""
                        />
                        <label className="absolute text-sm text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Teléfono de la Empresa
                        </label>
                    </div>
                    <div className="relative">
                        <input
                            type="text"
                            name="cedula"
                            value={empresa.cedula}
                            onChange={handleEmpresaChange}
                            required
                            className="block w-full py-2.5 px-0 text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=""
                        />
                        <label className="absolute text-sm text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Cédula Profesional
                        </label>
                    </div>

                    {/* Datos del Usuario */}
                    <h2 className="col-span-2 text-2xl font-semibold mt-8 mb-4">Datos del Usuario</h2>
                    <div className="relative">
                        <input
                            type="text"
                            name="nombre"
                            value={usuario.nombre}
                            onChange={handleUsuarioChange}
                            required
                            className="block w-full py-2.5 px-0 text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=""
                        />
                        <label className="absolute text-sm text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Nombre del Usuario
                        </label>
                    </div>
                    <div className="relative">
                        <input
                            type="text"
                            name="apellidoPaterno"
                            value={usuario.apellidoPaterno}
                            onChange={handleUsuarioChange}
                            required
                            className="block w-full py-2.5 px-0 text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=""
                        />
                        <label className="absolute text-sm text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Apellido Paterno
                        </label>
                    </div>
                    <div className="relative">
                        <input
                            type="text"
                            name="apellidoMaterno"
                            value={usuario.apellidoMaterno}
                            onChange={handleUsuarioChange}
                            required
                            className="block w-full py-2.5 px-0 text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=""
                        />
                        <label className="absolute text-sm text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Apellido Materno
                        </label>
                    </div>
                    <div className="relative">
                        <input
                            type="email"
                            name="email"
                            value={usuario.email}
                            onChange={handleUsuarioChange}
                            required
                            className="block w-full py-2.5 px-0 text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=""
                        />
                        <label className="absolute text-sm text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Email del Usuario
                        </label>
                    </div>
                    <div className="relative">
                        <input
                            type="password"
                            name="contraseña"
                            value={usuario.contraseña}
                            onChange={handleUsuarioChange}
                            required
                            className="block w-full py-2.5 px-0 text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=""
                        />
                        <label className="absolute text-sm text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Contraseña
                        </label>
                    </div>
                    <div className="relative">
                        <input
                            type="text"
                            name="telefono"
                            value={usuario.telefono}
                            onChange={handleUsuarioChange}
                            required
                            className="block w-full py-2.5 px-0 text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=""
                        />
                        <label className="absolute text-sm text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Teléfono del Usuario
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="col-span-2 w-full mb-4 text-[18px] mt-6 rounded-full bg-slate-300 hover:bg-[#e11a31] hover:text-white py-2 transition-colors duration-300 font-semibold"
                    >
                        Registrar
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