import React, { useEffect, useState } from "react";
import Config from "../layouts/PageAuth/Config";
import { Link, useParams } from "react-router-dom";
import ModalCita from "../ModalCita";

function PacienteData() {
    const { id } = useParams();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCitaId, setSelectedCitaId] = useState(null);

    const [citas, setCitas] = useState([]); // Inicializamos como array
    const [filteredCitas, setFilteredCitas] = useState([]); // Inicializamos como array
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Estados del paciente
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

    useEffect(() => {
        indexAgenda();
    }, []);

    const indexAgenda = async () => {
        const response = await Config.indexAgenda();
        setCitas(response.data);
        setFilteredCitas(response.data);
    };

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

    // Filtrar citas por paciente_id antes de paginar
    const citasPaciente = filteredCitas.filter(cita => cita.paciente_id == id);

    // Paginación
    const totalPages = Math.ceil(citasPaciente.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentCitas = citasPaciente.slice(indexOfFirstItem, indexOfLastItem);

    const handleOpenModal = (citaId) => {
        setSelectedCitaId(citaId);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedCitaId(null);
    };


    const userString = sessionStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;

    return (
        <div className="container mx-auto p-6">
            <ModalCita
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                id={selectedCitaId}
            ></ModalCita>
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
                            <th className="px-6 py-4">ID</th>
                            <th className="px-6 py-4">Estado</th>
                            <th className="px-6 py-4">motivo</th>
                            <th className="px-6 py-4">fecha</th>
                            <th className="px-6 py-4">hora</th>
                            <th className="px-6 py-4">empresa_id</th>
                            <th className="px-6 py-4">Detalles</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 ">
                        {!currentCitas ? (
                            <tr>
                                <td className="px-6 py-4" colSpan="7">Cargando...</td>
                            </tr>
                        ) : (
                            currentCitas.map((cita) => (
                                <tr key={cita.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">{cita.id}</td>
                                    <td className="px-6 py-4"><p className={` py-1 text-center rounded font-semibold ${cita.estado === 'registrado'
                                        ? 'bg-yellow-200 text-yellow-700'
                                        : cita.estado === 'atendido'
                                            ? 'bg-green-200 text-green-700'
                                            : cita.estado === 'cancelado'
                                                ? 'bg-red-200 text-red-700'
                                                : ''
                                        }`}>{cita.estado}</p></td>
                                    <td className="px-6 py-4">{cita.motivo}</td>
                                    <td className="px-6 py-4">{cita.fecha}</td>
                                    <td className="px-6 py-4">{cita.hora}</td>
                                    <td className="px-6 py-4">{cita.empresa_id}</td>
                                    <td>
                                        {(cita.estado === 'atendido') && (
                                            <>
                                                <button
                                                    onClick={() => handleOpenModal(cita.id)}
                                                    className='cursor-pointer font-bold text-blue-500 hover:text-blue-600 transition duration-500'
                                                >
                                                    Ver detalles
                                                </button></>
                                        )
                                        }
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>

                </table>

            </div>
            <div className="flex justify-center mt-6 gap-2">
                <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                >
                    Anterior
                </button>
                {[...Array(totalPages)].map((_, idx) => (
                    <button
                        key={idx + 1}
                        onClick={() => setCurrentPage(idx + 1)}
                        className={`px-3 py-1 rounded ${currentPage === idx + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                    >
                        {idx + 1}
                    </button>
                ))}
                <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                >
                    Siguiente
                </button>
            </div>
        </div>
    )
}

export default PacienteData
