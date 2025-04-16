import React from "react";
import Login from "../pages/forms/Login";
import { Outlet } from "react-router-dom";
import SideBar from "../sideBar";
import TopBar from "../Topbar";
import ContentArea from "../ContentArea";
function PublicLayout() {
    return (
        // <div>
        //     <Outlet></Outlet>
        // </div>

        <main className="flex w-screen h-screen bg-gray-200 fixed flex-col sm:flex-row">
            <SideBar />
            <div className="flex-1 flex flex-col">
                <TopBar />
                <div className="p-4 overflow-auto">
                    <ContentArea /> {/* Renderiza las subrutas aquí */}
                </div>
            </div>
        </main>
    );
}

export default PublicLayout;
