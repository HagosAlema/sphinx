import React, { lazy } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import {ReactComponent as Logo} from './assets/images/logo/Logo.svg';
import MainMenu from './components/MainMenu';
import MyPage from './pages/MyPage';

const Home = lazy(() => import('./pages/Home'));
const Trade = lazy(()=>import('./pages/Trade'));
const Transform = lazy(()=>import('./pages/Transform'));
const Teleportation = lazy(() => import('./pages/Teleportation'));
const Connect = lazy(() => import('./pages/Connect'))
const Nav = lazy(()=>import('./components/Nav'))


const Switches = () => {
    const navigate = useNavigate()
    return (
        <div className='col-12 padding-left-60 padding-right-48'>
            <Nav />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/trade" element={<Trade />} />
                <Route path="/transform" element={<Transform /> } />
                <Route path="/teleportation" element={<Teleportation /> } />
                <Route path="/connect" element={<Connect/>} />
                <Route path="/mypage" element={<MyPage />} />
            </Routes>
        </div>
    )
}

export default Switches