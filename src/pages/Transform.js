import React, {useState, useEffect} from "react";
import {useNavigate} from 'react-router-dom';
import {Image} from 'react-bootstrap';
import weapon1 from '../assets/images/black_weapon.png';
import weapon2 from '../assets/images/red_weapon.png';
import weapon3 from '../assets/images/white_weapon.png';
import weapon4 from '../assets/images/space_weapon.png';
import weapon5 from '../assets/images/eye_weapon.png';
import weapon6 from '../assets/images/kal_weapon.png';
import {ReactComponent as Exchange} from '../assets/images/svg/transform.svg'
import {ReactComponent as Confirm} from '../assets/images/svg/confirmed.svg'
import { Modal } from "react-bootstrap";
import axios from "axios";
import nft from "../contracts/nft";
import { useRecoilValue } from "recoil";
import { accountAtom } from "../atoms/state";
const weapons = [
    {name: "BLACK RIFFLE", id: 1, image: weapon1, price: 130},
    {name: "RED RIFFLE", id: 2, image: weapon2, price: 123},
    {name: "WHITE RIFFLE", id: 3, image: weapon5, price: 125},
    {name: "SPACE GUN", id: 4, image: weapon3, price: 430},
    {name: "EYE GUN", id: 5, image: weapon4, price: 432},
    {name: "BLACK KAL", id: 6, image: weapon6, price: 230}
]

const menus = [
    {id: 1, name: 'Game1 Items'},
    {id: 2, name: 'Game2 Items'},
    // {id: 3, name: 'NFT Storage'}
];
const storageMenu = {id: 3, name: 'NFT Storage'}

const Transform = () => {
    const navigate = useNavigate()
    const accountAddress = useRecoilValue(accountAtom)
    const testAccount = "0x658f11bd6ed7a0cfeb426d18ae9b066619ddbecd"
    const [selectedMenu, setSelectedMenu] = useState(1)
    const [step, setStep] = useState(1)
    const [transform, setTransformConfirm] = useState(false)
    const [confirm, setConfirm] = useState(false)
    const [game1Items, setGame1Items] = useState([])
    const [game2Items, setGame2Items] = useState([])
    const [storageItems, setStorageItems] = useState([])



    //get Game1 items
    //fetch nft items
    useEffect(()=>{
        const fetchGameItems = (game)=>{
            console.log('Loading game items')
            var itemList = []
            axios.get('http://localhost:3030/getItemInfo', {
                params: {
                    public_key: testAccount,
                    game:game
                }
            }).then((result)=>{
                const data = result.data
                console.log((result));
                var index = 1;
                data.forEach((item)=>{
                    const tokenId = item.token_id

                    nft.methods.getUri(tokenId).call().then(result=>{

                        fetch(result)
                            .then(response => response.json())
                            .then(json => {
                                nft.methods.getNFTValue(tokenId).call().then(value=>{
                                    const nftItem ={name: item.name ? item.name :'Undefined', id: index, image: json.url, price: value}
                                    index++;
                                    itemList.push(nftItem)
                                    if(game==='game1')
                                        setGame1Items([...itemList],nftItem)
                                    else
                                        setGame1Items([...itemList], nftItem)
                                })
                            }).catch(er=>{
                                console.log("ERROR==>"+er)
                            })
                    })
                    index++;
                })
                // setItems(itemList)
            }).catch(e=>{
                // console.log(e);
            })
        }
        fetchGameItems('game1')
        fetchGameItems('game2')
    },[])

    //Get storage items
    useEffect(()=>{
        var itemList = []
            axios.get('http://localhost:3030/getImgInfo', {
                params: {
                    public_key: testAccount,
                }
            }).then((result)=>{

                const data = result.data
                console.log((result));
                var index = 1;
                data.forEach((item)=>{
                    const tokenId = item.token_id

                    nft.methods.getUri(tokenId).call().then(result=>{

                        fetch(result)
                            .then(response => response.json())
                            .then(json => {
                                nft.methods.getNFTValue(tokenId).call().then(value=>{
                                    const nftItem ={name: item.name ? item.name :'Undefined', id: index, image: json.url, price: value}
                                    index++;
                                    itemList.push(nftItem)
                                    setStorageItems([...itemList],nftItem)
                                })
                            }).catch(er=>{
                                console.log("ERROR==>"+er)
                            })
                    })
                    index++;
                })
                // setItems(itemList)
            }).catch(e=>{
                console.log(e);
            })
    },[])

    const NFT = ({id, name, img, price})=>{
        const navigate = useNavigate()
        return (
            <div className='padding-top padding-horizontal-48' >
                <div className='weapon-box-bg'>
                <div className='nft-square-bg padding-horizontal-16 padding-vertical-8 16 d-flex flex-column justify-content-between'>
                    <p className='nft-name bottom-16'>{name}</p>
                    <div className="d-flex flex-row justify-content-between">
                        <p className="p2">Riffle</p>
                        <p className="p1">Legendary</p>
                    </div>
                </div>
                    <div className='centered weapon-bg top-8 right-8 left-8'>
                        <div className='col-12 centered '>
                            <div className='col-12 top-20 bottom-20 img-fluid centered padding-16'>
                                <Image src={img} alt="NFT" fluid={true} className='img-fluid'/>
                            </div>
                        </div>
                    </div>
                    <div className='d-flex flex-row centered nft-bottom-bg'>
                        <p className='price-text centered padding-vertical-16'>{price} CHURR</p>
                    </div>
                </div>
            </div>
        )
    }

    const onMenuChange = (menu) => {
        const {id, name} = menu;
        setSelectedMenu(id)
    }

    return (
        <div className="col-12 top-108">
            <div>
                <div className='col-12 top-60'>
                    <h3 className='heading-white-poppins centered'>Design Transform</h3>
                    <p className='p2'>프타의 지팡이는 아이템 모양을 변환시키는 <br />신비한 창조의 지팡이 입니다. <br/>자신이 가지고 있는 게임 아이템을 원하는 외형으로 바꿔서 플레이하세요</p>
                </div>
            </div>
            {
                (game1Items.length>0 || game2Items.length>0) && storageItems.length>0 ?
            (<div>
                {step===1 ? 
                <div className='nft-bg padding-24 padding-horizontal-48 top-60'>
                    <div className="d-flex flex-row justify-content-between" style={{overflow: 'none'}}> 
                            <div className="d-flex flex-row top-16 bottom-16">
                                {
                                    menus.map((menu, idx)=>(
                                        <button 
                                            key={idx}
                                            id={idx} 
                                            className={menu.id==selectedMenu ? "p1 text-black gradient-btn right-16 radius-10 height-48 centered padding-horizontal-48": " grey-bg p1 text-white right-16 radius-10 height-48 centered padding-horizontal-48"}
                                            onClick={()=>onMenuChange(menu)}
                                        >
                                            {menu.name}
                                        </button>
                                    ))
                                }
                            </div>

                            <button 
                                className="top-16 grey-bg p1 text-white right-48 radius-10 height-48 centered padding-horizontal-48"
                                onClick={()=>{console.log('Storage NFT')}}
                            >
                                {storageMenu.name}
                            </button>
                    </div>
                    
                    <div className='row'>
                        <div className='col-4 d-flex flex-column centered'>
                            <NFT name={weapons[0].name} price={weapons[0].price} img={weapons[0].image} id={weapons[0].id}/>
                            <select className="transparent-bg stat-input font-size-18 white-bg text-black top-16 padding-horozontal-24">
                                {
                                    game1Items.map((item, idx)=>(
                                        <option 
                                        id={item.id}
                                        key={item.id}>{item.name}</option>
                                    ))
                                }
                                {/* <option>BLACK RIFFLE_GAME1 NFT</option>
                                <option>BLACK RIFFLE_GAME1 NFT</option>
                                <option>BLACK RIFFLE_GAME1 NFT</option>
                                <option>BLACK RIFFLE_GAME1 NFT</option> */}
                            </select>
                        </div>
                        <div className="col-4 centered">
                            <Exchange />
                        </div>
                        <div className='col-4 d-flex flex-column centered'>
                            <NFT name={weapons[1].name} price={weapons[1].price} img={weapons[1].image} id={weapons[1].id}/>
                            <select className="transparent-bg stat-input font-size-18 white-bg text-black top-16">
                                <option>BLACK RIFFLE_GAME1 NFT</option>
                                <option>BLACK RIFFLE_GAME1 NFT</option>
                                <option>BLACK RIFFLE_GAME1 NFT</option>
                                <option>BLACK RIFFLE_GAME1 NFT</option>
                            </select>
                        </div>
                    </div>
                    <div className="centered">
                        <button 
                            onClick={()=>{setStep(2)}} 
                            className='gradient-bg padding-horizontal-40 padding-vertical-10 radius-5 height-48 top-48 text-black'>변환하기</button>
                    </div>
                </div>: null}
            {step===2 ?(
                <div className='nft-bg padding-horizontal-48 top-60'>
                    <div className="d-flex flex-row justify-content-between left-48" style={{overflow: 'none'}}> 
                        <div className="height-80 centered">
                        <button
                            className="p1 text-black gradient-btn right-16 radius-10 height-48 centered padding-horizontal-48"
                            onClick={()=>{}}
                        >
                            {selectedMenu == 1 ? menus[0].name: menus[1].name}
                        </button>
                        </div>
                        <div className='' style={{backgroundColor: '#2D2E36', height: 80, width: 1}}></div>
                        <div className="height-80 centered">
                        <button 
                            className=" p1 text-black gradient-btn right-48 radius-10 height-48 centered padding-horizontal-48"
                            onClick={()=>{}}
                        >
                            {storageMenu.name}
                        </button>
                        </div>
                    </div>

                    <div className='max-width bottom-48' style={{backgroundColor: '#2D2E36', height: 1}}></div>
                    
                    <div className='row'>
                        <div className='col-4 d-flex flex-column centered'>
                            <NFT name={weapons[0].name} price={weapons[0].price} img={weapons[0].image} id={weapons[0].id}/>
                        </div>
                        <div className="col-4 centered">
                            <Exchange />
                        </div>
                        <div className='col-4 d-flex flex-column centered'>
                            <NFT name={weapons[1].name} price={weapons[1].price} img={weapons[1].image} id={weapons[1].id}/>
                        </div>
                    </div>
                    <div className="d-flex flex-row centered padding-vertical-48">
                        <button 
                            onClick={()=>{setTransformConfirm(true)}} 
                            className='gradient-bg radius-20 padding-horizontal-16 padding-vertical-1 height-40 text-black'>외형 바꾸기</button>
                        <div className='gradient-bg radius-20 padding-horizontal-1 padding-vertical-1 link centered left-24' onClick={()=>{setStep(1)}}>
                            <p className='black-bg-20  text-white centered padding-horizontal-16 height-38'>취소</p>
                        </div>
                    
                    </div>
                </div>
            ): null}
            </div>)
            : <div className='nft-bg padding-horizontal-48 top-60 padding-vertical-60'>
                <p className="text-white d-flex centered font-size-48">No Items to transform</p>
            </div>
            }

                <Modal show={transform}  className="top-48 centered radius-16">
                    <Modal.Body className="purchase-modal-bg max-width radius-16">
                        <h2 className='text-white centered top-16'>Design Transform</h2>
                        <div className='max-width top-16 bottom-32' style={{backgroundColor: '#2D2E36', height: 1}}></div>
                        {/* <div className='centered padding-vertical-72 top-32 bottom-12'><p className='purchase-nft-body '>정말로 구매 하시겠습니까?</p></div> */}
                        <div className='centered d-flex flex-column'>
                            {/* <Confirm/> */}
                            <p className='purchase-nft-body top-8'>정말로 _____ 아이템의 <br /> 외형을 바꾸시겠습니까?</p>
                        </div>
                        
                        <div className='d-flex flex-row centered top-72 bottom-32'>
                            <button onClick={()=>{
                                setTransformConfirm(false)
                                setConfirm(true)
                                }} className='gradient-bg padding-vertical-4 padding-horizontal-24 radius-20 height-40 text-black'>확인 </button>
                            <div className='gradient-bg radius-20 padding-horizontal-1 padding-vertical-1 link centered left-24' onClick={()=>{setTransformConfirm(false)}}>
                                <p className='black-bg-20  text-white centered padding-horizontal-16 height-38'>취소</p>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>



                <Modal show={confirm}  className="top-48 centered radius-16">
                    <Modal.Body className="purchase-modal-bg max-width radius-16">
                        <h2 className='text-white centered top-16'>Design Transfrom</h2>
                        <div className='max-width top-16 bottom-32' style={{backgroundColor: '#2D2E36', height: 1}}></div>
                        {/* <div className='centered padding-vertical-72 top-32 bottom-12'><p className='purchase-nft-body '>정말로 구매 하시겠습니까?</p></div> */}
                        <div className='centered d-flex flex-column'>
                            <Confirm/>
                            <p className='purchase-nft-body top-8'>NFT Item의 외형이 성공적으로 바뀌었습니다!</p>
                        </div>
                        
                        <div className='d-flex flex-row centered top-72 bottom-32'>
                            <button onClick={()=>{
                                setConfirm(false)
                                setStep(1)
                                }} className='gradient-bg padding-vertical-4 padding-horizontal-24 radius-20 height-40 text-black'>확인 </button>
                        </div>
                    </Modal.Body>
                </Modal>

        </div>
    )
}

export default Transform;