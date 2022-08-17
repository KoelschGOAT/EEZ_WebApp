import 'react-slideshow-image/dist/styles.css';
import '../static/css/Landing.css';

import React, { useState } from 'react';

import axios from 'axios';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import Cards from '../components/Card';
import Loader from '../components/Feedback/Loader';
import Notification from '../components/Feedback/Notification';
import { useGetCurrentClientVideos } from '../services/RequestVideos';

function Landing() {
  let navigate = useNavigate();

  const { data, isError, isLoading, error } =
    useGetCurrentClientVideos();
  document.title = 'Übersicht';
  const responseReturn = () => {
    if (isLoading) return <Loader loading={isLoading} />;

    if (isError && error?.response.status === 401) {
      return (
        <Notification
          severity="warning"
          Title="Fehler"
          Message="Dieser PC ist nicht im System"
        />
      );
    } else if (isError) {
      return (
        <Notification
          severity="error"
          Title="Fehler"
          Message="Ein unerwarteter Fehler ist aufgetreten"
        />
      );
    }
  };
  return (
    <div className="container">
      <h1 className="title">
        <span className="greenstripe">ENERCON</span>
        <span className="redstripe">Filme</span>
      </h1>

      {responseReturn()}
      {data && data?.length === 0 && (
        <Notification
          severity="warning"
          Title="Warnung"
          Message="Keine Videos für diesen PC eingetragen"
        />
      )}
      {data && (
        <div className="grid">
          {data?.map((video) => (
            <Cards
              key={video?.id}
              video={video}
              onClick={() => {
                navigate('/SingleVideo', {
                  replace: false,
                  state: { video },
                });
              }}
            />
          ))}
        </div>
      )}

      {/*data && <Slider Videos={data} />*/}
    </div>
  );
}

export default Landing;
