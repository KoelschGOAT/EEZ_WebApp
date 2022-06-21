import React, { useState } from "react";
import "../static/css/SingleVideo.css";
import { useLocation } from "react-router-dom";

const SingleVideo = () => {
	const location = useLocation();
	const [video, setVideo] = useState(location.state?.video);
    

	return (
		<div >

			<div className="wrapper">
				<video className="video"  autoPlay loop  >
					<source src={`http://172.16.81.73:8000${video.video}`} type="video/webm" />


				</video>
				<div className="textWrapper">
					<h1>{video.title}</h1>
					<h2>{video.subtitle}</h2>
				</div>
			</div>


		</div>
	);
};

export default SingleVideo;