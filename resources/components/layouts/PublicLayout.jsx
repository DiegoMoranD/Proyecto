import React from 'react'
import Login from '../pages/forms/Login'
import { Outlet } from 'react-router-dom'

function PublicLayout() {
    return (
        <div>
            <Outlet></Outlet>
        </div>
    )
}

export default PublicLayout