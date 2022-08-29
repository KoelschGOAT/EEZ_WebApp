import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { IoMdArrowBack } from 'react-icons/io';
import { MdAdminPanelSettings } from 'react-icons/md';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import enercon_logo from '../../Images/enercon_logo.png';
import { useGetCurrentClient } from '../../services/RequestClients';
import LanguageDisplayer from '../../utils/Language/Language/LanguageDisplayer';
import LanguageSwitcher from '../../utils/Language/Language/LanguageSwitcher';
import Show from '../Conditional/Show';
function Navbar() {
  const { data } = useGetCurrentClient();
  useEffect(() => {
    console.log(data);
  }, [data]);

  const location = useLocation();
  const navigate = useNavigate();
  return (
    <nav className="bg-neutral   px-2 sm:px-4 shadow-md">
      <div className="container  flex flex-wrap justify-between items-center mx-auto">
        <NavLink to="/" className="flex items-center">
          <img
            src={enercon_logo}
            className="mr-3 h-6 sm:h-9"
            alt="ENERCON Logo"
          />
        </NavLink>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        <div
          className="hidden w-full md:block md:w-auto"
          id="navbar-default"
        >
          <ul className="flex flex-col   md:h-14 mt-4   rounded-lg   md:flex-row gap-1 md:mt-0 md:text-lg md:font-medium md:border-0 ">
            {/* Language Switcher */}
            <li className="hover:bg-slate-500  rounded flex items-center cursor-pointer px-2 ">
              <LanguageSwitcher className="flex items-center gap-1 " />
            </li>
            {/* Admin Area */}
            <Show condition={data?.is_expo_client}>
              <li className="hover:bg-slate-500  rounded   px-2">
                <NavLink
                  to="/awd2"
                  className="block pr-4 pl-3 text-light-gray rounded md:bg-transparent h-full md:p-0 "
                  aria-current="page"
                >
                  <span className="flex  items-center gap-1">
                    <MdAdminPanelSettings size="3em" />
                    <LanguageDisplayer
                      de="Admin-Bereich"
                      en="Admin Area"
                    />
                  </span>
                </NavLink>
              </li>
            </Show>{' '}
            {/* Back Button (navigate(-1), jumps 1 step back in history Table) */}
            <Show condition={location.pathname !== '/'}>
              <li
                className="flex justify-center items-center w-36 gap-1 hover:bg-button-red-hover rounded  cursor-pointer bg-button-red px-2"
                onClick={() => navigate(-1)}
              >
                <IoMdArrowBack size="3em" />
                <LanguageDisplayer de="Zurück" en="Back" />
              </li>
            </Show>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
