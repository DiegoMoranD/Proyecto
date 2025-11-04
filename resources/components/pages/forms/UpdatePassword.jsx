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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-300 via-gray-400 to-black/25">
            <div className="relative bg-white/75 backdrop-blur-md rounded-2xl shadow-2xl p-10 w-full max-w-md border border-black/20">
                <h1 className="text-3xl font-bold text-black/75 text-center mb-6">
                    Recuperar contraseña
                </h1>
                <p className="text-gray-700 text-center text-sm mb-8">
                    Ingresa tu correo para recibir un enlace de recuperación
                </p>

                <form onSubmit={submitRecuperar}>
                    <div className="mb-6">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Correo electrónico"
                            className="w-full px-4 py-3 rounded-lg bg-white/90 text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        {errors.email && (
                            <p className="text-red-400 text-sm mt-2">{errors.email}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition-all duration-300"
                    >
                        Enviar enlace
                    </button>

                    <p className="text-center text-gray-800 text-sm mt-6">
                        ¿Recordaste tu contraseña?{" "}
                        <a href="/login" className="text-blue-500 hover:underline">
                            Inicia sesión
                        </a>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default UpdatePassword