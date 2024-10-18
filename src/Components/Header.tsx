import React, { useState } from "react";
import '../Components/styles.css';
const Header = () => {

    const [input, setInputValue] = useState('');

    return (
        <div className="header">
            <img src="https://img.freepik.com/premium-vector/burger-logo-icon_567288-500.jpg" alt="burger-logo" className="logo" />
            <ul className="nav-items">
                <li className="nav-link">Home</li>
                <li>About Us</li>
                <li>Contact Us</li>
                <li>Cart</li>
            </ul>

            <textarea
                id="username"
                aria-labelledby="username-label"
                maxLength={300}
                onChange={(e) => setInputValue(e.target.value)}
            />
            {/* <label id="username-label" htmlFor="username">Enter up to 300 letters</label> */}

            <p id="username-label" role="alert">You have {300 - input.length} characters left.</p>

            

        </div>
    )
}

export default Header;