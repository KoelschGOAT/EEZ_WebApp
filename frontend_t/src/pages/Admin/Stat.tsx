import React from 'react';
import {
  FcFilmReel,
  FcMultipleDevices,
  FcTouchscreenSmartphone
} from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import {
  getClientValidator,
  getVideoValidator
} from '../../services/RequestClients';
import LanguageDisplayer from '../../utils/Language/Language/LanguageDisplayer';
interface Props {
  videos: typeof getVideoValidator;
  clients: typeof getClientValidator;
  currentClient: typeof getClientValidator;
  handleClick: Function;
}
const Stat: React.FC<Props> = ({
  videos,
  clients,
  currentClient,
  handleClick,
}) => {
  const navigate = useNavigate();
  console.log(videos, clients, currentClient);
  return (
    <>
      <div className="stats shadow-xl flex flex-col lg:flex-row">
        <div
          onClick={() => navigate(`/EditClient/${currentClient?.id}`)}
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
          onClick={() => handleClick}
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

        <div
          onClick={() => handleClick}
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
        </div>
      </div>
    </>
  );
};

export default Stat;
