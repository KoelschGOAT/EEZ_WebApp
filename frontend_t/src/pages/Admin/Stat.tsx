import React from 'react';
import { FcFilmReel, FcMultipleDevices } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';

import {
  getClientValidator,
  getVideoValidator,
} from '../../services/RequestClients';
import Client, { Video } from '../../services/types';
import LanguageDisplayer from '../../utils/Language/Language/LanguageDisplayer';
interface Props2 {
  videos: typeof getVideoValidator;
  clients: typeof getClientValidator;
  currentClient: typeof getClientValidator;
  handleClick: Function;
}
interface Props {
  videos: Video[];
  clients: Client[];
  currentClient: Client;
  setTab: (val: number) => void;
}
const Stat: React.FC<Props> = ({
  videos,
  clients,
  currentClient,
  setTab,
}) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="stats bg-white shadow-xl flex flex-col lg:flex-row">
        <div
          onClick={() =>
            navigate(`/EditClient/${currentClient?.id}`, {
              state: { client: currentClient, allVideos: videos },
            })
          }
          className="stat hover:bg-primary cursor-pointer"
        >
          <div className="stat-figure ">
            <FcFilmReel size={'3em'} />
          </div>
          <div className="stat-title">
            <LanguageDisplayer
              de="Videos Für diesen Pc"
              en="Videos for this Pc"
            />
          </div>
          <div className="stat-value">
            {currentClient?.Videos?.length}
          </div>
          <div className="stat-desc">
            <LanguageDisplayer
              de=" Anzahl der Videos für diesen PC"
              en="Number of Videos for this PC"
            />
          </div>
        </div>
        <div
          onClick={() => setTab(1)}
          className="stat hover:bg-primary cursor-pointer"
        >
          <div className="stat-figure ">
            <FcMultipleDevices size="3em" />
          </div>
          <div className="stat-title ">
            <LanguageDisplayer de="Alle Clients" en="All Clients" />
          </div>
          <div className="stat-value">{clients?.length}</div>
          <div className="stat-desc">
            <LanguageDisplayer
              de="Gesamtanzahl aller Clients"
              en="Total Number of Clients"
            />
          </div>
        </div>{' '}
        <div
          onClick={() => setTab(2)}
          className="stat hover:bg-primary cursor-pointer"
        >
          <div className="stat-figure ">
            <FcFilmReel size={'3em'} />
          </div>
          <div className="stat-title ">
            <LanguageDisplayer de="Alle Videos" en="All Videos" />
          </div>
          <div className="stat-value">{videos?.length}</div>
          <div className="stat-desc">
            <LanguageDisplayer
              de="Gesamtanzahl aller Videos"
              en="Total number of all videos"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Stat;
