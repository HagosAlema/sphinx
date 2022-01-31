import React from "react";
import { useNavigate, NavLink } from "react-router-dom";
import {ReactComponent as Logo} from '../assets/images/logo/Logo.svg'

const Nav = () => {
    const navigate = useNavigate()
    return (
        <>
            <header
                className='nav fixed padding-top-20 max-width'
            >
                <div className='height-80 font-22 col-12'>
                    <div className="menus col-12">
                        <nav>

                            <NavLink to={`/`} 
                                className="name font-weight-600 neturals-5 link left-60 logo-text"
                            >
                                SPHINX
                            </NavLink>
                            <NavLink to={`/`} 
                                className={({ isActive }) => isActive ? "menu-active name font-weight-600 neturals-5 to-color-white-hover link left-48" : "name font-weight-600 neturals-5 to-color-white-hover link left-48"}
                            >
                                Home
                            </NavLink>

                            <NavLink to={`/trade`} 
                                className={({ isActive }) => isActive ? "menu-active name font-weight-600 neturals-5 to-color-white-hover link left-48" : "name font-weight-600 neturals-5 to-color-white-hover link left-48"}
                            >
                                NFT Trade
                            </NavLink>
                            <NavLink to={`/transform`} 
                                className={({ isActive }) => isActive ? "menu-active name font-weight-600 neturals-5 to-color-white-hover link left-48" : "name font-weight-600 neturals-5 to-color-white-hover link left-48"}
                            >
                                Design Transform
                            </NavLink>

                            <NavLink to={`/teleportation`} 
                                className={({ isActive }) => isActive ? "menu-active name font-weight-600 neturals-5 to-color-white-hover link left-48" : "name font-weight-600 neturals-5 to-color-white-hover link left-48"}
                            >
                                NFT Teleportation
                            </NavLink>
                        </nav>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Nav;



{/* <Logo onClick={() => navigate('/')} className="row height-80 link white left-48"/> */}
                    {/* <div className='menus row align-center'>
                        <ul className='menu-list '>
                            <li className="menu-item inline-block left-48" >
                                <span
                                    onClick={() => navigate('/')}
                                    className="name font-weight-600 neturals-5 to-color-white-hover link"
                                >
                                    Home
                                </span>
                            </li>
                            <li className="menu-item inline-block left-48">
                                <span
                                    onClick={() => navigate('/trade')}
                                    className="name font-weight-600 neturals-5 to-color-white-hover link "
                                >
                                    NFT Trade
                                </span>
                            </li>
                        </ul>
                    </div> */}