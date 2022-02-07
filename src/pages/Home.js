import React, { useState } from 'react';
import {useNavigate } from 'react-router-dom';
import {ButtonGroup, ToggleButton, Image} from 'react-bootstrap';
import logo from '../assets/images/main_bg.gif';
import weapon1 from '../assets/images/black_weapon.png';
import weapon2 from '../assets/images/red_weapon.png';
import weapon3 from '../assets/images/white_weapon.png';
import weapon4 from '../assets/images/space_weapon.png';
import weapon5 from '../assets/images/eye_weapon.png';
import weapon6 from '../assets/images/kal_weapon.png';
import {ReactComponent as Game1} from '../assets/images/game1.svg';
const Home = () => {
    const navigate = useNavigate()

    
    return (
        <div className='col-12 top-80'>
            <div className='row'>
                <div className='col-5 padding-top-108'>
                    <h1 className='h-gradient'>Explore The <br/>First NFT <br/>Game Exchange</h1>
                    <p className='p1 top-36 padding-right-48'>국내 최초 NFT와 게임을 연결하는 이차원 게이트 스핑크스 스핑크스 플랫폼 내부에서 NFT를 거래하고,  프타의 지팡이를 이용해 원하는 게임 아이템 모양으로 변형하고, 투탕카멘의 게이트를 이용해 다른 게임으로 자신의 NFT를 이동시키세요
                    </p>
                    <button onClick={()=>navigate('/trade')} className='gradient-bg padding-horizontal-60 padding-vertical-20 radius-20 height-68 top-48 text-black'>Get started </button>
                </div>
                <div className='col-7'>
                    <div>
                        <img src={logo} alt='GIF'/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;