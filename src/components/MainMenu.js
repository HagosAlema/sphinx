import React from "react";
import {useNavigate} from 'react-router-dom';

const MainMenu = ({ text, nav }) => {
    const navigate = useNavigate()
    console.log(nav);
    return (
        <li className="menu-item inline-block">
            <span
                onClick={() => navigate('/'+{nav})}
            >
                {text}
            </span>
        </li>
    )
}

export default MainMenu;