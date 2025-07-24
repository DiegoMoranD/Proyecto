import React, { useEffect, useState } from 'react'
import { Stethoscope, Weight, AlertTriangle, FileText, Clock4 } from 'lucide-react'
import Config from './layouts/PageAuth/Config'
import { useParams } from 'react-router-dom';

function ModalCita({ isOpen, onClose, id }) {

    // const [peso, setPeso] = useState("");
    // const [altura, setAltura] = useState("");
    // const [imc, setIMC] = useState("");
    // const [sintomas, setSintomas] = useState("");
    // const [alergias, setAlergias] = useState("");
    // const [diagnostico, setDiagnostico] = useState("");
    // const [atendido_por, setAtendido_por] = useState("");
    // const [recomendaciones, setRecomendaciones] = useState("");
    // const [created_at, setCreate] = useState("");
    // const [updated_at, setUpdate] = useState("");
    // const [nombre, setNombre] = useState("");


    // useEffect(() => {
    //     const fetchCitaAtendida = async () => {
    //         try {
    //             const response = await Config.citaAtendidaShow(id);
    //             const data = response.data;
    //             setPeso(data.peso || "");
    //             setAltura(data.altura || "");
    //             setIMC(data.imc || "");
    //             setSintomas(data.sintomas || "");
    //             setAlergias(data.alergias || "");
    //             setDiagnostico(data.diagnostico || "");
    //             setAtendido_por(data.atendido_por || "");
    //             setRecomendaciones(data.recomendaciones || "");
    //             setCreate(data.created_at || "");
    //             setUpdate(data.updated_at || "");

    //         } catch (error) {
    //             console.error("Error al obtener paciente", error);
    //         }
    //     };

    //     fetchCitaAtendida();
    // }, [id]);


    const [cita, setCita] = useState(null);
    const [paciente, setPaciente] = useState("");
    const [nombre, setNombre] = useState("");

    useEffect(() => {
        if (isOpen && id) {
            const fetchCita = async () => {
                try {
                    const response = await Config.citaAtendidaShow(id);
                    setCita(response.data);
                } catch (error) {
                    console.error("Error al obtener cita", error);
                }
            };
            fetchCita();
        }
    }, [isOpen, id]);

    if (!isOpen || !cita) return null;


    return (
        <div
            className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}>
            <div className={`bg-white rounded-lg shadow-lg w-[1100px] h-[700px] p-8 transform transition-transform duration-300 overflow-auto ${isOpen ? 'scale-100' : 'scale-90'
                }`}>
                <h2 className="text-xl font-medium">Detalle de Cita Médica {}</h2>
                <h2 className="text-[14px] mb-4 font-medium text-black/50">Cita ID: 101 • 14 de enero de 2024 a las 10:30</h2>
                <div className="mb-6 border border-gray-500/25 rounded-[6px] p-6 flex flex-col">
                    <div className='flex items-center gap-2'>
                        <Weight className='w-5 h-5 stroke-2'></Weight>
                        <p className='text-2xl font-medium'>Detalles fisicos</p>
                    </div>
                    <div className='my-2'>
                        <div className='grid grid-cols-4 gap-1'>
                            <h2 className='font-medium text-[18px] text-black/50'>Peso</h2>
                            <h2 className='font-medium text-[18px] text-black/50'>Altura</h2>
                            <h2 className='font-medium text-[18px] text-black/50'>IMC</h2>
                            <h2 className='font-medium text-[18px] text-black/50'>Categoria</h2>
                            <p className='font-bold text-2xl'>{cita.peso} Kg</p>
                            <p className='font-bold text-2xl'>{cita.altura} mts</p>
                            <p className='font-bold text-2xl'>{cita.imc}</p>
                            <p className='bg-green-300 rounded-2xl w-auto text-center text-green-600 font-medium p-1'>Normal</p>
                        </div>
                    </div>
                </div>
                <div className="mb-6 border border-gray-500/25 rounded-[6px] p-6 flex flex-col">
                    <div className='flex items-center gap-2'>
                        <Stethoscope className='w-5 h-5 stroke-2'></Stethoscope>
                        <p className='text-2xl font-medium'>Sintomas</p>
                    </div>
                    <div className='my-2'>
                        <div className='grid grid-cols-1 gap-1'>
                            <p className=''>{cita.sintomas}</p>
                        </div>
                    </div>
                </div>
                <div className="mb-6 border border-gray-500/25 rounded-[6px] p-6 flex flex-col">
                    <div className='flex items-center gap-2'>
                        <AlertTriangle className='w-5 h-5 stroke-2'></AlertTriangle>
                        <p className='text-2xl font-medium'>Diagnostico</p>
                    </div>
                    <div className='my-2'>
                        <div className='grid grid-cols-1 gap-1'>
                            <p className=''>{cita.diagnostico}</p>
                        </div>
                    </div>
                </div>
                <div className="mb-6 border border-gray-500/25 rounded-[6px] p-6 flex flex-col">
                    <div className='flex items-center gap-2'>
                        <AlertTriangle className='w-5 h-5 stroke-2 text-amber-400'></AlertTriangle>
                        <p className='text-2xl font-medium'>Alergias</p>
                    </div>
                    <div className='my-2'>
                        <div className='grid grid-cols-1 gap-1'>
                            <p className=''>{cita.alergias}</p>
                        </div>
                    </div>
                </div>

                <div className="mb-6 border border-gray-500/25 rounded-[6px] p-6 flex flex-col">
                    <div className='flex items-center gap-2'>
                        <FileText className='w-5 h-5 stroke-2'></FileText>
                        <p className='text-2xl font-medium'>Recomendaciones</p>
                    </div>
                    <div className='my-2'>
                        <div className='grid grid-cols-1 gap-1'>
                            <p className=''>{cita.recomendaciones}</p>
                        </div>
                    </div>
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
                    <button
                        onClick={onClose}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ModalCita