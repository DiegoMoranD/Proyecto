import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import SideBar from './SideBar';
import TopBar from './Topbar';
import ContentArea from './ContentArea';

export default function App() {

    return (
        <Router>
            <main className="flex w-screen  h-screen bg-gray-200 fixed">
                    <SideBar />
                <div className="flex-1 flex flex-col">
                    <TopBar />
                    <ContentArea />
                </div>
            </main>
        </Router>
    );
}