import React, { useContext, useEffect, useCallback, useState } from "react";
import "react-slideshow-image/dist/styles.css";
import AppContext from "../utils/Context/AppContext";
import axios from "axios";
import Cards from "./Card";
import "../static/css/Landing.css";
import Slider from "../components/Slider";
import { Slide } from "react-slideshow-image";
function Landing() {
  const [error, setError] = useState(false);
  const [overview, setoverview] = useState(false);
  const { videos, setVideos } = useContext(AppContext);
  const [vid,setVideo] = useState([]);

  const getVideos = useCallback(async () => {
    await axios
      .get("http://192.168.178.21:8000/api/current-pc-videos")
      .then((resp) => {
        setVideos(resp.data);
		setVideo(resp.data);
      })
      .catch(function (error) {
        setError(true);
      });
  }, [setVideos]);

  document.title = "Übersicht";
  useEffect(() => {
    getVideos();
  }, [getVideos]);

  return (
    <div className="container">
      <h1 className="title">
        <span className="greenstripe">ENERCON</span>
        <span className="redstripe">Filme</span>
      </h1>

      {error && <h1>PC nicht freigegeben</h1>}
      {!error && overview && (
        <div className="grid">
          {videos?.map((video) => (
            <Cards key={video?.id} video={video} />
          ))}
        </div>
      )}
    <Slider Videos={vid}/>
    </div>
  );
}

export default Landing;
