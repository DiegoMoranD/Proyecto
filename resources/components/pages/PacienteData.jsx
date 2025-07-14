import React, { useEffect, useState } from "react";
import Config from "../layouts/PageAuth/Config";
import { Link, useParams } from "react-router-dom";

function PacienteData() {
    const { id } = useParams();

    // Un estado por campo
    const [nombre, setNombre] = useState("");
    const [sex, setSex] = useState("");
    const [fecha_nacimiento, setFechaNacimiento] = useState("");
    const [tipo_sangre, setTipoSangre] = useState("");
    const [peso, setPeso] = useState("");
    const [altura, setAltura] = useState("");
    const [imc, setImc] = useState("");
    const [fecha_registro, setFechaRegistro] = useState("");
    const [empresa_id, setEmpresaId] = useState("");
    const [empresas, setEmpresas] = useState([]);

    // Cargar datos del paciente y empresas al montar
    useEffect(() => {
        const fetchPaciente = async () => {
            try {
                const response = await Config.getPacienteById(id);
                const data = response.data;
                setNombre(data.nombre || "");
                setSex(data.sex || "");
                setFechaNacimiento(data.fecha_nacimiento || "");
                setTipoSangre(data.tipo_sangre || "");
                setPeso(data.peso || "");
                setAltura(data.altura || "");
                setImc(data.imc || "");
                setFechaRegistro(data.fecha_registro || "");
                setEmpresaId(data.empresa_id || "");
            } catch (error) {
                console.error("Error al obtener paciente", error);
            }
        };

        const fetchEmpresas = async () => {
            try {
                const response = await Config.getAlltEmpresa();
                setEmpresas(response.data);
            } catch (error) {
                console.error("Error al obtener empresas", error);
            }
        };

        fetchPaciente();
        fetchEmpresas();
    }, [id]);

    const userString = sessionStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-bold mb-5 border-b border-gray-600/25 pb-4">Datos del Paciente</h2>
            <div className="overflow-auto grid grid-cols-4 gap-5 mb-8">
                <div>
                    <h3 className='font-bold text-[20px]'>Nombre</h3>
                    <p>{nombre}</p>
                </div>
                <div>
                    <h3 className='font-bold text-[20px]'>Tipo de Sangre</h3>
                    <p>{tipo_sangre}</p>
                </div>
                <div>
                    <h3 className='font-bold text-[20px]'>Sexo</h3>
                    <p>{sex}</p>
                </div>
                <div>
                    <h3 className='font-bold text-[20px]'>Empresa</h3>
                    <p>{empresa_id}</p>
                </div>
                <div>
                    <h3 className='font-bold text-[20px]'>Peso</h3>
                    <p>{peso}</p>
                </div>
                <div>
                    <h3 className='font-bold text-[20px]'>Altura</h3>
                    <p>{altura}</p>
                </div>
                <div>
                    <h3 className='font-bold text-[20px]'>IMC</h3>
                    <p>{imc}</p>
                </div>
            </div>
            <h2 className="text-2xl font-bold mb-5 border-b border-gray-600/25 pb-4">Lista de Citas</h2>
            <div className="overflow-auto rounded-xl border border-gray-200 shadow-sm">
                <table className="min-w-full divide-y divide-gray-200 text-sm text-gray-700 bg-white">
                    <thead className="bg-gray-100 text-left font-semibold text-gray-700 uppercase tracking-wider ">
                        <tr>
                            <th className="px-6 py-4">id</th>
                            <th className="px-6 py-4">peso</th>
                            <th className="px-6 py-4">altura</th>
                            <th className="px-6 py-4">sintomas</th>
                            <th className="px-6 py-4">Fecha Cita</th>
                            <th className="px-6 py-4">Estado</th>
                            <th className="px-6 py-4">Opciones</th>

                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 ">
                        <tr className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4">1</td>
                            <td className="px-6 py-4">67 KG</td>
                            <td className="px-6 py-4">1.67 mtr</td>
                            <td className="px-6 py-4">Lorem</td>
                            <td className="px-6 py-4">11-04-2025</td>
                            <td className="px-6 py-4">ACtivo</td>
                            <td className="px-6 py-4 ">
                                <Link to=''>
                                    <p className='font-bold text-blue-500 hover:text-blue-600 transition duration-500'>Ver detalles</p>
                                </Link>
                            </td>
                        </tr>
                    </tbody>
                </table>

            </div>

        </div>
    )
}

export default PacienteData
