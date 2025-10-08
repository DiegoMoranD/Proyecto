import React, { useState, useEffect } from 'react'
import Config from '../../layouts/PageAuth/Config';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useParams } from "react-router-dom";

function AgendarForm() {
    const { id } = useParams();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [pacientes, setPacientes] = useState([]);
    const [empresas, setEmpresaName] = useState([]);
    const navigate = useNavigate();

    const getRol = () => {
        const rol = sessionStorage.getItem('rol');
        return rol ? JSON.parse(rol) : null;
    }

    const rol = getRol();

    // Estados para los campos del formulario
    const [form, setForm] = useState({
        paciente_id: id || '',
        fecha: '',
        hora: '',
        motivo: '',
    });

    useEffect(() => {
        getAllPaciente()
    }, [])

    const getAllPaciente = async () => {
        const response = await Config.getAllPaciente()
        setPacientes(response.data)
    }

    useEffect(() => {
        const fetchEmpresa = async () => {
            try {
                const response = await Config.getAlltEmpresa();
                setEmpresaName(response.data);
            } catch (error) {
                console.error("Error encontrado", error);
            }
        };
        fetchEmpresa();
    }, []);

    // Manejar cambios en los campos
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    // Manejar el submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isSubmitting) return;

        setIsSubmitting(true);

        const camposObligatorios = [
            "paciente_id",
            "fecha",
            "hora",
            "motivo",
        ].filter(Boolean);

        const camposVacios = camposObligatorios.filter(
            (campo) => !form[campo] || form[campo].toString().trim() === ""
        );

        if (camposVacios.length > 0) {
            Swal.fire({
                title: "Campos incompletos",
                text: "Por favor, verifique que todos los campos estén completos.",
                icon: "warning"
            });
            setIsSubmitting(false);
            return;
        }

        try {
            const response = await Config.storeAgenda(form);
            if (response.status === 201) {
                Swal.fire({
                    title: "Cita registrada",
                    text: "La cita en espera de ser atendida",
                    icon: "success"
                }).then(() => {
                    navigate(`/${rol}/agenda`);
                });
                // navigate(`/${rol}/agenda`);
            }
        } catch (error) {
            Swal.fire({
                title: "Hubo un error",
                text: "Parece que hubo un error en el formulario, revise bien los campos.",
                icon: "error"
            });
        } finally {
            setIsSubmitting(false); // habilitar de nuevo
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6 border-b pb-4 border-gray-600/25">
                Agendar Consulta
            </h2>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Paciente */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-3">
                            Paciente
                        </label>
                        <select
                            name="paciente_id"
                            value={form.paciente_id}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400">
                            <option value="">Seleccionar</option>
                            {pacientes.map((paciente) => (
                                <option key={paciente.id} value={paciente.id}>
                                    {paciente.nombre}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Fecha */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-3">
                            Fecha
                        </label>
                        <input
                            type="date"
                            name="fecha"
                            value={form.fecha}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    {/* Hora */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-3">
                            Hora
                        </label>
                        <input
                            type="time"
                            name="hora"
                            value={form.hora}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    {/* Motivo */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-3">
                            Motivo
                        </label>
                        <input
                            type="text"
                            name="motivo"
                            value={form.motivo}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                </div>

                {/* Botón de Enviar */}
                <div className="mt-12 text-center">
                    <Link to={`/${rol}/registrar-paciente`}>
                        <button className='bg-blue-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-600 transition mr-4'>
                            Registrar nuevo Paciente
                        </button>
                    </Link>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`px-6 py-2 rounded-md shadow-md transition 
                        ${isSubmitting
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-green-500 hover:bg-green-600 text-white font-medium"}`}
                    >
                        {isSubmitting ? "Guardando..." : "Guardar Cita"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AgendarForm