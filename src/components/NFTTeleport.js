import React, {useState} from "react";
import {useNavigate} from 'react-router-dom';
import {Image} from 'react-bootstrap';
import {ReactComponent as SwordIcon} from '../assets/images/svg/sword_icon.svg'
import rectangle from '../assets/images/rectangle.png';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';

const icons = [
    {id: 0, name: "Image"},
    {id: 1, name: "Description"}
]
const items = [
    {id: 0, name: "Empty"},
    {id: 2, name: "Empty"},
    {id: 3, name: "Empty"}
]

const NFTTeleport = ({id, name, img, price, buyWeapon, onItemSelect, hidePrice, power})=>{
    const navigate = useNavigate()
    const [selectedIcon, setSelectedIcon] = useState(0)

    const buy = () => {
        buyWeapon(id, name, price, img)
        console.log(id,name,price);
    }

    const handleTouchMove = (event) => {
        setSelectedIcon(1)
        console.log('moved')
    }
    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };
    return (
        <div className='padding-horizontal-36' >
            <div className='weapon-box-bg'>
                
                <div className='nft-square-bg padding-horizontal-16 padding-vertical-8 d-flex flex-column justify-content-around'>
                    <p className='nft-name bottom-16'>{name}</p>
                    <div className="d-flex flex-row justify-content-between">
                        <p className="p2">Riffle</p>
                        <p className="p1">Legendary</p>
                    </div>
                </div>
                {selectedIcon===0 ?
                <div onTouchMove={handleTouchMove}>
                    <div className='centered weapon-bg top-8 right-8 left-8'>
                        <div className='col-12 centered '>
                            <div className='col-12 top-20 bottom-20 img-fluid centered padding-16'>
                                <Image src={img} alt="NFT" fluid={true} className='img-fluid' />
                            </div>
                        </div>
                    </div>
                    <div className='nft-bottom-bg height-82'>
                        {!hidePrice?<p className='price-text centered'>{price} CHURR</p>:null}
                    </div>
                </div>
                :
                <div className="top-8">
                    <div className="d-flex flex-row padding-horizontal-36">
                        <SwordIcon />
                        <p className="left-16 nft-power-text"
                            style={{fontSize: '2.5rem'}}
                        >{power}</p>
                    </div>
                    <div 
                        style={{paddingTop: '2rem', paddingBottom: '2rem', paddingLeft: '2rem', paddingRight:'2rem'}}
                    >
                        {items.map((item, idx)=>(
                            <div 
                                id={idx}
                                key={idx}
                                className="d-flex flex-row top-8">
                                    <img 
                                    alt="ICON"
                                    src={rectangle} style={{width: 30, height: 30}} />
                                    <p className="p2 left-8">{item.name}</p>

                            </div>
                        ))}
                    </div>
                    
                    <div className='d-flex flex-row nft-bottom-bg top-24'>
                    </div>
                </div>
                }
            </div>
            <div className="d-flex flex-row centered top-16">
            {
                icons.map((icon, id)=>(
                    <div
                        id={id}
                        key={id}
                        className={selectedIcon === id ?"link white-bg width-16 height-16 radius-8 right-4 left-4 border-1": "link transparent-bg width-8 height-8 radius-4 right-4 left-4 border-1"}
                        onClick={()=>{
                            setSelectedIcon(icon.id)
                        }}
                        ></div>
                ))
            }
            </div>
            <div className="d-flex centered top-16">
                <button onClick={()=>onItemSelect(id, name, price, img, power)} className='gradient-bg padding-vertical-4 padding-horizontal-24 radius-20 height-40 text-black'>선택하기</button>
            </div>

        </div>
    )
}

export default NFTTeleport;




