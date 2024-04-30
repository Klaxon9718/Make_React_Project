// Router.jsx 파일
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from 'src/pages/Home/Home';
import Ship from 'src/pages/ship/Ship';
import Login from 'src/pages/Login/Login';
import NotFound from 'src/pages/NotFound';




const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Home" element={<Home />} />
                <Route path="/ship" element={<Ship />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;