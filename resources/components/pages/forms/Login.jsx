import React from 'react'

function Login() {
    return (
        <div className=" bg-[#dbdbdb] text-white h-full flex justify-center items-center w-full">
            <div>
                <div className=" min-w-[500px] bg-[#d63d17] border border-slate-700 rounded-3xl p-12 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative  ">
                    <h1 className=" text-4xl text-white font-bold text-center mb-6 py-4">
                        Iniciar sesion
                    </h1>
                    <form action="">
                        <div className=" relative my-8">
                            <input
                                type="email"
                                required
                                className="block w-[100%] py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
                                placeholder=""
                            />
                            <label
                                htmlFor=""
                                className=" absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Email
                            </label>

                            <p className=" absolute top-3 right-3">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    {" "}
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25"
                                    />
                                </svg>
                            </p>
                        </div>
                        <div className=" relative my-8">
                            <input
                                type="password"
                                className="block w-[100%] py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
                                placeholder=""
                            />
                            <label
                                htmlFor=""
                                className=" absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Contraseña
                            </label>

                            <p className=" absolute top-3 right-3">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                                    />
                                </svg>
                            </p>
                        </div>
                        {/* <div className="flex justify-between items-center my-4">
                            <div className="flex gap-2 items-center">
                                <input type="checkbox" name="" id="" />
                                <label htmlFor="Recordarme">Recordar</label>
                            </div>
                            <span className=" text-blue-500 hover:text-cyan-400 cursor-pointer">
                                Olvidaste tu contraseña
                            </span>
                        </div> */}
                        <a href={"/admin"}>
                            <button
                                type="submit"
                                className="font-medium text-black w-full mb-6 text-[18px] my-6 rounded-full bg-white hover:bg-emerald-600 hover:text-white py-2 transition-colors duration-300"
                            >
                                Iniciar sesion
                            </button>
                        </a>
                        {/* <div>
                            {" "}
                            <a href="/register">register</a>
                            <span className="m-4">
                                No tienes una cuenta?{" "}
                                <a
                                    className=" text-blue-500 hover:text-cyan-400 cursor-pointer"
                                    href={"/register"}
                                >
                                    Craer una cuenta
                                </a>
                            </span>
                        </div> */}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login