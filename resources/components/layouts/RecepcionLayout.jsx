import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import AuthUser from './PageAuth/AuthUser'
import SideBar from '../SideBar'
import TopBar from '../Topbar'  

function RecepcionLayout() {
    const { getRol } = AuthUser()
    const navigate = useNavigate()

    useEffect(() => {
        if (getRol() != "recepcion") {
            navigate("/login")
        }
    }, [])

    return (
        <main className="flex w-screen  h-screen bg-gray-200 fixed">
            <SideBar />
            <div className="flex-1 flex flex-col">
                <TopBar />
                <Outlet />
            </div>
        </main>
    )
}

export default RecepcionLayout