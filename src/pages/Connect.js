import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import {ReactComponent as Close} from '../assets/images/logo/CLOSE.svg'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//Recoil
import { accountAtom, balance, walletKindAtom } from '../atoms/state';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { ReactComponent as MetaMask } from '../assets/images/logo/METAMASK.svg';
import { ReactComponent as Wemix } from '../assets/images/logo/WEMIX.svg';
import { ReactComponent as Bitcoin } from '../assets/images/logo/BITCOIN.svg';
import { ReactComponent as Churr } from '../assets/images/logo/CHURR.svg';

import web3 from '../web3';
import nft from '../contracts/nft';
import token from '../contracts/token';
import ratio from '../contracts/ratio';


// const CONNECTOR_SESSION = 'connector-session';


toast.configure()

const Connect = ({ resetModal }) => {


    console.log(web3.version);

    const [show, setShow] = useState(true)
    
    const navigate = useNavigate();
    const walletAccount = useRecoilValue(accountAtom);
    const setWalletAccount = useSetRecoilState(accountAtom);
    const setBalance = useSetRecoilState(balance);

    const notify = () => toast.error("Feature coming soon!", {
        autoClose: 1999,
        position: toast.POSITION.BOTTOM_CENTER
    });
    const metamaskLogin = async() => {
        if(window.ethereum !== 'undefined') {
            const accounts = await window.ethereum.request({method: 'eth_requestAccounts'})
            setWalletAccount(accounts[0])
            console.log(accounts[0])
            const b = await nft.methods.balanceOf(accounts[0]).call()
            setBalance(b)
            console.log("balances", b);
            setShow(false)
            resetModal(false)
            // .then(result=>{
            //     console.log(result[0]);
            //     //set account address
            //     setWalletAccount(result[0])
            //     nft.balanceOf(result[0]).call();
            //     setShow(false)
            //     resetModal(false)
            // })
        } else {
            window.open('https://metamask.io/', '_blank');
        }
    }



  return (
      <>
    <Modal show={show}  className="top-108">
        <Modal.Body className="modal-bg">
            {/* <div className="content register-form relative col justify-center padding-40 border-radius-24 background-white box-shadow animation-appear top-108"> */}
            <div className=''>
            <ul className=''>
                <li className="top-12 justify-between border-radius-10 text-black">
                    <div className="d-flex flex-row justify-content-between padding-top-16 max-width">
                        <div className='d-flex flex-column'>
                            <span className="font-28 font-weight-600">Connect to wallet</span>
                            <span className='red-text'>지금은 Metamask랑만 연동됩니다!</span>
                        </div>
                        <button className="link" onClick={()=>{
                            setShow(false)
                            resetModal(false)
                            }}>
                            <Close />
                        </button>
                    </div>
                </li>
                <li className=" justify-between box-shadow radius-10 link white-bg">
                    <button className="d-flex flex-row justify-content-between padding-16 max-width" onClick={() => metamaskLogin()}>
                        <div>
                            <span className="font-28 font-weight-600">MetaMask</span>
                        </div>
                        <div className="">
                            <MetaMask />
                        </div>
                    </button>
                </li>
                <li className="top-12 justify-between box-shadow radius-10 link white-bg">
                    <button className="d-flex flex-row justify-content-between padding-16 max-width" onClick={notify}>
                        <div>
                            <span className="font-28 line-height-28 font-weight-600">Wemix Wallet</span>
                        </div>
                        <Wemix />
                    </button>
                </li>
                <li className="top-12 justify-between box-shadow radius-10 link white-bg">
                    <button className="d-flex flex-row justify-content-between padding-16 max-width" onClick={notify}>
                        <div>
                            <span className="font-28 font-weight-600">Bitcoin Wallet</span>
                        </div>
                        <Bitcoin />
                    </button>
                </li>
                <li className="top-12 justify-between box-shadow border-radius-10 link white-bg">
                    <button className="d-flex flex-row justify-content-between padding-16 max-width" onClick={notify}>
                        <div>
                            <span className="font-28 font-weight-600">Churr Wallet</span>
                        </div>
                        <Churr />
                    </button>
                </li>
            </ul>
            </div>
        </Modal.Body>
    </Modal>
    
    </>
  );
};

export default Connect;
