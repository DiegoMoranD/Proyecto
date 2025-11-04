import React, { useState, useEffect } from 'react'
import Config from '../layouts/PageAuth/Config';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

function Medicamentos() {

    const [medicamentoz, setMedicamento] = useState([]);
    const [empresas, setEmpresa] = useState([]);
    const [search, setSearch] = useState("");
    const [orderNombre, setOrderNombre] = useState("");
    const [orderReceta, setOrderReceta] = useState("");
    const [orderCategoria, setOrderCategoria] = useState("");
    const [orderPresentacion, setOrderPresentacion] = useState("");
    const [orderStock, setOrderStock] = useState("");


    const [filteredMedicamentos, setFilteredMedicamentos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentMedicamentos = filteredMedicamentos.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredMedicamentos.length / itemsPerPage);

    const getRol = () => {
        const rol = sessionStorage.getItem('rol');
        return rol ? JSON.parse(rol) : null;
    }

    const rol = getRol();

    if (rol === 'admin') {
        useEffect(() => {
            const fetchData = async () => {
                const response = await Config.indexMedicamentoByAdmin();
                setMedicamento(response.data);
                setFilteredMedicamentos(response.data);
            };
            fetchData();
        }, []);
    } else {
        useEffect(() => {
            const fetchData = async () => {
                const response = await Config.indexMedicamento();
                setMedicamento(response.data);
                setFilteredMedicamentos(response.data);
            };
            fetchData();
        }, []);
    }



    const eliminarMedicamento = async (id) => {
        Swal.fire({
            title: "¿Eliminar medicamento?",
            text: "¿Esta seguro de eliminar este medicamento?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar!"
        }).then((result) => {
            if (result.isConfirmed) {
                Config.deleteMedicamento(id);
                const nuevosMed = medicamentoz.filter(med => med.id !== id);
                setMedicamento(nuevosMed)
                setFilteredMedicamentos(nuevosMed)
                Swal.fire({
                    title: "Eliminado!",
                    text: "El medicamento ha sido eliminado exitosamente.",
                    icon: "success"
                });
            }
        });
    }

    useEffect(() => {
        let data = [...medicamentoz];

        // Buscar por nombre
        if (search) {
            data = data.filter(p =>
                p.nombre.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (orderCategoria) {
            data = data.filter(p => p.categoria === orderCategoria);
        }

        if (orderPresentacion) {
            data = data.filter(p => p.presentacion === orderPresentacion);
        }

        if (orderNombre === "az") {
            data.sort((a, b) => a.nombre.localeCompare(b.nombre));
        } else if (orderNombre === "za") {
            data.sort((a, b) => b.nombre.localeCompare(a.nombre));
        }

        if (orderStock === "mayor") {
            data.sort((a, b) => a.stock - b.stock);
        } else if (orderStock === "menor") {
            data.sort((a, b) => b.stock - a.stock);
        }

        if (orderReceta) {
            if (orderReceta === "true") {
                data = data.filter(p => p.receta === true || p.receta === 1 || p.receta === "1");
            } else if (orderReceta === "false") {
                data = data.filter(p => p.receta === false || p.receta === 0 || p.receta === "0");
            }
        }

        setFilteredMedicamentos(data);
    }, [search, medicamentoz, orderNombre, orderStock, orderReceta, orderCategoria, orderPresentacion]);

    return (
        <div className="container mx-auto p-6">
            <div className="flex flex-col lg:flex-row flex-wrap gap-4 items-center justify-between bg-gray-100 p-6 rounded-md shadow-sm mb-12">
                <div className="flex flex-col sm:flex-row flex-wrap gap-4 w-full lg:w-auto justify-center sm:justify-start">
                    <select
                        className="h-10 px-4 rounded border border-gray-300 text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
                        value={orderNombre}
                        onChange={e => setOrderNombre(e.target.value)}
                    >
                        <option value="">Ordenar nombre por:</option>
                        <option value="az">De la A-Z</option>
                        <option value="za">De la Z-A</option>
                    </select>

                    <select
                        className="h-10 px-4 rounded border border-gray-300 text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
                        value={orderCategoria}
                        onChange={e => setOrderCategoria(e.target.value)}
                    >
                        <option value="">Categoría:</option>
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
                        <option value="Vitaminas y suplementos">Vitaminas/suplementos</option>
                        <option value="Inmunosupresores">Inmunosupresores</option>
                        <option value="Antipsicóticos">Antipsicóticos</option>
                    </select>

                    <select
                        className="h-10 px-4 rounded border border-gray-300 text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
                        value={orderPresentacion}
                        onChange={e => setOrderPresentacion(e.target.value)}
                    >
                        <option value="">Presentación:</option>
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

                    <select
                        className="h-10 px-4 rounded border border-gray-300 text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
                        value={orderStock}
                        onChange={e => setOrderStock(e.target.value)}
                    >
                        <option value="">Stock:</option>
                        <option value="menor">Del mayor a menor</option>
                        <option value="mayor">Del menor a mayor</option>
                    </select>

                    <select
                        className="h-10 px-4 rounded border border-gray-300 text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
                        value={orderReceta}
                        onChange={e => setOrderReceta(e.target.value)}
                    >
                        <option value="">Receta:</option>
                        <option value="true">Requiere receta</option>
                        <option value="false">No requiere receta</option>
                    </select>
                </div>

                {/* Buscador */}
                <div className="w-full sm:w-auto">
                    <input
                        type="search"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Buscar medicamento"
                        className="h-10 px-4 w-full sm:w-64 rounded border border-gray-300 text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>


            <h2 className="text-2xl font-bold mb-5 border-b border-gray-600/25 pb-4">Catálogo de Medicamentos</h2>
            <div className='mb-5 flex justify-end'>
                <Link to={`/${rol}/medicamento-form`}>
                    <p className='bg-green-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-600 transition duration-500 font-semibold'>Crear Nuevo</p>
                </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentMedicamentos.map(med => (
                    <div key={med.id} className="bg-white rounded-lg shadow p-5 border border-gray-200 relative">
                        <div className="flex justify-between items-start">
                            <h3 className="text-xl font-bold">{med.nombre}</h3>
                            <span className={`px-2 py-1 text-xs rounded font-semibold ${med.receta ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                                {med.receta ? 'Receta' : 'Libre'}
                            </span>
                        </div>
                        <div className="text-gray-600 text-sm mb-2">{med.descripcion}</div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="bg-gray-400 text-white text-xs px-2 py-1 rounded">Stock: {med.stock}</span>
                        </div>
                        <div className="mb-1">
                            <span className="font-semibold">Categoría:</span> {med.categoria}
                        </div>
                        <div className="mb-1">
                            <span className="font-semibold">Presentación:</span> {med.presentacion}
                        </div>
                        <div className="mb-3">
                            <span className="font-semibold">Clinica:</span> {
                                empresas.find(e => e.id === med.empresa_id)?.nombre || med.empresa_id || "Empresa desconocida"
                            }
                        </div>
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mt-2">
                            <Link to={`/${rol}/medicamento-update/${med.id}`}>
                                <button className="w-full sm:w-auto bg-blue-500 text-white px-4 py-2 rounded font-semibold hover:bg-blue-600 transition duration-500">
                                    Actualizar
                                </button>
                            </Link>

                            {rol === 'admin' && (
                                <button
                                    onClick={() => eliminarMedicamento(med.id)}
                                    className="w-full sm:w-auto bg-red-500 text-white px-4 py-2 rounded font-semibold hover:bg-red-600 transition duration-500"
                                >
                                    Eliminar
                                </button>
                            )}
                        </div>
                    </div>
                ))}
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
    );
}

export default Medicamentos