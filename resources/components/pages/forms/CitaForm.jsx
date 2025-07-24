import React, { useEffect, useState } from "react";
import Config from "../../layouts/PageAuth/Config";
import { Link, useParams } from "react-router-dom";

function CitaForm() {
    const { id } = useParams(); // id de la cita
    const { paciente_id } = useParams(); // id de la cita

    const [nombre, setNombre] = useState("");

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

    // useEffect(() => {
    //     const fetchPaciente = async () => {
    //         try {
    //             const response = await Config.getPacienteById(id);
    //             const data = response.data;
    //             setNombre(data.nombre || "");
    //         } catch (error) {
    //             console.error("Error al obtener paciente", error);
    //         }
    //     };
    //     fetchPaciente();
    // }, [id]);

    const handleSubmitCita = async (e) => {
        e.preventDefault();
        const peso = parseFloat(form.peso);
        const altura = parseFloat(form.altura);
        const imc = altura > 0 ? (peso / (altura * altura)).toFixed(2) : 0;

        try {
            await Config.CitaDetalles(id, {
                ...form,
                imc // agrega el imc calculado
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
                Atencion de cita de {}
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