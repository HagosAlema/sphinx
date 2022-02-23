import React, {useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom'
// import {useNavigate} from 'react-router-dom';
import {ButtonGroup, ToggleButton, FormControl, FormSelect, Modal, Image} from 'react-bootstrap';
import {Slider, TextField} from '@mui/material'

import NFT from '../components/NFT';
import weapon1 from '../assets/images/black_weapon.png';
import weapon2 from '../assets/images/red_weapon.png';
import weapon3 from '../assets/images/white_weapon.png';
import weapon4 from '../assets/images/space_weapon.png';
import weapon5 from '../assets/images/eye_weapon.png';
import weapon6 from '../assets/images/kal_weapon.png';
import normal from '../assets/images/normal.png'
import epic from '../assets/images/epic.png'
import legendary from '../assets/images/legendary.png'
import rare from '../assets/images/rare.png'
import {ReactComponent as Search} from '../assets/images/svg/search.svg'
import {ReactComponent as Expand} from '../assets/images/svg/expand.svg'
import {ReactComponent as Collapse} from '../assets/images/svg/shrink.svg'
import {ReactComponent as Confirm} from '../assets/images/svg/confirmed.svg'
import {ReactComponent as UploadIcon} from '../assets/images/svg/upload.svg'
import { borderColor } from '@mui/system';

import web3 from '../web3';
import axios from 'axios';

const menus = [
    { name: 'Game-Art', value: '1' },
    { name: 'Game-Item', value: '2' },
    { name: 'Screenshot', value: '3' },
    { name: 'Game-Character', value: '4' }
];
const weapons = [
    {name: "BLACK RIFFLE", id: 1, image: weapon1, price: 130},
    {name: "RED RIFFLE", id: 2, image: weapon2, price: 123},
    {name: "WHITE RIFFLE", id: 3, image: weapon5, price: 125},
    {name: "SPACE GUN", id: 4, image: weapon3, price: 430},
    {name: "EYE GUN", id: 5, image: weapon4, price: 432},
    {name: "BLACK KAL", id: 6, image: weapon6, price: 230}
]
const Trade = () => {


    web3.eth.getAccounts().then(console.log)
    const hiddenFileInput = useRef(null)
    const navigate = useNavigate()
    // const [checked, setChecked] = useState(false);
    const [radioValue, setRadioValue] = useState('1');
    const [sliderValue, setSliderValue] = useState([1500, 90000])
    const [weaponExpanded, setWeaponExpanded] = useState(false)
    const [clothesExpanded, setClothesExpanded] = useState(false)
    const [hairExpanded, setHairExpanded] = useState(false)
    const [eyesExpanded, setEyesExpanded] = useState(false)
    const [hatExpanded, setHatExpanded] = useState(false)
    const [mouthExpanded, setMouthExpanded] = useState(false)
    const [nameExpanded, setNameExpanded] = useState(false)
    const [skinsExpanded, setSkinsExpanded] = useState(false)
    const [show, setShow] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)
    const [nftId, setNftId]= useState(0)
    const [nftName, setNftName] = useState('')
    const [nftPrice, setNftPrice] = useState(0)
    const [nftImage, setNftImage] = useState(null)
    const [uploadDialog, setUploadDialog] = useState(false)
    const [localImage, setLocalImage] = useState(null)
    const [itemName, setItemName]=useState('')
    const [itemType, setItemType] = useState('')
    const [itemPrice, setItemPrice] = useState(0)
    const [itemImage, setItemImage] = useState(null)
    const [imageBuff, setImageBuffer] = useState(null)

    const handleSliderChange = (event, newValue) => {
        setSliderValue(newValue)
    }

    const sliderValueText = (value) => {
        return `$${value}`
    }

    const setBuyWeapon = (id, name, price, image) => {
        console.log(id,name,price);
        setNftId(id)
        setNftImage(image)
        setNftName(name)
        setNftPrice(price)
        setShow(true)
    }

    const purchase = () => {
        //TODO purchase action here
        setShow(false)
        setShowConfirm(true)
    }

    const NFT1 = ({id, name, img, price})=>{
        return (
            <div className='padding-horizontal-48 top-16' >
                <div className='weapon-box-bg'>
                    <div className='nft-top-bg padding-8 height-124'>
                        <p className='nft-name'>{nftName}</p>
                    </div>
                    <div className='centered weapon-bg top-8 right-8 left-8'>
                        <div className='col-12 centered '>
                            <div className='col-12 top-10 bottom-10 img-fluid centered padding-16'>
                                <Image src={nftImage} alt="NFT" fluid={true} className='img-fluid' responsive/>
                            </div>
                        </div>
                    </div>
                    <div className='nft-bottom-bg height-82'>
                        <p className='price-text centered'>{nftPrice} CHURR</p>
                    </div>
                </div>
            </div>
        )
    }

    const NFT3 = ({id, name, img, price})=>{
        return (
            <div className='padding-horizontal-48 top-16' >
                <div className='weapon-box-bg'>
                    <div className='nft-top-bg padding-8 height-124'>
                        <p className='nft-name'>{itemName}</p>
                    </div>
                    <div className='centered weapon-bg top-8 right-8 left-8'>
                        <div className='col-12 centered '>
                            <div className='col-12 top-10 bottom-10 img-fluid centered padding-16'>
                                <Image src={itemImage} alt="NFT" fluid={true} className='img-fluid' responsive/>
                            </div>
                        </div>
                    </div>
                    <div className='nft-bottom-bg height-82'>
                        <p className='price-text centered'>{itemPrice} CHURR</p>
                    </div>
                </div>
            </div>
        )
    }

    const NFT2 = ()=>{
        return (
            <div className='' >
                <div className='weapon-box-bg'>
                    <div className='nft-top-bg padding-8 height-138'>
                        <p className='nft-name'>No Name</p>
                    </div>
                    <div className='centered weapon-bg top-8 right-8 left-8'>
                        <div className='col-12 centered '>
                            <div className='col-12 img-fluid centered'>
                                {/* <Image src={nftImage} alt="NFT" fluid={true} className='img-fluid' responsive/> */}
                                <Image src={URL.createObjectURL(localImage)} 
                                    className="padding-horizontal-48" 
                                    style={{width: '100%'}}/>
                            </div>
                        </div>
                    </div>
                    <div className='height-60 max-width top-16'>
                        <p className='price-text size-10 centered' style={{fontSize: 12}}>가격이 아직 설정되지 않았습니다</p>
                    </div>
                </div>
            </div>
        )
    }

    const upload = () => {
        setUploadDialog(true)
    }


    const handleUploadClick = (event) => {
        hiddenFileInput.current.click()
    }

    const [previewImageDialog, setPreviewImageDialog] = useState(false)
    const [statDialog, setStatDialog] = useState(false)
    const [weaponPreview, setWeaponPreview] = useState(false)
    const [uploadConfirm, setUploadConfirm] = useState(false)

    const onFileChange = (event) => {
        const file = event.target.files[0]
        const reader = new window.FileReader()
        reader.readAsArrayBuffer(file)
        reader.onloadend = () => {
            console.log('Buffer Data:', Buffer(reader.result));
            console.log(file)
            const buffer = Buffer(reader.result)
            setImageBuffer(Buffer(buffer))
            const formData = new FormData()
            const stat = {
                type: 'Knife',
                price: 230,
                name: 'Black Knife',
                img: 'img'
            }
            formData.append("img",buffer)
            formData.append("game", "game1")
            // formData.append("stat", stat)

            axios.post('http://localhost:3030/mintGameNFT',formData, {headers:{ 'Content-Type': 'multipart/form-data' }}).then(result=>{
                console.log(result)
            }).catch(e=>{
                console.log(e)
            })
        }
        setLocalImage(file)
        setItemImage(URL.createObjectURL(file))
        setPreviewImageDialog(true)
        setUploadDialog(false)
        console.log(file)
    }

    const handleTypeChange = (event) => {
        setItemType(event.target.value)
        console.log(event.target.value);
    }

    const handleNameChange = (event) => {
        setItemName(event.target.value)
        console.log(event.target.value)
    }

    const handleItemPrice = (event) => {
        setItemPrice(event.target.value)
        console.log(event.target.value)
    }
    
    return(
        <div className='row top-108'>
            {
                uploadDialog ? (
                    <Modal show={uploadDialog} className="top-48 centered radius-16" >
                        <Modal.Body
                            className="purchase-modal-bg max-width radius-16" 
                            style={{overflowY: 'scroll'}}
                        >
                            <h2 className='text-white centered top-16'>Upload NFT</h2>
                            <div className='max-width top-8' style={{backgroundColor: '#2D2E36', height: 1}}></div>
                            {/* <div className='centered padding-vertical-16 bottom-16'><p className='purchase-nft-body '>정말로 구매 하시겠습니까?</p></div> */}
                            {/* <NFT1 /> */}
                            <div 
                                className="padding-horizontal-48 padding-vertical-24">
                                <div className="d-flex flex-column centered padding-vertical-24 radius-10"
                                    style={{borderStyle:'dotted', borderColor: '#454545', borderWidth: 1, width: 'auto'}}>
                                    <UploadIcon />
                                    <p className="p1 text-white">파일을 드래그나 드롭하기</p>
                                    <p className="p1 text-white font-size-14 top-8">or</p>
                                    <button className="p1 text-black padding-vertical-16 padding-horizontal-48 radius-10 top-24"
                                        style={{backgroundColor: '#FFA15C'}}
                                        onClick={handleUploadClick}
                                    >
                                    파일 고르기
                                    </button>
                                    <input 
                                        ref={hiddenFileInput} type="file" style={{display: 'none'}} 
                                        onChange={onFileChange}
                                    />
                                    {/* <Image src={URL.createObjectURL(localImage)} style={{height: 'auto', width: 'auto'}}/> */}
                                </div>
                            </div>
                            <div className='d-flex flex-row centered top-16 bottom-16'>
                                <button onClick={()=>setUploadDialog(false)} className='gradient-bg padding-vertical-4 padding-horizontal-24 radius-20 height-40 text-black'>올리기 </button>
                                <div className='gradient-bg radius-20 padding-horizontal-1 padding-vertical-1 link centered left-24' onClick={()=>{setUploadDialog(false)}}>
                                    {/* <div className='black-bg-20  text-white centered padding-horizontal-16 height-46'> */}
                                        <p className='black-bg-20  text-white centered padding-horizontal-16 height-38'>취소</p>
                                    {/* </div> */}
                                </div>
                            </div>
                        </Modal.Body>

                    </Modal>
                ): null
            }
            {previewImageDialog ? (
                <Modal show={previewImageDialog}>
                <Modal.Body
                            className="purchase-modal-bg max-width radius-16" 
                            style={{overflowY: 'scroll'}}
                        >
                            <h2 className='text-white centered top-16'>Upload NFT</h2>
                            <div className='max-width top-8' style={{backgroundColor: '#2D2E36', height: 1}}></div>
                            <div 
                                className="padding-horizontal-48 padding-vertical-24">
                                <div className="d-flex flex-column centered"
                                    >
                                    <NFT2 />
                                </div>
                            </div>
                            <div className='d-flex flex-row centered top-16 bottom-16'>
                                <button onClick={()=>{
                                    setPreviewImageDialog(false); 
                                    setStatDialog(true);
                                    }} 
                                    className='gradient-bg padding-vertical-4 padding-horizontal-24 radius-20 height-40 text-black'>설정하기 </button>
                                <div className='gradient-bg radius-20 padding-horizontal-1 padding-vertical-1 link centered left-24' onClick={()=>{setPreviewImageDialog(false)}}>
                                    {/* <div className='black-bg-20  text-white centered padding-horizontal-16 height-46'> */}
                                        <p className='black-bg-20  text-white centered padding-horizontal-16 height-38'>취소</p>
                                    {/* </div> */}
                                </div>
                            </div>
                        </Modal.Body>
                </Modal>
            ): null}
            {statDialog ? (
                <Modal show={statDialog}>
                    <Modal.Body
                        className="purchase-modal-bg max-width radius-16" 
                        style={{overflowY: 'scroll'}}
                    >
                        <h2 className='text-white centered top-16'>Upload NFT</h2>
                        <div className='max-width top-8' style={{backgroundColor: '#2D2E36', height: 1}}></div>
                        <div className="d-flex flex-column padding-horizontal-48 padding-vertical-24 text-white">
                            <p>아이템 이름</p>
                            <input 
                            onChange={handleNameChange}
                            type="text" placeholder="아이템 이름" className="stat-input height-32 top-4 font-size-18" style={{borderColor: '#fff'}}/>
                            <p className="top-16">아이템 종류</p>
                            {/* <input type="text" placeholder="아이템 이름" className="stat-input height-32 top-4 font-size-18" style={{borderColor: '#fff', borderWidth: 2}}/> */}
                            <select value={itemType}
                            onChange={handleTypeChange}
                            className="transparent-bg stat-input font-size-18">
                                <option selected value="Knife">Knife</option>
                                <option value="Gun">Gun</option>
                                <option value="Hair">Hair</option>
                                <option value="Cloth">Cloth</option>
                            </select>
                            <div className="d-flex flex-row justify-content-between stat-input top-16">
                                <input 
                                onChange={handleItemPrice}
                                type="number" placeholder="" className="transparent-bg stat-input" style={{border: 'none', width: "60%"}}/>
                                <p >CHURR</p>
                            </div>

                            <p className="text-white font-size-12 top-16">Rarity</p>
                            <p className="font-size-12" style={{color: '#F80000', opacity: .7}}>지금은 LEGENDARY만 설정할 수 있습니다!</p>
                            <div className="d-flex flex-column top-16">
                                <div className="d-flex flex-row centered">
                                    <Image src={normal} style={{height:60}} className="right-8"/>
                                    <Image src={rare} style={{height:60}} className="left-8"/>
                                </div>
                                <div className="d-flex flex-row centered top-8">
                                    <Image src={epic} style={{height:60}} className="right-8"/>
                                    <Image src={legendary} style={{height:60}} className="left-8"/>
                                </div>
                            </div>
                        </div>
                        <div className='d-flex flex-row centered top-16 bottom-16'>
                            <button onClick={()=>{
                                setStatDialog(false)
                                setWeaponPreview(true)
                            }} className='gradient-bg padding-vertical-4 padding-horizontal-24 radius-20 height-40 text-black'>올리기</button>
                            <div className='gradient-bg radius-20 padding-horizontal-1 padding-vertical-1 link centered left-24' onClick={()=>{setStatDialog(false)}}>
                                {/* <div className='black-bg-20  text-white centered padding-horizontal-16 height-46'> */}
                                    <p className='black-bg-20  text-white centered padding-horizontal-16 height-38'>취소</p>
                                {/* </div> */}
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            ) : null
            }

            {weaponPreview ? (
                <Modal show={weaponPreview}  className="top-48 centered radius-16" style={{overflowY: 'scroll'}}>
                    <Modal.Body className="purchase-modal-bg max-width radius-16" style={{overflowY: 'scroll'}}>
                        <h2 className='text-white centered top-16'>Upload NFT</h2>
                        <div className='max-width top-8' style={{backgroundColor: '#2D2E36', height: 1}}></div>
                        <div className='centered padding-vertical-16 bottom-16'><p className='purchase-nft-body '>해당 내용으로 올리시겠습니까?</p></div>
                        <NFT3/>
                        <div className='d-flex flex-row centered top-16 bottom-16'>
                            <button onClick={()=>{
                                setWeaponPreview(false)
                                setUploadConfirm(true)
                            }}
                            className='gradient-bg padding-vertical-4 padding-horizontal-24 radius-20 height-40 text-black'>올리기 </button>
                            <div className='gradient-bg radius-20 padding-horizontal-1 padding-vertical-1 link centered left-24' onClick={()=>{setWeaponPreview(false)}}>
                                {/* <div className='black-bg-20  text-white centered padding-horizontal-16 height-46'> */}
                                    <p className='black-bg-20  text-white centered padding-horizontal-16 height-38'>취소</p>
                                {/* </div> */}
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            ): null}


            {uploadConfirm ? (
                <Modal show={uploadConfirm}  className="top-48 centered radius-16">
                    <Modal.Body className="purchase-modal-bg max-width radius-16">
                        <h2 className='text-white centered top-16'>Upload NFT</h2>
                        <div className='max-width top-16 bottom-32' style={{backgroundColor: '#2D2E36', height: 1}}></div>
                        {/* <div className='centered padding-vertical-72 top-32 bottom-12'><p className='purchase-nft-body '>정말로 구매 하시겠습니까?</p></div> */}
                        <div className='centered d-flex flex-column'>
                            <Confirm/>
                            <p className='purchase-nft-body top-8'>성공적으로 지갑에 저장되었습니다!</p>
                        </div>
                        
                        <div className='d-flex flex-row centered top-72 bottom-32'>
                            <button onClick={()=>{setUploadConfirm(false)}} className='gradient-bg padding-vertical-4 padding-horizontal-24 radius-20 height-40 text-black'>확인 </button>
                        </div>
                    </Modal.Body>
                </Modal>
            ): null}

            {show ? (
                <Modal show={show}  className="top-48 centered radius-16" style={{overflowY: 'scroll'}}>
                    <Modal.Body className="purchase-modal-bg max-width radius-16" style={{overflowY: 'scroll'}}>
                        <h2 className='text-white centered top-16'>NFT Trade</h2>
                        <div className='max-width top-8' style={{backgroundColor: '#2D2E36', height: 1}}></div>
                        <div className='centered padding-vertical-16 bottom-16'><p className='purchase-nft-body '>정말로 구매 하시겠습니까?</p></div>
                        <NFT1/>
                        <div className='d-flex flex-row centered top-16 bottom-16'>
                            <button onClick={()=>{purchase()}} className='gradient-bg padding-vertical-4 padding-horizontal-24 radius-20 height-40 text-black'>구매 하기 </button>
                            <div className='gradient-bg radius-20 padding-horizontal-1 padding-vertical-1 link centered left-24' onClick={()=>{setShow(false)}}>
                                {/* <div className='black-bg-20  text-white centered padding-horizontal-16 height-46'> */}
                                    <p className='black-bg-20  text-white centered padding-horizontal-16 height-38'>취소</p>
                                {/* </div> */}
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            ): null}

            {showConfirm ? (
                <Modal show={showConfirm}  className="top-48 centered radius-16">
                    <Modal.Body className="purchase-modal-bg max-width radius-16">
                        <h2 className='text-white centered top-16'>NFT Trade</h2>
                        <div className='max-width top-16 bottom-32' style={{backgroundColor: '#2D2E36', height: 1}}></div>
                        {/* <div className='centered padding-vertical-72 top-32 bottom-12'><p className='purchase-nft-body '>정말로 구매 하시겠습니까?</p></div> */}
                        <div className='centered d-flex flex-column'>
                            <Confirm/>
                            <p className='purchase-nft-body top-8'>구매 완료!</p>
                        </div>
                        
                        <div className='d-flex flex-row centered top-72 bottom-32'>
                            <button onClick={()=>{setShowConfirm(false)}} className='gradient-bg padding-vertical-4 padding-horizontal-24 radius-20 height-40 text-black'>확인 </button>
                        </div>
                    </Modal.Body>
                </Modal>
            ): null}
            <div className='col-3 top-72' onClick={()=>setShow(false)}>
                <div className='col-12 filter-bg padding-vertical-24 padding-horizontal-8 max-width'>
                    {/* search bar */}
                    <div className='searchbar-bg max-width height-40 d-flex flex-row justfiy-content-between justify-between padding-left-8'>
                        <FormControl type='text' placeholder='Search' className='transparent-bg height-28 center-vertical form-control'/>
                        <div className='height-40 width-50 centered black-bg-20 '>
                            <Search />
                        </div>
                    </div>
                    {/* Filter text */}
                    <p className='filter-text top-40 top-40'>Filters</p>
                    <p className='price-text top-40' style={{color:'#FFF'}}>Price</p>
                    <div className='gradient-bg padding-horizontal-1 padding-vertical-1 top-20 radius-10'>
                        {/* <div className='black-bg-20 radius-10 top-1 right-1 max-width centered'> */}
                            <FormSelect className='height-40 black-bg-20 radius-10 centered'>
                                <option selected value="USD" className='option-text centered'>US Dollar</option>
                                <option value="BIT" className='option-text centered'>Bitcoin</option>
                                <option value="ETH" className='option-text'>Eth</option>
                                <option value="CHURR" className='option-text'>Churr</option>
                            </FormSelect>
                        {/* </div> */}
                    </div>
                    <div className='d-flex flex-row max-width justify-content-between top-40 text-c4'>
                        <p>Min. Price</p>
                        <p>Max. Price</p>
                    </div>
                    {/* price range slider */}
                    <div className='max-width'>
                        <Slider
                            getAriaLabel={()=>'Price range'}
                            value={sliderValue}
                            onChange={handleSliderChange}
                            valueLabelDisplay='auto'
                            getAriaValueText={sliderValueText}
                            max={100000}
                            min={0}
                            step={100}
                        />
                    </div>
                    {/* Accordions */}
                    <div className='max-width text-white top-40'>
                        <div className='link d-flex flex-row justify-content-between max-width accordion-heading' onClick={()=>{
                            setWeaponExpanded(!weaponExpanded)
                        }}>
                            <p>Weapon(5)</p>
                            {weaponExpanded?(<Expand />): (<Collapse />)}
                        </div>
                        {weaponExpanded ?
                        (<div className='max-width accordion-body'>
                            <p className='bottom-8'>Gun(3)</p>
                            <p>Knife(2)</p>
                        </div>):null
                        }
                    </div>

                    <div className='max-width text-white top-20'>
                        <div className='link d-flex flex-row justify-content-between max-width accordion-heading' onClick={()=>{
                            setClothesExpanded(!clothesExpanded)
                        }}>
                            <p>Clothes(15)</p>
                            {clothesExpanded?(<Expand />): (<Collapse />)}
                        </div>
                        {clothesExpanded ?
                        (<div className='max-width accordion-body'>
                            <p className='bottom-8'>Dress(3)</p>
                            <p className='bottom-8'>Jeans(5)</p>
                            <p className='bottom-8'>Tops(4)</p>
                            <p className='bottom-8'>T-shirt(1)</p>
                            <p>Jeans(2)</p>
                        </div>):null
                        }
                    </div>
                    <div className='max-width text-white top-20'>
                        <div className='link d-flex flex-row justify-content-between max-width accordion-heading' onClick={()=>{
                            setHairExpanded(!hairExpanded)
                        }}>
                            <p>Hair(8)</p>
                            {hairExpanded?(<Expand />): (<Collapse />)}
                        </div>
                        {hairExpanded ?
                        (<div className='max-width accordion-body'>
                            <p className='bottom-8'>Wig(3)</p>
                            <p className='bottom-8'>Curly(2)</p>
                            <p >Afro(3)</p>
                        </div>):null
                        }
                    </div>

                    <div className='max-width text-white top-20'>
                        <div className='link d-flex flex-row justify-content-between max-width accordion-heading' onClick={()=>{
                            setEyesExpanded(!eyesExpanded)
                        }}>
                            <p>Eyes(6)</p>
                            {eyesExpanded?(<Expand />): (<Collapse />)}
                        </div>
                        {eyesExpanded ?
                        (<div className='max-width accordion-body'>
                            <p className='bottom-8'>Blue(3)</p>
                            <p >Brown(3)</p>
                        </div>):null
                        }
                    </div>

                    <div className='max-width text-white top-20'>
                        <div className='link d-flex flex-row justify-content-between max-width accordion-heading' onClick={()=>{
                            setHatExpanded(!hatExpanded)
                        }}>
                            <p>Hat(7)</p>
                            {hatExpanded?(<Expand />): (<Collapse />)}
                        </div>
                        {hatExpanded ?
                        (<div className='max-width accordion-body'>
                            <p className='bottom-8'>Cap(3)</p>
                            <p className='bottom-8'>Harris Tweeted Hat(3)</p>
                            <p >Wool(3)</p>
                        </div>):null
                        }
                    </div>

                    <div className='max-width text-white top-20'>
                        <div className='link d-flex flex-row justify-content-between max-width accordion-heading' onClick={()=>{
                            setMouthExpanded(!mouthExpanded)
                        }}>
                            <p>Mouth(12)</p>
                            {mouthExpanded?(<Expand />): (<Collapse />)}
                        </div>
                        {mouthExpanded ?
                        (<div className='max-width accordion-body'>
                            <p className='bottom-8'>Full lip(3)</p>
                            <p className='bottom-8'>Round lips(3)</p>
                            <p className='bottom-8'>Wide lips(3)</p>
                            <p >Bow-shaped lips(3)</p>
                        </div>):null
                        }
                    </div>

                    <div className='max-width text-white top-20'>
                        <div className='link d-flex flex-row justify-content-between max-width accordion-heading' onClick={()=>{
                            setSkinsExpanded(!skinsExpanded)
                        }}>
                            <p>Skins(9)</p>
                            {skinsExpanded?(<Expand />): (<Collapse />)}
                        </div>
                        {skinsExpanded ?
                        (<div className='max-width accordion-body'>
                            <p className='bottom-8'>Dry skin(3)</p>
                            <p className='bottom-8'>Scaly skin(3)</p>
                            <p className='bottom-8'>oily moles(3)</p>
                        </div>):null
                        }
                    </div>
                    <button onClick={()=>navigate('/trade')} className='col-12 gradient-bg padding-vertical-4 radius-10 height-48 top-24 text-black'>Filter </button>
                    <p className='link text-white font-size-12 top-8 centered' onClick={()=>navigate('/trade')}>Reset filter</p>

                </div>

            </div>
            <div className='col-9 padding-left-24'>
                <div className='col-12 top-72'>
                    <div className='d-flex flex-row justify-content-around'>
                        {/* place holder */}
                        <p>   </p>
                        <h3 className='heading-white-poppins centered'>NFT Trade</h3>
                        <button
                            className="gradient-btn height-48 text-black radius-10 padding-horizontal-24"
                            onClick={()=>upload()}
                        > 
                            UPLOAD NFT
                        </button>
                        {/* <p className='p2'>NFT 작품을 올리고 유저들과 거래하세요</p> */}
                    </div>
                    <div className='row top-24'>
                        <ButtonGroup>
                            {menus.map((menu, idx) => (
                            <ToggleButton
                                key={idx}
                                id={`radio-${idx}`}
                                type="radio"
                                name="radio"
                                variant='none'
                                value={menu.value}
                                checked={radioValue === menu.value}
                                onChange={(e) => {setRadioValue(e.currentTarget.value)}}
                                className={radioValue === menu.value ? `gradient-bg right-8 radius-10` : `grey-bg white right-8 radius-10`}
                            >
                                {menu.name}
                            </ToggleButton>
                            ))}
                        </ButtonGroup>
                    </div>
                </div>
                <div className='row top-48'>
                    {weapons.map((weapon, idx)=>(
                    <div className='col-12 col-sm-12 col-md-6 col-lg-4 bottom-16' key={idx}>
                        <NFT name={weapon.name} price={weapon.price} img={weapon.image} id={weapon.id} buyWeapon={setBuyWeapon}/>
                    </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Trade;