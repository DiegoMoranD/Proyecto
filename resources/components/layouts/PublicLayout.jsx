import React, { useState } from "react";
import Login from "../pages/forms/Login";
import { Outlet } from "react-router-dom";
import SideBar from "../sideBar";
import TopBar from "../Topbar";
import ContentArea from "../ContentArea";
function PublicLayout() {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };
    
    return (
        // <div>
        //     <Outlet></Outlet>
        // </div>

        <main className="flex w-screen h-screen bg-gray-200">
            {/* Sidebar */}
            <SideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <TopBar toggleSidebar={toggleSidebar} />
                <div className="flex-1 p-4 overflow-auto">
                    <ContentArea />
                </div>
            </div>
        </main>
    );
}

export default PublicLayout;
