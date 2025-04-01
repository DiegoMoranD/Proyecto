import React, { useState, useEffect } from 'react';
import AuthUser from '../../layouts/PageAuth/AuthUser';
import { useNavigate } from 'react-router-dom';
import Config from '../../layouts/PageAuth/Config';
import axios from 'axios';

function Login() {
    const { getToken, setToken } = AuthUser();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({}); // Estado para manejar errores
    const [showPassword, setShowPassword] = useState(false);

    const isFormValid = email.trim() !== '' && password.trim() !== '';

    useEffect(() => {
        if (getToken()) {
            const rol = sessionStorage.getItem('rol') ? JSON.parse(sessionStorage.getItem('rol')) : null;
            if (rol === 'admin') {
                navigate('/admin/home');
            } else if (rol === 'medico') {
                navigate('/medico/home');
            } else if (rol === 'paciente') {
                navigate('/paciente/home');
            } else if (rol === 'recepcion') {
                navigate('/recepcion/home');
            }
        }
    }, []);

    const validateFields = () => {
        const newErrors = {};
        if (!email) newErrors.email = 'El correo es requerido';
        if (!password) newErrors.password = 'La contraseña es requerida';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Devuelve true si no hay errores
    };

    const submitLogin = async (e) => {
        e.preventDefault();

        if (!validateFields()) return; // Detiene el envío si hay errores

        await axios
            .get('/sanctum/csrf-cookie')
            .then(() => {
                Config.getLogin({ email, password }).then(({ data }) => {
                    if (data.success) {
                        const userRol = data.user.roles[0].name; // Obtén el rol del usuario
                        setToken(data.user, data.token, userRol);

                        // Redirige según el rol del usuario
                        if (userRol === 'admin') {
                            navigate('/admin/home');
                        } else if (userRol === 'medico') {
                            navigate('/medico/home');
                        } else if (userRol === 'paciente') {
                            navigate('/paciente/home');
                        } else if (userRol === 'recepcion') {
                            navigate('/recepcion/home');
                        } else {
                            setMessage('Rol no reconocido');
                        }
                    } else {
                        setMessage('Credenciales incorrectas');
                    }
                });
            })
            .catch((error) => {
                console.error('Error al obtener el CSRF cookie:', error);
            });
    };

    return (
        <div className="bg-[#dbdbdb] text-black h-screen flex justify-center items-center w-full">
            <div>
                <div className="min-w-[450px] bg-[#fff] border border-[#e11a31] rounded-2xl p-12 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative">
                    <h1 className="text-4xl text-black font-bold text-center mb-6 py-4">
                        Iniciar sesión
                    </h1>
                    <form onSubmit={submitLogin}>
                        {/* Campo de Email */}
                        <div className="relative my-8">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={`block w-[100%] py-2.5 px-0 text-sm text-black bg-transparent border-0 border-b-2 ${errors.email ? 'border-red-500' : 'border-gray-300'
                                    } appearance-none focus:outline-none focus:ring-0 focus:text-black focus:border-blue-600 peer`}
                                placeholder=""
                            />
                            <label
                                htmlFor=""
                                className="absolute text-sm text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Email
                            </label>
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                            )}
                        </div>

                        {/* Campo de Contraseña */}
                        <div className="relative my-8">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={`block w-[100%] py-2.5 px-0 text-sm text-black bg-transparent border-0 border-b-2 ${errors.password ? 'border-red-500' : 'border-gray-300'
                                    } appearance-none focus:outline-none focus:ring-0 focus:text-black focus:border-blue-600 peer`}
                                placeholder=""
                            />
                            <label
                                htmlFor=""
                                className="absolute text-sm text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Contraseña
                            </label>
                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                            )}
                        </div>

                        {/* Mensaje de error general */}
                        {message && (
                            <p className="text-red-500 text-center mb-4">{message}</p>
                        )}
                        <div className="flex justify-between items-center my-4">
                            <div className="flex gap-2 items-center">
                                <input
                                    type="checkbox" id="showPassword"
                                    checked={showPassword}
                                    onChange={() => setShowPassword(!showPassword)} />
                                <label htmlFor="showPassword">Mostrar contraseña</label>
                            </div>
                            <a href="/recuperar" className=" text-blue-500 hover:text-cyan-400 cursor-pointer">
                                Olvidaste tu contraseña
                            </a>
                        </div>
                        <button
                            onClick={submitLogin}
                            type="submit"
                            disabled={!isFormValid} // Deshabilita el botón si los campos están vacíos
                            className={`font-medium text-black w-full mb-6 text-[18px] my-6 rounded-full ${isFormValid
                                    ? 'bg-slate-300 hover:bg-[#e11a31] hover:text-white cursor-pointer'
                                    : 'bg-gray-300 cursor-not-allowed'
                                } py-2 transition-colors duration-300`}
                        >
                            Iniciar sesión
                        </button>
                        <div>
                            <span className="m-4">
                                No tienes una cuenta?{' '}
                                <a
                                    className="text-blue-500 hover:text-cyan-400 cursor-pointer"
                                    href="/register"
                                >
                                    Crea una cuenta
                                </a>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;