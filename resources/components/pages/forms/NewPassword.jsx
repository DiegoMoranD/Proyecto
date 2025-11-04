import React, { useEffect, useState } from "react";
import Config from "../../layouts/PageAuth/Config";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function NewPassword() {
    const { token } = useParams();
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState({});
    const [password, setPassword] = useState("");
    const [passwordConfimation, setPasswordConfirmation] = useState("");
    const [passwordStr, setPasswordStr] = useState(0);
    const [strLabel, setStrLabel] = useState("Débil");
    const navigate = useNavigate();

    const evaluateStrPassword = (password) => {
        let strength = 0;
        if (password.length >= 8) strength += 1;
        if (/[A-Z]/.test(password)) strength += 1;
        if (/[0-9]/.test(password)) strength += 1;
        if (/[^A-Za-z0-9]/.test(password)) strength += 1;

        let percentage = (strength / 3) * 100;
        let label = "Débil";

        if (percentage >= 75) label = "Fuerte";
        else if (percentage >= 50) label = "Media";

        setStrLabel(label);
        setPasswordStr(percentage);
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await Config.validateRecoveryToken(token);
                setUser(response.data.usuario);
                setMessage(response.data.message);
            } catch (error) {
                setMessage(
                    error.response?.data?.message || "Enlace inválido o token expirado."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await Config.updatePassword({
                token,
                password,
                password_confirmation: passwordConfimation,
            });

            if (response.data.success) {
                Swal.fire({
                    title: "Contraseña Actualizada",
                    text: "La contraseña ha sido actualizada correctamente.",
                    icon: "success",
                    confirmButtonColor: "#2563EB",
                }).then(() => navigate("/login"));
            }

            setMessage(response.data.message);
        } catch (error) {
            setErrors({
                password:
                    error.response?.data?.message || "Error al cambiar la contraseña.",
            });
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-100 text-gray-700 text-xl">
                Cargando...
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-300 via-gray-400 to-black/25">
                <div className="relative bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl p-10 w-full max-w-md border border-black/20 text-center">
                    <p className="text-red-500 text-lg mb-6 font-semibold">{message}</p>
                    <a
                        href="/login"
                        className="block w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition-all duration-300"
                    >
                        Volver al login
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-300 via-gray-400 to-black/25">
            <div className="relative bg-white/75 backdrop-blur-md rounded-2xl shadow-2xl p-10 w-full max-w-md border border-black/20">
                <h1 className="text-3xl font-bold text-black/75 text-center mb-4">
                    Cambiar Contraseña
                </h1>
                <p className="text-gray-700 text-center text-sm mb-6">
                    Correo: <span className="font-medium">{user.email}</span>
                </p>

                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                evaluateStrPassword(e.target.value);
                            }}
                            placeholder="Nueva contraseña"
                            className={`w-full px-4 py-3 rounded-lg bg-white/90 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 ${errors.password
                                    ? "ring-red-400 border-red-400"
                                    : "focus:ring-blue-400"
                                }`}
                        />
                        <div className="mt-3">
                            <div className="w-full h-2 bg-gray-300 rounded">
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
                            <p className="text-sm text-gray-600 mt-1">{strLabel}</p>
                        </div>
                    </div>

                    <div className="mb-6">
                        <input
                            type="password"
                            value={passwordConfimation}
                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                            placeholder="Confirmar contraseña"
                            className={`w-full px-4 py-3 rounded-lg bg-white/90 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 ${errors.password
                                    ? "ring-red-400 border-red-400"
                                    : "focus:ring-blue-400"
                                }`}
                        />
                    </div>

                    {errors.password && (
                        <p className="text-red-500 text-sm mb-2">{errors.password}</p>
                    )}
                    {message && (
                        <p className="text-green-600 text-sm mb-4 text-center">
                            {message}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition-all duration-300"
                    >
                        Cambiar contraseña
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

export default NewPassword;
