import React, { useState } from 'react';
import Config from '../../layouts/PageAuth/Config';

function UpdatePassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});


    const validateFieldEmail = () => {
        const newErrors = {};
        if (!email) newErrors.email = 'El correo es requerido';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Devuelve true si no hay errores
    };

    const submitRecuperar = async (e) => {
        e.preventDefault();

        if (!validateFieldEmail()) return; // Detiene el envío si hay errores

        try {
            const response = await Config.getGenerateRecoveryToken({ email });

            if (response.data.success) {
                setMessage('Se ha enviado un enlace de recuperación a tu correo electrónico.');
            }
        } catch (error) {
            if (error.response && error.response.status === 404) {
                setErrors({ email: 'Este correo no esta registrado' });
            } else {
                setErrors({ email: 'Ocurrio un error al verififcar el correo' })
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

                    {message && (
                        <div className="mb-4 text-green-600 text-center font-semibold">
                            {message}
                        </div>
                    )}

                    <form action="" onSubmit={submitRecuperar}>
                        <h1 className='mt-8 text-center mb-2 text-[18px] font-[500]'>Cambiar de contraseña</h1>
                        <div className="relative my-4">
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
                                Correo para camio de contraseña
                            </label>
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                            )}

                            <button
                                type="submit"
                                className={`font-medium text-black w-full mb-1 text-[18px] mt-8 rounded-full bg-slate-300 hover:bg-[#e11a31] hover:text-white cursor-pointer py-2 transition-colors duration-300`}
                            >
                                Cambiar contraseña
                            </button>
                            <div className='mt-4 -mb-8 flex justify-center'>
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

                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UpdatePassword