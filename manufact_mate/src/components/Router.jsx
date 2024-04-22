// Router.jsx 파일
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from '../pages/Home';
import InsShip from '../pages/InsShip';
import Login from '../pages/Login';


const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Home" element={<Home />} />
                <Route path="/InsShip" element={<InsShip />} />
                <Route path="/Login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;