import React from "react";
import {useNavigate} from 'react-router-dom'

const Teleportation = () => {
    const navigate = useNavigate()

    return (
        <div className="main col centered top-108">
            <h1>Teleportation</h1>
        </div>
    )
}

export default Teleportation;