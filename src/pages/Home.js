import React, { useState } from 'react';
import {useNavigate } from 'react-router-dom';
import logo from '../assets/images/main_bg.gif';
import weapon1 from '../assets/images/black_weapon.png';
import weapon2 from '../assets/images/red_weapon.png';
import weapon3 from '../assets/images/white_weapon.png';
import weapon4 from '../assets/images/space_weapon.png';
import weapon5 from '../assets/images/eye_weapon.png';
import weapon6 from '../assets/images/kal_weapon.png';
import {ReactComponent as Game1} from '../assets/images/game1.svg';
import {ReactComponent as Game2} from '../assets/images/game2.svg';
import {ButtonGroup, ToggleButton, Image} from 'react-bootstrap';
const menus = [
    { name: 'Game-Art', value: '1' },
    { name: 'Game-Item', value: '2' },
    { name: 'Screenshot', value: '3' },
    { name: 'Game-Character', value: '4' }
]
const weapons = [
    {name: "BLACK RIFFLE", id: 1, image: weapon1, price: 130},
    {name: "RED RIFFLE", id: 2, image: weapon2, price: 123},
    {name: "WHITE RIFFLE", id: 3, image: weapon5, price: 125},
    {name: "SPACE GUN", id: 4, image: weapon3, price: 430},
    {name: "EYE GUN", id: 5, image: weapon4, price: 432},
    {name: "BLACK KAL", id: 6, image: weapon6, price: 230}
]
const NFT = ({id, name, img, price})=>{
    const navigate = useNavigate()
    return (
        <div className='nft-bg padding-24 padding-horizontal-48' >
            <div className='weapon-box-bg'>
                <div className='nft-top-bg padding-24 height-138'>
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
            <button onClick={()=>navigate('/transform')} className='col-12 gradient-bg padding-vertical-4 radius-10 height-48 top-24 text-black'>구매 하기 </button>
        </div>
    )
}
const Home = () => {
    const navigate = useNavigate()
    const [checked, setChecked] = useState(false);
    const [radioValue, setRadioValue] = useState('1');

    
    return (
        <div className='col-12 top-80'>
            <div className='row'>
                <div className='col-5 padding-top-108'>
                    <h1 className='h-gradient'>Explore The <br/>First NFT <br/>Game Exchange</h1>
                    <p className='p1 top-36 padding-right-48'>국내 최초 NFT와 게임을 연결하는 이차원 게이트 스핑크스 스핑크스 플랫폼 내부에서 NFT를 거래하고,  프타의 지팡이를 이용해 원하는 게임 아이템 모양으로 변형하고, 투탕카멘의 게이트를 이용해 다른 게임으로 자신의 NFT를 이동시키세요
                    </p>
                    <button onClick={()=>navigate('/transform')} className='gradient-bg padding-horizontal-60 padding-vertical-20 radius-20 height-68 top-48 text-black'>Get started </button>
                </div>
                <div className='col-7'>
                    <div>
                        <img src={logo} alt='GIF'/>
                    </div>
                </div>
            </div>
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
            <div>
                <div className='col-12 top-60'>
                    <h3 className='heading-white-poppins centered'>Design Transform</h3>
                    <p className='p2'>프타의 지팡이는 아이템 모양을 변환시키는 <br />신비한 창조의 지팡이 입니다. <br/>자신이 가지고 있는 게임 아이템을 원하는 외형으로 바꿔서 플레이하세요</p>
                </div>
            </div>
            <div className='nft-bg padding-24 padding-horizontal-48 top-60'>
                <div className='row'>
                    <div className='col-4'>
                        <NFT name={weapons[0].name} price={weapons[0].price} img={weapons[0].image} id={weapons[0].id}/>
                    </div>
                    <div className='col-4'>
                        <NFT name={weapons[0].name} price={weapons[0].price} img={weapons[0].image} id={weapons[0].id}/>
                    </div>
                </div>
                
            </div>
            <div>
                <div className='col-12 top-60'>
                    <h3 className='heading-white-poppins centered'>NFT Teleportation</h3>
                    <p className='p2'>투탕카멘의 게이트는 다른 차원으로 이동할 수 있는 <br /> 고대의 유물안에서 발견된 이차원 전송 게이트입니다. <br />자신이 가지고 있는 게임 아이템을 다른 게임으로 전송해보세요.</p>
                </div>
            </div>
            <div className='teleport-bg padding-12 top-60 bottom-108'>
                <h3 className='heading-white-poppins centered'>{`Tutankhamun’s Gate is Open`}</h3>
                <div className='top-48'>
                    <div className='col-12  centered top-60'>
                        <div className='col-4 centered'>
                            <Game1 />
                        </div>
                        <div className='col-4 clock-bg centered'>
                            <div className='centered'>
                                <p className=''>
                                    <span className='clock-text'>Time left</span>
                                    <span className='hour-text'><br />4:54</span>
                                </p>
                            </div>
                        </div>
                        <div className='col-4 centered'>
                            <Game2 />
                        </div>  
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default Home;