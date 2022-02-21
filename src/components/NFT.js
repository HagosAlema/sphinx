import React, {useState} from "react";
import {useNavigate} from 'react-router-dom';
import {Image} from 'react-bootstrap';

const NFT = ({id, name, img, price, buyWeapon})=>{
    const navigate = useNavigate()

    const buy = () => {
        buyWeapon(id, name, price, img)
        console.log(id,name,price);
    }
    return (
        <div className='nft-bg padding-24 padding-horizontal-48' >
            <div className='weapon-box-bg'>
                <div className='nft-top-bg padding-8 height-138'>
                    <p className='nft-name'>{name}</p>
                </div>
                <div className='centered weapon-bg top-8 right-8 left-8'>
                    <div className='col-12 centered '>
                        <div className='col-12 top-20 bottom-20 img-fluid centered padding-16'>
                            <Image src={img} alt="NFT" fluid={true} className='img-fluid' responsive/>
                        </div>
                    </div>
                </div>
                <div className='nft-bottom-bg height-82'>
                    <p className='price-text centered'>{price} CHURR</p>
                </div>
            </div>
            <button onClick={buy} className='col-12 gradient-bg padding-vertical-4 radius-10 height-48 top-24 text-black'>구매 하기 </button>
        </div>
    )
}

export default NFT;