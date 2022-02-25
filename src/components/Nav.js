import React, {useEffect, useState} from "react";
import { useNavigate, NavLink } from "react-router-dom";
import {ReactComponent as Logo} from '../assets/images/logo/Logo.svg'
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { accountAtom, balance } from "../atoms/state";
import {Button} from 'react-bootstrap';
import Connect from "../pages/Connect";
import nft from "../contracts/nft";
import token from "../contracts/token";
const {ethereum} = window

const Nav = () => {
    const navigate = useNavigate()

    const [address, setAddress] = useState(ethereum.selectedAddress)
    const [buttnTxt, setButtonTxt] = useState('지갑 연결')
    const [showModal, setShowModal] = useState(false)
    const walletAddress = useRecoilValue(accountAtom)
    const accountBalance = useRecoilValue(balance)
    const setAccountBalance = useSetRecoilState(balance)
    // const [selectedAddress, setSelectedAddress] = useRecoilState(accountAtom)
    const setSelectedAddress = useSetRecoilState(accountAtom)

    const connect = () => {
        // ethereum.request({ method: 'eth_requestAccounts' });
        // console.log('Connect clikced');
        // setAddress(ethereum.selectedAddress);
        if(!walletAddress) {
            console.log('setModal');
            setShowModal(true)
        } else {

        }
        
    }

    const resetModal = () => {
        console.log('resetModal');
        setShowModal(false)
    }

    

    useEffect( ()=>{
        if(window.ethereum !== 'undefined'){
            setAddress(ethereum.selectedAddress)
            setSelectedAddress(ethereum.selectedAddress)

            const getAccountBalance = async () =>{
                var b = await token.methods.balanceOf(ethereum.selectedAddress).call();
                setAccountBalance(b)
            }
            if(ethereum.selectedAddress !== 'undefined') {
                getAccountBalance()
            }
        } 
        
    },[walletAddress])

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
                                className={({ isActive }) => isActive ? "menu-active name font-weight-600 neturals-5 to-color-white-hover link left-40" : "name font-weight-600 neturals-5 to-color-white-hover link left-40"}
                            >
                                Home
                            </NavLink>

                            <NavLink to={`/trade`} 
                                className={({ isActive }) => isActive ? "menu-active name font-weight-600 neturals-5 to-color-white-hover link left-40" : "name font-weight-600 neturals-5 to-color-white-hover link left-40"}
                            >
                                NFT Market
                            </NavLink>
                            <NavLink to={`/transform`} 
                                className={({ isActive }) => isActive ? "menu-active name font-weight-600 neturals-5 to-color-white-hover link left-40" : "name font-weight-600 neturals-5 to-color-white-hover link left-40"}
                            >
                                Design Transform
                            </NavLink>

                            <NavLink to={`/teleportation`} 
                                className={({ isActive }) => isActive ? "menu-active name font-weight-600 neturals-5 to-color-white-hover link left-40" : "name font-weight-600 neturals-5 to-color-white-hover link left-40"}
                            >
                                NFT Teleportation
                            </NavLink>

                            <button to={`/home`} 
                                className="gradient-bg height-40 padding-horizontal-8 left-48 btn-wrap-text"
                                style={{textOverflow:'ellipsis', width: 150, backgroundColor: "#00FFFFFF", whiteSpace: 'nowrap', display: address? 'inline': 'none'}}
                                variant="outline-none"
                                disabled
                                
                            >
                                {accountBalance?accountBalance:'NIL'} CHURR
                            </button>

                            {!walletAddress ?(<Button
                                variant="outline-light"
                                onClick={()=>connect()}
                                className="menu-active name font-weight-600 neturals-5 to-color-white-hover link left-40 transparent-bg"
                                // className="name font-weight-600 neturals-5 to-color-white-hover link left-48 gradient-btn radius-4 padding-horizontal-10 text-black"
                            >
                                지갑 연결
                            </Button>): 
                            (
                                <NavLink to={`/mypage`} 
                                className={({ isActive }) => isActive ? "menu-active name font-weight-600 neturals-5 to-color-white-hover link left-40" : "name font-weight-600 neturals-5 to-color-white-hover link left-40"}                            >
                                My Page
                            </NavLink>
                            )}

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
