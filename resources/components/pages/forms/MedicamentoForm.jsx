import React, { useEffect, useState } from "react";
import Config from '../../layouts/PageAuth/Config'
import { useNavigate } from "react-router-dom";


function MedicamentoForm() {
    const [empresas, setEmpresa] = useState([]);
    const navigate = useNavigate();
    const [medicamento, setMedicamento] = useState({
        nombre: "",
        descripcion: "",
        categoria: "",
        presentacion: "",
        empresa_id: "",
        stock: "",
        receta: "",
    });

    const getRol = () => {
        const rol = sessionStorage.getItem('rol');
        return rol ? JSON.parse(rol) : null;
    }

    const rol = getRol();

    useEffect(() => {
        const fetchEmpresa = async () => {
            try {
                const response = await Config.getAlltEmpresa();
                setEmpresa(response.data);
            } catch (error) {
                console.error("Error encontrado", error);
            }
        };
        fetchEmpresa();
    }, []);

    const handleMedicamentoChange = (e) => {
        setMedicamento({ ...medicamento, [e.target.name]: e.target.value });
    };

    const submitMedicamento = async (e) => {
        e.preventDefault();
        try {
            // Convertir receta a booleano
            const dataToSend = {
                ...medicamento,
                receta: medicamento.receta === "true" || medicamento.receta === true,
            };

            const response = await Config.storeMedicamento(dataToSend);

            if (response.status === 201 || response.data.success) {
                alert("Medicamento registrado exitosamente");
                navigate(`/${rol}/medicamento-form`);
            }
        } catch (error) {
            alert("Error al registrar el Medicamento");
            console.error(error);
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6 border-b pb-4 border-gray-600/25">
                Registro de Medicamento
            </h2>

            <form onSubmit={submitMedicamento}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Nombre del Paciente */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-3">Nombre</label>
                        <input
                            type="text"
                            name="nombre"
                            value={medicamento.nombre}
                            onChange={handleMedicamentoChange}
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
                            value={medicamento.descripcion}
                            onChange={handleMedicamentoChange}
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
                            value={medicamento.categoria}
                            onChange={handleMedicamentoChange}
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
                            value={medicamento.presentacion}
                            onChange={handleMedicamentoChange}
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
                    <div>
                        <label className="block text-gray-700 font-medium mb-3">
                            Id de la empresa
                        </label>
                        <select
                            value={medicamento.empresa_id}
                            name="empresa_id"
                            onChange={handleMedicamentoChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400">
                            <option value="">Selecciona una empresa</option>
                            {empresas.map((empresa) => (
                                <option key={empresa.id} value={empresa.id}>
                                    {empresa.nombre}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Stock */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-3">Stock</label>
                        <input
                            type="number"
                            name="stock"
                            value={medicamento.stock}
                            onChange={handleMedicamentoChange}
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
                            value={medicamento.receta}
                            onChange={handleMedicamentoChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400">
                            <option value="">Seleccionar</option>
                            <option value={true}>Receta Necesaria</option>
                            <option value={false}>Receta Inesesaria</option>
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

export default MedicamentoForm