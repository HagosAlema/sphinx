import React, { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import banner from '../assets/images/banner.png'
import user from "../assets/images/svg/user-solid.svg";
import { accountAtom } from "../atoms/state";

import weapon1 from '../assets/images/black_weapon.png';
import weapon2 from '../assets/images/red_weapon.png';
import weapon3 from '../assets/images/white_weapon.png';
import weapon4 from '../assets/images/space_weapon.png';
import weapon5 from '../assets/images/eye_weapon.png';
import weapon6 from '../assets/images/kal_weapon.png';
import NFTSlider from "../components/NFTSlider";
import axios from "axios";
import nft from "../contracts/nft";

const menus = [
    {id: 1, name: 'Game1 Items'},
    {id: 2, name: 'Game2 Items'},
    {id: 3, name: 'NFT Storage'}
];

const weapons = [
    {name: "BLACK RIFFLE", id: 1, image: weapon1, price: 130},
    {name: "RED RIFFLE", id: 2, image: weapon2, price: 123},
    {name: "WHITE RIFFLE", id: 3, image: weapon5, price: 125},
    {name: "SPACE GUN", id: 4, image: weapon3, price: 430},
    {name: "EYE GUN", id: 5, image: weapon4, price: 432},
    {name: "BLACK KAL", id: 6, image: weapon6, price: 230}
]



const MyPage = () => {

    const walletAddress = useRecoilValue(accountAtom)
    const testAccount = "0x658f11bd6ed7a0cfeb426d18ae9b066619ddbecd"
    const [selectedMenu, setSelectedMenu] = useState(1)
    const [items, setItems] = useState([])

    const [game1Items, setGame1Items] = useState([])
    const [game2Items, setGame2Items] = useState([])
    const [storageItems, setStorageItems] = useState([])
    const game1Nft = []
    const game2Nft = []
    const storageNft = []

    useEffect( async()=>{
        const fetchGameItems = async (game)=>{
            console.log('Loading game items')
            var itemList = []
            axios.get('http://localhost:3030/getItemInfo', {
                params: {
                    public_key: walletAddress,
                    game: game
                }
            }).then((result)=>{
                const data = result.data
                console.log((result.data));
                var index = 1;
                data.forEach((item)=>{
                    const tokenId = item.img_token_id
                    const statId = item.stat_token_id
                    console.log(tokenId)
                    nft.methods.getUri(tokenId).call().then(res=>{

                        fetch(res)
                            .then(response => response.json())
                            .then(json => {
                                nft.methods.getNFTValue(tokenId).call().then(value=>{
                                    //get stat info
                                    nft.methods.getUri(statId).call().then((statUri)=>{
                                        fetch(statUri)
                                            .then(statData => statData.json())
                                            .then(statJson=> {

                                                    fetch(statJson.url)
                                                    .then(statUrl=>statUrl.json())
                                                    .then(itemPower=>{

                                                        const nftItem ={name: item.name ? item.name :'Undefined', id: index, image: json.url, price: value, power: itemPower}
                                                        index++;
                                                        itemList.push(nftItem)

                                                        if(game==='game1'){

                                                            game1Nft.push(nftItem)
                                                            setItems([...itemList], nftItem)
                                                            setGame1Items([...itemList],nftItem)
                                                        } else {

                                                            game2Nft.push(nftItem)
                                                            setGame1Items([...itemList], nftItem)
                                                        }
                                                    })
                                                
                                            })
                                        
                                    })
                                    
                                })
                            }).catch(er=>{
                                console.log("ERROR==>"+er)
                            })
                    })
                })
                // setItems(itemList)
            }).catch(e=>{
                // console.log(e);
            })
        }
        fetchGameItems('game1')
        fetchGameItems('game2')
    },[])

    //Get storage items
    useEffect(()=>{
        var itemList = []
        axios.get('http://localhost:3030/getImgInfo', {
            params: {
                public_key: walletAddress
            }
        }).then((result)=>{
            const data = result.data

            var index = 1;
            data.forEach((item)=>{
                const tokenId = item.img_token_id
                const statId = item.stat_token_id

                nft.methods.getUri(tokenId).call().then(res=>{

                    fetch(res)
                        .then(response => response.json())
                        .then(json => {
                            nft.methods.getNFTValue(tokenId).call().then(value=>{
                                //get stat info
                                nft.methods.getUri(statId).call().then((statUri)=>{
                                    fetch(statUri)
                                        .then(statData => statData.json())
                                        .then(statJson=> {

                                                fetch(statJson.url)
                                                .then(statUrl=>statUrl.json())
                                                .then(itemPower=>{

                                                    const nftItem ={name: item.name ? item.name :'Undefined', id: index, image: json.url, price: value, power: itemPower}
                                                    index++;
                                                    itemList.push(nftItem)
                                                    storageNft.push(nftItem)
                                                    // setItems([...itemList], nftItem)
                                                    setStorageItems([...itemList],nftItem)
                                                })
                                            
                                        })
                                    
                                })
                                
                            })
                        }).catch(er=>{
                            console.log("ERROR==>"+er)
                        })
                })
            })
            // setItems(itemList)
        }).catch(e=>{
            // console.log(e);
        })

    },[])

    const onMenuChange = (menu) => {
        console.log(game1Items, game2Items, storageItems)
        const {id, name} = menu;
        setSelectedMenu(id)
        if(id===1){
            setItems(game1Items)
            // console.log(game1Nft);
        } else if(id === 2) {
            setItems(game2Items)
        } else {
            setItems(storageItems)
        }
    }

    return (
        <div className="row top-108" style={{height:'auto'}}>
            <Image fluid={false} src={banner} />
            <div className="d-flex flex-column centered" style={{marginTop: -100}}>
                <Image 
                    className="height-200 width-200 centered gradient-bg padding-4"
                    fluid={true} 
                    roundedCircle={true} 
                    src={user}
                    style={{backgroundColor: '#FFFFFF'}}
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

                <div className="row  bottom-108 top-60">
                {
                    items.map((weapon, idx) => (
                        <div
                            id={idx}
                            key={idx}
                            className="col-4 top-16"
                        >
                            <NFTSlider
                                name={weapon.name}
                                id={weapon.id}
                                img={weapon.image}
                                price={weapon.price}
                                buyWeapon={()=>{}}
                                power={weapon.power}
                            />
                        </div>
                    ))
                }

            </div>
        </div>
    )
}

export default MyPage