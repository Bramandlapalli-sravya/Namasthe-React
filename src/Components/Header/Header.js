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
    <div className="header shadow-md md:px-14 py-3 text-orange-600 sm:px-1 flex-wrap justify-center md:justify-between">
      <div className="logo-container sm: mb-4">
        <img src={logo} loading="lazy" width={260} height={80} alt="logo"/>
      </div>
      <div className="nav-items sm: px-4 flex">
        <ul className="md:gap-6 sm:flex flex-wrap justify-center gap-4">
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
