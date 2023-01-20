import { FcBusinessman } from 'react-icons/fc';
import { IoMdArrowBack } from 'react-icons/io';
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

  const currentClient = useGetCurrentClient();
  if (!location.pathname.toLowerCase().includes('/admin'))
    return (
      <div
        className={`navbar bg-white ${
          location.pathname !== '/Admin' ? 'shadow-md' : null
        }`}
      >
        <div className="navbar-start">
          <NavLink
            to="/"
            className=" lg:navbar-start lg:flex hidden ml-5"
          >
            <figure>
              {' '}
              <img
                src={enercon_logo}
                className=" h-8"
                alt="ENERCON Logo"
              />
            </figure>
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
        <div className="navbar-end cursor-pointer lg:hidden">
          <Show
            condition={
              currentClient.data &&
              currentClient.data?.is_expo_client &&
              location.pathname !== '/Admin'
            }
          >
            <FcBusinessman
              onClick={() => navigate('/Admin')}
              size="2.5em"
            />
          </Show>
          <Show condition={location.pathname !== '/'}>
            <IoMdArrowBack
              onClick={() => navigate(-1)}
              size="2.5em"
            />
          </Show>
        </div>

        <div className="navbar-center flex">
          <ul className="menu menu-horizontal gap-1 p-0">
            {/* Language Switcher */}
            <li tabIndex={0}>
              <LanguageSwitcher className="flex items-center gap-1 " />
            </li>
            <Show condition={!currentClient.data?.is_expo_client}>
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
        <div className="navbar-end hidden gap-3 lg:flex mr-5">
          <Show condition={location.pathname !== '/'}>
            <a
              className="btn btn-primary "
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
  return null;
};
export default Navbar2;
