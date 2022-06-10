//Beim component reload checken ob user eingeloggt
import ".././static/css/Navbar.css";
import enercon_logo from "../static/img/enercon_logo.png"
import React, { useEffect, useState, useContext, useRef } from "react";
import AppContext from "../utils/AppContext";
import Router, { useNavigate, Link, useLocation } from "react-router-dom";
const Navbar = () => {
  const { videos } = useContext(AppContext);
  //toggle navigation button on mobile view
  const [isActive, setIsActive] = useState(false);
  const handleOnClick = () => {
    setIsActive(!isActive);
  };
  let navigate = useNavigate();
  const handleOnCheck = (e) => {
    isActive ? setIsActive(false) : setIsActive(true);

  }

  return (
    <div>
      <nav className="navbar non-printable">
        <div>
          <li className="brand-title gradient"><Link to="/"><img className="logo" src={enercon_logo}></img></Link></li>
        </div>
        <a href="#" className="toggle-button" onClick={() => handleOnClick()}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </a>
        <div className={isActive ? "navbar-links active" : "navbar-links"}>
          <ul>
            {videos && (
              <>
                {videos?.title && (
                  <>
                    <li>
                      <Link to="/devices" onClick={() => handleOnCheck()}>
                        Geräte
                      </Link>
                    </li>

                    <li>
                      <Link to="/defect" onClick={() => handleOnCheck()}>
                        Defekt
                      </Link>
                    </li>

                    <li>
                      <Link to="/handout" onClick={() => handleOnCheck()}>
                        Aufträge
                      </Link>
                    </li>

                  </>
                )}
              </>
            )}
            <li>
              <Link
                to={videos ? "/login" : "/logout"}
                onClick={() => { handleOnCheck() }}
              >
                {videos ? "Logout" : "Login"}
              </Link>

            </li>
            <li className="back" onClick={() => navigate(-1)}>
              <span>Back</span>
            </li>
            {videos !== null && (
              <li className="notClickable">
                <Link to="/">{videos?.title}</Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};
export default Navbar;