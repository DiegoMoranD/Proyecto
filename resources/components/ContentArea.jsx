import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Table from './items/Table';

function ContentArea() {
    return (
        <section className="bg-orange-300 h-full">
            <div className="bg-white p-4 m-4">
                <div>
                Dashboard
                </div>
                <div>
                    <Table></Table>
                </div>
            </div>
        </section>
    )
}

export default ContentArea