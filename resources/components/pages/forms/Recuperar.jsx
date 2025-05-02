import React, { useState } from 'react';

function Recuperar() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});

    const isFormValid = email.trim() !== ''; // Verifica si el campo de email está lleno

    const validateFields = () => {
        const newErrors = {};
        if (!email) newErrors.email = 'El correo es requerido';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Devuelve true si no hay errores
    };

    const submitRecuperar = (e) => {
        e.preventDefault();

        if (!validateFields()) return; // Detiene el envío si hay errores

        // Simula el envío de la solicitud de recuperación
        setMessage('Se ha enviado un enlace de recuperación a tu correo electrónico.');
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

                        <div className=''>
                            <button className='bg-red-500 text-white rounded p-4 m-2 font-bold cursor-pointer hover:bg-[#ff3f3f] transition duration-500'>Olvide mi token</button>
                            <button className='bg-red-500 text-white rounded p-4 m-2 font-bold cursor-pointer hover:bg-[#ff3f3f] transition duration-500'>Olvide mi contraseña</button>
                        </div>

                        {/* Botón de recuperación */}
                        <button
                            type="submit"
                            disabled={!isFormValid} // Deshabilita el botón si el campo está vacío
                            className={`font-medium text-black w-full mb-6 text-[18px] my-6 rounded-full ${
                                isFormValid
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