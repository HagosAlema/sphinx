import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom'
// import {useNavigate} from 'react-router-dom';
import {ButtonGroup, ToggleButton, FormControl, FormSelect, Modal, Image} from 'react-bootstrap';
import {Slider} from '@mui/material'
import NFT from '../components/NFT';
import weapon1 from '../assets/images/black_weapon.png';
import weapon2 from '../assets/images/red_weapon.png';
import weapon3 from '../assets/images/white_weapon.png';
import weapon4 from '../assets/images/space_weapon.png';
import weapon5 from '../assets/images/eye_weapon.png';
import weapon6 from '../assets/images/kal_weapon.png';
import {ReactComponent as Search} from '../assets/images/svg/search.svg'
import {ReactComponent as Expand} from '../assets/images/svg/expand.svg'
import {ReactComponent as Collapse} from '../assets/images/svg/shrink.svg'
import {ReactComponent as Confirm} from '../assets/images/svg/confirmed.svg'

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
                    <div className='nft-top-bg padding-24 height-138'>
                        <p className='nft-name'>{nftName}</p>
                    </div>
                    <div className='centered weapon-bg top-8 right-8 left-8'>
                        <div className='col-12 centered '>
                            <div className='col-12 top-20 bottom-20 img-fluid centered padding-16'>
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
    
    return(
        <div className='row top-108'>
            {show ? (
                <Modal show={show}  className="top-108 centered radius-16">
                    <Modal.Body className="purchase-modal-bg max-width radius-16">
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
                <Modal show={showConfirm}  className="top-108 centered radius-16">
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
                    <div className='col-12'>
                        <h3 className='heading-white-poppins centered'>NFT Trade</h3>
                        <p className='p2'>NFT 작품을 올리고 유저들과 거래하세요</p>
                    </div>
                    <div className='row top-80'>
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