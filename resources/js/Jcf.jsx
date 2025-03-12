import React from "react";
import { createRoot } from "react-dom/client";

export default function Jcf() {
    return(
        <>
    <div>hola</div>
    </>
    )
}

if (document.getElementById('jcfreact')) {
    createRoot(document.getElementById('jcfreact')).render(<Jcf/>)
}