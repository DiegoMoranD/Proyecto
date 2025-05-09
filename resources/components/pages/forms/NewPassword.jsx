import React, { useEffect, useState } from 'react'
import Config from "../../layouts/PageAuth/Config";
import { useParams } from 'react-router-dom';

function NewPassword() {
    const { token } = useParams();
    const [empresa, setEmpresa] = useState(null);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState({});
    const [password, setPassword] = useState("");
    const [passwordConfimation, setPasswordConfirmation] = useState("")
    const [passwordStr, setPasswordStr] = useState(0);
    const [strLabel, setStrLabel] = useState("Débil");

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

    const windowSuccess = () => {
        
    }

    useEffect(() => {
        const fetchEmpresa = async () => {
            try {
                const response = await Config.validateRecoveryToken(token);
                setEmpresa(response.data.empresa);
                setMessage(response.data.message);
            } catch (error) {
                setMessage(
                    error.response?.data?.message || "Enlace invalido o token expirado."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchEmpresa();
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
                setMessage("Contraseña actulizada correctamente.")
                alert("Contraseña actualizada volviendo al login")
                setTimeout(() => {
                    window.location.href = "/login"
                }, 2000)
            }
            setMessage(response.data.message);
        } catch (error) {
            setErrors({
                password: error.response?.data?.message || "Error al cambiar la contraseña."
            });
        }
    };

    if (loading) {
        return <p>Cargando</p>
    }

    if (!empresa) {
        return (
            <div className='bg-[#dbdbdb] text-black h-screen flex justify-center items-center w-full'>
                <div className='bg-white p-6 rounded-lg shadow-md w-full max-w-md'>
                    <p className='text-red-500 text-center text-4xl p-6 font-[500]'>{message}</p>
                    <a href="/login" className=''><p className='text-center font-medium text-black w-full mb-2 text-sm sm:text-[18px] my-4 sm:my-6 rounded-full bg-slate-300 hover:bg-[#e11a31] hover:text-white cursor-pointer py-2 transition-colors duration-300'>Volver al login</p></a>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-gray-200 text-black h-screen flex justify-center items-center w-full">
            <div className="min-w-[450px] bg-[#fff] border border-[#e11a31] rounded-2xl p-12 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
                    Cambiar Contraseña
                </h1>
                <p className='text-center m-2 text-[16px] font-[500]'>
                    Correo: {empresa.correo}
                </p>
                <form onSubmit={handleSubmit}>
                    <div>
                        <div className='relative my-8'>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value)
                                    evaluateStrPassword(e.target.value)
                                }}
                                className={`block w-[100%] py-2.5 px-0 text-sm text-black bg-transparent border-0 border-b-2 ${errors.password ? 'border-red-500' : 'border-gray-300'
                                    } appearance-none focus:outline-none focus:ring-0 focus:text-black focus:border-blue-600 peer`}
                                placeholder=""
                            />
                            <label
                                htmlFor=""
                                className="absolute text-sm text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Nueva Contraseña
                            </label>
                            <div className="mt-2 mb-4">
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
                        <div className='relative my-8'>
                            <input
                                type="password"
                                value={passwordConfimation}
                                onChange={(e) => setPasswordConfirmation(e.target.value)}
                                className={`block w-[100%] py-2.5 px-0 text-sm text-black bg-transparent border-0 border-b-2 ${errors.password ? 'border-red-500' : 'border-gray-300'
                                    } appearance-none focus:outline-none focus:ring-0 focus:text-black focus:border-blue-600 peer`} placeholder=""
                            />
                            <label
                                htmlFor=""
                                className="absolute text-sm text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Confirmar Contraseña
                            </label>
                        </div>
                        <div className='-mb-3'>
                            {errors.password && (
                                <p className=' text-red-500 text-sm mt-1'>{errors.password}</p>
                            )}
                            {message && (
                                <div className='flex'>
                                    <p className='mr-2 text-[14px]'>Estado del token: </p>
                                    <p className="text-green-500 text-center mb-4 text-[14px]">{message}</p>
                                </div>
                            )}
                            <button type='sumbit' className='font-medium text-black w-full text-[18px] my-2 rounded-2xl bg-slate-300 hover:bg-[#e11a31] hover:text-white cursor-pointer py-2.5 transition-colors duration-300'>
                                Cambiar Contraseña
                            </button>
                            <a href="/login" className="text-blue-500 hover:text-cyan-400 cursor-pointer transition duration-300">
                                <p className='text-center mt-4 '>
                                    <span >Volver al inicio</span>
                                </p>
                            </a>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default NewPassword