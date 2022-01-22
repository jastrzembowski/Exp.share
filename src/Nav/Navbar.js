import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import logo from "../images/logo.png";
import AddNewOfferForm from "../AddNewOfferForm/AddNewOfferForm";
import Popup from "../AddNewOfferForm/Popup";
import { useAuth } from "../contexts/AuthContext";
import Signup from "../LoginRegister/Signup";
import Login from "../LoginRegister/Login";
import Logout from "../LoginRegister/Logout";
import Profile from "../LoginRegister/Profile/Profile";

export default function Navbar({ children }) {
  const [nav, setnav] = useState(false);
  const { currentUser } = useAuth();


  const [openPopup, setOpenPopup] = React.useState(false);


  return (
    <nav className={"nav"}>
      <input className="menu-btn" type="checkbox" id="menu-btn" />
      <label className="menu-icon" for="menu-btn">
        <span className="nav-icon"></span>
      </label>
      <div className="logo">
      <Link to="/"> <img src={logo} alt="logo exp-share" /></Link>
      </div>
      <ul className="menu">
        <li onClick="document.documentElement.scrollIntoView({ behavior: 'smooth' })">
          <Link to="/">Strona główna</Link>
        </li>
        <li onClick="document.documentElement.scrollIntoView({ behavior: 'smooth' })">
          <Link to="/prices">Oferty</Link>
        </li>
        {!currentUser ? (
          <>
            <Login />
            <Signup />
          </>
        ) : (
          <>
            <Profile />
            <li button onClick={() => setOpenPopup(true)} className="menu-but" style={{ cursor: "pointer" }}>
              <FaPlus  style={{ marginRight: "5px" }}/>
                Dodaj ofertę!
            </li>
            </>
            )}
            <li>   {currentUser && <Logout />}</li>
          </ul>
      {children}
        <Popup openPopup={openPopup} setOpenPopup={setOpenPopup}>
          <AddNewOfferForm openPopup={openPopup} setOpenPopup={setOpenPopup} />
        </Popup>
    </nav>
  );
}
