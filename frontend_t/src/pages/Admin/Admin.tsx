import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import {
  useGetAllClients,
  useGetCurrentClient,
} from '../../services/RequestClients';
import { useGetAllVideos } from '../../services/RequestVideos';
import Clients from './Clients';
import Dashboard from './Dashboard';
import Sidebar from './Sidebar';
import Stat from './Stat';
import Videos from './Videos';

type Props = {};

const Admin = (props: Props) => {
  const { data: allClients } = useGetAllClients();
  const { data: currentClient } = useGetCurrentClient();
  const { data: allVideos } = useGetAllVideos();
  const [tab, setTab] = useState<boolean>(true);
  const handleClick = () => {
    setTab(!tab);
  };
  console.log(currentClient);
  /* if (currentClient?.is_expo_client)
    return <Navigate to="/" replace />; */
  return (
    <>
      <div className="flex flex-wrap">
        <Sidebar />
        <div className="width-full flex justify-center">
          <Dashboard
            clients={allClients}
            videos={allVideos}
            currentClient={currentClient}
            handleClick={() => setTab(!tab)}
          />
        </div>

        {/* <div className="tabs  rounded-none bg-inherit w-full flex justify-center">
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
        </div>{' '}
        <div className="flex justify-center mt-6">
          {/* <Sidebar /> */}
        {/* {tab === true && <Videos />}
          {tab === false && <Clients allClients={allClients} />} */}
        {/* </div> */}
      </div>
    </>
  );
};
export default Admin;
