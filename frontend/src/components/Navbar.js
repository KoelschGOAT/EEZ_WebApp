//Beim component reload checken ob user eingeloggt
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import Button from '@mui/material/Button';
import React, { useEffect, useState } from 'react';
import { FcFilmReel, FcTabletAndroid } from 'react-icons/fc';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import '.././static/css/Navbar.css';
import enercon_logo from '../static/img/enercon_logo.png';
import LanguageSwitcher from './Language/LanguageSwitcher';
const Navbar = () => {
  const location = useLocation();
  //toggle navigation button on mobile view
  const [isActive, setIsActive] = useState(false);
  const handleOnClick = () => {
    setIsActive(!isActive);
  };
  let navigate = useNavigate();
  const handleOnCheck = () => {
    isActive ? setIsActive(false) : setIsActive(true);
  };

  return (
    <>
      <nav className="navbar ">
        <>
          <li
            className="brand-title gradient"
            onClick={() => {
              navigate('/');
            }}
          >
            <img alt="logo" className="logo" src={enercon_logo}></img>
          </li>
        </>
        <a
          href={location.path}
          className="toggle-button"
          onClick={() => handleOnClick()}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </a>
        <div
          className={
            isActive ? 'navbar-links active' : 'navbar-links'
          }
        >
          <ul>
            <li className="items">
              <LanguageSwitcher />
            </li>
            {location.pathname !== '/' && (
              <>
                <li className="items">
                  <NavLink
                    to="/clients"
                    onClick={() => handleOnCheck()}
                  >
                    <span>
                      <FcTabletAndroid />
                    </span>
                    <span> Clients</span>
                  </NavLink>
                </li>
                <li className="items">
                  <NavLink
                    to="/videos"
                    onClick={() => handleOnCheck()}
                  >
                    <span>
                      {' '}
                      <FcFilmReel />
                    </span>
                    <span> Videos</span>
                  </NavLink>
                </li>
              </>
            )}

            {location.pathname !== '/' && (
              <li
                className="backLi"
                onClick={() => {
                  navigate(-1);
                  handleOnClick();
                }}
              >
                <Button
                  className="back"
                  startIcon={<ArrowBackOutlinedIcon />}
                  variant="contained"
                >
                  Zurück
                </Button>
              </li>
            )}

            {location.pathname === '/' && (
              <li
                className="items"
                onClick={() => {
                  handleOnClick();
                }}
              >
                <NavLink to="/Admin">Admin Area</NavLink>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
};
export default Navbar;
