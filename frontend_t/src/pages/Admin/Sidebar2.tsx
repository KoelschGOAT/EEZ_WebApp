import React from 'react';
import {
  AiOutlineDesktop,
  AiOutlineVideoCamera,
} from 'react-icons/ai';
import { BiHome } from 'react-icons/bi';
import { GiWindTurbine } from 'react-icons/gi';
import { MdDashboard } from 'react-icons/md';
import { Link } from 'react-router-dom';
import useMediaQuery from '../../components/Hooks/useMediaQuery';

import LanguageSwitcher from '../../utils/Language/Language/LanguageSwitcher';
interface Props {
  handleClick: (num: number) => void;
  tab: number;
}
const Sidebar2 = ({ handleClick, tab }: Props) => {
  const isMobile = useMediaQuery({ query: '(min-width: 960px)' });
  return (
    <div className="table-cell align-top flex-col items-center w-40 h-full overflow-hidden  shadow-xl">
      <aside>
        <a
          className="flex  justify-center items-center w-full px-3 mt-3 lg:px-10"
          href="#"
        >
          <MdDashboard size="2em" />

          {isMobile && (
            <span className="ml-2 text-sm font-bold ">Dashboard</span>
          )}
        </a>
        <div className="w-full px-2">
          <div className="flex flex-col items-center w-full mt-3 border-t border-gray-700">
            <Link
              className="flex justify-center items-center w-full h-12 px-3 lg:px-10 mt-2 rounded hover:bg-gray-700 hover:text-gray-300"
              to="/"
            >
              <BiHome size="1.5em" />
              {isMobile && (
                <span className="ml-2 text-sm font-medium">Home</span>
              )}
            </Link>
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
          </div>
          <div className="flex flex-col items-center w-full mt-2 border-t border-gray-700">
            <a
              className="relative flex items-center w-full h-12 px-3 mt-2 lg:px-10 rounded hover:bg-gray-700 hover:text-gray-300"
              href="#"
            >
              {' '}
              <LanguageSwitcher className="flex flex-row gap-2  w-full" />{' '}
            </a>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar2;
