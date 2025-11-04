import React, { useState, useEffect } from 'react'
import Config from '../../layouts/PageAuth/Config';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

function AgendarForm() {
    const MySwal = withReactContent(Swal);

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

    // ? Modal de registro de nuevo paciente

    const ModalPacienteForm = ({ onSubmit }) => {
        const [nombre, setNombre] = useState("");
        const [sex, setSex] = useState("");
        const [fecha_nacimiento, setFechaNacimiento] = useState("");
        const [tipo_sangre, setTipoSangre] = useState("");
        const [peso, setPeso] = useState("");
        const [altura, setAltura] = useState("");
        const [imc, setImc] = useState("");

        useEffect(() => {
            // Calcular IMC en tiempo real
            const pesoNum = parseFloat(peso);
            const alturaNum = parseFloat(altura);
            if (!isNaN(pesoNum) && !isNaN(alturaNum) && alturaNum > 0) {
                setImc((pesoNum / (alturaNum * alturaNum)).toFixed(2));
            } else {
                setImc("");
            }
        }, [peso, altura]);

        return (
            <form
                onSubmit={e => {
                    e.preventDefault();
                    onSubmit({
                        nombre,
                        sex,
                        fecha_nacimiento,
                        tipo_sangre,
                        peso,
                        altura,
                        imc,
                        fecha_registro: new Date().toISOString().slice(0, 10),
                    });
                }}
            >
                <div className="bg-white p-4 max-w-2xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                        🩺 Registro de Paciente
                    </h2>

                    {/* FORM GRID */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Nombre */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Nombre completo</label>
                            <input
                                type="text"
                                value={nombre}
                                onChange={e => setNombre(e.target.value)}
                                placeholder="Ej: Juan Pérez"
                                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                required
                            />
                        </div>

                        {/* Sexo */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Sexo</label>
                            <select
                                value={sex}
                                onChange={e => setSex(e.target.value)}
                                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                required
                            >
                                <option value="">Seleccione...</option>
                                <option value="Femenino">Femenino</option>
                                <option value="Masculino">Masculino</option>
                                <option value="Binario">Binario</option>
                                <option value="No Definido">No Definido</option>
                                <option value="Otro">Otro</option>
                            </select>
                        </div>

                        {/* Fecha nacimiento */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Fecha de nacimiento</label>
                            <input
                                type="date"
                                value={fecha_nacimiento}
                                onChange={e => setFechaNacimiento(e.target.value)}
                                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                required
                            />
                        </div>

                        {/* Tipo sangre */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de sangre</label>
                            <select
                                value={tipo_sangre}
                                onChange={e => setTipoSangre(e.target.value)}
                                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                required
                            >
                                <option value="">Seleccione...</option>
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                            </select>
                        </div>

                        {/* Peso */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Peso (kg)</label>
                            <input
                                type="number"
                                step="0.1"
                                value={peso}
                                onChange={e => setPeso(e.target.value)}
                                placeholder="Ej: 70.5"
                                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                required
                            />
                        </div>

                        {/* Altura */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Altura (m)</label>
                            <input
                                type="number"
                                step="0.01"
                                value={altura}
                                onChange={e => setAltura(e.target.value)}
                                placeholder="Ej: 1.75"
                                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                required
                            />
                        </div>

                        {/* IMC */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">IMC (calculado automáticamente)</label>
                            <input
                                type="text"
                                value={imc}
                                readOnly
                                className="w-full border border-gray-200 bg-gray-100 px-4 py-2 rounded-lg text-gray-700 cursor-not-allowed"
                            />
                            {imc && (
                                <p className="text-sm mt-1 text-gray-500 italic">
                                    {imc < 18.5
                                        ? "Bajo peso"
                                        : imc < 25
                                            ? "Peso normal"
                                            : imc < 30
                                                ? "Sobrepeso"
                                                : "Obesidad"}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Botón */}
                    <div className="mt-8 flex justify-center">
                        <button
                            type="submit"
                            className="w-full md:w-1/2 bg-green-500 hover:bg-green-600 text-white font-semibold py-2.5 rounded-lg shadow-md transition-transform hover:scale-[1.02]"
                        >
                            Registrar Paciente
                        </button>
                    </div>
                </div>
            </form>
        );
    };


    const handleRegistrarPaciente = () => {
        MySwal.fire({
            html: <ModalPacienteForm onSubmit={async (data) => {
                try {
                    // Aquí puedes agregar empresa_id si es necesario según el rol
                    const userString = sessionStorage.getItem('user');
                    const user = userString ? JSON.parse(userString) : null;
                    let empresa_id = user?.empresa_id || '';
                    const pacienteData = { ...data, empresa_id };

                    const response = await Config.storePaciente(pacienteData);
                    if (response.data.id) {
                        MySwal.close();
                        Swal.fire('¡Paciente registrado!', 'El paciente se ha registrado correctamente.', 'success');
                        // Actualiza la lista de pacientes
                        getAllPaciente();
                    }
                } catch (error) {
                    Swal.fire('Error', 'No se pudo registrar el paciente. Verifica los datos.', 'error');
                }
            }} />,
            showConfirmButton: false,
            showCloseButton: true,
            width: 500,
        });
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
                    <button
                        type="button"
                        className='bg-blue-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-600 transition mr-4 font-medium'
                        onClick={handleRegistrarPaciente}
                    >
                        Registrar nuevo Paciente
                    </button>
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