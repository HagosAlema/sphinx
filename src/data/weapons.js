
import weapon1 from '../assets/images/black_weapon.png';
import weapon2 from '../assets/images/red_weapon.png';
import weapon3 from '../assets/images/white_weapon.png';
import weapon4 from '../assets/images/space_weapon.png';
import weapon5 from '../assets/images/eye_weapon.png';
import weapon6 from '../assets/images/kal_weapon.png';
const weapon = [
    {name: "BLACK RIFFLE", id: 1, image: weapon1, price: 130},
    {name: "RED RIFFLE", id: 2, image: weapon2, price: 123},
    {name: "WHITE RIFFLE", id: 3, image: weapon5, price: 125},
    {name: "SPACE GUN", id: 4, image: weapon3, price: 430},
    {name: "EYE GUN", id: 5, image: weapon4, price: 432},
    {name: "BLACK KAL", id: 6, image: weapon6, price: 230}
]

const weapons = ()=> {
    return weapon;
}

export default weapons;