import React, { useState } from 'react';
import {
  useGetAllClients,
  useGetCurrentClient,
} from '../../services/RequestClients';
import { useGetAllVideos } from '../../services/RequestVideos';
import Clients from './Clients';
import Dashboard from './Dashboard';
import Sidebar from './Sidebar';
import Stat from './Stat';
import Tab from './Tab';
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
  return (
    <>
      <div className="flex w-full  shadow-md py-3 justify-between">
        <span className="text-2xl">Dashboard</span>
      </div>
      <Dashboard
        clients={allClients}
        videos={allVideos}
        currentClient={currentClient}
        handleClick={() => setTab(!tab)}
      />
      <div className="tabs  rounded-none bg-inherit w-full flex justify-center">
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
            tab === false ? 'tab-active' : null
          }`}
        >
          Clients
        </a>
      </div>{' '}
      <div className="flex justify-center mt-6">
        {/* <Sidebar /> */}
        {tab === true && <Videos />}
        {tab === false && <Clients allClients={allClients} />}{' '}
      </div>
    </>
  );
};
export default Admin;
