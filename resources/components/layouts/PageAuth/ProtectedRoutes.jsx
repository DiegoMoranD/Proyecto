import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import AuthUser from './AuthUser'

function ProtectedRoutes() {
    const { getToken } = AuthUser()
    if (!getToken()) {
        return <Navigate to={'/login'} />
    }

    return (
        <div>
            <Outlet></Outlet>
        </div>
    )
}

export default ProtectedRoutes