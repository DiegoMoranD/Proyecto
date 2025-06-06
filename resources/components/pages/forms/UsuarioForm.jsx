import React, { useEffect, useState } from "react";
import Config from "../../layouts/PageAuth/Config";
import { useNavigate } from "react-router-dom";

function UsuarioForm() {
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState({
        name: "",
        paterno: "",
        materno: "",
        username: "",
        email: "",
        password: "",
        tipo_usuario_id: "",
        telefono: "",
        empresa_id: 0,
    });
    const [empresas, setEmpresas] = useState([]);
    const [tipoUsuario, setTipoUsuario] = useState([]);
    const [errors, setErrors] = useState({});
    const [passwordStr, setPasswordStr] = useState(0);
    const [strLabel, setStrLabel] = useState("Débil");
    const getRol = () => {
        const rol = sessionStorage.getItem('rol');
        return rol ? JSON.parse(rol) : null;
    }

    const rol = getRol();

    const handleUsuarioChange = (e) => {
        setUsuario({ ...usuario, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        const fetchEmpresa = async () => {
            try {
                const response = await Config.getAlltEmpresa();
                setEmpresas(response.data);
            } catch (error) {
                console.error("Error encontrado", error);
            }
        };
        fetchEmpresa();

        const fetchTipoUsuario = async () => {
            try {
                const response = await Config.getAllTipoUsuario();
                setTipoUsuario(response.data);
            } catch (error) {
                console.error("Error encontrado", error);
            }
        };
        fetchTipoUsuario();

    }, []);

    const evaluateStrPassword = (password) => {
        let strength = 0;
        if (password.length >= 8) strength += 1;
        if (/[A-Z]/.test(password)) strength += 1;
        if (/[0-9]/.test(password)) strength += 1;
        if (/[^A-Za-z0-9]/.test(password)) strength += 1;

        let percentage = (strength / 3) * 100;
        let label = "Débil"

        if (percentage >= 75) label = "Fuerte";
        else if (percentage >= 50) label = "Media";

        setStrLabel(label)
        setPasswordStr(percentage)
    }

    const submitUsuario = async (e) => {
        e.preventDefault();
        try {
            const response = await Config.storeUsuarioByRoot({
                ...usuario
            });

            // Si el registro fue exitoso (status 201 o success en la respuesta)
            if (response.status === 201 || response.data.success) {
                alert("Usuario registrado exitosamente");
                // Redirige a la tabla de empresas
                navigate(`/${rol}/usuario`);
            }
        } catch (error) {
            alert("Error al registrar al usuario");
            console.error(error);
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6 border-b pb-4 border-gray-600/25">
                Registro de Usuario
            </h2>

            <form onSubmit={submitUsuario}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Nombre de la empresa */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1.5">
                            Nombre
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={usuario.name}
                            onChange={handleUsuarioChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Ej: Tech Solutions S.A."
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1.5">
                            Apellido Paterno
                        </label>
                        <input
                            type="text"
                            name="paterno"
                            value={usuario.paterno}
                            onChange={handleUsuarioChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Ej: Tech Solutions S.A."
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1.5">
                            Apellido Materno
                        </label>
                        <input
                            type="text"
                            name="materno"
                            value={usuario.materno}
                            onChange={handleUsuarioChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Ej: Tech Solutions S.A."
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1.5">
                            Email
                        </label>
                        <input
                            type="text"
                            name="email"
                            value={usuario.email}
                            onChange={handleUsuarioChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Ej: Tech Solutions S.A."
                        />
                    </div>

                    {/* Teléfono */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1.5">
                            Teléfono
                        </label>
                        <input
                            type="tel"
                            name="telefono"
                            value={usuario.telefono}
                            onChange={handleUsuarioChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Ej: +52 123 456 7890"
                        />
                    </div>

                    {/* Suscripción ID */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1.5">
                            Tipo de usuario (Rol)
                        </label>
                        <select
                            value={usuario.tipo_usuario_id}
                            name="tipo_usuario_id"
                            onChange={handleUsuarioChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400">
                            <option value="">Selecciona el tipo de usuario</option>
                            {tipoUsuario.map((tipoUsuario) => (
                                <option key={tipoUsuario.id} value={tipoUsuario.id}>
                                    {tipoUsuario.nombre_tipo}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Fecha de registro */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1.5">
                            Id de la empresa
                        </label>
                        <select
                            value={usuario.empresa_id}
                            name="empresa_id"
                            onChange={handleUsuarioChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400">
                            <option value="">Selecciona una empresa</option>
                            {empresas.map((empresa) => (
                                <option key={empresa.id} value={empresa.id}>
                                    {empresa.nombre}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1.5">
                            Username
                        </label>
                        <input
                            type="text"
                            name="username"
                            value={usuario.username}
                            onChange={handleUsuarioChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Ej: +52 123 456 7890"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1.5">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={usuario.password}
                            onChange={(e) => {
                                setUsuario({ ...usuario, password: e.target.value });
                                evaluateStrPassword(e.target.value)
                            }}
                            className={`w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${errors.password ? 'border-red-500' : 'border-gray-300'
                                } appearance-none focus:outline-none focus:ring-0 focus:text-black focus:border-blue-600 peer`}
                            placeholder="Ingrese Contraseña"
                        />

                        <div className="mt-2 mb-4">
                            <div className="w-full h-2 bg-gray-300 rounded">
                                <div
                                    className={`h-full rounded transition-all duration-300 ${passwordStr < 50 ? 'bg-red-500' :
                                        passwordStr < 75 ? 'bg-yellow-500' :
                                            'bg-green-500'
                                        }`}
                                    style={{ width: `${passwordStr}%` }}
                                ></div>
                            </div>
                            <p className="text-sm mt-1 text-gray-600">{strLabel}</p>
                        </div>
                    </div>

                </div>

                {/* Botón de Enviar */}
                <div className="mt-12 text-center">
                    <button
                        type="submit"
                        className="bg-green-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-green-600 transition">
                        Registrar Usuario
                    </button>
                </div>
            </form>
        </div>
    )
}

export default UsuarioForm 