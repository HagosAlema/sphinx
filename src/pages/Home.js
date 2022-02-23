import React, { useState } from 'react';
import {useNavigate } from 'react-router-dom';
import {ButtonGroup, ToggleButton, Image, Modal, ModalBody} from 'react-bootstrap';
import logo from '../assets/images/main_bg.gif';
import weapon1 from '../assets/images/black_weapon.png';
import weapon2 from '../assets/images/red_weapon.png';
import weapon3 from '../assets/images/white_weapon.png';
import weapon4 from '../assets/images/space_weapon.png';
import weapon5 from '../assets/images/eye_weapon.png';
import weapon6 from '../assets/images/kal_weapon.png';
import {ReactComponent as Game1} from '../assets/images/game1.svg';
import {ReactComponent as Arrow} from '../assets/images/svg/vertical_arrow.svg'
import {ReactComponent as ETH} from '../assets/images/svg/eth_icon.svg'
import {ReactComponent as CHURR} from '../assets/images/svg/churr.svg'
import {ReactComponent as Confirm} from '../assets/images/svg/confirmed.svg'
const Home = () => {
    const navigate = useNavigate()
    const [showDialog, setShowDialog] = useState(false)
    const [showConfirm, setConfirm] = useState(false)
    const [showCheck, setCheck] = useState(false)
    const [wei, setWei]=useState(0)
    const [churr, setChurr] = useState(0)

    const onWieChange = (event) => {
        setWei(event.target.value)
        setChurr(event.target.value)
    }

    const onChurrChange = (event) => {
        setChurr(event.target.value)
        setWei(event.target.value)
    }

    
    return (
        <div className='col-12 top-80'>
            <div className='row'>
                <div className='col-5 padding-top-108'>
                    <h1 className='h-gradient'>Explore The <br/>First NFT <br/>Game Exchange</h1>
                    <p className='p1 top-36 padding-right-48'>
                        국내 최초 NFT와 게임을 연결하는 이차원 게이트 스핑크스 스핑크스 플랫폼 내부에서 NFT를 거래하고,  프타의 지팡이를 이용해 원하는 게임 아이템 모양으로 변형하고, 투탕카멘의 게이트를 이용해 다른 게임으로 자신의 NFT를 이동시키세요
                    </p>
                    <button onClick={
                        ()=>setShowDialog(true)
                        // ()=>connect()
                        } className='gradient-bg padding-horizontal-60 padding-vertical-20 radius-20 height-68 top-48 text-black'> Buy CHURR </button>
                </div>
                <div className='col-7'>
                    <div>
                        <img src={logo} alt='GIF'/>
                    </div>
                </div>
            </div>

            <Modal show={showDialog}
                className="top-60 teleport-modal ">
                    <ModalBody className="max-width purchase-modal-bg centered nft-bg bottom-60"
                    >
                        <div className='max-width'>
                            <div className="d-flex flex-row justify-content-around left-48" style={{overflow: 'none'}}> 
                                <div className="height-80 centered">
                                    <h3 className='text-white centered top-16'>츄르코인 구매하기</h3>
                                </div>
                            </div>

                            <div className='max-width bottom-24' style={{backgroundColor: '#2D2E36', height: 1}}></div>
                            
                            <div className='d-flex flex-column justify-start padding-horizontal-24 left-60 right-60'>
                                <div className='nft-bg padding-16 d-flex flex-column'
                                    style={{backgroundColor: '#2D2E36'}}
                                >
                                    <p className="p1 text-white bottom-8">From</p>
                                    <div className="d-flex flex-row centered">
                                        <div className=""
                                        style={{float: 'left'}}>
                                            <ETH />
                                        </div>
                                        <div 
                                            className="radius-20 left-48 d-flex row-reverse padding-16 align-center"
                                            style={{flexGrow: 1, backgroundColor: '#8C8C8C', height: 80}}
                                        >
                                            <p style={{textAlign: 'right', backgroundColor: 'transparent', border: 0, color: 'white', fontFamily:'poppins', fontSize: '1.5rem', fontWeight:'bold'}}>WEI</p>
                                            <input value={wei} type="number" style={{textAlign: 'right', backgroundColor: 'transparent', border: 0, color: 'white', fontFamily:'poppins', fontSize: '1.5rem', fontWeight:'bold', marginRight: 8, outline: 'none', flexGrow: 1}} onChange={onWieChange}/>

                                        </div>
                                    </div>
                                    <p className="text-white" style={{textAlign: 'right', fontSize: 14, lineHeight: 1.5, fontFamily: 'Poppins', fontWeight: '600', fontStyle:'normal'}}>현재 스핑크스에서는 1 WEI = 1 CHURR 설정해놨습니다 <br /> 0.000000000000000001 ETHER = 1 WEI</p>
                                </div>
                                <div className="centered top-16 bottom-16">
                                    <Arrow />
                                </div>
                                <div className='nft-bg padding-16 d-flex flex-column'
                                    style={{backgroundColor: '#2D2E36'}}
                                >
                                    <p className="p1 text-white bottom-8">To</p>
                                    <div className="d-flex flex-row centered">
                                        <div className=""
                                        style={{float: 'left'}}>
                                            <CHURR />
                                        </div>
                                        <div 
                                            className="radius-20 left-48 d-flex row-reverse padding-16 align-center"
                                            style={{flexGrow: 1, backgroundColor: '#8C8C8C', height: 80}}
                                        >
                                            <p style={{textAlign: 'right', backgroundColor: 'transparent', border: 0, color: 'white', fontFamily:'poppins', fontSize: '1.5rem', fontWeight:'bold'}}>CHURR</p>
                                            <input value={churr} type="number" style={{textAlign: 'right', backgroundColor: 'transparent', border: 0, color: 'white', fontFamily:'poppins', fontSize: '1.5rem', fontWeight:'bold', marginRight: 8, outline: 'none', flexGrow: 1}} onChange={onChurrChange}/>

                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                            <div className="d-flex flex-row centered padding-vertical-48">
                                <button 
                                    onClick={()=>{setConfirm(true)}} 
                                    className='gradient-bg radius-20 padding-horizontal-16 padding-vertical-1 height-40 text-black'>구매하기</button>
                                <div className='gradient-bg radius-20 padding-horizontal-1 padding-vertical-1 link centered left-24' onClick={()=>{setShowDialog(false)}}>
                                    <p className='black-bg-20  text-white centered padding-horizontal-16 height-38'>취소</p>
                                </div>
                            
                            </div>
                        </div>
                    </ModalBody>
                </Modal>

                <Modal show={showConfirm}  className="top-48 centered radius-16">
                    <ModalBody className="purchase-modal-bg max-width radius-16">
                        <h2 className='text-white centered top-16'>츄르코인 구매하기</h2>
                        <div className='max-width top-16 bottom-32' style={{backgroundColor: '#2D2E36', height: 1}}></div>
                        {/* <div className='centered padding-vertical-72 top-32 bottom-12'><p className='purchase-nft-body '>정말로 구매 하시겠습니까?</p></div> */}
                        <div className='centered d-flex flex-column'>
                            {/* <Confirm/> */}
                            <p className='purchase-nft-body top-8'>정말로 구매 하시겠습니까?</p>
                        </div>
                        
                        <div className='d-flex flex-row centered top-72 bottom-32'>
                            <button onClick={()=>{
                                setConfirm(false)
                                setCheck(true)
                                }} className='gradient-bg padding-vertical-4 padding-horizontal-24 radius-20 height-40 text-black'>확인 </button>
                            <div className='gradient-bg radius-20 padding-horizontal-1 padding-vertical-1 link centered left-24' onClick={()=>{setConfirm(false)}}>
                                <p className='black-bg-20  text-white centered padding-horizontal-16 height-38'>취소</p>
                            </div>
                        </div>
                    </ModalBody>
                </Modal>


                <Modal show={showCheck}  className="top-48 centered radius-16">
                    <Modal.Body className="purchase-modal-bg max-width radius-16">
                        <h2 className='text-white centered top-16'>츄르코인 구매하기</h2>
                        <div className='max-width top-16 bottom-32' style={{backgroundColor: '#2D2E36', height: 1}}></div>
                        {/* <div className='centered padding-vertical-72 top-32 bottom-12'><p className='purchase-nft-body '>정말로 구매 하시겠습니까?</p></div> */}
                        <div className='centered d-flex flex-column'>
                            <Confirm/>
                            <p className='purchase-nft-body top-8'>구매 완료!</p>
                        </div>
                        
                        <div className='d-flex flex-row centered top-72 bottom-32'>
                            <button onClick={()=>{
                                setShowDialog(false)
                                setCheck(false)
                                }} className='gradient-bg padding-vertical-4 padding-horizontal-24 radius-20 height-40 text-black'>확인 </button>
                        </div>
                    </Modal.Body>
                </Modal>
        </div>
    )
}

export default Home;