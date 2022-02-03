import React from "react";
import {useNavigate} from 'react-router-dom';

import {ReactComponent as Game1} from '../assets/images/game1.svg';
import {ReactComponent as Game2} from '../assets/images/game2.svg';
// import weapons from "../data/weapons";

import weapon1 from '../assets/images/black_weapon.png';
import weapon2 from '../assets/images/red_weapon.png';
import weapon3 from '../assets/images/white_weapon.png';
import weapon4 from '../assets/images/space_weapon.png';
import weapon5 from '../assets/images/eye_weapon.png';
import weapon6 from '../assets/images/kal_weapon.png';


const Teleportation = () => {
    const navigate = useNavigate()

    return (
        <div className="col-12 top-108">
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
                    <div className="centered">
                        <button 
                            onClick={()=>navigate('/transform')} 
                            className='gradient-bg padding-horizontal-40 padding-vertical-10 radius-5 height-48 top-48 text-black'>시작하기 </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Teleportation;