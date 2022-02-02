import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {ButtonGroup, ToggleButton, Image} from 'react-bootstrap';
import NFT from '../components/NFT';
import weapon1 from '../assets/images/black_weapon.png';
import weapon2 from '../assets/images/red_weapon.png';
import weapon3 from '../assets/images/white_weapon.png';
import weapon4 from '../assets/images/space_weapon.png';
import weapon5 from '../assets/images/eye_weapon.png';
import weapon6 from '../assets/images/kal_weapon.png';
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
    const [checked, setChecked] = useState(false);
    const [radioValue, setRadioValue] = useState('1');
    return(
        <div className='col-12 top-108'>
            <div className='col-12 top-72'>
                <div className='col-12'>
                    <h3 className='heading-white-poppins centered'>NFT Trade</h3>
                    <p className='p2'>NFT 작품을 올리고 유저들과 거래하세요</p>
                </div>
                {/* <div className='row top-60'>
                    <div className='col-3 padding-horizontal-4'>
                        <button className='col-12 radius-10 gradient-bg padding-vertical-5'>Game-Art</button>
                    </div>
                    <div className='col-3 padding-horizontal-4'>
                        <button className='col-12 radius-10 grey-bg white padding-vertical-5'>Game Item</button>
                    </div>
                    <div className='col-3 padding-horizontal-4'>
                        <button className='col-12 radius-10 grey-bg white padding-vertical-5'>Screenshot</button>
                    </div>
                    <div className='col-3 padding-horizontal-4'>
                        <button className='col-12 radius-10 grey-bg white padding-vertical-5'>Game Character</button>
                    </div>
                </div> */}
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
                <div className='col-4 bottom-16'>
                    <NFT name={weapon.name} price={weapon.price} img={weapon.image} id={weapon.id}/>
                </div>
                ))}
            </div>
        </div>
    )
}

export default Trade;