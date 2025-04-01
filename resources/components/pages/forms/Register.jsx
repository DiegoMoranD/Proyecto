import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Config from "../../layouts/PageAuth/Config";
import AuthUser from "../../layouts/PageAuth/AuthUser";

function Register() {
    const { getToken } = AuthUser();
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [telefono, setTelefono] = useState("");
    const [materno, setMaterno] = useState("");
    const [paterno, setPaterno] = useState("");
    const [name, setName] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (getToken()) {
            navigate("/");
        }
    }, []);

    const submitRegistro = async (e) => {
        e.preventDefault();

        Config.getRegister({
            name,
            email,
            password,
            username,
            telefono,
            materno,
            paterno,
        }).then(({ data }) => {
            if (data.success) {
                openModal(`Cuenta registrada bienvenido ${name}`, "/login");
            }
        });
    };

    return (
        <div className="bg-[#626365] text-black h-screen flex justify-center items-center">
            <div className=" bg-[#fff] border border-[#e11a31] rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative">
                <h1 className=" text-4xl text-black/75 font-bold text-center mb-12">
                    Registrarse
                </h1>
                <form action="">
                    {/* Nombre */}
                    <div className="relative my-4">
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="block w-72 py-2.5 px-0 text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=""
                        />
                        <label className="absolute text-sm text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Nombre
                        </label>
                    </div>

                    {/* Apellido Paterno */}
                    <div className="relative my-4">
                        <input
                            type="text"
                            value={paterno}
                            onChange={(e) => setPaterno(e.target.value)}
                            required
                            className="block w-72 py-2.5 px-0 text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=""
                        />
                        <label className="absolute text-sm text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Apellido Paterno
                        </label>
                    </div>

                    {/* Apellido Materno */}
                    <div className="relative my-4">
                        <input
                            type="text"
                            value={materno}
                            onChange={(e) => setMaterno(e.target.value)}
                            required
                            className="block w-72 py-2.5 px-0 text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=""
                        />
                        <label className="absolute text-sm text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Apellido Materno
                        </label>
                    </div>

                    {/* Username */}
                    <div className="relative my-4">
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="block w-72 py-2.5 px-0 text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=""
                        />
                        <label className="absolute text-sm text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Nombre de Usuario
                        </label>
                    </div>

                    {/* Teléfono */}
                    <div className="relative my-4">
                        <input
                            type="text"
                            value={telefono}
                            onChange={(e) => setTelefono(e.target.value)}
                            required
                            className="block w-72 py-2.5 px-0 text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=""
                        />
                        <label className="absolute text-sm text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Teléfono
                        </label>
                    </div>

                    {/* Email */}
                    <div className="relative my-4">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="block w-72 py-2.5 px-0 text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=""
                        />
                        <label className="absolute text-sm text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Email
                        </label>
                    </div>

                    {/* Contraseña */}
                    <div className="relative my-4">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="block w-72 py-2.5 px-0 text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=""
                        />
                        <label className="absolute text-sm text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Contraseña
                        </label>
                    </div>

                    <button
                        onClick={submitRegistro}
                        className="w-full mb-4 text-[18px] mt-6 rounded-full bg-slate-300 hover:bg-[#e11a31] hover:text-white py-2 transition-colors duration-300 font-semibold"
                    >
                        Registrarse
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