import { AiFillHome } from 'react-icons/ai';
import { FcFilmReel, FcMultipleDevices } from 'react-icons/fc';
import { NavLink } from 'react-router-dom';
import LanguageDisplayer from '../../utils/Language/Language/LanguageDisplayer';
import LanguageSwitcher from '../../utils/Language/Language/LanguageSwitcher';
//Sidebar Component With TailwindCSS
interface Props {
  handleClick: (num: number) => void;
  tab: number;
}
const Bar = ({ handleClick, tab }: Props) => {
  //Getting the drain Context from the usersetting to display the context always

  //returning the Sidebar, sidebar gets folded when the device is on less tha 769 pxs
  return (
    <div className="table-cell align-top ">
      <aside className=" fixed flex-col w-14 hover:w-60 2xl:w-60 bg-white shadow-xl h-screen transition-all duration-300 border-none z-10 ">
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
                <div
                  className={
                    'relative flex flex-row items-center h-11 focus:outline-none hover:bg-accent  text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-accent  pr-6 cursor-pointer'
                  }
                >
                  <span className="inline-flex justify-center items-center ml-2">
                    {/* Settings SVG Icon */}
                    <AiFillHome size="2.5em" />
                  </span>
                  <span className="ml-2 text-lg tracking-wide truncate">
                    Home
                  </span>
                </div>
              </NavLink>
            </li>

            <li>
              {/* Link tag to Forward the use to the Settings Component withour loadingtime */}
              <div onClick={() => handleClick(1)}>
                <div
                  className={`${
                    tab == 1 ? 'bg-accent' : null
                  } relative flex flex-row items-center h-11 focus:outline-none hover:bg-accent  text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-accent  pr-6 cursor-pointer`}
                >
                  <span className="inline-flex justify-center items-center ml-2">
                    {/* Settings SVG Icon */}
                    <FcMultipleDevices size="2.5em" />
                  </span>
                  <span className="ml-2 text-lg tracking-wide truncate">
                    Clients
                  </span>
                </div>
              </div>
            </li>
            <li>
              {/* Link tag to Forward the use to the Settings Component withour loadingtime */}
              <div onClick={() => handleClick(2)}>
                <div
                  className={`${
                    tab == 2 ? 'bg-accent' : null
                  } relative flex flex-row items-center h-11 focus:outline-none hover:bg-accent  text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-accent  pr-6 cursor-pointer`}
                >
                  <span className="inline-flex justify-center items-center ml-2">
                    {/* Settings SVG Icon */}
                    <FcFilmReel size="2.5em" />
                  </span>
                  <span className="ml-2 text-lg tracking-wide truncate">
                    Videos
                  </span>
                </div>
              </div>
            </li>
            <li>
              {/* Link tag to Forward the use to the Settings Component withour loadingtime */}
              <div className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-accent  text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-accent  pr-6 cursor-pointer">
                <span className="inline-flex justify-center items-center ml-2">
                  <LanguageSwitcher className="flex flex-row gap-2 ml-2 w-full" />{' '}
                </span>
              </div>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default Bar;
