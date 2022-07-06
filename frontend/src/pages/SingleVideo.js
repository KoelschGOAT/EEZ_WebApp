import React, { useState } from "react";
import "../static/css/SingleVideo.css";
import { useLocation } from "react-router-dom";

const SingleVideo = () => {
	const location = useLocation();
	const [video, setVideo] = useState(location.state?.video);
    

	return (
    <div>
      <div className="wrapper">
        <video className="video" autoPlay loop>
          <source
            src={`http://192.168.5.182:8000${video.video}`}
            type="video/webm"
          />
        </video>
        <div className="textWrapper">
          <h1>{video.title_de}</h1>
          <h1>{video.title_en}</h1>
          <p>{video.text_de}</p>
          <p>{video.text_en}</p>
        </div>
      </div>
    </div>
  );
};

export default SingleVideo;