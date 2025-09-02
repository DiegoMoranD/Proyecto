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
        <div className="bg-[url('/resources/components/imgs/banner4.jpg')] bg-no-repeat bg-cover bg-center text-black h-screen flex justify-center items-center">
            {/* <Modal
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
            /> */}
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
                            type="tel"
                            name="telefono"
                            value={usuario.telefono}
                            onChange={handleUsuarioChange}
                            className="block w-full py-2.5 px-0 text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder="Teléfono del Usuario"
                        />
                    </div>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={usuario.password}
                            onChange={(e) => {
                                setUsuario({ ...usuario, password: e.target.value });
                                evaluateStrPassword(e.target.value)
                            }}
                            className={`block w-full py-2.5 px-0 text-sm text-black bg-transparent border-0 border-b-2 ${errors.password ? "border-red-500" : "border-gray-300"
                                } appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                            placeholder="Contraseña"
                        />
                        {errors.password && <span className="text-red-500 text-sm mt-1">{errors.password}</span>}
                        <button
                            type="button"
                            className="absolute right-1 top-[30%] -translate-y-1/2 focus:outline-none"
                            onClick={() => setShowPassword((prev) => !prev)}
                            tabIndex={-1}
                        >
                            {showPassword ? <OpenEyeSVG /> : <OffEyeSVG />}
                        </button>
                        <div className="mt-3 ">
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