import React, {useEffect, useState} from "react";
import { useNavigate, NavLink } from "react-router-dom";
import {ReactComponent as Logo} from '../assets/images/logo/Logo.svg'
import {Button} from 'react-bootstrap';
import Connect from "../pages/Connect";
const {ethereum} = window

const Nav = () => {
    const navigate = useNavigate()

    const [address, setAddress] = useState(ethereum.selectedAddress)
    const [buttnTxt, setButtonTxt] = useState('지갑 연결')
    const [showModal, setShowModal] = useState(false)

    const setModal = () => {
        // ethereum.request({ method: 'eth_requestAccounts' });
        // console.log('Connect clikced');
        // setAddress(ethereum.selectedAddress);
        
        console.log('setModal');
        setShowModal(true)
    }

    const resetModal = () => {
        console.log('resetModal');
        setShowModal(false)
    }

    useEffect(()=>{
        setAddress(ethereum.selectedAddress)
    },[])

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

                            <Button to={`/home`} 
                                className="btn-light left-48 btn-wrap-text"
                                style={{textOverflow:'ellipsis', width: 150, backgroundColor: "#00FFFFFF", whiteSpace: 'nowrap'}}
                                variant="outline-none"
                                disabled
                            >
                                {address? address : '0 SOL'}
                            </Button>

                            <Button
                                variant="outline-light"
                                onClick={()=>setModal()}
                                className="menu-active name font-weight-600 neturals-5 to-color-white-hover link left-48 transparent-bg"
                                // className="name font-weight-600 neturals-5 to-color-white-hover link left-48 gradient-btn radius-4 padding-horizontal-10 text-black"
                            >
                                {address? 'MyPage':'지갑 연결'}
                            </Button>

                            {/* <NavLink to={`/connect`} 
                                className={({ isActive }) => isActive ? "menu-active name font-weight-600 neturals-5 to-color-white-hover link left-48" : "name font-weight-600 neturals-5 to-color-white-hover link left-48"}
                            >
                                Connect
                            </NavLink> */}
                        </nav>
                    </div>
                    {showModal ? <Connect resetModal={resetModal}/> : null}
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