import React, { Suspense, useEffect, lazy } from 'react';
import { useLocation, Routes, Route } from 'react-router-dom';
import Switches from './Switches';
import Trade from './pages/Trade';
import Loading from './components/Loading';

const Routers = () => {
    const loading = () => <Loading />;
    const location = useLocation();

    useEffect(()=>{
        if(location.pathname !=='/home') document.body.scrollTo({top:0,left:0,behavior:'smooth'});
    },[location]);

    return (
        <Suspense fallback={loading()}> 
            <Routes>
                <Route path="/*" element={<Switches />} />
                <Route path="/login" element={<Trade />} />
            </Routes>
        </Suspense>
        
    )
}

export default Routers;