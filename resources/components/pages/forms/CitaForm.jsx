import React, { useEffect, useState } from "react";
import Config from "../../layouts/PageAuth/Config";
import { Link, useParams } from "react-router-dom";

function CitaForm() {
    const { id } = useParams(); // id de la cita
    const { paciente_id } = useParams(); // id de la cita

    const [nombre, setNombre] = useState("");
    const [medicamentosMap, setMedicamentosMap] = useState([]);
    const [medicamentos, setMedicamentos] = useState([]);
    const [medicamentoActual, setMedicamentoActual] = useState({ medicamento_id: '', indicaciones: '' });

    const handleMedicamentoChange = (e) => {
        setMedicamentoActual({ ...medicamentoActual, [e.target.name]: e.target.value });
    };

    const agregarMedicamento = (e) => {
        e.preventDefault();
        if (medicamentoActual.medicamento_id && medicamentoActual.indicaciones) {
            setMedicamentos([...medicamentos, medicamentoActual]);
            setMedicamentoActual({ medicamento_id: '', indicaciones: '' });
        }
    };

    const eliminarMedicamento = (index) => {
        setMedicamentos(medicamentos.filter((_, i) => i !== index));
    };

    useEffect(() => {
        const fetchMed = async () => {
            try {
                const response = await Config.indexMedicamento();
                setMedicamentosMap(response.data);
            } catch (error) {
                console.error("Error encontrado", error);
            }
        };
        fetchMed();
    }, []);

    const [form, setForm] = useState({
        peso: '',
        altura: '',
        imc: '',
        sintomas: '',
        alergias: '',
        diagnostico: '',
        recomendaciones: '',
    });

    const handleCitaChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        const fetchPaciente = async () => {
            try {
                const response = await Config.getPacienteById(id);
                const data = response.data;
                setNombre(data.nombre || "");
            } catch (error) {
                console.error("Error al obtener paciente", error);
            }
        };
        fetchPaciente();
    }, [id]);

    const handleSubmitCita = async (e) => {
        e.preventDefault();
        const peso = parseFloat(form.peso);
        const altura = parseFloat(form.altura);
        const imc = altura > 0 ? (peso / (altura * altura)).toFixed(2) : 0;

        try {
            await Config.CitaDetalles(id, {
                ...form,
                imc,
                medicamentos
            });
            setForm({
                peso: '',
                altura: '',
                imc: '',
                sintomas: '',
                alergias: '',
                diagnostico: '',
                recomendaciones: '',
            })
            setMedicamentos([])
            alert('Cita atendida correctamente');
        } catch (error) {
            if (error.response && error.response.data && error.response.data.errors) {
                console.log(error.response.data.errors);
                alert('Error: ' + JSON.stringify(error.response.data.errors));
            } else {
                alert('Error al atender la cita');
            }
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6 border-b pb-4 border-gray-600/25">
                Atencion de cita de {nombre}
            </h2>

            <form onSubmit={handleSubmitCita}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Hora */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-3">
                            Peso
                        </label>
                        <input
                            type="number"
                            name="peso"
                            value={form.peso}
                            onChange={handleCitaChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    {/* Motivo */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-3">
                            Alutura
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            name="altura"
                            value={form.altura}
                            onChange={handleCitaChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-3">
                            Sintomas
                        </label>
                        <textarea
                            type="text"
                            name="sintomas"
                            value={form.sintomas}
                            onChange={handleCitaChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-3">
                            Alergias
                        </label>
                        <textarea
                            type="text"
                            name="alergias"
                            value={form.alergias}
                            onChange={handleCitaChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-3">
                            Diagnostico
                        </label>
                        <textarea
                            type="text"
                            name="diagnostico"
                            value={form.diagnostico}
                            onChange={handleCitaChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-3">
                            Recomendaciones
                        </label>
                        <textarea
                            type="text"
                            name="recomendaciones"
                            value={form.recomendaciones}
                            onChange={handleCitaChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                </div>

                <h2 className="text-2xl font-bold border-b my-8 border-gray-600/25 pb-4">
                    Receta
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <label className="block text-gray-700 font-medium mb-3">
                            Medicamento:
                        </label>
                        <select
                            name="medicamento_id"
                            value={medicamentoActual.medicamento_id}
                            onChange={handleMedicamentoChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            {medicamentosMap.map((medicamento) => (
                                <option key={medicamento.id} value={medicamento.id}>
                                    {medicamento.nombre}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-3">
                            Indicaciones
                        </label>
                        <textarea
                            name="indicaciones"
                            value={medicamentoActual.indicaciones}
                            onChange={handleMedicamentoChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div className="items-center flex justify-center col-span-2">
                        <button
                            className="bg-blue-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-600 transition"
                            onClick={agregarMedicamento}
                            type="button"
                        >
                            Agregar Medicamento
                        </button>
                    </div>
                </div>


                <div className="my-4">
                    <h3 className="font-bold mb-2">Medicamentos Recetados:</h3>
                    {medicamentos.length === 0 && <p className="text-gray-500">No hay medicamentos agregados.</p>}
                    <ul>
                        {medicamentos.map((med, idx) => (
                            <li key={idx} className="flex items-center justify-between border-b py-2">
                                <span>Medicamento ID: {med.medicamento_id} - Indicaciones: {med.indicaciones}</span>
                                <button
                                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                    type="button"
                                    onClick={() => eliminarMedicamento(idx)}
                                >
                                    Eliminar
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>


                {/* Botón de Enviar */}
                <div className="mt-12 text-center">
                    <button
                        type="submit"
                        className="bg-green-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-green-600 transition"
                    >
                        Guardar Cita
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CitaForm