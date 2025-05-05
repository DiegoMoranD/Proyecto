import React, { useState } from 'react';
import Config from '../../layouts/PageAuth/Config';

function Recuperar() {
    const [selectedOption, setSelectedOption] = useState(null);
    const [token, setToken] = useState('');
    const [password, setPassword] = useState('');

    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});

    const isFormValid = selectedOption && ((selectedOption === 'token' && token) || (selectedOption === 'password' && password));

    const validateFields = () => {
        const newErrors = {};
        if (!email) newErrors.email = 'El correo es requerido';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Devuelve true si no hay errores
    };

    const submitRecuperar = async (e) => {
        e.preventDefault();

        if (!validateFields()) return; // Detiene el envío si hay errores

        try {
            const response = await Config.getGenerateRecoveryToken({email});

            if (response.data.success) {
                setMessage('Se ha enviado un enlace de recuperación a tu correo electrónico.');
            }
        } catch (error) {
            if (error.response && error.response.status === 404) {
                setErrors({ email: 'Este correo no esta registrado' });
            } else {
                setErrors({ email: 'Ocuirrio un error al verififcar el correo'})
            }
        }

    };

    return (
        <div className="bg-[#dbdbdb] text-black h-screen flex justify-center items-center w-full">
            <div>
                <div className="min-w-[450px] bg-[#fff] border border-[#e11a31] rounded-2xl p-12 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative">
                    <h1 className="text-4xl text-black font-bold text-center mb-6 py-4">
                        Recuperar cuenta
                    </h1>
                    <form onSubmit={submitRecuperar}>
                        {/* Campo de Email */}
                        {/* <div className="relative my-8">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={`block w-[100%] py-2.5 px-0 text-sm text-black bg-transparent border-0 border-b-2 ${
                                    errors.email ? 'border-red-500' : 'border-gray-300'
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
                            */}
                        {/* Mensaje de éxito */}
                        {message && (
                            <p className="text-green-500 text-center mb-4">{message}</p>
                        )}

                        <div className="text-center mb-6">
                            <button
                                type="button"
                                className={`bg-red-500 text-white rounded p-4 m-2 font-bold cursor-pointer hover:bg-red-600 transition duration-500 ${selectedOption === 'token' ? 'ring-2 ring-black' : ''
                                    }`}
                                onClick={() => setSelectedOption('token')}
                            >
                                Olvidé mi token
                            </button>
                            <button
                                type="button"
                                className={`bg-red-500 text-white rounded p-4 m-2 font-bold cursor-pointer hover:bg-red-600 transition duration-500 ${selectedOption === 'password' ? 'ring-2 ring-black, bg-orange-500' : ''
                                    }`}
                                onClick={() => setSelectedOption('password')}
                            >
                                Olvidé mi contraseña
                            </button>
                        </div>

                        {/* Input para Token */}
                        {selectedOption === 'token' && (
                            <div className="relative my-8">
                                <input
                                    type="token"
                                    value={token}
                                    onChange={(e) => setToken(e.target.value)}
                                    className={`block w-[100%] py-2.5 px-0 text-sm text-black bg-transparent border-0 border-b-2 ${errors.token ? 'border-red-500' : 'border-gray-300'
                                        } appearance-none focus:outline-none focus:ring-0 focus:text-black focus:border-blue-600 peer`}
                                    placeholder=""
                                />
                                <label
                                    htmlFor=""
                                    className="absolute text-sm text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                >
                                    Correo para Reenvio
                                </label>
                                {errors.token && (
                                    <p className="text-red-500 text-sm mt-1">{errors.token}</p>
                                )}
                            </div>
                        )}

                        {/* Input para recuperar la Contraseña */}
                        {selectedOption === 'password' && (
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
                                    Correo registrado
                                </label>
                                {errors.email && (
                                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                                )}
                            </div>
                        )}

                        {/* Botón de recuperación */}
                        <button
                            type="submit"
                            className={`font-medium text-black w-full mb-6 text-[18px] my-6 rounded-full ${isFormValid
                                ? 'bg-slate-300 hover:bg-[#e11a31] hover:text-white cursor-pointer'
                                : 'bg-gray-300 cursor-not-allowed'
                                } py-2 transition-colors duration-300`}
                        >
                            Recuperar cuenta
                        </button>
                        <div>
                            <span className="m-4">
                                ¿Recordaste tu contraseña?{' '}
                                <a
                                    className="text-blue-500 hover:text-cyan-400 cursor-pointer"
                                    href="/login"
                                >
                                    Inicia sesión
                                </a>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Recuperar;