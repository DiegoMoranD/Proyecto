import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function AuthUser() {
    const navigate = useNavigate();
    
    const getToken = () => {
        const tokenString = sessionStorage.getItem('token');
        const token = JSON.parse(tokenString);
        return token;
    }

    const getUser = () => {
        const userString = sessionStorage.getItem('user')
        const user = JSON.parse(userString)
        return user;
    }

    const getRol = () => {
        const rolString = sessionStorage.getItem('rol')
        const rol = JSON.parse(rolString)
        return rol;
    }

    const [token, setToken] = useState(getToken());
    const [user, setUser] = useState(getUser());
    const [rol, setRol] = useState(getRol());

    const saveToken = (user, token, rol) => {
        sessionStorage.setItem('token', JSON.stringify(token))
        sessionStorage.setItem('user', JSON.stringify(user))
        sessionStorage.setItem('rol', JSON.stringify(rol))

        setToken(token)
        setUser(user)
        setRol(rol)

        // Rol Admin | Medico | Recepcion | Paciente

        if(getRol()==="root"){
            navigate('/root/home')
        }
        if(getRol()==="admin"){
            navigate('/admin/home')
        }
        if(getRol()==="medico"){
            navigate('/medico/home')
        }
        if(getRol()==="recepcion"){
            navigate('/recepcion/home')
        }
        if(getRol()==="paciente"){
            navigate('/paciente/home')
        }
    }

    const getLogout = () =>{
        sessionStorage.clear()
        navigate('/login')
    }

    return {
        setToken: saveToken,
        token,
        user,
        rol,
        getToken,
        getUser,
        getRol,
        getLogout
    };
}

export default AuthUser