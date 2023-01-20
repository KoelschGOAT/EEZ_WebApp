import React from 'react';
import {
  AiOutlineDesktop,
  AiOutlineVideoCamera,
} from 'react-icons/ai';
import { BiHome } from 'react-icons/bi';
import { GiWindTurbine } from 'react-icons/gi';
import { IoMdArrowBack } from 'react-icons/io';
import { MdDashboard } from 'react-icons/md';
import { Link } from 'react-router-dom';
import useMediaQuery from '../../components/Hooks/useMediaQuery';
import ENERCON_logo_einfach from '../../Images/ENERCON_logo_einfach.png';
import LanguageDisplayer from '../../utils/Language/Language/LanguageDisplayer';
import LanguageSwitcher from '../../utils/Language/Language/LanguageSwitcher';
interface Props {
  handleClick: (num: number) => void;
  tab: number;
}
const Sidebar2 = ({ handleClick, tab }: Props) => {
  const isMobile = useMediaQuery({ query: '(min-width: 960px)' });
  return (
    <div className="table-cell flex-col items-center w-40 h-full overflow-hidden    shadow-xl">
      <aside>
        <a
          className="flex justify-center items-center w-full px-3 mt-3 lg:px-10 cursor-default"
          href="#"
        >
          <img width="32" src={ENERCON_logo_einfach}></img>
          {isMobile && (
            <span className="ml-2 text-sm font-bold ">ENERCON</span>
          )}
        </a>
        <div className="w-full px-2">
          <div className="flex flex-col  items-center w-full mt-3 border-t border-gray-700">
            <a
              onClick={() => handleClick(1)}
              className={`flex  justify-center items-center px-3 w-full h-12 lg:px-10 mt-2 ${
                tab === 1 ? 'text-gray-200 bg-gray-700' : null
              } rounded hover:bg-gray-700 hover:text-gray-300`}
              href="#"
            >
              <AiOutlineDesktop size={'1.5em'} />
              {isMobile && (
                <span className="ml-2 none lg:block text-sm font-medium">
                  Clients
                </span>
              )}
            </a>
            <a
              onClick={() => handleClick(2)}
              className={`flex  justify-center items-center w-full h-12 px-3 lg:px-10 mt-2 ${
                tab === 2 ? 'text-gray-200 bg-gray-700' : null
              } rounded hover:bg-gray-700 hover:text-gray-300`}
              href={'#'}
            >
              <AiOutlineVideoCamera size={'1.5em'} />
              {isMobile && (
                <span className="ml-2 text-sm font-medium">
                  Videos
                </span>
              )}
            </a>
          </div>
          <div className="flex flex-col items-center w-full mt-2 border-t border-gray-700"></div>
          <a
            className="relative flex items-center w-full h-12 px-3 mt-2 lg:px-10 rounded hover:bg-gray-700 hover:text-gray-300"
            href="#"
          >
            {' '}
            <LanguageSwitcher className="flex flex-row gap-2  w-full" />{' '}
          </a>
          <div className="flex flex-col items-center w-full mt-2 border-t border-gray-700"></div>
          <Link
            className="relative flex items-center w-full h-12 px-3 mt-2 lg:px-10 rounded hover:bg-gray-700 hover:text-gray-300"
            to="/"
          >
            {' '}
            <IoMdArrowBack size={'3em'} />
            <LanguageDisplayer
              de="Zurück zur Übersicht"
              en="Back to Home"
            />
          </Link>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar2;
