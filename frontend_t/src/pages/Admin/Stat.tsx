import React from 'react';
import { FcFilmReel, FcMultipleDevices } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';

import {
  getClientValidator,
  getVideoValidator,
} from '../../services/RequestClients';
import Client, { Video } from '../../services/types';
import LanguageDisplayer from '../../utils/Language/Language/LanguageDisplayer';

interface Props {
  videoTotal: number;
  clientsTotal: number;

  setTab: (val: number) => void;
}
const Stat: React.FC<Props> = ({
  videoTotal: videos,
  clientsTotal: clients,

  setTab,
}) => {
  return (
    <>
      <div className="stats bg-white shadow-xl flex flex-col lg:flex-row">
        <div onClick={() => setTab(1)} className="stat">
          <div className="stat-figure ">
            <FcMultipleDevices size="3em" />
          </div>
          <div className="stat-title ">
            <LanguageDisplayer de="Alle Clients" en="All Clients" />
          </div>
          <div className="stat-value">{clients}</div>
          <div className="stat-desc">
            <LanguageDisplayer
              de="Gesamtanzahl aller Clients"
              en="Total Number of Clients"
            />
          </div>
        </div>{' '}
        <div onClick={() => setTab(2)} className="stat  ">
          <div className="stat-figure ">
            <FcFilmReel size={'3em'} />
          </div>
          <div className="stat-title ">
            <LanguageDisplayer de="Alle Videos" en="All Videos" />
          </div>
          <div className="stat-value">{videos}</div>
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
