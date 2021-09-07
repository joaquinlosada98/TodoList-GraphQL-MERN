import React from 'react';
import logo from "../../imgs/peep_icon.png";
import "./header.css";

const Header = () => {
    return (
        <div className="Header">
            <div className="HeaderGroup">
                <h3>My Duty List</h3>
                <img src={logo} alt="peep-icon"/>
            </div>
        </div>
    );
}
 
export default Header;