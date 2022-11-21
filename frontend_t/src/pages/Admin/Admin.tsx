import { useState } from 'react';
import { useGetAllClients } from '../../services/RequestClients';
import { useGetAllVideos } from '../../services/RequestVideos';
import NotFound from '../NotFound';
import Clients from './Clients';
import Sidebar2 from './Sidebar2';
import Stat from './Stat';
import Videos from './Videos';

type Props = {};

const Admin = (props: Props) => {
  const allClients = useGetAllClients();

  const allVideos = useGetAllVideos();
  const [tab, setTab] = useState<number>(1);
  const handleClick = (num: number) => {
    setTab(num);
  };

  if (allClients.isError || allVideos.isError)
    return <NotFound path="/" />;

  if (allClients.data && allVideos.data)
    return (
      <>
        {/* Table Wrapper */}
        <div className="table w-full h-screen">
          <Sidebar2 handleClick={handleClick} tab={tab} />
          <div className="w-full h-full table-cell justify-center align-top">
            {allClients.isLoading || allVideos.isLoading ? (
              <div className="flex justify-center mt-5 items-center flex-col">
                Einen Augenblick...
                <progress className="mt-5 progress w-56 align-center"></progress>
              </div>
            ) : (
              <>
                <div className="flex justify-center mt-5">
                  {allVideos.data && (
                    <Stat
                      clientsTotal={allClients.data.length}
                      videoTotal={allVideos.data.length}
                      setTab={setTab}
                    />
                  )}
                </div>

                <div className="flex mt-10 justify-center ">
                  {tab === 1 && allClients.data && allVideos.data && (
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
