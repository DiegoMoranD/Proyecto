import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Config from "../../layouts/PageAuth/Config";
import AuthUser from "../../layouts/PageAuth/AuthUser";
import Modal from "../../Modal";

function Register() {
    const { getToken } = AuthUser();
    const navigate = useNavigate();

    const [errors, setErrors] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);

    const validateFields = () => {
        const newErrors = {};

        // Validar campos de la empresa
        if (!empresa.nombre.trim()) newErrors.nombre = "El nombre de la empresa es obligatorio.";
        if (!empresa.correo.trim()) {
            newErrors.correo = "El correo de la empresa es obligatorio.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(empresa.correo)) {
            newErrors.correo = "Formato de Email inválido: ejemplo@dominio.com";
        }
        if (!empresa.telefono.trim()) {
            newErrors.telefono = "El teléfono de la empresa es obligatorio.";
        } else if (!/^\d{10}$/.test(empresa.telefono)) {
            newErrors.telefono = "El teléfono debe tener 10 dígitos.";
        }
        if (!empresa.cedula.trim()) newErrors.cedula = "La cédula profesional es obligatoria.";

        // Validar campos del usuario
        if (!usuario.name.trim()) newErrors.name = "El nombre del usuario es obligatorio.";
        if (!usuario.paterno.trim()) newErrors.paterno = "El apellido paterno es obligatorio.";
        if (!usuario.email.trim()) {
            newErrors.email = "El email del usuario es obligatorio.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(usuario.email)) {
            newErrors.email = "Formato de Email inválido: ejemplo@dominio.com";
        }
        if (!usuario.password.trim()) {
            newErrors.password = "La contraseña es obligatoria.";
        } else {
            const passwordStrength = checkPasswordStrength(usuario.password);
            if (passwordStrength === "weak") {
                newErrors.password = "Contraseña débil: usa al menos 8 caracteres, incluyendo letras, números y símbolos.";
            }
        }
        if (!usuario.telefono.trim()) {
            newErrors.telefonoUsuario = "El teléfono del usuario es obligatorio.";
        } else if (!/^\d{10}$/.test(usuario.telefono)) {
            newErrors.telefonoUsuario = "El teléfono debe tener 10 dígitos.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Retorna true si no hay errores
    };

    const checkPasswordStrength = (password) => {
        const weakRegex = /^.{0,7}$/; // Menos de 8 caracteres
        const goodRegex = /^(?=.*[A-Za-z])(?=.*\d).{4,}$/; // Letras y números, al menos 8 caracteres
        const strongRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&]).{4,}$/; // Letras, números y símbolos

        if (weakRegex.test(password)) return "weak";
        if (goodRegex.test(password)) return "good";
        if (strongRegex.test(password)) return "strong";
        return "weak";
    };

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

        if (!validateFields()) {
            setIsModalOpen(true); // Mostrar el modal si hay errores
            return;
        }

        setLoading(true);

        try {
            // Verificar si el correo ya existe
            const emailCheckResponse = await Config.getCheckEmail({ email: empresa.email });
            if (emailCheckResponse.data.exists) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    correo: "Cuenta ya registrada",
                }));
                setUsuario((prevEmpresa) => ({ ...prevEmpresa, correo: "" })); // Limpia el campo
                setLoading(false);
                return; // Detener el flujo si el correo ya existe
            }

            // Registrar la empresa
            const empresaResponse = await Config.getEmpresaStore({
                nombre: empresa.nombre,
                correo: empresa.correo,
                telefono: empresa.telefono, // Convertir a número entero
                cedula: empresa.cedula,
                suscripcion_id: empresa.suscripcion_id,
                rfc: "default_rfc", // Valor por defecto
                tocken_acceso: "default_token", // Valor por defecto
                cuenta_valida: 1, // Valor por defecto
                fecha_registro: new Date().toISOString().split("T")[0], // Fecha actual
                fecha_vencimiento: "2025-12-31", // Fecha de ejemplo
                fecha_compra: new Date().toISOString().split("T")[0], // Fecha actual
            });

            const empresa_id = empresaResponse.data.id; // Obtener el ID de la empresa registrada

            if (!empresa_id) {
                throw new Error("No se pudo obtener el ID de la empresa registrada.");
            }

            // Registrar el usuario con el ID de la empresa
            const usuarioData = { ...usuario, empresa_id };
            await Config.getUsuarioStore({
                name: usuarioData.name,
                paterno: usuarioData.paterno,
                materno: usuarioData.materno,
                username: "default_username", // Valor por defecto
                tipo_usuario_id: 2, // Cambiado a "tipo_usuario_id" para coincidir con la base de datos
                email: usuarioData.email,
                password: usuarioData.password,
                telefono: usuarioData.telefono, // Convertir a número entero
                empresa_id: usuarioData.empresa_id,
                remember_token: "default_token", // Valor por defecto
            });

            alert("Empresa y usuario registrados exitosamente");
            navigate("/login");
        } catch (error) {
            if (error.response) {
                if (error.response.status === 409) {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        correo: "Este correo ya está registrado",
                    }));
                    setEmpresa((prevEmpresa) => ({ ...prevEmpresa, correo: "" })); // Limpia el campo
                } else if (error.response.status === 422) {
                    const errors = error.response.data.errors;
                    const errorMessages = Object.values(errors).flat().join("\n");
                    alert(`Errores de validación:\n${errorMessages}`);
                } else {
                    console.error("Error al registrar:", error);
                    alert("Ocurrió un error al registrar los datos.");
                }
            }
        } finally {
            setLoading(false);
        }
    };

    const checkEmailExists = async () => {
        if (!empresa.correo.trim()) return; // No hacer nada si el campo está vacío

        try {
            const response = await Config.getCheckEmail({ email: empresa.correo }); // Verificar en la tabla empresas
            if (response.data.exists) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    correo: "Este correo ya está registrado",
                }));
                setEmpresa((prevEmpresa) => ({ ...prevEmpresa, correo: "" })); // Limpia el campo
            } else {
                setErrors((prevErrors) => {
                    const { correo, ...rest } = prevErrors; // Elimina el error de correo si no existe
                    return rest;
                });
            }
        } catch (error) {
            console.error("Error al verificar el correo:", error);
        }
    };

    return (
        <div className="bg-[#626365] text-black h-screen flex justify-center items-center">
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Errores en el formulario"
                message={
                    <ul>
                        {Object.values(errors).map((error, index) => (
                            <li key={index} className="text-red-500">
                                {error}
                            </li>
                        ))}
                    </ul>
                }
            />
            <div className="bg-[#fff] border border-[#e11a31] rounded-md p-6 md:p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative max-w-lg md:max-w-4xl mx-auto">
                <h1 className="text-2xl sm:text-3xl md:text-4xl text-black/75 font-bold text-center mb-8">
                    Registro de Empresa y Usuario
                </h1>
                <form onSubmit={submitRegistro} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Datos de la Empresa */}
                    <h2 className="col-span-2 text-xl sm:text-2xl font-semibold mb-4">
                        Datos de la Empresa
                    </h2>
                    <div className="relative">
                        <input
                            type="text"
                            name="nombre"
                            value={empresa.nombre}
                            onChange={handleEmpresaChange}
                            className="block w-full py-2.5 px-0 text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder="Nombre de la Empresa"
                        />
                    </div>
                    <div className="relative">
                        <input
                            type="email"
                            name="correo"
                            value={empresa.correo}
                            onChange={(e) => {
                                const email = e.target.value;
                                setEmpresa((prevEmpresa) => ({ ...prevEmpresa, correo: email }));
                                setUsuario((prevUsuario) => ({ ...prevUsuario, email })); // Sincronizar el correo
                            }}
                            onBlur={checkEmailExists}
                            className={`block w-full py-2.5 px-0 text-sm text-black bg-transparent border-0 border-b-2 ${errors.correo ? "border-red-500" : "border-gray-300"
                                } appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                            placeholder="Correo de la Empresa"
                        />
                        {errors.correo && <span className="text-red-500 text-sm mt-1">{errors.correo}</span>}
                    </div>
                    <div className="relative">
                        <input
                            type="tel"
                            name="telefono"
                            value={empresa.telefono}
                            onChange={handleEmpresaChange}
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
                            className="block w-full py-2.5 px-0 text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder="Cédula Profesional"
                        />
                    </div>

                    {/* Datos del Usuario */}
                    <h2 className="col-span-2 text-xl sm:text-2xl font-semibold mt-8 mb-4">
                        Datos del Usuario
                    </h2>
                    <div className="relative">
                        <input
                            type="text"
                            name="name"
                            value={usuario.name}
                            onChange={handleUsuarioChange}
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
                            className="block w-full py-2.5 px-0 text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder="Apellido Materno"
                        />
                    </div>
                    <div className="relative">
                        <input
                            type="password"
                            name="password"
                            value={usuario.password}
                            onChange={(e) => {
                                setUsuario({ ...usuario, password: e.target.value });
                            }}
                            className={`block w-full py-2.5 px-0 text-sm text-black bg-transparent border-0 border-b-2 ${errors.password ? "border-red-500" : "border-gray-300"
                                } appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                            placeholder="Contraseña"
                        />
                        {errors.password && <span className="text-red-500 text-sm mt-1">{errors.password}</span>}
                        <div className="mt-2 text-sm">
                            Fortaleza:{" "}
                            <span
                                className={`font-bold ${checkPasswordStrength(usuario.password) === "weak"
                                        ? "text-red-500"
                                        : checkPasswordStrength(usuario.password) === "good"
                                            ? "text-yellow-500"
                                            : "text-green-500"
                                    }`}
                            >
                                {checkPasswordStrength(usuario.password) === "weak"
                                    ? "Débil"
                                    : checkPasswordStrength(usuario.password) === "good"
                                        ? "Buena"
                                        : "Fuerte"}
                            </span>
                        </div>
                    </div>
                    <div className="relative">
                        <input
                            type="tel"
                            name="telefono"
                            value={usuario.telefono}
                            onChange={handleUsuarioChange}
                            className="block w-full py-2.5 px-0 text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder="Teléfono del Usuario"
                        />
                    </div>

                    <button
                        type="submit"
                        className={`col-span-2 w-full md:w-auto mb-4 text-[16px] md:text-[18px] mt-6 rounded-full ${loading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-slate-300 hover:bg-[#e11a31] hover:text-white"
                            } py-2 px-6 transition-colors duration-300 font-semibold`}
                        disabled={loading}
                    >
                        {loading ? "Registrando..." : "Registrar"}
                    </button>

                    <div className="col-span-2 text-center">
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