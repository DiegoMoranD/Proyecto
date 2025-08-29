import React, { useEffect, useState } from "react";
import Config from "../../layouts/PageAuth/Config";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

function UpdateMedicamento() {
    const { id } = useParams();

    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [categoria, setCategoria] = useState("");
    const [presentacion, setPresentacion] = useState("");
    const [empresa_id, setEmpresaId] = useState("");
    const [stock, setStock] = useState("");
    const [receta, setReceta] = useState("");

    const [empresas, setEmpresas] = useState([]);

    const navigate = useNavigate();

    const getRol = () => {
        const rol = sessionStorage.getItem('rol');
        return rol ? JSON.parse(rol) : null;
    }

    const rol = getRol();

    useEffect(() => {
        const fetchMedicamento = async () => {
            try {
                const response = await Config.getMedicamentoById(id);
                const data = response.data;
                setNombre(data.nombre || "");
                setDescripcion(data.descripcion || "");
                setCategoria(data.categoria || "");
                setPresentacion(data.presentacion || "");
                // setEmpresaId(data.empresa_id || "");
                setStock(data.stock || "");
                setReceta(data.receta || "");
            } catch (error) {
                console.error("Error al obtener el medicamento", error);
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

        fetchMedicamento();
        fetchEmpresas();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await Config.updateMedicamento(id, {
                nombre,
                descripcion,
                categoria,
                presentacion,
                stock,
                receta,
            });
            Swal.fire({
                title: "Medicamento Actualizado",
                text: "Los datos del medicamento han sido actualizados exitosamente",
                icon: "success"
            }).then(() => {
                navigate(`/${rol}/medicamentos`);
            });
        } catch (error) {
            Swal.fire({
                title: "Hubo un error",
                text: "Parece que hubo un error en el formulario, revise bien los campos.",
                icon: "error"
            })
            console.error(error);
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6 border-b pb-4 border-gray-600/25">
                Registro de Medicamento
            </h2>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Nombre del Paciente */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-3">Nombre</label>
                        <input
                            type="text"
                            name="nombre"
                            value={nombre}
                            onChange={e => setNombre(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Ej: Juan Pérez"
                        />
                    </div>

                    {/* Descripcion */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-3">Descripcion</label>
                        <input
                            type="text"
                            name="descripcion"
                            value={descripcion}
                            onChange={e => setDescripcion(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Ej: Juan Pérez"
                        />
                    </div>

                    {/* Tipo de Sangre */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-3">
                            Categoria
                        </label>
                        <select
                            name="categoria"
                            value={categoria}
                            onChange={e => setCategoria(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400">
                            <option value="">Seleccionar</option>
                            <option value="Antibióticos">Antibióticos</option>
                            <option value="Analgésicos">Analgésicos</option>
                            <option value="Antiinflamatorios">Antiinflamatorios</option>
                            <option value="Antihipertensivos">Antihipertensivos</option>
                            <option value="Antidepresivos">Antidepresivos</option>
                            <option value="Ansiolíticos">Ansiolíticos</option>
                            <option value="Anticonvulsivos">Anticonvulsivos</option>
                            <option value="Antidiabéticos">Antidiabéticos</option>
                            <option value="Antigripales">Antigripales</option>
                            <option value="Antihistamínicos">Antihistamínicos</option>
                            <option value="Antifúngicos">Antifúngicos</option>
                            <option value="Antivirales">Antivirales</option>
                            <option value="Broncodilatadores">Broncodilatadores</option>
                            <option value="Gastroprotectores">Gastroprotectores</option>
                            <option value="Antieméticos">Antieméticos</option>
                            <option value="Diuréticos">Diuréticos</option>
                            <option value="Laxantes">Laxantes</option>
                            <option value="Vitaminas y suplementos">Vitaminas y suplementos</option>
                            <option value="Inmunosupresores">Inmunosupresores</option>
                            <option value="Antipsicóticos">Antipsicóticos</option>
                        </select>
                    </div>

                    {/* Presentacion */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-3">
                            Presentacion
                        </label>
                        <select
                            name="presentacion"
                            value={presentacion}
                            onChange={e => setPresentacion(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400">
                            <option value="">Seleccionar</option>
                            <option value="Cápsulas">Cápsulas</option>
                            <option value="Tabletas">Tabletas</option>
                            <option value="Jarabe">Jarabe</option>
                            <option value="Suspensión">Suspensión</option>
                            <option value="Inyectable">Inyectable</option>
                            <option value="Crema">Crema</option>
                            <option value="Gel">Gel</option>
                            <option value="Supositorio">Supositorio</option>
                            <option value="Parche transdérmico">Parche transdérmico</option>
                            <option value="Aerosol">Aerosol</option>
                            <option value="Gotas">Gotas</option>
                            <option value="Polvo para reconstituir">Polvo para reconstituir</option>
                            <option value="Emulsión">Emulsión</option>
                            <option value="Enema">Enema</option>
                            <option value="Implante">Implante</option>
                            <option value="Loción">Loción</option>
                            <option value="Pastillas para chupar">Pastillas para chupar</option>
                        </select>
                    </div>

                    {/* Empresa */}
                    {/* <div>
                        <label className="block text-gray-700 font-medium mb-3">
                            Empresa
                        </label>
                        <select
                            value={empresa_id}
                            onChange={e => setEmpresaId(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                        >
                            <option value="">Selecciona una empresa</option>
                            {empresas.map((empresa) => (
                                <option key={empresa.id} value={empresa.id}>
                                    {empresa.nombre}
                                </option>
                            ))}
                        </select>
                    </div> */}

                    {/* Stock */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-3">Stock</label>
                        <input
                            type="number"
                            name="stock"
                            value={stock}
                            onChange={e => setStock(e.target.value)}
                            step="1"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Stocñ disponible"
                        />
                    </div>

                    {/* Receta */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-3">
                            Receta
                        </label>
                        <select
                            name="receta"
                            value={receta}
                            onChange={e => setReceta(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400">
                            <option value="">Seleccionar</option>
                            <option value={1}>Receta Necesaria</option>
                            <option value={0}>Receta Inesesaria</option>
                        </select>
                    </div>

                </div>

                {/* Botón de Enviar */}
                <div className="mt-12 text-center">
                    <button
                        type="submit"
                        className="bg-green-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-green-600 transition"
                    >
                        Guardar Medicamento
                    </button>
                </div>
            </form>
        </div>
    )
}

export default UpdateMedicamento