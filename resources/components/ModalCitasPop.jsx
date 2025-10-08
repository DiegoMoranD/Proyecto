import React, { useEffect, useState } from "react";
import Config from "./layouts/PageAuth/Config";
import { Link, useNavigate } from "react-router-dom";
import { Clock4 } from "lucide-react";
import Swal from "sweetalert2";

function ModalCitasPop({ isOpen, onClose, id }) {

    const [cita, setCita] = useState(null);
    const [nombre, setNombre] = useState("");
    const [estado, setEstado] = useState("");
    const navigate = useNavigate();


    const getRol = () => {
        const rol = sessionStorage.getItem('rol');
        return rol ? JSON.parse(rol) : null;
    }

    const rol = getRol();

    useEffect(() => {
        if (!isOpen || !id) return;
        const fetchCita = async () => {
            try {
                const response = await Config.getCitaById(id);
                setCita(response.data);
                if (response.data.paciente_id) {
                    const pacienteResp = await Config.getPacienteById(response.data.paciente_id);
                    setNombre(pacienteResp.data.nombre || "");
                }
            } catch (error) {
                console.error("Error al obtener cita", error);
            }
        };
        fetchCita();
    }, [id, isOpen]);

    if (!isOpen || !cita) return null;

    const cancelCitaPaciente = async () => {
        try {
            Swal.fire({
                title: "¿Cancelar Cita?",
                text: "¿Esta seguro de cancelar la cita?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Si, Cancelarla!"
            }).then((result) => {
                if (result.isConfirmed) {
                    Config.cancelCita(cita.id, { estado: "cancelado" });
                    // const nuevosPacientes = pacientes.filter(med => med.id !== id);
                    // setPacientes(nuevosPacientes)
                    // setFilteredPacientes(nuevosPacientes)
                    Swal.fire({
                        title: "Cancelado!",
                        text: "La Cita ha sido cancelada exitosamente.",
                        icon: "success"
                    }).then(() => {
                        onClose();
                        navigate(`/${rol}/agenda`);
                    });;
                }
            });
        } catch (error) {
            Swal.fire({
                title: "Hubo un error",
                text: "Error al cancelar la cita.",
                icon: "error"
            });
            console.error(error);
        }
    }


    return (
        <div className='fixed inset-0 bg-black/80 flex items-center justify-center z-50 transition-opacity duration-300'>
            <div className='bg-white rounded-lg shadow-lg w-[1100px] p-8 transform transition-transform duration-300 overflow-auto'>
                <h2 className="text-xl font-medium">Detalle de Cita Médica - {nombre}</h2>
                <h2 className="text-[14px] mb-4 font-medium text-black/50">Cita ID: {cita.id} • {cita.fecha} a las {cita.hora}</h2>
                <div className="flex items-center mb-4">
                    <h2 className="p-1">Estado: </h2>
                    <span className={`px-2 py-1 text-xs rounded font-semibold ${cita.estado === 'registrado'
                        ? 'bg-yellow-100 text-yellow-600'
                        : cita.estado === 'atendido'
                            ? 'bg-green-100 text-green-600'
                            : cita.estado === 'cancelado'
                                ? 'bg-red-100 text-red-600'
                                : ''
                        }`}>
                        {cita.estado}
                    </span>
                </div>
                <div className="mb-6 border border-gray-500/25 rounded-[6px] p-6 flex flex-col">
                    <div className='flex items-center gap-2'>
                        <p className='text-2xl font-medium'>Motivo:</p>
                    </div>
                    <div>
                        <p>{cita.motivo}.</p>
                    </div>


                    {(cita.estado === 'registrado') && (
                        <>
                            <div className='my-2'>
                                <div className='flex justify-around'>


                                    {(rol === 'medico') && (
                                        <>
                                            <Link to={`/medico/cita-detalles/${id}`} className='bg-green-500 text-white rounded-[8px] p-2 mt-6 cursor-pointer hover:bg-green-600 transition-colors duration-500 font-medium text-center w-1/4'>
                                                <button>Atender Cita</button>
                                            </Link>
                                        </>
                                    )}

                                    <Link to={`/${rol}/agendar-update/${id}`} className='bg-yellow-500 text-white rounded-[8px] p-2 mt-6 cursor-pointer hover:bg-yellow-600 transition-colors duration-500 font-medium text-center w-1/4'>
                                        <button>Reprogramar Cita</button>
                                    </Link>
                                    <button onClick={cancelCitaPaciente} className='bg-red-500 text-white rounded-[8px] p-2 mt-6 cursor-pointer hover:bg-red-600 transition-colors duration-500 font-medium text-center w-1/4'>Eliminar Cita</button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
                <div className="mb-6 border border-gray-500/25 rounded-[6px] p-6 flex flex-col">
                    <div className='flex items-center gap-2'>
                        <Clock4 className='w-5 h-5 stroke-2'></Clock4>
                        <p className='text-2xl font-medium'>Información de Registro</p>
                    </div>
                    <div className='my-2'>
                        <div className='grid grid-cols-2 gap-1'>
                            <h2 className='font-medium text-[18px] text-black/50'>Creado:</h2>
                            <h2 className='font-medium text-[18px] text-black/50'>Actualizado:</h2>
                            <p className='font-medium text-[16px]'>{cita.created_at}</p>
                            <p className='font-medium text-[16px]'>{cita.updated_at}</p>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end">
                    <button onClick={onClose}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ModalCitasPop