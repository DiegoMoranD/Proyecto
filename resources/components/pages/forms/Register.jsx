import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Config from "../../layouts/PageAuth/Config";
import AuthUser from "../../layouts/PageAuth/AuthUser";
import OpenEyeSVG from '../../svg/OpenEyeSVG';
import OffEyeSVG from '../../svg/OffEyeSVG';
import Swal from "sweetalert2";

function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const { getToken } = AuthUser();
    const navigate = useNavigate();
    const [passwordStr, setPasswordStr] = useState(0);
    const [strLabel, setStrLabel] = useState("Débil");
    const [errors, setErrors] = useState({});

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
        }
        if (!usuario.telefono.trim()) {
            newErrors.telefonoUsuario = "El teléfono del usuario es obligatorio.";
        } else if (!/^\d{10}$/.test(usuario.telefono)) {
            newErrors.telefonoUsuario = "El teléfono debe tener 10 dígitos.";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            // Mostrar los errores con SweetAlert2
            Swal.fire({
                title: "Errores en el formulario",
                html: `<ul style="text-align:left; color:red;">
                        ${Object.values(newErrors).map(err => `<li>${err}</li>`).join("")}
                       </ul>`,
                icon: "error"
            });
        }

        return Object.keys(newErrors).length === 0;
    };

    const [empresa, setEmpresa] = useState({
        nombre: "",
        correo: "",
        telefono: "",
        cedula: "",
        suscripcion_id: 1,
    });

    const [usuario, setUsuario] = useState({
        name: "",
        paterno: "",
        materno: "",
        password: "",
        telefono: "",
        empresa_id: null,
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
            return;
        }

        setLoading(true);

        try {
            const emailCheckResponse = await Config.getCheckEmail({ email: empresa.email });
            if (emailCheckResponse.data.exists) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    correo: "Cuenta ya registrada",
                }));
                setUsuario((prevEmpresa) => ({ ...prevEmpresa, correo: "" }));
                setLoading(false);
                return;
            }

            const empresaResponse = await Config.getEmpresaStore({
                nombre: empresa.nombre,
                correo: empresa.correo,
                telefono: empresa.telefono,
                cedula: empresa.cedula,
                suscripcion_id: empresa.suscripcion_id,
                rfc: "default_rfc",
                tocken_acceso: "default_token",
                cuenta_valida: 1,
                fecha_registro: new Date().toISOString().split("T")[0],
                fecha_vencimiento: "2025-12-31",
                fecha_compra: new Date().toISOString().split("T")[0],
            });

            const empresa_id = empresaResponse.data.id;
            if (!empresa_id) {
                throw new Error("No se pudo obtener el ID de la empresa registrada.");
            }

            const usuarioData = { ...usuario, empresa_id };
            await Config.getUsuarioStore({
                name: usuarioData.name,
                paterno: usuarioData.paterno,
                materno: usuarioData.materno,
                username: "default_username",
                tipo_usuario_id: 3,
                intentos: 3,
                email: usuarioData.email,
                password: usuarioData.password,
                telefono: usuarioData.telefono,
                empresa_id: usuarioData.empresa_id,
                remember_token: "default_token",
            });

            Swal.fire({
                title: "Registro Existoso",
                text: "La empresa y usuario se registraron exitosamente",
                icon: "success"
            }).then(() => {
                navigate("/login");
            });
        } catch (error) {
            if (error.response) {
                if (error.response.status === 409) {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        correo: "Este correo ya está registrado",
                    }));
                    setEmpresa((prevEmpresa) => ({ ...prevEmpresa, correo: "" }));
                } else if (error.response.status === 422) {
                    const errors = error.response.data.errors;
                    const errorMessages = Object.values(errors).flat().join("<br/>");
                    Swal.fire({
                        title: "Errores de validación",
                        html: errorMessages,
                        icon: "error"
                    });
                } else {
                    console.error("Error al registrar:", error);
                    Swal.fire({
                        title: "Hubo un error",
                        text: "Ocurrió un error al registrar los datos.",
                        icon: "error"
                    });
                }
            }
        } finally {
            setLoading(false);
        }
    };

    const checkEmailExists = async () => {
        if (!empresa.correo.trim()) return;

        try {
            const response = await Config.getCheckEmail({ email: empresa.correo });
            if (response.data.exists) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    correo: "Este correo ya está registrado",
                }));
                setEmpresa((prevEmpresa) => ({ ...prevEmpresa, correo: "" }));
            } else {
                setErrors((prevErrors) => {
                    const { correo, ...rest } = prevErrors;
                    return rest;
                });
            }
        } catch (error) {
            console.error("Error al verificar el correo:", error);
        }
    };

    return (
        <div className="flex flex-col md:flex-row h-screen w-full bg-white">
            {/* Imagen lateral */}
            <div className="hidden md:flex w-1/2 bg-cover bg-center bg-[url('/resources/components/imgs/banner4.jpg')] relative">
                <div className="absolute inset-0 bg-black/25 flex flex-col justify-center items-center text-white p-8">
                    <h1 className="text-4xl font-bold mb-3 text-center">Bienvenido al Registro</h1>
                    <p className="text-center text-lg">Registra tu empresa y usuario para comenzar</p>
                </div>
            </div>

            {/* Formulario */}
            <div className="w-full md:w-1/2 flex justify-center items-center bg-gray-200 px-6 sm:px-10 md:px-16 overflow-y-auto">
                <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8 md:p-10">
                    <h2 className="text-3xl font-bold text-center text-blue-500 mb-8">
                        Registro de Empresa y Usuario
                    </h2>

                    <form onSubmit={submitRegistro} className="space-y-6">
                        {/* Empresa */}
                        <div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">
                                Datos de la Empresa
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    name="nombre"
                                    placeholder="Nombre de la Empresa"
                                    value={empresa.nombre}
                                    onChange={handleEmpresaChange}
                                    className="w-full border-b-2 border-gray-300 focus:border-[#e11a31] focus:outline-none py-2 px-1"
                                />
                                <input
                                    type="email"
                                    name="correo"
                                    placeholder="Correo de la Empresa"
                                    value={empresa.correo}
                                    onChange={(e) => {
                                        const email = e.target.value;
                                        setEmpresa((prev) => ({ ...prev, correo: email }));
                                        setUsuario((prev) => ({ ...prev, email }));
                                    }}
                                    className="w-full border-b-2 border-gray-300 focus:border-[#e11a31] focus:outline-none py-2 px-1"
                                />
                                <input
                                    type="tel"
                                    name="telefono"
                                    placeholder="Teléfono"
                                    value={empresa.telefono}
                                    onChange={handleEmpresaChange}
                                    className="w-full border-b-2 border-gray-300 focus:border-[#e11a31] focus:outline-none py-2 px-1"
                                />
                                <input
                                    type="text"
                                    name="cedula"
                                    placeholder="Cédula Profesional"
                                    value={empresa.cedula}
                                    onChange={handleEmpresaChange}
                                    className="w-full border-b-2 border-gray-300 focus:border-[#e11a31] focus:outline-none py-2 px-1"
                                />
                            </div>
                        </div>

                        {/* Usuario */}
                        <div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">
                                Datos del Usuario
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Nombre"
                                    value={usuario.name}
                                    onChange={handleUsuarioChange}
                                    className="w-full border-b-2 border-gray-300 focus:border-[#e11a31] focus:outline-none py-2 px-1"
                                />
                                <input
                                    type="text"
                                    name="paterno"
                                    placeholder="Apellido Paterno"
                                    value={usuario.paterno}
                                    onChange={handleUsuarioChange}
                                    className="w-full border-b-2 border-gray-300 focus:border-[#e11a31] focus:outline-none py-2 px-1"
                                />
                                <input
                                    type="text"
                                    name="materno"
                                    placeholder="Apellido Materno"
                                    value={usuario.materno}
                                    onChange={handleUsuarioChange}
                                    className="w-full border-b-2 border-gray-300 focus:border-[#e11a31] focus:outline-none py-2 px-1"
                                />
                                <input
                                    type="tel"
                                    name="telefono"
                                    placeholder="Teléfono del Usuario"
                                    value={usuario.telefono}
                                    onChange={handleUsuarioChange}
                                    className="w-full border-b-2 border-gray-300 focus:border-[#e11a31] focus:outline-none py-2 px-1"
                                />
                            </div>

                            {/* Contraseña */}
                            <div className="mt-4 relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Contraseña"
                                    value={usuario.password}
                                    onChange={(e) => {
                                        setUsuario({ ...usuario, password: e.target.value });
                                        evaluateStrPassword(e.target.value);
                                    }}
                                    className="w-full border-b-2 border-gray-300 focus:border-[#e11a31] focus:outline-none py-2 px-1"
                                />
                                <button
                                    type="button"
                                    className="absolute right-2 top-2 text-gray-600"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                >
                                    {showPassword ? <OpenEyeSVG /> : <OffEyeSVG />}
                                </button>
                                <div className="mt-2">
                                    <div className="w-full h-2 bg-gray-200 rounded">
                                        <div
                                            className={`h-full rounded transition-all duration-300 ${passwordStr < 50
                                                    ? "bg-red-500"
                                                    : passwordStr < 75
                                                        ? "bg-yellow-500"
                                                        : "bg-green-500"
                                                }`}
                                            style={{ width: `${passwordStr}%` }}
                                        ></div>
                                    </div>
                                    <p className="text-sm mt-1 text-gray-600">{strLabel}</p>
                                </div>
                            </div>
                        </div>

                        {/* Botón */}
                        <button
                            type="submit"
                            className={`w-full mt-6 py-3 rounded-full text-white font-semibold transition-all ${loading
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-blue-500 hover:bg-blue-600"
                                }`}
                            disabled={loading}
                        >
                            {loading ? "Registrando..." : "Registrar"}
                        </button>

                        {/* Link al login */}
                        <p className="text-center text-sm mt-4">
                            ¿Ya tienes una cuenta?{" "}
                            <a href="/login" className="text-blue-500 hover:text-blue-600 font-medium">
                                Iniciar sesión
                            </a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;