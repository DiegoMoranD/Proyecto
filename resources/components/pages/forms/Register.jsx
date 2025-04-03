import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Config from "../../layouts/PageAuth/Config";
import AuthUser from "../../layouts/PageAuth/AuthUser";

function Register() {
    const { getToken } = AuthUser();
    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [telefono, setTelefono] = useState("");
    const [rfc, setRfc] = useState("");
    const [tockenAcceso, setTockenAcceso] = useState("");
    const [cuentaValida, setCuentaValida] = useState("");
    const [cedula, setCedula] = useState("");
    const [suscripcionId, setSuscripcionId] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (getToken()) {
            navigate("/");
        }
    }, []);

    const submitRegistro = async (e) => {
        e.preventDefault();

        Config.getRegister({
            nombre,
            correo,
            telefono,
            rfc,
            tocken_acceso: tockenAcceso,
            cuenta_valida: cuentaValida,
            cedula,
            suscripcion_id: suscripcionId,
        }).then(({ data }) => {
            if (data.success) {
                openModal(`Empresa registrada exitosamente: ${nombre}`, "/login");
            }
        });
    };

    return (
        <div className="bg-[#626365] text-black h-screen flex justify-center items-center">
            <div className="bg-[#fff] border border-[#e11a31] rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative">
                <h1 className="text-4xl text-black/75 font-bold text-center mb-12">
                    Registrar Empresa
                </h1>
                <form action="" className="grid grid-cols-2 gap-4">
                    {/* Nombre */}
                    <div className="relative">
                        <input
                            type="text"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            required
                            className="block w-full py-2.5 px-0 text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=""
                        />
                        <label className="absolute text-sm text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Nombre
                        </label>
                    </div>

                    {/* Correo */}
                    <div className="relative">
                        <input
                            type="email"
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)}
                            required
                            className="block w-full py-2.5 px-0 text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=""
                        />
                        <label className="absolute text-sm text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Correo
                        </label>
                    </div>

                    {/* Teléfono */}
                    <div className="relative">
                        <input
                            type="text"
                            value={telefono}
                            onChange={(e) => setTelefono(e.target.value)}
                            required
                            className="block w-full py-2.5 px-0 text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=""
                        />
                        <label className="absolute text-sm text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Teléfono
                        </label>
                    </div>

                    {/* RFC */}
                    <div className="relative">
                        <input
                            type="text"
                            value={rfc}
                            onChange={(e) => setRfc(e.target.value)}
                            required
                            className="block w-full py-2.5 px-0 text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=""
                        />
                        <label className="absolute text-sm text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            RFC
                        </label>
                    </div>

                    {/* Token de Acceso */}
                    <div className="relative">
                        <input
                            type="text"
                            value={tockenAcceso}
                            onChange={(e) => setTockenAcceso(e.target.value)}
                            required
                            className="block w-full py-2.5 px-0 text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=""
                        />
                        <label className="absolute text-sm text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Token de Acceso
                        </label>
                    </div>

                    {/* Cuenta Válida */}
                    <div className="relative">
                        <input
                            type="text"
                            value={cuentaValida}
                            onChange={(e) => setCuentaValida(e.target.value)}
                            required
                            className="block w-full py-2.5 px-0 text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=""
                        />
                        <label className="absolute text-sm text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Cuenta Válida
                        </label>
                    </div>

                    {/* Cédula */}
                    <div className="relative">
                        <input
                            type="text"
                            value={cedula}
                            onChange={(e) => setCedula(e.target.value)}
                            required
                            className="block w-full py-2.5 px-0 text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=""
                        />
                        <label className="absolute text-sm text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Cédula
                        </label>
                    </div>

                    {/* Suscripción ID */}
                    <div className="relative">
                        <input
                            type="text"
                            value={suscripcionId}
                            onChange={(e) => setSuscripcionId(e.target.value)}
                            required
                            className="block w-full py-2.5 px-0 text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=""
                        />
                        <label className="absolute text-sm text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            ID de Suscripción
                        </label>
                    </div>

                    <button
                        onClick={submitRegistro}
                        className="col-span-2 w-full mb-4 text-[18px] mt-6 rounded-full bg-slate-300 hover:bg-[#e11a31] hover:text-white py-2 transition-colors duration-300 font-semibold"
                    >
                        Registrar Empresa
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