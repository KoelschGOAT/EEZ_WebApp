import React, { useContext, useEffect, useCallback, useState } from "react";

import Notification from "../components/Feedback/Notification";
import Loader from "../components/Feedback/Loader";
import "react-slideshow-image/dist/styles.css";
import axios from "axios";
import Cards from "../components/Card";
import "../static/css/Landing.css";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
function Landing() {
  let navigate = useNavigate();

  const fetchData = async (url) => {
    const response = await axios.get(url);
    return response.data;
  };
  const { data, isError, isLoading, error } = useQuery(
    "current-pc-videos",
    () => fetchData(`http://127.0.0.1:8000/api/current-pc-videos`)
  );

  document.title = "Übersicht";
  const responseReturn = () => {
    <Loader loading={isLoading} />;

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
          Title="Server Fehler"
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
      {data && data.length === 0 &&(
        <Notification
          severity="warning"
          Title="Warnung"
          Message="Keine Videos für diesen PC eingetragen"
        />
      )}
      {data &&  (
        <div className="grid">
          {data?.map((video) => (
            <Cards
              key={video?.id}
              video={video}
              onClick={() => {
                navigate("/SingleVideo", { replace: false, state: { video } });
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
