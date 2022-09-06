import React, { useContext } from 'react';
import { AiFillHome, AiOutlineHome } from 'react-icons/ai';
import {
  FcFilmReel,
  FcMultipleDevices,
  FcTouchscreenSmartphone,
} from 'react-icons/fc';
import { MdOutlineDashboard } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import LanguageDisplayer from '../../utils/Language/Language/LanguageDisplayer';
//Sidebar Component With TailwindCSS
interface Props {
  handleClick: (num: number) => void;
}
const Bar = ({ handleClick }: Props) => {
  //Getting the drain Context from the usersetting to display the context always

  //returning the Sidebar, sidebar gets folded when the device is on less tha 769 pxs
  return (
    <div className="table-cell align-top">
      <div className=" flex flex-col w-14 hover:w-60 2xl:w-60 bg-white shadow-xl h-screen transition-all duration-300 border-none z-10 ">
        <div className="overflow-y-auto overflow-x-hidden flex flex-col justify-between flex-grow">
          <ul className="flex flex-col py-4 space-y-2 gap-3">
            <li className="px-5 hidden 2xl:block mb-5">
              <div className="flex flex-row items-center h-8">
                <div className="text-lg font-light tracking-wide text-gray-400 uppercase">
                  <LanguageDisplayer
                    de="Admin Menü"
                    en="Admin Area"
                  />
                </div>
              </div>
            </li>
            <li>
              {/* Link tag to Forward the use to the Settings Component withour loadingtime */}
              <NavLink to="/">
                <a
                  href="#"
                  className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-accent  text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-accent  pr-6"
                >
                  <span className="inline-flex justify-center items-center ml-2">
                    {/* Settings SVG Icon */}
                    <AiFillHome size="2.5em" />
                  </span>
                  <span className="ml-2 text-lg tracking-wide truncate">
                    Home
                  </span>
                </a>
              </NavLink>
            </li>
            <li>
              {/* Link tag to Forward the use to the Settings Component withour loadingtime */}
              <NavLink to="/Admin">
                <a
                  href="#"
                  className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-accent  text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-accent  pr-6"
                >
                  <span className="inline-flex justify-center items-center ml-2">
                    {/* Settings SVG Icon */}
                    <MdOutlineDashboard size="2.5em" />
                  </span>
                  <span className="ml-2 text-lg tracking-wide truncate">
                    Dashboard
                  </span>
                </a>
              </NavLink>
            </li>
            <li>
              {/* Link tag to Forward the use to the Settings Component withour loadingtime */}
              <NavLink to="Clients" onClick={() => handleClick(1)}>
                <a
                  href="#"
                  className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-accent  text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-accent  pr-6"
                >
                  <span className="inline-flex justify-center items-center ml-2">
                    {/* Settings SVG Icon */}
                    <FcMultipleDevices size="2.5em" />
                  </span>
                  <span className="ml-2 text-lg tracking-wide truncate">
                    Clients
                  </span>
                </a>
              </NavLink>
            </li>
            <li>
              {/* Link tag to Forward the use to the Settings Component withour loadingtime */}
              <NavLink to="Videos" onClick={() => handleClick(2)}>
                <a
                  href="#"
                  className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-accent  text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-accent  pr-6"
                >
                  <span className="inline-flex justify-center items-center ml-2">
                    {/* Settings SVG Icon */}
                    <FcFilmReel size="2.5em" />
                  </span>
                  <span className="ml-2 text-lg tracking-wide truncate">
                    Videos
                  </span>
                </a>
              </NavLink>
            </li>
            {/* List item to display the drain context in the Desktop View */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Bar;
