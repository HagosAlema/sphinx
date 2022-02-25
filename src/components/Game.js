import { Buffer } from 'buffer'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Web3 from 'web3';
import nft from '../contracts/nft';
import loadingImg from "../assets/images/Loading.gif";
import loadingStop from "../assets/images/LoadingStop.png"
import {useNavigate} from 'react-router-dom';

const Game = (object) => {
    window.web3 = new Web3(window.ethereum);
    window.ethereum.enable();
    const navigate = useNavigate()
    const [returnData, setReturnData] = useState("a")
    const [loading, setLoading] = useState(0)
    const [isBlocking, setIsBlocking] = useState(false)
    var params = window.location.search.substr(window.location.search.indexOf("?") + 1);
    var sval = ""
    var name = ""
    var image = ""
    var stat = ""
    var game = ""
    var publicKey = ""
    params = params.split("&");
    for (var i = 0; i < params.length; i++) {
        var temp = params[i].split("=")
        if (temp[0] === "name") {
            name = temp[1]
            console.log(name, "name")
        } 
        else if (temp[0] === "image") {
            image = temp[1]
        }
        else if (temp[0] === "stat") {
            stat = temp[1]
        }
        else if (temp[0] === "game") {
            game = temp[1]
            console.log(game, "game")
        }
        else if (temp[0] === "publicKey") {
            publicKey = temp[1]
        }
    }
    image = image.split("?")[0]
    const image_buffer = Buffer.from(image, "utf-8")

    

    useEffect(() => {
        if (returnData !== "a" ) return;
        axios({
            url: 'http://localhost:3030/mintGameNFT',
            method: 'post',
            data: {
                name: name,
                img: image,
                stat: stat,
                game: game,
                public_key: publicKey
            }
        }).then(function(response) {
            const URIImg = response.data.attr_img_url
            const URIStat = response.data.attr_stat_url
            registerNFT(URIImg, URIStat, game, name)
        })
    })
    

    async function registerNFT (URIImg, URIStat, game, name) {
        nft.methods.registerNFT(URIImg).send({from: publicKey, gas:3000000})
        .then(function(receipt){
            const img_token_id = receipt.events.Transfer.returnValues[2]
            axios({
                url: 'http://localhost:3030/saveImgTokenId?token_id=' + img_token_id + '&game=' + game + '&public_key=' + publicKey + '&name=' + name,
                method: 'get',
            }).then(function(response) {
                if (response.data === "success") {
                    nft.methods.registerNFT(URIStat).send({from: publicKey, gas:3000000})
                    .once('sending', (payload) => { console.log(payload);})
                    .on('error', function(error){ console.error(error) })
                    .then(function(receipt){
                        axios({
                            url: 'http://localhost:3030/saveStatTokenId?stat_token_id=' + receipt.events.Transfer.returnValues[2] + "&img_token_id=" + img_token_id + "&public_key=" + publicKey,
                            method: 'get'
                        }).then(function(response) {
                            setLoading(1)
                        })
                    })
                }
            })
        })
    }
    return (
        <div className='Game-loading'>
            {loading === 0 ? 
            <div>
                <p className='Game-loading-text'><span>SPHINX가 NFT를 발급중입니다.</span></p>
                <img className='Game-loading-image' src={loadingImg}></img>
            </div>
            :
            <div> 
                <p className='Game-loading-text'><span>발급 완료</span></p>
                <img className='Game-loading-image' src={loadingStop}></img>
                <br></br>
                <button className='Game-loading-button' onClick={() => navigate('/')}>홈페이지 바로가기</button>
            </div>}
        </div>
    )
}

export default Game