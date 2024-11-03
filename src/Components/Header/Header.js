import React from "react";
import logo from "../assets/swiggy-logo.png";
import "../Header/style.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import UseOnlineStatus from "../../Utilitis/useOnlineStatus";
import { useSelector } from "react-redux";

const Header = () => {

  const cartItemList = useSelector((state)=> state.cart.cartItem)
  const navigation = useNavigate();
  const {id} = useParams();
  
// const handleHomeClick = (link) => {
//   navigation(link);
// }

const onlineStatus = UseOnlineStatus();

  return (
    <div className="header shadow-md px-14 py-3 text-orange-600 text-">
      <div className="logo-container">
        <img src={logo} loading="lazy" width={260} height={80} alt="logo"/>
      </div>
      <div className="nav-items">
        <ul>
          {/* <li onClick={()=>handleHomeClick('/')}>Home</li>
          <li onClick={()=>handleHomeClick(`/about`)}>About Us</li> */}
            {/* or */}
          <li>Online Status: <span style={{color:`${onlineStatus? 'green': 'red'}`}}>{onlineStatus? 'Online': 'Offline'}</span></li>
          <li><Link to={'/'} className="link">Home</Link></li>
          {/* <li><Link to={`/about`} className="link">About US</Link></li> */}
          <li><Link to={'/contact'}>Contact Us</Link></li>
          <li><Link to={'/cart'}>Cart ({cartItemList.length})</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
