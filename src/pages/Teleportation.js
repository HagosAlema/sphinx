import React, { useState } from "react";
import {useNavigate} from 'react-router-dom';
import Countdown from "react-countdown";

import {ReactComponent as Game1} from '../assets/images/game1.svg';
import {ReactComponent as Game2} from '../assets/images/game2.svg';
import {ReactComponent as Game1Icon} from '../assets/images/svg/game1_icon.svg';
import {ReactComponent as Game2Icon} from '../assets/images/svg/game2_icon.svg';
import {ReactComponent as Arrow} from '../assets/images/arrow_forward.svg'
import {ReactComponent as Confirm} from '../assets/images/svg/confirmed.svg'

import weapon1 from '../assets/images/black_weapon.png';
import weapon2 from '../assets/images/red_weapon.png';
import weapon3 from '../assets/images/white_weapon.png';
import weapon4 from '../assets/images/space_weapon.png';
import weapon5 from '../assets/images/eye_weapon.png';
import weapon6 from '../assets/images/kal_weapon.png';
import NFTSlider from "../components/NFTSlider";
import { Modal, ModalBody } from "react-bootstrap";
import NFTTeleport from "../components/NFTTeleport";

const weapons = [
    {name: "BLACK RIFFLE", id: 1, image: weapon1, price: 130},
    {name: "RED RIFFLE", id: 2, image: weapon2, price: 123},
    {name: "WHITE RIFFLE", id: 3, image: weapon5, price: 125},
    // {name: "SPACE GUN", id: 4, image: weapon3, price: 430},
    // {name: "EYE GUN", id: 5, image: weapon4, price: 432},
    // {name: "BLACK KAL", id: 6, image: weapon6, price: 230}
]


const options = ['Game 1', 'Game 2']

const Teleportation = () => {
    const navigate = useNavigate()
    const [dialog1, setDialog1] = useState(false)
    const [dialog2, setDialog2] = useState(false)
    const [dialog3, setDialog3] = useState(false)
    const [option1, setOption1] = useState('Game 1')
    const [option2, setOption2] = useState('Game 2')

    const renderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
          // Render a completed state
          return <p className="hour-text">0</p>
        } else {
          // Render a countdown
          return <p className="hour-text">{hours}:{minutes}:{seconds}</p>;
        }
      };

      const onItemSelect = (id, name, price, image) => {
        console.log(id,name,price,image);
        setDialog1(true)
      }

      const onOption1Change = (event) => {
          console.log(event.target.value);
          const value = event.target.value
          setOption1(value)
          if(value === options[0]) {
              setOption2(options[1])
          } else {
              setOption2(options[0])
          }
      }
      const onOption2Change = event => {
        const value = event.target.value
        setOption2(value)
        if(value === options[0]) {
            setOption1(options[1])
        } else {
            setOption1(options[0])
        }
      }

    return (
        <div className="col-12 top-108">
            <div>
                <div className='col-12 top-60'>
                   

                        <h3 className='heading-white-poppins centered'>NFT Teleportation</h3>
                        
                    
                    <p className='p2'>투탕카멘의 게이트는 다른 차원으로 이동할 수 있는 <br /> 고대의 유물안에서 발견된 이차원 전송 게이트입니다. <br />자신이 가지고 있는 게임 아이템을 다른 게임으로 전송해보세요.</p>
                </div>
            </div>
            <div className='teleport-bg padding-12 top-60'>
                 <div className="d-flex flex-row centered">
                    <h3 className='heading-white-poppins centered'>{`Tutankhamun’s Gate is Open`}</h3>
                    {/* <button 
                            onClick={()=>setDialog1(true)} 
                            className='gradient-bg padding-horizontal-40 padding-vertical-10 radius-10 height-48 text-black left-60'>Start</button> */}

                </div>
                <div className='top-48'>
                    <div className='d-flex flex-row justify-center top-60'>
                        <div className="d-flex flex-column align-start">
                            <div 
                                className="d-flex flex-column centered  padding-vertical-48 padding-horizontal-60 radius-20"
                                style={{backgroundColor: '#1F2326'}}
                            >
                                <Game1Icon />
                                <select 
                                    className="transparent-bg stat-input font-size-18 white-bg text-black radius-5 top-16 padding-horizontal-60 padding-vertical-8"
                                    onChange={onOption1Change}
                                    value={option1}
                                >
                                    <option value="Game 1">Game 1</option>
                                    <option value="Game 2">Game 2</option>
                                </select>
                            </div>
                            <div className="padding-8"/>
                        </div>
                        <div className='d-flex flex-row left-60 right-60 centered'>
                            <Arrow />
                        </div>
                        <div className="d-flex flex-column centered">
                            <div 
                                    className="d-flex flex-column centered padding-vertical-48 padding-horizontal-60 radius-20"
                                    style={{backgroundColor: '#1F2326'}}
                                >
                                <Game2Icon />
                                <select 
                                    className="transparent-bg stat-input font-size-18 white-bg text-black radius-5 top-16 padding-horizontal-60 padding-vertical-8"
                                    onChange={onOption2Change}
                                    value={option2}
                                >
                                    <option value="Game 1">Game 1</option>
                                    <option value="Game 2">Game 2</option>
                                </select>
                            </div> 
                        <p className="padding-8" style={{color:"#45C067"}}>능력치 증가 비율 5배</p>
                        </div>
                    </div>
                    <div className="">
                        <button 
                            onClick={()=>{}} 
                            className='gradient-bg padding-horizontal-40 padding-vertical-10 radius-10 height-48 top-48 text-black'>이동 가능한 아이템 </button>
                    </div>
                </div>
            </div>
            <div className="row  bottom-108">
                {
                    weapons.map((weapon, idx) => (
                        <div
                            id={idx}
                            key={idx}
                            className="col-4 top-16"
                        >
                            <NFTTeleport
                                name={weapon.name}
                                id={weapon.id}
                                img={weapon.image}
                                price={weapon.price}
                                buyWeapon={()=>{}}
                                onItemSelect={onItemSelect}
                            />
                        </div>
                    ))
                }

            </div>

            {dialog1 ? (
                <Modal show={dialog1}
                className="teleport-modal top-60">
                    <ModalBody className="max-width purchase-modal-bg centered nft-bg "
                    >
                        <div className='padding-horizontal-48 max-width'>
                            <div className="d-flex flex-row justify-content-around left-48" style={{overflow: 'none'}}> 
                                <div className="height-80 centered">
                                <button
                                    className="p1 text-black gradient-btn right-16 radius-10 height-48 centered padding-horizontal-48"
                                    onClick={()=>{}}
                                >
                                    Game 1
                                </button>
                                </div>
                                <div className='' style={{backgroundColor: '#2D2E36', height: 80, width: 1}}></div>
                                <div className="height-80 centered">
                                <button 
                                    className=" p1 text-black gradient-btn right-48 radius-10 height-48 centered padding-horizontal-48"
                                    onClick={()=>{}}
                                >
                                    Game 2
                                </button>
                                </div>
                            </div>

                            <div className='max-width bottom-48' style={{backgroundColor: '#2D2E36', height: 1}}></div>
                            
                            <div className='row'>
                                <div className='col-4'>
                                    <NFTSlider name={weapons[0].name} price={weapons[0].price} img={weapons[0].image} id={weapons[0].id}/>
                                </div>
                                <div className="col-4 centered">
                                    <Arrow />
                                </div>
                                <div className='col-4'>
                                    <NFTSlider name={weapons[1].name} price={weapons[1].price} img={weapons[1].image} id={weapons[1].id}/>
                                </div>
                            </div>
                            <div className="d-flex flex-row centered padding-vertical-48">
                                <button 
                                    onClick={()=>{setDialog2(true)}} 
                                    className='gradient-bg radius-20 padding-horizontal-16 padding-vertical-1 height-40 text-black'>외형 바꾸기</button>
                                <div className='gradient-bg radius-20 padding-horizontal-1 padding-vertical-1 link centered left-24' onClick={()=>{setDialog1(false)}}>
                                    <p className='black-bg-20  text-white centered padding-horizontal-16 height-38'>취소</p>
                                </div>
                            
                            </div>
                        </div>
                    </ModalBody>
                </Modal>
            ):null}

            {dialog2 ? (
                <Modal show={dialog2}  className="top-48 centered radius-16">
                    <Modal.Body className="purchase-modal-bg max-width radius-16">
                        <h2 className='text-white centered top-16'>Design Transform</h2>
                        <div className='max-width top-16 bottom-32' style={{backgroundColor: '#2D2E36', height: 1}}></div>
                        {/* <div className='centered padding-vertical-72 top-32 bottom-12'><p className='purchase-nft-body '>정말로 구매 하시겠습니까?</p></div> */}
                        <div className='centered d-flex flex-column'>
                            {/* <Confirm/> */}
                            <p className='purchase-nft-body top-8'>정말로 _____ 아이템을 <br/>Game1에서 Game 2로 이동하시겠습니까?</p>
                        </div>
                        
                        <div className='d-flex flex-row centered top-72 bottom-32'>
                            <button onClick={()=>{
                                setDialog2(false)
                                setDialog3(true)
                                }} className='gradient-bg padding-vertical-4 padding-horizontal-24 radius-20 height-40 text-black'>확인 </button>
                            <div className='gradient-bg radius-20 padding-horizontal-1 padding-vertical-1 link centered left-24' onClick={()=>{setDialog2(false)}}>
                                <p className='black-bg-20  text-white centered padding-horizontal-16 height-38'>취소</p>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            ): null}


            {dialog3 ? (
                <Modal show={dialog3}  className="top-48 centered radius-16">
                    <Modal.Body className="purchase-modal-bg max-width radius-16">
                        <h2 className='text-white centered top-16'>NFT Teleportation</h2>
                        <div className='max-width top-16 bottom-32' style={{backgroundColor: '#2D2E36', height: 1}}></div>
                        {/* <div className='centered padding-vertical-72 top-32 bottom-12'><p className='purchase-nft-body '>정말로 구매 하시겠습니까?</p></div> */}
                        <div className='centered d-flex flex-column'>
                            <Confirm/>
                            <p className='purchase-nft-body top-8'>NFT Item이 성공적으로 이동했습니다!</p>
                        </div>
                        
                        <div className='d-flex flex-row centered top-72 bottom-32'>
                            <button onClick={()=>{
                                setDialog1(false)
                                setDialog3(false)
                                }} className='gradient-bg padding-vertical-4 padding-horizontal-24 radius-20 height-40 text-black'>확인 </button>
                        </div>
                    </Modal.Body>
                </Modal>
            ): null}
        </div>
    )
}

export default Teleportation;