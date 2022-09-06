import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import {
  useGetAllClients,
  useGetCurrentClient,
} from '../../services/RequestClients';
import { useGetAllVideos } from '../../services/RequestVideos';
import NotFound from '../NotFound';
import Clients from './Clients';
import Dashboard from './Dashboard';
import Sidebar from './Sidebar';
import Stat from './Stat';
import Videos from './Videos';

type Props = {};

const Admin = (props: Props) => {
  const allClients = useGetAllClients();
  const currentClient = useGetCurrentClient();
  const allVideos = useGetAllVideos();
  const [tab, setTab] = useState<number>(1);
  const handleClick = (num: number) => {
    setTab(num);
  };

  /* if (currentClient?.is_expo_client)
    return <Navigate to="/" replace />; */
  if (
    currentClient.isError ||
    allClients.isError ||
    currentClient.isError
  )
    return <NotFound path="/" />;

  return (
    <>
      {/* Table Wrapper */}
      <div className="table ">
        <Sidebar handleClick={handleClick} />
        <div className="w-full h-full table-cell justify-center align-top">
          {currentClient.isLoading ||
          allClients.isLoading ||
          currentClient.isLoading ? (
            <div className="flex justify-center mt-5 items-center flex-col">
              Einen Augenblick...
              <progress className="mt-5 progress w-56 align-center"></progress>
            </div>
          ) : (
            <>
              <div className="flex justify-center mt-5">
                <Stat
                  clients={allClients.data}
                  videos={allVideos.data}
                  currentClient={currentClient.data}
                />
              </div>
              {/* <div className="tabs  my-5 rounded-none bg-inherit w-full flex justify-center">
            <a
              onClick={() => handleClick()}
              className={`tab tab-bordered ${
                tab === true ? 'tab-active' : null
              }`}
            >
              Videos
            </a>
            <a
              onClick={() => handleClick()}
              className={`tab tab-bordered ${
                tab === false ? 'tab-active border-white' : null
              }`}
            >
              Clients
            </a>
          </div>{' '} */}
              <div className="flex mt-10 justify-center ">
                {tab === 1 && allClients.data && (
                  <Clients
                    allVideos={allVideos.data}
                    allClients={allClients.data}
                  />
                )}
                {tab === 2 && <Videos />}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
export default Admin;
