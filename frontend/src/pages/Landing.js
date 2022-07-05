import React, { useContext, useEffect, useCallback, useState } from "react";
import "react-slideshow-image/dist/styles.css";
import AppContext from "../utils/Context/AppContext";
import BarLoader from "react-spinners/BarLoader";
import axios from "axios";
import Cards from "./Card";
import "../static/css/Landing.css";
import Slider from "../components/Slider";
import { Slide } from "react-slideshow-image";
import { useQuery, useQueryClient } from "react-query";
function Landing() {
  const [error, setError] = useState(false);
  const [overview, setoverview] = useState(true);
  const { videos, setVideos } = useContext(AppContext);
  const [vid,setVideo] = useState([]);
const fetchData = async (url) => {
    const response = await axios.get(url);
    return response.data;
  };
  const { data, isError, isLoading } = useQuery("current-pc-videos", () =>
    fetchData(`http://192.168.178.21:8000/api/current-pc-videos`)
  );
  

  document.title = "Übersicht";
  

  return (
    <div className="container">
      <h1 className="title">
        <span className="greenstripe">ENERCON</span>
        <span className="redstripe">Filme</span>
      </h1>
      {isLoading ? (
        <div className="loading">
          <BarLoader loading={isLoading} color={"#00665a"} size={150} />
        </div>
      ) : null}
      {isError && <h1>PC nicht freigegeben</h1>}
      {data && overview && (
        <div className="grid">
          {data?.map((video) => (
            <Cards key={video?.id} video={video} />
          ))}
        </div>
      )}
      {!error && !overview && <Slider Videos={vid} />}
    </div>
  );
}

export default Landing;
