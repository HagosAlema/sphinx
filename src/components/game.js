import { Buffer } from 'buffer'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Web3 from 'web3';
import nft from '../contracts/nft';


const Game = (object) => {
    window.web3 = new Web3(window.ethereum);
    window.ethereum.enable();
    const [returnData, setReturnData] = useState("a")
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

    // async function getContractInstance() {
    //     let contract;
    //     // Contract 불러오기 및 NFT 정보 확인
    //     await fetch('../abi/nft_abi.json')
    //     .then(response => response.json())
    //     .then(data => {
    //         console.log(data)
    //         //connect to NFTToken contract(Ropsten test network)
    //         let contract_abi = data;
    //         let contract_address = "0x0366f1f1143397Ee686EFCD083a4Ec20688E6073";
    //         contract = new window.web3.eth.Contract(contract_abi, contract_address)
            
    //     });
    //     return contract;
    // }

    async function registerNFT (URIImg, URIStat, game, name) {
        console.log("registerNFT")
        nft.methods.registerNFT(URIImg).send({from: publicKey, gas:3000000})
        .once('sending', (payload) => { console.log(payload);})
        .on('error', function(error){ console.error(error) })
        .then(function(receipt){
            console.log(receipt, "receipt");
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
                            console.log(response.data)
                        })
                    })
                }
            })
            
            console.log("registerNFT result:", receipt.events.Transfer.returnValues[2]);
        })

    }
    

    

    console.log(image_buffer)
    console.log(stat)
    console.log(name)
    console.log(publicKey)
    return (
        <div>game
            <img src={image}></img>
        </div>
    )
}

export default Game