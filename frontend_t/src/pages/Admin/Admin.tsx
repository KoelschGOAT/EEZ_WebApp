import { useState } from 'react';
import { IoMdAdd, IoMdArrowBack } from 'react-icons/io';
import { Link, NavLink } from 'react-router-dom';
import VideoAdmin from '../../components/Card/VideoAdmin';
import preloader from '../../Images/preloader.gif';
import { useGetAllClients } from '../../services/RequestClients';
import { useGetAllVideos } from '../../services/RequestVideos';
import NotFound from '../NotFound';
import Clients from './Clients';
import Sidebar2 from './Sidebar2';

type Props = {};

const Admin = (props: Props) => {
  const allClients = useGetAllClients();

  const allVideos = useGetAllVideos();
  const [tab, setTab] = useState<number>(1);
  const handleClick = (num: number) => {
    setTab(num);
  };
  const tabs = [
    ['Dashboard'],
    ['Clients', '/NewClient'],
    ['Videos', '/NewVideo'],
  ];
  if (allClients.isError || allVideos.isError)
    return <NotFound path="/" />;

  if (allClients.data && allVideos.data)
    return (
      <>
        {/* Table Wrapper */}
        <div className="table w-full h-screen">
          <Sidebar2 handleClick={handleClick} tab={tab} />
          <div className="w-full h-full table-cell justify-center align-top">
            <div className="w-full flex h-20 mt-5 justify-center">
              <div className="w-[85%] shadow-lg rounded flex justify-between items-center px-5 border-white">
                {' '}
                <div className="flex justify-between w-full">
                  <h1 className="text-[2.5rem]  font-weigt-700">
                    {tabs[tab][0]}
                  </h1>
                  <span>
                    <Link
                      to={tabs[tab][1]}
                      className="btn btn-outline"
                    >
                      <IoMdAdd size="2em" />
                    </Link>
                  </span>
                </div>
              </div>{' '}
            </div>

            <div className="flex mt-10 justify-center w-full ">
              {tab === 1 && (
                <Clients
                  allVideos={allVideos.data}
                  allClients={allClients.data}
                />
              )}
              {tab === 2 && (
                <div className="w-[85%]">
                  <VideoAdmin Videos={allVideos.data} />
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  return (
    <div className="flex justify-center mt-5 items-center flex-col">
      Einen Augenblick...
      <progress className="mt-5 progress w-56 items-center"></progress>
      <img className="" width="64" src={preloader}></img>
    </div>
  );
};
export default Admin;
