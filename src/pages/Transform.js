import React from "react";
import {useNavigate} from 'react-router-dom';
import {Image} from 'react-bootstrap';
import weapon1 from '../assets/images/black_weapon.png';
import weapon2 from '../assets/images/red_weapon.png';
import weapon3 from '../assets/images/white_weapon.png';
import weapon4 from '../assets/images/space_weapon.png';
import weapon5 from '../assets/images/eye_weapon.png';
import weapon6 from '../assets/images/kal_weapon.png';
import {ReactComponent as Exchange} from '../assets/images/svg/transform.svg'
const weapons = [
    {name: "BLACK RIFFLE", id: 1, image: weapon1, price: 130},
    {name: "RED RIFFLE", id: 2, image: weapon2, price: 123},
    {name: "WHITE RIFFLE", id: 3, image: weapon5, price: 125},
    {name: "SPACE GUN", id: 4, image: weapon3, price: 430},
    {name: "EYE GUN", id: 5, image: weapon4, price: 432},
    {name: "BLACK KAL", id: 6, image: weapon6, price: 230}
]

const Transform = () => {
    const navigate = useNavigate()

    const NFT = ({id, name, img, price})=>{
        const navigate = useNavigate()
        return (
            <div className='padding-top padding-horizontal-48' >
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
            </div>
        )
    }

    return (
        <div className="col-12 top-108">
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
                    <div className="col-4 centered">
                        <Exchange />
                    </div>
                    <div className='col-4'>
                        <NFT name={weapons[1].name} price={weapons[1].price} img={weapons[1].image} id={weapons[1].id}/>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default Transform;