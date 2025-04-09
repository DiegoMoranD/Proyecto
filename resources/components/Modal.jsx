import React from 'react';

const Modal = ({ isOpen, onClose, title, message }) => {
    return (
        <div
            className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 transition-opacity duration-300 ${
                isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
        >
            <div
                className={`bg-white rounded-lg shadow-lg w-96 p-6 transform transition-transform duration-300 ${
                    isOpen ? 'scale-100' : 'scale-90'
                }`}
            >
                <h2 className="text-xl font-semibold mb-4">{title}</h2>
                <div className="mb-6">{message}</div>
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
    );
};

export default Modal;