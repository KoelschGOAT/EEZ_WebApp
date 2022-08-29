import React from 'react';
import { FcBusinessman } from 'react-icons/fc';
import { IoMdArrowBack } from 'react-icons/io';
import { MdAdminPanelSettings } from 'react-icons/md';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import enercon_logo from '../../Images/enercon_logo.png';
import { useGetCurrentClient } from '../../services/RequestClients';
import LanguageDisplayer from '../../utils/Language/Language/LanguageDisplayer';
import LanguageSwitcher from '../../utils/Language/Language/LanguageSwitcher';
import Show from '../Conditional/Show';

type Props = {};

const Navbar2 = (props: Props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { data } = useGetCurrentClient();
  console.table(data);

  return (
    <div
      className={`navbar ${
        location.pathname !== '/Admin' ? 'shadow-md' : null
      }`}
    >
      <div className="navbar-start">
        <label tabIndex={0} className="btn btn-ghost lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h8m-8 6h16"
            />
          </svg>
        </label>

        <NavLink to="/" className=" lg:navbar-start lg:flex hidden ">
          <img
            src={enercon_logo}
            className=" h-8"
            alt="ENERCON Logo"
          />
        </NavLink>
      </div>
      <div className="flex navbar-center lg:hidden">
        {' '}
        <NavLink to="/" className="">
          <img
            src={enercon_logo}
            className="mr-3 h-6 "
            alt="ENERCON Logo"
          />
        </NavLink>
      </div>
      {/*Zurück Button Mobile*/}
      <div className="navbar-end  lg:hidden">
        <Show condition={location.pathname !== '/'}>
          <IoMdArrowBack onClick={() => navigate(-1)} size="2.5em" />
        </Show>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-1 p-0">
          {/* Language Switcher */}
          <li tabIndex={0}>
            <LanguageSwitcher className="flex items-center gap-1 " />
          </li>
          <Show condition={data?.is_expo_client}>
            <li tabIndex={0}>
              <NavLink to="/Admin" aria-current="page">
                <span className="flex  items-center gap-1">
                  <FcBusinessman size="2.5em" />
                  <LanguageDisplayer
                    de="Admin-Bereich"
                    en="Admin Area"
                  />
                </span>
              </NavLink>
            </li>
          </Show>
        </ul>
      </div>
      <div className="navbar-end hidden gap-3 lg:flex">
        <Show condition={location.pathname !== '/'}>
          <a
            className="btn bg-primary hover:bg-primary"
            onClick={() => navigate(-1)}
          >
            {' '}
            <span className="flex  items-center gap-1">
              <IoMdArrowBack size="2.5em" />
              <LanguageDisplayer de="Zurück" en="Back" />
            </span>
          </a>
        </Show>
      </div>
    </div>
  );
};
export default Navbar2;
