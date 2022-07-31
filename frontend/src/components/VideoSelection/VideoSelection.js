import React, { useContext, useEffect, useCallback, useState } from "react";
import "react-slideshow-image/dist/styles.css";
import AppContext from "../../utils/Context/AppContext";
import BarLoader from "react-spinners/BarLoader";
import axios from "axios";
import Cards from "../../components/Card";
import "../../static/css/Landing.css";
import { useNavigate } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { useQuery, useQueryClient } from "react-query";
function VideoSelection() {
  let navigate = useNavigate();
  const [overview, setoverview] = useState(true);
  const { videos, setVideos } = useContext(AppContext);

  const fetchData = async (url) => {
    const response = await axios.get(url);
    return response.data;
  };
  const { data, isError, isLoading, error } = useQuery(
    "current-pc-videos",
    () => fetchData(`http://192.168.178.155:8000/api/all-videos`)
  );

  document.title = "Video Übersicht";
  const  responseReturn = () => {
    if (isLoading) {
      return (
        <div className="loading">
          <BarLoader loading={isLoading} color={"#00665a"} size={150} />
        </div>
      );
    } else if (isError) {
      return (
        <h1 className="loading">Ein unerwarteter Fehler ist aufgetreten</h1>
      );
    }
  };

  return (
    <div className="container" >
      <h1 className="title">
        <span className="greenstripe">ENERCON</span>
        <span className="redstripe">Filme</span>
      </h1>
      {responseReturn()}
      {data && overview && (
        <div className="grid">
          {data?.map((video) => (
            <Cards key={video?.id} video={video} />
          ))}
        </div>
      )}
    </div>
  );
}

export default VideoSelection;
