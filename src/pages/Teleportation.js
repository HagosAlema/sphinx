import React, { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom';
import Countdown from "react-countdown";

import {ReactComponent as Game1} from '../assets/images/game1.svg';
import {ReactComponent as Game2} from '../assets/images/game2.svg';
import {ReactComponent as Game1Icon} from '../assets/images/svg/game1_icon.svg';
import {ReactComponent as Game2Icon} from '../assets/images/svg/game2_icon.svg';
import {ReactComponent as Arrow} from '../assets/images/arrow_forward.svg'
import {ReactComponent as Confirm} from '../assets/images/svg/confirmed.svg'

import NFTSlider from "../components/NFTSlider";
import { Modal, ModalBody } from "react-bootstrap";
import NFTTeleport from "../components/NFTTeleport";

import axios from 'axios';
import nft from '../contracts/nft';
import ratio from '../contracts/ratio';
import { accountAtom } from '../atoms/state';
import { useRecoilValue } from 'recoil';
import { CommentsDisabledOutlined } from "@mui/icons-material";

const options = ['game1', 'game2']

const Teleportation = () => {
    const navigate = useNavigate()
    const [dialog1, setDialog1] = useState(false)
    const [dialog2, setDialog2] = useState(false)
    const [dialog3, setDialog3] = useState(false)
    const [option1, setOption1] = useState('game1')
    const [option2, setOption2] = useState('game2')
    
    const accountAddress = useRecoilValue(accountAtom)
    const testAccount = "0x658f11bd6ed7a0cfeb426d18ae9b066619ddbecd"
    const [weapons, setWeapons] = useState([])
    const [ratio_game, setRatio] = useState(0)
    const [changeItem, setChangeItem]=useState()

    useEffect(()=> {
        // const fetchGameItems = async (game)=>{
            console.log('Loading game items', option1, option2)
            setWeapons([]);
            var itemList = []
            axios.get('http://localhost:3030/getItemInfo', {
                params: {
                    public_key: testAccount,
                    // public_key:accountAddress,
                    game: option1
                }
            }).then((result)=>{
                const data = result.data
                console.log((result.data));
                var index = 1;
                data.forEach((item)=>{
                    const tokenId = item.img_token_id
                    const statId = item.stat_token_id
                    nft.methods.getUri(tokenId).call().then(res=>{
                        fetch(res)
                            .then(response => response.json())
                            .then(json => {
                                nft.methods.getNFTValue(tokenId).call().then(value=>{
                                    //get stat info
                                    nft.methods.getUri(statId).call().then((statUri)=>{
                                        fetch(statUri)
                                            .then(statData => statData.json())
                                            .then(statJson=> {

                                                    fetch(statJson.url)
                                                    .then(statUrl=>statUrl.json())
                                                    .then(itemPower=>{

                                                        const nftItem ={name: item.name ? item.name :'Undefined', id: tokenId, image: json.url, price: value, power: itemPower, stat_Id: statId, tokenId:tokenId}
                                                        index++;
                                                        itemList.push(nftItem)
                                                        setWeapons([...itemList],nftItem)
                                                    })
                                                
                                            })
                                        
                                    })
                                    
                                })
                            }).catch(er=>{
                                console.log("ERROR==>"+er)
                            })
                    })
                })
                // setItems(itemList)
            }).catch(e=>{
                // console.log(e);
            })

            //doing ratio
            ratio.methods.getratio(option1,option2).call().then((res)=>{
               let ratio_temp = res/100;
               setRatio(ratio_temp)
            })
                
        // }
        
    },[option1])

    const doTeleportation = (event) => {
        console.log("doteleportation start",changeItem, option1, option2 ,changeItem.id)
        axios.get('http://localhost:3030/changeItemGame', {
            params:{
                img_token_id: changeItem.id,
                newGame: option2,
                oldGame: option1,
                modified_stat: changeItem.power*ratio_game,
            }
        }).then((result)=>{
            console.log("changeitem",result)
            setDialog2(false)
            setDialog3(true)
        }).catch((e)=>{
            // setShowSpinner(false)
        })
        
      }

    const renderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
          // Render a completed state
          return <p className="hour-text">0</p>
        } else {
          // Render a countdown
          return <p className="hour-text">{hours}:{minutes}:{seconds}</p>;
        }
      };

      const onItemSelect = (id, name, price, image, power) => {
        // const ChangeItem={power: power, id: id}
        const ChangeItem={name:name, img:image, id:id, power:power, hidePrice:true}
        setChangeItem(ChangeItem)


        console.log("select onitemselect ",id, name, power);
        setDialog1(true)
      }

      const onOption1Change = (event) => {
        //   console.log(event.target.value);
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
                                    <option value="game1">game1</option>
                                    <option value="game2">game2</option>
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
                                    <option value="game1">game1</option>
                                    <option value="game2">game2</option>
                                </select>
                            </div> 
                        <p className="padding-8" style={{color:"#45C067"}}>능력치 증가 비율 {ratio_game}배</p>
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
                                power={weapon.power}
                                hidePrice={true}
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
                                    game1
                                </button>
                                </div>
                                <div className='' style={{backgroundColor: '#2D2E36', height: 80, width: 1}}></div>
                                <div className="height-80 centered">
                                <button 
                                    className=" p1 text-black gradient-btn right-48 radius-10 height-48 centered padding-horizontal-48"
                                    onClick={()=>{}}
                                >
                                    game2
                                </button>
                                </div>
                            </div>

                            <div className='max-width bottom-48' style={{backgroundColor: '#2D2E36', height: 1}}></div>
                            
                            <div className='row'>
                                <div className='col-4'>
                                    <NFTSlider name={changeItem.name} price={changeItem.price} img={changeItem.image} id={weapons[0].id} power={changeItem.power} hidePrice={true}/>
                                </div>
                                <div className="col-4 centered">
                                    <Arrow />
                                </div>
                                <div className='col-4'>
                                    <NFTSlider name={changeItem.name} price={changeItem.price} img={changeItem.image} id={changeItem.id} power={changeItem.power*ratio_game} hidePrice={true}/>
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
                        <h2 className='text-white centered top-16'>Tutankhamun's teleportation</h2>
                        <div className='max-width top-16 bottom-32' style={{backgroundColor: '#2D2E36', height: 1}}></div>
                        {/* <div className='centered padding-vertical-72 top-32 bottom-12'><p className='purchase-nft-body '>정말로 구매 하시겠습니까?</p></div> */}
                        <div className='centered d-flex flex-column'>
                            {/* <Confirm/> */}
                            <p className='purchase-nft-body top-8'>정말로 {changeItem.name}을 <br/>{option1}에서 {option2}로 이동하시겠습니까?</p>
                        </div>
                        
                        <div className='d-flex flex-row centered top-72 bottom-32'>
                            <button onClick={()=>{
                                doTeleportation()
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