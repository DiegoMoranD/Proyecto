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
            if (rol === 'root') {
                navigate('/root/home');
            } else if (rol === 'admin') {
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

        if (!validateFields()) return;

        try {
            const { data } = await Config.getLogin({ email, password });

            if (data.success) {
                const userRol = data.user.roles[0].name;
                setToken(data.user, data.token, userRol);

                if (rol === 'root') {
                    navigate('/root/home');
                } else if (userRol === 'admin') {
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
                setMessage(data.message);
            }
        } catch (error) {
            if (error.response) {
                // Si hay errores de validación
                if (error.response.status === 422 && error.response.data.error) {
                    // Muestra el primer error de validación
                    const firstError = Object.values(error.response.data.error)[0][0];
                    setMessage(firstError);
                } else if (error.response.data.message) {
                    setMessage(error.response.data.message);
                } else {
                    setMessage('Error al iniciar sesión');
                }
            } else {
                setMessage('Error de conexión con el servidor');
            }
        }
    };

    return (
        <div className="flex flex-col md:flex-row h-screen w-full">
            {/* Sección izquierda con imagen */}
            <div className="bg-[url('/resources/components/imgs/banner2.jpg')] bg-no-repeat bg-cover bg-center hidden md:flex md:w-1/2">
                <div className="w-full h-full bg-black/25 bg-opacity-40 flex items-center justify-center">
                    <h2 className="text-white text-4xl font-bold text-center px-4">
                        Bienvenido a <span className="text-blue-500">Medic</span>Track
                    </h2>
                </div>
            </div>

            {/* Sección derecha con formulario */}
            <div className="flex w-full md:w-1/2 items-center justify-center bg-gray-200 p-8">
                <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-8 md:p-10">
                    <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
                        Iniciar Sesión
                    </h1>

                    <form onSubmit={submitLogin}>
                        {/* Email */}
                        <div className="mb-6">
                            <label className="block text-gray-700 mb-2 text-sm font-medium">Correo electrónico</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={`w-full border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                placeholder="Ingresa tu correo"
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                        </div>

                        {/* Contraseña */}
                        <div className="mb-6">
                            <label className="block text-gray-700 mb-2 text-sm font-medium">Contraseña</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className={`w-full border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                    placeholder="Ingresa tu contraseña"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-2 text-gray-500 hover:text-gray-700"
                                >
                                    {showPassword ? '🙈' : '👁️'}
                                </button>
                            </div>
                            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                        </div>

                        {/* Mensaje de error general */}
                        {message && (
                            <p className="text-red-500 text-center mb-4">{message}</p>
                        )}

                        {/* Checkbox y enlace */}
                        <div className="flex justify-between items-center mb-6 text-sm">
                            <label className="flex items-center gap-2 text-gray-600">
                                <input
                                    type="checkbox"
                                    checked={showPassword}
                                    onChange={() => setShowPassword(!showPassword)}
                                />
                                Mostrar contraseña
                            </label>
                            <a href="/recuperar-cuenta" className="text-blue-500 hover:underline">
                                ¿Olvidaste tu contraseña?
                            </a>
                        </div>

                        {/* Botón */}
                        <button
                            type="submit"
                            disabled={!isFormValid}
                            className={`w-full py-3 rounded-full text-white font-semibold transition-colors duration-300 ${isFormValid ? 'bg-blue-500 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}
                        >
                            Iniciar sesión
                        </button>

                        <p className="text-center mt-6 text-gray-600">
                            ¿No tienes cuenta?{' '}
                            <a href="/register" className="text-blue-500 hover:underline">
                                Regístrate aquí
                            </a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;