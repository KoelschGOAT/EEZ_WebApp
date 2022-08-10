import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import LanguageDisplayer from '../components/Language/LanguageDisplayer';
import '../static/css/SingleVideo.css';
const SingleVideo = () => {
  const location = useLocation();
  const [video, setVideo] = useState(location.state?.video);

  return (
    <div>
      <div className="wrapper">
        <video className="video" autoPlay loop>
          <source
            src={`http://127.0.0.1:8000${video.video}`}
            type="video/webm"
          />
        </video>
        <div className="textWrapper">
          <h1>
            <LanguageDisplayer
              de={video.title_de}
              en={video.title_en}
            />
          </h1>

          <p>
            <LanguageDisplayer
              de={video.text_de}
              en={video.text_en}
            />
          </p>
        </div>
      </div>
    </div>
  );
};

export default SingleVideo;
