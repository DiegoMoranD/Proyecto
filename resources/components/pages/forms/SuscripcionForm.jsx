import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Config from "../../layouts/PageAuth/Config";
import Swal from 'sweetalert2';

const SuscripcionForm = () => {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [descuento, setDescuento] = useState('');
  const [dias, setDiasSuscripcion] = useState('');
  const navigate = useNavigate();
  const getRol = () => {
    const rol = sessionStorage.getItem('rol');
    return rol ? JSON.parse(rol) : null;
  }

  const rol = getRol();

  const sumitSuscripcion = async (e) => {
    e.preventDefault();
    await Config.getSuscripcionStore({
      nombre,
      precio,
      descuento,
      dias
    })
      .then((response) => {
        console.log(response.data);
        Swal.fire({
          title: "Suscripcion Registrada",
          text: "La suscripcion ha sido registrada correctamente.",
          icon: "success"
        }).then(() => {
          navigate(`/${rol}/suscripcion`);
        });
      })
      .catch((error) => {
        Swal.fire({
          title: "Hubo un error",
          text: "Parece que hubo un error en el formulario, revise bien los campos.",
          icon: "error"
        });
      });
    console.error(error);
  }

  return (
    <div className="min-w-[800px] h-fit mx-auto bg-white shadow-lg rounded-lg p-10 mt-10">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4 border-b pb-2 border-gray-950/30">
        Registro de Suscripción
      </h2>

      <form onSubmit={sumitSuscripcion} className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          {/* Nombre de la Suscripción */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Nombre de la Suscripción
            </label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Ej: Premium Plus"
            />
          </div>

          {/* Precio */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Precio ($)</label>
            <input
              type="number"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              min="0"
              max="9999.99"
              step="0.01"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Ej: 99.99"
            />
          </div>

          {/* Descuento */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Descuento (%)</label>
            <input
              type="number"
              value={descuento}
              onChange={(e) => setDescuento(e.target.value)}
              step="1"
              min="0"
              max="100"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Ej: 10"
            />
          </div>

          {/* Días de Suscripción */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Días de Suscripción
            </label>
            <input
              type="number"
              value={dias}
              onChange={(e) => setDiasSuscripcion(e.target.value)}
              min="1"
              max="365"
              step="1"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Ej: 30"
            />
          </div>
        </div>

        {/* Botón de Enviar */}
        <div className="mt-6 text-center">
          <button
            type="submit"
            className="bg-indigo-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-indigo-600 transition"
          >
            Guardar Suscripción
          </button>
        </div>
      </form>
    </div>
  );
};

export default SuscripcionForm;
