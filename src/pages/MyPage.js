import React, { useState } from "react";
import { Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import banner from '../assets/images/banner.png'
import user from "../assets/images/svg/user-solid.svg";
import { accountAtom } from "../atoms/state";

const menus = [
    {id: 1, name: 'Game1 Items'},
    {id: 2, name: 'Game2 Items'},
    {id: 3, name: 'NFT Storage'}
];

const MyPage = () => {

    const walletAddress = useRecoilValue(accountAtom)
    const [selectedMenu, setSelectedMenu] = useState(1)

    const onMenuChange = (menu) => {
        const {id, name} = menu;
        setSelectedMenu(id)
    }


    return (
        <div className="row top-108" style={{height:'auto'}}>
            <Image fluid={false} src={banner} />
            <div className="d-flex flex-column centered white-b" style={{marginTop: -100}}>
                <Image 
                    className="height-200 width-200 centered gradient-bg padding-4"
                    fluid={true} 
                    roundedCircle={true} 
                    src={user}
                    />
                <p className="p1 text-white top-8">UNDEFINED</p>
                <p className="p1 text-white top-8">Wallet Address: {walletAddress}</p>
            </div>
            <div className="d-flex flex-column">
                <p className="h2 text-white top-16">My NFT List</p>
            </div>
            <div className="d-flex flex-row top-16">
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
            
        </div>
    )
}

export default MyPage