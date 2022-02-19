import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import {ReactComponent as Close} from '../assets/images/logo/CLOSE.svg'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//Recoil
// import { accountAtom, walletKindAtom } from 'atoms/state';
// import { useRecoilState, useRecoilValue } from 'recoil';
// //config
// import { API } from 'config';
// //axios
// import axios from 'axios';
// //hooks
// import useAuth from 'hooks/useAuth';
//svg
import { ReactComponent as MetaMask } from '../assets/images/logo/METAMASK.svg';
import { ReactComponent as Wemix } from '../assets/images/logo/WEMIX.svg';
import { ReactComponent as Bitcoin } from '../assets/images/logo/BITCOIN.svg';
import { ReactComponent as Churr } from '../assets/images/logo/CHURR.svg';


// const CONNECTOR_SESSION = 'connector-session';

// const headers = {
//   Authorization: API.authorization,
// };

toast.configure()
const Connect = ({ resetModal }) => {
    const [show, setShow] = useState(true)
    const notify = () => toast.error("Feature coming soon!", {
        autoClose: 1999,
        position: toast.POSITION.BOTTOM_CENTER
    });
//   const navigate = useNavigate();
//   const walletAccount = useRecoilValue(accountAtom);
//   const [walletKind, setWalletKind] = useRecoilState(walletKindAtom);

//   const { metamaskConnect, kaikasConnect } = useAuth();

//   const registerUser = async () => {
//     const body = {
//       wallet: walletAccount,
//     };
//     try {
//       const response = await axios.post(API.walletConnect, body, {
//         headers: headers,
//       });
//       if ((await response.data.success) === 0) {
//         setIsRegistered(true);
//       } else {
//         window.sessionStorage.setItem(CONNECTOR_SESSION, walletAccount);

//         navigate('/');
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const metamaskLogin = async () => {
//     setWalletKind('METAMASK');
//     await metamaskConnect();
//   };

//   const kaikasLogin = async () => {
//     setWalletKind('KAIKAS');
//     await kaikasConnect();
//   };

//   useEffect(() => {
//     if (!walletAccount || !walletKind) return;
//     registerUser();
//   }, [walletAccount, walletKind]);

    const metamaskLogin = () => {

    }

    const kaikasLogin = () => {

    }



  return (
      <>
    <Modal show={show}  className="top-108">
        <Modal.Body className="modal-bg">
            {/* <div className="content register-form relative col justify-center padding-40 border-radius-24 background-white box-shadow animation-appear top-108"> */}
            <div>
            <ul>
                <li className="top-12 justify-between border-radius-10">
                    <div className="d-flex flex-row justify-content-between padding-16 max-width">
                        <div>
                            <span className="font-28 font-weight-600">Connect to wallet</span>
                        </div>
                        <button className="link" onClick={()=>{
                            setShow(false)
                            resetModal(false)
                            }}>
                            <Close />
                        </button>
                    </div>
                </li>
                <li className="top-12 justify-between box-shadow border-radius-10 link">
                    <button className="d-flex flex-row justify-content-between padding-16 max-width" onClick={() => metamaskLogin()}>
                        <div>
                            <span className="font-28 font-weight-600">MetaMask</span>
                        </div>
                        <div className="">
                            <MetaMask />
                        </div>
                    </button>
                </li>
                <li className="top-12 justify-between box-shadow border-radius-10 link">
                    <button className="d-flex flex-row justify-content-between padding-16 max-width" onClick={notify}>
                        <div>
                            <span className="font-28 line-height-28 font-weight-600">Wemix Wallet</span>
                        </div>
                        <Wemix />
                    </button>
                </li>
                <li className="top-12 justify-between box-shadow border-radius-10 link">
                    <button className="d-flex flex-row justify-content-between padding-16 max-width" onClick={notify}>
                        <div>
                            <span className="font-28 font-weight-600">Bitcoin Wallet</span>
                        </div>
                        <Bitcoin />
                    </button>
                </li>
                <li className="top-12 justify-between box-shadow border-radius-10 link">
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
