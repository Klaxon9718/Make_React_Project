// ./components/Header.js
import React from 'react';
import { Link } from "react-router-dom"

function Header() {
    return (
        <div>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/topics">Topics</Link></li>
            </ul>
        </div>
    )

}
export default Header;

//[참고]
//(https://velog.io/@beton/React-Router-%EA%B8%B0%EB%B3%B8-%EC%8B%9C%EC%9E%91%ED%95%98%EA%B8%B0)