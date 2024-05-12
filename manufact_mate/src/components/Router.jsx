// Router.jsx 파일
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from 'src/pages/Home/Home';
import Ship from 'src/pages/ship/Ship';
import Login from 'src/pages/Login/Login';
import NotFound from 'src/pages/NotFound';
import PlanOrder from 'src/pages/planOrder/PlanOrder';

import Pps_mor from 'src/pages/pps/Pps_mor';
import Pro_mor from 'src/pages/pro/Pro_mor';

import Human from 'src/pages/human_resources/Human';
import Parsonal from 'src/pages/personal/Personal';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Home" element={<Home />} />
                <Route path="/ship" element={<Ship />} />
				<Route path="/planOrder" element={<PlanOrder />} />

                <Route path="/pps_mor" element={<Pps_mor />} />
                <Route path="/pro_mor" element={<Pro_mor />} />

                <Route path="/human_resources" element={<Human />} />
                <Route path="/personal" element={<Parsonal />} />

                <Route path="/Login" element={<Login />} />
                <Route path="/*" element={<NotFound />} />
                
            </Routes>
        </BrowserRouter>
    );
};

export default Router;