// Router.jsx 파일
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from 'src/pages/Home';
import InsShip from 'src/pages/InsShip';
import Login from 'src/pages/Login';
import NotFound from 'src/pages/NotFound';
import Dashboard from 'src/pages/dashboard/Dashboard';



const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Home" element={<Home />} />
                <Route path="/InsShip" element={<InsShip />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/Dashboard" element={<Dashboard />} />
                <Route path="/*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;