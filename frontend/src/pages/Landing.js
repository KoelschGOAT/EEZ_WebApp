import React, { useContext, useEffect, useCallback } from "react";
import AppContext from "../utils/AppContext";
import axios from "axios";
import Cards from "./Card";
import "../static/css/Landing.css";
function Landing() {
	const { videos, setVideos } = useContext(AppContext);
	const getVideos = useCallback(async () => {
		await axios.get("http://192.168.178.21:8000/api/videos").then(resp => {

			setVideos(resp.data);

		});
	}, [setVideos]);

	document.title = "Übersicht";
	useEffect(() => {
		getVideos();
	}, [getVideos]);
	return (
		<div className="container">
			<h1 className="title" >
				<span className="greenstripe">ENERCON</span>
				<span className="redstripe">Filme</span>
			</h1>


			<div className="grid">
				{
					videos?.map((video) => (

						<Cards key={video?.id} video={video} />

					))}</div>





		</div>


	);
}


export default Landing;
